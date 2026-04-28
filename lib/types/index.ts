/**
 * Type definitions for Zyphorix
 * Centralized type exports for the application
 */

import { User } from 'firebase/auth';

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

export interface AuthState {
  user: User | null;
  loading: boolean;
}

export interface ProjectStats {
  total: number;
  featured: number;
  thisMonth: number;
}
