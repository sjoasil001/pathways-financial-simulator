import { useState, useEffect } from 'react';

function TutorialModal({ tutorialId, onClose, colors }) {
  const [tutorial, setTutorial] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTutorial() {
      try {
        const data = await import(`../data/tutorials/${tutorialId}.json`);
        setTutorial(data.default);
        setLoading(false);
      } catch (err) {
        console.error('Error loading tutorial:', err);
        setLoading(false);
      }
    }
    loadTutorial();
  }, [tutorialId]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div 
          className="rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          style={{ backgroundColor: colors?.cardBg || '#F3E9DD' }}
        >
          <p style={{ fontFamily: 'Outfit, sans-serif', color: colors?.textMain }}>
            Loading tutorial...
          </p>
        </div>
      </div>
    );
  }

  if (!tutorial) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div 
          className="rounded-2xl p-8 max-w-3xl w-full"
          style={{ backgroundColor: colors?.cardBg || '#F3E9DD' }}
        >
          <p style={{ fontFamily: 'Outfit, sans-serif', color: colors?.alert }}>
            Tutorial not found
          </p>
          <button
            onClick={onClose}
            className="mt-4 px-6 py-3 rounded-xl font-bold"
            style={{
              fontFamily: 'Outfit, sans-serif',
              backgroundColor: colors?.accent,
              color: 'white'
            }}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div 
        className="rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto border-2"
        style={{ 
          backgroundColor: colors?.cardBg || '#F3E9DD',
          borderColor: colors?.cardBorder || '#E6D8C8'
        }}
      >
        {/* Header */}
        <div className="mb-6">
          <h2 
            className="text-3xl font-bold mb-2"
            style={{ fontFamily: 'Outfit, sans-serif', color: colors?.textMain }}
          >
             {tutorial.title}
          </h2>
          <p 
            className="text-lg mb-1"
            style={{ fontFamily: 'Outfit, sans-serif', color: colors?.textSub }}
          >
            {tutorial.subtitle}
          </p>
          <p 
            className="text-sm"
            style={{ fontFamily: 'Outfit, sans-serif', color: colors?.textSub }}
          >
             {tutorial.estimated_time}
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-6 mb-6">
          {tutorial.sections.map((section) => (
            <div 
              key={section.step}
              className="p-6 rounded-xl border-2"
              style={{
                backgroundColor: 'white',
                borderColor: colors?.cardBorder || '#E6D8C8'
              }}
            >
              <h3 
                className="text-xl font-bold mb-3 flex items-center gap-2"
                style={{ fontFamily: 'Outfit, sans-serif', color: colors?.accent }}
              >
                <span>{section.icon || `${section.step}️⃣`}</span>
                {section.title}
              </h3>
              <p 
                className="leading-relaxed whitespace-pre-line"
                style={{ fontFamily: 'Outfit, sans-serif', color: colors?.textMain }}
              >
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Local Resources */}
        {tutorial.local_resources && tutorial.local_resources.length > 0 && (
          <div 
            className="p-6 rounded-xl border-2 mb-6"
            style={{
              backgroundColor: colors?.cardHoverBg || '#EFE2D3',
              borderColor: colors?.accent || '#6FAF8E'
            }}
          >
            <h3 
              className="text-xl font-bold mb-4"
              style={{ fontFamily: 'Outfit, sans-serif', color: colors?.accent }}
            >
              Capital Region Resources
            </h3>
            <div className="space-y-4">
              {tutorial.local_resources.map((resource, idx) => (
                <div key={idx}>
                  <h4 
                    className="font-bold mb-1"
                    style={{ fontFamily: 'Outfit, sans-serif', color: colors?.textMain }}
                  >
                    {resource.icon} {resource.name}
                  </h4>
                  <p 
                    className="text-sm"
                    style={{ fontFamily: 'Outfit, sans-serif', color: colors?.textSub }}
                  >
                    {resource.description}
                  </p>
                  {resource.address && (
                    <p className="text-sm" style={{ color: colors?.textSub }}>
                      📍 {resource.address}
                    </p>
                  )}
                  {resource.phone && (
                    <p className="text-sm" style={{ color: colors?.textSub }}>
                      📞 {resource.phone}
                    </p>
                  )}
                  {resource.website && (
                    <p className="text-sm" style={{ color: colors?.textSub }}>
                      🌐 {resource.website}
                    </p>
                  )}
                  {resource.hours && (
                    <p className="text-sm" style={{ color: colors?.textSub }}>
                      🕐 {resource.hours}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Takeaways */}
        {tutorial.key_takeaways && (
          <div 
            className="p-4 rounded-xl mb-6 border-l-4"
            style={{
              backgroundColor: colors?.cardHoverBg || '#EFE2D3',
              borderColor: colors?.accent || '#6FAF8E'
            }}
          >
            <h4 
              className="font-bold mb-2"
              style={{ fontFamily: 'Outfit, sans-serif', color: colors?.accent }}
            >
              💡 Key Takeaways:
            </h4>
            <ul className="space-y-1">
              {tutorial.key_takeaways.map((takeaway, idx) => (
                <li 
                  key={idx}
                  className="text-sm"
                  style={{ fontFamily: 'Outfit, sans-serif', color: colors?.textMain }}
                >
                  • {takeaway}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full px-6 py-4 rounded-xl font-bold text-white transition-all"
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
          Got It! Close Tutorial
        </button>
      </div>
    </div>
  );
}

export default TutorialModal;