import { z } from "zod";

export type DocPlan = {
  id: number;
  title: string;
  content: string;
  tips: string;
  review: string;
  starred: boolean;
};

export const DocAnalyzerSchema = z.object({
  title: z.string().describe(""),
  content: z.string().describe(""),
  tips: z
    .string()
    .describe(
      ""
    ),
  review: z
    .string()
    .describe(
      ""
    ),
});
