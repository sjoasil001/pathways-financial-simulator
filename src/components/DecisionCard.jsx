function DecisionCard({ decision, onChoice, colors }) {
  return (
    <div className="relative">
      {/* Thought bubble dots */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        <div 
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: colors?.cardBorder || '#E6D8C8' }}
        />
        <div 
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: colors?.cardBorder || '#E6D8C8' }}
        />
        <div 
          className="w-5 h-5 rounded-full"
          style={{ backgroundColor: colors?.cardBorder || '#E6D8C8' }}
        />
      </div>

      {/* Main thought bubble */}
      <div 
        className="rounded-[3rem] p-8 border-2 relative"
        style={{
          backgroundColor: colors?.cardBg || '#F3E9DD',
          borderColor: colors?.cardBorder || '#E6D8C8'
        }}
      >
        <div className="mb-6">
          <h2 
            className="text-3xl font-black mb-2"
            style={{ 
              fontFamily: 'Outfit, sans-serif',
              color: colors?.textMain || '#2D3748'
            }}
          >
             {decision.title}
          </h2>
          <p 
            className="text-sm font-semibold"
            style={{ 
              fontFamily: 'Outfit, sans-serif',
              color: colors?.textSub || '#6B7280'
            }}
          >
            {decision.month}
          </p>
        </div>

        <p 
          className="text-lg mb-6 leading-relaxed"
          style={{ 
            fontFamily: 'Outfit, sans-serif',
            color: colors?.textMain || '#2D3748'
          }}
        >
          {decision.scenario}
        </p>

        {decision.context_info && (
          <div 
            className="p-4 rounded-lg mb-6 border-l-4"
            style={{
              backgroundColor: colors?.cardHoverBg || '#EFE2D3',
              borderColor: colors?.accent || '#6FAF8E'
            }}
          >
            <p 
              className="text-sm font-bold mb-2"
              style={{ 
                fontFamily: 'Outfit, sans-serif',
                color: colors?.textSub || '#6B7280'
              }}
            >
              WHAT THIS MEANS:
            </p>
            <p 
              className="text-sm leading-relaxed whitespace-pre-line"
              style={{ 
                fontFamily: 'Outfit, sans-serif',
                color: colors?.textSub || '#6B7280'
              }}
            >
              {decision.context_info}
            </p>
          </div>
        )}

        {/* Circular choice buttons */}
        <div className="space-y-4">
          {decision.choices.map((choice) => (
            <button
              key={choice.id}
              onClick={() => onChoice(choice)}
              className="w-full p-6 font-bold text-center transition-all hover:scale-105 border-2"
              style={{
                fontFamily: 'Outfit, sans-serif',
                backgroundColor: 'white',
                borderColor: colors?.cardBorder || '#E6D8C8',
                borderRadius: '50px',  // Makes it pill-shaped/circular
                color: colors?.textMain || '#2D3748'
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = colors?.accent || '#6FAF8E';
                e.target.style.backgroundColor = colors?.cardHoverBg || '#EFE2D3';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = colors?.cardBorder || '#E6D8C8';
                e.target.style.backgroundColor = 'white';
              }}
            >
              {choice.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DecisionCard;