"use client";

import { useEffect } from "react";

export default function Sw() {
  useEffect(() => {
    async function sw() {
      if (!globalThis.navigator) return;

      if ("serviceWorker" in navigator) {
        const sw = navigator.serviceWorker;
        const isRegistered = await sw.getRegistration("/");
        if (isRegistered) {
          isRegistered.update();
        } else {
          sw.register("/sw.js")
            .then((reg) =>
              console.log("[SW]: Registered successfully:", reg.scope),
            )
            .catch((err) => console.log("[SW]: Registration failed:", err));
        }
      }
    }
    sw();
  });
  return "";
}
