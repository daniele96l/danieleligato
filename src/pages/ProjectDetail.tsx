import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projectsData: Record<string, {
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  tech?: string[];
  github?: string;
  demo?: string;
}> = {
  'ai-adas': {
    title: 'AI in Advanced Driver Assistance Systems (ADAS)',
    category: 'AI & Data Science',
    description: 'Building intelligent systems for autonomous driving applications.',
    fullDescription: 'This project focuses on developing AI-powered systems for Advanced Driver Assistance Systems (ADAS). Using computer vision and deep learning techniques, the system can detect obstacles, lane markings, and traffic signs to assist drivers in real-time.',
    tech: ['Python', 'TensorFlow', 'OpenCV', 'CUDA'],
  },
  'ai-meal-planner': {
    title: 'AI Meal Planner',
    category: 'AI Application',
    description: 'An AI-powered meal planning application for personalized nutrition.',
    fullDescription: 'An intelligent meal planning application that creates personalized nutrition plans based on dietary preferences, health goals, and available ingredients. Uses machine learning to optimize meal suggestions.',
    tech: ['Python', 'FastAPI', 'React', 'OpenAI'],
  },
  'ai-advertising': {
    title: 'A.I. Enhanced Online Advertising',
    category: 'AI & Marketing',
    description: 'Maximizing engagement and personalization through machine learning.',
    fullDescription: 'A comprehensive study and implementation of AI techniques for online advertising, focusing on user engagement prediction, ad personalization, and click-through rate optimization.',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'SQL'],
  },
  'portfolio-analysis': {
    title: 'Portfolio Analysis',
    category: 'Finance & AI',
    description: 'Stock portfolio backtesting and analysis with factor investing.',
    fullDescription: 'A backtesting framework for stock portfolio analysis using factor investing strategies. Allows users to test various investment strategies against historical data.',
    tech: ['Python', 'Pandas', 'NumPy', 'Matplotlib'],
  },
  'bitcoin-trading': {
    title: 'RandomForest - Trade Bitcoin with AI',
    category: 'Finance & AI',
    description: 'Using machine learning to predict cryptocurrency market movements.',
    fullDescription: 'An experimental project using Random Forest algorithms to predict Bitcoin price movements. Includes data collection, feature engineering, and model training pipelines.',
    tech: ['Python', 'Scikit-learn', 'Binance API'],
  },
  'mask-classification': {
    title: 'Mask-Wearing Classification using CNN',
    category: 'Computer Vision',
    description: 'Transfer learning approach for facial mask detection.',
    fullDescription: 'A deep learning model trained to classify whether individuals are wearing face masks correctly. Uses transfer learning with pre-trained CNN architectures for high accuracy.',
    tech: ['Python', 'TensorFlow', 'Keras', 'OpenCV'],
  },
  'facial-recognition': {
    title: 'Facial Recognition with Occlusion Detection',
    category: 'Computer Vision',
    description: 'Master thesis on CNN-based facial recognition.',
    fullDescription: 'Master thesis project focusing on facial recognition systems that can handle partial occlusions (glasses, masks, etc.). Uses CNN and transfer learning techniques.',
    tech: ['Python', 'PyTorch', 'MTCNN', 'FaceNet'],
  },
  'early-retirement': {
    title: 'Early Retirement - Financial Independence with Python',
    category: 'Finance',
    description: 'Simulating paths to financial independence using Python.',
    fullDescription: 'A comprehensive simulation tool for planning early retirement and financial independence. Models various investment scenarios, withdrawal rates, and market conditions.',
    tech: ['Python', 'NumPy', 'Monte Carlo'],
  },
  'survivorship-bias': {
    title: 'Survivorship Bias In Quant',
    category: 'Finance',
    description: 'Exploring the hidden dangers of survivorship bias in quantitative trading.',
    fullDescription: 'An educational project highlighting the pitfalls of survivorship bias in quantitative trading strategies. Demonstrates how ignoring delisted stocks can lead to inflated backtest results.',
    tech: ['Python', 'Pandas', 'Statistics'],
  },
  'mercury-tracker': {
    title: 'Mercury - Portfolio tracker',
    category: 'Finance',
    description: 'A comprehensive portfolio tracking application.',
    fullDescription: 'A web-based portfolio tracker that aggregates data from multiple brokers and provides unified performance analytics and reporting.',
    tech: ['React', 'Node.js', 'PostgreSQL'],
  },
  'time-flies': {
    title: 'Time Flies: Embrace Life\'s Journey',
    category: 'Game',
    description: 'A thought-provoking game about the passage of time.',
    fullDescription: 'An interactive game that visualizes the passage of time and encourages reflection on how we spend our lives. Features minimalist design and profound messaging.',
    tech: ['JavaScript', 'Canvas API'],
  },
  'breakout': {
    title: 'Breakout: A Modern Twist on a Classic Game!',
    category: 'Game',
    description: 'A modern reimplementation of the classic Breakout arcade game.',
    fullDescription: 'A modernized version of the classic Breakout game with updated graphics, power-ups, and level progression. Built as a fun side project.',
    tech: ['JavaScript', 'HTML5 Canvas'],
  },
  'hic-et-nunc': {
    title: 'Hic et Nunc: Mindful Living',
    category: 'Lifestyle',
    description: 'Embracing the swift journey of mindful living.',
    fullDescription: 'A mindfulness and productivity application that helps users focus on the present moment and make the most of their time.',
    tech: ['React', 'TypeScript'],
  },
};

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? projectsData[slug] : null;

  if (!project) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="font-heading text-4xl font-bold mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/portfolio">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <Link 
              to="/portfolio" 
              className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Link>

            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              {project.category}
            </span>
            
            <h1 className="font-heading text-4xl md:text-5xl font-bold mt-2 mb-6">
              {project.title}
            </h1>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {project.fullDescription}
            </p>

            {project.tech && (
              <div className="mb-8">
                <h2 className="font-heading text-lg font-semibold mb-3">Technologies</h2>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span 
                      key={tech}
                      className="px-3 py-1 text-sm border border-border rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4">
              {project.github && (
                <Button variant="outline" asChild>
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    View Code
                  </a>
                </Button>
              )}
              {project.demo && (
                <Button asChild>
                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </a>
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectDetail;
