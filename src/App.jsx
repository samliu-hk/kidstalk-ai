
import { useState, useEffect } from 'react';

const sentences = [
  // --- 1-20: 基礎問候與自我介紹 ---
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

  // --- 21-40: 動物與大自然 ---
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

  // --- 41-60: 食物、顏色與形狀 ---
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

  // --- 61-80: 運動、愛好與活動 ---
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

  // --- 81-100: 進階句子與夢想 ---
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
  // 隨機從 100 題中抽一題
  const randomIndex = Math.floor(Math.random() * sentences.length);
  const next = sentences[randomIndex]; 
  setCurrentSentence(next); 
  setScore(null); 
  setTranscript(""); 
}}
          >
            下一題 ➡️
          </button>
        </div>
      )}
    </div>
  );
}