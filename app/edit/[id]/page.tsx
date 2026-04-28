'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ProtectedRoute } from '@/lib/utils/ProtectedRoute';
import { Navbar } from '@/app/components/Navbar';
import { useAuthStore } from '@/lib/hooks/useAuth';
import { getProject, updateProjectData } from '@/lib/utils/firestore';
import { uploadImage, generateFilename, deleteImage } from '@/lib/utils/storage';
import { Project } from '@/lib/hooks/useProjects';
import toast from 'react-hot-toast';

export default function EditPage() {
  return (
    <ProtectedRoute>
      <EditContent />
    </ProtectedRoute>
  );
}

function EditContent() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;
  const user = useAuthStore((state) => state.user);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [newImage, setNewImage] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: '',
    githubLink: '',
    demoLink: '',
    featured: false,
  });

  // Load project
  useEffect(() => {
    if (projectId) {
      loadProject();
    }
  }, [projectId]);

  const loadProject = async () => {
    try {
      const data = await getProject(projectId);
      if (data) {
        setProject(data);
        setFormData({
          title: data.title,
          description: data.description,
          techStack: data.techStack.join(', '),
          githubLink: data.githubLink || '',
          demoLink: data.demoLink || '',
          featured: data.featured,
        });
        setImagePreview(data.imageUrl);
      }
    } catch (error) {
      console.error('Error loading project:', error);
      toast.error('Failed to load project');
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !project) {
      toast.error('Error: User or project not found');
      return;
    }

    if (!formData.title || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    const techStackArray = formData.techStack
      .split(',')
      .map((tech) => tech.trim())
      .filter((tech) => tech.length > 0);

    if (techStackArray.length === 0) {
      toast.error('Please add at least one technology');
      return;
    }

    setSubmitting(true);
    try {
      let imageUrl = project.imageUrl;

      // Handle image replacement
      if (newImage) {
        // Delete old image
        try {
          await deleteImage(project.imageUrl);
        } catch (error) {
          console.warn('Failed to delete old image:', error);
        }

        // Upload new image
        const filename = generateFilename(user.uid, newImage.name);
        imageUrl = await uploadImage(newImage, filename);
      }

      // Update project
      await updateProjectData(projectId, {
        title: formData.title,
        description: formData.description,
        techStack: techStackArray,
        imageUrl,
        githubLink: formData.githubLink || undefined,
        demoLink: formData.demoLink || undefined,
        featured: formData.featured,
      });

      toast.success('Project updated successfully!');
      router.push('/dashboard');
    } catch (error) {
      console.error('Error updating project:', error);
      toast.error('Failed to update project');
    } finally {
      setSubmitting(false);
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

  return (
    <div className="min-h-screen bg-dark-950">
      <Navbar />

      <main className="pt-24 pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold mb-2">
              <span className="gradient-text">Edit Project</span>
            </h1>
            <p className="text-white/60">Update your project details</p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="glass-lg p-8 space-y-6"
          >
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Project Title <span className="text-neon-orange">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="My Awesome Project"
                className="input-base"
                required
                disabled={submitting}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Description <span className="text-neon-orange">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Describe your project..."
                className="input-base resize-none h-32"
                required
                disabled={submitting}
              />
            </div>

            {/* Tech Stack */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Tech Stack <span className="text-neon-orange">*</span>
              </label>
              <input
                type="text"
                value={formData.techStack}
                onChange={(e) =>
                  setFormData({ ...formData, techStack: e.target.value })
                }
                placeholder="React, Next.js, Firebase (comma-separated)"
                className="input-base"
                required
                disabled={submitting}
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Project Image
              </label>
              <div className="border-2 border-dashed border-neon-blue/30 rounded-lg p-8 text-center cursor-pointer hover:border-neon-blue/60 transition">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-input"
                  disabled={submitting}
                />
                <label htmlFor="image-input" className="cursor-pointer block">
                  {imagePreview ? (
                    <div className="space-y-2">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-h-40 mx-auto rounded"
                      />
                      <p className="text-sm text-neon-blue">Click to change image</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-3xl">🖼️</div>
                      <p className="text-white">Click to upload or drag image</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Links */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  GitHub Link
                </label>
                <input
                  type="url"
                  value={formData.githubLink}
                  onChange={(e) =>
                    setFormData({ ...formData, githubLink: e.target.value })
                  }
                  placeholder="https://github.com/..."
                  className="input-base"
                  disabled={submitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Live Demo Link
                </label>
                <input
                  type="url"
                  value={formData.demoLink}
                  onChange={(e) =>
                    setFormData({ ...formData, demoLink: e.target.value })
                  }
                  placeholder="https://example.com"
                  className="input-base"
                  disabled={submitting}
                />
              </div>
            </div>

            {/* Featured */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) =>
                  setFormData({ ...formData, featured: e.target.checked })
                }
                className="w-4 h-4 cursor-pointer"
                disabled={submitting}
              />
              <label htmlFor="featured" className="text-sm font-medium text-white/80 cursor-pointer">
                Mark as Featured Project
              </label>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-6 border-t border-white/10">
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary flex-1"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                    Updating...
                  </>
                ) : (
                  'Update Project'
                )}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                disabled={submitting}
                className="btn-ghost flex-1"
              >
                Cancel
              </button>
            </div>
          </motion.form>
        </div>
      </main>
    </div>
  );
}
