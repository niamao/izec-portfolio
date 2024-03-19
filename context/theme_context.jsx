"use client";

import { useState, useEffect } from 'react'
import { ThemeProvider } from "next-themes";
import { StoreProvider } from "store/provider"

export function ThemeContext({ children }) {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {	
		setLoaded(true);
	}, [setLoaded]);

	return loaded ? (
		<ThemeProvider attribute="class">
			<StoreProvider>
				{children}
			</StoreProvider>
		</ThemeProvider>
	) : null;
}
