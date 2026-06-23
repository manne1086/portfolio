from dotenv import load_dotenv
import os
from openai import OpenAI
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pathlib
from bs4 import BeautifulSoup

load_dotenv(override=True)

groq_api_key = os.getenv("GROQ_API_KEY")
if not groq_api_key:
    raise ValueError("GROQ_API_KEY environment variable not set")

gro = OpenAI(
    api_key=groq_api_key,
    base_url="https://api.groq.com/openai/v1"
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Strip HTML → clean text only
html_content = pathlib.Path("index.html").read_text(encoding="utf-8")
soup = BeautifulSoup(html_content, "html.parser")
for tag in soup(["script", "style", "noscript", "meta", "link"]):
    tag.decompose()

clean_text = soup.get_text(separator="\n", strip=True)[:6000]  # 👈 truncate here
print(f"Clean text length: {len(clean_text)} chars")

system_prompt = """You are Rithvi's Portfolio Assistant — a friendly, knowledgeable AI chat agent embedded in the personal portfolio of Rithivkesh (goes by "Rithvi"), a final-year B.Tech Computer Science & IT student at GRIET, Hyderabad, with a GPA of 8.73.

Your role is to answer any questions a visitor might have about Rithvi — his projects, skills, background, achievements, and how to get in touch.

BEHAVIOR RULES:
1. Be friendly, concise, and enthusiastic — you represent Rithvi well.
2. If asked about a project, explain it clearly in 2–4 sentences max unless the visitor wants more detail.
3. If asked for contact/hiring info, mention Rithvi is open to AI/ML and Fullstack roles and share his contact details directly.
4. If unrelated to Rithvi, politely redirect: "I'm Rithvi's portfolio assistant — I'm best at answering questions about him!"
5. Never make up information. If unsure: "I don't have that detail — feel free to reach out to Rithvi directly!"
6. Keep responses short and scannable — visitors are browsing, not reading essays.
7. Use light markdown (bold, bullets) to structure answers when helpful.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ABOUT RITHVI (Ground Truth)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Rithivkesh Manne (Rithvi) — Final-year B.Tech CSE & IT, GRIET Hyderabad, GPA 8.73/10.
Intermediate: 98.2"%" from Gatik Junior College. School: DAV BDL Public School.
Role: AI Engineer + Fullstack Developer.
Stack: LangChain, LlamaIndex, Groq, OpenAI API, PyTorch, TensorFlow, FastAPI, React, AWS Bedrock/SageMaker, Docker, n8n, Algorand.

Projects:
- MediSense AI: RAG + Vision AI medical assistant. Cuts diagnostic review time by 20%.
- LoanLens AI: XGBoost/LightGBM loan underwriting. Reduces TAT by 50%+.
- Studia AI: Collaborative AI study platform + Algorand Web3. Runner-Up, Vivitsu 2026 (300 teams).
- ScanGo: Smart retail automation with blockchain checkout. Live MVP, 3 GitHub forks.
- AutoOps AI: 6-agent enterprise workflow engine. 8 days → 2 days onboarding. ET GenAI Hackathon 2026 Phase 2.
- Terra Pulse: Global situational awareness platform. Voice in Hindi/Telugu/English via Groq Whisper + ElevenLabs.

Achievements: AWS Gen AI Intern (Grade Outstanding), IBM SkillsBuild AI Agent cert, 250+ LeetCode (DP/graphs/greedy), Algorand smart contracts via AlgoKit + Puya.
Personal: Football player, One Piece fan, Tamil cinema lover.
Quote: 'I don't want to work at just any company. I want to build AI that actually changes how people live.'

Contact:
- Email: mannerithivkesh@gmail.com
- Phone: +91 89197 13291
- LinkedIn: linkedin.com/in/rithvikesh-manne
- GitHub: github.com/manne1086

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PORTFOLIO CONTENT (extracted from HTML)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
""" + clean_text


class ChatRequest(BaseModel):
    message: str
    history: list = []


@app.post("/chat")
async def chat(req: ChatRequest):
    history_messages = [
        {"role": h["role"], "content": h["content"]} 
        for h in req.history
    ]

    messages = (
        [{"role": "system", "content": system_prompt}]
        + history_messages
        + [{"role": "user", "content": req.message}]
    )

    try:
        response = gro.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=messages
        )
        answer = response.choices[0].message.content
        return {"reply": answer if answer else "Sorry, couldn't generate a response!"}

    except Exception as e:
        return {"error": str(e), "reply": f"Something went wrong: {str(e)}"}


@app.get("/")
async def root():
    return {"status": "Rithvi's Portfolio Assistant is live ⚓"}