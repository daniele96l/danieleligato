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
        subtitle: 'German Energy Market',
        problem: 'Predict primary control reserve (PRL) prices to optimize grid operations and energy trading strategies.',
        approach: 'ANN with expanding training window, outperforming SARIMAX and naive forecasts.',
        techStack: ['Python', 'LSTM', 'ANN', 'ARIMA', 'SARIMAX', 'TensorFlow'],
        keyInsights: [
          'High DA-market spreads → high opportunity costs for battery storage → high PRL prices',
          'Weather features (temperature trends, precipitation) are strong predictors',
          'Flexibility in storage scenarios reduces price spreads significantly',
        ],
        links: [
          { label: 'FFE Project', url: 'https://www.ffe.de/projekte/preisprognose-primaerregelleistung/' },
          { label: 'Research Paper', url: 'https://www.econstor.eu/bitstream/10419/230238/1/for.2693.pdf' },
        ],
      },
      {
        title: 'Sales Forecasting',
        subtitle: 'T-Mobile Project of the Year 🏆',
        problem: 'Forecast 30,000+ time series across all product categories and regions with hierarchical consistency.',
        approach: 'Ensemble models (XGBoost, LightGBM) with hierarchical reconciliation for coherent forecasts.',
        techStack: ['Python', 'XGBoost', 'LightGBM', 'GCP', 'Docker', 'CI/CD'],
        keyInsights: [
          'Hierarchical reconciliation ensures forecasts sum correctly across levels',
          'Automated retraining pipelines on GCP for production stability',
          'Achieved 98% precision on revenue forecasts',
        ],
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
                        <div className="space-y-6 mt-4 max-h-[60vh] overflow-y-auto pr-2">
                          {exp.projects.map((project, i) => (
                            <div key={i} className="p-5 rounded-lg bg-muted/30 border border-border">
                              {/* Header */}
                              <div className="mb-4">
                                <h4 className="font-semibold text-lg">{project.title}</h4>
                                {project.subtitle && (
                                  <p className="text-sm text-muted-foreground">{project.subtitle}</p>
                                )}
                              </div>

                              {/* Problem & Approach */}
                              <div className="space-y-3 mb-4">
                                <div>
                                  <p className="text-xs font-medium text-foreground uppercase tracking-wider mb-1">Problem</p>
                                  <p className="text-sm text-muted-foreground">{project.problem}</p>
                                </div>
                                <div>
                                  <p className="text-xs font-medium text-foreground uppercase tracking-wider mb-1">Approach</p>
                                  <p className="text-sm text-muted-foreground">{project.approach}</p>
                                </div>
                              </div>

                              {/* Tech Stack */}
                              {project.techStack && (
                                <div className="mb-4">
                                  <p className="text-xs font-medium text-foreground uppercase tracking-wider mb-2">Tech Stack</p>
                                  <div className="flex flex-wrap gap-1.5">
                                    {project.techStack.map((tech, j) => (
                                      <span key={j} className="text-xs px-2 py-1 bg-background border border-border rounded-md">
                                        {tech}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Key Insights */}
                              {project.keyInsights && (
                                <div className="mb-4">
                                  <p className="text-xs font-medium text-foreground uppercase tracking-wider mb-2">Key Insights</p>
                                  <ul className="space-y-2">
                                    {project.keyInsights.map((insight, j) => (
                                      <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                                        <span className="text-foreground">•</span>
                                        <span>{insight}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Links */}
                              {project.links && project.links.length > 0 && (
                                <div className="pt-3 border-t border-border">
                                  <div className="flex flex-wrap gap-3">
                                    {project.links.map((link, j) => (
                                      <a
                                        key={j}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-foreground hover:text-muted-foreground transition-colors inline-flex items-center gap-1"
                                      >
                                        {link.label} <span className="text-xs">↗</span>
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              )}
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
