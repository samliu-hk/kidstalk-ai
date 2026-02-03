
import { useState, useEffect } from 'react';

const sentences = [
  // 入門級
  { id: 1, text: "Good morning, how are you?", level: "Easy" },
  { id: 2, text: "What is your name?", level: "Easy" },
  { id: 3, text: "I am seven years old.", level: "Easy" },
  
  // 生活級
  { id: 4, text: "I like to eat apples and bananas.", level: "Medium" },
  { id: 5, text: "The weather is very sunny today.", level: "Medium" },
  { id: 6, text: "My favorite color is blue.", level: "Medium" },
  
  // 挑戰級
  { id: 7, text: "Can we play football together today?", level: "Hard" },
  { id: 8, text: "Reading books helps us learn new things.", level: "Hard" },
  { id: 9, text: "I want to be a scientist in the future.", level: "Hard" }
];
  
  


export default function App() {
  const [currentSentence, setCurrentSentence] = useState(sentences[0]);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState("");

  // 新增：真人發音功能
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US'; // 設定為美式英語
    utterance.rate = 0.8;      // 語速稍微調慢一點，方便小朋友聽清楚
    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("你的瀏覽器不支持語音識別，請使用 Chrome。");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      setTranscript(speechToText);
      const spokenWords = speechToText.toLowerCase().replace(/[.,?]/g, "").split(" ");
      const targetWords = currentSentence.text.toLowerCase().replace(/[.,?]/g, "").split(" ");
      let matchCount = 0;
      targetWords.forEach(word => { if (spokenWords.includes(word)) matchCount++; });
      const accuracy = Math.round((matchCount / targetWords.length) * 100);
      setScore(accuracy);
      setFeedback(accuracy === 100 ? "太棒了！🎉" : accuracy > 70 ? "很好！👍" : "再試一次💪");
      setIsListening(false);
    };
    recognition.start();
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'sans-serif', backgroundColor: '#fff9e6', minHeight: '100vh' }}>
      <h1 style={{ color: '#ff6600' }}>🦁 英文口語小達人</h1>
      <div style={{ background: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', marginBottom: '20px' }}>
        <p style={{ fontSize: '20px' }}>題目：<strong>{currentSentence.text}</strong></p>
        
        {/* 新增：播音按鈕 */}
        <button 
          onClick={() => speak(currentSentence.text)}
          style={{ fontSize: '24px', padding: '10px', borderRadius: '10px', border: 'none', background: '#007AFF', color: 'white', cursor: 'pointer', marginRight: '10px' }}
        >
          🔊 聽讀音
        </button>

        <button 
          onClick={startListening} 
          style={{ fontSize: '24px', padding: '10px', borderRadius: '10px', border: 'none', background: isListening ? '#ff4d4d' : '#4CAF50', color: 'white', cursor: 'pointer' }}
        >
          {isListening ? "🎤 正在聽..." : "🎙️ 開始練習"}
        </button>
      </div>

      {score !== null && (
        <div style={{ background: 'white', padding: '15px', borderRadius: '10px' }}>
          <h2>得分：{score}%</h2>
          <p>你說了："{transcript}"</p>
          <p>💡 {feedback}</p>
          <button 
            style={{ padding: '10px 20px', fontSize: '18px', borderRadius: '8px', cursor: 'pointer' }}
            onClick={() => { 
              const next = sentences[(currentSentence.id % sentences.length)]; 
              setCurrentSentence(next); setScore(null); setTranscript(""); 
            }}
          >
            下一題 ➡️
          </button>
        </div>
      )}
    </div>
  );
}