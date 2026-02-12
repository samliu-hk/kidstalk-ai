import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// 📚 題庫：我先為每級預設 10 題範例（共 60 題），結構已做好，你可以隨時加到 600 題
const questionBank = {
  P1: [
    { en: "Hello, how are you?", zh: "你好，你好嗎？" },
    { en: "I like red apples.", zh: "我喜歡紅蘋果。" },
    { en: "This is my bag.", zh: "這是我的書包。" },
    { en: "Stand up, please.", zh: "請站起來。" },
    { en: "I am a boy.", zh: "我是一個男孩。" },
    { en: "The sun is hot.", zh: "太陽很熱。" },
    { en: "Open your book.", zh: "打開你的書。" },
    { en: "I can run.", zh: "我會跑。" },
    { en: "Wash your hands.", zh: "洗手。" },
    { en: "Good morning, teacher.", zh: "老師，早晨。" }
  ],
  P2: [
    { en: "He is my father.", zh: "他是我的爸爸。" },
    { en: "I go to school by bus.", zh: "我搭巴士返學。" },
    { en: "She has long hair.", zh: "她有長頭髮。" },
    { en: "The cat is under the chair.", zh: "貓在椅子下面。" },
    { en: "It is a rainy day.", zh: "今天是下雨天。" },
    { en: "What time is it?", zh: "現在幾點？" },
    { en: "My favorite color is blue.", zh: "我最喜歡的顏色是藍色。" },
    { en: "Do you like bananas?", zh: "你喜歡香蕉嗎？" },
    { en: "Brush your teeth every day.", zh: "每天刷牙。" },
    { en: "The elephant is very big.", zh: "大象非常大。" }
  ],
  P3: [
    { en: "There is a park near my house.", zh: "我家附近有一個公園。" },
    { en: "I want to be a doctor.", zh: "我想當一名醫生。" },
    { en: "The library is quiet.", zh: "圖書館很安靜。" },
    { en: "We should eat more vegetables.", zh: "我們應該吃多點蔬菜。" },
    { en: "My birthday is in May.", zh: "我的生日在五月。" },
    { en: "I have two sisters.", zh: "我有兩個姐姐。" },
    { en: "Can I have some water?", zh: "可以給我一點水嗎？" },
    { en: "The rabbit runs fast.", zh: "兔子跑得很快。" },
    { en: "I am taller than you.", zh: "我比你高。" },
    { en: "Let's play football together.", zh: "我們一起踢波吧。" }
  ],
  P4: [
    { en: "I watched a movie last night.", zh: "我昨晚看了一場電影。" },
    { en: "How much does this cake cost?", zh: "這個蛋糕多少錢？" },
    { en: "Don't run in the corridor.", zh: "不要在走廊奔跑。" },
    { en: "She is smarter than me.", zh: "她比我更聰明。" },
    { en: "The weather is getting cold.", zh: "天氣正變冷。" },
    { en: "We are going to the beach.", zh: "我們正要去沙灘。" },
    { en: "I forgot to bring my pen.", zh: "我忘了帶筆。" },
    { en: "Please turn off the light.", zh: "請熄燈。" },
    { en: "The flowers smell good.", zh: "花聞起來很香。" },
    { en: "My mother is cooking dinner.", zh: "我媽媽正在煮晚飯。" }
  ],
  P5: [
    { en: "I will visit Japan next summer.", zh: "我明年夏天會去日本。" },
    { en: "If it rains, we will stay home.", zh: "如果下雨，我們會留在家。" },
    { en: "The environment is very important.", zh: "環境非常重要。" },
    { en: "He has been to London twice.", zh: "他去過倫敦兩次。" },
    { en: "You should finish your homework.", zh: "你應該完成你的功課。" },
    { en: "I am interested in music.", zh: "我對音樂感興趣。" },
    { en: "Protect the earth for our future.", zh: "為我們的未來保護地球。" },
    { en: "She speaks English very fluently.", zh: "她講英文講得很流利。" },
    { en: "Take a deep breath and relax.", zh: "深呼吸並放鬆。" },
    { en: "The computer is useful.", zh: "電腦很有用。" }
  ],
  P6: [
    { en: "The window was broken by the ball.", zh: "窗被那個球打碎了。" },
    { en: "I look forward to seeing you.", zh: "我期待見到你。" },
    { en: "She said that she was busy.", zh: "她說她很忙。" },
    { en: "The man who lives next door is kind.", zh: "住隔壁的男人很友善。" },
    { en: "It is necessary to study hard.", zh: "努力讀書是必要的。" },
    { en: "Responsibility is very important.", zh: "責任感非常重要。" },
    { en: "Technology changes our lives.", zh: "科技改變我們的生活。" },
    { en: "Unless you try, you won't succeed.", zh: "除非你嘗試，否則不會成功。" },
    { en: "The ocean is full of plastic.", zh: "海洋充滿了塑膠。" },
    { en: "Always keep a positive mind.", zh: "經常保持積極的心態。" }
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
  const recognitionRef = useRef(null);

  // 初始化語音引擎 (Web Speech API)
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.lang = 'en-US';
      rec.continuous = false; // 強制設定為單次，講完就停
      rec.interimResults = false;

      rec.onresult = (event) => {
        const spoken = event.results[0][0].transcript.toLowerCase().replace(/[.,!?]/g, "");
        const target = currentQ.en.toLowerCase().replace(/[.,!?]/g, "");
        checkResult(spoken, target);
        rec.stop(); // 收到結果後強制停止
      };

      rec.onend = () => {
        setIsListening(false); // 錄音結束，嘜頭自動熄滅
      };

      rec.onerror = () => {
        setIsListening(false);
        setFeedback("聽唔清，請再試一次！");
      };

      recognitionRef.current = rec;
    }
  }, [currentQ]);

  const checkResult = (spoken, target) => {
    const spokenWords = spoken.split(" ");
    const targetWords = target.split(" ");
    let match = 0;
    targetWords.forEach(w => { if (spokenWords.includes(w)) match++; });
    
    const finalScore = Math.round((match / targetWords.length) * 100);
    setScore(finalScore);

    if (finalScore >= 80) {
      setFeedback("✅ 讀得好準！加油！");
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak % 10 === 0) {
        setRocket(true);
        setTimeout(() => setRocket(false), 3000);
      }
    } else {
      setStreak(0);
      setFeedback(`❌ 差少少，你要讀準：${target}`);
    }
  };

  const startQuiz = (lvl) => {
    setLevel(lvl);
    const questions = questionBank[lvl];
    const random = questions[Math.floor(Math.random() * questions.length)];
    setCurrentQ(random);
    setScore(null);
    setFeedback("");
  };

  const handleMic = () => {
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setIsListening(true);
      setFeedback("聽緊你講嘢，請讀出英文...");
      recognitionRef.current.start();
    }
  };

  return (
    <div className="app">
      {rocket && <div className="rocket-animation">🚀</div>}
      <h1 className="title">Kidstalk 英文口語大師 🎓</h1>

      {!level ? (
        <div className="menu">
          <h2>請選擇你的年級：</h2>
          <div className="lvl-grid">
            {Object.keys(questionBank).map(l => (
              <button key={l} onClick={() => startQuiz(l)} className="lvl-btn">{l}</button>
            ))}
          </div>
        </div>
      ) : (
        <div className="game-container">
          <div className="stats">
            年級: {level} | 連勝: {streak} 🔥
          </div>

          <div className="card">
            <h2 className="en-text">{currentQ?.en}</h2>
            <p className="zh-text">({currentQ?.zh})</p>
            
            {score !== null && (
              <div className="result">
                <div className="score-num">{score}%</div>
                <p className="msg">{feedback}</p>
              </div>
            )}
          </div>

          <button 
            className={`mic-btn ${isListening ? 'active' : ''}`}
            onClick={handleMic}
          >
            {isListening ? "👂 聽緊你講..." : "🎤 按一下讀英文"}
          </button>

          <div className="nav-btns">
            <button onClick={() => startQuiz(level)}>下一題</button>
            <button onClick={() => setLevel(null)}>返回主頁</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
