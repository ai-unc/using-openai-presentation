import { OPENAI_API_KEY } from "$env/static/private";
import { json, type RequestHandler } from "@sveltejs/kit";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate, FewShotPromptTemplate } from "langchain/prompts";
import { LengthBasedExampleSelector } from "langchain/prompts";
import { HumanMessage } from "langchain/schema";
import { examples } from "./examples";
const client = new ChatOpenAI({
	openAIApiKey: OPENAI_API_KEY,
	temperature: 0,
	modelName: "gtp-3.5-turbo",
});

export const POST = (async () => {
	const message = "";

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
        - blurb is the 1-3 sentence answer to the query along with information about the environmental concerns of the city or region in which the coords exist
        - The array should be max length 3 items
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