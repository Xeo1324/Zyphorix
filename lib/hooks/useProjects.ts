'use client';

import { create } from 'zustand';

export interface Project {
  id: string;
  userId: string;
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  thumbnailUrl?: string;
  githubLink?: string;
  demoLink?: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface ProjectStore {
  projects: Project[];
  selectedProject: Project | null;
  loading: boolean;
  setProjects: (projects: Project[]) => void;
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  setSelectedProject: (project: Project | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  selectedProject: null,
  loading: false,
  setProjects: (projects) => set({ projects }),
  addProject: (project) =>
    set((state) => ({ projects: [project, ...state.projects] })),
  updateProject: (project) =>
    set((state) => ({
      projects: state.projects.map((p) => (p.id === project.id ? project : p)),
    })),
  deleteProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== id),
    })),
  setSelectedProject: (project) => set({ selectedProject: project }),
  setLoading: (loading) => set({ loading }),
}));
