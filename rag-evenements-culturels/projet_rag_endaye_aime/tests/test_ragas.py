import json
import os
import sys
from pathlib import Path

from datasets import Dataset
from dotenv import load_dotenv
from ragas import evaluate
from ragas.metrics._faithfulness import Faithfulness
from ragas.metrics._answer_relevance import AnswerRelevancy
from ragas.llms.base import LangchainLLMWrapper
from ragas.embeddings.base import LangchainEmbeddingsWrapper
from langchain_mistralai import ChatMistralAI, MistralAIEmbeddings

ROOT_DIR = Path(__file__).resolve().parents[1]
sys.path.append(str(ROOT_DIR))

load_dotenv()

from scripts.chatbot_rag import ask_chatbot, search_events

_api_key = os.getenv("MISTRAL_API_KEY")
_ragas_llm = LangchainLLMWrapper(
    ChatMistralAI(model="mistral-small-latest", temperature=0, mistral_api_key=_api_key)
)
_ragas_embeddings = LangchainEmbeddingsWrapper(
    MistralAIEmbeddings(model="mistral-embed", mistral_api_key=_api_key)
)

QUESTIONS_FILE = ROOT_DIR / "tests" / "questions_reponses.json"


def load_questions():
    with open(QUESTIONS_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def main():
    test_cases = load_questions()

    questions = []
    answers = []
    contexts = []
    ground_truths = []

    for case in test_cases:
        question = case["question"]
        ground_truth = case["ground_truth"]

        print("\n" + "=" * 60)
        print("Question :", question)

        context = search_events(question, k=5)
        answer = ask_chatbot(question, k=5)

        print("\nRéponse du chatbot :")
        print(answer)

        questions.append(question)
        answers.append(answer)
        contexts.append([context])
        ground_truths.append(ground_truth)

    dataset = Dataset.from_dict(
        {
            "question": questions,
            "answer": answers,
            "contexts": contexts,
            "ground_truth": ground_truths,
        }
    )

    result = evaluate(
        dataset,
        metrics=[
            Faithfulness(llm=_ragas_llm),
            AnswerRelevancy(llm=_ragas_llm, embeddings=_ragas_embeddings),
        ],
    )

    print("\nRésultats RAGAS :")
    print(result)


if __name__ == "__main__":
    main()
