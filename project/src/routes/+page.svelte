<script lang="ts">
	import "../app.postcss";

	import { MapLibre, Marker } from "svelte-maplibre";
	import type { Map as MapLibreMapType } from "maplibre-gl";

	import { BrainCircuit, Loader2, MapPin, AlertCircle, X } from "lucide-svelte";
	import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "$lib/components/ui/dialog";
	import { Button } from "$lib/components/ui/button";
	import { Alert, AlertDescription, AlertTitle } from "$lib/components/ui/alert";
	import { HoverCard, HoverCardContent, HoverCardTrigger } from "$lib/components/ui/hover-card";

	let promptPopupOpen = false;
	let promptMessage = "";

	type Response = {
		lon: number;
		lat: number;
		blurb: string;
	};
	let generatedResponse: Response[] = [];

	let loading = false;
	let didError = false;

	const queryAI = async () => {
		loading = true;
		try {
			const response = await fetch("/api/chatgpt", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					message: promptMessage,
				}),
			});
			if (!response.ok) throw Error("Oops");
			const json = await response.json();
			generatedResponse = JSON.parse(json.content);
		} catch (e) {
			loading = false;
			didError = true;
			return;
		}
		// generatedResponse = [
		// 	{
		// 		lon: -122.4194,
		// 		lat: 37.7749,
		// 		blurb:
		// 			"San Francisco, CA is often regarded as one of the best cities in America. Known for its iconic landmarks, diverse culture, and thriving tech industry, San Francisco offers a high quality of life. However, the city also faces environmental challenges such as high housing costs, traffic congestion, and the risk of earthquakes.",
		// 	},
		// 	{
		// 		lon: -74.0059,
		// 		lat: 40.7128,
		// 		blurb:
		// 			"New York City, NY is another top city in America. It is a global hub for finance, arts, and culture. However, the city grapples with issues such as overcrowding, air pollution, and the vulnerability to coastal flooding due to rising sea levels.",
		// 	},
		// 	{
		// 		lon: -118.2437,
		// 		lat: 34.0522,
		// 		blurb:
		// 			"Los Angeles, CA is renowned for its entertainment industry, beautiful beaches, and pleasant weather. However, the city faces environmental concerns such as air pollution, traffic congestion, and the risk of wildfires due to its dry climate.",
		// 	},
		// ];
		loading = false;
		promptPopupOpen = false;
		promptMessage = "";
		if (map) {
			map.jumpTo({ center: [generatedResponse[0].lon, generatedResponse[0].lat] });
			map.zoomTo(5);
		}
	};

	let map: MapLibreMapType | null = null;
</script>

<MapLibre
	style="https://api.maptiler.com/maps/streets-v2/style.json?key=XPCLEtBXX1p9Zg32Jgwh"
	class="relative aspect-[9/16] max-h-[100vh] w-full"
	zoom={1.3}
	center={[10, 35]}
	attributionControl={false}
	bind:map
	minZoom={1.7}
>
	{#each generatedResponse as marker}
		<Marker lngLat={[marker.lon, marker.lat]} class="h-[50px] w-[50px] cursor-default">
			<HoverCard>
				<HoverCardTrigger>
					<MapPin size={50} color="#2563eb" style="transform: translateY(-50%)" />
				</HoverCardTrigger>
				<HoverCardContent class="w-[400px]">
					<span>{marker.blurb}</span>
				</HoverCardContent>
			</HoverCard>
		</Marker>
	{/each}
</MapLibre>

<button on:click={() => (promptPopupOpen = true)} class="absolute bottom-4 left-4 rounded-xl bg-blue-500 p-3 shadow-md">
	<BrainCircuit size={60} color="#a1f1ff" />
</button>

<div class="absolute bottom-4 right-4 flex gap-x-2">
	{#each generatedResponse as response}
		<button class="h-8 w-8 rounded-[50%] bg-blue-200 shadow-md" on:click={() => map?.jumpTo({ center: [response.lon, response.lat] })} />
	{/each}
</div>

<Dialog modal={true} bind:open={promptPopupOpen}>
	<DialogContent class="sm:max-w-[725px]">
		<div class:blurred={didError}>
			<DialogHeader>
				<BrainCircuit size={55} color="#a1f1ff" class="mx-auto rounded-[50%] bg-blue-500 p-[10px] shadow-sm" />
				<DialogTitle class="pt-[12px] text-center text-[22px] font-bold">Ask Anything...</DialogTitle>
			</DialogHeader>
			<textarea
				placeholder="Whatever your mind can think to ask, I can think to answer."
				bind:value={promptMessage}
				disabled={loading || didError}
				class="border-input ring-offset-background placeholder:text-muted-foreground mt-[16px] flex min-h-[120px] w-full resize-none rounded-md border bg-transparent px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
			/>
			<DialogFooter class="flex gap-[40px] px-[10px] pt-[20px]">
				<Button disabled={loading || didError} class="flex-grow-1 mx-auto h-[30px] w-full" variant="one" on:click={() => (promptPopupOpen = false)}
					>Cancel</Button
				>
				<Button
					disabled={loading || promptMessage.length < 1 || didError}
					class="flex-grow-1 relative mx-auto h-[30px] w-full"
					variant="two"
					on:click={() => queryAI()}
				>
					{#if loading}
						<Loader2 class="loading-spinner absolute mr-[85px]" size={25} />
					{/if}
					Ask A.I.
				</Button>
			</DialogFooter>
		</div>

		{#if didError}
			<Alert variant="destructive" class="absolute left-0 right-0 top-[20px] mx-auto w-[87%] bg-red-100 shadow-2xl">
				<AlertCircle class="h-4 w-4" />
				<AlertTitle>Error</AlertTitle>
				<AlertDescription>Oops... Something didn't go right there.</AlertDescription>
				<button class="outline-red/50 absolute right-2 top-2 rounded-md focus-visible:outline" on:click={() => (didError = false)}>
					<X size={25} color="#63100d" />
				</button>
			</Alert>
		{/if}
	</DialogContent>
</Dialog>

<style lang="postcss">
	:global(.loading-spinner) {
		animation: rotating 2s linear infinite;
	}
	@keyframes rotating {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.blurred {
		@apply blur-sm;
	}
</style>
