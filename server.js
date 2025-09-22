import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config(); // loads .env file

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // secret from .env
});

// API endpoint for interview
app.post("/api/interview", async (req, res) => {
  try {
    const { question } = req.body;

    const response = await client.responses.create({
      model: "gpt-5-nano",
      input: question,
    });

    res.json({ answer: response.output[0].content[0].text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
