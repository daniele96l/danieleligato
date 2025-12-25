import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const projects = [
  {
    title: 'AI in Advanced Driver Assistance Systems',
    category: 'AI & Data Science',
    description: 'Building intelligent systems for autonomous driving applications.',
    gradient: 'from-primary/20 to-accent/10',
  },
  {
    title: 'AI Meal Planner',
    category: 'AI Application',
    description: 'An AI-powered meal planning application for personalized nutrition.',
    gradient: 'from-accent/20 to-primary/10',
  },
  {
    title: 'Portfolio Analysis',
    category: 'Finance & AI',
    description: 'Stock portfolio backtesting and analysis with factor investing.',
    gradient: 'from-primary/10 to-accent/20',
  },
];

export const FeaturedProjects = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl">
              A selection of my work in AI, Data Science, and innovative applications.
            </p>
          </div>
          <Button variant="outline" asChild className="group">
            <Link to="/portfolio">
              View All Projects
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group glass rounded-2xl overflow-hidden hover-lift cursor-pointer"
            >
              <div className={`h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                <div className="text-6xl opacity-50 group-hover:scale-110 transition-transform">
                  🤖
                </div>
              </div>
              <div className="p-6">
                <span className="text-xs font-medium text-primary uppercase tracking-wider">
                  {project.category}
                </span>
                <h3 className="font-heading text-xl font-semibold mt-2 mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {project.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
