import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StatusBar from "./StatusBar";
import Timeline from "./Timeline";
import DecisionCard from "./DecisionCard";
import ConsequenceCard from "./ConsequenceCard";
import TutorialModal from "./TutorialModal";

// Import character images
import eliImage from "../assets/characters/other.svg";
import mayaImage from "../assets/characters/maya.svg";
import jordanImage from "../assets/characters/jordan.svg";
import alexImage from "../assets/characters/alex.svg";
import caseyImage from "../assets/characters/casey.svg";
import riaImage from "../assets/characters/ria.svg";
import devImage from "../assets/characters/dev.svg";
import noorImage from "../assets/characters/noor.svg";
import zoeImage from "../assets/characters/zoe.svg";

// Character image mapping
const characterImages = {
  eli: eliImage,
  maya: mayaImage,
  jordan: jordanImage,
  alex: alexImage,
  casey: caseyImage,
  ria: riaImage,
  dev: devImage,
  noor: noorImage,
  zoe: zoeImage,
};

export default function GameBoard() {
  const { character } = useParams();
  const navigate = useNavigate();

  const [journeyData, setJourneyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Game state
  const [currentDecisionIndex, setCurrentDecisionIndex] = useState(0);
  const [gamePhase, setGamePhase] = useState("decision");
  const [status, setStatus] = useState(null);
  const [currentChoice, setCurrentChoice] = useState(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const [currentTutorialId, setCurrentTutorialId] = useState(null);

  // ✅ Palette (same style as CharacterSelect)
  const COLORS = {
    pageBg: "#FAF7F2",
    cardBg: "#FFFFFF",
    cardBorder: "#E8DED3",
    cardHoverBg: "#F7F1E8",
    textMain: "#243041",
    textSub: "#667085",
    accent: "#6FAF8E",
    accentHover: "#5E9C7D",
    alert: "#C76D5E",
  };

  // Load character data dynamically
  useEffect(() => {
    async function loadCharacterData() {
      try {
        setLoading(true);
        const data = await import(`../data/${character}-journey.json`);
        setJourneyData(data.default);
        setStatus(data.default.starting_status);
        setLoading(false);
      } catch (err) {
        console.error("Error loading character data:", err);
        setError(`Could not load data for ${character}`);
        setLoading(false);
      }
    }
    loadCharacterData();
  }, [character]);

  // derived
  const decisions = journeyData?.decisions || [];
  const currentDecision = decisions[currentDecisionIndex];
  const currentAge = currentDecision?.age || journeyData?.starting_age || 17;

  // Handle choice selection
  const handleChoice = (choice) => {
    setCurrentChoice(choice);

    // Apply immediate status changes (overwrite)
    const newStatus = { ...status };
    Object.keys(choice.immediate_outcome.status_changes).forEach((key) => {
      newStatus[key] = choice.immediate_outcome.status_changes[key];
    });
    setStatus(newStatus);

    setGamePhase("immediate");
  };

  const handleImmediateContinue = () => setGamePhase("consequence");

  const handleConsequenceContinue = () => {
    // Apply delayed status changes
    const newStatus = { ...status };
    Object.keys(currentChoice.delayed_consequence.status_changes).forEach((key) => {
      if (key === "money") {
        newStatus[key] += currentChoice.delayed_consequence.status_changes[key];
      } else {
        newStatus[key] = currentChoice.delayed_consequence.status_changes[key];
      }
    });
    setStatus(newStatus);

    // Move to next decision or end
    if (currentDecisionIndex < decisions.length - 1) {
      setCurrentDecisionIndex((i) => i + 1);
      setCurrentChoice(null);
      setGamePhase("decision");
    } else {
      navigate("/results", {
        state: {
          finalStatus: newStatus,
          characterName: journeyData.character_name,
          characterId: character,
          decisions,
          choices: [],
        },
      });
    }
  };

  const handleReplay = () => {
    setStatus(journeyData.starting_status);
    setCurrentChoice(null);
    setGamePhase("decision");
  };

  const handleLearnMore = (tutorialId) => {
    setCurrentTutorialId(tutorialId);
    setShowTutorial(true);
  };

  const handleCloseTutorial = () => {
    setShowTutorial(false);
    setCurrentTutorialId(null);
  };

  // ---------- Loading ----------
  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-6"
        style={{ backgroundColor: COLORS.pageBg, fontFamily: "Outfit, sans-serif" }}
      >
        <div
          className="rounded-3xl border-2 px-8 py-6 shadow-sm"
          style={{ backgroundColor: COLORS.cardBg, borderColor: COLORS.cardBorder }}
        >
          <div className="text-lg font-semibold" style={{ color: COLORS.textMain }}>
            Loading journey…
          </div>
          <div className="text-sm mt-1" style={{ color: COLORS.textSub }}>
            Preparing {character}&apos;s decisions and outcomes.
          </div>
        </div>
      </div>
    );
  }

  // ---------- Error ----------
  if (error) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-6"
        style={{ backgroundColor: COLORS.pageBg, fontFamily: "Outfit, sans-serif" }}
      >
        <div
          className="max-w-md w-full rounded-3xl border-2 p-8 shadow-sm text-center"
          style={{ backgroundColor: COLORS.cardBg, borderColor: COLORS.cardBorder }}
        >
          <div className="text-xl font-bold" style={{ color: COLORS.alert }}>
            {error}
          </div>

          <p className="text-sm mt-2" style={{ color: COLORS.textSub }}>
            Try going back and picking a character again.
          </p>

          <button
            onClick={() => navigate("/select")}
            className="mt-6 w-full py-3 rounded-[22px] font-semibold transition-all"
            style={{ backgroundColor: COLORS.accent, color: "white" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = COLORS.accentHover)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = COLORS.accent)}
          >
            Back to Character Select
          </button>
        </div>
      </div>
    );
  }

  // ---------- Main ----------
  return (
    <div
      className="min-h-screen py-10 px-4"
      style={{ backgroundColor: COLORS.pageBg, fontFamily: "Outfit, sans-serif" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Top Header Bar (modern + light) */}
        <div
          className="rounded-3xl border-2 px-5 py-4 mb-6 shadow-sm"
          style={{ backgroundColor: COLORS.cardBg, borderColor: COLORS.cardBorder }}
        >
          <div className="flex items-center justify-between gap-4">
            {/* Left: back */}
            <button
              onClick={() => navigate("/select")}
              className="text-sm font-semibold px-4 py-2 rounded-full border transition-all hover:shadow-sm"
              style={{
                borderColor: COLORS.cardBorder,
                color: COLORS.textMain,
                backgroundColor: "#fff",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = COLORS.cardHoverBg)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
            >
              ← Characters
            </button>

            {/* Center: avatar + title */}
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="w-12 h-12 rounded-full border flex items-center justify-center overflow-hidden"
                style={{ borderColor: COLORS.cardBorder, backgroundColor: COLORS.cardHoverBg }}
              >
                {characterImages[character] ? (
                  <img
                    src={characterImages[character]}
                    alt={journeyData?.character_name}
                    className="w-10 h-10 object-contain"
                    draggable="false"
                  />
                ) : (
                  <span className="text-lg">👤</span>
                )}
              </div>

              <div className="min-w-0">
                <div
                  className="text-lg md:text-xl font-extrabold tracking-wide truncate"
                  style={{ color: COLORS.textMain }}
                >
                  {journeyData?.character_name} · Age {currentAge}
                </div>
                <div className="text-xs md:text-sm" style={{ color: COLORS.textSub }}>
                  Decision {currentDecisionIndex + 1} of {decisions.length}
                </div>
              </div>
            </div>

            {/* Right: progress pill */}
            <div
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold"
              style={{
                borderColor: COLORS.cardBorder,
                backgroundColor: COLORS.cardHoverBg,
                color: COLORS.textMain,
              }}
            >
              <span
                className="inline-block w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: COLORS.accent }}
              />
              In progress
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="mb-6">
          <StatusBar status={status} colors={COLORS} />
        </div>

        {/* Timeline */}
        <div className="mb-6">
          <Timeline currentAge={currentAge} colors={COLORS} />
        </div>

        {/* Main Content Area */}
        {gamePhase === "decision" && currentDecision && (
          <DecisionCard decision={currentDecision} onChoice={handleChoice} colors={COLORS} />
        )}

        {gamePhase === "immediate" && currentChoice && (
          <div
            className="rounded-3xl p-8 border-2 shadow-sm"
            style={{ backgroundColor: COLORS.cardBg, borderColor: COLORS.cardBorder }}
          >
            <div className="flex items-center justify-between gap-3 mb-3">
              <h2 className="text-xl md:text-2xl font-extrabold" style={{ color: COLORS.textMain }}>
                Immediate result
              </h2>

              <span
                className="text-xs font-semibold px-3 py-1 rounded-full border"
                style={{
                  borderColor: COLORS.cardBorder,
                  backgroundColor: COLORS.cardHoverBg,
                  color: COLORS.textSub,
                }}
              >
                Applied now
              </span>
            </div>

            <p className="text-base md:text-lg leading-relaxed" style={{ color: COLORS.textSub }}>
              {currentChoice.immediate_outcome.text}
            </p>

            <button
              onClick={handleImmediateContinue}
              className="mt-7 w-full px-6 py-4 rounded-[28px] font-extrabold transition-all shadow-sm hover:shadow-md"
              style={{ backgroundColor: COLORS.accent, color: "white" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = COLORS.accentHover)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = COLORS.accent)}
            >
              Continue
            </button>
          </div>
        )}

        {gamePhase === "consequence" && currentChoice && (
          <ConsequenceCard
            consequence={currentChoice.delayed_consequence}
            onContinue={handleConsequenceContinue}
            onReplay={handleReplay}
            onLearnMore={handleLearnMore}
            colors={COLORS}
          />
        )}

        {/* Tutorial Modal */}
        {showTutorial && currentTutorialId && (
          <TutorialModal tutorialId={currentTutorialId} onClose={handleCloseTutorial} colors={COLORS} />
        )}
      </div>
    </div>
  );
}
