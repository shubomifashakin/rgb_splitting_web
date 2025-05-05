import { SplitSquareVertical } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <SplitSquareVertical className="h-6 w-6" />
      <div className="group flex items-baseline text-xl font-semibold lowercase">
        <span className="text-xl font-semibold text-red-300 dark:text-red-600/80">
          r
        </span>
        <span className="text-xl font-semibold text-green-300 dark:text-green-600/80">
          g
        </span>
        <span className="text-xl font-semibold text-blue-300 dark:text-blue-600/80">
          b
        </span>
        <span className="rgb-gradient bg-clip-text transition-colors duration-150 ease-linear group-hover:bg-gradient-to-r group-hover:text-transparent">
          reak
        </span>
      </div>
    </div>
  );
}
