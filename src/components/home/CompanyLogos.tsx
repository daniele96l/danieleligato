import { motion } from 'framer-motion';

const companies = [
  'Oxford University',
  'Politecnico di Milano',
  'FNZ',
  'Analytical Platform',
  'T-Mobile',
];

export const CompanyLogos = () => {
  return (
    <section className="py-12 border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {companies.map((company, index) => (
            <motion.div
              key={company}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-muted-foreground text-sm font-medium"
            >
              {company}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
