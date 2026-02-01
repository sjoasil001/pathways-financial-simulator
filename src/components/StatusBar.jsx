function StatusBar({ status, colors }) {
  const getStressEmoji = (level) => {
    if (!level) return '😐';
    const l = level.toLowerCase();
    if (l === 'low') return '😊';
    if (l === 'medium') return '😐';
    if (l === 'high') return '😰';
    return '😱';
  };

  const getMoneyColor = (amount) => {
    if (amount < 0) return colors?.alert || '#C76D5E';
    return colors?.accent || '#6FAF8E';
  };

  return (
    <div 
      className="rounded-2xl p-6 mb-6 border-2"
      style={{
        backgroundColor: colors?.cardBg || '#F3E9DD',
        borderColor: colors?.cardBorder || '#E6D8C8'
      }}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-4xl mb-2">💰</div>
          <div 
            className="text-2xl font-bold"
            style={{ 
              fontFamily: 'Outfit',
              color: getMoneyColor(status.money)
            }}
          >
            ${status.money?.toLocaleString() || 0}
          </div>
          <div 
            className="text-sm mt-1"
            style={{ 
              fontFamily: 'Outfit',
              color: colors?.textSub || '#6B7280'
            }}
          >
            Money
          </div>
        </div>

        <div className="text-center">
          <div className="text-4xl mb-2">📊</div>
          <div 
            className="text-lg font-bold"
            style={{ 
              fontFamily: 'Outfit',
              color: colors?.textMain || '#2D3748'
            }}
          >
            {status.credit || 'Not built'}
          </div>
          <div 
            className="text-sm mt-1"
            style={{ 
              fontFamily: 'Outfit',
              color: colors?.textSub || '#6B7280'
            }}
          >
            Credit Score
          </div>
        </div>

        <div className="text-center">
          <div className="text-4xl mb-2">{getStressEmoji(status.stress)}</div>
          <div 
            className="text-lg font-bold capitalize"
            style={{ 
              fontFamily: 'Outfit',
              color: colors?.textMain || '#2D3748'
            }}
          >
            {status.stress || 'Low'}
          </div>
          <div 
            className="text-sm mt-1"
            style={{ 
              fontFamily: 'Outfit',
              color: colors?.textSub || '#6B7280'
            }}
          >
            Stress Level
          </div>
        </div>

        <div className="text-center">
          <div className="text-4xl mb-2">🎯</div>
          <div 
            className="text-2xl font-bold"
            style={{ 
              fontFamily: 'Outfit',
              color: colors?.textMain || '#2D3748'
            }}
          >
            {status.opportunities || 0}
          </div>
          <div 
            className="text-sm mt-1"
            style={{ 
              fontFamily: 'Outfit',
              color: colors?.textSub || '#6B7280'
            }}
          >
            Opportunities
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatusBar;