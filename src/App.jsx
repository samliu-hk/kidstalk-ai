import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// 📚 題庫：目前每級放咗 10 題做示範，你可以按格式加到每級 100 題
const questionBank = {
  P1: [
    { en: "Good morning", zh: "早晨" }, { en: "A red apple", zh: "一個紅蘋果" },
    { en: "My name is Peter", zh: "我叫 Peter" }, { en: "I like milk", zh: "我喜歡牛奶" },
    { en: "One two three", zh: "一二三" }, { en: "Big dog", zh: "大狗" },
    { en: "Blue sky", zh: "藍天" }, { en: "Touch your head", zh: "摸摸頭" },
    { en: "This is a cat", zh: "這是一隻貓" }, { en: "Open the book", zh: "開書" }
  ],
  P2: [
    { en: "He is my teacher", zh: "他是我的老師" }, { en: "I go to school", zh: "我返學" },
    { en: "She is tall", zh: "她很高" }, { en: "Wash your hands", zh: "洗手" },
    { en: "The bus is yellow", zh: "巴士是黃色的" }, { en: "I can jump", zh: "我會跳" },
    { en: "My eyes are small", zh: "我的眼睛很小" }, { en: "Let's play football", zh: "一齊踢波" },
    { en: "A happy family", zh: "一個快樂家庭" }, { en: "Eat some bread", zh: "食啲麵包" }
  ],
  P3: [
    { en: "There is a park", zh: "有一個公園" }, { en: "The cat is under the table", zh: "貓在桌下" },
    { en: "I wake up at seven", zh: "我七點醒" }, { en: "An orange is round", zh: "橙是圓的" },
    { en: "Whose pen is this?", zh: "這是誰的筆？" }, { en: "It is a sunny day", zh: "今天是晴天" },
    { en: "I like swimming", zh: "我喜歡游泳" }, { en: "The library is quiet", zh: "圖書館很安靜" },
    { en: "Twelve months in a year", zh: "一年有十二個月" }, { en: "Drink more water", zh: "飲多啲水" }
  ],
  P4: [
    { en: "I watched a movie yesterday", zh: "我昨天看了一場電影" }, { en: "How much is the cake?", zh: "蛋糕多少錢？" },
    { en: "She is smarter than me", zh: "她比我聰明" }, { en: "Don't run in the hall", zh: "不要在走廊跑" },
    { en: "We are best friends", zh: "我們是最好的朋友" }, { en: "The cake smells good", zh: "蛋糕很香" },
    { en: "Yesterday was Monday", zh: "昨天是星期一" }, { en: "A bottle of juice", zh: "一瓶果汁" },
    { en: "Turn left at the shop", zh: "在商店左轉" }, { en: "I have a headache", zh: "我頭痛" }
  ],
  P5: [
    { en: "I will visit Japan next year", zh: "我明年會去日本" }, { en: "He runs very quickly", zh: "他跑得很快" },
    { en: "If it rains, stay home", zh: "如果落雨，留喺屋企" }, { en: "Although it is hot, I am happy", zh: "雖然熱，但我好開心" },
    { en: "The environment is important", zh: "環境很重要" }, { en: "Take a deep breath", zh: "深呼吸" },
    { en: "Please turn off the light", zh: "請熄燈" }, { en: "Have you finished your homework?", zh: "做晒功課未？" },
    { en: "A healthy lifestyle", zh: "健康的模式" }, { en: "Respect your elders", zh: "尊重長輩" }
  ],
  P6: [
    { en: "The window was broken by the ball", zh: "窗被波打碎了" }, { en: "I look forward to seeing you", zh: "期待見到你" },
    { en: "She said that she was busy", zh: "她說她很忙" }, { en: "The man who lives next door", zh: "住隔壁的男人" },
    { en: "It is necessary to study hard", zh: "努力讀書是必須的" }, { en: "Responsibility is key", zh: "責任感是關鍵" },
    { en: "Technology changes our life", zh: "科技改變生活" }, { en: "Protect the ocean", zh: "保護海洋" },
    { en: "An interesting experience", zh: "一個有趣的經歷" }, { en: "Never give up", zh: "永不放棄" }
  ]
};

function App() {
  const [level, setLevel] = useState(null);
  const [currentQ, setCurrentQ] = useState(null);
  const [score, setScore] = useState(null);
  const [streak, setStreak] = useState(0);
  const [rocket, setRocket] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [msg, setMsg] = useState("");
  
  const recognitionRef = useRef(null);

  // 初始化語音引擎
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.lang = 'en-US';
      rec.continuous = false; // 強制單次模式，講完就停
      rec.interimResults = false;

      rec.onresult = (event) => {
        const spoken = event.results[0][0].transcript.toLowerCase().replace(/[.,!]/g, "");
        const target = currentQ.en.toLowerCase().replace(/[.,!]/g, "");
        processResult(spoken, target);
      };

      rec.onend = () => {
        setIsListening(false); // 錄音結束，UI 自動變回原狀
      };

      rec.onerror = () => {
        setIsListening(false);
        setMsg("聽唔到喎，再試吓？");
      };

      recognitionRef.current = rec;
    }
  }, [currentQ]);

  const processResult = (spoken, target) => {
    const spokenWords = spoken.split(" ");
    const targetWords = target.split(" ");
    let match = 0;
    targetWords.forEach(w => { if (spokenWords.includes(w)) match++; });
    
    const finalScore = Math.round((match / targetWords.length) * 100);
    setScore(finalScore);

    if (finalScore >= 80) {
      setMsg("✅ 嘩！好準呀！");
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak % 10 === 0) {
        setRocket(true);
        setTimeout(() => setRocket(false), 2500);
      }
    } else {
      setStreak(0);
      setMsg("❌ 差少少，再大聲啲試吓？");
    }
  };

  const startQuiz = (lvl) => {
    setLevel(lvl);
    const questions = questionBank[lvl];
    const random = questions[Math.floor(Math.random() * questions.length)];
    setCurrentQ(random);
    setScore(null);
    setMsg("");
  };

  const toggleMic = () => {
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setIsListening(true);
      setMsg("請講出英文句子...");
      recognitionRef.current.start();
    }
  };

  return (
    <div className="app">
      {rocket && <div className="rocket">🚀</div>}
      <h1 className="title">Kidstalk AI 語音教室</h1>

      {!level ? (
        <div className="menu">
          <h3>請選擇年級：</h3>
          <div className="lvl-grid">
            {Object.keys(questionBank).map(l => (
              <button key={l} onClick={() => startQuiz(l)} className="lvl-btn">{l}</button>
            ))}
          </div>
        </div>
      ) : (
        <div className="quiz">
          <div className="stats">
            <span>年級: {level}</span> | <span>連勝: {streak} 🔥</span>
          </div>

          <div className="card">
            <h2 className="en-text">{currentQ?.en}</h2>
            <p className="zh-text">({currentQ?.zh})</p>
            
            {score !== null && (
              <div className="score-box">
                <span className="score-num">{score}%</span>
                <p className="feedback">{msg}</p>
              </div>
            )}
          </div>

          <button 
            className={`mic-btn ${isListening ? 'active' : ''}`}
            onClick={toggleMic}
          >
            {isListening ? "👂 聽緊你講..." : "🎤 撳一下講英文"}
          </button>

          <div className="footer">
            <button className="nav-btn" onClick={() => startQuiz(level)}>下一題</button>
            <button className="nav-btn" onClick={() => setLevel(null)}>返回</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
