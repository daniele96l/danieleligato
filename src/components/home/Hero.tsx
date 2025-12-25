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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-wrap gap-4 mb-6 text-sm text-muted-foreground"
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-foreground rounded-full" />
              5+ years experience
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-foreground rounded-full" />
              17k+ users on my SaaS
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground mb-8"
          >
            Italian engineer with a Master's from Polytechnic of Milan, currently building ML models 
            at T-Mobile (and winning awards for it 🏆). I also run Backtes.to, a fintech platform 
            serving 17k+ users. Always up for interesting collaborations!
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
                href="https://www.linkedin.com/in/its-me-dani/"
                target="_blank"
                rel="noopener noreferrer"
              >
                📧 Contact
              </a>
            </Button>
            <a
              href="https://github.com/daniele96l"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              🧑‍💻 Github <ArrowRight className="w-4 h-4 ml-2" />
            </a>
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
