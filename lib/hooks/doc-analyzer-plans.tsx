import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { DocPlan } from "../doc-analyzer.types";
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";

let nextId = 1;

type StudyPlansContextType = {
  filteredStudyPlans: DocPlan[];
  generateStudyPlan: (content: string) => void;
  deleteStudyPlan: (id: string) => void;
  toggleStar: (id: string) => void;
  showStarredOnly: boolean;
  setShowStarredOnly: (show: boolean) => void;
};

const StudyPlansContext = createContext<StudyPlansContextType | undefined>(
  undefined
);

export function StudyPlansProvider({ children }: { children: ReactNode }) {
  const [studyPlans, setStudyPlans] = useState<DocPlan[]>([]);
  const [filteredStudyPlans, setFilteredStudyPlans] =
    useState<DocPlan[]>(studyPlans);
  const [showStarredOnly, setShowStarredOnly] = useState(false);

  useEffect(() => {
    if (showStarredOnly) {
      setFilteredStudyPlans(studyPlans.filter((plan) => plan.starred));
    } else {
      setFilteredStudyPlans(studyPlans);
    }
  }, [showStarredOnly, studyPlans]);

  const addStudyPlan = (plan: Omit<DocPlan, "id">) => {
    setStudyPlans([...studyPlans, { ...plan, id: nextId++ }]);
  };

  const generateStudyPlan = async (content: string) => {
    const response = await fetch("/api/analyzer", {
      method: "POST",
      body: JSON.stringify({ content }),
    });
    const newPlan = await response.json();

    addStudyPlan({ ...newPlan, starred: false });
  };

  const deleteStudyPlan = (id: string) => {
    const numId = parseInt(id);
    setStudyPlans(studyPlans.filter((plan) => plan.id !== numId));
  };

  const toggleStar = (id: string) => {
    const numId = parseInt(id);
    setStudyPlans(
      studyPlans.map((plan) =>
        plan.id === numId ? { ...plan, starred: !plan.starred } : plan
      )
    );
  };

  useCopilotReadable({
    description: "This is a document to review",
    value: studyPlans,
  });

  useCopilotAction({
    name: "Add Document",
    description:
      "Generates a new document to review based on user content in markdown format",
    parameters: [
      {
        name: "title",
        description: "The title of the document to analyze in markdown format",
        type: "string",
      },  {
        name: "content",
        description: "The legal text content to analyze in markdown format",
        type: "string",
      },
      {
        name: "tips",
        description:
          "Tips (atleast 20) to add in the document to make it more legally sound in markdown format",
        type: "string",
      }, {
        name: "review",
        description:
          "Provide Legal Review of the document to analyze and provide feedback to the user in markdown format",
        type: "string",
      },
    ],
    handler: async (args) => {
      console.log(args);
      addStudyPlan({
        ...args,
        starred: false,
      });
    },
  });

  useCopilotAction({
    name: "deleteStudyPlan",
    description: "Deletes a document from the list",
    parameters: [
      {
        name: "id",
        description: "The id of the document to delete",
        type: "string",
      },
    ],
    handler: ({ id }) => {
      deleteStudyPlan(id);
    },
  });

  return (
    <StudyPlansContext.Provider
      value={{
        filteredStudyPlans,
        generateStudyPlan,
        deleteStudyPlan,
        toggleStar,
        showStarredOnly,
        setShowStarredOnly,
      }}
    >
      {children}
    </StudyPlansContext.Provider>
  );
}

export function useStudyPlans() {
  const context = useContext(StudyPlansContext);
  if (!context) {
    throw new Error("useStudyPlans must be used within a StudyPlansProvider");
  }
  return context;
}
