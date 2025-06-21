# leetcode-for-ao

leetcode-for-ao is platform designed to help you level up your coding skills by solving diverse programming problems. This project is built using React, TypeScript, and TailwindCSS, and is powered by Vite for fast development.

## Folder Structure

The project is organized as follows:

```
.
├── .gitignore               # Git ignore file
├── index.html               # Main HTML file
├── package.json             # Project dependencies and scripts
├── postcss.config.js        # PostCSS configuration
├── README.md                # Project documentation
├── tailwind.config.js       # TailwindCSS configuration
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
├── src/                     # Source code
│   ├── App.tsx              # Main application component
│   ├── index.css            # Global CSS styles
│   ├── main.tsx             # Application entry point
│   ├── vite-env.d.ts        # Vite environment types
│   ├── components/          # React components
│   │   ├── CodeEditor.tsx   # Code editor component
│   │   ├── Layout.tsx       # Layout component
│   │   ├── Navbar.tsx       # Navbar component
│   │   ├── ProblemList.tsx  # Problem list component
│   │   ├── ProblemViewer.tsx# Problem viewer component
│   │   ├── TestRunner.tsx   # Test runner component
│   ├── data/                # Data files
│   │   └── problems.ts      # Problem definitions
│   ├── styles/              # CSS styles
│   │   └── prism.css        # Syntax highlighting styles
│   ├── types/               # TypeScript types
│       └── problem.ts       # Problem type definitions
```

### Key Folders and Files

- **`src/components/`**: Contains reusable React components like the code editor, problem viewer, and test runner.
- **`src/data/`**: Stores problem definitions in a structured format.
- **`src/styles/`**: Contains custom CSS styles, including syntax highlighting for the code editor.
- **`src/types/`**: Defines TypeScript types for better type safety.

## How to Use

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd leetcode-for-ao
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.

### Features

- **Problem List**: Browse through a list of coding problems.
- **Problem Viewer**: View problem descriptions, examples, and constraints.
- **Code Editor**: Write and edit code with syntax highlighting.
- **Test Runner**: Run test cases to validate your solution.

### Saving Progress

- Your code and solved problems are automatically saved to `localStorage` and restored when you revisit the app.

### Deployment

To build the project for production, run:
```bash
npm run build
```
The output will be in the `dist/` folder.

## Contributing

Feel free to fork the repository and submit pull requests for new features or bug fixes.

## License

This project is licensed under the MIT License.