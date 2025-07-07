import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQCardProps {
  question: string;
  answer: string;
  isOpen?: boolean;
  onClick?: () => void;
}

export const FAQCard = ({ question, answer, isOpen = false, onClick }: FAQCardProps) => {
  return (
    <div className="bg-card rounded-lg shadow-soft border border-border hover:shadow-elegant transition-smooth fade-in">
      <button
        onClick={onClick}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-card-hover transition-smooth"
      >
        <h3 className="text-lg font-medium text-card-foreground">{question}</h3>
        <ChevronDown 
          className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      
      {isOpen && (
        <div className="px-6 pb-4 slide-up">
          <div className="pt-2 border-t border-border">
            <p className="text-muted-foreground leading-relaxed">{answer}</p>
          </div>
        </div>
      )}
    </div>
  );
};