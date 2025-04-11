import { useEffect, useState } from "react";
import { Layout } from "./components/Layout";
import { ProblemList } from "./components/ProblemList";
import { ProblemViewer } from "./components/ProblemViewer";
import { CodeEditor } from "./components/CodeEditor";
import { TestRunner } from "./components/TestRunner";
import { problems } from "./data/problems";
import "./index.css";
import {
  createDataItemSigner,
  dryrun,
  message,
  result,
} from "@permaweb/aoconnect";

export function App() {
  // Divider position state (percentage width of the ProblemViewer panel)
  const [dividerPosition, setDividerPosition] = useState(50); // Default: 50%

  const [selectedProblemId, setSelectedProblemId] = useState<string | null>(
    null
  );
  const [userCode, setUserCode] = useState<Record<string, string>>({});
  const [showSidebar, setShowSidebar] = useState(true);
  const [solvedProblems, setSolvedProblems] = useState<string[]>([]);

  // Load saved code and solved problems from localStorage on initial render
  useEffect(() => {
    const savedCode = localStorage.getItem("leetcode-clone-code");
    if (savedCode) {
      setUserCode(JSON.parse(savedCode));
    }

    const savedSolvedProblems = localStorage.getItem("leetcode-clone-solved");
    if (savedSolvedProblems) {
      setSolvedProblems(JSON.parse(savedSolvedProblems));
    }

    // Set first problem as default
    if (problems.length > 0 && !selectedProblemId) {
      setSelectedProblemId(problems[0].id);
    }

    // Add Google Font
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Save code to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("leetcode-clone-code", JSON.stringify(userCode));
  }, [userCode]);

  // Save solved problems to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(
      "leetcode-clone-solved",
      JSON.stringify(solvedProblems)
    );
  }, [solvedProblems]);

  const selectedProblem = problems.find(
    (problem) => problem.id === selectedProblemId
  );

  const handleCodeChange = (code: string) => {
    if (selectedProblemId) {
      setUserCode((prev) => ({
        ...prev,
        [selectedProblemId]: code,
      }));
    }
  };

  const getCurrentCode = () => {
    if (!selectedProblemId) return "";
    return userCode[selectedProblemId] || selectedProblem?.defaultCode || "";
  };

  const markProblemAsSolved = (problemId: string) => {
    if (!solvedProblems.includes(problemId)) {
      setSolvedProblems((prev) => [...prev, problemId]);
    }
  };

  // Determine which problems should be unlocked
  const getUnlockedProblems = () => {
    const result = new Set<string>();

    // First problem is always unlocked
    if (problems.length > 0) {
      result.add(problems[0].id);
    }

    // All solved problems are unlocked
    solvedProblems.forEach((id) => result.add(id));

    // The problem after the last solved problem is unlocked
    for (let i = 0; i < problems.length; i++) {
      if (solvedProblems.includes(problems[i].id) && i + 1 < problems.length) {
        result.add(problems[i + 1].id);
      }
    }

    return result;
  };

  const unlockedProblems = getUnlockedProblems();

  // Handle mouse events for resizing
  const handleMouseDown = (e: React.MouseEvent) => {
    const startX = e.clientX;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const newDividerPosition = Math.min(
        Math.max(dividerPosition + (deltaX / window.innerWidth) * 100, 10),
        90
      );
      setDividerPosition(newDividerPosition);
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <Layout
      sidebar={
        <ProblemList
          problems={problems}
          selectedProblemId={selectedProblemId}
          onSelectProblem={setSelectedProblemId}
          solvedProblems={solvedProblems}
          unlockedProblems={Array.from(unlockedProblems)}
        />
      }
      showSidebar={showSidebar}
      toggleSidebar={() => setShowSidebar(!showSidebar)}
    >
      {selectedProblem ? (
        <div className="flex h-full">
          {/* Problem description panel */}
          <div
            style={{ width: `${dividerPosition}%` }}
            className="h-full overflow-auto border-r"
          >
            <ProblemViewer problem={selectedProblem} />
          </div>

          {/* Resizable divider */}
          <div
            className="w-2 bg-gray-300 cursor-col-resize"
            onMouseDown={handleMouseDown}
          ></div>

          {/* Code editor and test runner panel */}
          <div
            style={{ width: `${100 - dividerPosition}%` }}
            className="h-full flex flex-col"
          >
            <div className="flex-1 overflow-hidden">
              <CodeEditor
                code={getCurrentCode()}
                onChange={handleCodeChange}
                language={selectedProblem.codeLanguage || "javascript"}
              />
            </div>

            <div className="border-t">
              <TestRunner
                problem={selectedProblem}
                userCode={getCurrentCode()}
                onTestSuccess={() => {
                  markProblemAsSolved(selectedProblem.id);
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">
            Select a problem from the sidebar to begin.
          </p>
        </div>
      )}
    </Layout>
  );
}

export default App;