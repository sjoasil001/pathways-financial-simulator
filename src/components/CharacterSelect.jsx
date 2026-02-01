import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import charactersData from "../data/characters.json";

import eliImage from "../assets/characters/other.svg";
import mayaImage from "../assets/characters/maya.svg";
import jordanImage from "../assets/characters/jordan.svg";
import alexImage from "../assets/characters/alex.svg";
import caseyImage from "../assets/characters/casey.svg";
import riaImage from "../assets/characters/ria.svg";
import devImage from "../assets/characters/dev.svg";
import noorImage from "../assets/characters/noor.svg";
import zoeImage from "../assets/characters/zoe.svg";

import shuffleIcon from "../assets/refresh.svg";

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

// --- helpers ---
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickFour(allChars) {
  return shuffle(allChars).slice(0, 4);
}

export default function CharacterSelect() {
  const navigate = useNavigate();
  const [visibleCharacters, setVisibleCharacters] = useState([]);

  // Warm “modern light” palette (matches your beige background vibe)
  const COLORS = useMemo(
    () => ({
      pageBg: "#FAF7F2",
      pageGlow: "#FFF2E6",

      cardBg: "#FFFFFF",
      cardHoverBg: "#FFFBF5",
      cardBorder: "#E8DED3",

      textMain: "#1F2937",
      textSub: "#6B7280",
      textSoft: "#9CA3AF",

      accent: "#6FAF8E",
      accentHover: "#5E9C7D",
      accentRing: "rgba(111,175,142,0.35)",

      alert: "#C76D5E",
      shadow: "rgba(31,41,55,0.10)",
    }),
    []
  );

  useEffect(() => {
    const stored = sessionStorage.getItem("visibleCharacters");
    if (stored) {
      setVisibleCharacters(JSON.parse(stored));
    } else {
      const picked = pickFour(charactersData.characters);
      setVisibleCharacters(picked);
      sessionStorage.setItem("visibleCharacters", JSON.stringify(picked));
    }
  }, []);

  const reshuffle = () => {
    const picked = pickFour(charactersData.characters);
    setVisibleCharacters(picked);
    sessionStorage.setItem("visibleCharacters", JSON.stringify(picked));
  };

  return (
    <div
      className="min-h-screen py-14 px-6"
      style={{
        backgroundColor: COLORS.pageBg,
        fontFamily: "Outfit, sans-serif",
      }}
    >
      <div className="max-w-[1500px] mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm mb-5"
            style={{
              borderColor: COLORS.cardBorder,
              color: COLORS.textSub,
              backgroundColor: "rgba(255,255,255,0.65)",
              backdropFilter: "blur(6px)",
            }}
          >
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{ backgroundColor: COLORS.accent }}
            />
            4 random characters • shuffle for more
          </div>

          <h1
            className="text-5xl md:text-6xl font-extrabold tracking-tight"
            style={{ color: COLORS.textMain }}
          >
            Pick Your Journey
          </h1>
          <p className="mt-3 text-lg md:text-xl" style={{ color: COLORS.textSub }}>
            Each character faces financial decisions from age 17 to 25.
          </p>
        </div>

        {/* Cards wrapper */}
        <div className="relative">
          {/* Subtle background glow behind grid */}
          <div
            className="pointer-events-none absolute -inset-x-6 -top-10 h-64 blur-3xl opacity-70"
            style={{
              background:
                `radial-gradient(60% 60% at 50% 30%, ${COLORS.pageGlow} 0%, transparent 70%)`,
            }}
          />

          {/* Shuffle button (top-right above cards) */}
          <div className="flex items-center justify-end mb-4 relative z-10">
            <button
              onClick={reshuffle}
              aria-label="Shuffle characters"
              className="
                group inline-flex items-center gap-2
                rounded-full border px-4 py-2
                bg-white/70 backdrop-blur
                shadow-sm
                transition
                hover:shadow-md
                focus:outline-none focus:ring-4
              "
              style={{
                borderColor: COLORS.cardBorder,
                color: COLORS.textMain,
                boxShadow: `0 8px 18px ${COLORS.shadow}`,
              }}
            >
              <span className="relative flex items-center justify-center w-8 h-8 rounded-full border bg-white">
                <img
                  src={shuffleIcon}
                  alt=""
                  className="w-4 h-4 opacity-80 transition-transform duration-300 group-hover:rotate-180"
                  draggable="false"
                />
              </span>
              <span className="font-semibold" style={{ color: COLORS.textMain }}>
                Shuffle
              </span>

              <span
                className="text-sm font-medium"
                style={{ color: COLORS.textSoft }}
              >
                (new picks)
              </span>

              {/* focus ring color */}
              <style>{`
                button:focus-visible { box-shadow: 0 0 0 6px ${COLORS.accentRing}; }
              `}</style>
            </button>
          </div>

          {/* Character cards grid */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-10">
            {visibleCharacters.map((char) => (
              <div
                key={char.id}
                role="button"
                tabIndex={0}
                onClick={() => navigate(`/game/${char.id}`)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") navigate(`/game/${char.id}`);
                }}
                className="
                  group relative rounded-3xl border
                  p-9 text-center cursor-pointer
                  min-h-[520px]
                  flex flex-col justify-between
                  bg-white
                  transition
                  hover:-translate-y-1 hover:shadow-2xl
                  focus:outline-none focus:ring-4
                "
                style={{
                  backgroundColor: COLORS.cardBg,
                  borderColor: COLORS.cardBorder,
                  boxShadow: `0 14px 30px ${COLORS.shadow}`,
                }}
              >
                {/* Card hover overlay */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition"
                  style={{
                    background:
                      `linear-gradient(180deg, ${COLORS.cardHoverBg} 0%, rgba(255,255,255,0) 80%)`,
                  }}
                />

                {/* Status dot */}
                <div
                  className="absolute top-6 right-6 w-3.5 h-3.5 rounded-full"
                  style={{
                    backgroundColor: COLORS.accent,
                    boxShadow: `0 0 0 6px ${COLORS.accentRing}`,
                  }}
                />

                {/* Content */}
                <div className="relative flex-1 flex flex-col justify-center">
                  {/* Image */}
                  <div className="mb-7">
                    {characterImages[char.id] ? (
                      <img
                        src={characterImages[char.id]}
                        alt={char.name}
                        className="
                          w-44 h-44 mx-auto object-contain select-none
                          transition-transform duration-300
                          group-hover:scale-[1.03]
                        "
                        draggable="false"
                      />
                    ) : (
                      <div className="text-8xl">{char.emoji}</div>
                    )}
                  </div>

                  <h3
                    className="text-3xl font-extrabold mb-2"
                    style={{ color: COLORS.textMain }}
                  >
                    {char.name}
                  </h3>

                  <p className="text-lg font-semibold mb-5" style={{ color: COLORS.textSub }}>
                    Age {char.age}
                  </p>

                  <p className="text-sm leading-relaxed mb-3" style={{ color: COLORS.textSub }}>
                    {char.description}
                  </p>

                  <p className="text-sm font-semibold" style={{ color: COLORS.alert }}>
                    {char.detail}
                  </p>
                </div>

                {/* CTA button */}
                <button
                  className="
                    relative w-full overflow-hidden
                    text-white px-6 py-4
                    rounded-full font-extrabold text-lg
                    transition
                    focus:outline-none
                  "
                  style={{
                    backgroundColor: COLORS.accent,
                    boxShadow: `0 18px 30px rgba(111,175,142,0.25)`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = COLORS.accentHover;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = COLORS.accent;
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/game/${char.id}`);
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Start Journey <span className="transition-transform group-hover:translate-x-0.5">→</span>
                  </span>

                  {/* subtle shine */}
                  <span
                    className="
                      absolute inset-y-0 -left-24 w-24
                      opacity-30
                      rotate-12
                      group-hover:left-[110%]
                      transition-all duration-700
                    "
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.75), transparent)",
                    }}
                  />
                </button>

                {/* focus ring per card */}
                <style>{`
                  .group:focus-visible { box-shadow: 0 0 0 6px ${COLORS.accentRing}; }
                `}</style>
              </div>
            ))}
          </div>


        </div>
      </div>
    </div>
  );
}
