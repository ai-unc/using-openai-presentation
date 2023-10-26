<section data-auto-animate>
	<h4>Prompt Engineering</h4>
	<div class="subtitle" data-id="subtitle">How do we get an Answer we want?</div>

	<div class="text-left">
		<div class="mt-4 text-gray-200">What do we need?</div>
		<ul>
			<li>Longitude and Latitude Coordinates</li>
			<li>A short blurb</li>
			<li>In a usable format</li>
		</ul>
	</div>

	<pre class="fragment fade-in"><code class="text-sm">
		[
			&lcub;
				"lon":90.4074,
				"lat":23.7104,
				"blurb":"Some description..."
			&rcub;,
			&lcub;
				"lon":-80.191790,
				"lat":25.761680
				"blurb":"Some description..."
			&rcub;
		]
	</code></pre>

	<aside class="notes">
		<ul>
			<li>The first step is to identify the data and format you need from an answer</li>
		</ul>
	</aside>
</section>
