<section data-auto-animate>
	<h4>Prompt Engineering</h4>
	<div class="subtitle" data-id="subtitle">How do we get an Answer we want?</div>

	<div class="prompt-example">
		<div>Can you return an array of objects as a JSON formatted string that are geographically relevant to an arbitrary query?</div>
		<div class="fragment highlight-current-blue" data-fragment-index="1">
			<div>REQUIREMENTS:</div>
			<div>- Each object in the array should contain 3 keys: lon, lat, blurb</div>
			<div>- lon is the longitude of the coords for each match to the query</div>
			<div>- lat is the latitude of the coords for each match to the query</div>
			<div>- blurb is the 1-3 sentence answer to the query</div>
			<div>- the overall length of the answer should be maximum 500 characters and should be a fully parsable JSON string</div>
			<div>- if you cannot provide accurate information then please provide your best guess along with a disclaimer</div>
		</div>
		<div class="fragment highlight-current-blue" data-fragment-index="2">
			What is the hottest place on Earth? [&lcub;&lcub;"lon":30.482,"lat":15.775,"blurb":"Lut Desert, Iran, holds the record for the highest temperature ever
			recorded on Earth. The surface temperature reached a staggering 159.3°F (70.7°C) in 2005. The region is characterized by a lack of vegetation, extreme
			aridity, and harsh living conditions. The primary environmental concern in the Lut Desert is desertification, which exacerbates water scarcity and
			threatens the fragile ecosystems."&rcub;&rcub;]
		</div>
		<div>Here is the arbitrary query...</div>
		<div>Where are the best places to visit in Europe</div>
	</div>

	<aside class="notes">
		<ul>
			<li>This is an example of what a prompt might look like to get the result we want</li>
			<li>Focus on these two sections</li>
		</ul>
	</aside>
</section>

<style lang="postcss">
	.prompt-example {
		@apply mt-2 text-white/70;

		div {
			@apply text-left text-lg leading-[1.7];
		}
	}
</style>
