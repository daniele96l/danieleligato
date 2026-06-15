import { Github, Linkedin, Mail } from 'lucide-react';
import { IsolineBackground } from './IsolineBackground';

export const Footer = () => {
  return (
    <footer className="relative border-t border-border py-12">
      <IsolineBackground />
      <div className="container mx-auto px-6 relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-heading font-semibold">
              Daniele Ligato.
            </span>
            <p className="text-sm text-muted-foreground">
              Data Scientist & AI Engineer
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/daniele96l"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/its-me-dani/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:daniele96ligato@gmail.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          <p className="text-sm text-muted-foreground">
            Brno, Czechia
          </p>
        </div>
      </div>
    </footer>
  );
};
