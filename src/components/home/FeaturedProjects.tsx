import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const projects = [
  {
    slug: 'ai-adas',
    title: 'AI in Advanced Driver Assistance Systems',
    category: 'AI & Data Science',
  },
  {
    slug: 'ai-meal-planner',
    title: 'AI Meal Planner',
    category: 'AI Application',
  },
  {
    slug: 'portfolio-analysis',
    title: 'Portfolio Analysis',
    category: 'Finance & AI',
  },
];

export const FeaturedProjects = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between gap-6 mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold">
            Featured Projects
          </h2>
          <Button variant="ghost" asChild className="group hidden md:flex">
            <Link to="/portfolio">
              View All
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={`/portfolio/${project.slug}`}
                className="group block border border-border rounded-lg p-6 hover:border-foreground/30 transition-colors"
              >
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {project.category}
                </span>
                <h3 className="font-heading text-lg font-semibold mt-2 group-hover:underline">
                  {project.title}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <Button variant="outline" asChild className="w-full">
            <Link to="/portfolio">
              View All Projects
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
