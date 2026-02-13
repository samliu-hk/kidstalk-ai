import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// 題庫 (請自行貼入你之前的 P1-P6 完整題庫)
const questionBank = {
  P1: [
    { en: "The weather is hot.", zh: "天氣很熱。" },
    { en: "I love my family.", zh: "我愛我的家人。" },
    { en: "This is an apple.", zh: "這是一個蘋果。" }
  ],
  P2: [{ en: "He is a tall teacher.", zh: "他是一位高大的老師。" }],
  P3: [], P4: [], P5: [], P6: []
};

function App() {
  const [level, setLevel] = useState(null);
  const [currentQ, setCurrentQ] = useState(null);
  const [score, setScore] = useState(null);
  const [streak, setStreak] = useState(0);
  const [rocket, setRocket] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState(""); // 儲存真實讀出的英文
  const [feedback, setFeedback] = useState("");
  const recognitionRef = useRef(null);

  // 初始化語音辨識
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.lang = 'en-US';
      rec.continuous = false;
      
      rec.onresult = (event) => {
        const originalSpoken = event.results[0][0].transcript; // 原始聽到的內容
        const spokenClean = originalSpoken.toLowerCase().replace(/[.,!?]/g, "");
        const targetClean = currentQ.en.toLowerCase().replace(/[.,!?]/g, "");
        
        setSpokenText(originalSpoken); // ⭐ 更新顯示：將聽到的真實英文存起來

        const spokenWords = spokenClean.split(" ");
        const targetWords = targetClean.split(" ");
        let match = 0;
        targetWords.forEach(w => { if (spokenWords.includes(w)) match++; });
        const finalScore = Math.round((match / targetWords.length) * 100);
        
        setScore(finalScore);
        if (finalScore >= 80) {
          setFeedback("✅ 好準呀！繼續加油！");
          setStreak(s => {
            const newS = s + 1;
            // ⭐ 每 10 題彈一支火箭
            if (newS > 0 && newS % 10 === 0) {
              setRocket(true);
              setTimeout(() => setRocket(false), 3000); // 3秒後移除火箭
            }
            return newS;
          });
        } else {
          setStreak(0);
          setFeedback("❌ 差少少，再試吓！");
        }
        
        // 強制熄咪
        rec.stop();
        setIsListening(false);
      };

      rec.onend = () => setIsListening(false);
      recognitionRef.current = rec;
    }
  }, [currentQ]);

  // 隨機抽題邏輯
  const startQuiz = (lvl) => {
    const questions = questionBank[lvl];
    if (!questions || questions.length === 0) return alert("呢個等級未有題目住！");
    
    let nextQ;
    // 確保唔會連續抽到同一題
    do {
      nextQ = questions[Math.floor(Math.random() * questions.length)];
    } while (questions.length > 1 && currentQ && nextQ.en === currentQ.en);

    setLevel(lvl);
    setCurrentQ(nextQ);
    setScore(null);
    setSpokenText(""); // 清空上次聽到的話
    setFeedback("");
  };

  const playDemo = () => {
    if (!currentQ) return;
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(currentQ.en);
    const voices = window.speechSynthesis.getVoices();
    const premiumVoice = voices.find(v => (v.lang.includes('en-') && (v.name.includes('Google') || v.name.includes('Samantha'))));
    if (premiumVoice) msg.voice = premiumVoice;
    msg.lang = 'en-US';
    msg.rate = 0.85; 
    window.speechSynthesis.speak(msg);
  };

  const handleMic = () => {
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setIsListening(true);
      setScore(null);
      setSpokenText(""); 
      setFeedback("👂 聽緊你講嘢...");
      recognitionRef.current.start();
    }
  };

  return (
    <div className="app-container">
      {/* 火箭動畫元件 */}
      {rocket && <div className="rocket-animation">🚀 10連勝達成！</div>}
      
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
                {/* ⭐ 呢度就係你圈住紅色嘅部分：改為顯示 AI 聽到啲乜 */}
                <div className="comparison-box">
                  <p className="heard-label">AI 聽到：</p>
                  <p className="heard-text">"{spokenText || "......"}"</p>
                  <p className="feedback-hint">{feedback}</p>
                </div>
              </div>
            )}
          </div>

          <div className="control-panel">
            <button className={`long-btn mic-btn ${isListening ? 'active' : ''}`} onClick={handleMic}>
              {isListening ? "🛑 聽緊你講..." : "🎤 按一下讀一次"}
            </button>
            <button className="long-btn demo-btn" onClick={playDemo}>🔊 聽示範讀音</button>
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
