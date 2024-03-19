"use client";

import { useEffect } from 'react';
import { useTheme } from "next-themes";
import { useMantineColorScheme } from '@mantine/core';
import { WelcomeSection, AboutSection, TechnologiesSection, ProjectsSection } from "app/sections";
import { getProfile, getLatestProjects } from 'utils';
import { useStore } from '../store'


export default function Page() {
	const { setProfile, setLatestProjects } = useStore();
	const { theme, systemTheme } = useTheme();
	const currentTheme = theme === "system" ? systemTheme : theme;

	const { setColorScheme } = useMantineColorScheme();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const profileData = await getProfile();
				const projectData = await getLatestProjects();

				setProfile({ ...profileData[0] });
				setLatestProjects(projectData)
				setColorScheme(currentTheme)
			} catch (error) {
				console.error('Error while fetching data:', error);
			}
		};

		fetchData();
	}, []);

	return (
		<div className="container-md">
			<WelcomeSection />
			<AboutSection />
			<ProjectsSection />
			<TechnologiesSection />
		</div>
	);
}
