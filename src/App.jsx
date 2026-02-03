import { useState, useEffect } from 'react';

const sentences = [
  { id: 1, text: "Good morning, how are you?", level: "Easy" },
  { id: 2, text: "I like to eat apples and bananas.", level: "Medium" },
  { id: 3, text: "Can we play football together today?", level: "Hard" },
];

export default function App() {
  const [currentSentence, setCurrentSentence] = useState(sentences[0]);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState("");

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
        <p>題目：<strong>{currentSentence.text}</strong></p>
        <button 
          onClick={startListening} 
          style={{ fontSize: '40px', padding: '10px 20px', borderRadius: '50%', border: 'none', background: isListening ? '#ff4d4d' : '#4CAF50', color: 'white', cursor: 'pointer' }}
        >
          {isListening ? "🎤" : "🎙️"}
        </button>
        <p>{isListening ? "正在聽你說話..." : "點擊麥克風開始"}</p>
      </div>
      {score !== null && (
        <div style={{ background: 'white', padding: '15px', borderRadius: '10px' }}>
          <h2>得分：{score}%</h2>
          <p>你說了："{transcript}"</p>
          <p>💡 {feedback}</p>
          <button onClick={() => { 
            const next = sentences[(currentSentence.id % sentences.length)]; 
            setCurrentSentence(next); setScore(null); setTranscript(""); 
          }}>下一題 ➡️</button>
        </div>
      )}
    </div>
  );
}
