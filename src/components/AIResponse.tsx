import { Bot, User } from 'lucide-react';

interface AIResponseProps {
  question: string;
  answer: string;
}

export const AIResponse = ({ question, answer }: AIResponseProps) => {
  return (
    <div className="space-y-4 fade-in">
      {/* Question de l'utilisateur */}
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-secondary-foreground" />
        </div>
        <div className="flex-1 bg-secondary rounded-lg px-4 py-3">
          <p className="text-secondary-foreground">{question}</p>
        </div>
      </div>

      {/* Réponse de l'IA */}
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 w-8 h-8 gradient-primary rounded-full flex items-center justify-center">
          <Bot className="w-4 h-4 text-primary-foreground" />
        </div>
        <div className="flex-1 bg-card rounded-lg px-4 py-3 shadow-soft border border-border">
          <p className="text-card-foreground leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
};