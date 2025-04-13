// "use client";

// import { useState, useCallback, memo } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "./table";
// import { Button } from "./button";
// import {
//   Eye,
//   EyeOff,
//   ChevronLeft,
//   ChevronRight,
//   Copy,
//   Check,
// } from "lucide-react";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { useToast } from "@/hooks/use-toast";
// import { apiKeyInfo } from "@/types";
// import Link from "next/link";

// export function ApiKeyTable({ apiKeys }: { apiKeys: apiKeyInfo[] }) {
//   const [visibleKeys, setVisibleKeys] = useState<{ [key: string]: boolean }>(
//     {},
//   );
//   const [currentPage, setCurrentPage] = useState(1);
//   const [copiedKey, setCopiedKey] = useState<string | null>(null);

//   const itemsPerPage = 10;

//   const { toast } = useToast();

//   const toggleKeyVisibility = (id: string) => {
//     setVisibleKeys((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

//   const copyToClipboard = useCallback(
//     (text: string, id: string, name: string) => {
//       navigator.clipboard.writeText(text).then(() => {
//         setCopiedKey(id);

//         setTimeout(() => setCopiedKey(null), 2000);

//         toast({
//           title: "API Key Copied!",
//           description: `${name} has been copied to your clipboard.`,
//           duration: 5000,
//         });
//       });
//     },
//     [toast],
//   );

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = apiKeys.slice(indexOfFirstItem, indexOfLastItem);

//   const totalPages = Math.ceil(apiKeys.length / itemsPerPage);

//   const nextPage = () => {
//     setCurrentPage((prev) => Math.min(prev + 1, totalPages));
//   };

//   const prevPage = () => {
//     setCurrentPage((prev) => Math.max(prev - 1, 1));
//   };

//   return (
//     <div className="mx-auto w-full">
//       <Table className="overflow-hidden rounded-lg border">
//         <TableHeader>
//           <TableRow>
//             <TableHead className="text-center font-medium">Project</TableHead>

//             <TableHead className="text-center font-medium">Plan</TableHead>

//             {/* <TableHead className="text-center font-medium">API Key</TableHead> */}

//             {/* <TableHead className="text-center font-medium">
//               Created At
//             </TableHead> */}

//             <TableHead className="text-center font-medium">Status</TableHead>
//             <TableHead className="text-center font-medium">Renews</TableHead>

//             <TableHead className="text-center font-medium"></TableHead>
//           </TableRow>
//         </TableHeader>

//         <TableBody>
//           {currentItems.map((apiKey) => (
//             <TableRow key={apiKey.projectId} className="hover:bg-muted">
//               <MemTableCell className="text-center capitalize">
//                 <Link href={`/dashboard-${apiKey.projectId}`}>
//                   {apiKey.projectName}
//                 </Link>
//               </MemTableCell>

//               <MemTableCell className="text-center capitalize">
//                 {apiKey.currentPlan}
//               </MemTableCell>

//               {/* <MemTableCell className="text-center font-mono">
//                 <TooltipProvider>
//                   <Tooltip>
//                     <TooltipTrigger asChild>
//                       <button
//                         onClick={() =>
//                           copyToClipboard(
//                             apiKey.apiKey,
//                             apiKey.projectId,
//                             apiKey.projectName,
//                           )
//                         }
//                         className="text-left focus:outline-none"
//                       >
//                         {visibleKeys[apiKey.projectId] ? (
//                           apiKey.apiKey
//                         ) : (
//                           <span className="text-gray-400">
//                             ••••••••••••••••••••••••
//                           </span>
//                         )}
//                       </button>
//                     </TooltipTrigger>
//                     <TooltipContent>
//                       {copiedKey === apiKey.projectId ? (
//                         <p className="flex items-center">
//                           <Check className="mr-2 h-4 w-4" />
//                           Copied!
//                         </p>
//                       ) : (
//                         <p className="flex items-center">
//                           <Copy className="mr-2 h-4 w-4" />
//                           Click to copy
//                         </p>
//                       )}
//                     </TooltipContent>
//                   </Tooltip>
//                 </TooltipProvider>
//               </MemTableCell> */}

//               {/* <MemTableCell className="text-center">
//                 {new Date(apiKey.createdAt).toDateString()}
//               </MemTableCell> */}

//               <MemTableCell
//                 className={`text-center ${apiKey.sub_status.split("-")[0] === "active" ? "text-green-400" : "text-red-400"}`}
//               >
//                 {apiKey.sub_status.split("-")[0]}
//               </MemTableCell>

//               <MemTableCell className={`text-center`}>
//                 {apiKey.sub_status === "inactive"
//                   ? "--"
//                   : new Date(apiKey.nextPaymentDate).toDateString()}
//               </MemTableCell>

//               {/* <MemTableCell className="text-center">
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={() => toggleKeyVisibility(apiKey.projectId)}
//                   className="rounded-full"
//                 >
//                   {visibleKeys[apiKey.projectId] ? (
//                     <EyeOff className="mr-2 h-4 w-4" />
//                   ) : (
//                     <Eye className="mr-2 h-4 w-4" />
//                   )}
//                 </Button>
//               </MemTableCell> */}
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>

//       <div className="mt-4 flex items-center justify-between">
//         <div className="text-sm text-gray-500">
//           Showing {indexOfFirstItem + 1} to{" "}
//           {Math.min(indexOfLastItem, apiKeys.length)} of {apiKeys.length}{" "}
//           entries
//         </div>
//         <div className="flex space-x-2">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={prevPage}
//             disabled={currentPage === 1}
//           >
//             <ChevronLeft className="mr-2 h-4 w-4" />
//             Previous
//           </Button>
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={nextPage}
//             disabled={currentPage === totalPages}
//           >
//             Next
//             <ChevronRight className="ml-2 h-4 w-4" />
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// const MemTableCell = memo(function MemTableCell({
//   children,
//   className,
// }: {
//   children: React.ReactNode;
//   className?: HTMLDivElement["className"];
// }) {
//   return <TableCell className={className}>{children}</TableCell>;
// });
