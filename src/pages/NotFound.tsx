import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useNavigation } from "@/contexts/NavigationContext";

const NotFound = () => {
  const location = useLocation();
  const { navigateTo } = useNavigation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const handleHomeClick = () => {
    navigateTo('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <button 
          onClick={handleHomeClick}
          className="text-primary underline hover:text-primary/90"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
