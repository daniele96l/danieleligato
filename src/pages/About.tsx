import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { 
  Briefcase, 
  GraduationCap, 
  MapPin, 
  Globe, 
  MessageCircle,
  Github,
  Linkedin,
  FileText,
  CheckCircle,
  Circle,
  Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const experiences = [
  {
    icon: '📈',
    role: 'Data Scientist',
    company: 'T-Mobile',
    link: 'https://dtse.cz/about-us',
    current: true,
  },
  {
    icon: '📈',
    role: 'Data Scientist',
    company: 'AnalyticalPlatform',
    link: 'https://www.analyticalplatform.com/',
  },
  {
    icon: '👨‍💻',
    role: 'Analyst Developer',
    company: 'FNZ',
    link: 'https://www.fnz.com/',
  },
];

const education = [
  {
    icon: '🎓',
    degree: 'Master in Computer Science',
    school: 'POLIMI',
    link: 'https://www.polimi.it/',
  },
  {
    icon: '🎓',
    degree: 'Machine Learning Summer School',
    school: 'Oxford',
    link: 'https://www.ox.ac.uk/',
  },
];

const goals = {
  shortTerm: [
    { text: 'Running a 10k < 1h', done: true },
    { text: 'Running 5k in < 30m', done: true },
  ],
  mediumTerm: [
    { text: 'Having passive income', done: true },
    { text: 'Completing stocks portfolio with factor investing', done: true },
    { text: 'Running a half-marathon', done: false },
  ],
  lifelong: [
    { text: 'Being financially independent', done: false },
    { text: 'Completing an IronMan Triathlon', done: false },
    { text: 'BE HAPPY ☺️', done: false },
  ],
  bucket: [
    { text: 'See the northern lights 🌌', done: false },
    { text: 'Visit Vietnam 🇻🇳', done: false },
  ],
};

const readingYears = [
  { year: '2024', emoji: '🦾' },
  { year: '2023', emoji: '🚀' },
  { year: '2022 and before', emoji: '🤞' },
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24 relative overflow-hidden">
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'var(--gradient-hero)' }}
        />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <span className="text-6xl mb-6 block">👨‍💻</span>
            <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">
              About <span className="gradient-text">me</span>.
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column - Basics */}
            <div className="lg:col-span-2 space-y-12">
              {/* The Basics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-heading text-2xl font-semibold mb-6">The basics</h2>
                
                {/* Current Role */}
                <div className="mb-6">
                  {experiences.filter(e => e.current).map((exp) => (
                    <a
                      key={exp.company}
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-lg hover:text-primary transition-colors"
                    >
                      <span>{exp.icon}</span>
                      <span>{exp.role} @ </span>
                      <span className="text-primary underline underline-offset-4">{exp.company}</span>
                    </a>
                  ))}
                </div>

                {/* Previous Experience */}
                <div className="mb-6">
                  <p className="text-muted-foreground mb-3 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" /> Previously:
                  </p>
                  <div className="space-y-2 ml-6">
                    {experiences.filter(e => !e.current).map((exp) => (
                      <a
                        key={exp.company}
                        href={exp.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                      >
                        <span>{exp.icon}</span>
                        <span>{exp.role} @ </span>
                        <span className="text-primary underline underline-offset-4">{exp.company}</span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div className="mb-6 space-y-2">
                  {education.map((edu) => (
                    <a
                      key={edu.school}
                      href={edu.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-primary transition-colors"
                    >
                      <span>{edu.icon}</span>
                      <span>{edu.degree} @ </span>
                      <span className="text-primary underline underline-offset-4">{edu.school}</span>
                    </a>
                  ))}
                </div>

                {/* Location Info */}
                <div className="space-y-2 text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    Lived in Italy, Portugal, Poland, Czechia
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    Now in: Brno, Czechia
                  </p>
                  <p className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-primary" />
                    Speaks: Italian, English, Czech (Basic)
                  </p>
                </div>
              </motion.div>

              {/* Reading Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-heading text-2xl font-semibold mb-4">Reading</h2>
                <p className="text-muted-foreground mb-6">
                  Absorbing as much knowledge as I possibly can.
                </p>
                <div className="flex flex-wrap gap-4">
                  {readingYears.map((year) => (
                    <div
                      key={year.year}
                      className="glass rounded-xl px-6 py-4 hover-lift cursor-pointer"
                    >
                      <span className="text-2xl mr-2">{year.emoji}</span>
                      <span className="font-medium">{year.year}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Find Me */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-heading text-2xl font-semibold mb-6">Find Me</h2>
                <div className="flex flex-wrap gap-4">
                  <Button variant="outline" asChild>
                    <a href="https://github.com/daniele96l" target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      Github
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="https://www.linkedin.com/in/its-me-dani/" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="https://docs.google.com/document/d/1qT35TzhUlpa4HyywfysBuE21JPtabGPANWPqTyRNAJk/edit" target="_blank" rel="noopener noreferrer">
                      <FileText className="w-4 h-4 mr-2" />
                      Resume
                    </a>
                  </Button>
                </div>
              </motion.div>

              {/* Current Role Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-heading text-2xl font-semibold mb-4">My current role</h2>
                <p className="text-muted-foreground">
                  I'm currently a <span className="text-foreground font-medium">Data Scientist</span> working 
                  on Time series for financial and energy data.
                </p>
              </motion.div>
            </div>

            {/* Right Column - Goals */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Target className="w-5 h-5 text-primary" />
                  <h2 className="font-heading text-xl font-semibold">Striving Towards</h2>
                </div>

                {/* Short Term */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                    Short term Goals
                  </h3>
                  <div className="space-y-2">
                    {goals.shortTerm.map((goal, i) => (
                      <div key={i} className="flex items-center gap-2">
                        {goal.done ? (
                          <CheckCircle className="w-4 h-4 text-primary" />
                        ) : (
                          <Circle className="w-4 h-4 text-muted-foreground" />
                        )}
                        <span className={goal.done ? 'text-muted-foreground line-through' : ''}>
                          🏃 {goal.text}
                        </span>
                        {goal.done && <span className="text-primary">✅</span>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Medium Term */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                    Medium term Goals
                  </h3>
                  <div className="space-y-2">
                    {goals.mediumTerm.map((goal, i) => (
                      <div key={i} className="flex items-center gap-2">
                        {goal.done ? (
                          <CheckCircle className="w-4 h-4 text-primary" />
                        ) : (
                          <Circle className="w-4 h-4 text-muted-foreground" />
                        )}
                        <span className={goal.done ? 'text-muted-foreground' : ''}>
                          {goal.text}
                        </span>
                        {goal.done && <span className="text-primary">✅</span>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Life Goals */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                    Life Goals
                  </h3>
                  <div className="space-y-2">
                    {goals.lifelong.map((goal, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Circle className="w-4 h-4 text-muted-foreground" />
                        <span>{goal.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bucket List */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                    To-do before I die
                  </h3>
                  <div className="space-y-2">
                    {goals.bucket.map((goal, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Circle className="w-4 h-4 text-muted-foreground" />
                        <span>{goal.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
