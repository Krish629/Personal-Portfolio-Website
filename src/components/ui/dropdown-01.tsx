import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

interface Option {
  id: string | number;
  label: string;
  description?: string;
}

interface DropdownProps {
  options: Option[];
  selected: string;
  onSelect: (option: Option) => void;
  placeholder?: string;
}

const DropdownComponent = ({ options, selected, onSelect, placeholder = 'Select an option' }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: Option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-xs">
      {/* Dropdown Button */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-3 rounded-xl glass-card text-[var(--text-primary)] flex items-center justify-between group transition-all hover:border-purple-500/50 shadow-lg"
      >
        <span className="font-medium truncate">{selected || placeholder}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 opacity-50" />
        </motion.div>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-2 rounded-xl border border-[var(--glass-border)] bg-[var(--card-bg)] shadow-2xl overflow-hidden max-h-60 overflow-y-auto"
          >
            {options.map((option, index) => (
              <motion.button
                key={option.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                onClick={() => handleSelect(option)}
                className="w-full px-6 py-4 text-left transition-colors duration-200 hover:bg-purple-500/20 text-[var(--text-primary)] flex items-center justify-between group border-b border-[var(--glass-border)] last:border-0"
              >
                <div className="flex flex-col">
                  <div className="font-medium">{option.label}</div>
                  {option.description && (
                    <div className="text-xs opacity-40 group-hover:opacity-60">
                      {option.description}
                    </div>
                  )}
                </div>
                {selected === option.label && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    <Check className="w-4 h-4 text-purple-500" />
                  </motion.div>
                )}
              </motion.button>
            ))}
            {options.length === 0 && (
              <div className="px-6 py-4 text-sm opacity-40 italic">No results found</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropdownComponent;
