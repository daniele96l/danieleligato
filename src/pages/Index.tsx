import { Layout } from '@/components/layout/Layout';
import { Hero } from '@/components/home/Hero';
import { CompanyLogos } from '@/components/home/CompanyLogos';
import { WhoAmI } from '@/components/home/WhoAmI';
import { FeaturedProjects } from '@/components/home/FeaturedProjects';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <CompanyLogos />
      <WhoAmI />
      <FeaturedProjects />
    </Layout>
  );
};

export default Index;
