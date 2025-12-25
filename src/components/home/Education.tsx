import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

const education = [
  {
    institution: 'Oxford',
    degree: 'Machine Learning Summer School',
    period: '2020',
    location: '',
  },
  {
    institution: 'Polytechnic of Milan',
    degree: 'Master in Computer Science and Engineering for Machine Learning and AI',
    period: '09/2019 - 02/2022',
    location: 'Erasmus exchange in Warsaw 02/2021 - 07/2021',
  },
  {
    institution: 'University of Pavia',
    degree: 'Bachelor in Computer Engineering',
    period: '09/2015 - 04/2018',
    location: 'Erasmus internship in Oporto 04/2018 - 07/2018',
  },
];

export const Education = () => {
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
            <GraduationCap className="w-5 h-5 text-muted-foreground" />
            <h2 className="font-heading text-2xl md:text-3xl font-bold">Education</h2>
          </div>
        </motion.div>

        <div className="space-y-8">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-6 border-l-2 border-border"
            >
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-foreground" />
              
              <h3 className="font-heading text-lg font-semibold">{edu.institution}</h3>
              <p className="text-muted-foreground">{edu.degree}</p>
              <p className="text-sm text-muted-foreground">{edu.period}</p>
              {edu.location && (
                <p className="text-sm text-muted-foreground italic mt-1">{edu.location}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
