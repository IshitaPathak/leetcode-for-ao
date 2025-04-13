import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ArweaveWalletKit } from "arweave-wallet-kit";

createRoot(document.getElementById("root")!).render(
	<ArweaveWalletKit
		config={{
			permissions: ["ACCESS_ADDRESS", "SIGN_TRANSACTION"],
			appInfo: {
				name: "Anon",
				logo: "https://arweave.net/jAvd7Z1CBd8gVF2D6ESj7SMCCUYxDX_z3vpp5aHdaYk",
			},

			gatewayConfig: { host: "g8way.io", port: 443, protocol: "https" },
		}}
	>
		<App />
	</ArweaveWalletKit>
);
