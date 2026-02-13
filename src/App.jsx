import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const questionBank = {
  P1: [
    { en: "The weather is hot.", zh: "天氣很熱。" },
    { en: "I love my family.", zh: "我愛我的家人。" },
    { en: "This is an apple.", zh: "這是一個蘋果。" },
    // 你可以在此繼續貼上 P1 的 100 題
  ],
  P2: [
    { en: "He is a tall teacher.", zh: "他是一位高大的老師。" },
    // 你可以在此繼續貼上 P2 的 100 題
  ],
  P3: [], P4: [], P5: [], P6: []
};

function App() {
  const [level, setLevel] = useState(null);
  const [currentQ, setCurrentQ] = useState(null);
  const [score, setScore] = useState(null);
  const [streak, setStreak] = useState(0);
  const [rocket, setRocket] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState("");
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.lang = 'en-US';
      rec.continuous = false;
      rec.onresult = (event) => {
        const spoken = event.results[0][0].transcript.toLowerCase().replace(/[.,!?]/g, "");
        const target = currentQ.en.toLowerCase().replace(/[.,!?]/g, "");
        
        const spokenWords = spoken.split(" ");
        const targetWords = target.split(" ");
        let match = 0;
        targetWords.forEach(w => { if (spokenWords.includes(w)) match++; });
        const finalScore = Math.round((match / targetWords.length) * 100);
        
        setScore(finalScore);
        if (finalScore >= 80) {
          setFeedback("✅ 好準呀！繼續加油！");
          setStreak(s => {
            const newS = s + 1;
            if (newS % 10 === 0) setRocket(true);
            return newS;
          });
        } else {
          setStreak(0);
          setFeedback("❌ 差少少，再試吓！");
        }
      };
      rec.onend = () => setIsListening(false);
      recognitionRef.current = rec;
    }
  }, [currentQ]);

  const startQuiz = (lvl) => {
    setLevel(lvl);
    const questions = questionBank[lvl];
    if (questions.length === 0) return alert("呢個等級未有題目住！");
    setCurrentQ(questions[Math.floor(Math.random() * questions.length)]);
    setScore(null);
    setFeedback("");
    setRocket(false);
  };

  const handleMic = () => {
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setIsListening(true);
      setScore(null);
      setFeedback("聽緊你講嘢...");
      recognitionRef.current.start();
    }
  };

  const playDemo = () => {
    const msg = new SpeechSynthesisUtterance(currentQ.en);
    msg.lang = 'en-US';
    window.speechSynthesis.speak(msg);
  };

  return (
    <div className="app-container">
      {rocket && <div className="rocket-fly">🚀</div>}
      <h1 className="main-title">🦁 Kidstalk AI 口語特訓</h1>

      {!level ? (
        <div className="menu-screen">
          <h3>請選擇等級：</h3>
          <div className="lvl-grid">
            {Object.keys(questionBank).map(l => (
              <button key={l} onClick={() => startQuiz(l)} className="lvl-item">{l}</button>
            ))}
          </div>
        </div>
      ) : (
        <div className="quiz-screen">
          <p className="status-bar">等級: {level} | 連勝: {streak} 🔥</p>
          
          <div className="main-card">
            <h2 className="display-en">{currentQ?.en}</h2>
            <p className="display-zh">({currentQ?.zh})</p>
            
            {score !== null && (
              <div className="result-area">
                <div className="big-score">{score}%</div>
                <p className="feedback-msg">{feedback}</p>
              </div>
            )}
          </div>

          <div className="control-panel">
          <button className={`mic-btn ${isListening ? 'active' : ''}`} onClick={handleMic}>
            {isListening ? "👂 聽緊你講..." : "🎤 按一下讀一次"}
            </button>
            
            <button className="long-btn demo-btn" onClick={playDemo}>
              🔊 聽示範讀音
            </button>

            <div className="bottom-nav">
              <button className="small-btn" onClick={() => startQuiz(level)}>下一題</button>
              <button className="small-btn" onClick={() => setLevel(null)}>返回主頁</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
