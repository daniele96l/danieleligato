import { motion } from 'framer-motion';
import { Briefcase, Award, ChevronRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

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
    projects: [
      {
        title: 'Energy Load & Demand Forecasting',
        description: 'A project for forecasting energy load and energy demand for the German market, using LSTM neural networks and ARIMA statistical models.',
      },
      {
        title: 'Sales Forecasting (T-Mobile Project of the Year)',
        description: 'Award-winning project using ensemble methods and hierarchical reconciliation to forecast more than 30,000 time series for sales predictions.',
        isAward: true,
      },
    ],
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
                  {exp.award && exp.projects ? (
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="inline-flex items-center gap-1 text-xs bg-foreground text-background px-2 py-0.5 rounded hover:bg-foreground/80 transition-colors cursor-pointer">
                          <Award className="w-3 h-3" />
                          Award Winner
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </DialogTrigger>
                      <DialogContent className="max-w-lg">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <Award className="w-5 h-5" />
                            Featured Projects at {exp.company}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                          {exp.projects.map((project, i) => (
                            <div key={i} className="p-4 rounded-lg bg-muted/50 border border-border">
                              <h4 className="font-semibold flex items-center gap-2">
                                {project.title}
                                {project.isAward && (
                                  <span className="text-xs bg-foreground text-background px-1.5 py-0.5 rounded">
                                    🏆 Winner
                                  </span>
                                )}
                              </h4>
                              <p className="text-sm text-muted-foreground mt-2">
                                {project.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                  ) : exp.award && (
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
