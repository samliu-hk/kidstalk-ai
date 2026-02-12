import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// 📚 題庫中心 (每級100題框架)
const questionBank = {
  P1: [
    { en: "Hello, teacher.", zh: "老師，你好。" },
    { en: "I am a student.", zh: "我是一個學生。" },
    { en: "This is a red apple.", zh: "這是一個紅色的蘋果。" },
    // ... 在此複製增加至 100 題
  ],
  P2: [
    { en: "I like to eat ice cream.", zh: "我喜歡吃雪糕。" },
    { en: "He is my best friend.", zh: "他是我最好的朋友。" },
    // ... 在此複製增加至 100 題
  ],
  P3: [
    { en: "The elephant is bigger than the cat.", zh: "大象比貓大。" },
    { en: "I brush my teeth every morning.", zh: "我每天早上刷牙。" },
    // ... 在此複製增加至 100 題
  ],
  P4: [
    { en: "We are going to the park today.", zh: "我們今天要去公園。" },
    { en: "Have a nice day!", zh: "祝你有愉快的一天！" },
    // ... 在此複製增加至 100 題
  ],
  P5: [
    { en: "If it rains, I will stay at home.", zh: "如果下雨，我會留在家裡。" },
    { en: "Environment protection is important.", zh: "環境保護非常重要。" },
    // ... 在此複製增加至 100 題
  ],
  P6: [
    { en: "I have lived in Hong Kong for ten years.", zh: "我在香港住了十年。" },
    { en: "Technology changes our lives a lot.", zh: "科技大大改變了我們的生活。" },
    // ... 在此複製增加至 100 題
  ]
};

function App() {
  const [level, setLevel] = useState(null);
  const [currentQ, setCurrentQ] = useState(null);
  const [score, setScore] = useState(null);
  const [streak, setStreak] = useState(0);
  const [rocket, setRocket] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState("");

  // 🔊 聽示範音 (TTS)
  const playDemo = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.8; // 稍微慢一點點讓小朋友聽清楚
    window.speechSynthesis.speak(utterance);
  };

  // 🎤 語音評分 (Speech Recognition)
  const handleMic = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("瀏覽器不支援語音功能，請用 Chrome 或 Safari");

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    setIsListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      const spoken = event.results[0][0].transcript.toLowerCase().replace(/[.,!]/g, "");
      const target = currentQ.en.toLowerCase().replace(/[.,!]/g, "");
      
      // 計算相識度 (簡單單詞匹配)
      const spokenWords = spoken.split(" ");
      const targetWords = target.split(" ");
      let match = 0;
      targetWords.forEach(w => { if (spokenWords.includes(w)) match++; });
      
      const finalScore = Math.round((match / targetWords.length) * 100);
      setScore(finalScore);
      setIsListening(false);

      if (finalScore >= 80) {
        setFeedback("✅ Excellent! 發音好準！");
        const newStreak = streak + 1;
        setStreak(newStreak);
        if (newStreak > 0 && newStreak % 10 === 0) {
          setRocket(true);
          setTimeout(() => setRocket(false), 3000);
        }
      } else {
        setStreak(0);
        setFeedback(`❌ 再試一次！你讀到: "${spoken}"`);
      }
    };

    recognition.onerror = () => setIsListening(false);
  };

  const nextQuestion = (lvl) => {
    const questions = questionBank[lvl];
    const random = questions[Math.floor(Math.random() * questions.length)];
    setCurrentQ(random);
    setScore(null);
    setFeedback("");
  };

  return (
    <div className="app">
      {rocket && <div className="rocket-overlay">🚀 火箭升空！</div>}
      
      <h1 className="title">🦁 AI 英文口語老師</h1>

      {!level ? (
        <div className="menu">
          <h3>📚 選擇年級 (香港課程)</h3>
          <div className="lvl-grid">
            {Object.keys(questionBank).map(l => (
              <button key={l} onClick={() => { setLevel(l); nextQuestion(l); }} className="lvl-btn">{l}</button>
            ))}
          </div>
        </div>
      ) : (
        <div className="game-box">
          <div className="header">
            <span className="badge">級別: {level}</span>
            <span className="badge">連勝: {streak} 🔥</span>
          </div>

          <div className="q-card">
            <h2>{currentQ?.en}</h2>
            <p className="zh-text">({currentQ?.zh})</p>
            
            {score !== null && (
              <div className="score-display">
                <div className="score-circle" style={{borderColor: score >= 80 ? '#4ECDC4' : '#FF6B6B'}}>
                  {score}%
                </div>
                <p className="feedback">{feedback}</p>
              </div>
            )}
          </div>

          <div className="control-panel">
            <button className={`action-btn mic ${isListening ? 'active' : ''}`} onClick={handleMic}>
              {isListening ? "👂 正在聽..." : "🎤 撳住講"}
            </button>
            <button className="action-btn demo" onClick={() => playDemo(currentQ.en)}>
              🔊 聽示範
            </button>
          </div>

          <div className="nav-btns">
            <button onClick={() => nextQuestion(level)}>下一題</button>
            <button onClick={() => setLevel(null)} className="back-btn">返回選單</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
