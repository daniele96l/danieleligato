import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { ArrowLeft, ExternalLink, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const appsData: Record<string, {
  title: string;
  description: string;
  fullDescription: string;
  features?: string[];
  link?: string;
}> = {
  'chrome-analytics': {
    title: 'Chrome plugin for analytics',
    description: 'A Chrome extension to enhance your analytics workflow.',
    fullDescription: 'A powerful Chrome extension that provides quick insights and data visualization directly in your browser. Perfect for marketers and data analysts who need to access analytics data on the go.',
    features: [
      'Quick access to key metrics',
      'Real-time data visualization',
      'Custom dashboard widgets',
      'Export functionality',
    ],
  },
  'ai-meal-planner': {
    title: 'Your AI meal planner',
    description: 'An intelligent meal planning application.',
    fullDescription: 'An AI-powered meal planning application that creates personalized nutrition plans using machine learning. Simply input your dietary preferences and health goals, and receive customized meal recommendations.',
    features: [
      'Personalized meal recommendations',
      'Nutritional tracking',
      'Shopping list generation',
      'Recipe suggestions based on ingredients',
    ],
  },
  'portfolio-pilot': {
    title: 'Portfolio Pilot [Backtester]',
    description: 'A powerful backtesting tool for stock portfolios.',
    fullDescription: 'A comprehensive backtesting tool that allows you to test various investment strategies against historical market data. Supports factor investing, rebalancing strategies, and custom portfolio construction.',
    features: [
      'Historical backtesting',
      'Factor investing strategies',
      'Risk analysis tools',
      'Performance reporting',
    ],
  },
};

const AppDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const app = slug ? appsData[slug] : null;

  if (!app) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="font-heading text-4xl font-bold mb-4">App Not Found</h1>
          <p className="text-muted-foreground mb-8">The app you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/apps">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Apps
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
              to="/apps" 
              className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Apps
            </Link>

            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              {app.title}
            </h1>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {app.fullDescription}
            </p>

            {app.features && (
              <div className="mb-8">
                <h2 className="font-heading text-lg font-semibold mb-4">Features</h2>
                <ul className="space-y-2">
                  {app.features.map((feature) => (
                    <li key={feature} className="flex items-center text-muted-foreground">
                      <span className="w-1.5 h-1.5 bg-foreground rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-4">
              <Button asChild>
                <a href={app.link || '#'}>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Try Now
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default AppDetail;
