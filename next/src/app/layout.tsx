import "./globals.css";
import type {Metadata} from "next";
import {Space_Grotesk} from 'next/font/google'
import { Toaster } from "@/components/ui/sonner"
import AuthChecker from "@/components/AuthChecker";

const spaceG = Space_Grotesk(
	{subsets: ["latin"], display: "swap"},
);

export const metadata: Metadata = {
	title: "ThinQ",
	description: "ThinQ is a revolutionary web platform for conducting online classes, complete with a vibrant set of features tailored to professionals in education",
};

export default function RootLayout({children}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={spaceG.className}>
			<body>
				<AuthChecker/>
				{children}
				<Toaster />
			</body>
		</html>
	);
}