"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { LazyMotion, domAnimation, useInView } from "framer-motion";
import { WelcomeAnimation } from "./IntroAnimation";
import { useScrollTo } from "hooks";
import { useStoreContext } from 'store/provider'

const BlockContent = require('@sanity/block-content-to-react')

export function WelcomeSection() {
	// https://github.com/recharts/recharts/issues/3615#:~:text=leaving%20this%20here%3A-,const%20error%20%3D%20console.error%3B%0Aconsole.error%20%3D%20(...args%3A%20any)%20%3D%3E%20%7B%0A%20%20if%20(/defaultProps/.test(args%5B0%5D))%20return%3B%0A%20%20error(...args)%3B%0A%7D%3B,-%F0%9F%91%8D
	const error = console.error;
		console.error = (...args) => {
		if (/defaultProps/.test(args[0])) return;
		error(...args);
	};

	const { profile, profileLoading } = useStoreContext();
	const ref = useRef(null);
	const introRef = useRef(null);
	const isInView = useInView(ref, { once: true });
	const { scrollToEl } = useScrollTo();

	let [count, setCount] = useState(0);
	const [text, setText] = useState([
		'build dynamic web apps with modern tech',
		'develop interactive and responsive UIs',
		'craft feature-rich sites with modern tools',
		'create engaging UX using React and Next.js'
	]);

	const onClick = (e) => scrollToEl(e);

	const serializers = {
		marks: {
		  color: ({ children, mark }) => {
			const { hex } = mark;
			return <span style={{ color: hex }}>{children}</span>;
		  },
		},
		types: {
		  block: ({ node, children }) => {
			const style = node.style || 'normal';
	  
			switch (style) {
			  case 'h1':
				return (
					<h1
						className="text-3xl md:text-5xl xl:text-6xl font-bold"
						style={{
							transform: isInView ? "none" : "translateX(-200px)",
							opacity: isInView ? 1 : 0,
							transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
						}}
					>
						{children}
					</h1>
				);
			  default:
				return <p>{children}</p>;
			}
		  },
		},
	};

	useEffect(() => {
		let interval = setInterval(() => {
			setCount(count + 1);
			
			if (profile && profile.changing_texts) {
				setText(profile.changing_texts);
			}

			if (count === 3) {
				setCount(0);
			}
		}, 2000);

		return () => clearInterval(interval);
	}, [count]);

	return (
		<LazyMotion features={domAnimation}>
			<section id="intro" className="section" ref={introRef}>
				<div className="grid grid-cols-1 md:grid-cols-[1fr_0.5fr] lg:grid-cols-[1fr_0.7fr] gap-4 items-center">
					<div className="py-5 md:py-10">
						{profileLoading ? (
							<div className="text-left text-3xl md:text-5xl xl:text-6xl font-bold">
								<p className="animate-pulse bg-gray-300 h-8 w-1/2 mb-4 rounded-sm"></p>
								<p className="animate-pulse bg-gray-300 h-4 w-3/4 mb-2  rounded-sm"></p>
								<p className="animate-pulse bg-gray-300 h-4 w-2/3 rounded-sm"></p>
							</div>
						) : (
							<BlockContent blocks={profile.introduction} serializers={serializers} />
						)}

						<div className="mt-3 relative flex flex-col overflow-hidden">
							<p
								ref={ref}
								className="text-[17px] md:text-2xl sm:text-lg transform-none opacity-100"
								style={{
									transform: isInView ? "none" : "translateX(-200px)",
									opacity: isInView ? 1 : 0,
									transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
								}}
							>
								I
								<span
									className="absolute flex flex-col transition-all duration-500 ease-in-expo"
									style={{
										top:
											count === 0
												? "0"
												: count === 1
												? "-100%"
												: count === 2
												? "-200%"
												: count === 3
												? "-300%"
												: "0",
										left: "13px"
									}}
								>
									{text.map((element) => (
										<TextElement key={element} element={element} />
									))}
								</span>
							</p>
						</div>

						<p
							tabIndex="0"
							ref={ref}
							className="mt-3 mb-10 text-gray-500 text-xl"
							style={{
								transform: isInView ? "none" : "translateX(-200px)",
								opacity: isInView ? 1 : 0,
								transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
							}}
						>
							Stick around to see some of my work.
						</p>
						<div
							ref={ref}
							style={{
								transform: isInView ? "none" : "translateY(50px)",
								opacity: isInView ? 1 : 0,
								transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
							}}
						>
							<Link
								href="#projects"
								onClick={onClick}
								tabIndex="0"
								className="btn bg-teal-600 rounded shadow hover:bg-teal-700"
								aria-label="Latest projects"
							>
								See my latest projects
							</Link>
						</div>
					</div>

					<div
						className="h-52 w-52 sm:h-auto sm:w-auto md:w-5/6 mx-auto md:mx-0" // Add mx-auto for centering in mobile view
					>
						{profileLoading ? <p className="animate-pulse bg-gray-300 h-52 w-52 text-center md:h-72 md:w-72 rounded-full"></p> : <WelcomeAnimation profile={profile} />}
					</div>
				</div>
			</section>
		</LazyMotion>
	);
}

function TextElement({ element }) {
	const firstWord = <b>{element.split(" ").at(0)}</b>;
	const restWords = element.split(" ").slice(1).join(" ");
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true });

	return (
		<span
			tabIndex="0"
			ref={ref}
			className="text-[17px] md:text-2xl"
			style={{
				transform: isInView ? "none" : "translateX(-200px)",
				opacity: isInView ? 1 : 0,
				transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
			}}
		>
			{firstWord} {restWords}
		</span>
	);
}
