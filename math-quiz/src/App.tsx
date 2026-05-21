import { useState } from "react";
import { ALL_Q, UI, type Language, type Question } from "./data";
import "./index.css";

type Screen = "setup" | "quiz" | "result";

export default function App() {
  const [lang, setLang] = useState<Language>("uz");
  const [screen, setScreen] = useState<Screen>("setup");

  // Setup filters
  const [topic, setTopic] = useState("all");
  const [diff, setDiff] = useState("all");
  const [count, setCount] = useState<string>("23");

  // Quiz states
  const [quizQs, setQuizQs] = useState<Question[]>([]);
  const [curIdx, setCurIdx] = useState(0);
  const [userAns, setUserAns] = useState<Record<number, number>>({});
  const [showExp, setShowExp] = useState(false);

  const u = UI[lang];

  // Logic to filter and start
  const startQuiz = () => {
    let qs = ALL_Q.filter((q) => {
      if (topic !== "all" && q.topic !== topic) return false;
      if (diff !== "all" && q.diff !== diff) return false;
      return true;
    });
    qs = qs.sort(() => Math.random() - 0.5);
    if (count !== "all") {
      qs = qs.slice(0, parseInt(count, 10));
    }

    if (qs.length === 0) {
      alert("No questions match!");
      return;
    }

    setQuizQs(qs);
    setCurIdx(0);
    setUserAns({});
    setShowExp(false);
    setScreen("quiz");
  };

  const answeredCount = Object.keys(userAns).length;
  const scoreCount = Object.entries(userAns).filter(([id, ans]) => {
    const q = quizQs.find((q) => q.id.toString() === id);
    return q && q.ans === ans;
  }).length;

  const handleSelectAns = (optIdx: number) => {
    const q = quizQs[curIdx];
    if (userAns[q.id] !== undefined) return;
    setUserAns((prev) => ({ ...prev, [q.id]: optIdx }));
    setShowExp(true);
  };

  const handleShowAnswer = () => {
    const q = quizQs[curIdx];
    if (userAns[q.id] === undefined) {
      setUserAns((prev) => ({ ...prev, [q.id]: -1 }));
    }
    setShowExp(true);
  };

  const goNext = () => {
    if (curIdx < quizQs.length - 1) {
      setCurIdx((prev) => prev + 1);
      setShowExp(userAns[quizQs[curIdx + 1]?.id] !== undefined);
    } else {
      setScreen("result");
    }
  };

  const goPrev = () => {
    if (curIdx > 0) {
      setCurIdx((prev) => prev - 1);
      setShowExp(userAns[quizQs[curIdx - 1]?.id] !== undefined);
    }
  };

  return (
    <div className="wrap">
      <div className="header">
        <h2>{u.title}</h2>
        <p>{u.sub}</p>
      </div>

      <div className="controls">
        <div className="lang-btns">
          {(["uz", "en", "ru"] as Language[]).map((l) => (
            <button
              key={l}
              className={`lang-btn ${lang === l ? "active" : ""}`}
              onClick={() => setLang(l)}
            >
              {l === "uz" ? "O'zbek" : l === "en" ? "English" : "Русский"}
            </button>
          ))}
        </div>

        <select value={topic} onChange={(e) => setTopic(e.target.value)}>
          <option value="all">
            {u.topicsLbl === "Mavzu"
              ? "Barcha mavzular"
              : u.topicsLbl === "Topics"
                ? "All topics"
                : "Все темы"}
          </option>
          {Object.entries(u.topics).map(([key, val]) => (
            <option key={key} value={key}>
              {val as string}
            </option>
          ))}
        </select>

        <select value={diff} onChange={(e) => setDiff(e.target.value)}>
          <option value="all">
            {lang === "uz"
              ? "Barcha daraja"
              : lang === "en"
                ? "All levels"
                : "Все уровни"}
          </option>
          {Object.entries(u.diff).map(([key, val]) => (
            <option key={key} value={key}>
              {val as string}
            </option>
          ))}
        </select>

        <select value={count} onChange={(e) => setCount(e.target.value)}>
          <option value="23">
            {lang === "uz"
              ? "23 savol (imtihon)"
              : lang === "en"
                ? "23 questions (exam)"
                : "23 вопроса"}
          </option>
          <option value="10">10 {lang === "en" ? "questions" : "savol"}</option>
          <option value="20">20 {lang === "en" ? "questions" : "savol"}</option>
          <option value="50">50 {lang === "en" ? "questions" : "savol"}</option>
          <option value="all">
            {lang === "uz" ? "Hammasi" : lang === "en" ? "All" : "Все"}
          </option>
        </select>

        <button className="btn-primary" onClick={startQuiz}>
          {u.start}
        </button>
      </div>

      <div className="stats">
        <div className="stat">
          <div className="stat-n">{ALL_Q.length}</div>
          <div className="stat-l">{u.totalLbl}</div>
        </div>
        <div className="stat">
          <div className="stat-n">{Object.keys(u.topics).length}</div>
          <div className="stat-l">{u.topicsLbl}</div>
        </div>
        <div className="stat">
          <div className="stat-n">{answeredCount}</div>
          <div className="stat-l">{u.answeredLbl}</div>
        </div>
        <div className="stat">
          <div className="stat-n">
            {answeredCount > 0
              ? Math.round((scoreCount / answeredCount) * 100) + "%"
              : "—"}
          </div>
          <div className="stat-l">{u.scoreLbl}</div>
        </div>
      </div>

      {screen === "setup" && (
        <div
          style={{
            fontSize: "15px",
            color: "var(--color-text-secondary)",
            textAlign: "center",
            padding: "3rem 0",
          }}
        >
          {u.hint}
        </div>
      )}

      {screen === "quiz" && quizQs.length > 0 && (
        <div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${Math.round(((curIdx + 1) / quizQs.length) * 100)}%`,
              }}
            ></div>
          </div>
          <div className="q-num">
            {curIdx + 1} {u.of} {quizQs.length}
          </div>

          <div className="q-card">
            <div className="q-meta">
              <span className="badge badge-t">
                {u.topics[quizQs[curIdx].topic as keyof typeof u.topics]}
              </span>
              <span className={`badge badge-${quizQs[curIdx].diff.charAt(0)}`}>
                {u.diff[quizQs[curIdx].diff as keyof typeof u.diff]}
              </span>
            </div>
            <div className="q-text">{quizQs[curIdx][lang].q}</div>

            <div className="options">
              {quizQs[curIdx][lang].opts.map((opt, i) => {
                const q = quizQs[curIdx];
                const ua = userAns[q.id];
                const revealed = ua !== undefined;
                let optClass = "opt";
                if (revealed) {
                  if (i === q.ans) optClass += " correct";
                  else if (i === ua && ua !== q.ans) optClass += " wrong";
                }

                return (
                  <div
                    key={i}
                    className={optClass}
                    onClick={() => !revealed && handleSelectAns(i)}
                  >
                    <span className="opt-key">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                  </div>
                );
              })}
            </div>

            {showExp && (
              <div className="explanation" style={{ display: "block" }}>
                <strong>{u.exp}</strong> {quizQs[curIdx][lang].exp}
              </div>
            )}
          </div>

          <div className="nav">
            <button onClick={goPrev} disabled={curIdx === 0}>
              {u.prev}
            </button>
            {!showExp && <button onClick={handleShowAnswer}>{u.show}</button>}
            <button onClick={goNext}>{u.next}</button>
          </div>
        </div>
      )}

      {screen === "result" && (
        <div className="result-screen">
          <div className="result-score">
            {answeredCount > 0
              ? Math.round((scoreCount / answeredCount) * 100)
              : 0}
            %
          </div>
          <div className="result-msg">
            {scoreCount} / {answeredCount}.{" "}
            {
              u.msgs[
                Math.min(
                  Math.floor(
                    (answeredCount > 0 ? scoreCount / answeredCount : 0) * 5,
                  ),
                  4,
                )
              ]
            }
          </div>
          <button className="btn-primary" onClick={startQuiz}>
            {u.again}
          </button>
          <button
            onClick={() => setScreen("setup")}
            style={{ marginLeft: "12px" }}
          >
            {u.settings}
          </button>
        </div>
      )}
    </div>
  );
}
