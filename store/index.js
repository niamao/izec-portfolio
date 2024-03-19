import { create } from 'zustand';

export const useStore = create((set) => {
    const profile = {
        profile: null,
        profileLoading: true,
        setProfile: (profile) => set({ profile, profileLoading: false }),
    };

    const latestProjects = {
        latestProjects: null,
        latestProjectsLoading: true,
        setLatestProjects: (latestProjects) => set({ latestProjects, latestProjectsLoading: false }),
    };

    const projects = {
        projects: null,
        projectsLoading: true,
        setProjects: (projects) => set({ projects, projectsLoading: false }),
    };
    
    const filterValue = {
        value: [],
        setValue: (value) => set({ value }),
    }

    const filterType = {
        filterType: 'all',
        setFilterType: (filterType) => set({ filterType }),
    }

    const hideSelected = {
        hideSelected: false,
        setHideSelected: (hideSelected) => set({ hideSelected }),
    }

    return {
        ...profile,
        ...projects,
        ...latestProjects,
        ...filterValue,
        ...filterType,
        ...hideSelected,
    }
});