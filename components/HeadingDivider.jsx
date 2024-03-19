"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { initial, animate, exit, transition, getHeadingMotionProps } from "utils/motions";
import { useTheme } from 'next-themes'

export function HeadingDivider({ title = "" }) {
	const { theme, systemTheme } = useTheme()
    const currentTheme =  theme === "system" ? systemTheme : theme;
	const headingMotionProps = getHeadingMotionProps(currentTheme);

	return (
		<header className="flex items-center">
			<LazyMotion features={domAnimation}>
				<m.h2
					tabIndex="0"
					initial={initial}
					animate={{ ...animate, ...headingMotionProps }}
					exit={exit}
					transition={transition}
					className="heading-divider"
				>
					{title}
				</m.h2>
			</LazyMotion>
		</header>
	);
}
