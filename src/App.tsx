import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPages"; // Import the LandingPage component
import "./index.css";
import ProblemSolving from "./pages/ProblemSolving";

export function App() {
	return (
		<Router>
			<Routes>
				{/* Route for the landing page */}
				<Route path="/" element={<LandingPage />} />

				{/* Route for the problem-solving interface */}
				<Route path="/problems" element={<ProblemSolving />} />
			</Routes>
		</Router>
	);
}

export default App;
