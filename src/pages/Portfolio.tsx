import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { ExternalLink, LayoutGrid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ViewMode = 'gallery' | 'table';

const aiProjects = [
  {
    title: 'AI in Advanced Driver Assistance Systems (ADAS)',
    description: 'Building intelligent systems for autonomous driving applications using computer vision and deep learning.',
    category: 'AI & Data Science',
    gradient: 'from-primary/20 to-accent/10',
  },
  {
    title: 'AI Meal Planner',
    description: 'An AI-powered meal planning application for personalized nutrition recommendations.',
    category: 'AI Application',
    gradient: 'from-accent/20 to-primary/10',
  },
  {
    title: 'A.I. Enhanced Online Advertising',
    description: 'Maximizing engagement and personalization through machine learning algorithms.',
    category: 'AI & Marketing',
    gradient: 'from-primary/10 to-accent/20',
  },
  {
    title: 'Portfolio Analysis',
    description: 'Stock portfolio backtesting and analysis with factor investing strategies.',
    category: 'Finance & AI',
    gradient: 'from-accent/10 to-primary/20',
  },
  {
    title: 'RandomForest 🌳 - Trade Bitcoin with AI 📈',
    description: 'Using machine learning to predict cryptocurrency market movements.',
    category: 'Finance & AI',
    gradient: 'from-primary/20 to-accent/10',
  },
  {
    title: 'Mask-Wearing Classification using CNN',
    description: 'Transfer learning approach for facial mask detection during the pandemic.',
    category: 'Computer Vision',
    gradient: 'from-accent/20 to-primary/10',
  },
  {
    title: 'Facial Recognition with Occlusion Detection',
    description: 'Master thesis on CNN-based facial recognition with partial occlusion handling.',
    category: 'Computer Vision',
    gradient: 'from-primary/10 to-accent/20',
  },
  {
    title: 'Early Retirement - Financial Independence with Python 💸',
    description: 'Simulating paths to financial independence using Python.',
    category: 'Finance',
    gradient: 'from-accent/10 to-primary/20',
  },
  {
    title: '💀 Survivorship Bias In Quant',
    description: 'Exploring the hidden dangers of survivorship bias in quantitative trading.',
    category: 'Finance',
    gradient: 'from-primary/20 to-accent/10',
  },
];

const otherProjects = [
  {
    title: 'Mercury - Portfolio tracker',
    description: 'A comprehensive portfolio tracking application for investments.',
    category: 'Finance',
    gradient: 'from-accent/20 to-primary/10',
  },
  {
    title: 'Time Flies: Embrace Life\'s Journey [Game]',
    description: 'A thought-provoking game about the passage of time.',
    category: 'Game',
    gradient: 'from-primary/10 to-accent/20',
  },
  {
    title: 'Breakout: A Modern Twist on a Classic Game! 🎮',
    description: 'A modern reimplementation of the classic Breakout arcade game.',
    category: 'Game',
    gradient: 'from-accent/10 to-primary/20',
  },
  {
    title: 'Hic et Nunc: Mindful Living',
    description: 'Embracing the swift journey of mindful living.',
    category: 'Lifestyle',
    gradient: 'from-primary/20 to-accent/10',
  },
];

const Portfolio = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('gallery');

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24 relative overflow-hidden">
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'var(--gradient-hero)' }}
        />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-6xl mb-6 block">💻</span>
            <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Portfolio</span>.
            </h1>
          </motion.div>
        </div>
      </section>

      {/* View Toggle */}
      <section className="pb-8">
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
      <section className="py-8">
        <div className="container mx-auto px-6">
          <h2 className="font-heading text-2xl font-semibold mb-8">AI & Data Science</h2>
          
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
                  <motion.article
                    key={project.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="group glass rounded-2xl overflow-hidden hover-lift cursor-pointer"
                  >
                    <div className={`h-40 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}>
                      <div className="text-5xl opacity-50 group-hover:scale-110 transition-transform">
                        🤖
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-card/50 to-transparent" />
                    </div>
                    <div className="p-5">
                      <span className="text-xs font-medium text-primary uppercase tracking-wider">
                        {project.category}
                      </span>
                      <h3 className="font-heading text-lg font-semibold mt-2 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="table"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass rounded-2xl overflow-hidden"
              >
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 font-medium text-muted-foreground">Project</th>
                      <th className="text-left p-4 font-medium text-muted-foreground hidden md:table-cell">Category</th>
                      <th className="text-left p-4 font-medium text-muted-foreground hidden lg:table-cell">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aiProjects.map((project) => (
                      <tr key={project.title} className="border-b border-border/50 hover:bg-secondary/30 transition-colors cursor-pointer">
                        <td className="p-4">
                          <span className="font-medium hover:text-primary transition-colors">
                            {project.title}
                          </span>
                        </td>
                        <td className="p-4 hidden md:table-cell">
                          <span className="text-xs font-medium text-primary uppercase tracking-wider bg-primary/10 px-2 py-1 rounded">
                            {project.category}
                          </span>
                        </td>
                        <td className="p-4 text-muted-foreground text-sm hidden lg:table-cell">
                          {project.description}
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
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="font-heading text-2xl font-semibold mb-8">Other projects</h2>
          
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
                  <motion.article
                    key={project.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="group glass rounded-2xl overflow-hidden hover-lift cursor-pointer"
                  >
                    <div className={`h-32 bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                      <div className="text-4xl opacity-50 group-hover:scale-110 transition-transform">
                        🎯
                      </div>
                    </div>
                    <div className="p-4">
                      <span className="text-xs font-medium text-primary uppercase tracking-wider">
                        {project.category}
                      </span>
                      <h3 className="font-heading text-base font-semibold mt-2 group-hover:text-primary transition-colors line-clamp-2">
                        {project.title}
                      </h3>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="table-other"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass rounded-2xl overflow-hidden"
              >
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 font-medium text-muted-foreground">Project</th>
                      <th className="text-left p-4 font-medium text-muted-foreground hidden md:table-cell">Category</th>
                      <th className="text-left p-4 font-medium text-muted-foreground hidden lg:table-cell">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {otherProjects.map((project) => (
                      <tr key={project.title} className="border-b border-border/50 hover:bg-secondary/30 transition-colors cursor-pointer">
                        <td className="p-4">
                          <span className="font-medium hover:text-primary transition-colors">
                            {project.title}
                          </span>
                        </td>
                        <td className="p-4 hidden md:table-cell">
                          <span className="text-xs font-medium text-primary uppercase tracking-wider bg-primary/10 px-2 py-1 rounded">
                            {project.category}
                          </span>
                        </td>
                        <td className="p-4 text-muted-foreground text-sm hidden lg:table-cell">
                          {project.description}
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
