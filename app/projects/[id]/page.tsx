'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navbar } from '@/app/components/Navbar';
import { Project } from '@/lib/hooks/useProjects';
import { getProject } from '@/lib/utils/firestore';

export default function ProjectDetailPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (projectId) {
      loadProject();
    }
  }, [projectId]);

  const loadProject = async () => {
    try {
      setLoading(true);
      const data = await getProject(projectId);
      if (data) {
        setProject(data);
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error loading project:', error);
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-neon-blue/30 border-t-neon-blue rounded-full animate-spin"></div>
          <p className="text-white/60">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Project not found</h1>
          <Link href="/dashboard" className="btn-primary">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950">
      <Navbar />

      <main className="pt-24 pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => router.back()}
            className="text-neon-blue hover:text-neon-blue/80 flex items-center gap-2 mb-8 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </motion.button>

          {/* Project Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-5xl font-bold text-white mb-4">{project.title}</h1>
            {project.featured && (
              <span className="inline-block bg-neon-orange/80 text-dark-950 px-4 py-1 rounded-full text-sm font-semibold mb-4">
                ✨ Featured Project
              </span>
            )}
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Image and Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Project Image */}
              <div className="glass-lg overflow-hidden rounded-xl">
                {project.imageUrl && (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-auto object-cover"
                  />
                )}
              </div>

              {/* Description */}
              <div className="glass-lg p-8">
                <h2 className="text-2xl font-bold text-white mb-4">About</h2>
                <p className="text-white/80 text-lg leading-relaxed">{project.description}</p>
              </div>

              {/* Links */}
              {(project.demoLink || project.githubLink) && (
                <div className="glass-lg p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Links</h2>
                  <div className="flex flex-col sm:flex-row gap-4">
                    {project.demoLink && (
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary flex-1"
                      >
                        🌐 Live Demo
                      </a>
                    )}
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary flex-1"
                      >
                        💻 View Code
                      </a>
                    )}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Right Column - Tech Stack and Meta */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {/* Tech Stack */}
              <div className="glass-lg p-6">
                <h3 className="text-lg font-bold text-white mb-4">Tech Stack</h3>
                <div className="space-y-2">
                  {project.techStack.map((tech) => (
                    <div
                      key={tech}
                      className="flex items-center gap-3 p-3 bg-neon-blue/10 rounded-lg border border-neon-blue/20"
                    >
                      <span className="w-2 h-2 bg-neon-blue rounded-full"></span>
                      <span className="text-white font-medium">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Meta Information */}
              <div className="glass-lg p-6">
                <h3 className="text-lg font-bold text-white mb-4">Information</h3>
                <div className="space-y-3 text-white/80 text-sm">
                  <div>
                    <p className="text-white/60 mb-1">Created</p>
                    <p>
                      {new Date(project.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-white/60 mb-1">Last Updated</p>
                    <p>
                      {new Date(project.updatedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="space-y-2">
                <Link href="/dashboard" className="btn-primary w-full">
                  Back to Vault
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
