import React from "react";
import { Github, Menu, Clipboard } from "lucide-react"; // Import Clipboard icon
//@ts-ignore
import {
	createDataItemSigner,
	dryrun,
	message,
	result,
} from "@permaweb/aoconnect";
import { useConnection, useActiveAddress } from "arweave-wallet-kit";

type NavbarProps = {
	toggleSidebar: () => void;
};

export const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
	const walletAddress = useActiveAddress();
	//@ts-ignore
	const { connected, connect, disconnect } = useConnection();

	function copyToClipboard() {
		if (walletAddress) {
			navigator.clipboard.writeText(walletAddress);
		}
	}

	return (
		<nav className="bg-[#fff] text-white h-16 flex items-center px-4">
			<div className="flex items-center justify-between w-full">
				<div className="flex items-center gap-2">
					<button
						onClick={toggleSidebar}
						className="p-2 rounded-md hover:bg-gray-800 md:hidden"
					>
						<Menu size={24} />
					</button>
					<div className="flex items-center gap-2">
						<span className="font-bold text-xl">CodeQuest</span>
					</div>
				</div>

				<div className="flex items-center gap-4">
					{walletAddress ? (
						<div className="flex items-center gap-2">
							<span className="px-4 py-2 bg-gray-200 text-black rounded-md">
								{`${walletAddress.slice(
									0,
									6
								)}...${walletAddress.slice(-4)}`}
							</span>
							<button
								onClick={copyToClipboard}
								className="p-2 bg-gray-200 text-black rounded-md hover:bg-gray-300 transition-colors"
								title="Copy Wallet Address"
							>
								<Clipboard size={16} />
							</button>
							<button
								onClick={() => disconnect()}
								className="p-2 bg-gray-200 text-black rounded-md hover:bg-gray-300 transition-colors font"
								title="Copy Wallet Address"
							>
								Disconnect
							</button>
						</div>
					) : (
						<button
							onClick={() => connect()}
							className="px-4 py-2 bg-[#2cbb5d] text-white rounded-md hover:bg-[#28a754] transition-colors"
						>
							Connect Wallet
						</button>
					)}
					<a
						href="https://github.com/IshitaPathak/leetcode-for-ao"
						target="_blank"
						rel="noopener noreferrer"
						className="text-gray-300 hover:text-white"
					>
						<Github size={20} />
					</a>
				</div>
			</div>
		</nav>
	);
};
