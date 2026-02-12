import React, { useState, useEffect } from 'react';
import './App.css';

// ==========================================
// 📚 離線題庫中心 (你可以根據格式，繼續增加到 600 題)
// ==========================================
const questionBank = [
  // P1: 基本單字與顏色 (範例)
  { level: "P1", q: "Apple", t: "蘋果", options: ["Apple", "Orange", "Banana", "Pear"], a: "Apple" },
  { level: "P1", q: "Red", t: "紅色", options: ["Blue", "Green", "Red", "Pink"], a: "Red" },
  { level: "P1", q: "Dog", t: "狗", options: ["Cat", "Dog", "Bird", "Fish"], a: "Dog" },
  { level: "P1", q: "Seven", t: "七", options: ["6", "7", "8", "9"], a: "Seven" },
  { level: "P1", q: "Happy", t: "開心", options: ["Sad", "Happy", "Angry", "Tired"], a: "Happy" },
  // ... 這裡可以繼續複製貼上 P1 題目

  // P2: 簡單句子與家庭 (範例)
  { level: "P2", q: "He is my ____.", t: "他是我的父親。", options: ["mother", "father", "sister", "brother"], a: "father" },
  { level: "P2", q: "I ____ to school.", t: "我走路去上學。", options: ["walk", "fly", "swim", "sleep"], a: "walk" },
  { level: "P2", q: "This is a ____.", t: "這是一支鉛筆。", options: ["book", "bag", "pencil", "ruler"], a: "pencil" },
  { level: "P2", q: "She ____ ice cream.", t: "她喜歡雪糕。", options: ["like", "likes", "liking", "liked"], a: "likes" },
  // ... 這裡可以繼續複製貼上 P2 題目

  // P3: 比較級與時間 (範例)
  { level: "P3", q: "The elephant is ____ than the cat.", t: "大象比貓大。", options: ["big", "bigger", "biggest", "small"], a: "bigger" },
  { level: "P3", q: "It is ____ ten.", t: "現在是十點十五分。", options: ["half past", "quarter past", "to", "at"], a: "quarter past" },
  { level: "P3", q: "I eat breakfast ____ the morning.", t: "我在早上食早餐。", options: ["at", "on", "in", "to"], a: "in" },

  // P4: 過去式與數量 (範例)
  { level: "P4", q: "I ____ a movie last night.", t: "我昨晚看了一場電影。", options: ["watch", "watches", "watched", "watching"], a: "watched" },
  { level: "P4", q: "How ____ sugar do you need?", t: "你需要多少糖？", options: ["many", "much", "long", "often"], a: "much" },

  // P5: 將來式與副詞 (範例)
  { level: "P5", q: "We ____ go to the zoo tomorrow.", t: "我們明天將會去動物園。", options: ["will", "did", "have", "are"], a: "will" },
  { level: "P5", q: "He runs ____.", t: "他跑得很快。", options: ["quick", "quickly", "fastly", "slow"], a: "quickly" },

  // P6: 被動式與連接詞 (範例)
  { level: "P6", q: "The cake ____ eaten by the boy.", t: "蛋糕被那個男孩吃了。", options: ["is", "was", "were", "been"], a: "was" },
  { level: "P6", q: "I don't know ____ to do.", t: "我不知道該做什麼。", options: ["what", "which", "who", "where"], a: "what" },
];

function App() {
  const [currentLevel, setCurrentLevel] = useState(null);
  const [question, setQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0); // 連勝紀錄
  const [rocket, setRocket] = useState(false); // 火箭開關
  const [msg, setMsg] = useState("");

  // 隨機抽題
  const nextQuestion = (lvl) => {
    const filtered = questionBank.filter(i => i.level === lvl);
    const randomQ = filtered[Math.floor(Math.random() * filtered.length)];
    // 隨機打亂選項
    const shuffled = [...randomQ.options].sort(() => Math.random() - 0.5);
    setQuestion({ ...randomQ, shuffledOptions: shuffled });
    setMsg("");
  };

  const handleLevel = (lvl) => {
    setCurrentLevel(lvl);
    setScore(0);
    setStreak(0);
    nextQuestion(lvl);
  };

  const checkAnswer = (ans) => {
    if (ans === question.a) {
      const newStreak = streak + 1;
      setScore(score + 1);
      setStreak(newStreak);
      setMsg("✅ 答對了！你真棒！");

      // 🚀 每 10 題彈出火箭
      if (newStreak > 0 && newStreak % 10 === 0) {
        setRocket(true);
        setTimeout(() => setRocket(false), 2000);
      }

      setTimeout(() => nextQuestion(currentLevel), 1200);
    } else {
      setMsg(`❌ 答錯啦，正確答案是：${question.a}`);
      setStreak(0); // 斷連勝
    }
  };

  return (
    <div className="container">
      {/* 🚀 火箭動畫 */}
      {rocket && <div className="rocket-fly">🚀</div>}

      <h1 className="title">Kidstalk 英文大挑戰 🌟</h1>

      {!currentLevel ? (
        <div className="menu">
          <h2>請選擇年級：</h2>
          <div className="btn-group">
            {['P1', 'P2', 'P3', 'P4', 'P5', 'P6'].map(l => (
              <button key={l} onClick={() => handleLevel(l)} className="lvl-btn">{l}</button>
            ))}
          </div>
        </div>
      ) : (
        <div className="quiz-box">
          <div className="info">年級：{currentLevel} | 得分：{score} | 連勝：{streak} 🔥</div>
          
          <div className="q-card">
            <h2 className="q-text">{question?.q}</h2>
            <p className="q-trans">({question?.t})</p>
            
            <div className="options">
              {question?.shuffledOptions.map(opt => (
                <button key={opt} onClick={() => checkAnswer(opt)} className="opt-btn">{opt}</button>
              ))}
            </div>
            <p className="feedback">{msg}</p>
          </div>

          <button onClick={() => setCurrentLevel(null)} className="back-btn">返回選單</button>
        </div>
      )}
    </div>
  );
}

export default App;
