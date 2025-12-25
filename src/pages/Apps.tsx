import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { ExternalLink, BarChart3, Bot, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const apps = [
  {
    icon: '📊',
    emoji: <BarChart3 className="w-8 h-8" />,
    title: 'Chrome plugin for analytics',
    description: 'A Chrome extension to enhance your analytics workflow with quick insights and data visualization.',
    gradient: 'from-primary/20 to-accent/10',
    link: '#',
  },
  {
    icon: '🤖',
    emoji: <Bot className="w-8 h-8" />,
    title: 'Your AI meal planner',
    description: 'An intelligent meal planning application that creates personalized nutrition plans using AI.',
    gradient: 'from-accent/20 to-primary/10',
    link: '#',
  },
  {
    icon: '📈',
    emoji: <TrendingUp className="w-8 h-8" />,
    title: 'Portfolio Pilot [Backtester]',
    description: 'A powerful backtesting tool for stock portfolios, enabling factor investing strategies.',
    gradient: 'from-primary/10 to-accent/20',
    link: '#',
  },
];

const Apps = () => {
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
            <span className="text-6xl mb-6 block">⬇️</span>
            <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">
              All my <span className="gradient-text">apps</span>.
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Practical applications I've built to solve real-world problems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Apps Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {apps.map((app, index) => (
              <motion.article
                key={app.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group glass rounded-3xl overflow-hidden hover-lift"
              >
                <div className={`h-48 bg-gradient-to-br ${app.gradient} flex items-center justify-center relative`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="text-primary"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {app.emoji}
                    </motion.div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6">
                    <h3 className="font-heading text-xl font-semibold">
                      {app.title}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground mb-6">
                    {app.description}
                  </p>
                  <Button variant="outline" className="w-full group" asChild>
                    <a href={app.link}>
                      <span>Learn More</span>
                      <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-12 text-center max-w-3xl mx-auto"
          >
            <h2 className="font-heading text-3xl font-bold mb-4">
              Have an idea for an app?
            </h2>
            <p className="text-muted-foreground mb-8">
              I'm always looking for new challenges and interesting projects to work on. 
              Let's build something amazing together!
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
