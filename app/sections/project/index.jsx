import { useRef } from "react";
import { domAnimation, LazyMotion, useInView } from "framer-motion";
import Link from "next/link";
import { HeadingDivider } from "components";
import { Projects } from "../../projects/components/Projects";
import { useStoreContext } from 'store/provider'

export function ProjectsSection() {
	const btnRef = useRef(null);
	const isBtnInView = useInView(btnRef, { once: true });
	const { latestProjects } = useStoreContext();

	return (
		<LazyMotion features={domAnimation}>
			<section id="projects" className="section">
				<HeadingDivider title="Latest projects" />
				<div className="h-10 md:h-14" />

				<div className="flex flex-col items-center gap-8 md:gap-14">
					<Projects projects={latestProjects} />

					<Link
						href="/projects"
						tabIndex={-1}
						aria-label="Go to projects page"
						ref={btnRef}
						className="btn bg-teal-600 rounded shadow hover:bg-teal-700"
						style={{
							transform: btnRef ? "none" : "translateX(-50px)",
							opacity: isBtnInView ? 1 : 0,
							transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
						}}
					>
						<button aria-label="See more projects">View all</button>
					</Link>
				</div>
			</section>
		</LazyMotion>
	);
}
