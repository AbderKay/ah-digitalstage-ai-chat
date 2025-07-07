import { Bot } from 'lucide-react';

export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center space-x-3 py-8">
      <div className="relative">
        <Bot className="w-8 h-8 text-primary ai-pulse" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-mint rounded-full opacity-20 animate-ping"></div>
      </div>
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-mint rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );
};