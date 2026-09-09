import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export const Hero = () => {
  return (
    <section className="pt-32 pb-24 md:pt-44 md:pb-32 border-b border-border">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center" data-mesh-collider>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6"
          >
            Hello, I'm Dani 👋
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-medium leading-snug mb-8"
          >
            Data Scientist & AI Founder
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed"
          >
            Italian data scientist with 5 years of experience. Master's from Polytechnic of Milan, currently building ML models 
            at Enverus. I also run Backtes.to, a fintech platform 
            serving 20k+ users. Always up for interesting collaborations!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-2 mb-6"
          >
            <Button size="sm" asChild className="rounded-full px-5">
              <a href="#experience">
                Experience
              </a>
            </Button>
            <Button size="sm" variant="outline" asChild className="rounded-full px-5">
              <a 
                href="https://www.linkedin.com/in/daniele-ligato/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
