export default function HeroBackground() {
  return (
    <>
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden opacity-20 select-none" aria-hidden="true">
        <div className="flex animate-marquee-bg whitespace-nowrap -rotate-3 scale-125 md:scale-150">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex gap-16 md:gap-24 px-8 md:px-12 text-5xl md:text-8xl items-center shrink-0">
              <span className="animate-bounce-slow">🏃‍♂️</span>
              <span className="animate-wiggle-slow delay-150">🧗‍♀️</span>
              <span className="animate-bounce-slow delay-300">🚵‍♂️</span>
              <span className="animate-wiggle-slow delay-500">🏂</span>
              <span className="animate-bounce-slow">🛶</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee-bg {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes wiggle-slow {
          0%, 100% { transform: rotate(-15deg); }
          50% { transform: rotate(15deg); }
        }

        .animate-marquee-bg {
          animation: marquee-bg 80s linear infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 5s ease-in-out infinite;
        }
        .animate-wiggle-slow {
          animation: wiggle-slow 6s ease-in-out infinite;
        }
        .delay-150 { animation-delay: -1.5s; }
        .delay-300 { animation-delay: -3s; }
        .delay-500 { animation-delay: -4.5s; }
      `}</style>
    </>
  );
}
