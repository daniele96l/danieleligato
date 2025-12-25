import { motion } from 'framer-motion';
import { Briefcase, Award } from 'lucide-react';

const experiences = [
  {
    title: 'AI Founder & Lead Developer',
    company: 'Backtes.to - Financial Analysis SaaS',
    period: 'Feb 2025 - Present',
    location: '',
    highlights: [
      'Built an investment analysis platform serving 17,000+ monthly active users across Europe',
      'Developed full-stack application: Python/Flask backend, Dash interactive frontend, Firebase database',
      'Integrated LLM OpenAI-powered chatbot with RAG system to provide investment guidance',
    ],
  },
  {
    title: 'Medior Data Scientist',
    company: 'T-Mobile',
    period: 'Jan 2023 - Present',
    location: 'Brno, Czech Republic',
    highlights: [
      'Forecasting Time series data with ML and Statistical models (Arima, Xgboost…)',
      'Operationalized production models using CI/CD pipelines, and deployment on OCP and GCP',
      'Collaborating with clients to meet high requirements, achieved 98% precision on revenue forecast',
      'Won the AI project of the year',
    ],
    award: true,
  },
  {
    title: 'Junior Data Scientist',
    company: 'Analytical Platform',
    period: 'July 2022 - Dec 2023',
    location: 'Brno, Czech Republic',
    highlights: [
      'Implementing time series and ML models with Scikit-learn for stock forecasting',
      'Deploying lambda functions on AWS and using Sagemaker',
      'Wrote production ready code that generated 16% return per year on clients portfolios, beating our benchmark by 5%',
    ],
  },
  {
    title: 'Graduate Analyst Developer',
    company: 'FNZ',
    period: 'Sep 2021 - July 2022',
    location: 'Brno, Czech Republic',
    highlights: [
      'Designed databases in MySQL (stored procedures, views, tables)',
      'Wrote business logic in C#',
    ],
  },
];

export const WorkExperience = () => {
  return (
    <section id="experience" className="py-24 border-b border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <Briefcase className="w-5 h-5 text-muted-foreground" />
            <h2 className="font-heading text-2xl md:text-3xl font-bold">Work Experience</h2>
          </div>
        </motion.div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-6 border-l-2 border-border"
            >
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-foreground" />
              
              <div className="mb-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-heading text-lg font-semibold">{exp.title}</h3>
                  {exp.award && (
                    <span className="inline-flex items-center gap-1 text-xs bg-foreground text-background px-2 py-0.5 rounded">
                      <Award className="w-3 h-3" />
                      Award Winner
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground font-medium">{exp.company}</p>
                <p className="text-sm text-muted-foreground">
                  {exp.period} {exp.location && `• ${exp.location}`}
                </p>
              </div>

              <ul className="mt-4 space-y-2">
                {exp.highlights.map((highlight, i) => (
                  <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                    <span className="text-foreground mt-1.5">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
