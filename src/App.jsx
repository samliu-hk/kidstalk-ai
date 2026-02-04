import { useState, useEffect, useRef } from 'react';

// --- 包含全部 100 題題目 ---
const sentences = [
  { id: 1, text: "Good morning, how are you?", level: "Easy" },
  { id: 2, text: "What is your name?", level: "Easy" },
  { id: 3, text: "I am seven years old.", level: "Easy" },
  { id: 4, text: "Nice to meet you.", level: "Easy" },
  { id: 5, text: "I live in a big city.", level: "Easy" },
  { id: 6, text: "I have a happy family.", level: "Easy" },
  { id: 7, text: "This is my little brother.", level: "Easy" },
  { id: 8, text: "My father is a teacher.", level: "Easy" },
  { id: 9, text: "My mother is very beautiful.", level: "Easy" },
  { id: 10, text: "I love my grandma and grandpa.", level: "Easy" },
  { id: 11, text: "How old are you?", level: "Easy" },
  { id: 12, text: "I go to school by bus.", level: "Easy" },
  { id: 13, text: "I like my teacher very much.", level: "Easy" },
  { id: 14, text: "Today is a wonderful day.", level: "Easy" },
  { id: 15, text: "See you later, alligator.", level: "Easy" },
  { id: 16, text: "Please open your book.", level: "Easy" },
  { id: 17, text: "Close the door, please.", level: "Easy" },
  { id: 18, text: "Stand up and sit down.", level: "Easy" },
  { id: 19, text: "Raise your hand if you know.", level: "Easy" },
  { id: 20, text: "Listen to the music.", level: "Easy" },
  { id: 21, text: "The cat is sleeping on the mat.", level: "Easy" },
  { id: 22, text: "A dog is man's best friend.", level: "Easy" },
  { id: 23, text: "The elephant has a very long trunk.", level: "Medium" },
  { id: 24, text: "Look at the colorful butterfly.", level: "Medium" },
  { id: 25, text: "The lion is the king of the jungle.", level: "Medium" },
  { id: 26, text: "Birds can fly high in the sky.", level: "Easy" },
  { id: 27, text: "Monkeys like to eat bananas.", level: "Easy" },
  { id: 28, text: "The giraffe has a very long neck.", level: "Medium" },
  { id: 29, text: "A rabbit can hop very fast.", level: "Easy" },
  { id: 30, text: "The cow gives us fresh milk.", level: "Easy" },
  { id: 31, text: "Fish swim in the blue ocean.", level: "Easy" },
  { id: 32, text: "I saw a big panda at the zoo.", level: "Medium" },
  { id: 33, text: "The tiger has black stripes.", level: "Medium" },
  { id: 34, text: "A turtle moves very slowly.", level: "Easy" },
  { id: 35, text: "Bees make sweet honey.", level: "Medium" },
  { id: 36, text: "The sun rises in the east.", level: "Medium" },
  { id: 37, text: "I like to watch the stars at night.", level: "Medium" },
  { id: 38, text: "The flowers smell very nice.", level: "Easy" },
  { id: 39, text: "Plants need water to grow.", level: "Medium" },
  { id: 40, text: "Trees give us cool shade.", level: "Medium" },
  { id: 41, text: "I like to eat apples and bananas.", level: "Medium" },
  { id: 42, text: "Red is my favorite color.", level: "Easy" },
  { id: 43, text: "The pizza is hot and yummy.", level: "Easy" },
  { id: 44, text: "Would you like some orange juice?", level: "Medium" },
  { id: 45, text: "I have a round ball.", level: "Easy" },
  { id: 46, text: "Ice cream is cold and sweet.", level: "Easy" },
  { id: 47, text: "The sky is blue and the grass is green.", level: "Medium" },
  { id: 48, text: "I want a sandwich for lunch.", level: "Medium" },
  { id: 49, text: "Chocolate cake is delicious.", level: "Medium" },
  { id: 50, text: "Milk is good for your bones.", level: "Medium" },
  { id: 51, text: "Carrots are good for your eyes.", level: "Medium" },
  { id: 52, text: "I like to drink hot cocoa.", level: "Medium" },
  { id: 53, text: "The lemon is very sour.", level: "Easy" },
  { id: 54, text: "Honey is very sticky and sweet.", level: "Medium" },
  { id: 55, text: "Bread and butter is a simple breakfast.", level: "Hard" },
  { id: 56, text: "The box is a square shape.", level: "Easy" },
  { id: 57, text: "A wheel is a circle.", level: "Easy" },
  { id: 58, text: "The star is yellow and bright.", level: "Easy" },
  { id: 59, text: "Grapes are purple or green.", level: "Medium" },
  { id: 60, text: "I eat rice and soup every day.", level: "Medium" },
  { id: 61, text: "Can we play football together today?", level: "Hard" },
  { id: 62, text: "I enjoy swimming in the pool.", level: "Hard" },
  { id: 63, text: "Reading books helps us learn.", level: "Hard" },
  { id: 64, text: "I can play the piano very well.", level: "Hard" },
  { id: 65, text: "We like to draw pictures.", level: "Medium" },
  { id: 66, text: "Running is a good exercise.", level: "Medium" },
  { id: 67, text: "I want to ride my bicycle.", level: "Medium" },
  { id: 68, text: "Let's play hide and seek.", level: "Medium" },
  { id: 69, text: "I can dance to the music.", level: "Medium" },
  { id: 70, text: "Watching movies is fun.", level: "Medium" },
  { id: 71, text: "I like to collect stickers.", level: "Medium" },
  { id: 72, text: "Taking photos is my hobby.", level: "Hard" },
  { id: 73, text: "We go to the park on weekends.", level: "Hard" },
  { id: 74, text: "I want to build a sandcastle.", level: "Hard" },
  { id: 75, text: "Flying a kite is exciting.", level: "Hard" },
  { id: 76, text: "I like to jump on the trampoline.", level: "Hard" },
  { id: 77, text: "Playing games makes me happy.", level: "Medium" },
  { id: 78, text: "I study English every day.", level: "Hard" },
  { id: 79, text: "Drawing is a creative way to express.", level: "Hard" },
  { id: 80, text: "I love to travel to different places.", level: "Hard" },
  { id: 81, text: "I want to be a scientist in the future.", level: "Hard" },
  { id: 82, text: "Plants need water and sunlight.", level: "Hard" },
  { id: 83, text: "Please remember to wash your hands.", level: "Hard" },
  { id: 84, text: "The moon shines brightly at night.", level: "Hard" },
  { id: 85, text: "We should take care of our planet.", level: "Hard" },
  { id: 86, text: "Knowledge is the power of life.", level: "Hard" },
  { id: 87, text: "Always be kind to everyone.", level: "Hard" },
  { id: 88, text: "Practice makes perfect in everything.", level: "Hard" },
  { id: 89, text: "The library is a quiet place to study.", level: "Hard" },
  { id: 90, text: "I want to travel around the world.", level: "Hard" },
  { id: 91, text: "Honesty is the best policy.", level: "Hard" },
  { id: 92, text: "Health is more important than wealth.", level: "Hard" },
  { id: 93, text: "The ocean is full of mysteries.", level: "Hard" },
  { id: 94, text: "Space travel is very cool.", level: "Hard" },
  { id: 95, text: "Computers help us work faster.", level: "Hard" },
  { id: 96, text: "Believe in yourself and your dreams.", level: "Hard" },
  { id: 97, text: "Learning a new language is fun.", level: "Hard" },
  { id: 98, text: "Music is the universal language.", level: "Hard" },
  { id: 99, text: "Protect the animals and the environment.", level: "Hard" },
  { id: 100, text: "You did a great job today!", level: "Hard" }
];

export default function App() {
  const [currentSentence, setCurrentSentence] = useState(sentences[0]);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState("");
  
  // --- 【新增：最高分紀錄狀態】 ---
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('highScore');
    return saved ? parseInt(saved) : 0;
  });

  const recognitionRef = useRef(null);

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.lang.includes('en') && (v.name.includes('Google') || v.name.includes('Samantha')));
    if (preferredVoice) utterance.voice = preferredVoice;
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("請使用 Chrome 瀏覽器。");

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = 'en-US';
    recognition.continuous = false;

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

      // --- 【更新最高分紀錄】 ---
      if (accuracy > highScore) {
        setHighScore(accuracy);
        localStorage.setItem('highScore', accuracy.toString());
      }

      setIsListening(false);
      recognition.abort(); 
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.abort();
      recognitionRef.current = null;
      setIsListening(false);
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'sans-serif', backgroundColor: '#fff9e6', minHeight: '100vh' }}>
      <style>{`
        @keyframes pulse-red { 0% { transform: scale(1); } 50% { transform: scale(1.05); opacity: 0.8; } 100% { transform: scale(1); } }
        .blinking { animation: pulse-red 1s infinite; background-color: #ff4d4d !important; border: 2px solid white; }
        .high-score-badge { display: inline-block; background: #FFD700; color: #8B4513; padding: 5px 15px; borderRadius: 20px; fontWeight: bold; fontSize: 18px; marginBottom: 15px; boxShadow: 0 2px 4px rgba(0,0,0,0.1); }
      `}</style>

      <h1 style={{ color: '#ff6600', marginBottom: '10px' }}>🦁 英文口語小達人</h1>
      
      {/* 顯示最高分紀錄 */}
      <div className="high-score-badge">
        🏆 最高分紀錄：{highScore}%
      </div>
      
      <div style={{ background: 'white', padding: '25px', borderRadius: '20px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', marginBottom: '20px' }}>
        <p style={{ fontSize: '24px', margin: '10px 0' }}>題目：<strong>{currentSentence.text}</strong></p>
        <p style={{ color: '#888' }}>難度：{currentSentence.level}</p>

        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '25px' }}>
          {!isListening ? (
            <button onClick={startListening} style={{ fontSize: '20px', padding: '15px 30px', borderRadius: '15px', border: 'none', background: '#4CAF50', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>
              🎙️ 開始練習
            </button>
          ) : (
            <button onClick={stopListening} className="blinking" style={{ fontSize: '20px', padding: '15px 30px', borderRadius: '15px', border: 'none', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>
              🛑 停止錄音
            </button>
          )}

          <button onClick={() => speak(currentSentence.text)} style={{ fontSize: '20px', padding: '15px 30px', borderRadius: '15px', border: 'none', background: '#007AFF', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>
            🔊 聽讀音
          </button>
        </div>
      </div>

      {score !== null && (
        <div style={{ background: 'white', padding: '20px', borderRadius: '15px', marginTop: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '30px', color: '#333' }}>本次得分：{score}%</h2>
          {score === highScore && score > 0 && <p style={{ color: '#ff6600', fontWeight: 'bold' }}>🎊 新紀錄誕生！ 🎊</p>}
          <p style={{ fontStyle: 'italic', color: '#555' }}>你說了："{transcript}"</p>
          <p style={{ fontSize: '28px', margin: '15px 0' }}>{feedback}</p>
          
          <button 
            style={{ padding: '15px 40px', fontSize: '20px', borderRadius: '12px', cursor: 'pointer', backgroundColor: '#ff9800', color: 'white', border: 'none', fontWeight: 'bold', boxShadow: '0 4px 0 #e68a00' }}
            onClick={() => { 
              const randomIndex = Math.floor(Math.random() * sentences.length);
              setCurrentSentence(sentences[randomIndex]); 
              setScore(null); 
              setTranscript(""); 
            }}
          >
            下一題 (隨機) ➡️
          </button>
        </div>
      )}
    </div>
  );
}