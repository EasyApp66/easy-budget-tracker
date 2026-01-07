import { useEffect, useState } from 'react';

interface Snowflake {
  id: number;
  x: number;
  size: number;
  animationDuration: number;
  delay: number;
  opacity: number;
}

const SnowAnimation = () => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const flakes: Snowflake[] = [];
    const flakeCount = 35; // Subtle amount

    for (let i = 0; i < flakeCount; i++) {
      flakes.push({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 3 + 2,
        animationDuration: Math.random() * 8 + 10,
        delay: Math.random() * -15,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute rounded-full bg-white/80"
          style={{
            left: `${flake.x}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
            animation: `snowfall ${flake.animationDuration}s linear infinite`,
            animationDelay: `${flake.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default SnowAnimation;
