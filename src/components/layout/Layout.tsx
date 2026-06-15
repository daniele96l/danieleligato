import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { IsolineBackground } from './IsolineBackground';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <IsolineBackground />
      <Header />
      <main className="flex-1 pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};
