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
    <section className="py-24 border-b border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <Code2 className="w-5 h-5 text-muted-foreground" />
            <h2 className="font-heading text-2xl md:text-3xl font-bold">Tech Stack</h2>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {techCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="font-heading text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 text-sm border border-border rounded-md hover:bg-muted transition-colors"
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
