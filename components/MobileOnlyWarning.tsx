"use client";

import { useEffect, useState } from "react";

export default function MobileOnlyWarning() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkIfMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords = [
        "android",
        "webos",
        "iphone",
        "ipad",
        "ipod",
        "blackberry",
        "windows phone",
      ];

      const isMobileDevice = mobileKeywords.some((keyword) =>
        userAgent.includes(keyword)
      );

      const isSmallScreen = window.innerWidth <= 768;

      setIsMobile(isMobileDevice || isSmallScreen);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  if (isMobile) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="max-w-md w-full">
        {/* Terminal-style error container */}
        {/* Terminal-style error container */}
        <div className="flex flex-col gap-2 bg-black border-2 border-red-500 rounded-lg font-mono text-red-400 shadow-2xl">
          {/* Terminal header */}
          <div className="flex items-center gap-2 border-b border-red-500/50">
            <div className="flex ml-2 gap-1.5 justify-center items-center">
              <div className="w-1 h-5"></div>
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-red-500/30"></div>
            </div>
            <span className="text-xs text-red-500/70">terminal@error:~$</span>
          </div>

          {/* Error icon */}
          <div className="text-center">
            <div className="text-6xl mb-2 mt-4">⚠️</div>
          </div>

          {/* Error message */}
          <div className="space-y-4 px-2">
            <div>
              <span className="text-red-500">$ </span>
              <span className="text-xl font-bold">ERROR</span>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded p-4">
              <div className="text-red-400 mb-2">Dispositivo No Compatible</div>
              <div className="text-sm text-red-400/80">
                Esta aplicación está diseñada exclusivamente para dispositivos
                móviles.
              </div>
            </div>

            <div className="space-y-2 text-sm text-red-400/70">
              <div>
                <span className="text-red-500">$ </span>
                Por favor, accede desde:
              </div>
              <div className="ml-4 space-y-1">
                <div>
                  <span className="text-red-500">•</span> Un teléfono móvil
                </div>
                <div>
                  <span className="text-red-500">•</span> Una tablet
                </div>
                <div>
                  <span className="text-red-500">•</span> O reduce el tamaño de
                  tu ventana
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-xs text-red-500/50 text-center pt-4 border-t border-red-500/30">
              <span className="animate-pulse">█</span> Acceso denegado desde
              escritorio
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
