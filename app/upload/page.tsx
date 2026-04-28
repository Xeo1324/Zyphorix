'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ProtectedRoute } from '@/lib/utils/ProtectedRoute';
import { Navbar } from '@/app/components/Navbar';
import { useAuthStore } from '@/lib/hooks/useAuth';
import { createProject } from '@/lib/utils/firestore';
import { uploadImage, generateFilename } from '@/lib/utils/storage';
import toast from 'react-hot-toast';

export default function UploadPage() {
  return (
    <ProtectedRoute>
      <UploadContent />
    </ProtectedRoute>
  );
}

function UploadContent() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: '',
    githubLink: '',
    demoLink: '',
    featured: false,
  });

  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error('You must be logged in');
      return;
    }

    if (!formData.title || !formData.description || !image) {
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

    setLoading(true);
    try {
      // Upload image
      const filename = generateFilename(user.uid, image.name);
      const imageUrl = await uploadImage(image, filename);

      // Create project
      await createProject(user.uid, {
        title: formData.title,
        description: formData.description,
        techStack: techStackArray,
        imageUrl,
        githubLink: formData.githubLink || undefined,
        demoLink: formData.demoLink || undefined,
        featured: formData.featured,
      });

      toast.success('Project uploaded successfully!');
      router.push('/dashboard');
    } catch (error) {
      console.error('Error uploading project:', error);
      toast.error('Failed to upload project');
    } finally {
      setLoading(false);
    }
  };

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
              <span className="gradient-text">Upload Project</span>
            </h1>
            <p className="text-white/60">Add a new project to your vault</p>
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
                disabled={loading}
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
                disabled={loading}
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
                disabled={loading}
              />
              <p className="text-xs text-white/40 mt-1">
                Separate technologies with commas
              </p>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Project Image <span className="text-neon-orange">*</span>
              </label>
              <div className="border-2 border-dashed border-neon-blue/30 rounded-lg p-8 text-center cursor-pointer hover:border-neon-blue/60 transition">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-input"
                  required
                  disabled={loading}
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
                      <p className="text-xs text-white/40">PNG, JPG, GIF up to 10MB</p>
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
                  disabled={loading}
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
                  disabled={loading}
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
                disabled={loading}
              />
              <label htmlFor="featured" className="text-sm font-medium text-white/80 cursor-pointer">
                Mark as Featured Project
              </label>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-6 border-t border-white/10">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex-1"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                    Uploading...
                  </>
                ) : (
                  'Upload Project'
                )}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                disabled={loading}
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
