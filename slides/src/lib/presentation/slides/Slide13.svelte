<section data-auto-animate>
	<h4>Prompt Engineering</h4>
	<div class="subtitle" data-id="subtitle">Example Selector</div>

	<pre class="h-full" data-id="code-snippet"><code class="text-[15px]" data-trim data-noescape data-line-numbers="2-3,15">
		import &lcub; PromptTemplate &rcub; from "langchain/prompts";
		import &lcub; LengthBasedExampleSelector &rcub; from "langchain/prompts";
		import &lcub; examples &rcub; from "./examples";
	
		export const POST = (async (&lcub; request &rcub;) => &lcub;
			const &lcub; message &rcub; = await request.json();
		
			if (message == undefined) throw error(400);
		
			const examplePrompt = new PromptTemplate(&lcub;
				inputVariables: ["example_query", "example_response"],
				template: "&lcub;example_query&rcub; &lcub;example_response&rcub;",
			&rcub;);
	
			const exampleSelector = await LengthBasedExampleSelector.fromExamples(examples, &lcub; examplePrompt &rcub;);

			...
	
		&rcub;) satisfies RequestHandler;
	</code></pre>

	<aside class="notes">
		<ul>
			<li>Code snippet for example selector</li>
		</ul>
	</aside>
</section>
