import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

// List of themes you imported
const themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset",
  "caramellatte",
  "abyss",
  "silk",
];

export default function ThemeDropdown() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "synthwave");
  const [open, setOpen] = useState(false);

  // Update the HTML attribute and persist selection
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="dropdown dropdown-end">
      <button tabIndex={0} className="btn btn-sm btn-ghost flex items-center gap-2" onClick={() => setOpen((o) => !o)} aria-label="Pick theme">
        Theme
        <ChevronDown className="w-4 h-4" />
      </button>
      {open && (
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box md:w-96 p-2 shadow z-50
                    max-h-64 overflow-y-auto"
        >
          {themes.map((t) => (
            <li key={t}>
              <button
                className={`btn btn-sm btn-ghost justify-start w-full text-left ${t === theme ? "bg-primary text-primary-content" : ""}`}
                onClick={() => {
                  setTheme(t);
                  setOpen(false);
                }}
                aria-pressed={t === theme}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
                {t === theme && <span className="ml-2 text-xs">✓</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
