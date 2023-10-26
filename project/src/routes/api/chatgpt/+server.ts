import { OPENAI_API_KEY } from "$env/static/private";
import { error, json, type RequestHandler } from "@sveltejs/kit";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate, FewShotPromptTemplate } from "langchain/prompts";
import { LengthBasedExampleSelector } from "langchain/prompts";
import { HumanMessage } from "langchain/schema";
import { examples } from "./examples";
const client = new ChatOpenAI({
	openAIApiKey: OPENAI_API_KEY,
	temperature: 0,
	modelName: "gpt-3.5-turbo",
});

export const POST = (async ({ request }) => {
	const { message } = await request.json();

	if (message == undefined) throw error(400);

	const examplePrompt = new PromptTemplate({
		inputVariables: ["example_query", "example_response"],
		template: "{example_query} {example_response}",
	});

	const exampleSelector = await LengthBasedExampleSelector.fromExamples(examples, { examplePrompt });

	const dynamicPrompt = new FewShotPromptTemplate({
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
		suffix: `Here is the arbitrary query...\n\n{input}\n`,
		inputVariables: ["input"],
		exampleSeparator: "\n\n",
	});

	const finalPrompt = await dynamicPrompt.format({ input: message });

	const response = await client.call([new HumanMessage(finalPrompt)]);

	return json({ content: response.content });
}) satisfies RequestHandler;
