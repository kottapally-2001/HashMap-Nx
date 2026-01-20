import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [entries, setEntries] = useState([]);
  const [selected, setSelected] = useState(null);

  const loadEntries = async () => {
    const res = await fetch("http://localhost:3001/entries");
    const data = await res.json();
    setEntries(data);
  };

  useEffect(() => {
    loadEntries();
  }, []);

  const rawValue = entries.find(([k]) => k === selected)?.[1] || "";
  const colors = rawValue ? rawValue.split(",").map((c) => c.trim()) : [];

  // Expanded ColorMap for non-standard color names
  const ColorMap = {
    golden: "#d4af37",
    silver: "#c0c0c0",
    darkgreen: "#0b3d02",
    rose: "#ff66cc",
    pearl: "#e2dfd2",
    neon: "#39ff14",
  };

  const resolveColor = (c) => ColorMap[c] || c;

  return (
    <div className="container">
      <h2 className="title">HashMap (Terminal + Color View)</h2>

      <div className="layout">
        {/* LEFT PANEL (KEYS) */}
        <div className="panel">
          <div className="panel-header">Keys</div>
          <div className="list">
            {entries.map(([key]) => (
              <div
                key={key}
                className={`item ${selected === key ? "active" : ""}`}
                onClick={() => setSelected(key)}
              >
                {key}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL (OUTPUT) */}
        <div className="output">
          {selected ? (
            <>
              <div className="output-line">
                {`> Get("${selected}") => "${rawValue}"`}
              </div>

              {/* SWATCHES */}
              <div className="color-list">
                {colors.map((c, i) => (
                  <div
                    key={i}
                    className="color-swatch"
                    style={{
                      background: resolveColor(c),
                      border: c === "white" ? "1px solid #777" : "1px solid #333",
                    }}
                  ></div>
                ))}
              </div>

              {/* MULTI LABEL BOXES */}
              <div className="preview-multi">
                {colors.map((c, i) => (
                  <div
                    key={i}
                    className="preview-box"
                    style={{
                      background: resolveColor(c),
                      color: ["white", "yellow", "silver", "golden"].includes(c)
                        ? "#000"
                        : "#fff",
                      border: c === "white" ? "1px solid #999" : "1px solid #333",
                    }}
                  >
                    {c}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="terminal-hint">Select a key...</div>
          )}
        </div>
      </div>
    </div>
  );
}
