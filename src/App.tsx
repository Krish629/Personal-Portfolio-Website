import { useState, useEffect, useRef } from "react";
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue, useTransform } from "motion/react";
import { 
  Github, 
  Linkedin, 
  Instagram,
  Mail, 
  ExternalLink, 
  Code, 
  Terminal, 
  Globe, 
  Smartphone, 
  Database, 
  Sun, 
  Moon, 
  Search,
  ArrowRight, 
  Cpu, 
  Trophy,
  Award,
  Gamepad2,
  Languages,
  Layout, 
  Palette, 
  FileJson, 
  Server, 
  Table, 
  GitBranch, 
  Monitor,
  FileText,
  FileSpreadsheet,
  PenTool,
  Figma,
  Layers,
  Send,
  MessageSquare,
  User,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedDock } from "@/components/ui/animated-dock";
import Preloader from "@/components/ui/preloader";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import GradientMenu from "@/components/ui/gradient-menu";
import DropdownComponent from "@/components/ui/dropdown-01";
import HighlightCard from "@/components/ui/highlight-card";

// --- Data ---

const PROJECTS = [
  {
    id: "1",
    title: "SkyCastPro: Weather Web",
    description: "A futuristic meteorology dashboard integrating OpenWeatherMap and Pixabay APIs for real-time weather tracking with dynamic visual backgrounds.",
    image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&q=80&w=1000",
    tags: ["React", "API", "Tailwind", "Pixabay"],
    githubUrl: "https://github.com/Krish629/SkyCastPro-Weather-Web-For-The-Future",
    liveUrl: "https://skycastpro-zeta.vercel.app",
    category: "Web"
  },
  {
    id: "2",
    title: "Password Generator & Checker",
    description: "A robust security tool for generating complex passwords and analyzing their strength against common attack vectors.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000",
    tags: ["React", "Security", "Tailwind"],
    githubUrl: "https://github.com/Krish629/Password_Generator_-_Checker/blob/main/index.html",
    liveUrl: "https://password-generator-checker-olive.vercel.app",
    category: "Web"
  },
  {
    id: "3",
    title: "Encryption & Decryption Tool",
    description: "A specialized utility for secure data handling, providing various algorithms to encrypt and decrypt sensitive information.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000",
    tags: ["JavaScript", "Cryptography", "Tool"],
    githubUrl: "https://github.com/Krish629/Encryption_Decryption_Tool/blob/main/index.html",
    liveUrl: "https://encryption-decryption-tool-phi.vercel.app",
    category: "Web"
  },
  {
    id: "4",
    title: "Krrish4 Single Player Game",
    description: "An immersive single-player game developed using Python and Pygame, featuring custom mechanics and dynamic gameplay. Play as a superhero in a stylized world.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000",
    tags: ["Python", "Pygame", "Game Dev"],
    githubUrl: "https://github.com/Krish629/Krrish4-Single-Player-Game/blob/main/main.py",
    liveUrl: "#",
    category: "Game"
  }
];

const EDUCATION = [
  {
    id: "1",
    title: "Bachelor of Computer Applications (BCA)",
    institution: "Inspiria Knowledge Campus – Maulana Abul Kalam Azad University of Technology, West Bengal",
    year: "2024 – 2028 (Expected)",
    description: "Focusing on core computer science principles and application development.",
    grade: "Current SGPA: 8.67"
  },
  {
    id: "2",
    title: "Higher Secondary (12th)",
    institution: "Kendriya Vidyalaya – CBSE",
    year: "2024",
    description: "Completed with a focus on Science and Mathematics.",
    grade: "Percentage: 80%"
  },
  {
    id: "3",
    title: "Secondary (10th)",
    institution: "Saraswati Vidya Mandir – CBSE",
    year: "2022",
    description: "Foundational education with early interest in technology.",
    grade: "Percentage: 84%"
  }
];

const SKILLS = [
  { name: "C(With DSA)", category: "Programming Languages", icon: Code },
  { name: "Python", category: "Programming Languages", icon: Terminal },
  { name: "Dart", category: "Programming Languages", icon: Cpu },
  { name: "HTML", category: "Frontend", icon: Layout },
  { name: "CSS", category: "Frontend", icon: Palette },
  { name: "JavaScript", category: "Frontend", icon: FileJson },
  { name: "Node.js", category: "Backend & Frameworks", icon: Server },
  { name: "Next.js", category: "Backend & Frameworks", icon: Globe },
  { name: "Firebase", category: "Database", icon: Database },
  { name: "MySQL", category: "Database", icon: Table },
  { name: "MS Office", category: "Tools", icon: FileText },
  { name: "MS Excel", category: "Tools", icon: FileSpreadsheet },
  { name: "Flutter", category: "Tools", icon: Smartphone },
  { name: "Git", category: "Tools", icon: GitBranch },
  { name: "Github", category: "Tools", icon: Github },
  { name: "Canva", category: "Tools", icon: PenTool },
  { name: "Figma", category: "Tools", icon: Figma },
  { name: "Ubuntu Linux", category: "Operating Systems", icon: Monitor },
  { name: "Windows", category: "Operating Systems", icon: Layers }
];

// --- Components ---

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setIsPointer(!!(window.getComputedStyle(target).cursor === "pointer" || target.closest('a') || target.closest('button')));
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 border border-white rounded-full pointer-events-none z-[9999] hidden md:block mix-blend-difference"
      initial={{ backgroundColor: "rgba(0, 0, 0, 0)", borderColor: "#e6eef7" }}
      animate={{ 
        x: position.x - 12, 
        y: position.y - 12,
        scale: isPointer ? 2.5 : 1,
        backgroundColor: isPointer ? "#e6eef7" : "rgba(0, 0, 0, 0)",
        borderColor: isPointer ? "rgba(0, 0, 0, 0)" : "#e6eef7"
      }}
      transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.5 }}
    />
  );
};

const TypingAnimation = ({ phrases }: { phrases: string[] }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === phrases[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 3000);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev: number) => (prev + 1) % phrases.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev: number) => prev + (reverse ? -1 : 1));
    }, reverse ? 75 : 150);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, phrases]);

  return (
    <span className="accent-text min-h-[1.5em] inline-flex items-center justify-center">
      {phrases[index].substring(0, subIndex)}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-[3px] h-[0.8em] bg-purple-500 ml-1"
      />
    </span>
  );
};

const Navbar = ({ theme, setTheme }: any) => {
  return (
    <nav className="fixed top-4 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div className="pointer-events-auto">
        <GradientMenu />
      </div>
      <div className="fixed top-8 right-8 pointer-events-auto">
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="p-3 glass-card hover:bg-purple-500/10 rounded-full transition-all hover:scale-110 active:scale-95 shadow-xl">
          {theme === "dark" ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-purple-600" />}
        </button>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="min-h-[90vh] flex flex-col items-center justify-center text-center relative overflow-hidden">
      <BackgroundBeamsWithCollision className="absolute inset-0 -z-10" children={null} />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="space-y-8 max-w-4xl px-6"
      >
        <h1 className="text-6xl md:text-9xl font-bold tracking-tighter accent-text leading-tight">
          Krish Das
        </h1>
        
        <div className="text-3xl md:text-5xl font-bold">
          <span className="opacity-60">I am a </span>
          <TypingAnimation phrases={["Web Developer", "App Developer", "UI Designer"]} />
        </div>

        <p className="text-lg md:text-xl opacity-70 max-w-2xl mx-auto leading-relaxed">
          Student at Inspiria Knowledge Campus. I build high-performance applications with clean code and exceptional user experiences.
        </p>

        <div className="pt-8 flex flex-col items-center gap-6">
          <AnimatedDock items={[
            { link: "https://github.com/Krish629", Icon: <Github />, target: "_blank" },
            { link: "https://www.linkedin.com/in/krish-das-832995351", Icon: <Linkedin />, target: "_blank" },
            { link: "https://www.instagram.com/not._krishhhh", Icon: <Instagram />, target: "_blank" },
            { link: "mailto:krish.d.0224@inspiria.edu.in", Icon: <Mail /> }
          ]} />
          
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="opacity-40"
          >
            <ArrowRight className="rotate-90" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 max-w-4xl mx-auto px-6">
      <h2 className="text-4xl md:text-6xl font-bold mb-16 accent-text">Education</h2>
      <div className="space-y-12">
        {EDUCATION.map((edu, idx) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ x: 10 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.3 }}
            className="relative pl-12 border-l-2 border-purple-500/20 group cursor-default"
          >
            <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-purple-500 border-4 border-[var(--bg-primary)] group-hover:scale-150 transition-transform" />
            <span className="text-sm font-bold text-purple-500 uppercase tracking-widest">{edu.year}</span>
            <h3 className="text-2xl font-bold mt-2">{edu.title}</h3>
            <p className="text-lg opacity-60 mt-1">{edu.institution}</p>
            <p className="mt-4 text-base opacity-70 leading-relaxed">{edu.description}</p>
            <div className="mt-4 inline-block px-4 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-sm font-medium text-purple-400">
              {edu.grade}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Skills = () => {
  const categories = Array.from(new Set(SKILLS.map(s => s.category)));

  return (
    <section id="skills" className="py-24 max-w-7xl mx-auto px-6">
      <h2 className="text-4xl md:text-6xl font-bold mb-16 accent-text">Skills</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat, idx) => (
          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card p-8 rounded-3xl"
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <span className="w-1.5 h-6 bg-purple-500 rounded-full" />
              {cat}
            </h3>
            <div className="flex flex-wrap gap-3">
              {SKILLS.filter(s => s.category === cat).map(skill => (
                <div key={skill.name} className="flex items-center gap-2 px-4 py-2 glass-card rounded-xl text-sm hover:border-purple-500/30 transition-colors group">
                  <skill.icon size={16} className="text-purple-500 group-hover:scale-110 transition-transform" />
                  {skill.name}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState("All Projects");

  const projectOptions = [
    { id: "all", label: "All Projects", description: "Show everything" },
    ...PROJECTS.map(p => ({ id: p.id, label: p.title, description: p.category }))
  ];

  const filteredProjects = PROJECTS.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDropdown = selectedProject === "All Projects" || p.title === selectedProject;
    return matchesSearch && matchesDropdown;
  });

  return (
    <section id="projects" className="py-24 max-w-7xl mx-auto px-6">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
        <div className="flex-1">
          <h2 className="text-4xl md:text-6xl font-bold accent-text">Projects</h2>
          <p className="opacity-60 mt-4 max-w-xl">A selection of my recent work, ranging from web applications to specialized security tools.</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-center w-full lg:w-auto">
          <div className="relative group w-full md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40 group-focus-within:opacity-100 transition-opacity" />
            <input 
              type="text" 
              placeholder="Search by name or tech..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full glass-card rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-purple-500/50 transition-all"
            />
          </div>
          
          <DropdownComponent 
            options={projectOptions} 
            selected={selectedProject} 
            onSelect={(opt) => setSelectedProject(opt.label)}
            placeholder="Filter by project"
          />
          
          <div className="hidden xl:block">
            <InteractiveHoverButton text="View All" active onClick={() => {
              setSearchQuery("");
              setSelectedProject("All Projects");
            }} />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="glass-card overflow-hidden group rounded-3xl"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-3 glass-card rounded-full hover:bg-purple-500/20 transition-colors" title="View Source">
                    <Github size={20} />
                  </a>
                  {project.liveUrl !== "#" && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-3 glass-card rounded-full hover:bg-purple-500/20 transition-colors" title="Live Preview">
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold">{project.title}</h3>
                  <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20">
                    {project.category}
                  </span>
                </div>
                <p className="text-sm opacity-60 mb-6 leading-relaxed line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold uppercase px-3 py-1 glass-card rounded-full opacity-60">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

const AchievementsAndCertifications = () => {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-12 justify-items-center">
        <div className="w-full flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 accent-text text-center">Achievements</h2>
          <HighlightCard 
            title="Achievements"
            description={[
              "Participated in Smart India Hackathon 2025",
              "3rd Position in Intercollege Auction Based Game (DataViz-Insvaganza)",
              "Associative Member in Computing Club of College"
            ]}
            icon={<Trophy className="w-8 h-8" />}
          />
        </div>
        <div className="w-full flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 accent-text text-center">Certifications</h2>
          <HighlightCard 
            title="Certifications"
            description={[
              "Python Programming – GeeksforGeeks & Udemy",
              "Java Programming Mastery - Developers Bootcamp",
              "Inskills Certificate for Softskills Course"
            ]}
            icon={<Award className="w-8 h-8" />}
          />
        </div>
      </div>
    </section>
  );
};

const HobbiesAndLanguages = () => {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-12 justify-items-center">
        <div className="w-full flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 accent-text text-center">Hobbies / Interests</h2>
          <HighlightCard 
            title="Hobbies"
            description={[
              "Coding",
              "Learning new technologies",
              "Online gaming (BGMI, Clash Of Clans)"
            ]}
            icon={<Gamepad2 className="w-8 h-8" />}
          />
        </div>
        <div className="w-full flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 accent-text text-center">Languages</h2>
          <HighlightCard 
            title="Languages"
            description={[
              "Hindi (Native)",
              "English (Professional)"
            ]}
            icon={<Languages className="w-8 h-8" />}
          />
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formState.name || !formState.email || !formState.subject || !formState.message) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formState.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      await emailjs.send(
        "service_z44ulnb",
        "template_me2lkyj",
        {
          from_name: formState.name,
          from_email: formState.email,
          subject: formState.subject,
          message: formState.message,
          to_name: "Krish"
        },
        "XEiQ5YOMh0IYu295Q"
      );
      
      setIsSent(true);
      setFormState({ name: "", email: "", subject: "", message: "" });
      // Reset success message after 5 seconds
      setTimeout(() => setIsSent(false), 5000);
    } catch (err: any) {
      console.error("EmailJS Error:", err);
      setError("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-16">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div>
            <h2 className="text-4xl md:text-6xl font-bold accent-text mb-6">Let's Connect</h2>
            <p className="text-lg opacity-60 max-w-md leading-relaxed">
              Have a project in mind or just want to say hi? Feel free to reach out. I'm always open to new opportunities and collaborations.
            </p>
          </div>

          <div className="space-y-6">
            <a 
              href="mailto:krish.d.0224@inspiria.edu.in" 
              className="flex items-center gap-6 group w-fit"
            >
              <div className="p-4 glass-card rounded-2xl group-hover:border-purple-500/50 transition-colors">
                <Mail className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <p className="text-sm opacity-50 font-medium uppercase tracking-widest">Email Me</p>
                <p className="text-lg font-bold group-hover:text-purple-400 transition-colors">krish.d.0224@inspiria.edu.in</p>
              </div>
            </a>

            <div className="flex items-center gap-4 pt-6">
              <a 
                href="https://github.com/Krish629" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-4 glass-card rounded-2xl hover:border-purple-500/50 hover:bg-purple-500/5 transition-all hover:-translate-y-1"
              >
                <Github className="w-6 h-6" />
              </a>
              <a 
                href="https://www.linkedin.com/in/krish-das-832995351" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-4 glass-card rounded-2xl hover:border-purple-500/50 hover:bg-purple-500/5 transition-all hover:-translate-y-1"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a 
                href="https://www.instagram.com/not._krishhhh" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-4 glass-card rounded-2xl hover:border-purple-500/50 hover:bg-purple-500/5 transition-all hover:-translate-y-1"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div className="glass-card p-8 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
            <h4 className="text-xl font-bold mb-2">Based in</h4>
            <p className="opacity-60 flex items-center gap-2">
              <Globe className="w-4 h-4 text-purple-500" />
              West Bengal, India
            </p>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 md:p-12 rounded-[2.5rem] relative"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold opacity-60 ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40 group-focus-within:opacity-100 group-focus-within:text-purple-500 transition-all" />
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full glass-card bg-white/5 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-purple-500/50 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold opacity-60 ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40 group-focus-within:opacity-100 group-focus-within:text-purple-500 transition-all" />
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full glass-card bg-white/5 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-purple-500/50 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold opacity-60 ml-1">Subject</label>
              <div className="relative group">
                <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40 group-focus-within:opacity-100 group-focus-within:text-purple-500 transition-all" />
                <input
                  type="text"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  placeholder="Project Collaboration"
                  className="w-full glass-card bg-white/5 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-purple-500/50 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold opacity-60 ml-1">Message</label>
              <textarea
                name="message"
                value={formState.message}
                onChange={handleChange}
                rows={5}
                placeholder="Tell me more about your project..."
                className="w-full glass-card bg-white/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-purple-500/50 transition-all resize-none"
              />
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-red-400 text-sm font-medium"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={isSubmitting || isSent}
              className={cn(
                "w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all active:scale-[0.98]",
                isSent 
                  ? "bg-green-500/20 border border-green-500/50 text-green-400 cursor-default"
                  : "bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-900/20 hover:shadow-purple-700/40"
              )}
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : isSent ? (
                <>
                  <CheckCircle2 size={20} />
                  Message Sent!
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 border-t border-purple-500/10">
      <div className="max-w-7xl mx-auto px-6 h-full">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="text-2xl font-bold accent-text">Krish Das</div>
            <p className="opacity-50 text-sm">Building software for the next generation.</p>
          </div>

          <div className="flex items-center gap-6 font-medium text-xs tracking-widest uppercase opacity-60">
            <a href="#home" className="hover:text-purple-400 transition-colors">Home</a>
            <a href="#about" className="hover:text-purple-400 transition-colors">Experience</a>
            <a href="#projects" className="hover:text-purple-400 transition-colors">Projects</a>
            <a href="#contact" className="hover:text-purple-400 transition-colors">Contact</a>
          </div>

          <div className="text-center md:text-right flex flex-col gap-1">
            <p className="text-xs opacity-40">&copy; {new Date().getFullYear()} Krish Das</p>
            <p className="text-[10px] opacity-30">Designed & Handcrafted with ❤️</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [theme, setTheme] = useState("dark");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      <AnimatePresence mode="wait">
        {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}
      </AnimatePresence>

      <div className={cn(
        "min-h-screen selection:bg-purple-500/30 transition-opacity duration-500",
        showPreloader ? "opacity-0" : "opacity-100"
      )}>
        <CustomCursor />
        
        {/* Sticky Profile Icon */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.8, type: "spring" }}
          className="fixed top-6 left-6 z-[60] w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-purple-500/30 shadow-2xl backdrop-blur-md group hover:border-purple-500 transition-all duration-300"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img 
            src="/krish.jpg"
            alt="Krish Das"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent("Krish Das")}&background=a855f7&color=fff&size=128`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>
        
        <motion.div 
          className="fixed top-0 left-0 right-0 h-1 accent-gradient z-[100] origin-left"
          style={{ scaleX }}
        />

        <Navbar 
          theme={theme} 
          setTheme={setTheme} 
        />

        <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <AchievementsAndCertifications />
          <HobbiesAndLanguages />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}
