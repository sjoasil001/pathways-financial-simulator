import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";

export default function Landing() {
  const navigate = useNavigate();
  const [spinning, setSpinning] = useState(true);

  useEffect(() => {
    const stopTimer = setTimeout(() => setSpinning(false), 3000);
    const navTimer = setTimeout(() => navigate("/select"), 3400);

    return () => {
      clearTimeout(stopTimer);
      clearTimeout(navTimer);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center" style={{ backgroundColor: '#FAF7F2' }}>
      <div className="flex flex-col items-center gap-8">
        <img
          src={logo}
          alt="Pathways logo"
          className={[
            "w-40 h-40 md:w-48 md:h-48 transition-transform duration-300 drop-shadow-2xl",
            spinning ? "animate-spin [animation-duration:1.2s]" : ""
          ].join(" ")}
        />
        
        <div className="text-center">
          <h1 
            className="text-7xl md:text-8xl font-bold mb-3 tracking-tight drop-shadow-lg"
            style={{ 
              fontFamily: 'Outfit', 
              fontWeight: 700,
              color: '#2D3748'  // Dark gray for contrast
            }}
          >
            PATHWAYS
          </h1>
          <p 
            className="text-2xl md:text-3xl font-medium"
            style={{ 
              fontFamily: 'Outfit',
              color: '#4A5568'  // Medium gray
            }}
          >
            A Financial Simulator
          </p>
        </div>
      </div>
    </div>
  );
}