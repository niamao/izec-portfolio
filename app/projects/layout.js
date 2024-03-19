"use client";

import { Suspense, useEffect } from "react";
import { useTheme } from "next-themes";
import { ErrorBoundary } from "react-error-boundary";
import { HeadingDivider, Loader } from "components";
import { Filter } from "./components/Filter";
import Error from "../error";
import { Projects } from "./components/Projects";
import { getProjects, getProfile } from 'utils';
import { useStore } from '../../store'
import { MantineProvider, useMantineColorScheme } from '@mantine/core';

export default function Page() {
	const { theme, systemTheme } = useTheme();
	const currentTheme = theme === "system" ? systemTheme : theme;
	const { setColorScheme } = useMantineColorScheme();
	const { projects, setProjects, setProfile, value, filterType } = useStore();
	const filteredProjects = (projects && projects.filter(project => {
		if (value.length) {
			if (filterType === 'all') {
				return value.every(value => project.stacks.includes(value));
			}
	
			return value.some(value => project.stacks.includes(value));
		}

		return true
	})) || [];

	let error = null

	useEffect(() => {
		const fetchData = async () => {
			try {
				const profileData = await getProfile();
				const projectsData = await getProjects();

				setProfile({ ...profileData[0] });
				setProjects(projectsData)
				setColorScheme(currentTheme)
			} catch (error) {
				error = true
				console.error('Error while fetching all project data:', error);
			}
		};

		fetchData();
	}, []);

	if (error) {
		return <div className="container-md">Error loading projects...</div>;
	}

	return (
		<MantineProvider>
			<div className="container-md">
				<section id="projects" className="section pt-2.5">
					<HeadingDivider title="Projects" />

					<Filter />

					<Suspense
						fallback={
							<div className="flex-center">
								<Loader />
							</div>
						}
					>
						<ErrorBoundary FallbackComponent={Error}>
							{filteredProjects.length ? (
								<Projects projects={filteredProjects} />
							) : value.length ? (
								<div className="flex flex-col items-center justify-center">
									<div className="text-center">
										<h3 className="text-2xl">
											No project found for the selected stack.
										</h3>
									</div>
									<div className="flex justify-center mt-2 overflow-x-auto">
										<div className="inline-block whitespace-no-wrap mx-auto w-80 text-center">
											{value.map((tech, index) => (
												<span key={index}>
													{index > 0 && ', '}
													{index === value.length - 1 && value.length > 1 && ' and '}
													{tech}
												</span>
											))}
										</div>
									</div>
								</div>
							) : null}
						</ErrorBoundary>
					</Suspense>
				</section>
			</div>
		</MantineProvider>
	);
}
