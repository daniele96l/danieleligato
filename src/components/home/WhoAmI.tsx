import { motion } from 'framer-motion';
import { MapPin, Globe, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const WhoAmI = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Who am <span className="gradient-text">I</span>?
            </h2>
            
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              I'm a Computer Engineer currently working in the Czech Republic as a{' '}
              <span className="text-foreground font-medium">Data Scientist</span>.
            </p>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              And if you haven't noticed by my vigorous hand movements while I talk, 
              I'm Italian 🇮🇹. This website is my personal portfolio and a manifesto 
              of my life, beliefs, and the cool stuff I do and find online.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="p-2 rounded-lg bg-secondary">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <span>Data Scientist @ T-Mobile</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="p-2 rounded-lg bg-secondary">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <span>Based in Brno, Czechia</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="p-2 rounded-lg bg-secondary">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <span>Lived in Italy, Portugal, Poland, Czechia</span>
              </div>
            </div>

            <Button asChild>
              <Link to="/about">Learn More About Me</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Decorative background */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl" />
              
              {/* Main card */}
              <div className="relative glass rounded-3xl p-8 h-full flex flex-col justify-center">
                <div className="text-6xl mb-6">🧑‍💻</div>
                <h3 className="font-heading text-2xl font-semibold mb-4">Let's grow together</h3>
                <p className="text-muted-foreground mb-6">
                  Think what I do is cool? I'm always open to working on freelancing 
                  jobs or fancy business ideas.
                </p>
                <div className="flex gap-4">
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://www.linkedin.com/in/its-me-dani/" target="_blank" rel="noopener noreferrer">
                      💼 LinkedIn
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href="mailto:daniele96ligato@gmail.com">
                      📧 Email
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
