import { FC, ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface ComponentProps {
  title: string;
  description: string[];
  icon?: ReactNode;
}

const HighlightCard: FC<ComponentProps> = ({ title, description, icon }) => {
  return (
    <div className="group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-rotate-1 w-full max-w-[350px] mx-auto">
      <Card className="rounded-2xl border border-[var(--glass-border)] bg-[var(--card-bg)] shadow-2xl relative backdrop-blur-xl overflow-hidden hover:border-purple-500/50 hover:shadow-purple-500/5 transition-all h-full">
        
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 to-purple-500/10 opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
          <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-gradient-to-tr from-purple-500/10 to-transparent blur-3xl opacity-30 group-hover:opacity-50 transform group-hover:scale-110 transition-all duration-700 animate-bounce"></div>
          <div className="absolute top-10 left-10 w-16 h-16 rounded-full bg-purple-500/5 blur-xl animate-ping"></div>
          <div className="absolute bottom-16 right-16 w-12 h-12 rounded-full bg-purple-500/5 blur-lg animate-ping"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
        </div>

        <div className="p-8 relative z-10 flex flex-col items-center text-center h-full">
          <div className="relative mb-6">
            <div className="absolute inset-0 rounded-full border-2 border-purple-500/20 animate-ping"></div>
            <div className="absolute inset-0 rounded-full border border-purple-500/10 animate-pulse"></div>

            <div className="p-6 rounded-full backdrop-blur-lg border border-purple-500/20 bg-purple-500/10 shadow-2xl transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 hover:shadow-purple-500/20">
              <div className="transform group-hover:rotate-180 transition-transform duration-700 text-purple-500">
                {icon}
              </div>
            </div>
          </div>

          <h3 className="mb-4 text-2xl font-bold accent-text transform group-hover:scale-105 transition-transform duration-300">
            {title}
          </h3>

          <div className="space-y-2 max-w-sm flex-grow">
            {description.map((line, idx) => (
              <p
                key={idx}
                className="opacity-70 text-sm leading-relaxed transform group-hover:opacity-100 transition-opacity duration-300"
              >
                {line}
              </p>
            ))}
          </div>

          <div className="mt-6 w-1/3 h-0.5 accent-gradient rounded-full transform group-hover:w-1/2 group-hover:h-1 transition-all duration-500 animate-pulse"></div>

          <div className="flex space-x-2 mt-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          </div>
        </div>

        <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-transparent rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-purple-500/10 to-transparent rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </Card>
    </div>
  );
};

export default HighlightCard;
