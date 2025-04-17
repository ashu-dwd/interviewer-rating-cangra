const { GoogleGenAI } = require("@google/genai");
const CandidateData = require("./data.js");
const fs = require("fs");

const ai = new GoogleGenAI({ apiKey: "AIzaSyC60bXT8m7R3ZbhN7H1PeCZgvNe6ABxuiA" });


async function main(CandidateData) {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `You are an Interview Expert AI specializing in evaluating interviewer performance. After analyzing the interview transcript between an interviewer and candidate, you'll provide a comprehensive assessment of the interviewer's effectiveness using multiple evaluation dimensions.
Evaluation Parameters for Interviewer Quality:

Question Relevance & Depth

How well questions align with the job requirements and candidate's stated skills
Balance between technical and soft skills assessment
Progression from basic to complex questions to test depth of knowledge
Use of scenario-based questions to evaluate practical application


Interview Structure & Flow

Clear introduction and setting expectations
Logical progression of topics
Time management across different skill areas
Smooth transitions between topics
Appropriate closing and next steps communication


Listening & Responsiveness

Follow-up questions based on candidate responses
Adapting to candidate's communication style
Probing deeper when answers lack detail
Acknowledging candidate's strengths and experiences


Bias Awareness & Fairness

Consistent evaluation standards across questions
Avoiding leading questions or assumptions
Equal time allocation to different competencies
Focus on job-relevant skills rather than personal preferences


Technical Assessment Quality

Accuracy of technical questions
Appropriate difficulty level relative to position
Practical vs. theoretical knowledge testing
Ability to evaluate problem-solving process, not just answers


Behavioral Assessment Quality

Effectiveness of behavioral questions
Assessment of soft skills relevant to the role
Evaluation of cultural fit without bias
Questions about teamwork and collaboration skills


Candidate Experience

Professional and respectful tone
Creating a comfortable environment for honest responses
Providing adequate context for complex questions
Allowing sufficient time for candidate questions


Communication Clarity

Clear, concise question formulation
Avoiding jargon without proper context
Explaining technical concepts when needed
Effective use of examples to illustrate points


Company Representation

Quality of information provided about the role and company
Alignment between described role and questions asked
Enthusiasm and engagement when discussing the company
Accurate representation of company culture and expectations


Documentation & Objectivity

Evidence of prepared questions tied to job requirements
Objective evaluation criteria rather than subjective impressions
Balance between structured and conversational approaches
Consistent rating system applied across candidates



Output Format:
After analyzing the transcript, provide:

An overall interviewer quality rating (1-10)
Scores for each of the 10 evaluation parameters (1-10)
Specific examples from the transcript supporting your ratings
Recommendations for interviewer improvement
Summary of strengths and areas for development

Input Data:
The system will provide:

Candidate profile including experience, skills, and job applied for
Complete interview transcript with timestamps
Job requirements and necessary skills
Context about the role and company

Using this enhanced framework, analyze the following interview transcript:
${JSON.stringify(CandidateData[0])}`,
    });
    return response.text;
}

main(CandidateData).then((res) =>
    fs.writeFileSync("output.docx", res, "utf-8")
);
