import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// 題庫 (請自行貼入你之前的 P1-P6 完整題庫)
const questionBank = {
  P1: [// P1 題目
{ en: "A red apple.", zh: "一個紅色的蘋果。" }, { en: "The cat is small.", zh: "這隻貓很小。" },
{ en: "I see a bird.", zh: "我看見一隻鳥。" }, { en: "Stand up, please.", zh: "請站起來。" },
{ en: "Sit down, please.", zh: "請坐下。" }, { en: "Open your book.", zh: "打開你的書。" },
{ en: "Close the door.", zh: "關門。" }, { en: "This is my nose.", zh: "這是我的鼻子。" },
{ en: "Touch your ears.", zh: "摸摸你的耳朵。" }, { en: "Clap your hands.", zh: "拍拍手。" },
{ en: "One, two, three.", zh: "一，二，三。" }, { en: "Blue and yellow.", zh: "藍色和黃色。" },
{ en: "I am a boy.", zh: "我是一個男孩。" }, { en: "You are a girl.", zh: "你是一個女孩。" },
{ en: "My father is tall.", zh: "我的爸爸很高。" }, { en: "My mother is nice.", zh: "我的媽媽很好人。" },
{ en: "I love my brother.", zh: "我愛我的哥哥/弟弟。" }, { en: "She is my sister.", zh: "她是我的姐姐/妹妹。" },
{ en: "A big dog.", zh: "一隻大狗。" }, { en: "A fat pig.", zh: "一隻肥豬。" },
{ en: "I like milk.", zh: "我喜歡牛奶。" }, { en: "I don't like fish.", zh: "我不喜歡魚。" },
{ en: "The sun is hot.", zh: "太陽很熱。" }, { en: "The sky is blue.", zh: "天空是藍色的。" },
{ en: "Look at me.", zh: "望住我。" }, { en: "Happy birthday.", zh: "生日快樂。" },
{ en: "Good morning.", zh: "早晨。" }, { en: "Good night.", zh: "晚安。" },
{ en: "Thank you.", zh: "謝謝你。" }, { en: "You are welcome.", zh: "不客氣。" },
{ en: "A long pencil.", zh: "一支長鉛筆。" }, { en: "A short ruler.", zh: "一把短尺。" },
{ en: "The bag is heavy.", zh: "書包很重。" }, { en: "Wash your face.", zh: "洗臉。" },
{ en: "Clean your hands.", zh: "洗手。" }, { en: "Eat an orange.", zh: "食一個橙。" },
{ en: "Drink some water.", zh: "飲水。" }, { en: "The flower is red.", zh: "花是紅色的。" },
{ en: "A green tree.", zh: "一棵綠色的樹。" }, { en: "Go to bed.", zh: "去睡覺。" },
{ en: "Put on your hat.", zh: "戴上你的帽子。" }, { en: "I have two eyes.", zh: "我有兩隻眼睛。" },
{ en: "An elephant is big.", zh: "大象很大。" }, { en: "A rabbit is cute.", zh: "兔子很可愛。" },
{ en: "Jump like a frog.", zh: "像青蛙一樣跳。" }, { en: "Run fast.", zh: "跑得快。" },
{ en: "Walk slowly.", zh: "慢慢行。" }, { en: "Hello, teacher.", zh: "老師你好。" },
{ en: "Goodbye, friends.", zh: "朋友們再見。" }, { en: "This is a pen.", zh: "這是一支筆。" },
{ en: "That is a desk.", zh: "那是書桌。" }, { en: "Color the star.", zh: "幫星星上色。" },
{ en: "Draw a circle.", zh: "畫一個圓圈。" }, { en: "My school bag.", zh: "我的書包。" },
{ en: "Sing a song.", zh: "唱歌。" }, { en: "Play a game.", zh: "玩遊戲。" },
{ en: "Wait for me.", zh: "等埋我。" }, { en: "I am happy.", zh: "我很開心。" },
{ en: "Are you sad?", zh: "你傷心嗎？" }, { en: "Brush your teeth.", zh: "刷牙。" },
{ en: "Comb your hair.", zh: "梳頭。" }, { en: "It is rainy.", zh: "下雨呀。" },
{ en: "It is sunny.", zh: "天晴呀。" }, { en: "I can swim.", zh: "我會游泳。" },
{ en: "I can dance.", zh: "我會跳舞。" }, { en: "The moon is white.", zh: "月亮是白色的。" },
{ en: "Look at the stars.", zh: "望住星星。" }, { en: "Ten little fingers.", zh: "十隻小手指。" },
{ en: "Point to the door.", zh: "指向門口。" }, { en: "Where is my pen?", zh: "我的筆在哪裡？" },
{ en: "It is on the table.", zh: "在桌面上。" }, { en: "A sweet cake.", zh: "一個甜蛋糕。" },
{ en: "I want an ice cream.", zh: "我想要雪糕。" }, { en: "This is a bus.", zh: "這是一架巴士。" },
{ en: "Stop the car.", zh: "停車。" }, { en: "The banana is yellow.", zh: "香蕉是黃色的。" },
{ en: "Eat your bread.", zh: "食麵包。" }, { en: "Drink your juice.", zh: "飲果汁。" },
{ en: "I see a monkey.", zh: "我看見一隻猴子。" }, { en: "A tall tree.", zh: "一棵高樹。" },
{ en: "A small box.", zh: "一個細盒。" }, { en: "Close your eyes.", zh: "閉上眼。" },
{ en: "Listen to the music.", zh: "聽音樂。" }, { en: "Kick the ball.", zh: "踢波。" },
{ en: "Throw the ball.", zh: "投球。" }, { en: "I have a kite.", zh: "我有一個風箏。" },
{ en: "Fly a kite.", zh: "放風箏。" }, { en: "My teddy bear.", zh: "我的泰迪熊。" },
{ en: "Sleep in the bed.", zh: "在床上睡覺。" }, { en: "Pick up the pen.", zh: "執起支筆。" },
{ en: "Don't cry.", zh: "唔好喊。" }, { en: "Give me the book.", zh: "把書給我。" },
{ en: "I like school.", zh: "我喜歡學校。" }, { en: "A white cow.", zh: "一頭白色的牛。" },
{ en: "Jump high.", zh: "跳得高。" }, { en: "See you later.", zh: "等陣見。" },
{ en: "What is this?", zh: "這是什麼？" }, { en: "Who are you?", zh: "你是誰？" },
{ en: "I am seven.", zh: "我七歲。" }, { en: "God bless you.", zh: "願上帝保佑你。" } ],
  P2: [ /* 貼喺呢度 */ ],
  P3: [ /* 貼喺呢度 */ ],
  P4: [ /* 貼喺呢度 */ ],
  P5: [ /* 貼喺呢度 */ ],
  P6: [ /* 貼喺呢度 */ ]
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
