import { useLocation, Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <h1 className="mb-4 text-4xl font-bold text-foreground">404</h1>
      <p className="mb-4 text-lg text-muted-foreground">
        Page not found: {location.pathname}
      </p>
      <Link to="/" className="text-primary underline hover:text-primary/80">
        Return to Home
      </Link>
    </div>
  );
};

export default NotFound;
