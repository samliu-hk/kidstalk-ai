import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// 📚 題庫：每個年級 100 題 (我先放範例，你可以按格式填滿佢)
const questionBank = {
  P1: [
    { en: "Hello, teacher!", zh: "老師，早晨！" },
    { en: "How are you?", zh: "你好嗎？" },
    { en: "I like red apples.", zh: "我喜歡紅蘋果。" },
    { en: "This is a cat.", zh: "這是一隻貓。" },
    { en: "Stand up, please.", zh: "請站起來。" },
    // ... 這裡可以加到 100 題
  ],
  P2: [
    { en: "I go to school by bus.", zh: "我乘巴士上學。" },
    { en: "He is my father.", zh: "他是我的爸爸。" },
    { en: "What time is it?", zh: "現在幾點？" },
    { en: "The weather is hot.", zh: "天氣很熱。" },
    // ... 這裡可以加到 100 題
  ],
  P3: [
    { en: "There is a park near my home.", zh: "我家附近有一個公園。" },
    { en: "I want to be a doctor.", zh: "我想成為醫生。" },
    { en: "Swimming is fun.", zh: "游泳很有趣。" },
    // ... 這裡可以加到 100 題
  ],
  P4: [
    { en: "I watched a movie yesterday.", zh: "我昨天看了一場電影。" },
    { en: "How much is this cake?", zh: "這個蛋糕多少錢？" },
    { en: "She is taller than me.", zh: "她比我高。" },
    // ... 這裡可以加到 100 題
  ],
  P5: [
    { en: "We should protect the environment.", zh: "我們應該保護環境。" },
    { en: "I have lived in Hong Kong for ten years.", zh: "我在香港住了十年。" },
    { en: "If it rains, I will stay at home.", zh: "如果下雨，我會留在家。" },
    // ... 這裡可以加到 100 題
  ],
  P6: [
    { en: "Technology changes our daily life.", zh: "科技改變我們的日常生活。" },
    { en: "I am looking forward to the holidays.", zh: "我期待假期的到來。" },
    { en: "It is necessary to study hard.", zh: "努力學習是必要的。" },
    // ... 這裡可以加到 100 題
  ]
};

function App() {
  const [lvl, setLvl] = useState(null);
  const [currentQ, setCurrentQ] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [score, setScore] = useState(null);
  const [streak, setStreak] = useState(0);
  const [rocket, setRocket] = useState(false);
  const [feedback, setFeedback] = useState("");

  const recognitionRef = useRef(null);

  // 🔊 聽示範音功能 (TTS)
  const playDemo = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9; // 稍微慢一點讓小朋友聽清楚
    synth.speak(utterance);
  };

  // 🎤 初始化語音辨識
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.continuous = false; // 關鍵：單次辨識
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event) => {
        const spoken = event.results[0][0].transcript.toLowerCase().replace(/[.,!]/g, "");
        const target = currentQ.en.toLowerCase().replace(/[.,!]/g, "");
        evaluate(spoken, target);
        stopMic(); // 🔴 收到結果即刻強制關麥
      };

      recognitionRef.current.onend = () => {
        setIsListening(false); // 🔴 自動更新 UI 狀態
      };

      recognitionRef.current.onerror = () => {
        stopMic();
        setFeedback("聽唔清，試下再大聲啲？");
      };
    }
  }, [currentQ]);

  const stopMic = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const evaluate = (spoken, target) => {
    const spokenWords = spoken.split(" ");
    const targetWords = target.split(" ");
    let matchCount = 0;
    targetWords.forEach(w => { if (spokenWords.includes(w)) matchCount++; });
    
    const finalScore = Math.round((matchCount / targetWords.length) * 100);
    setScore(finalScore);

    if (finalScore >= 80) {
      setFeedback("✅ 好準呀！繼續加油！");
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak % 10 === 0 && newStreak > 0) {
        setRocket(true);
        setTimeout(() => setRocket(false), 2500);
      }
    } else {
      setStreak(0);
      setFeedback("❌ 爭少少，再試一次！");
    }
  };

  const nextQuestion = (selectedLvl) => {
    setLvl(selectedLvl);
    const questions = questionBank[selectedLvl];
    const random = questions[Math.floor(Math.random() * questions.length)];
    setCurrentQ(random);
    setScore(null);
    setFeedback("");
  };

  return (
    <div className="app-container">
      {rocket && <div className="rocket-fly">🚀</div>}
      <h1 className="title">🦁 Kidstalk AI 口語特訓</h1>

      {!lvl ? (
        <div className="menu">
          <p>📚 選擇年級 (香港小學課程)</p>
          <div className="btn-grid">
            {['P1', 'P2', 'P3', 'P4', 'P5', 'P6'].map(p => (
              <button key={p} onClick={() => nextQuestion(p)} className="lvl-btn">{p}</button>
            ))}
          </div>
        </div>
      ) : (
        <div className="quiz-box">
          <div className="stats">
            等級: {lvl} | 連勝: {streak} 🔥
          </div>
          
          <div className="card">
            <h2 className="en-text">{currentQ?.en}</h2>
            <p className="zh-text">({currentQ?.zh})</p>
            
            {score !== null && (
              <div className="result-area">
                <div className="score-circle">{score}%</div>
                <p className="feedback-text">{feedback}</p>
              </div>
            )}
          </div>

          <div className="action-btns">
            <button 
              className={`mic-btn ${isListening ? 'listening' : ''}`}
              onClick={() => {
                if (!isListening) {
                  setIsListening(true);
                  recognitionRef.current.start();
                }
              }}
            >
              {isListening ? "👂 聽緊你講..." : "🎤 按一下讀一次"}
            </button>

            <button className="speak-btn" onClick={() => playDemo(currentQ?.en)}>
              🔊 聽示範音
            </button>
          </div>

          <div className="footer-nav">
            <button onClick={() => nextQuestion(lvl)}>下一題</button>
            <button onClick={() => setLvl(null)} className="back-btn">返回主頁</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
