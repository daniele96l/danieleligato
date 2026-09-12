import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';

const techCategories = [
  {
    title: 'Programming Languages',
    items: ['Python', 'SQL', 'C#'],
  },
  {
    title: 'Skills',
    items: ['Time Series', 'Machine Learning', 'Deep Learning', 'Computer Vision', 'Data Analysis', 'RAG'],
  },
  {
    title: 'Frameworks & Technologies',
    items: ['Scikit-learn', 'NumPy', 'Pandas', 'Polars', 'Keras', 'PyTorch'],
  },
  {
    title: 'Tools & Platforms',
    items: ['Docker', 'Kubernetes', 'OpenShift (OCP)', 'Google Cloud Platform (GCP)', 'CI/CD', 'Git'],
  },
];

export const TechStack = () => {
  return (
    <section id="tech-stack" className="py-12 border-b border-border scroll-mt-8">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 mb-0">
            <Code2 className="w-4 h-4 text-muted-foreground" />
            <h2 className="font-heading text-xl md:text-2xl font-bold">Tech Stack</h2>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {techCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <h3 className="font-heading text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {category.items.map((item, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 text-xs border border-border rounded hover:bg-muted transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
