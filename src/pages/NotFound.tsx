import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center p-6">
        <div className="mb-6 text-gym-blue">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="120"
            height="120"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mx-auto"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Oops! Página não encontrada
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild variant="default" className="gap-2">
            <Link to="/">
              <Home size={16} />
              Voltar ao Dashboard
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <Link to="" onClick={() => window.history.back()}>
              <ArrowLeft size={16} />
              Voltar à Página Anterior
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
