import { model } from "@/lib/groq";
import { DocAnalyzerSchema, DocPlan } from "@/lib/doc-analyzer.types";
import { generateObject } from "ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    if (!body.content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    const prompt = `
    You are a Legal Advisor, first understand the following content:
    
    Document Content: ${body.content}

    now return your own analyzed reponse in json only format, for example:

    {
      "title": "Legal Analysis of Document or any other thing.. as your wish",
      "content": "The content of the document you got in summarized format",
      "tips": "1. Tip 1\n2. Tip 2\n3. Tip 3\n4. Tip 4\n5. Tip 5...  upto 20 OR 30 tips in new line in more than 500 words",
      "review": "A detailed legal analysis of the document, revisions, suggestions etc with A very long very long comprehensive review of the document in more than 1000 words"
    }`
    ;

    // Generate the analysis
    const result = await generateObject({
      model: model,
      schema: DocAnalyzerSchema.strict(),
      prompt,
    });

    // Create a complete DocPlan object
    const docPlan: DocPlan = {
      id: Date.now(), // Generate a unique ID
      title: result.object.title,
      content: result.object.content,
      tips: result.object.tips,
      review: result.object.review,
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