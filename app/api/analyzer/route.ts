import { model } from "@/lib/groq";
import { DocAnalyzerSchema } from "@/lib/doc-analyzer.types";
import { generateObject } from "ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const prompt = `You are an Legal Consulting Advisor. Analyze the document given and help users understand and improve their legal documents. The Document is ${body.description}.`;
    const result = await generateObject({
      model,
      schema: DocAnalyzerSchema,
      prompt,
    });

    return NextResponse.json(result.object);
  } catch (error) {
    console.error("Error analyzing document:", error);
    return NextResponse.json({ error: "Failed to analyze document." });
  }
}
