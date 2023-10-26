<section data-auto-animate>
	<h4>Prompt Engineering</h4>
	<div class="subtitle" data-id="subtitle">Querying the LLM</div>

	<pre class="h-full" data-id="code-snippet"><code class="text-[15px]" data-trim data-noescape data-line-numbers="1-3,8-12,18-22">
		import &lcub; OPENAI_API_KEY &rcub; from "$env/static/private";
		import &lcub; ChatOpenAI &rcub; from "langchain/chat_models/openai";
		import &lcub; HumanMessage &rcub; from "langchain/schema";
		import &lcub; PromptTemplate, FewShotPromptTemplate &rcub; from "langchain/prompts";
		import &lcub; LengthBasedExampleSelector &rcub; from "langchain/prompts";
		import &lcub; examples &rcub; from "./examples";
	
		const client = new ChatOpenAI(&lcub;
			openAIApiKey: OPENAI_API_KEY,
			temperature: 0,
			modelName: "gpt-3.5-turbo",
		&rcub;);

		export const POST = (async (&lcub; request &rcub;) => &lcub;
			
			...
	
			const finalPrompt = await dynamicPrompt.format(&lcub; input: message &rcub;);

			const response = await client.call([new HumanMessage(finalPrompt)]);

			return json(&lcub; content: response.content &rcub;);

		&rcub;) satisfies RequestHandler;
	</code></pre>

	<aside class="notes">
		<ul>
			<li>Sending final prompt to the LLM</li>
		</ul>
	</aside>
</section>
