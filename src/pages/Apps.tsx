import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const apps = [
  {
    slug: 'chrome-analytics',
    icon: '📊',
    title: 'Chrome plugin for analytics',
    description: 'A Chrome extension to enhance your analytics workflow with quick insights and data visualization.',
  },
  {
    slug: 'ai-meal-planner',
    icon: '🤖',
    title: 'Your AI meal planner',
    description: 'An intelligent meal planning application that creates personalized nutrition plans using AI.',
  },
  {
    slug: 'portfolio-pilot',
    icon: '📈',
    title: 'Portfolio Pilot [Backtester]',
    description: 'A powerful backtesting tool for stock portfolios, enabling factor investing strategies.',
  },
];

const Apps = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-5xl mb-6 block">⬇️</span>
            <h1 className="font-heading text-5xl md:text-6xl font-bold mb-4">
              All my apps.
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Practical applications I've built to solve real-world problems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Apps Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {apps.map((app, index) => (
              <motion.div
                key={app.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/apps/${app.slug}`}
                  className="group block border border-border rounded-lg p-6 hover:border-foreground/30 transition-colors h-full"
                >
                  <span className="text-3xl block mb-4">{app.icon}</span>
                  <h3 className="font-heading text-lg font-semibold mb-2 group-hover:underline">
                    {app.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {app.description}
                  </p>
                  <span className="inline-flex items-center text-sm group-hover:underline">
                    Learn more <ArrowRight className="w-3 h-3 ml-1" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 border-t border-border">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-heading text-2xl font-bold mb-4">
              Have an idea for an app?
            </h2>
            <p className="text-muted-foreground mb-8">
              I'm always looking for new challenges and interesting projects to work on. 
              Let's build something amazing together.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild>
                <a href="mailto:daniele96ligato@gmail.com">
                  Get in Touch
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://www.linkedin.com/in/its-me-dani/" target="_blank" rel="noopener noreferrer">
                  Connect on LinkedIn
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Apps;
