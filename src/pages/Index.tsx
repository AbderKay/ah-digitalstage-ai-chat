import { useState } from 'react';
import { Send, Bot, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FAQCard } from '@/components/FAQCard';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { AIResponse } from '@/components/AIResponse';
import logoImage from '@/assets/ah-digitalstage-logo.png';

const Index = () => {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<{ question: string; answer: string } | null>(null);
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  // Questions FAQ statiques pour l'hôtel
  const faqData = [
    {
      question: "Quels sont les horaires de check-in et check-out ?",
      answer: "Le check-in s'effectue à partir de 15h00 et le check-out jusqu'à 12h00. Un check-in anticipé ou check-out tardif peut être organisé sur demande selon disponibilité."
    },
    {
      question: "L'hôtel dispose-t-il d'un parking ?",
      answer: "Oui, nous proposons un parking privé sécurisé gratuit pour nos clients. Des places de stationnement pour véhicules électriques avec bornes de recharge sont également disponibles."
    },
    {
      question: "Quels services sont inclus dans le séjour ?",
      answer: "Nos services incluent : WiFi haut débit gratuit, petit-déjeuner continental, service en chambre 24h/24, conciergerie, salle de fitness, et accès au spa."
    },
    {
      question: "L'hôtel accepte-t-il les animaux de compagnie ?",
      answer: "Oui, nous acceptons les animaux de compagnie avec un supplément de 25€ par nuit. Merci de nous prévenir lors de votre réservation."
    },
    {
      question: "Proposez-vous des services de restauration ?",
      answer: "Nous disposons d'un restaurant gastronomique ouvert de 19h à 23h, d'un bar lounge ouvert jusqu'à 1h du matin, et d'un service en chambre 24h/24."
    }
  ];

  /**
   * Fonction pour envoyer la question à l'API webhook n8n
   * Endpoint: http://localhost:5678/webhook/faq-question
   * Méthode: POST
   * Body: { question: string }
   * Réponse attendue: { answer: string } ou { reponse: string }
   */
  const handleSubmitQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim()) return;

    setIsLoading(true);
    setAiResponse(null);

    try {
      // Appel au webhook n8n - Facilement intégrable avec n8n
      const response = await fetch('http://localhost:5678/webhook/faq-question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Headers additionnels si nécessaire pour l'authentification n8n
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          question: question.trim(),
          // Métadonnées utiles pour n8n
          timestamp: new Date().toISOString(),
          source: 'ah-digitalstage-website'
        })
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      
      // Support pour différents formats de réponse de l'API
      const answer = data.answer || data.reponse || data.response || 'Désolé, je n\'ai pas pu traiter votre question.';
      
      setAiResponse({
        question: question,
        answer: answer
      });

    } catch (error) {
      console.error('Erreur lors de l\'appel à l\'API:', error);
      
      // Message d'erreur convivial pour l'utilisateur
      setAiResponse({
        question: question,
        answer: 'Désolé, notre assistant IA est temporairement indisponible. Veuillez réessayer dans quelques instants ou consultez notre FAQ ci-dessous.'
      });
    } finally {
      setIsLoading(false);
      setQuestion(''); // Réinitialiser le champ de saisie
    }
  };

  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header avec logo */}
      <header className="gradient-hero py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <img 
              src={logoImage} 
              alt="AH DigitalStage Logo" 
              className="h-16 w-auto shadow-glow rounded-lg"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4 fade-in">
            AH DigitalStage
          </h1>
          <p className="text-xl text-primary-foreground/90 mb-2 fade-in">
            Votre hôtel digital de luxe
          </p>
        </div>
      </header>

      {/* Section principale FAQ IA */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Message d'accueil */}
        <div className="text-center mb-12 fade-in">
          <div className="inline-flex items-center space-x-3 mb-6">
            <Bot className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">Assistant IA 24h/24</h2>
            <Bot className="w-8 h-8 text-mint" />
          </div>
          <p className="text-lg text-muted-foreground mb-8">
            Posez votre question à notre assistant IA intelligent 🤖<br />
            <span className="text-sm">Réponses instantanées pour tous vos besoins</span>
          </p>

          {/* Formulaire de question */}
          <form onSubmit={handleSubmitQuestion} className="max-w-2xl mx-auto">
            <div className="flex gap-3">
              <Input
                type="text"
                placeholder="Tapez votre question ici... (ex: Quels sont vos tarifs ?)"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="flex-1 h-12 text-base shadow-soft border-2 border-border focus:border-primary transition-smooth"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                variant="ai" 
                size="lg"
                disabled={isLoading || !question.trim()}
                className="h-12 px-6"
              >
                <Send className="w-5 h-5" />
                <span className="hidden sm:inline">Envoyer</span>
              </Button>
            </div>
          </form>
        </div>

        {/* Zone de réponse IA */}
        <div className="mb-12">
          {isLoading && (
            <div className="max-w-2xl mx-auto bg-card rounded-lg p-6 shadow-soft border border-border">
              <div className="text-center">
                <p className="text-muted-foreground mb-4">Notre IA traite votre question...</p>
                <LoadingSpinner />
              </div>
            </div>
          )}

          {aiResponse && !isLoading && (
            <div className="max-w-2xl mx-auto bg-card rounded-lg p-6 shadow-elegant border border-border">
              <AIResponse question={aiResponse.question} answer={aiResponse.answer} />
            </div>
          )}
        </div>

        {/* Section FAQ statique */}
        <section className="fade-in">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Questions Fréquentes
            </h3>
            <p className="text-muted-foreground">
              Consultez nos réponses aux questions les plus courantes
            </p>
          </div>

          <div className="grid gap-4 max-w-3xl mx-auto">
            {faqData.map((faq, index) => (
              <FAQCard
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFAQIndex === index}
                onClick={() => toggleFAQ(index)}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 px-4 mt-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            {/* Contact */}
            <div>
              <h4 className="text-lg font-semibold mb-4 flex items-center justify-center md:justify-start">
                <Phone className="w-5 h-5 mr-2" />
                Contact
              </h4>
              <div className="space-y-2 text-primary-foreground/80">
                <p className="flex items-center justify-center md:justify-start">
                  <Phone className="w-4 h-4 mr-2" />
                  +33 1 23 45 67 89
                </p>
                <p className="flex items-center justify-center md:justify-start">
                  <Mail className="w-4 h-4 mr-2" />
                  contact@ahdigitalstage.fr
                </p>
              </div>
            </div>

            {/* Adresse */}
            <div>
              <h4 className="text-lg font-semibold mb-4 flex items-center justify-center md:justify-start">
                <MapPin className="w-5 h-5 mr-2" />
                Adresse
              </h4>
              <div className="text-primary-foreground/80">
                <p>123 Avenue des Champs-Élysées</p>
                <p>75008 Paris, France</p>
              </div>
            </div>

            {/* Horaires */}
            <div>
              <h4 className="text-lg font-semibold mb-4 flex items-center justify-center md:justify-start">
                <Clock className="w-5 h-5 mr-2" />
                Réception
              </h4>
              <div className="text-primary-foreground/80">
                <p>24h/24 - 7j/7</p>
                <p>Service en continu</p>
              </div>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 pt-8 mt-8 text-center">
            <p className="text-primary-foreground/60">
              © 2024 AH DigitalStage. Tous droits réservés.
            </p>
            <p className="text-primary-foreground/60 text-sm mt-2">
              Propulsé par l'IA - Assistant intelligent intégré
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;