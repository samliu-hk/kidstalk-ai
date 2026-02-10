import { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

// 初始化 Google AI (從 .env 讀取密碼)
// 暫時直接貼密碼
const genAI = new GoogleGenerativeAI("AIzaSyCP6PYxc7TQ1ARxbA7xToNoY3zAsKvejvQ");
export default function App() {
  // 預設一開始的題目
  const [currentSentence, setCurrentSentence] = useState({ text: "Hello, welcome to English class!", level: "P1" });
  
  // 狀態管理
  const [selectedGrade, setSelectedGrade] = useState("P1"); // 預設小一
  const [isLoading, setIsLoading] = useState(false); // 係咪諗緊題目
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState("");
  
  // 最高分紀錄
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('highScore');
    return saved ? parseInt(saved) : 0;
  });

  const recognitionRef = useRef(null);

  // --- 核心功能：叫 AI 出題目 ---
  const generateQuestion = async (grade) => {
    setIsLoading(true); // 顯示「生成中...」
    setScore(null);     // 清空舊分數
    setTranscript("");  // 清空舊錄音
    setFeedback("");

    try {
      // 這是命令 AI 的「咒語」 (Prompt)
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `
        You are an English teacher in Hong Kong using the EDB curriculum.
        Generate ONE simple, short English sentence for a Primary ${grade.replace('P', '')} student.
        
        Rules:
        - P1-P2: Very simple (SVO structure), basic vocabulary (family, school, colors). Max 6 words.
        - P3-P4: Moderate (add adjectives, simple past tense). Max 9 words.
        - P5-P6: Advanced (complex sentences, future tense, perfect tense). Max 12 words.
        - The sentence must be polite and positive.
        - OUTPUT ONLY THE SENTENCE. No quotes, no explanations.
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text().trim(); // 拎個結果出嚟

      setCurrentSentence({ text: text, level: grade });
    } catch (error) {
      console.error("AI 出錯:", error);
      alert("AI 腦閉塞，請檢查 API Key 或者網絡！(暫時用舊題目頂住先)");
      setCurrentSentence({ text: "Have a nice day!", level: "Fallback" });
    } finally {
      setIsLoading(false); // 完成
    }
  };

  // --- 按下 P1-P6 按鈕時 ---
  const handleGradeChange = (grade) => {
    setSelectedGrade(grade);
    generateQuestion(grade); // 即刻出一題新嘅
  };

  // --- 其他原有功能 (朗讀、錄音) ---
  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    // 嘗試搵靚聲
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.lang.includes('en') && (v.name.includes('Google') || v.name.includes('Samantha')));
    if (preferredVoice) utterance.voice = preferredVoice;
    utterance.lang = 'en-US';
    utterance.rate = 0.8; 
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

      // 計分邏輯 (寬容版)
      const cleanText = (str) => str.toLowerCase().replace(/[.,?!]/g, "");
      const spokenWords = cleanText(speechToText).split(" ");
      const targetWords = cleanText(currentSentence.text).split(" ");
      
      let matchCount = 0;
      targetWords.forEach(word => { if (spokenWords.includes(word)) matchCount++; });
      const accuracy = Math.round((matchCount / targetWords.length) * 100);
      
      setScore(accuracy);
      setFeedback(accuracy === 100 ? "太棒了！🎉" : accuracy > 70 ? "很好！👍" : "再試一次💪");

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
      setIsListening(false);
    }
  };

  const resetHighScore = () => {
    if(window.confirm("確定要清除最高分紀錄？")) {
      setHighScore(0);
      localStorage.removeItem('highScore');
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'sans-serif', backgroundColor: '#e0f7fa', minHeight: '100vh' }}>
      <style>{`
        @keyframes pulse-red { 0% { transform: scale(1); } 50% { transform: scale(1.05); opacity: 0.8; } 100% { transform: scale(1); } }
        .blinking { animation: pulse-red 1s infinite; background-color: #ff4d4d !important; border: 2px solid white; }
        .grade-btn { margin: 5px; padding: 10px 15px; border: none; border-radius: 10px; cursor: pointer; font-weight: bold; background: #ddd; color: #555; transition: 0.2s; }
        .grade-btn.active { background: #007AFF; color: white; transform: scale(1.1); box-shadow: 0 4px 8px rgba(0,122,255,0.3); }
        .loading-spinner { display: inline-block; width: 20px; height: 20px; border: 3px solid rgba(255,255,255,.3); border-radius: 50%; border-top-color: #fff; animation: spin 1s ease-in-out infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <h1 style={{ color: '#006064', marginBottom: '10px' }}>🦁 AI 英文口語老師</h1>
      
      {/* 難度選擇按鈕 */}
      <div style={{ marginBottom: '20px', background: 'white', padding: '10px', borderRadius: '15px', display: 'inline-block' }}>
        <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#888' }}>📚 選擇年級 (香港課程)</p>
        {['P1', 'P2', 'P3', 'P4', 'P5', 'P6'].map((grade) => (
          <button 
            key={grade}
            className={`grade-btn ${selectedGrade === grade ? 'active' : ''}`}
            onClick={() => handleGradeChange(grade)}
            disabled={isLoading}
          >
            {grade}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '15px' }}>
        <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#006064', marginRight: '10px' }}>🏆 最高分：{highScore}%</span>
        <button onClick={resetHighScore} style={{ fontSize: '12px', padding: '2px 8px', borderRadius: '5px', border: '1px solid #ccc', background: 'white', cursor: 'pointer' }}>🔄</button>
      </div>
      
      <div style={{ background: 'white', padding: '25px', borderRadius: '20px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', marginBottom: '20px', minHeight: '180px' }}>
        {isLoading ? (
          <div style={{ paddingTop: '50px' }}>
            <div style={{ fontSize: '40px' }}>🤖</div>
            <p>AI 老師出題中...</p>
          </div>
        ) : (
          <>
            <p style={{ fontSize: '24px', margin: '20px 0', lineHeight: '1.4' }}><strong>{currentSentence.text}</strong></p>
            <p style={{ color: '#aaa', fontSize: '12px' }}>難度: {currentSentence.level}</p>

            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '25px' }}>
              {!isListening ? (
                <button onClick={startListening} style={{ fontSize: '18px', padding: '12px 25px', borderRadius: '15px', border: 'none', background: '#4CAF50', color: 'white', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 0 #388E3C' }}>
                  🎙️ 讀一次
                </button>
              ) : (
                <button onClick={stopListening} className="blinking" style={{ fontSize: '18px', padding: '12px 25px', borderRadius: '15px', border: 'none', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>
                  🛑 停止
                </button>
              )}

              <button onClick={() => speak(currentSentence.text)} style={{ fontSize: '18px', padding: '12px 25px', borderRadius: '15px', border: 'none', background: '#007AFF', color: 'white', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 0 #0056b3' }}>
                🔊 聽示範
              </button>
            </div>
          </>
        )}
      </div>

      {score !== null && !isLoading && (
        <div style={{ background: 'white', padding: '20px', borderRadius: '15px', marginTop: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '30px', color: score > 70 ? '#4CAF50' : '#FF9800', margin: '10px 0' }}>{score}%</h2>
          <p style={{ fontSize: '20px', margin: '10px 0' }}>{feedback}</p>
          <p style={{ fontStyle: 'italic', color: '#888', fontSize: '14px' }}>"{transcript}"</p>
          
          <button 
            style={{ marginTop: '15px', padding: '12px 30px', fontSize: '18px', borderRadius: '12px', cursor: 'pointer', backgroundColor: '#FF9800', color: 'white', border: 'none', fontWeight: 'bold', boxShadow: '0 4px 0 #F57C00' }}
            onClick={() => generateQuestion(selectedGrade)}
          >
            下一題 (AI) ➡️
          </button>
        </div>
      )}
    </div>
  );
}
