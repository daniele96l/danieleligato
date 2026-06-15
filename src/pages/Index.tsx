import { Layout } from '@/components/layout/Layout';
import { IsolineBackground } from '@/components/layout/IsolineBackground';
import { Hero } from '@/components/home/Hero';
import { CompanyLogos } from '@/components/home/CompanyLogos';
import { WorkExperience } from '@/components/home/WorkExperience';
import { Education } from '@/components/home/Education';
import { TechStack } from '@/components/home/TechStack';

const Index = () => {
  return (
    <Layout>
      <div className="relative">
        <IsolineBackground />
        <Hero />
        <CompanyLogos />
      </div>
      <div className="bg-background">
        <WorkExperience />
        <Education />
        <TechStack />
      </div>
    </Layout>
  );
};

export default Index;
