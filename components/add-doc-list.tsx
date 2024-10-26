import React from 'react';
import { useStudyPlans } from "@/lib/hooks/doc-analyzer-plans";
import type { DocPlan } from "@/lib/doc-analyzer.types";
import StudyPlanCard from "./doc-analyzed"; // Adjusted the path to match the commented-out import
import AddStudyPlan from "./add-doc-analyze"; // Adjusted the path to match the commented-out import
import Link from "next/link";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ModeToggle } from "@/components/theme/theme-toggle";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface StudyPlansListProps {}

const StudyPlansList: React.FC<StudyPlansListProps> = () => {
  const { toast } = useToast();
  const {
    filteredStudyPlans: studyPlans,
    generateStudyPlan,
    deleteStudyPlan,
    toggleStar,
    showStarredOnly,
    setShowStarredOnly,
  } = useStudyPlans();

  const handleGenerateStudyPlan = async (content: string) => {
    try {
      toast({
        title: "Analyzing document...",
        description: "Please wait while we process your document.",
        duration: 3000,
      });
      
      await generateStudyPlan(content);
      
      toast({
        title: "Success!",
        description: "Document has been analyzed successfully.",
        variant: "default",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error generating study plan:", error);
      toast({
        title: "Error",
        description: "Failed to analyze document. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  const handleDeletePlan = (id: string) => {
    try {
      deleteStudyPlan(id);
      toast({
        title: "Document deleted",
        description: "The document has been removed successfully.",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete document. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  const handleToggleStar = (id: string) => {
    try {
      toggleStar(id);
      const plan = studyPlans.find(p => p.id.toString() === id);
      const isStarred = !plan?.starred;
      
      toast({
        title: isStarred ? "Document starred" : "Document unstarred",
        description: isStarred 
          ? "Document has been added to your starred list."
          : "Document has been removed from your starred list.",
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update document star status.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  return (
    <TooltipProvider>
      <ScrollArea className="h-screen">
        <div className="container mx-auto p-6">
          {/* Header Card */}
          <Card className="mb-6">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-3xl">Legal AI by CopilotKit</CardTitle>
                  <CardDescription>
                    Analyze and review legal documents with AI assistance
                  </CardDescription>
                </div>
                <div className="flex items-center gap-4">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link 
                        href="https://github.com/ARYPROGRAMMER/Legal-Document-Reviewer"
                        className="hover:opacity-80 transition-opacity"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" size="icon">
                          <GitHubLogoIcon className="w-5 h-5" />
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>View on GitHub</TooltipContent>
                  </Tooltip>
                  <ModeToggle />
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Controls Section */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-semibold">Legal Document Reviewer</h2>
              <Badge variant="secondary">
                {studyPlans.length} {studyPlans.length === 1 ? 'Document' : 'Documents'}
              </Badge>
            </div>
            <div className="flex items-center gap-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={showStarredOnly ? "secondary" : "outline"}
                    onClick={() => {
                      setShowStarredOnly(!showStarredOnly);
                      toast({
                        title: showStarredOnly ? "Showing all documents" : "Showing starred documents",
                        duration: 2000,
                      });
                    }}
                  >
                    {showStarredOnly ? "Showing Starred" : "Show Starred"}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {showStarredOnly ? "Show all documents" : "Show only starred documents"}
                </TooltipContent>
              </Tooltip>
              <AddStudyPlan onAdd={handleGenerateStudyPlan} />
            </div>
          </div>

          <Separator className="mb-6" />

          {/* Content Section */}
          {studyPlans.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {studyPlans.map((plan: DocPlan) => (
                <StudyPlanCard
                  key={plan.id}
                  plan={plan}
                  toggleStar={() => handleToggleStar(plan.id.toString())}
                  deletePlan={() => handleDeletePlan(plan.id.toString())}
                />
              ))}
            </div>
          ) : (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-lg text-muted-foreground mb-4">
                  {showStarredOnly
                    ? "No starred documents found"
                    : "No documents analyzed yet"}
                </p>
                {showStarredOnly ? (
                  <Button
                    variant="secondary"
                    onClick={() => setShowStarredOnly(false)}
                  >
                    Show All Documents
                  </Button>
                ) : (
                  <AddStudyPlan onAdd={handleGenerateStudyPlan} />
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </ScrollArea>
    </TooltipProvider>
  );
};

export default StudyPlansList;