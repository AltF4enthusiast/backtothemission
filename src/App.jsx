import { useEffect, useState } from "react";
import "./App.css";


const MISSION_CATEGORIES = [
  "Cybersecurity / Security+",
  "Remote career development",
  "QA / Resume",
  "Freelance side hustle",
  "RV upgrades",
  "3D printing",
  "Gutterborn game",
  "Health / personal tasks",
];

function getTodayKey() {
  const d = new Date();
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

function App() {
  const todayKey = getTodayKey();

  const [missionCategory, setMissionCategory] = useState("");
  const [missionText, setMissionText] = useState("");
  const [missionDone, setMissionDone] = useState(false);

  const [weeklyMissions, setWeeklyMissions] = useState({
    monday: "",
    wednesday: "",
    friday: "",
  });

  // Load saved data on first load
  useEffect(() => {
    const saved = localStorage.getItem("btmData");
    if (!saved) return;

    const data = JSON.parse(saved);

    const today = data.days?.[todayKey];
    if (today) {
      setMissionCategory(today.missionCategory || "");
      setMissionText(today.missionText || "");
      setMissionDone(!!today.missionDone);
    }

    if (data.weeklyMissions) {
      setWeeklyMissions(data.weeklyMissions);
    }
  }, [todayKey]);

  // Save whenever something changes
  useEffect(() => {
    const saved = localStorage.getItem("btmData");
    const data = saved ? JSON.parse(saved) : { days: {}, weeklyMissions: {} };

    data.days[todayKey] = {
      missionCategory,
      missionText,
      missionDone,
    };

    data.weeklyMissions = weeklyMissions;

    localStorage.setItem("btmData", JSON.stringify(data));
  }, [todayKey, missionCategory, missionText, missionDone, weeklyMissions]);

  const handleResetToday = () => {
    setMissionCategory("");
    setMissionText("");
    setMissionDone(false);
  };

  const handleWeeklyChange = (field, value) => {
    setWeeklyMissions((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="app">
      <header className="header">
        <h1>PLAN OF THE DAY — FRANK RODRIGUEZ</h1>
        <p className="subline">{today}</p>
        <p className="coach-line">Back to the mission, Frank.</p>
      </header>

      <section className="block">
        <h2>Coach Briefing</h2>
        <p>
          Good day, Frank. Today you get <strong>one mission</strong>. Keep it
          small, keep it focused, and complete it in{" "}
          <strong>25 minutes or less.</strong>
        </p>
        <button className="btn-secondary" onClick={handleResetToday}>
          Reset today&apos;s mission
        </button>
      </section>

      <section className="block">
        <h2>Plan of the Day</h2>
        <ul className="pod">
          <li>
            <span className="time">0900–0930</span>
            <span className="task">Wake &amp; Morning Reset</span>
          </li>
          <li>
            <span className="time">0930–1000</span>
            <span className="task">Scroll Window (guilt-free)</span>
          </li>
          <li>
            <span className="time">1000–1030</span>
            <span className="task">One Mission Block</span>
          </li>
          <li>
            <span className="time">1030–1130</span>
            <span className="task">Flex Time / Admin / Errands</span>
          </li>
          <li>
            <span className="time">1130–1300</span>
            <span className="task">Lunch &amp; Work Prep</span>
          </li>
          <li>
            <span className="time">1430–2330</span>
            <span className="task">Work Shift</span>
          </li>
          <li>
            <span className="time">2345–0005</span>
            <span className="task">Creative Sandbox (fun project time)</span>
          </li>
          <li>
            <span className="time">0005–0045</span>
            <span className="task">Wind Down (CPAP, low light)</span>
          </li>
          <li>
            <span className="time">0045–0100</span>
            <span className="task">Lights Out / Sleep</span>
          </li>
        </ul>
      </section>

      <section className="block">
        <h2>Today&apos;s One Mission</h2>

        <label className="field">
          <span>Category</span>
          <select
            value={missionCategory}
            onChange={(e) => setMissionCategory(e.target.value)}
          >
            <option value="">— pick one —</option>
            {MISSION_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>Mission details (25 minutes max)</span>
          <textarea
            placeholder="Example: Watch 1 Security+ video & take 5 bullet notes."
            value={missionText}
            onChange={(e) => setMissionText(e.target.value)}
          />
        </label>

        <label className="checkbox">
          <input
            type="checkbox"
            checked={missionDone}
            onChange={(e) => setMissionDone(e.target.checked)}
          />
          I completed my One Mission today.
        </label>

        <p className="coach-note">
          {missionDone
            ? "Mission accomplished. Momentum gained."
            : "Start small. Show up for 25 minutes. That’s it."}
        </p>
      </section>

      <section className="block">
        <h2>Weekly Mission Board</h2>
        <p className="hint">
          Three missions per week is enough: one on Monday, one on Wednesday,
          one on Friday.
        </p>

        <label className="field">
          <span>Monday Mission</span>
          <input
            type="text"
            placeholder="Example: Outline Security+ study plan."
            value={weeklyMissions.monday}
            onChange={(e) => handleWeeklyChange("monday", e.target.value)}
          />
        </label>

        <label className="field">
          <span>Wednesday Mission</span>
          <input
            type="text"
            placeholder="Example: Update resume bullet points."
            value={weeklyMissions.wednesday}
            onChange={(e) => handleWeeklyChange("wednesday", e.target.value)}
          />
        </label>

        <label className="field">
          <span>Friday Mission</span>
          <input
            type="text"
            placeholder="Example: 20 minutes on Gutterborn ideas."
            value={weeklyMissions.friday}
            onChange={(e) => handleWeeklyChange("friday", e.target.value)}
          />
        </label>
      </section>

      <footer className="footer">
        <p>Remember: progress &gt; perfection. Back to the mission.</p>
      </footer>
    </div>
  );
}

export default App;

