<script lang="ts">
	import { onMount } from "svelte";

	import Reveal from "reveal.js";
	import Highlight from "reveal.js/plugin/highlight/highlight";
	import SpeakerNotes from "reveal.js/plugin/notes/notes";

	import "reveal.js/dist/reveal.css";
	import "reveal.js/dist/theme/black.css";
	import "../../circus.min.css";

	import Slide1 from "./slides/Slide1.svelte";
	import Slide2 from "./slides/Slide2.svelte";
	import Slide3 from "./slides/Slide3.svelte";
	import Slide4 from "./slides/Slide4.svelte";
	import Slide5 from "./slides/Slide5.svelte";
	import Slide6 from "./slides/Slide6.svelte";
	import Slide7 from "./slides/Slide7.svelte";
	import Slide8 from "./slides/Slide8.svelte";
	import Slide9 from "./slides/Slide9.svelte";
	import Slide10 from "./slides/Slide10.svelte";
	import Slide11 from "./slides/Slide11.svelte";
	import Slide12 from "./slides/Slide12.svelte";
	import Slide13 from "./slides/Slide13.svelte";
	import Slide14 from "./slides/Slide14.svelte";
	import Slide15 from "./slides/Slide15.svelte";
	import Slide16 from "./slides/Slide16.svelte";
	import Slide17 from "./slides/Slide17.svelte";

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
		<Slide9 />
		<Slide10 />
		<Slide11 />
		<Slide12 />
		<Slide13 />
		<Slide14 />
		<Slide15 />
		<Slide16 />
		<Slide17 />
	</div>
</div>
