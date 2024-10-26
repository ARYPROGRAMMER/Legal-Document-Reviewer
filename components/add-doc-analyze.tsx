import { useState } from "react";
import { Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function AddStudyPlan({
  onAdd,
}: {
  onAdd: (content: string) => void;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [newPlanContent, setNewPlanContent] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);

  const generateNewPlan = () => {
    if (newPlanContent.trim().length < 10) {
      setIsError(true);
      return;
    }
    setIsError(false);
    onAdd(newPlanContent);
    setNewPlanContent("");
    setIsDialogOpen(false);
  };

  const handleClose = () => {
    setNewPlanContent("");
    setIsError(false);
    setIsDialogOpen(false);
  };

  return (
    <TooltipProvider>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <div className="fixed bottom-20 right-6">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => setIsDialogOpen(true)}
                className="rounded-full shadow-lg hover:shadow-xl transition-all"
                size="icon"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Add a Document</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <DialogContent className="sm:max-w-2xl w-full">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Analyze Document
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Enter the legal document content below for analysis
            </DialogDescription>
          </DialogHeader>

          <Card className="mt-4">
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="documentContent" className="text-sm font-medium">
                    Document Content
                  </Label>
                  <Textarea
                    id="documentContent"
                    placeholder="Paste or type your legal document content here..."
                    value={newPlanContent}
                    onChange={(e) => {
                      setNewPlanContent(e.target.value);
                      setIsError(false);
                    }}
                    className="min-h-[300px] resize-y leading-relaxed"
                  />
                </div>

                {isError && (
                  <Alert variant="destructive">
                    <AlertDescription>
                      Please enter at least 10 characters of document content
                    </AlertDescription>
                  </Alert>
                )}

                <div className="text-xs text-muted-foreground">
                  Tip: For best results, ensure the document is properly formatted
                  and contains clear legal language
                </div>
              </div>
            </CardContent>
          </Card>

          <DialogFooter className="flex justify-between items-center mt-6 sm:justify-between">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="default"
                onClick={generateNewPlan}
                disabled={newPlanContent.trim().length === 0}
                className="px-6"
              >
                Start Review
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}