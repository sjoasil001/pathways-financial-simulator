import { useLocation, useNavigate } from 'react-router-dom';

function ResultsScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { finalStatus, characterName, characterId } = location.state || {};

  // Color palette
  const COLORS = {
    pageBg: "#FFF8F1",
    cardBg: "#F3E9DD",
    cardBorder: "#E6D8C8",
    cardHoverBg: "#EFE2D3",
    textMain: "#2D3748",
    textSub: "#6B7280",
    accent: "#6FAF8E",
    accentHover: "#5E9C7D",
    alert: "#C76D5E",
  };

  // If no data, redirect back to character select
  if (!finalStatus || !characterName) {
    navigate('/select');
    return null;
  }

  const getStressEmoji = (level) => {
    if (!level) return '😐';
    const l = level.toLowerCase();
    if (l === 'low') return '😊';
    if (l === 'medium') return '😐';
    if (l === 'high') return '😰';
    return '😱';
  };

  const getOverallGrade = () => {
    const money = finalStatus.money;
    const opportunities = finalStatus.opportunities;
    const stress = finalStatus.stress?.toLowerCase();

    if (money > 5000 && opportunities >= 6 && stress === 'low') {
      return { 
        grade: 'A', 
        color: COLORS.accent, 
        message: 'Excellent! You made smart choices that set you up for success.' 
      };
    } else if (money > 1000 && opportunities >= 4) {
      return { 
        grade: 'B', 
        color: '#5B8A72', 
        message: 'Good work! You balanced immediate needs with future planning.' 
      };
    } else if (money > -1000 && opportunities >= 2) {
      return { 
        grade: 'C', 
        color: '#D97706', 
        message: 'You survived, but some choices created challenges. Try different approaches!' 
      };
    } else {
      return { 
        grade: 'D', 
        color: COLORS.alert, 
        message: 'Tough journey. Many choices led to difficult consequences. Replay to see better paths!' 
      };
    }
  };

  const overallGrade = getOverallGrade();

  return (
    <div 
      className="min-h-screen py-12 px-4"
      style={{ backgroundColor: COLORS.pageBg }}
    >
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 
            className="text-5xl font-bold mb-3"
            style={{ fontFamily: 'Outfit, sans-serif', color: COLORS.textMain }}
          >
            {characterName} at Age 25
          </h1>
          <p 
            className="text-xl"
            style={{ fontFamily: 'Outfit, sans-serif', color: COLORS.textSub }}
          >
            Your Journey Complete
          </p>
        </div>

        {/* Overall Grade */}
        <div 
          className="rounded-2xl p-8 mb-6 text-center border-2"
          style={{ 
            backgroundColor: COLORS.cardBg,
            borderColor: COLORS.cardBorder
          }}
        >
          <div 
            className="text-6xl font-black mb-2"
            style={{ fontFamily: 'Outfit, sans-serif', color: overallGrade.color }}
          >
            Grade: {overallGrade.grade}
          </div>
          <p 
            className="text-lg"
            style={{ fontFamily: 'Outfit, sans-serif', color: COLORS.textMain }}
          >
            {overallGrade.message}
          </p>
        </div>

        {/* Final Status */}
        <div 
          className="rounded-2xl p-8 mb-6 border-2"
          style={{ 
            backgroundColor: COLORS.cardBg,
            borderColor: COLORS.cardBorder
          }}
        >
          <h2 
            className="text-2xl font-bold mb-6 text-center"
            style={{ fontFamily: 'Outfit, sans-serif', color: COLORS.textMain }}
          >
            Final Status
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-5xl mb-2">💰</div>
              <div 
                className="text-3xl font-bold"
                style={{ 
                  fontFamily: 'Outfit, sans-serif',
                  color: finalStatus.money < 0 ? COLORS.alert : COLORS.accent
                }}
              >
                ${finalStatus.money.toLocaleString()}
              </div>
              <div 
                className="text-sm mt-1"
                style={{ fontFamily: 'Outfit, sans-serif', color: COLORS.textSub }}
              >
                Savings
              </div>
            </div>
            
            <div>
              <div className="text-5xl mb-2">📊</div>
              <div 
                className="text-xl font-bold"
                style={{ fontFamily: 'Outfit, sans-serif', color: COLORS.textMain }}
              >
                {finalStatus.credit}
              </div>
              <div 
                className="text-sm mt-1"
                style={{ fontFamily: 'Outfit, sans-serif', color: COLORS.textSub }}
              >
                Credit Score
              </div>
            </div>
            
            <div>
              <div className="text-5xl mb-2">{getStressEmoji(finalStatus.stress)}</div>
              <div 
                className="text-xl font-bold capitalize"
                style={{ fontFamily: 'Outfit, sans-serif', color: COLORS.textMain }}
              >
                {finalStatus.stress}
              </div>
              <div 
                className="text-sm mt-1"
                style={{ fontFamily: 'Outfit, sans-serif', color: COLORS.textSub }}
              >
                Stress Level
              </div>
            </div>
            
            <div>
              <div className="text-5xl mb-2">🎯</div>
              <div 
                className="text-3xl font-bold"
                style={{ fontFamily: 'Outfit, sans-serif', color: COLORS.textMain }}
              >
                {finalStatus.opportunities}
              </div>
              <div 
                className="text-sm mt-1"
                style={{ fontFamily: 'Outfit, sans-serif', color: COLORS.textSub }}
              >
                Opportunities
              </div>
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div 
          className="rounded-2xl p-8 mb-6 border-2"
          style={{ 
            backgroundColor: COLORS.cardBg,
            borderColor: COLORS.cardBorder
          }}
        >
          <h2 
            className="text-2xl font-bold mb-4"
            style={{ fontFamily: 'Outfit, sans-serif', color: COLORS.textMain }}
          >
            What This Means
          </h2>
          
          <div className="space-y-4">
            {finalStatus.money > 2000 && (
              <div 
                className="p-4 rounded border-l-4"
                style={{ 
                  backgroundColor: '#d1fae5',
                  borderColor: COLORS.accent
                }}
              >
                <p 
                  className="font-semibold mb-1"
                  style={{ fontFamily: 'Outfit, sans-serif', color: COLORS.accent }}
                >
                  ✓ Strong Savings
                </p>
                <p 
                  className="text-sm"
                  style={{ fontFamily: 'Outfit, sans-serif', color: COLORS.textMain }}
                >
                  You built a financial cushion that protects you from emergencies and opens opportunities.
                </p>
              </div>
            )}
            
            {finalStatus.money < 0 && (
              <div 
                className="p-4 rounded border-l-4"
                style={{ 
                  backgroundColor: '#fee2e2',
                  borderColor: COLORS.alert
                }}
              >
                <p 
                  className="font-semibold mb-1"
                  style={{ fontFamily: 'Outfit, sans-serif', color: COLORS.alert }}
                >
                  ⚠ In Debt
                </p>
                <p 
                  className="text-sm"
                  style={{ fontFamily: 'Outfit, sans-serif', color: COLORS.textMain }}
                >
                  You're starting adult life in the red. Replay to see how different choices could have avoided this.
                </p>
              </div>
            )}
            
            {finalStatus.credit && finalStatus.credit.includes('Good') && (
              <div 
                className="p-4 rounded border-l-4"
                style={{ 
                  backgroundColor: '#dbeafe',
                  borderColor: '#3b82f6'
                }}
              >
                <p 
                  className="font-semibold mb-1"
                  style={{ fontFamily: 'Outfit, sans-serif', color: '#3b82f6' }}
                >
                  ✓ Good Credit
                </p>
                <p 
                  className="text-sm"
                  style={{ fontFamily: 'Outfit, sans-serif', color: COLORS.textMain }}
                >
                  You built credit history that will help you get apartments, car loans, and better interest rates.
                </p>
              </div>
            )}
            
            {finalStatus.opportunities >= 6 && (
              <div 
                className="p-4 rounded border-l-4"
                style={{ 
                  backgroundColor: '#e9d5ff',
                  borderColor: '#a855f7'
                }}
              >
                <p 
                  className="font-semibold mb-1"
                  style={{ fontFamily: 'Outfit, sans-serif', color: '#a855f7' }}
                >
                  ✓ Many Doors Open
                </p>
                <p 
                  className="text-sm"
                  style={{ fontFamily: 'Outfit, sans-serif', color: COLORS.textMain }}
                >
                  Your choices kept opportunities available. You have options for what comes next.
                </p>
              </div>
            )}
            
            {finalStatus.opportunities <= 2 && (
              <div 
                className="p-4 rounded border-l-4"
                style={{ 
                  backgroundColor: '#fed7aa',
                  borderColor: '#f97316'
                }}
              >
                <p 
                  className="font-semibold mb-1"
                  style={{ fontFamily: 'Outfit, sans-serif', color: '#f97316' }}
                >
                  ⚠ Limited Options
                </p>
                <p 
                  className="text-sm"
                  style={{ fontFamily: 'Outfit, sans-serif', color: COLORS.textMain }}
                >
                  Some doors closed due to past choices. This is recoverable, but it takes time and effort.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Real World Impact */}
        <div 
          className="rounded-2xl p-8 mb-6 border-2"
          style={{ 
            backgroundColor: COLORS.cardHoverBg,
            borderColor: COLORS.accent
          }}
        >
          <h2 
            className="text-2xl font-bold mb-4"
            style={{ fontFamily: 'Outfit, sans-serif', color: COLORS.accent }}
          >
            💡 Real World Impact
          </h2>
          <p 
            className="text-lg mb-4"
            style={{ fontFamily: 'Outfit, sans-serif', color: COLORS.textMain }}
          >
            These weren't just game decisions - they mirror real choices Capital Region youth face every day.
          </p>
          <div 
            className="space-y-2 text-sm"
            style={{ fontFamily: 'Outfit, sans-serif', color: COLORS.textSub }}
          >
            <p>• Small financial decisions compound over years</p>
            <p>• Building credit early opens doors later</p>
            <p>• Emergency funds prevent debt spirals</p>
            <p>• Free resources exist - knowing about them matters</p>
            <p>• Your choices today shape your options tomorrow</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => navigate('/select')}
            className="text-white px-8 py-4 rounded-xl font-bold transition-all text-lg"
            style={{
              fontFamily: 'Outfit, sans-serif',
              backgroundColor: COLORS.accent
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = COLORS.accentHover;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = COLORS.accent;
            }}
          >
            Try Another Character
          </button>
          
          <button
            onClick={() => navigate(`/game/${characterId}`)}
            className="text-white px-8 py-4 rounded-xl font-bold transition-all text-lg border-2"
            style={{
              fontFamily: 'Outfit, sans-serif',
              backgroundColor: 'white',
              borderColor: COLORS.accent,
              color: COLORS.accent
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = COLORS.accent;
              e.target.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'white';
              e.target.style.color = COLORS.accent;
            }}
          >
            ⟲ Replay {characterName}'s Journey
          </button>
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="transition-colors"
            style={{ 
              fontFamily: 'Outfit, sans-serif',
              color: COLORS.textSub
            }}
            onMouseEnter={(e) => {
              e.target.style.color = COLORS.textMain;
            }}
            onMouseLeave={(e) => {
              e.target.style.color = COLORS.textSub;
            }}
          >
          </button>
        </div>

      </div>
    </div>
  );
}

export default ResultsScreen;