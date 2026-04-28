'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ProtectedRoute } from '@/lib/utils/ProtectedRoute';
import { Navbar } from '@/app/components/Navbar';
import { ProjectCard } from '@/app/components/ProjectCard';
import { ProjectCardSkeleton } from '@/app/components/ProjectCardSkeleton';
import { useAuthStore } from '@/lib/hooks/useAuth';
import { useProjectStore, Project } from '@/lib/hooks/useProjects';
import { getUserProjects, deleteProjectData } from '@/lib/utils/firestore';
import { deleteImage } from '@/lib/utils/storage';
import toast from 'react-hot-toast';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

function DashboardContent() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

  // Load projects
  useEffect(() => {
    if (user) {
      loadProjects();
    }
  }, [user]);

  const loadProjects = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const data = await getUserProjects(user.uid);
      setProjects(data);
    } catch (error) {
      console.error('Error loading projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!user) return;
    try {
      const project = projects.find((p) => p.id === projectId);
      if (project?.imageUrl) {
        try {
          await deleteImage(project.imageUrl);
        } catch (error) {
          console.warn('Failed to delete image:', error);
        }
      }
      await deleteProjectData(projectId);
      setProjects(projects.filter((p) => p.id !== projectId));
      toast.success('Project deleted');
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
    }
  };

  // Filter and sort projects
  const filteredProjects = projects
    .filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTech =
        selectedTech.length === 0 ||
        selectedTech.some((tech) =>
          project.techStack.some((t) => t.toLowerCase() === tech.toLowerCase())
        );

      return matchesSearch && matchesTech;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
    });

  // Get all unique tech stacks
  const allTechs = Array.from(
    new Set(projects.flatMap((p) => p.techStack))
  ).sort();

  return (
    <div className="min-h-screen bg-dark-950">
      <Navbar />

      {/* Main Content */}
      <main className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Dashboard Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Your Project Vault</span>
            </h1>
            <p className="text-white/60 text-lg mb-8">Manage and showcase your digital assets</p>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {[
                { label: 'Total Projects', value: projects.length },
                {
                  label: 'Featured',
                  value: projects.filter((p) => p.featured).length,
                },
                {
                  label: 'This Month',
                  value: projects.filter(
                    (p) =>
                      new Date(p.createdAt).getMonth() === new Date().getMonth()
                  ).length,
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-lg p-6"
                >
                  <p className="text-white/60 text-sm mb-2">{stat.label}</p>
                  <p className="text-3xl font-bold text-neon-blue">{stat.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Action Buttons */}
            <Link href="/upload" className="btn-primary">
              Upload New Project
            </Link>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-lg p-6 mb-8"
          >
            <div className="space-y-4">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Search Projects
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by title or description..."
                  className="input-base"
                />
              </div>

              {/* Tech Stack Filter */}
              {allTechs.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-3">
                    Filter by Tech Stack
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {allTechs.map((tech) => (
                      <button
                        key={tech}
                        onClick={() => {
                          setSelectedTech((prev) =>
                            prev.includes(tech)
                              ? prev.filter((t) => t !== tech)
                              : [...prev, tech]
                          );
                        }}
                        className={`px-4 py-2 rounded-lg transition ${
                          selectedTech.includes(tech)
                            ? 'bg-neon-blue text-black'
                            : 'glass hover:bg-white/15'
                        }`}
                      >
                        {tech}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sort */}
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-white/80">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest')}
                  className="input-base max-w-xs"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Projects Grid */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProjectCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredProjects.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onEdit={(id) => router.push(`/edit/${id}`)}
                  onDelete={handleDeleteProject}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-lg p-12 text-center"
            >
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-xl font-bold text-white mb-2">No projects found</h3>
              <p className="text-white/60 mb-6">
                {projects.length === 0
                  ? 'Start by uploading your first project to your vault'
                  : 'No projects match your search or filter'}
              </p>
              {projects.length === 0 && (
                <Link href="/upload" className="btn-primary">
                  Upload First Project
                </Link>
              )}
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
