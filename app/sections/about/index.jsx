"use client";

import {useRef} from "react";
import {LazyMotion, domAnimation, useInView} from "framer-motion";
import {HeadingDivider} from "components";
import {TimeLine} from "./TimeLine";
import { useStoreContext } from 'store/provider'
import { ScrollArea } from '@mantine/core';

const BlockContent = require('@sanity/block-content-to-react')

export function AboutSection() {
	const { profile, profileLoading } = useStoreContext();
	const ref = useRef(null);
	const isInView = useInView(ref, {once: true});

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
							transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
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

	return (
		<LazyMotion features={domAnimation}>
			<section id="about" className="section">
				<HeadingDivider title="About me"/>
				<div className="pt-10 pb-16 max-w-5xl flex flex-col gap-3">
					<div
						tabIndex="0"
						ref={ref}
						className="text-xl font-light leading-relaxed"
						style={{
							transform: isInView ? "none" : "translateX(-200px)",
							opacity: isInView ? 1 : 0,
							transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
						}}
					>
						{profileLoading ? (
							<div className="text-left text-3xl md:text-5xl xl:text-6xl font-bold">
								<p className="animate-pulse bg-gray-300 h-4 w-1/2 mb-4 rounded-sm"></p>
								<p className="animate-pulse bg-gray-300 h-4 w-3/4 mb-2  rounded-sm"></p>
								<p className="animate-pulse bg-gray-300 h-4 w-2/3 rounded-sm"></p>
							</div>
						) : (
							<BlockContent blocks={profile.me} serializers={serializers} />
						)}
					</div>
				</div>
				{profile && profile.timeline && (
					<ScrollArea scrollbars='x' offsetScrollbars w="99%" scrollbarSize={5} type="never">
						<TimeLine timeline={profile.timeline} />
					</ScrollArea>
				)}
			</section>
		</LazyMotion>
	);
}
