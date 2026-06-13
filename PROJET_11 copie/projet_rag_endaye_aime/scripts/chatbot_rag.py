import os
import pickle
import faiss
import numpy as np
from pathlib import Path
from dotenv import load_dotenv

from langchain_mistralai import ChatMistralAI, MistralAIEmbeddings
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

load_dotenv()

ROOT_DIR = Path(__file__).resolve().parent.parent
FAISS_INDEX_PATH = ROOT_DIR / "data" / "faiss_index" / "index.faiss"
METADATA_PATH = ROOT_DIR / "data" / "faiss_index" / "metadata.pkl"

index = faiss.read_index(str(FAISS_INDEX_PATH))

with open(METADATA_PATH, "rb") as f:
    metadata = pickle.load(f)

embeddings_model = MistralAIEmbeddings(
    model="mistral-embed",
    mistral_api_key=os.getenv("MISTRAL_API_KEY")
)

llm = ChatMistralAI(
    model="mistral-small-latest",
    temperature=0.2,
    mistral_api_key=os.getenv("MISTRAL_API_KEY")
)

prompt = ChatPromptTemplate.from_template("""
Tu es un assistant spécialisé dans la recommandation d'événements culturels.

Réponds uniquement à partir des événements fournis dans le contexte.
Si les informations sont insuffisantes, dis-le clairement.

Question utilisateur :
{question}

Événements trouvés :
{context}

Réponse :
""")

chain = prompt | llm | StrOutputParser()


def search_events(question, k=5):
    query_vector = embeddings_model.embed_query(question)
    query_vector = np.array([query_vector]).astype("float32")

    distances, indices = index.search(query_vector, k)

    results = []

    for i in indices[0]:
        event = metadata[i]

        result = f"""
Titre : {event.get("titre", "")}
Date : {event.get("date", "")}
Lieu : {event.get("lieu", "")}
Ville : {event.get("ville", "")}
Description : {event.get("description", "")}
"""
        results.append(result)

    return "\n---\n".join(results)


def ask_chatbot(question: str, k: int = 5) -> str:
    context = search_events(question, k)
    return chain.invoke({"question": question, "context": context})


def chatbot():
    print("Chatbot RAG prêt. Tape 'exit' pour quitter.")

    while True:
        question = input("\nVotre question : ")

        if question.lower() in ["exit", "quit", "q"]:
            print("Fin du chatbot.")
            break

        context = search_events(question)

        print("\nRéponse IA :")
        for chunk in chain.stream({"question": question, "context": context}):
            print(chunk, end="", flush=True)
        print()


if __name__ == "__main__":
    chatbot()