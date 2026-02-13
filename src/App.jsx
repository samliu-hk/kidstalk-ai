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
  P2: [ // P2 題目
{ en: "The cat is in the box.", zh: "貓在盒子裡面。" }, { en: "The book is on the desk.", zh: "書在桌面上面。" },
{ en: "The ball is under the chair.", zh: "球在椅子下面。" }, { en: "There are two birds.", zh: "那裡有兩隻鳥。" },
{ en: "What are you doing?", zh: "你在做什麼？" }, { en: "I am reading a book.", zh: "我正在看書。" },
{ en: "He likes playing football.", zh: "他喜歡踢足球。" }, { en: "She doesn't like milk.", zh: "她不喜歡牛奶。" },
{ en: "We go to school by bus.", zh: "我們搭巴士返學。" }, { en: "My sister is a student.", zh: "我的姐姐是一名學生。" },
{ en: "Where is the library?", zh: "圖書館在哪裡？" }, { en: "It is next to the park.", zh: "在公園旁邊。" },
{ en: "Today is Monday.", zh: "今天是星期一。" }, { en: "Tomorrow is Tuesday.", zh: "明天是星期二。" },
{ en: "I get up at seven.", zh: "我七點鐘起床。" }, { en: "He brushes his teeth.", zh: "他刷牙。" },
{ en: "She washes her face.", zh: "她洗臉。" }, { en: "Do you have a pencil?", zh: "你有鉛筆嗎？" },
{ en: "Yes, I do.", zh: "是的，我有。" }, { en: "No, I don't.", zh: "不，我沒有。" },
{ en: "How much is this pen?", zh: "這支筆多少錢？" }, { en: "It is five dollars.", zh: "五元。" },
{ en: "I have a lot of toys.", zh: "我有好多玩具。" }, { en: "The weather is windy.", zh: "天很大風。" },
{ en: "It is cloudy today.", zh: "今天多雲。" }, { en: "A tall building.", zh: "一座高樓。" },
{ en: "They are my friends.", zh: "他們是我的朋友。" }, { en: "Come to my party.", zh: "來我的派對。" },
{ en: "Happy Halloween.", zh: "萬聖節快樂。" }, { en: "Merry Christmas.", zh: "聖誕快樂。" },
{ en: "I eat eggs for breakfast.", zh: "我早餐食蛋。" }, { en: "She drinks tea.", zh: "她飲茶。" },
{ en: "Wait for the green light.", zh: "等綠燈。" }, { en: "Cross the road safely.", zh: "安全過馬路。" },
{ en: "Look at the timetable.", zh: "望吓時間表。" }, { en: "We have Art class.", zh: "我們有美勞課。" },
{ en: "I like Music very much.", zh: "我非常喜歡音樂。" }, { en: "The lion is the king.", zh: "獅子是國王。" },
{ en: "A giraffe has a long neck.", zh: "長頸鹿有長頸。" }, { en: "Monkeys love bananas.", zh: "猴子愛香蕉。" },
{ en: "A spider has eight legs.", zh: "蜘蛛有八條腿。" }, { en: "Don't run in the classroom.", zh: "不要在教室跑。" },
{ en: "Keep quiet in the library.", zh: "圖書館內保持安靜。" }, { en: "Help each other.", zh: "互相幫助。" },
{ en: "Be a good child.", zh: "做個好孩子。" }, { en: "I want to be a doctor.", zh: "我想成為一名醫生。" },
{ en: "He wants to be a pilot.", zh: "他想成為一名飛行員。" }, { en: "A fast car.", zh: "一輛快車。" },
{ en: "A slow snail.", zh: "一隻慢蝸牛。" }, { en: "Is it your bag?", zh: "這是你的書包嗎？" },
{ en: "Whose pen is this?", zh: "這是誰的筆？" }, { en: "It is Mary's pen.", zh: "是瑪麗的筆。" },
{ en: "My birthday is in May.", zh: "我的生日在五月。" }, { en: "What is the date today?", zh: "今日幾多號？" },
{ en: "It is the first of June.", zh: "六月一號。" }, { en: "The room is clean.", zh: "房間很乾淨。" },
{ en: "The floor is dirty.", zh: "地板很髒。" }, { en: "Turn left.", zh: "向左轉。" },
{ en: "Turn right.", zh: "向右轉。" }, { en: "Go straight ahead.", zh: "直行。" },
{ en: "The shop is open.", zh: "商店開門了。" }, { en: "The cinema is closed.", zh: "戲院關門了。" },
{ en: "I am thirsty.", zh: "我口渴。" }, { en: "Can I have some water?", zh: "可以給我一點水嗎？" },
{ en: "Sure, here you are.", zh: "當然，給你。" }, { en: "Don't shout.", zh: "不要大叫。" },
{ en: "Put the rubbish in the bin.", zh: "把垃圾放進垃圾桶。" }, { en: "I can skip.", zh: "我會跳繩。" },
{ en: "He can ride a bike.", zh: "他會踩單車。" }, { en: "She can play the piano.", zh: "她會彈鋼琴。" },
{ en: "We are at the zoo.", zh: "我們在動物園。" }, { en: "Look at the elephant.", zh: "看那隻大象。" },
{ en: "The snake is long.", zh: "這條蛇很長。" }, { en: "The hippo is fat.", zh: "河馬很肥。" },
{ en: "I see a butterfly.", zh: "我看見一隻蝴蝶。" }, { en: "Bees make honey.", zh: "蜜蜂製造蜂蜜。" },
{ en: "Wear your sweater.", zh: "穿上你的毛衣。" }, { en: "Take off your shoes.", zh: "除鞋。" },
{ en: "My shoes are white.", zh: "我的鞋是白色的。" }, { en: "I have a new dress.", zh: "我有一件新連身裙。" },
{ en: "Let's go to the beach.", zh: "我們去沙灘吧。" }, { en: "I like swimming.", zh: "我喜歡游泳。" },
{ en: "The water is cold.", zh: "水很冷。" }, { en: "Build a sandcastle.", zh: "起沙堡。" },
{ en: "Don't forget your umbrella.", zh: "別忘了帶傘。" }, { en: "It is a storm.", zh: "有暴風雨。" },
{ en: "I am brave.", zh: "我很勇敢。" }, { en: "Be kind to animals.", zh: "對動物友善。" },
{ en: "Share your toys.", zh: "分享你的玩具。" }, { en: "Excuse me.", zh: "唔該/對唔住。" },
{ en: "I am sorry.", zh: "對唔住。" }, { en: "Never mind.", zh: "唔緊要。" },
{ en: "Hold my hand.", zh: "拖住我隻手。" }, { en: "Listen to the teacher.", zh: "聽老師講。" },
{ en: "Read the sentence.", zh: "讀出句子。" }, { en: "Write your name.", zh: "寫你的名字。" },
{ en: "Spell the word.", zh: "串出那個字。" }, { en: "Good luck.", zh: "祝好運。" },
{ en: "Have a nice day.", zh: "祝你有愉快的一天。" }, { en: "You are the best.", zh: "你是最好的。" } ],
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
