import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// 📚 精選題庫 (每級 30 題，總共 180 題，防止代碼過長出錯)
const questionBank = {
  P1: [
    { en: "Apple", zh: "蘋果" }, { en: "A red cat", zh: "一隻紅色的貓" }, { en: "Good morning", zh: "早晨" },
    { en: "I am a boy", zh: "我是一個男孩" }, { en: "Stand up", zh: "站立" }, { en: "Sit down", zh: "坐下" },
    { en: "Open your book", zh: "打開書本" }, { en: "Close the door", zh: "關門" }, { en: "Big dog", zh: "大狗" },
    { en: "Blue sky", zh: "藍天" }, { en: "My eyes", zh: "我的眼睛" }, { en: "Touch your nose", zh: "摸摸鼻子" },
    { en: "I like milk", zh: "我喜歡牛奶" }, { en: "Thank you", zh: "謝謝" }, { en: "See you", zh: "再見" },
    { en: "One two three", zh: "一二三" }, { en: "Happy birthday", zh: "生日快樂" }, { en: "A yellow bus", zh: "黃色巴士" },
    { en: "Hot water", zh: "熱水" }, { en: "Cold ice", zh: "冷冰" }, { en: "My father", zh: "我的爸爸" },
    { en: "My mother", zh: "我的媽媽" }, { en: "Small bird", zh: "小鳥" }, { en: "Good night", zh: "晚安" },
    { en: "Wash hands", zh: "洗手" }, { en: "Clean face", zh: "洗臉" }, { en: "Love you", zh: "愛你" },
    { en: "Banana", zh: "香蕉" }, { en: "Orange", zh: "橙" }, { en: "Green grass", zh: "綠草" }
  ],
  P2: [
    { en: "He is my teacher", zh: "他是我的老師" }, { en: "She is my sister", zh: "她是我的姐姐" }, { en: "I go to school", zh: "我返學" },
    { en: "The cat is sleeping", zh: "貓正在睡覺" }, { en: "Where is the book?", zh: "書在哪裡？" }, { en: "It is under the chair", zh: "它在椅子下" },
    { en: "Do you like apples?", zh: "你喜歡蘋果嗎？" }, { en: "Yes I do", zh: "是的，我喜歡" }, { en: "What time is it?", zh: "現在幾點？" },
    { en: "It is seven o'clock", zh: "現在七點鐘" }, { en: "I have a pencil", zh: "我有一支鉛筆" }, { en: "This is my nose", zh: "這是我的鼻子" },
    { en: "They are playing", zh: "他們正在玩耍" }, { en: "We are happy", zh: "我們很開心" }, { en: "A tall man", zh: "一個高大的男人" },
    { en: "A fat pig", zh: "一隻肥豬" }, { en: "My hair is long", zh: "我的頭髮很長" }, { en: "Her eyes are big", zh: "她的眼睛很大" },
    { en: "Let's go home", zh: "我們回家吧" }, { en: "Come here", zh: "過來這裡" }, { en: "Don't run", zh: "不要跑" },
    { en: "Listen to me", zh: "聽我說" }, { en: "Look at the board", zh: "看黑板" }, { en: "I can jump", zh: "我會跳" },
    { en: "I can swim", zh: "我會游泳" }, { en: "The sun is hot", zh: "太陽很熱" }, { en: "Rainy day", zh: "下雨天" },
    { en: "A piece of cake", zh: "一件蛋糕" }, { en: "Drink some water", zh: "喝點水" }, { en: "Put on your shoes", zh: "穿上鞋子" }
  ],
  P3: [
    { en: "There is a park", zh: "那裡有一個公園" }, { en: "The library is quiet", zh: "圖書館很安靜" }, { en: "I walk to school", zh: "我走路去學校" },
    { en: "She likes reading", zh: "她喜歡閱讀" }, { en: "He wants a toy", zh: "他想要一個玩具" }, { en: "How much is it?", zh: "這個多少錢？" },
    { en: "It is twenty dollars", zh: "它是二十元" }, { en: "The dog is faster", zh: "狗比較快" }, { en: "The bus is slower", zh: "巴士比較慢" },
    { en: "I was sick yesterday", zh: "我昨天病了" }, { en: "Where were you?", zh: "你剛才在哪裡？" }, { en: "I was at home", zh: "我剛才在家" },
    { en: "My favourite colour", zh: "我最愛的顏色" }, { en: "January and February", zh: "一月和二月" }, { en: "Monday to Sunday", zh: "星期一至星期日" },
    { en: "Turn left", zh: "向左轉" }, { en: "Turn right", zh: "向右轉" }, { en: "Go straight", zh: "直走" },
    { en: "Next to the bank", zh: "在銀行旁邊" }, { en: "In front of me", zh: "在我前面" }, { en: "Behind the door", zh: "在門後面" },
    { en: "Can you help me?", zh: "你可以幫我嗎？" }, { en: "Please be quiet", zh: "請安靜" }, { en: "Don't shout", zh: "不要大叫" },
    { en: "A glass of milk", zh: "一杯牛奶" }, { en: "A bottle of water", zh: "一樽水" }, { en: "A box of tissues", zh: "一盒紙巾" },
    { en: "Brush my teeth", zh: "刷我的牙" }, { en: "Comb my hair", zh: "梳我的頭" }, { en: "Finish my homework", zh: "做完我的功課" }
  ],
  P4: [
    { en: "I watched TV yesterday", zh: "我昨天看了電視" }, { en: "Did you play football?", zh: "你有踢足球嗎？" }, { en: "No I didn't", zh: "不，我沒有" },
    { en: "She is taller than me", zh: "她比我高" }, { en: "This bag is heavier", zh: "這個袋比較重" }, { en: "Who is the smartest?", zh: "誰是最聰明的？" },
    { en: "I am going to buy", zh: "我打算去買" }, { en: "We are going to visit", zh: "我們打算去參觀" }, { en: "Because I am hungry", zh: "因為我肚餓" },
    { en: "So I eat food", zh: "所以我吃東西" }, { en: "The weather is windy", zh: "天氣很大風" }, { en: "It will be sunny", zh: "將會是晴天" },
    { en: "You must stop", zh: "你必須停下" }, { en: "You should study", zh: "你應該讀書" }, { en: "Don't litter", zh: "不要亂拋垃圾" },
    { en: "Keep off the grass", zh: "請勿踐踏草地" }, { en: "Wait for the bus", zh: "等巴士" }, { en: "Pay by Octopus", zh: "用八達通付款" },
    { en: "A pair of shoes", zh: "一對鞋" }, { en: "A carton of juice", zh: "一盒果汁" }, { en: "It tastes sweet", zh: "它味道很甜" },
    { en: "It smells good", zh: "它聞起來很香" }, { en: "It feels soft", zh: "它摸起來很軟" }, { en: "My hobby is cooking", zh: "我的愛好是煮食" },
    { en: "I like collecting stamps", zh: "我喜歡集郵" }, { en: "Last weekend", zh: "上個週末" }, { en: "Next week", zh: "下星期" },
    { en: "The shop is closed", zh: "商店關門了" }, { en: "The cinema is open", zh: "戲院開了" }, { en: "Buying a ticket", zh: "買一張票" }
  ],
  P5: [
    { en: "I have been to Japan", zh: "我去過日本" }, { en: "Have you eaten yet?", zh: "你食咗嘢未？" }, { en: "I have already finished", zh: "我已經完成了" },
    { en: "If it rains, I stay", zh: "如果下雨，我就留下" }, { en: "If you run, you win", zh: "如果你跑，你會贏" }, { en: "Although he is old", zh: "雖然他老了" },
    { en: "He is still strong", zh: "他仍然很強壯" }, { en: "Either you or me", zh: "不是你就是我" }, { en: "Neither hot nor cold", zh: "不熱也不冷" },
    { en: "The girl is reading", zh: "那個女孩正在閱讀" }, { en: "The boy is running", zh: "那個男孩正在跑" }, { en: "The environment", zh: "環境" },
    { en: "Protect the earth", zh: "保護地球" }, { en: "Reduce reuse recycle", zh: "減少使用、物盡其用、循環再造" }, { en: "Too much plastic", zh: "太多塑膠" },
    { en: "Air pollution", zh: "空氣污染" }, { en: "Endangered animals", zh: "瀕危動物" }, { en: "I look forward to", zh: "我期待" },
    { en: "Would you like to?", zh: "你想要...嗎？" }, { en: "May I help you?", zh: "我可以幫你嗎？" }, { en: "Excuse me", zh: "不好意思" },
    { en: "Could you tell me?", zh: "可以告訴我嗎？" }, { en: "Go straight ahead", zh: "向前直走" }, { en: "It is opposite to", zh: "它在對面" },
    { en: "Cross the road", zh: "過馬路" }, { en: "Be careful", zh: "小心" }, { en: "Take care", zh: "保重" },
    { en: "Good luck", zh: "祝好運" }, { en: "Have a nice trip", zh: "旅途愉快" }, { en: "See you later", zh: "遲啲見" }
  ],
  P6: [
    { en: "The window was broken", zh: "窗戶被打破了" }, { en: "The book was written", zh: "這本書是被寫的" }, { en: "By the famous writer", zh: "由著名作家" },
    { en: "He said he was busy", zh: "他說他很忙" }, { en: "She told me that", zh: "她告訴我" }, { en: "The man who is tall", zh: "那個高大的男人" },
    { en: "The cake which is tasty", zh: "那個好味的蛋糕" }, { en: "The place where we met", zh: "我們相遇的地方" }, { en: "Unless you study", zh: "除非你讀書" },
    { en: "You will fail", zh: "你會不合格" }, { en: "So that I can pass", zh: "以便我可以合格" }, { en: "In order to win", zh: "為了贏" },
    { en: "It is necessary to", zh: "這是必須的" }, { en: "It is important to", zh: "這是重要的" }, { en: "Responsibility", zh: "責任" },
    { en: "Punctuality", zh: "準時" }, { en: "Honesty is best", zh: "誠實是最好的" }, { en: "Never give up", zh: "永不放棄" },
    { en: "Believe in yourself", zh: "相信你自己" }, { en: "Keep trying", zh: "繼續嘗試" }, { en: "My dream job", zh: "我的夢想工作" },
    { en: "When I grow up", zh: "當我長大後" }, { en: "I want to be", zh: "我想成為" }, { en: "A successful person", zh: "一個成功的人" },
    { en: "Contribute to society", zh: "貢獻社會" }, { en: "Global warming", zh: "全球暖化" }, { en: "Save energy", zh: "節約能源" },
    { en: "Turn off the lights", zh: "關燈" }, { en: "Meaning of life", zh: "生命的意義" }, { en: "Precious memories", zh: "珍貴的回憶" }
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
        checkResult(spoken, target);
        rec.stop(); // 強制停止
      };

      rec.onend = () => setIsListening(false);
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
      setFeedback("✅ 讀得好準！好叻呀！");
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak % 10 === 0) {
        setRocket(true);
        setTimeout(() => setRocket(false), 3000);
      }
    } else {
      setStreak(0);
      setFeedback(`❌ 差少少，試下讀：${target}`);
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
      setFeedback("👂 聽緊你講...");
      recognitionRef.current.start();
    }
  };

  // 🔊 語音示範功能 (額外送俾你，等小朋友可以聽電腦讀一次先)
  const playDemo = () => {
    if (!currentQ) return;
    const utterance = new SpeechSynthesisUtterance(currentQ.en);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="app">
      {rocket && <div className="rocket-animation">🚀</div>}
      <h1 className="title">🦁 Kidstalk AI 口語特訓</h1>

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
          <div className="stats">等級: {level} | 連勝: {streak} 🔥</div>
          
          <div className="card">
            <h2 className="en-text">{currentQ?.en}</h2>
            <p className="zh-text">({currentQ?.zh})</p>
            {score !== null && <div className="score-num">{score}%</div>}
            <p className="feedback-text">{feedback}</p>
          </div>

          <div className="action-buttons">
            <button className={`mic-btn ${isListening ? 'active' : ''}`} onClick={handleMic}>
              {isListening ? "🛑 停止錄音" : "🎤 按一下讀一次"}
            </button>
            <button className="demo-btn" onClick={playDemo}>
              🔈 聽示範讀音
            </button>
          </div>

          <div className="nav-control-group">
            <button className="btn-next" onClick={() => startQuiz(level)}>
              <span>➡️</span> 下一題
            </button>
            <button className="btn-back" onClick={() => setLevel(null)}>
              <span>🏠</span> 返回主頁
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
