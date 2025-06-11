const { GoogleGenAI } = require("@google/genai");
const CandidateData = require("./data.js");
const fs = require("fs");
const path = require("path");
const { SYSTEM_PROMPT_3 } = require("./Controllers/prompt.js");

const ai = new GoogleGenAI({ apiKey: "" });


async function main(CandidateData) {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `${SYSTEM_PROMPT_3} analyze the following interview transcript:
${JSON.stringify(CandidateData)}`,
    });
    return response.text;
}




module.exports = main;
