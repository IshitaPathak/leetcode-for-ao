// filepath: /Users/ishitapathak/Desktop/leetcode-for-ao/src/App.tsx
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ProblemList } from "./components/ProblemList";
import { ProblemViewer } from "./components/ProblemViewer";
import { CodeEditor } from "./components/CodeEditor";
import { TestRunner } from "./components/TestRunner";
import { problems } from "./data/problems";
import LandingPage from "./pages/LandingPages"; // Import the LandingPage component
import "./index.css";

export function App() {
  const [dividerPosition, setDividerPosition] = useState(50);
  const [selectedProblemId, setSelectedProblemId] = useState<string | null>(
    null
  );
  const [userCode, setUserCode] = useState<Record<string, string>>({});
  const [showSidebar, setShowSidebar] = useState(true);
  const [solvedProblems, setSolvedProblems] = useState<string[]>([]);

  useEffect(() => {
    const savedCode = localStorage.getItem("leetcode-clone-code");
    if (savedCode) {
      setUserCode(JSON.parse(savedCode));
    }

    const savedSolvedProblems = localStorage.getItem("leetcode-clone-solved");
    if (savedSolvedProblems) {
      setSolvedProblems(JSON.parse(savedSolvedProblems));
    }

    if (problems.length > 0 && !selectedProblemId) {
      setSelectedProblemId(problems[0].id);
    }

    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("leetcode-clone-code", JSON.stringify(userCode));
  }, [userCode]);

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

  const getUnlockedProblems = () => {
    const result = new Set<string>();

    if (problems.length > 0) {
      result.add(problems[0].id);
    }

    solvedProblems.forEach((id) => result.add(id));

    for (let i = 0; i < problems.length; i++) {
      if (solvedProblems.includes(problems[i].id) && i + 1 < problems.length) {
        result.add(problems[i + 1].id);
      }
    }

    return result;
  };

  const unlockedProblems = getUnlockedProblems();

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
    <Router>
      <Routes>
        {/* Route for the landing page */}
        <Route path="/" element={<LandingPage />} />

        {/* Route for the problem-solving interface */}
        <Route
          path="/problems"
          element={
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
                  <div
                    style={{ width: `${dividerPosition}%` }}
                    className="h-full overflow-auto border-r"
                  >
                    <ProblemViewer problem={selectedProblem} />
                  </div>

                  <div
                    className="w-2 bg-gray-300 cursor-col-resize"
                    onMouseDown={handleMouseDown}
                  ></div>

                  <div
                    style={{ width: `${100 - dividerPosition}%` }}
                    className="h-full flex flex-col"
                  >
                    <div className="flex-1 overflow-hidden">
                      <CodeEditor
                        code={getCurrentCode()}
                        onChange={handleCodeChange}
                        language={
                          selectedProblem.codeLanguage || "javascript"
                        }
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
          }
        />
      </Routes>
    </Router>
  );
}

export default App;