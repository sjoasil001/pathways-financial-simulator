function Timeline({ currentAge, colors }) {
  const ages = [17, 18, 19, 20, 21, 22, 23, 24, 25];

  return (
    <div 
      className="rounded-2xl p-6 mb-6 border-2"
      style={{
        backgroundColor: colors?.cardBg || '#F3E9DD',
        borderColor: colors?.cardBorder || '#E6D8C8'
      }}
    >
      <div className="flex items-center justify-between">
        {ages.map((age) => {
          const isPast = age < currentAge;
          const isCurrent = age === currentAge;
          const isFuture = age > currentAge;

          return (
            <div key={age} className="flex flex-col items-center">
              <div
                className={`w-4 h-4 rounded-full transition-all ${
                  isCurrent ? 'scale-125 shadow-lg' : ''
                }`}
                style={{
                  backgroundColor: isPast || isCurrent 
                    ? colors?.accent || '#6FAF8E'
                    : colors?.cardBorder || '#E6D8C8'
                }}
              />
              <div 
                className="text-xs mt-2 font-semibold"
                style={{ 
                  fontFamily: 'Outfit',
                  color: isCurrent 
                    ? colors?.accent || '#6FAF8E' 
                    : colors?.textSub || '#6B7280'
                }}
              >
                {age}
              </div>
              {isCurrent && (
                <div 
                  className="text-xs mt-1 font-bold"
                  style={{ 
                    fontFamily: 'Outfit',
                    color: colors?.accent || '#6FAF8E'
                  }}
                >
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Timeline;