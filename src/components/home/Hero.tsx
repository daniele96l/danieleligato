import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const Hero = () => {
  return (
    <section className="py-24 md:py-32 border-b border-border">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-heading text-5xl md:text-7xl font-bold leading-tight mb-6"
          >
            Hello, I'm Dani 👋
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl md:text-2xl text-muted-foreground mb-6 leading-relaxed"
          >
            I'm your go-to <span className="text-foreground font-medium">Data Scientist</span> with 
            a passion for AI and Machine Learning.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground mb-10"
          >
            Take a look at my projects and work experience below, plus the cool stuff 
            I find online and share here.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Button size="lg" asChild className="group">
              <Link to="/about">
                👨‍💻 About me
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="group">
              <Link to="/portfolio">
                💻 Portfolio
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="group">
              <Link to="/apps">
                ⬇️ All my apps
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8"
          >
            <a
              href="https://github.com/daniele96l"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              🧑‍💻 My Github <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
