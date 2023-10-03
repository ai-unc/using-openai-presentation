<script lang="ts">
	import { onMount } from "svelte";

	import Reveal from "reveal.js";
	import Highlight from "reveal.js/plugin/highlight/highlight";
	import SpeakerNotes from "reveal.js/plugin/notes/notes";

	import "reveal.js/dist/reveal.css";
	import "reveal.js/dist/theme/black.css";

	import Slide1 from "./slides/Slide1.svelte";
	import Slide2 from "./slides/Slide2.svelte";
	import Slide3 from "./slides/Slide3.svelte";
	import Slide4 from "./slides/Slide4.svelte";
	import Slide5 from "./slides/Slide5.svelte";
	import Slide6 from "./slides/Slide6.svelte";
	import Slide7 from "./slides/Slide7.svelte";
	import Slide8 from "./slides/Slide8.svelte";

	onMount(() => {
		const deck = new Reveal({
			plugins: [Highlight, SpeakerNotes],
			autoAnimateEasing: "ease",
			autoAnimateDuration: 0.5,
			controls: true,
			progress: false,
		});
		deck.initialize();
	});
</script>

<div class="reveal">
	<div class="slides">
		<Slide1 />
		<Slide2 />
		<Slide3 />
		<Slide4 />
		<Slide5 />
		<Slide6 />
		<Slide7 />
		<Slide8 />
	</div>
</div>
