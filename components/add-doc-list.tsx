import { useStudyPlans } from "@/lib/hooks/doc-analyzer-plans";
import StudyPlanCard from "./doc-analyzed";
import AddStudyPlan from "./add-doc-analyze";
import { DocPlan } from "@/lib/doc-analyzer.types";
import Link from "next/link";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ModeToggle } from "@/components/theme/theme-toggle";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
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

export default function StudyPlansList() {
  const {
    filteredStudyPlans: studyPlans,
    generateStudyPlan,
    deleteStudyPlan,
    toggleStar,
    showStarredOnly,
    setShowStarredOnly,
  } = useStudyPlans();

  return (
    <TooltipProvider>
      <ScrollArea className="h-screen">
        <div className="container mx-auto p-6">
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
                    onClick={() => setShowStarredOnly(!showStarredOnly)}
                  >
                    {showStarredOnly ? "Showing Starred" : "Show Starred"}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {showStarredOnly ? "Show all documents" : "Show only starred documents"}
                </TooltipContent>
              </Tooltip>
              <AddStudyPlan onAdd={generateStudyPlan} />
            </div>
          </div>

          <Separator className="mb-6" />

          {studyPlans.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {studyPlans.map((plan: DocPlan) => (
                <StudyPlanCard
                  key={plan.id}
                  plan={plan}
                  toggleStar={toggleStar}
                  deletePlan={deleteStudyPlan}
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
                  <AddStudyPlan onAdd={generateStudyPlan} />
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </ScrollArea>
    </TooltipProvider>
  );
}