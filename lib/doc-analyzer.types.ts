import { z } from "zod";

export type DocPlan = {
  id: number;
  title: string;
  description: string;
  studyPlan: string;
  tips: string;
  starred: boolean;
};

export const DocAnalyzerSchema = z.object({
  title: z.string().describe("The Idea of the Document as Title"),
  description: z
    .string()
    .describe(
      "The Severities, Risks and the Description of the Document"
    ),
    DocPlan: z
    .string()
    .describe(
      "A complete breakdown of all changes in the document to make it more legally sound"
    ),
  tips: z
    .string()
    .describe(
      "Tips(atmost 5) to add in the document to make it more legally sound"
    ),
});
