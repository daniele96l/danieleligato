import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const WhoAmI = () => {
  return (
    <section id="contact" className="py-24 border-b border-border">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Who am I?
            </h2>
            
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              I'm a Computer Engineer currently working in the Czech Republic as a 
              Data Scientist.
            </p>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              And if you haven't noticed by my vigorous hand movements while I talk 
              (you are reading, so you can't see me now 🤌), I'm Italian 🇮🇹.
            </p>

            <p className="text-muted-foreground mb-8">
              This website doesn't just aim to be my personal portfolio but also a 
              general manifesto of my life, my beliefs, and the cool stuff I do and 
              find online.
            </p>

            <Button variant="outline" asChild>
              <Link to="/about">Learn more about me</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="border border-border rounded-lg p-8"
          >
            <h3 className="font-heading text-xl font-semibold mb-4">Let's grow together</h3>
            <p className="text-muted-foreground mb-6">
              Do you think what I do is cool? I'm always open to working together 
              on freelancing jobs or fancy business ideas.
            </p>
            <p className="text-muted-foreground mb-6">
              Below, you can find my contacts. Write to me! Or send me a message 
              in a bottle, as you prefer 😉
            </p>
            <div className="space-y-2">
              <a 
                href="https://www.linkedin.com/in/its-me-dani/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-foreground hover:underline"
              >
                💼 LinkedIn
              </a>
              <a 
                href="mailto:daniele96ligato@gmail.com"
                className="block text-foreground hover:underline"
              >
                📧 Email
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
