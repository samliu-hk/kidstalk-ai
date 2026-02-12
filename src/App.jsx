import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// 📚 600題庫框架 (P1-P6 各100題範例格式)
const questionBank = [
  { level: "P1", en: "Good morning, teacher.", zh: "老師，早晨。" },
  { level: "P1", en: "This is a red apple.", zh: "這是一個紅色的蘋果。" },
  { level: "P2", en: "I go to school by bus.", zh: "我搭巴士去返學。" },
  { level: "P2", en: "My sister likes to sing.", zh: "我妹妹喜歡唱歌。" },
  { level: "P3", en: "The elephant is bigger than the cat.", zh: "大象比貓大。" },
  { level: "P4", en: "I watched a movie yesterday.", zh: "我昨天看了一套電影。" },
  { level: "P5", en: "If it rains, I will stay at home.", zh: "如果落雨，我會留喺屋企。" },
  { level: "P6", en: "We should protect the environment.", zh: "我們應該保護環境。" },
  // ... 請按此格式增加題目至 600 題
];

function App() {
  const [lvl, setLvl] = useState(null);
  const [currentQ, setCurrentQ] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [score, setScore] = useState(null);
  const [streak, setStreak] = useState(0);
  const [rocket, setRocket] = useState(false);
  const [advice, setAdvice] = useState("");

  // 🎤 Web Speech API 設定
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.continuous = false;

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase().replace(/[.,!]/g, "");
        const target = currentQ.en.toLowerCase().replace(/[.,!]/g, "");
        calculateScore(transcript, target);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => setIsListening(false);
    }
  }, [currentQ]);

  // 📊 簡易 AI 發音評分演算法
  const calculateScore = (spoken, target) => {
    const spokenWords = spoken.split(" ");
    const targetWords = target.split(" ");
    let matches = 0;
    
    targetWords.forEach(word => {
      if (spokenWords.includes(word)) matches++;
    });

    const finalScore = Math.round((matches / targetWords.length) * 100);
    setScore(finalScore);

    if (finalScore >= 80) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setAdvice("太棒了！發音非常準確！");
      if (newStreak > 0 && newStreak % 10 === 0) launchRocket();
    } else {
      setStreak(0);
      setAdvice(`試下讀準啲：${targetWords.filter(w => !spokenWords.includes(w)).join(", ")}`);
    }
  };

  const launchRocket = () => {
    setRocket(true);
    setTimeout(() => setRocket(false), 2500);
  };

  const startQuiz = (selectedLvl) => {
    setLvl(selectedLvl);
    const filtered = questionBank.filter(q => q.level === selectedLvl);
    setCurrentQ(filtered[Math.floor(Math.random() * filtered.length)]);
    setScore(null);
    setAdvice("");
  };

  return (
    <div className="container">
      <h1 style={{color: '#FF6B6B'}}>Kidstalk AI 老師 🚀</h1>
      
      {!lvl ? (
        <div className="menu">
          <h3>揀個年級開始啦：</h3>
          {['P1', 'P2', 'P3', 'P4', 'P5', 'P6'].map(p => (
            <button key={p} className="btn-lvl" onClick={() => startQuiz(p)}>{p}</button>
          ))}
        </div>
      ) : (
        <div className="quiz">
          <div className="q-card">
            <p style={{color: '#888'}}>{lvl} 練習</p>
            <h2 style={{fontSize: '1.8rem'}}>{currentQ?.en}</h2>
            <p style={{fontSize: '1.2rem', color: '#4ECDC4'}}>{currentQ?.zh}</p>
            
            {score !== null && (
              <div>
                <div className="score-badge">{score}分</div>
                <p className="suggestion">{advice}</p>
              </div>
            )}
          </div>

          <p>撳住個咪，讀出英文句子：</p>
          <button 
            className={`mic-btn ${isListening ? 'active' : ''}`}
            onMouseDown={() => { setIsListening(true); recognitionRef.current.start(); }}
            onMouseUp={() => recognitionRef.current.stop()}
            onTouchStart={() => { setIsListening(true); recognitionRef.current.start(); }}
            onTouchEnd={() => recognitionRef.current.stop()}
          >
            {isListening ? '👂' : '🎤'}
          </button>

          <div style={{marginTop: '20px'}}>
            <button className="btn-lvl" onClick={() => startQuiz(lvl)} style={{background: '#aaa'}}>下一題</button>
            <button className="btn-lvl" onClick={() => setLvl(null)} style={{background: '#666'}}>返回</button>
          </div>
          <p>🔥 連勝：{streak} (10 題發射火箭！)</p>
        </div>
      )}

      <div className={`rocket-anim ${rocket ? 'rocket-fly' : ''}`}>🚀</div>
    </div>
  );
}

export default App;
