"use client";

import { RANKINGS, QUESTIONS } from "@/constants/questionnaire";
import { useState } from "react";

interface EndScreenProps {
  score: number;
}

export default function EndScreen({ score }: EndScreenProps) {
  const ranking =
    RANKINGS.find((r) => score >= r.minScore && score <= r.maxScore) ||
    RANKINGS[0];

  const percentage = Math.round((score / QUESTIONS.length) * 100);
  const [redCircleClicks, setRedCircleClicks] = useState(0);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState("");

  const handleShare = () => {
    const message = encodeURIComponent(
      `🚀 ¡Completé el cuestionario!\n\n` +
        `📊 Puntuación: ${score}/${QUESTIONS.length} (${percentage}%)\n` +
        `🏆 Ranking: ${ranking.title}\n` +
        `✨ ${ranking.subtitle}`
    );
    window.open(`https://wa.me/?text=${message}`, "_blank");
  };

  const handleRedCircleClick = () => {
    const newCount = redCircleClicks + 1;
    console.log("Red circle clicked:", newCount);
    setRedCircleClicks(newCount);

    if (newCount >= 5) {
      console.log("Opening password input");
      setShowPasswordInput(true);
      setRedCircleClicks(0);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "pv5603") {
      localStorage.clear();
      window.location.reload();
    } else {
      setPassword("");
      setShowPasswordInput(false);
    }
  };

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/90 backdrop-blur-md ml-1 mr-1">
      <div className="max-w-lg w-full">
        {/* Terminal-style container */}
        <div className="relative flex flex-col bg-black/80 border-2 border-green-500 rounded-lg font-mono text-green-400 shadow-2xl">
          {/* Terminal header */}
          <div className="flex items-center gap-2 border-b border-green-500/50">
            <div className="flex gap-1.5 p-2 pl-1">
              <div
                className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:bg-red-400 active:scale-90 transition-all"
                onClick={handleRedCircleClick}
              ></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-xs text-green-500/70">
              terminal@resultados:~$
            </span>
          </div>

          {/* Password input modal */}
          {showPasswordInput && (
            <div className="absolute inset-0 bg-black/95 flex items-center justify-center z-50 rounded-lg">
              <form
                onSubmit={handlePasswordSubmit}
                className="flex flex-col gap-4 p-6"
              >
                <div className="text-yellow-400 text-center">
                  <span className="text-yellow-500">$ </span>
                  Ingrese la contraseña
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-black border border-yellow-500 text-yellow-400 px-4 py-2 rounded focus:outline-none focus:border-yellow-300"
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 bg-green-500/20 border border-green-500 text-green-400 px-4 py-2 rounded hover:bg-green-500/30"
                  >
                    Confirmar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowPasswordInput(false);
                      setPassword("");
                    }}
                    className="flex-1 bg-red-500/20 border border-red-500 text-red-400 px-4 py-2 rounded hover:bg-red-500/30"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Content */}
          <div>
            {/* Title */}
            <div>
              <span className="text-green-500 pl-1">$ </span>
              <span className="text-xl font-bold">Cuestionario Completado</span>
            </div>

            {/* Score */}
            <div className="bg-green-500/10 border border-green-500/30 rounded p-4">
              <div className="text-sm text-green-500/70 mb-1">Puntuación:</div>
              <div className="text-3xl font-bold">
                {score} / {QUESTIONS.length}
              </div>
              <div className="text-sm text-green-500/70 mt-1">
                {percentage}% correcto
              </div>
            </div>

            {/* Ranking */}
            <div className="bg-green-500/5 border border-green-500/30 rounded p-4">
              <div className="text-sm text-green-500/70 mb-2">Tu Ranking:</div>
              <div className="text-2xl font-bold text-yellow-400 mb-1">
                {ranking.title}
              </div>
              <div className="text-green-400">{ranking.subtitle}</div>
            </div>

            <div className="flex justify-center">
              {/* Share button */}
              <button
                onClick={handleShare}
                className="bg-green-500/20 hover:bg-green-500/30 border border-green-500 text-green-400 font-bold py-3 px-6 rounded transition-all hover:scale-105 mt-3"
              >
                <span className="text-green-500">$ </span>
                Compartir en WhatsApp 📱
              </button>
            </div>

            {/* Footer */}
            <div className="text-xs text-green-500/50 text-center pt-2 pb-2">
              <span className="animate-pulse">█</span> Presiona para compartir
              tu resultado
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
