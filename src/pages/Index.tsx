import { Layout } from '@/components/layout/Layout';
import { Hero } from '@/components/home/Hero';
import { CompanyLogos } from '@/components/home/CompanyLogos';
import { WhoAmI } from '@/components/home/WhoAmI';
import { WorkExperience } from '@/components/home/WorkExperience';
import { Education } from '@/components/home/Education';
import { TechStack } from '@/components/home/TechStack';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <CompanyLogos />
      <WhoAmI />
      <WorkExperience />
      <Education />
      <TechStack />
    </Layout>
  );
};

export default Index;
