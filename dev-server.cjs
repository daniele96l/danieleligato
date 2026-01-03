// Local development server for API functions
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const CV_CONTENT = `Hello, I'm Dani 👋

Data Scientist & AI Founder
Building Production AI for Global Enterprises & SaaS for 20k+ Users

Italian engineer with a Master's from Polytechnic of Milan, currently building ML models at T-Mobile (and winning awards for it 🏆). I also run Backtes.to, a fintech platform serving 20k+ users. Always up for interesting collaborations!

💼 Experience

AI Founder & Lead Developer - Backtes.to - Financial Analysis SaaS (Feb 2025 - Present)
• Built an investment analysis platform serving 20,000+ monthly active users across Europe
• Developed full-stack application: Python/Flask backend, Dash interactive frontend, Firebase database
• Integrated LLM OpenAI-powered chatbot with RAG system to provide investment guidance

Medior Data Scientist - T-Mobile (Jan 2023 - Present • Brno, Czech Republic)
• Forecasting Time series data with ML and Statistical models (Arima, Xgboost…)
• Operationalized production models using CI/CD pipelines, and deployment on OCP and GCP
• Collaborating with clients to meet high requirements, achieved 98% precision on revenue forecast
• Won the AI project of the year 🏆

Junior Data Scientist - Analytical Platform (July 2022 - Dec 2023 • Brno, Czech Republic)
• Implementing time series and ML models with Scikit-learn for stock forecasting
• Deploying lambda functions on AWS and using Sagemaker
• Wrote production ready code that generated 16% return per year on clients portfolios, beating our benchmark by 5%

Graduate Analyst Developer - FNZ (Sep 2021 - July 2022 • Brno, Czech Republic)
• Designed databases in MySQL (stored procedures, views, tables)
• Wrote business logic in C#

🎓 Education

Oxford Machine Learning Summer School (2020)
Polytechnic of Milan - Master in Computer Science and Engineering for Machine Learning and AI (09/2019 - 02/2022)
Erasmus exchange in Warsaw (02/2021 - 07/2021)
University of Pavia - Bachelor in Computer Engineering (09/2015 - 04/2018)
Erasmus internship in Oporto (04/2018 - 07/2018)

🛠 Tech Stack

Programming Languages: Python, SQL, C#
Skills: Time Series, Machine Learning, Deep Learning, Computer Vision, Data Analysis, RAG
Frameworks & Technologies: Scikit-learn, NumPy, Pandas, Polars, Keras, PyTorch
Tools & Platforms: Docker, Kubernetes, OpenShift (OCP), Google Cloud Platform (GCP), CI/CD, Git`;

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error('OPENAI_API_KEY not found in .env file');
      return res.status(500).json({ error: 'API configuration error' });
    }

    const fetch = (await import('node-fetch')).default;
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are Dani, a Data Scientist and AI Engineer chatting with a visitor on your portfolio website.

YOUR BACKGROUND:
${CV_CONTENT}

HOW TO RESPOND:
- Speak naturally in first person as Dani
- Give specific, varied answers based on what they're asking - don't repeat yourself
- When asked general questions (like "what can you do?"), highlight 2-3 specific achievements or current projects
- Keep answers concise (1-3 sentences max)
- Be friendly and conversational, use emojis occasionally 🚀
- Vary your language - avoid starting every response the same way
- When they ask about "what you can do", interpret it as asking about YOUR (Dani's) professional capabilities and skills
- Focus on specific examples: T-Mobile's 98% forecast precision, Backtes.to with 20k users, ML/AI expertise

IMPORTANT: 
- Each response should be UNIQUE and directly answer their specific question
- Don't list your entire background every time
- Use different openings: "I...", "Currently...", "At T-Mobile...", "I built...", etc.`
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 200,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenAI API error:', error);
      throw new Error('Failed to get response from OpenAI');
    }

    const data = await response.json();
    const aiResponse = data.choices[0] && data.choices[0].message && data.choices[0].message.content 
      ? data.choices[0].message.content 
      : 'Sorry, I could not generate a response.';

    res.json({
      response: aiResponse,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({
      error: 'Failed to generate response',
      details: error.message
    });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 API server running on http://localhost:${PORT}`);
  console.log(`✅ Ready to handle /api/chat requests`);
});
