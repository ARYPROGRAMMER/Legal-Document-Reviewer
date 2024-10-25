// import { Star, Trash2, FileText, AlertTriangle, CheckCircle } from "lucide-react";
// import { DocPlan } from "@/lib/doc-analyzer.types";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
//   SheetFooter,
//   SheetClose,
// } from "@/components/ui/sheet";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "@/components/ui/tabs";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Separator } from "@/components/ui/separator";
// import Markdown from "react-markdown";

// export default function StudyPlanCard({
//   plan,
//   toggleStar,
//   deletePlan,
// }: {
//   plan: DocPlan;
//   toggleStar: (id: string) => void;
//   deletePlan: (id: string) => void;
// }) {
//   const handleStarClick = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     toggleStar(String(plan.id));
//   };

//   const handleDeleteClick = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     deletePlan(String(plan.id));
//   };

//   return (
//     <TooltipProvider>
//       <Sheet key={plan.id}>
//         <SheetTrigger asChild>
//           <Card className="cursor-pointer hover:shadow-md transition-all duration-300 border-l-4 border-l-primary">
//             <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
//               <div className="space-y-1">
//                 <CardTitle className="text-xl font-semibold line-clamp-1">
//                   {plan.title}
//                 </CardTitle>
//                 <div className="flex gap-2">
//                   <Badge variant="outline" className="text-xs">
//                     <FileText className="w-3 h-3 mr-1" />
//                     Legal Document
//                   </Badge>
//                   {plan.starred && (
//                     <Badge variant="secondary" className="text-xs">
//                       Starred
//                     </Badge>
//                   )}
//                 </div>
//               </div>
//               <Tooltip>
//                 <TooltipTrigger asChild>
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     className="h-8 w-8"
//                     onClick={handleStarClick}
//                   >
//                     <Star
//                       className={`w-4 h-4 ${
//                         plan.starred
//                           ? "fill-yellow-400 text-yellow-400"
//                           : "text-muted-foreground"
//                       }`}
//                     />
//                   </Button>
//                 </TooltipTrigger>
//                 <TooltipContent>
//                   {plan.starred ? "Unstar document" : "Star document"}
//                 </TooltipContent>
//               </Tooltip>
//             </CardHeader>
//             <CardContent>
//               <CardDescription className="line-clamp-2 text-sm">
//                 {plan.description}
//               </CardDescription>
//             </CardContent>
//             <CardFooter className="flex justify-between items-center">
//               <div className="text-xs text-muted-foreground">
//                 Click to view analysis
//               </div>
//               <Tooltip>
//                 <TooltipTrigger asChild>
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     className="h-8 w-8"
//                     onClick={handleDeleteClick}
//                   >
//                     <Trash2 className="h-4 w-4 text-destructive" />
//                   </Button>
//                 </TooltipTrigger>
//                 <TooltipContent>Delete document</TooltipContent>
//               </Tooltip>
//             </CardFooter>
//           </Card>
//         </SheetTrigger>

//         <SheetContent className="w-full sm:max-w-2xl">
//           <SheetHeader className="space-y-4">
//             <div className="flex items-center justify-between">
//               <SheetTitle className="text-2xl font-bold">{plan.title}</SheetTitle>
//               <div className="flex gap-2">
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={() => toggleStar(String(plan.id))}
//                 >
//                   <Star
//                     className={`w-5 h-5 ${
//                       plan.starred
//                         ? "fill-yellow-400 text-yellow-400"
//                         : "text-muted-foreground"
//                     }`}
//                   />
//                 </Button>
//                 <SheetClose asChild>
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={() => deletePlan(String(plan.id))}
//                   >
//                     <Trash2 className="h-5 w-5 text-destructive" />
//                   </Button>
//                 </SheetClose>
//               </div>
//             </div>
//             <SheetDescription className="text-base">
//               {plan.description}
//             </SheetDescription>
//             <Separator />
//           </SheetHeader>

//           <Tabs defaultValue="review" className="mt-6">
//             <TabsList className="grid w-full grid-cols-2">
//               <TabsTrigger value="review">Document Review</TabsTrigger>
//               <TabsTrigger value="tips">Tips & Recommendations</TabsTrigger>
//             </TabsList>
//             <ScrollArea className="h-[60vh] mt-4 pr-4">
//               <TabsContent value="review" className="mt-0">
//                 <div className="prose prose-sm dark:prose-invert max-w-none">
//                   <Markdown>{plan.studyPlan}</Markdown>
//                 </div>
//               </TabsContent>
//               <TabsContent value="tips" className="mt-0">
//                 <div className="space-y-4">
//                   <div className="prose prose-sm dark:prose-invert max-w-none">
//                     <Markdown>{plan.tips}</Markdown>
//                   </div>
//                 </div>
//               </TabsContent>
//             </ScrollArea>
//           </Tabs>

//           <SheetFooter className="mt-6">
//             <SheetClose asChild>
//               <Button variant="outline" className="w-full">
//                 Close
//               </Button>
//             </SheetClose>
//           </SheetFooter>
//         </SheetContent>
//       </Sheet>
//     </TooltipProvider>
//   );
// }
import { DocPlan } from "@/lib/doc-analyzer.types";
import React from 'react';
import { Star, Trash2, FileText } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Markdown from "react-markdown";

// // Sample data structure
// const samplePlan = {
//   id: "1",
//   title: "Employment Contract Review",
//   description: "Detailed analysis of standard employment agreement with recommendations",
//   starred: true,
//   studyPlan: `
// ## Document Analysis

// ### Key Sections
// 1. **Employment Terms**
//    - Full-time position
//    - Start date and duration
//    - Probationary period details

// 2. **Compensation**
//    - Base salary structure
//    - Bonus eligibility
//    - Benefits package

// 3. **Intellectual Property**
//    - Work product ownership
//    - Non-compete clauses
//    - Confidentiality requirements

// ### Critical Points
// - Notice period for termination
// - Performance review criteria
// - Remote work policies
// `,
//   tips: `
// ## Recommendations

// ### Important Considerations
// 1. **Review Compensation Terms**
//    - Ensure salary figures match verbal agreements
//    - Check bonus calculation methods
//    - Verify benefits start dates

// 2. **Check Restrictive Clauses**
//    - Evaluate non-compete duration
//    - Review geographical restrictions
//    - Assess confidentiality scope

// ### Action Items
// - [ ] Compare against industry standards
// - [ ] Seek clarification on ambiguous terms
// - [ ] Negotiate problematic clauses
// `
// };

// Demo component that includes the StudyPlanCard with sample data
// const StudyPlanCardDemo = () => {
//   const [plan, setPlan] = React.useState(samplePlan);
  
//   const toggleStar = (id) => {
//     setPlan(prev => ({
//       ...prev,
//       starred: !prev.starred
//     }));
//   };
  
//   const deletePlan = (id) => {
//     console.log('Delete clicked for plan:', id);
//   };
  
//   return (
//     <div className="p-4 max-w-md">
//       <StudyPlanCard
//         plan={plan}
//         toggleStar={toggleStar}
//         deletePlan={deletePlan}
//       />
//     </div>
//   );
// };

// Original StudyPlanCard component
export default function StudyPlanCard({
  plan,
  toggleStar,
  deletePlan,
}: {
  
  plan: DocPlan;
  toggleStar: (id: string) => void;
  deletePlan: (id: string) => void;

}){

    const handleStarClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      toggleStar(String(plan.id));
    };
  
    const handleDeleteClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      deletePlan(String(plan.id));
    };

  return (
    <TooltipProvider>
      <Sheet key={plan.id}>
        <SheetTrigger asChild>
          <Card className="cursor-pointer hover:shadow-md transition-all duration-300 border-l-4 border-l-primary">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle className="text-xl font-semibold line-clamp-1">
                  {plan.title}
                </CardTitle>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs">
                    <FileText className="w-3 h-3 mr-1" />
                    Legal Document
                  </Badge>
                  {plan.starred && (
                    <Badge variant="secondary" className="text-xs">
                      Starred
                    </Badge>
                  )}
                </div>
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={handleStarClick}
                  >
                    <Star
                      className={`w-4 h-4 ${
                        plan.starred
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {plan.starred ? "Unstar document" : "Star document"}
                </TooltipContent>
              </Tooltip>
            </CardHeader>
            <CardContent>
              <CardDescription className="line-clamp-2 text-sm">
                {plan.description}
              </CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="text-xs text-muted-foreground">
                Click to view analysis
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={handleDeleteClick}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Delete document</TooltipContent>
              </Tooltip>
            </CardFooter>
          </Card>
        </SheetTrigger>

        <SheetContent className="w-full sm:max-w-2xl">
          <SheetHeader className="space-y-4">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-2xl font-bold">{plan.title}</SheetTitle>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleStar(String(plan.id))}
                >
                  <Star
                    className={`w-5 h-5 ${
                      plan.starred
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                </Button>
                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deletePlan(String(plan.id))}
                  >
                    <Trash2 className="h-5 w-5 text-destructive" />
                  </Button>
                </SheetClose>
              </div>
            </div>
            <SheetDescription className="text-base">
              {plan.description}
            </SheetDescription>
            <Separator />
          </SheetHeader>

          <Tabs defaultValue="review" className="mt-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="review">Document Review</TabsTrigger>
              <TabsTrigger value="tips">Tips & Recommendations</TabsTrigger>
            </TabsList>
            <ScrollArea className="h-[60vh] mt-4 pr-4">
              <TabsContent value="review" className="mt-0">
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <Markdown>{plan.studyPlan}</Markdown>
                </div>
              </TabsContent>
              <TabsContent value="tips" className="mt-0">
                <div className="space-y-4">
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <Markdown>{plan.tips}</Markdown>
                  </div>
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>

          <SheetFooter className="mt-6">
            <SheetClose asChild>
              <Button variant="outline" className="w-full">
                Close
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </TooltipProvider>
  );
}