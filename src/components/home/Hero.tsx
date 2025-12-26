import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const techStack = [
  'Python', 'SQL', 'C#', 'Scikit-learn', 'PyTorch', 'Keras', 
  'Pandas', 'NumPy', 'Docker', 'Kubernetes', 'GCP', 'Git'
];

export const Hero = () => {
  return (
    <section className="py-24 md:py-32 border-b border-border">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <p className="text-lg md:text-xl text-muted-foreground mb-4">Hello, I'm Dani 👋</p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8"
          >
            Data Scientist & AI Founder
            <br />
            <span className="text-muted-foreground text-3xl md:text-5xl lg:text-6xl font-semibold">
              Building Production AI for Global Enterprises &{' '}
              <span className="text-foreground font-bold">SaaS for 20k+ Users</span>
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-6 mb-8"
          >
            <div className="flex items-center gap-3 px-4 py-3 bg-muted/50 rounded-lg border border-border">
              <span className="text-2xl font-bold text-foreground">20k+</span>
              <span className="text-sm text-muted-foreground">Monthly Active Users</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 bg-muted/50 rounded-lg border border-border">
              <span className="text-2xl font-bold text-foreground">4+</span>
              <span className="text-sm text-muted-foreground">Years Experience</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 bg-muted/50 rounded-lg border border-border">
              <span className="text-2xl font-bold text-foreground">98%</span>
              <span className="text-sm text-muted-foreground">Forecast Precision</span>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed"
          >
            Italian engineer with a Master's from Polytechnic of Milan, currently building ML models 
            at T-Mobile (and winning awards for it 🏆). I also run Backtes.to, a fintech platform 
            serving 20k+ users. Always up for interesting collaborations!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4 mb-10"
          >
            <Button size="lg" asChild className="group">
              <a href="#experience">
                💼 Experience
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="group">
              <a 
                href="https://www.linkedin.com/in/daniele-ligato/"
                target="_blank"
                rel="noopener noreferrer"
              >
                📧 Contact
              </a>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Sliding Tech Stack */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8 overflow-hidden"
      >
        <div className="flex animate-scroll">
          {[...techStack, ...techStack].map((tech, index) => (
            <span
              key={index}
              className="flex-shrink-0 px-6 py-2 mx-2 text-sm text-muted-foreground border border-border rounded-full whitespace-nowrap"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
