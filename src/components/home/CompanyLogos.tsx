import { motion } from 'framer-motion';

const companies = [
  { name: 'Oxford University', color: 'text-primary' },
  { name: 'Politecnico di Milano', color: 'text-primary' },
  { name: 'Analytical Platform', color: 'text-primary' },
  { name: 'T-Mobile', color: 'text-primary' },
  { name: 'FNZ', color: 'text-primary' },
];

export const CompanyLogos = () => {
  return (
    <section className="py-16 border-y border-border">
      <div className="container mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground uppercase tracking-wider mb-10"
        >
          Education & Experience
        </motion.p>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {companies.map((company, index) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-muted-foreground hover:text-foreground transition-colors font-heading font-medium text-lg"
            >
              {company.name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
