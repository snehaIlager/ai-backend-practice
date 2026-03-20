import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI} from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(express.json());

//gemini setup
const genAI  = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.get("/test", async (req, res) => {
    try {
        // Using gemini-1.5-flash-latest is usually the most reliable for testing
        const model = genAI.getGenerativeModel({
            model: "gemini-3-flash-preview", 
        });

        const result = await model.generateContent("Say hello like a friendly assistant");
        res.json({ answer: result.response.text() });

    } catch (error) {
        console.error("Detailed Error:", error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});