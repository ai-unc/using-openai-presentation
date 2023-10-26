<section data-auto-animate>
	<h4>Prompt Engineering</h4>
	<div class="subtitle" data-id="subtitle">Prompt Templating</div>

	<pre class="h-full"><code data-trim data-noescape data-line-numbers="|1,8-11">
    import &lcub; PromptTemplate &rcub; from "langchain/prompts";

    export const POST = (async (&lcub; request &rcub;) => &lcub;
        const &lcub; message &rcub; = await request.json();
    
        if (message == undefined) throw error(400);
    
        const examplePrompt = new PromptTemplate(&lcub;
            inputVariables: ["example_query", "example_response"],
            template: "&lcub;example_query&rcub; &lcub;example_response&rcub;",
        &rcub;);

        ...

    &rcub;) satisfies RequestHandler;
    </code></pre>

	<aside class="notes">
		<ul>
			<li>Code snippet for prompt templating</li>
		</ul>
	</aside>
</section>
