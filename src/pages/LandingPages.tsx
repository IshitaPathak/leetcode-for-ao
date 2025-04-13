import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Code } from "lucide-react"; // Only keep the used icon

const LandingPages = () => {
	const [scrolled, setScrolled] = useState(false);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		// Load Inter font
		const link = document.createElement("link");
		link.href =
			"https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap";
		link.rel = "stylesheet";
		document.head.appendChild(link);

		// Handle scroll for navbar
		const handleScroll = () => {
			const offset = window.scrollY;
			setScrolled(offset > 50);
		};

		// Handle mouse movement for parallax effect
		const handleMouseMove = (e: MouseEvent) => {
			setMousePosition({
				x: e.clientX / window.innerWidth,
				y: e.clientY / window.innerHeight,
			});
		};

		window.addEventListener("scroll", handleScroll);
		window.addEventListener("mousemove", handleMouseMove);

		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	// Function to scroll to a specific section
	const scrollToSection = (id: string) => {
		const section = document.getElementById(id);
		if (section) {
			section.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<div
			className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white"
			style={{ fontFamily: "Inter, sans-serif" }}
		>
			{/* Navbar */}
			<nav
				className={`fixed w-full z-50 transition-all duration-300 ${
					scrolled
						? "bg-gray-900/95 backdrop-blur-sm shadow-lg"
						: "bg-transparent"
				}`}
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16">
						<div className="flex items-center">
							<div className="flex-shrink-0">
								<div className="flex items-center gap-2">
									<Code className="h-6 w-6 text-green-500" />
									<span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-400">
										leetcode-for-ao
									</span>
								</div>
							</div>
						</div>
						<div className="hidden md:block">
							<div className="ml-10 flex items-baseline space-x-6">
								<button
									onClick={() => scrollToSection("home")}
									className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
								>
									Home
								</button>
								<button
									onClick={() => scrollToSection("features")}
									className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
								>
									Features
								</button>
								<button
									onClick={() =>
										scrollToSection("challenges")
									}
									className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
								>
									Challenges
								</button>
								<Link
									to="/problems"
									className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
								>
									Start Coding
								</Link>
							</div>
						</div>
					</div>
				</div>
			</nav>

			{/* Hero Section */}
			<div
				id="home"
				className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
			>
				{/* Animated background elements - code-like particles */}
				<div className="absolute inset-0 overflow-hidden">
					{[...Array(12)].map((_, i) => (
						<div
							key={i}
							className="absolute rounded-lg opacity-20 bg-green-600 animate-float"
							style={{
								width: `${Math.random() * 100 + 20}px`,
								height: `${Math.random() * 10 + 5}px`,
								left: `${Math.random() * 100}%`,
								top: `${Math.random() * 100}%`,
								animationDelay: `${Math.random() * 5}s`,
								animationDuration: `${
									Math.random() * 10 + 15
								}s`,
								transform: `translate(${
									(mousePosition.x - 0.5) * -20
								}px, ${(mousePosition.y - 0.5) * -20}px)`,
								transition: "transform 0.3s ease-out",
							}}
						></div>
					))}
				</div>

				{/* Mesh gradient overlay */}
				<div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black"></div>

				<div className="container mx-auto px-4 z-10 text-center">
					<h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
						<span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
							Master Decentralized
						</span>
						<br />
						<span className="text-white">Programming With AO</span>
					</h1>

					<p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
						Practice with blockchain challenges and level up your
						Arweave and AO programming skills with our interactive
						platform.
					</p>

					<div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
						<Link
							to="/problems"
							className="bg-green-600 hover:bg-green-700 transition-all text-white px-8 py-4 rounded-lg font-medium text-lg shadow-lg shadow-green-600/20 hover:shadow-green-600/40"
						>
							Start Solving Problems
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LandingPages;
