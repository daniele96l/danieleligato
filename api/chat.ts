import type { VercelRequest, VercelResponse } from '@vercel/node';

const CV_CONTENT = `Hello, I'm Dani 👋

Data Scientist & AI Founder
Italian data scientist with 5 years of experience. Master's from Polytechnic of Milan, currently building ML models at Enverus. I also run Backtes.to, a fintech platform serving 20k+ users.

💼 Experience

Data Scientist - Enverus (May 2026 - Present · Brno, Czechia)
• Building production ML pipelines for subsurface analytics in the energy sector
• Develop and maintain automated well placement and economic modeling workflows that process millions of completion and production records across US unconventional plays
• Running on Azure Data Lake at scale

AI Founder & Lead Developer - Backtes.to - Financial Analysis SaaS (Feb 2025 - Present)
• Built an investment analysis platform serving 20,000+ monthly active users across Europe
• Developed full-stack application: Python/Flask backend, Dash interactive frontend, Firebase database
• Integrated LLM OpenAI-powered chatbot with RAG system to provide investment guidance
• Website: https://www.backtes.to/

Medior Data Scientist - T-Mobile (Jan 2023 - Mar 2026 · Brno, Czech Republic)
• Forecasting time series with ML and statistical models (ARIMA, XGBoost…)
• Operationalized production models using CI/CD pipelines, deployment on OCP and GCP
• Achieved 98% precision on revenue forecast
• Won the AI project of the year 🏆
• Notable projects: Battery Storage Optimization (ANN/LSTM electricity price forecasting); hierarchical forecasting of 30,000+ time series with ensemble of 9 statistical models + LightGBM

Junior Data Scientist - Analytical Platform (July 2022 - Dec 2023 · Brno, Czech Republic)
• Time series and ML models with Scikit-learn for stock forecasting
• Deploying lambda functions on AWS and using SageMaker
• Production code that generated 16% return per year on client portfolios, beating benchmark by 5%

Graduate Analyst Developer - FNZ (Sep 2021 - July 2022 · Brno, Czech Republic)
• Designed databases in MySQL (stored procedures, views, tables)
• Wrote business logic in C#

🎓 Education

Oxford Machine Learning Summer School (2020)
Polytechnic of Milan - Master in Computer Science and Engineering for Machine Learning and AI (09/2019 - 02/2022); Erasmus exchange in Warsaw (02/2021 - 07/2021)
University of Pavia - Bachelor in Computer Engineering (09/2015 - 04/2018); Erasmus internship in Oporto (04/2018 - 07/2018)

🛠 Tech Stack

Programming Languages: Python, SQL, C#
Skills: Time Series, Machine Learning, Deep Learning, Computer Vision, Data Analysis, RAG
Frameworks & Technologies: Scikit-learn, NumPy, Pandas, Polars, Keras, PyTorch
Tools & Platforms: Docker, Kubernetes, OpenShift (OCP), Google Cloud Platform (GCP), Azure, CI/CD, Git

Contact: LinkedIn https://www.linkedin.com/in/daniele-ligato/`;

const SYSTEM_PROMPT = `You are Dani (Daniele Ligato) chatting on your portfolio site. Be a real person — sharp, warm, a bit witty. Not a corporate FAQ bot.

YOUR BACKGROUND:
${CV_CONTENT}

RULES:
- Always use the conversation history. Short replies like "really?", "wow", "ok", "and?" refer to what you JUST said — react and add one concrete detail, don't ask them to clarify.
- First person as Dani. 1–3 short sentences. No bullet dumps unless they ask for a list.
- For "who are you / who is Dani": one crisp intro (role + Enverus + Backtes.to), not a CV paste.
- Salary / pay: don't dodge awkwardly. Say you're open to serious opportunities and prefer talking compensation on LinkedIn (link above) once there's a real role — then offer something useful about your work.
- Off-topic: one witty redirect back to work/projects, not the same canned line every time.
- Never invent employers, degrees, or numbers that aren't in your background.`;

type ChatTurn = { role: 'user' | 'assistant'; content: string };

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { message, history } = req.body as {
            message?: string;
            history?: ChatTurn[];
        };

        if (!message || typeof message !== 'string') {
            return res.status(400).json({ error: 'Message is required' });
        }

        const apiKey = process.env.OPENAI_API_KEY;

        if (!apiKey) {
            console.error('OpenAI API key not found in environment variables');
            return res.status(500).json({ error: 'API configuration error' });
        }

        const prior: ChatTurn[] = Array.isArray(history)
            ? history
                  .filter(
                      (m) =>
                          m &&
                          (m.role === 'user' || m.role === 'assistant') &&
                          typeof m.content === 'string' &&
                          m.content.trim()
                  )
                  .slice(-12)
                  .map((m) => ({ role: m.role, content: m.content.trim() }))
            : [];

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT },
                    ...prior,
                    { role: 'user', content: message.trim() },
                ],
                temperature: 0.85,
                max_tokens: 220,
            }),
        });

        if (!response.ok) {
            const error = await response.text();
            console.error('OpenAI API error:', error);
            throw new Error('Failed to get response from OpenAI');
        }

        const data = await response.json();
        const aiResponse = data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';

        return res.status(200).json({
            response: aiResponse,
            timestamp: new Date().toISOString()
        });

    } catch (error: any) {
        console.error('Chat API error:', error);
        return res.status(500).json({
            error: 'Failed to generate response',
            details: error.message
        });
    }
}
