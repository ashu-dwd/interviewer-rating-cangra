const { GoogleGenAI } = require("@google/genai");
const fs = require("fs");
const { SYSTEM_PROMPT_3 } = require("./prompt");
require("dotenv").config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const responseCleaner = (response) => {
    return response.replace(/^json\s*/i, '')
        .replace(/^```json\s*/i, '')
        .replace(/```$/g, '')
        .trim();
};

async function aiFeedback(CandidateData) {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `${SYSTEM_PROMPT_3} \nAnalyze the following interview transcript and user details: ${JSON.stringify(CandidateData)}`,
    });
    return JSON.parse(responseCleaner(response.text));
}





module.exports = { aiFeedback };

