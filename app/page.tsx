'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/lib/hooks/useAuth';
import { getFeaturedProjects } from '@/lib/utils/firestore';
import { Project } from '@/lib/hooks/useProjects';

export default function HomePage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedProjects = async () => {
      try {
        const featured = await getFeaturedProjects();
        setProjects(featured);
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProjects();
  }, []);

  return (
    <div className="min-h-screen bg-dark-950 overflow-hidden">
      {/* Header Navigation */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <motion.h1 className="text-2xl font-bold text-glow">Zyphorix</motion.h1>
          <nav className="flex items-center gap-6">
            {user ? (
              <>
                <Link href="/dashboard" className="text-white/60 hover:text-white transition">
                  Dashboard
                </Link>
                <button
                  onClick={() => router.push('/dashboard')}
                  className="btn-primary text-sm px-4 py-2"
                >
                  Vault
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-white/60 hover:text-white transition">
                  Sign In
                </Link>
                <Link href="/register" className="btn-primary text-sm px-4 py-2">
                  Get Started
                </Link>
              </>
            )}
          </nav>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        {/* Animated background elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-20 left-10 w-72 h-72 bg-neon-blue/10 rounded-full blur-3xl -z-10"
        ></motion.div>
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-neon-orange/10 rounded-full blur-3xl -z-10"
        ></motion.div>

        <div className="max-w-4xl mx-auto text-center">
          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-6xl md:text-7xl font-bold mb-4 leading-tight"
              animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
            >
              <span className="gradient-text">Zyphorix</span>
            </motion.h1>
            <p className="text-xl md:text-2xl text-white/60 mb-8">Your Premium Project Vault</p>
            <p className="text-white/40 max-w-2xl mx-auto mb-12 text-lg">
              Store, manage, and showcase your engineering projects like assets in a high-end digital warehouse. Premium experience, complete control.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            {user ? (
              <>
                <Link href="/dashboard" className="btn-primary">
                  Enter Dashboard
                </Link>
                <Link href="/upload" className="btn-secondary">
                  Upload Project
                </Link>
              </>
            ) : (
              <>
                <Link href="/register" className="btn-primary">
                  Create Vault
                </Link>
                <Link href="/login" className="btn-secondary">
                  Sign In
                </Link>
              </>
            )}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-neon-blue/30 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-2 bg-neon-blue rounded-full"
            ></motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Premium Features</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Everything you need to manage your digital project vault
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🔐',
                title: 'Secure Vault',
                description: 'Firebase authentication and encrypted storage for your projects',
              },
              {
                icon: '⚡',
                title: 'Lightning Fast',
                description: 'Optimized performance with smooth animations and instant loading',
              },
              {
                icon: '🎨',
                title: 'Premium Design',
                description: 'Sleek, modern interface inspired by luxury supercar aesthetics',
              },
              {
                icon: '🔍',
                title: 'Smart Search',
                description: 'Find projects instantly with advanced filtering and search',
              },
              {
                icon: '📊',
                title: 'Analytics',
                description: 'Track project metrics and showcase your best work',
              },
              {
                icon: '🚀',
                title: 'Deploy Ready',
                description: 'Built for Vercel with optimized performance and security',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="glass-lg p-6 hover:bg-white/15 transition duration-300 group cursor-pointer"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-white/60">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      {projects.length > 0 && (
        <section className="relative px-4 py-24">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="gradient-text">Featured Projects</span>
              </h2>
              <p className="text-white/60 text-lg">Discover amazing projects from our community</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.slice(0, 3).map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="glass-lg overflow-hidden hover:shadow-glow-lg group cursor-pointer transition duration-300"
                  onClick={() => router.push(`/projects/${project.id}`)}
                >
                  <div className="relative h-40 bg-gradient-to-br from-neon-blue/20 to-neon-orange/20 overflow-hidden">
                    {project.imageUrl && (
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-white/60 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-1 bg-neon-blue/20 text-neon-blue rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="relative px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="glass-lg p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Vault Your Projects?
            </h2>
            <p className="text-white/60 mb-8 text-lg">
              Join Zyphorix and start showcasing your work like a premium digital product.
            </p>
            {user ? (
              <Link href="/dashboard" className="btn-primary">
                Go to Dashboard
              </Link>
            ) : (
              <Link href="/register" className="btn-primary">
                Create Your Vault
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-4 py-8">
        <div className="max-w-6xl mx-auto text-center text-white/40 text-sm">
          <p>© 2026 Zyphorix. Your Project Vault Awaits.</p>
        </div>
      </footer>
    </div>
  );
}
