'use client';

import React from 'react';
import { Project } from '@/lib/hooks/useProjects';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface ProjectCardProps {
  project: Project;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
  showActions?: boolean;
}

export function ProjectCard({
  project,
  onDelete,
  onEdit,
  showActions = true,
}: ProjectCardProps) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="glass-lg overflow-hidden group cursor-pointer transition-all duration-300 h-full flex flex-col"
      onClick={() => router.push(`/projects/${project.id}`)}
    >
      {/* Image Container */}
      <div className="relative h-48 bg-gradient-to-br from-neon-blue/20 to-neon-orange/20 overflow-hidden">
        {project.imageUrl && (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 to-transparent opacity-60 group-hover:opacity-40 transition duration-300"></div>

        {project.featured && (
          <div className="absolute top-3 right-3 bg-neon-orange/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold">
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-neon-blue transition">
          {project.title}
        </h3>
        <p className="text-white/60 text-sm mb-4 line-clamp-2 flex-1">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-1 bg-neon-blue/20 text-neon-blue rounded"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 3 && (
            <span className="text-xs px-2 py-1 bg-white/5 text-white/60">
              +{project.techStack.length - 3}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex gap-2 mb-4">
          {project.demoLink && (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-3 py-1 bg-neon-orange/20 text-neon-orange hover:bg-neon-orange/40 rounded transition"
              onClick={(e) => e.stopPropagation()}
            >
              Live Demo
            </a>
          )}
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-3 py-1 bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/40 rounded transition"
              onClick={(e) => e.stopPropagation()}
            >
              GitHub
            </a>
          )}
        </div>

        {/* Actions */}
        {showActions && (onEdit || onDelete) && (
          <div className="flex gap-2 pt-4 border-t border-white/10">
            {onEdit && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(project.id);
                }}
                className="flex-1 px-3 py-2 bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/40 rounded transition text-sm font-semibold"
              >
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm('Delete this project?')) {
                    onDelete(project.id);
                  }
                }}
                className="flex-1 px-3 py-2 bg-neon-orange/20 text-neon-orange hover:bg-neon-orange/40 rounded transition text-sm font-semibold"
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
