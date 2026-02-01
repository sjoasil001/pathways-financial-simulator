function ConsequenceCard({ consequence, onContinue, onReplay, onLearnMore, colors }) {
  return (
    <div 
      className="rounded-2xl p-8 border-2"
      style={{
        backgroundColor: colors?.cardBg || '#F3E9DD',
        borderColor: colors?.cardBorder || '#E6D8C8'
      }}
    >
      <h2 
        className="text-2xl font-bold mb-4 flex items-center gap-2"
        style={{ 
          fontFamily: 'Outfit, sans-serif',
          color: colors?.alert || '#C76D5E'
        }}
      >
        <span></span> CONSEQUENCE
      </h2>

      {/* What Happened */}
      <div 
        className="p-4 rounded-lg mb-6 border-l-4"
        style={{
          backgroundColor: '#f8d7da',
          borderColor: colors?.alert || '#C76D5E'
        }}
      >
        <p 
          className="leading-relaxed whitespace-pre-line"
          style={{ 
            fontFamily: 'Outfit, sans-serif',
            color: colors?.textMain || '#2D3748'
          }}
        >
          {consequence.text}
        </p>
      </div>

      {/* Why This Happened */}
      <div 
        className="p-4 rounded-lg mb-6 border-l-4"
        style={{
          backgroundColor: colors?.cardHoverBg || '#EFE2D3',
          borderColor: '#F59E0B'
        }}
      >
        <p 
          className="text-sm font-bold mb-2"
          style={{ 
            fontFamily: 'Outfit, sans-serif',
            color: colors?.textSub || '#6B7280'
          }}
        >
          💡 WHY THIS HAPPENED:
        </p>
        <p 
          className="text-sm leading-relaxed whitespace-pre-line"
          style={{ 
            fontFamily: 'Outfit, sans-serif',
            color: colors?.textSub || '#6B7280'
          }}
        >
          {consequence.why}
        </p>
      </div>

      {/* Status Changes */}
      {consequence.status_changes && Object.keys(consequence.status_changes).length > 0 && (
        <div className="grid grid-cols-2 gap-3 mb-6">
          {Object.entries(consequence.status_changes).map(([key, value]) => (
            <div 
              key={key}
              className="p-3 rounded-lg text-center border-2"
              style={{
                backgroundColor: 'white',
                borderColor: colors?.cardBorder || '#E6D8C8'
              }}
            >
              <div 
                className="text-sm font-semibold capitalize"
                style={{ 
                  fontFamily: 'Outfit, sans-serif',
                  color: colors?.textSub || '#6B7280'
                }}
              >
                {key}
              </div>
              <div 
                className="text-lg font-bold"
                style={{ 
                  fontFamily: 'Outfit, sans-serif',
                  color: typeof value === 'number' && value < 0 
                    ? colors?.alert || '#C76D5E' 
                    : colors?.accent || '#6FAF8E'
                }}
              >
                {typeof value === 'number' ? (value > 0 ? `+${value}` : value) : value}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Learn More Button */}
      {consequence.tutorial_id && (
        <button
          onClick={() => onLearnMore(consequence.tutorial_id)}
          className="w-full mb-3 px-6 py-3 rounded-xl font-bold transition-all border-2"
          style={{
            fontFamily: 'Outfit, sans-serif',
            backgroundColor: 'white',
            borderColor: colors?.accent || '#6FAF8E',
            color: colors?.accent || '#6FAF8E'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = colors?.accent || '#6FAF8E';
            e.target.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'white';
            e.target.style.color = colors?.accent || '#6FAF8E';
          }}
        >
          Learn More
        </button>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onReplay}
          className="px-6 py-3 rounded-xl font-bold transition-all border-2"
          style={{
            fontFamily: 'Outfit, sans-serif',
            backgroundColor: 'white',
            borderColor: colors?.cardBorder || '#E6D8C8',
            color: colors?.textMain || '#2D3748'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = colors?.cardHoverBg || '#EFE2D3';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'white';
          }}
        >
          ⟲ Replay
        </button>

        <button
          onClick={onContinue}
          className="px-6 py-3 rounded-xl font-bold text-white transition-all"
          style={{
            fontFamily: 'Outfit, sans-serif',
            backgroundColor: colors?.accent || '#6FAF8E'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = colors?.accentHover || '#5E9C7D';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = colors?.accent || '#6FAF8E';
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default ConsequenceCard;