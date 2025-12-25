import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { LayoutGrid, List, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ViewMode = 'gallery' | 'table';

const aiProjects = [
  {
    slug: 'ai-adas',
    title: 'AI in Advanced Driver Assistance Systems (ADAS)',
    description: 'Building intelligent systems for autonomous driving applications using computer vision and deep learning.',
    category: 'AI & Data Science',
  },
  {
    slug: 'ai-meal-planner',
    title: 'AI Meal Planner',
    description: 'An AI-powered meal planning application for personalized nutrition recommendations.',
    category: 'AI Application',
  },
  {
    slug: 'ai-advertising',
    title: 'A.I. Enhanced Online Advertising',
    description: 'Maximizing engagement and personalization through machine learning algorithms.',
    category: 'AI & Marketing',
  },
  {
    slug: 'portfolio-analysis',
    title: 'Portfolio Analysis',
    description: 'Stock portfolio backtesting and analysis with factor investing strategies.',
    category: 'Finance & AI',
  },
  {
    slug: 'bitcoin-trading',
    title: 'RandomForest 🌳 - Trade Bitcoin with AI 📈',
    description: 'Using machine learning to predict cryptocurrency market movements.',
    category: 'Finance & AI',
  },
  {
    slug: 'mask-classification',
    title: 'Mask-Wearing Classification using CNN',
    description: 'Transfer learning approach for facial mask detection during the pandemic.',
    category: 'Computer Vision',
  },
  {
    slug: 'facial-recognition',
    title: 'Facial Recognition with Occlusion Detection',
    description: 'Master thesis on CNN-based facial recognition with partial occlusion handling.',
    category: 'Computer Vision',
  },
  {
    slug: 'early-retirement',
    title: 'Early Retirement - Financial Independence with Python 💸',
    description: 'Simulating paths to financial independence using Python.',
    category: 'Finance',
  },
  {
    slug: 'survivorship-bias',
    title: '💀 Survivorship Bias In Quant',
    description: 'Exploring the hidden dangers of survivorship bias in quantitative trading.',
    category: 'Finance',
  },
];

const otherProjects = [
  {
    slug: 'mercury-tracker',
    title: 'Mercury - Portfolio tracker',
    description: 'A comprehensive portfolio tracking application for investments.',
    category: 'Finance',
  },
  {
    slug: 'time-flies',
    title: 'Time Flies: Embrace Life\'s Journey [Game]',
    description: 'A thought-provoking game about the passage of time.',
    category: 'Game',
  },
  {
    slug: 'breakout',
    title: 'Breakout: A Modern Twist on a Classic Game! 🎮',
    description: 'A modern reimplementation of the classic Breakout arcade game.',
    category: 'Game',
  },
  {
    slug: 'hic-et-nunc',
    title: 'Hic et Nunc: Mindful Living',
    description: 'Embracing the swift journey of mindful living.',
    category: 'Lifestyle',
  },
];

const Portfolio = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('gallery');

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-5xl mb-6 block">💻</span>
            <h1 className="font-heading text-5xl md:text-6xl font-bold mb-4">
              Portfolio.
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              A collection of projects in AI, Data Science, and software development.
            </p>
          </motion.div>
        </div>
      </section>

      {/* View Toggle */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'gallery' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('gallery')}
            >
              <LayoutGrid className="w-4 h-4 mr-2" />
              Gallery view
            </Button>
            <Button
              variant={viewMode === 'table' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('table')}
            >
              <List className="w-4 h-4 mr-2" />
              Table view
            </Button>
          </div>
        </div>
      </section>

      {/* AI & Data Science Projects */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <h2 className="font-heading text-xl font-semibold mb-8">AI & Data Science</h2>
          
          <AnimatePresence mode="wait">
            {viewMode === 'gallery' ? (
              <motion.div
                key="gallery"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {aiProjects.map((project, index) => (
                  <motion.div
                    key={project.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={`/portfolio/${project.slug}`}
                      className="group block border border-border rounded-lg p-6 hover:border-foreground/30 transition-colors"
                    >
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        {project.category}
                      </span>
                      <h3 className="font-heading text-lg font-semibold mt-2 mb-2 group-hover:underline">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">
                        {project.description}
                      </p>
                      <span className="inline-flex items-center text-sm mt-4 group-hover:underline">
                        Read more <ArrowRight className="w-3 h-3 ml-1" />
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="table"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="border border-border rounded-lg overflow-hidden"
              >
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-secondary/50">
                      <th className="text-left p-4 font-medium text-muted-foreground text-sm">Project</th>
                      <th className="text-left p-4 font-medium text-muted-foreground text-sm hidden md:table-cell">Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aiProjects.map((project) => (
                      <tr key={project.slug} className="border-b border-border last:border-0">
                        <td className="p-4">
                          <Link 
                            to={`/portfolio/${project.slug}`}
                            className="font-medium hover:underline"
                          >
                            {project.title}
                          </Link>
                        </td>
                        <td className="p-4 text-muted-foreground text-sm hidden md:table-cell">
                          {project.category}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Other Projects */}
      <section className="py-12 border-t border-border">
        <div className="container mx-auto px-6">
          <h2 className="font-heading text-xl font-semibold mb-8">Other projects</h2>
          
          <AnimatePresence mode="wait">
            {viewMode === 'gallery' ? (
              <motion.div
                key="gallery-other"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {otherProjects.map((project, index) => (
                  <motion.div
                    key={project.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={`/portfolio/${project.slug}`}
                      className="group block border border-border rounded-lg p-5 hover:border-foreground/30 transition-colors"
                    >
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        {project.category}
                      </span>
                      <h3 className="font-heading text-base font-semibold mt-2 group-hover:underline">
                        {project.title}
                      </h3>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="table-other"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="border border-border rounded-lg overflow-hidden"
              >
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-secondary/50">
                      <th className="text-left p-4 font-medium text-muted-foreground text-sm">Project</th>
                      <th className="text-left p-4 font-medium text-muted-foreground text-sm hidden md:table-cell">Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {otherProjects.map((project) => (
                      <tr key={project.slug} className="border-b border-border last:border-0">
                        <td className="p-4">
                          <Link 
                            to={`/portfolio/${project.slug}`}
                            className="font-medium hover:underline"
                          >
                            {project.title}
                          </Link>
                        </td>
                        <td className="p-4 text-muted-foreground text-sm hidden md:table-cell">
                          {project.category}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </Layout>
  );
};

export default Portfolio;
