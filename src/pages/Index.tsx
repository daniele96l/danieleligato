import { lazy, Suspense } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Hero } from '@/components/home/Hero';
import { WorkExperience } from '@/components/home/WorkExperience';
import { Education } from '@/components/home/Education';
import { TechStack } from '@/components/home/TechStack';

const ParallaxScene = lazy(() =>
  import('@/components/layout/ParallaxScene').then((m) => ({ default: m.ParallaxScene }))
);

const Index = () => {
  return (
    <Layout>
      <Suspense fallback={null}>
        <ParallaxScene />
      </Suspense>
      <div className="relative z-10">
        <Hero />
        <div className="bg-background/70 backdrop-blur-[2px]">
          <TechStack />
          <WorkExperience />
          <Education />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
