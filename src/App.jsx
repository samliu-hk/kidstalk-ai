import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const questionBank = {
  P1: [
    { en: "The weather is hot.", zh: "天氣很熱。" },
    { en: "I love my family.", zh: "我愛我的家人。" },
    { en: "This is an apple.", zh: "這是一個蘋果。" },
    { en: "Stand up, please.", zh: "請站起來。" },
    { en: "I like red apples.", zh: "我喜歡紅蘋果。" }
  ],
  P2: [
    { en: "He is a tall teacher.", zh: "他是一位高大的老師。" },
    { en: "I go to school by bus.", zh: "我搭巴士返學。" }
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

  // 初始化語音辨識
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.lang = 'en-US';
      rec.continuous = false; // 單次模式
      rec.interimResults = false;

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

        // ⭐【關鍵改動】：一攞到結果，立刻強制停止辨識，熄咗個嘜頭佢！
        rec.stop();
        setIsListening(false); 
      };

      // 確保錄音結束後 UI 狀態會更新
      rec.onend = () => {
        setIsListening(false);
      };

      rec.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }
  }, [currentQ]);

  // ⭐【語音示範】：調慢語速，聽得更清
  const playDemo = () => {
    if (!currentQ) return;
    window.speechSynthesis.cancel(); // 先清走之前嘅聲
    const msg = new SpeechSynthesisUtterance(currentQ.en);
    
    // 搵返最清嘅聲 (Samantha 或者 Google 聲)
    const voices = window.speechSynthesis.getVoices();
    const cleanVoice = voices.find(v => v.name.includes("Samantha") || v.name.includes("Google")) || voices[0];
    
    msg.voice = cleanVoice;
    msg.lang = 'en-US';
    msg.rate = 0.8; // 調慢語速到 0.8 (原本係 1.0)
    msg.volume = 1.0;
    window.speechSynthesis.speak(msg);
  };

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
      setIsListening(false);
    } else {
      setIsListening(true);
      setScore(null);
      setFeedback("👂 聽緊你講嘢...");
      recognitionRef.current.start();
    }
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
            {/* 嘜頭按鈕會根據 isListening 狀態自動變色/變字 */}
            <button className={`long-btn mic-btn ${isListening ? 'active' : ''}`} onClick={handleMic}>
              {isListening ? "🛑 聽緊你講..." : "🎤 按一下讀一次"}
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
