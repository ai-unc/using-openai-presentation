# Example API endpoint as if it were in a Flask application
from flask_restful import Resource, reqparse
from langchain.chat_models import ChatOpenAI
from langchain.schema import HumanMessage
from langchain.prompts import PromptTemplate, FewShotPromptTemplate
from langchain.prompts.example_selector import LengthBasedExampleSelector

from examples import examples


class ChatGPTEndpoint(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("message", type=str)

        args = parser.parse_args()
        message = args["message"]

        if message == None:
            return {"statusCode": 400, "body": "Invalid Argument"}

        llm = ChatOpenAI(temperature=0, model_name="gpt-3.5-turbo")

        formatted_template = """{example_query} {example_response}"""
        prompt_template = PromptTemplate(
            input_variables=["example_query", "example_response"],
            template=formatted_template,
        )

        example_selector = LengthBasedExampleSelector(
            examples=examples, example_prompt=prompt_template
        )

        dynamic_prompt = FewShotPromptTemplate(
            example_selector=example_selector,
            example_prompt=prompt_template,
            prefix="""Can you return an array of objects as a JSON formatted string that are geographically relevant to an arbitrary query?

            REQUIREMENTS:
            - Each object in the array should contain 3 keys: lon, lat, blurb
            - lon is the longitude of the coords for each match to the query
            - lat is the latitude of the coords for each match to the query
            - blurb is the 1-3 sentence answer to the query
            - the overall length of the answer should be maximum 500 characters and should be a fully parsable JSON string
            - if you cannot provide accurate information then please provide your best guess along with a disclaimer
            """,
            suffix="Here is the arbitrary query...\n\n{input}\n",
            input_variables=["input"],
            example_separator="\n\n",
        )

        final_prompt = dynamic_prompt.format(input=f"{message}")

        response = llm([HumanMessage(content=final_prompt)])

        return {"content": response.content}