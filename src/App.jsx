import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// 題庫維持原樣 (此處省略部分以節省空間，請沿用你之前的題目)
const questionBank = {
  P1: [{ en: "The weather is hot.", zh: "天氣很熱。" }, { en: "I love my family.", zh: "我愛我的家人。" }],
  P2: [], P3: [], P4: [], P5: [], P6: []
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

  // 初始化語音辨識 (跟返上次)
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

  // 🔥 改良版發音功能
  const playDemo = () => {
    if (!currentQ) return;
    
    // 停止所有正在播放嘅聲音，廢事重疊
    window.speechSynthesis.cancel();

    const msg = new SpeechSynthesisUtterance(currentQ.en);
    
    // 1. 搵手機入面最好聽嘅英文聲
    const voices = window.speechSynthesis.getVoices();
    // 優先揀 Google 嘅聲或者 Apple 嘅 Samantha 聲，通常比較清
    const premiumVoice = voices.find(v => (v.lang.includes('en-') && v.name.includes('Google'))) || 
                        voices.find(v => (v.lang.includes('en-') && v.name.includes('Samantha'))) ||
                        voices.find(v => v.lang.startsWith('en'));
    
    if (premiumVoice) msg.voice = premiumVoice;

    msg.lang = 'en-US';
    msg.rate = 0.85;  // 稍微減慢語速，由 1.0 減至 0.85，聽得更清楚
    msg.pitch = 1.0; // 正常音調
    msg.volume = 1.0; // 最大音量

    window.speechSynthesis.speak(msg);
  };

  // 確保在手機瀏覽器上語音列表已加載
  useEffect(() => {
    window.speechSynthesis.getVoices();
  }, []);

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
            <button className={`long-btn mic-btn ${isListening ? 'active' : ''}`} onClick={handleMic}>
              🎤 {isListening ? "停止錄音" : "按一下讀一次"}
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
