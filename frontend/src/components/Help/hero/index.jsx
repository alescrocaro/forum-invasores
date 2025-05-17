import { Button } from "antd";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HelpLPHero = () => {
  const navigate = useNavigate();

  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  const redirectToHome = () => {
    navigate("/");
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504392022767-a8fc0771f239?auto=format&fit=crop')", opacity: 0.7 }}></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg">
          Entenda as espécies invasoras
        </h1>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Button size="large" className="hover:bg-primary-green/80" onClick={redirectToHome}>
            Identifique invasoras
          </Button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce cursor-pointer font-semibold text-primary-gray"
        onClick={scrollToFeatures}
      >
        <span className="text-sm mb-2">Instruções</span>
        <ChevronDown className="h-6 w-6" />
      </div>
    </section>
  );
};

export default HelpLPHero;