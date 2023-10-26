<section data-auto-animate>
	<h4>Prompt Engineering</h4>
	<div class="subtitle" data-id="subtitle">Few Shot Prompt Template</div>

	<pre class="h-full" data-id="code-snippet"><code class="text-[15px]" data-trim data-noescape data-line-numbers="1,11-26">
		import &lcub; PromptTemplate, FewShotPromptTemplate &rcub; from "langchain/prompts";
		import &lcub; LengthBasedExampleSelector &rcub; from "langchain/prompts";
		import &lcub; examples &rcub; from "./examples";
	
		export const POST = (async (&lcub; request &rcub;) => &lcub;
			
			...
	
			const exampleSelector = await LengthBasedExampleSelector.fromExamples(examples, &lcub; examplePrompt &rcub;);

			const dynamicPrompt = new FewShotPromptTemplate(&lcub;
				exampleSelector,
				examplePrompt,
				prefix: `Can you return an array of objects as a JSON formatted string that are geographically relevant to an arbitrary query?
		
				REQUIREMENTS:
				- Each object in the array should contain 3 keys: lon, lat, blurb
				- lon is the longitude of the coords for each match to the query
				- lat is the latitude of the coords for each match to the query
				- blurb is the 1-3 sentence answer to the query
				- the overall length of the answer should be maximum 500 characters and should be a fully parsable JSON string
				- if you cannot provide accurate information then please provide your best guess along with a disclaimer`,
				suffix: `Here is the arbitrary query...\n\n&lcub;input&rcub;\n`,
				inputVariables: ["input"],
				exampleSeparator: "\n\n",
			&rcub;);
	
			...

		&rcub;) satisfies RequestHandler;
	</code></pre>

	<aside class="notes">
		<ul>
			<li>Code snippet for few shot prompt templating</li>
		</ul>
	</aside>
</section>
