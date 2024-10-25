"use client";

import StudyPlansList from "@/components/add-doc-list";
import { StudyPlansProvider } from "@/lib/hooks/doc-analyzer-plans";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";

export default function Home() {
  return (
    <>
      <CopilotKit runtimeUrl="/api/copilotkit">
        <StudyPlansProvider>
          <StudyPlansList />
        </StudyPlansProvider>
        <CopilotPopup
          instructions="You are an Legal Consulting Advisor. Analyze the document given and help users understand and improve their legal documents."
          labels={{
            title: "Legal Document Reviewer",
            initial:
              "Welcome to Legal Document Reviewer! Get Started with Analyzing your content.",
          }}
        />
      </CopilotKit>
    </>
  );
}
