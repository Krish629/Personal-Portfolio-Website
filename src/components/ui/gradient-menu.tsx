import React from 'react';
import { Home, User, Code, Mail } from 'lucide-react';

const menuItems = [
  { title: 'Home', icon: <Home />, gradientFrom: '#a955ff', gradientTo: '#ea51ff', id: 'home' },
  { title: 'About', icon: <User />, gradientFrom: '#56CCF2', gradientTo: '#2F80ED', id: 'about' },
  { title: 'Projects', icon: <Code />, gradientFrom: '#FF9966', gradientTo: '#FF5E62', id: 'projects' },
  { title: 'Contact', icon: <Mail />, gradientFrom: '#80FF72', gradientTo: '#7EE8FA', id: 'contact' }
];

export default function GradientMenu() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex justify-center items-center py-4">
      <ul className="flex gap-4 md:gap-6">
        {menuItems.map(({ title, icon, gradientFrom, gradientTo, id }, idx) => (
          <li
            key={idx}
            onClick={() => scrollToSection(id)}
            style={{ 
              '--gradient-from': gradientFrom, 
              '--gradient-to': gradientTo 
            } as React.CSSProperties}
            className="relative w-[50px] h-[50px] md:w-[60px] md:h-[60px] bg-white/10 backdrop-blur-md shadow-lg rounded-full flex items-center justify-center transition-all duration-500 hover:w-[140px] md:hover:w-[180px] hover:shadow-none group cursor-pointer border border-white/10"
          >
            {/* Gradient background on hover */}
            <span className="absolute inset-0 rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] opacity-0 transition-all duration-500 group-hover:opacity-100"></span>
            
            {/* Blur glow */}
            <span className="absolute top-[10px] inset-x-0 h-full rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] blur-[15px] opacity-0 -z-10 transition-all duration-500 group-hover:opacity-50"></span>

            {/* Icon */}
            <span className="relative z-10 transition-all duration-500 group-hover:scale-0 delay-0">
              <span className="text-xl md:text-2xl text-white/70 group-hover:text-white">{icon}</span>
            </span>

            {/* Title */}
            <span className="absolute text-white uppercase font-bold tracking-wide text-xs md:text-sm transition-all duration-500 scale-0 group-hover:scale-100 delay-150">
              {title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
