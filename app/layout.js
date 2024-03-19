import { Suspense } from "react";
import { AppHeader, AppFooter, AppMetadata } from "components";
import Loading from "./loading";
import "styles/globals.css";
import '@mantine/core/styles.css';
import { ThemeContext } from "context";
import { MantineProvider } from '@mantine/core';

export const metadata = { ...AppMetadata };

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className="bg-brand-light dark:bg-brand-dark">
				<ThemeContext>
					<MantineProvider>
						<AppHeader />
						<Suspense fallback={<Loading />}>
							{children}
						</Suspense>
						<AppFooter />
					</MantineProvider>
				</ThemeContext>
			</body>
		</html>
	);
}
