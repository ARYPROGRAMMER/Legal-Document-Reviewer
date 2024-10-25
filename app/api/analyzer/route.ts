// import { model } from "@/lib/groq";
// import { DocAnalyzerSchema } from "@/lib/doc-analyzer.types";
// import { generateObject } from "ai";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const prompt = `You are an Legal Consulting Advisor. Analyze the document given and help users understand and improve their legal documents. The Document is title is ${body.title} and other requirements are as follows:
//         - The Severities, Risks and the Description of the Document.
//         - A complete breakdown of all changes in the document to make it more legally sound in markdown format.
//         - Tips(atmost 5) to add in the document to make it more legally sound`;

//     const result = await generateObject({
//       model,
//       schema: DocAnalyzerSchema,
//       prompt,
//     });

//     return NextResponse.json(result.object);
//   } catch (error) {
//     console.error("Error analyzing document:", error);
//     return NextResponse.json({ error: "Failed to analyze document." });
//   }
// }

import { model } from "@/lib/groq";
import { DocAnalyzerSchema, DocPlan } from "@/lib/doc-analyzer.types";
import { generateObject } from "ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    if (!body.title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    const prompt = `As a Legal Consulting Advisor, analyze the following document titled "${body.title}". Provide:

1. A comprehensive description that outlines:
   - Key legal risks and their severity levels
   - Potential compliance issues
   - Areas requiring immediate attention

2. A detailed markdown-formatted breakdown of required changes, including:
   - Section-by-section analysis
   - Specific recommendations for improvement
   - Legal implications of each change

3. A markdown-formatted list of 5 essential tips to enhance the document's legal soundness, focusing on:
   - Risk mitigation
   - Compliance improvement
   - Legal protection enhancement

Format the response maintaining clear structure and using markdown for better readability.`;

    // Generate the analysis
    const result = await generateObject({
      model,
      schema: DocAnalyzerSchema,
      prompt,
    });

    // Create a complete DocPlan object
    const docPlan: DocPlan = {
      id: Date.now(), // Generate a unique ID
      title: body.title,
      description: result.object.description,
      studyPlan: result.object.studyPlan,
      tips: result.object.tips,
      starred: false
    };

    return NextResponse.json(docPlan);
  } catch (error) {
    console.error("Error analyzing document:", error);
    
    // More detailed error handling
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to analyze document" },
      { status: 500 }
    );
  }
}