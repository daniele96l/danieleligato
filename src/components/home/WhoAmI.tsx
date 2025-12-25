import { motion } from 'framer-motion';

export const WhoAmI = () => {
  return (
    <section id="contact" className="py-24 border-b border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
            Let's connect
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Italian 🇮🇹 Computer Engineer based in Czech Republic. Open to freelancing and collaborations.
          </p>

          <div className="flex gap-6">
            <a 
              href="https://www.linkedin.com/in/its-me-dani/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:underline"
            >
              LinkedIn →
            </a>
            <a 
              href="mailto:daniele96ligato@gmail.com"
              className="text-foreground hover:underline"
            >
              Email →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
