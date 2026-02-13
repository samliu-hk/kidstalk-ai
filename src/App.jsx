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
  P3: [ // P3 題目
{ en: "I was at home yesterday.", zh: "我昨天在家。" }, { en: "Where were you last night?", zh: "你昨晚在哪裡？" },
{ en: "They were in the garden.", zh: "他們剛才在花園。" }, { en: "A doctor works in a hospital.", zh: "醫生在醫院工作。" },
{ en: "A teacher works in a school.", zh: "老師在學校工作。" }, { en: "A fireman puts out fires.", zh: "消防員滅火。" },
{ en: "A policeman catches thieves.", zh: "警察捉賊。" }, { en: "I want to be a nurse.", zh: "我想當護士。" },
{ en: "My favorite subject is English.", zh: "我最喜歡的科目是英文。" }, { en: "Maths is difficult.", zh: "數學很難。" },
{ en: "General Studies is interesting.", zh: "常識科很有趣。" }, { en: "How many students are there?", zh: "那裡有多少個學生？" },
{ en: "There are thirty students.", zh: "有三十個學生。" }, { en: "I always do my homework.", zh: "我總是做功課。" },
{ en: "She sometimes goes to the park.", zh: "她有時去公園。" }, { en: "He never eats junk food.", zh: "他從不吃零食。" },
{ en: "What time do you go to bed?", zh: "你幾點睡覺？" }, { en: "I go to bed at nine-thirty.", zh: "我九點半睡覺。" },
{ en: "The supermarket is busy.", zh: "超市很繁忙。" }, { en: "The market is noisy.", zh: "街市很吵。" },
{ en: "The park is quiet.", zh: "公園很安靜。" }, { en: "Can I help you?", zh: "我可以幫你嗎？" },
{ en: "How do I get to the post office?", zh: "去郵局怎麼走？" }, { en: "Go straight and turn left.", zh: "直行然後左轉。" },
{ en: "It is opposite the bank.", zh: "在銀行對面。" }, { en: "The cat is behind the sofa.", zh: "貓在沙發後面。" },
{ en: "The dog is in front of the gate.", zh: "狗在門口前面。" }, { en: "Between the car and the bus.", zh: "在私家車和巴士之間。" },
{ en: "My father is a clerk.", zh: "我的爸爸是文員。" }, { en: "My mother is a housewife.", zh: "我的媽媽是家庭主婦。" },
{ en: "I am proud of you.", zh: "我為你感到自豪。" }, { en: "Do your best.", zh: "盡力而為。" },
{ en: "Don't give up.", zh: "不要放棄。" }, { en: "Practice makes perfect.", zh: "熟能生巧。" },
{ en: "A glass of water.", zh: "一杯水。" }, { en: "A bowl of noodles.", zh: "一碗麵。" },
{ en: "A slice of bread.", zh: "一片麵包。" }, { en: "A packet of candies.", zh: "一包糖。" },
{ en: "How much is the toy?", zh: "這個玩具多少錢？" }, { en: "It costs fifty dollars.", zh: "售價五十元。" },
{ en: "It is too expensive.", zh: "太貴了。" }, { en: "It is cheap.", zh: "很便宜。" },
{ en: "I like collecting stamps.", zh: "我喜歡集郵。" }, { en: "She likes drawing pictures.", zh: "她喜歡畫畫。" },
{ en: "He likes playing chess.", zh: "他喜歡下棋。" }, { en: "We like hiking.", zh: "我們喜歡行山。" },
{ en: "The weather is humid.", zh: "天氣潮濕。" }, { en: "It is foggy.", zh: "有霧。" },
{ en: "A thunderstorm is coming.", zh: "雷暴快到了。" }, { en: "The wind is blowing.", zh: "風正在吹。" },
{ en: "I feel dizzy.", zh: "我覺得頭暈。" }, { en: "I have a cold.", zh: "我感冒了。" },
{ en: "He has a cough.", zh: "他咳嗽。" }, { en: "She has a stomach ache.", zh: "她胃痛。" },
{ en: "Drink more warm water.", zh: "多飲暖水。" }, { en: "See a doctor.", zh: "睇醫生。" },
{ en: "Take a rest.", zh: "休息一下。" }, { en: "Wash your hands before meals.", zh: "飯前洗手。" },
{ en: "Keep the environment clean.", zh: "保持環境清潔。" }, { en: "Recycle the paper.", zh: "回收廢紙。" },
{ en: "Save energy.", zh: "節約能源。" }, { en: "Turn off the lights.", zh: "關燈。" },
{ en: "Don't waste water.", zh: "不要浪費水。" }, { en: "The Earth is our home.", zh: "地球是我們的家。" },
{ en: "Plant more trees.", zh: "種植更多樹木。" }, { en: "I am a scout.", zh: "我是一名童軍。" },
{ en: "Join the school choir.", zh: "加入學校合唱團。" }, { en: "Play the violin.", zh: "拉小提琴。" },
{ en: "Play the recorder.", zh: "吹牧童笛。" }, { en: "Winning is not everything.", zh: "贏不代表一切。" },
{ en: "The grasshopper is lazy.", zh: "草蜢很懶。" }, { en: "The ant is hardworking.", zh: "螞蟻很勤奮。" },
{ en: "Slow and steady wins the race.", zh: "穩紮穩打，功到自然成。" }, { en: "Honesty is the best policy.", zh: "誠實是上策。" },
{ en: "Be polite to everyone.", zh: "對每個人都要有禮貌。" }, { en: "Help the elderly.", zh: "幫助長者。" },
{ en: "Give your seat to others.", zh: "讓位給別人。" }, { en: "I love Hong Kong.", zh: "我愛香港。" },
{ en: "The Peak is beautiful.", zh: "山頂很美。" }, { en: "Visit the museum.", zh: "參觀博物館。" },
{ en: "Go to the library.", zh: "去圖書館。" }, { en: "Read more books.", zh: "閱讀更多書。" },
{ en: "I enjoy reading.", zh: "我享受閱讀。" }, { en: "Stories are fun.", zh: "故事很有趣。" },
{ en: "Learn new words.", zh: "學習新詞。" }, { en: "Speak English every day.", zh: "每天說英語。" },
{ en: "Don't be afraid of mistakes.", zh: "不要害怕出錯。" }, { en: "You can do it.", zh: "你能做到的。" },
{ en: "I am helpful.", zh: "我樂於助人。" }, { en: "You are smart.", zh: "你很聰明。" },
{ en: "The elephant is the heaviest.", zh: "大象是最重的。" }, { en: "The cheetah is the fastest.", zh: "獵豹是最快的。" },
{ en: "Summer is hot.", zh: "夏天很熱。" }, { en: "Winter is cold.", zh: "冬天很冷。" },
{ en: "Spring is warm.", zh: "春天很暖。" }, { en: "Autumn is cool.", zh: "秋天很涼。" },
{ en: "Mooncakes are for Mid-Autumn.", zh: "中秋節吃月餅。" }, { en: "Dragon boats in Tuen Ng.", zh: "端午節賽龍舟。" },
{ en: "Dumplings are yummy.", zh: "餃子很好吃。" }, { en: "Happy holidays.", zh: "假期快樂。" } ],
  P4: [// P4 題目
{ en: "I went to the ocean park last Sunday.", zh: "我上星期日去了海洋公園。" }, { en: "He saw a giant panda.", zh: "他看見了一隻大熊貓。" },
{ en: "She bought a souvenir.", zh: "她買了一件紀念品。" }, { en: "We ate sandwiches for lunch.", zh: "我們午餐食了三文治。" },
{ en: "Did you finish your homework?", zh: "你完成功課了嗎？" }, { en: "Yes, I finished it.", zh: "是的，我完成了。" },
{ en: "No, I didn't finish it.", zh: "不，我未完成。" }, { en: "He didn't play games yesterday.", zh: "他昨天沒有玩遊戲。" },
{ en: "I am taller than my brother.", zh: "我比我的哥哥高。" }, { en: "This bag is more expensive than that one.", zh: "這個袋比那個貴。" },
{ en: "Goldfish are easier to keep than dogs.", zh: "金魚比狗容易養。" }, { en: "The tortoise is slower than the hare.", zh: "烏龜比野兔慢。" },
{ en: "Who is the cleverest student?", zh: "誰是最聰明的學生？" }, { en: "Peter is the tallest boy in class.", zh: "彼得是班中最高的男生。" },
{ en: "Health is more important than money.", zh: "健康比金錢重要。" }, { en: "I like apples because they are healthy.", zh: "我喜歡蘋果，因為它們很健康。" },
{ en: "She was late because she missed the bus.", zh: "她遲到是因為她錯過了巴士。" }, { en: "Wait for the bus at the bus stop.", zh: "在巴士站等巴士。" },
{ en: "Cross the road at the zebra crossing.", zh: "在斑馬線過馬路。" }, { en: "Don't play on the stairs.", zh: "不要在樓梯玩耍。" },
{ en: "Be careful when using the scissors.", zh: "用剪刀時要小心。" }, { en: "I want to join the swimming gala.", zh: "我想參加水運會。" },
{ en: "We practiced hard for the race.", zh: "我們為比賽努力練習。" }, { en: "He won the gold medal.", zh: "他贏得了金牌。" },
{ en: "She came first in the running race.", zh: "她在跑步比賽中得到第一名。" }, { en: "Congratulations on your success.", zh: "恭喜你成功。" },
{ en: "What's the matter with you?", zh: "你怎麼了？" }, { en: "I have a fever and a headache.", zh: "我發燒而且頭痛。" },
{ en: "Stay in bed and drink more water.", zh: "臥床休息並多喝水。" }, { en: "The doctor gave me some medicine.", zh: "醫生給我開了一些藥。" },
{ en: "The film was exciting.", zh: "那部電影很刺激。" }, { en: "The book was boring.", zh: "那本書很乏味。" },
{ en: "I was surprised by the news.", zh: "我對那個消息感到驚訝。" }, { en: "We were tired after the hike.", zh: "遠足後我們很累。" },
{ en: "The cake smells delicious.", zh: "那蛋糕聞起來好香。" }, { en: "The music sounds peaceful.", zh: "這音樂聽起來很平靜。" },
{ en: "The silk feels smooth.", zh: "這絲綢摸起來很滑。" }, { en: "The lemon tastes sour.", zh: "檸檬味酸。" },
{ en: "Sugar tastes sweet.", zh: "糖味甜。" }, { en: "Medicine tastes bitter.", zh: "藥味苦。" },
{ en: "How does it feel?", zh: "感覺如何？" }, { en: "I'm going to visit my grandma tomorrow.", zh: "我明天打算去探望祖母。" },
{ en: "What are you going to do this weekend?", zh: "你這個週末打算做什麼？" }, { en: "We are going to have a picnic.", zh: "我們打算去野餐。" },
{ en: "It is going to rain.", zh: "快要下雨了。" }, { en: "There's some milk in the fridge.", zh: "雪櫃裡有一些牛奶。" },
{ en: "Are there any oranges in the basket?", zh: "籃子裡有橙嗎？" }, { en: "There isn't any juice left.", zh: "沒有果汁剩下了。" },
{ en: "How many eggs do we need?", zh: "我們需要多少個蛋？" }, { en: "How much sugar do we need?", zh: "我們需要多少糖？" },
{ en: "A bar of chocolate.", zh: "一排朱古力。" }, { en: "A carton of milk.", zh: "一盒牛奶。" },
{ en: "A loaf of bread.", zh: "一條麵包。" }, { en: "A jar of jam.", zh: "一罐果醬。" },
{ en: "Put the ingredients into the bowl.", zh: "將材料放入碗中。" }, { en: "Mix them well.", zh: "將它們混合均勻。" },
{ en: "Bake it for twenty minutes.", zh: "烘烤二十分鐘。" }, { en: "Let's share the food.", zh: "我們分享食物吧。" },
{ en: "The library is on the second floor.", zh: "圖書館在二樓。" }, { en: "Take the lift to the fifth floor.", zh: "搭電梯去五樓。" },
{ en: "Walk up the stairs.", zh: "行樓梯上去。" }, { en: "The toilet is down the hall.", zh: "洗手間在走廊盡頭。" },
{ en: "Look left and right before crossing.", zh: "過馬路前望左望右。" }, { en: "Follow the traffic rules.", zh: "遵守交通規則。" },
{ en: "Don't lean out of the window.", zh: "不要伸出窗外。" }, { en: "Keep your seatbelt fastened.", zh: "扣緊安全帶。" },
{ en: "The dog is cleverer than the cat.", zh: "狗比貓聰明。" }, { en: "Maths is harder than English.", zh: "數學比英文難。" },
{ en: "Drawing is more interesting than chess.", zh: "畫畫比下棋有趣。" }, { en: "Which is the largest animal?", zh: "哪種是最大的動物？" },
{ en: "The blue whale is the largest.", zh: "藍鯨是最大的。" }, { en: "Antarctica is the coldest place.", zh: "南極洲是最冷的地方。" },
{ en: "He runs as fast as lightning.", zh: "他跑得像閃電一樣快。" }, { en: "She sings like an angel.", zh: "她唱歌像天使一樣。" },
{ en: "He is as busy as a bee.", zh: "他忙得不可開交。" }, { en: "Keep the room tidy.", zh: "保持房間整潔。" },
{ en: "Fold your clothes.", zh: "摺衫。" }, { en: "Make your bed every morning.", zh: "每天早上整理床鋪。" },
{ en: "Sweep the floor.", zh: "掃地。" }, { en: "Help with the housework.", zh: "幫手做家務。" },
{ en: "Be a responsible person.", zh: "做個負責任的人。" }, { en: "Listen to your parents.", zh: "聽父母的話。" },
{ en: "Respect your teachers.", zh: "尊重老師。" }, { en: "Be honest with your friends.", zh: "對朋友誠實。" },
{ en: "Time is precious.", zh: "時間是寶貴的。" }, { en: "Waste not, want not.", zh: "勤儉節約，吃穿不缺。" },
{ en: "A friend in need is a friend indeed.", zh: "患難見真情。" }, { en: "Every cloud has a silver lining.", zh: "黑暗中總有一線曙光。" },
{ en: "Actions speak louder than words.", zh: "行動勝於言語。" }, { en: "Books are our best friends.", zh: "書是我們最好的朋友。" },
{ en: "Reading enriches our mind.", zh: "閱讀充實我們的頭腦。" }, { en: "Learn from your mistakes.", zh: "從錯誤中學習。" },
{ en: "The stars are shining.", zh: "星星正在閃爍。" }, { en: "The moon is bright tonight.", zh: "今晚月亮很亮。" },
{ en: "I am interested in space.", zh: "我對太空感興趣。" }, { en: "Astronauts go to the moon.", zh: "太空人去月球。" },
{ en: "Earth is a beautiful planet.", zh: "地球是一顆美麗的星球。" }, { en: "Protect our environment.", zh: "保護我們的環境。" },
{ en: "Don't use plastic bags.", zh: "不要用塑膠袋。" }, { en: "Bring your own water bottle.", zh: "自備水樽。" } ],
  P5: [// P5 題目
{ en: "I have been to Japan twice.", zh: "我去過日本兩次。" }, { en: "Have you ever seen a koala?", zh: "你見過樹熊嗎？" },
{ en: "She has already finished her project.", zh: "她已經完成了她的專題研習。" }, { en: "He hasn't cleaned his room yet.", zh: "他還未清潔他的房間。" },
{ en: "I have known him for five years.", zh: "我已經認識他五年了。" }, { en: "They have lived here since 2010.", zh: "他們自 2010 年起就住在這裏。" },
{ en: "If it rains, we will stay at home.", zh: "如果下雨，我們會留在家中。" }, { en: "If you study hard, you will pass.", zh: "如果你努力讀書，你就會合格。" },
{ en: "You will be late if you don't hurry.", zh: "如果你不快點，你就會遲到。" }, { en: "If I have enough money, I'll buy it.", zh: "如果我有足夠的錢，我就會買下它。" },
{ en: "You should eat more vegetables.", zh: "你應該多吃蔬菜。" }, { en: "You shouldn't play too many games.", zh: "你不應該玩太多遊戲。" },
{ en: "We must protect the forest.", zh: "我們必須保護森林。" }, { en: "You mustn't smoke in public.", zh: "你禁止在公共場合吸煙。" },
{ en: "May I borrow your ruler?", zh: "我可以借你的尺嗎？" }, { en: "Could you tell me the way?", zh: "你能告訴我路怎麼走嗎？" },
{ en: "Would you like some tea?", zh: "你想喝點茶嗎？" }, { en: "I'd rather stay at home.", zh: "我寧願留在家中。" },
{ en: "Both Peter and Tom are tall.", zh: "彼得和湯姆都很高。" }, { en: "Either you or I must go.", zh: "不是你就是我必須去。" },
{ en: "Neither he nor she likes durian.", zh: "他和他都不喜歡榴槤。" }, { en: "Not only smart but also kind.", zh: "不僅聰明而且善良。" },
{ en: "I'm interested in science.", zh: "我對科學感興趣。" }, { en: "The book is interesting.", zh: "這本書很有趣。" },
{ en: "I'm bored with this game.", zh: "我對這個遊戲感到厭倦。" }, { en: "The movie was boring.", zh: "那部電影很沉悶。" },
{ en: "I am excited about the trip.", zh: "我對這次旅行感到興奮。" }, { en: "It was an exciting match.", zh: "那是一場令人興奮的比賽。" },
{ en: "Pollution is a serious problem.", zh: "污染是一個嚴重的問題。" }, { en: "Global warming is getting worse.", zh: "全球暖化正在惡化。" },
{ en: "We should recycle plastic bottles.", zh: "我們應該回收塑膠樽。" }, { en: "Save energy to protect the Earth.", zh: "節約能源以保護地球。" },
{ en: "Don't waste food.", zh: "不要浪費食物。" }, { en: "Plant more flowers in the garden.", zh: "在花園裡種更多花。" },
{ en: "Electronic waste is harmful.", zh: "電子垃圾是有害的。" }, { en: "Use less air conditioning.", zh: "少開冷氣。" },
{ en: "I have a balanced diet.", zh: "我有均衡的飲食。" }, { en: "Doing exercise keeps us fit.", zh: "做運動讓我們保持健康。" },
{ en: "Get enough sleep every night.", zh: "每晚要有充足的睡眠。" }, { en: "Breakfast is the most important meal.", zh: "早餐是最重要的一餐。" },
{ en: "Avoid eating too much sugar.", zh: "避免攝取過多糖分。" }, { en: "Wash your hands with soap.", zh: "用肥皂洗手。" },
{ en: "I want to be a scientist.", zh: "我想成為一名科學家。" }, { en: "An engineer designs buildings.", zh: "工程師設計建築物。" },
{ en: "A reporter interviews people.", zh: "記者採訪大眾。" }, { en: "A chef cooks delicious food.", zh: "廚師煮好吃的食物。" },
{ en: "Follow your dreams.", zh: "追求你的夢想。" }, { en: "Believe in yourself.", zh: "相信你自己。" },
{ en: "Hard work leads to success.", zh: "努力會導向成功。" }, { en: "Never give up hope.", zh: "永不放棄希望。" },
{ en: "The Great Wall is in China.", zh: "長城在中國。" }, { en: "Paris is famous for the tower.", zh: "巴黎以鐵塔聞名。" },
{ en: "I want to travel around the world.", zh: "我想環遊世界。" }, { en: "Learning a language is fun.", zh: "學習一種語言很有趣。" },
{ en: "People celebrate Easter.", zh: "人們慶祝復活節。" }, { en: "Giving is better than receiving.", zh: "施比受更有福。" },
{ en: "Help those in need.", zh: "幫助有需要的人。" }, { en: "Volunteers are wonderful.", zh: "志願者很棒。" },
{ en: "Respect different cultures.", zh: "尊重不同的文化。" }, { en: "Be a global citizen.", zh: "做個全球公民。" },
{ en: "Technology changes our lives.", zh: "科技改變我們的生活。" }, { en: "Smartphones are convenient.", zh: "智能手機很方便。" },
{ en: "Use the internet wisely.", zh: "明智地使用網絡。" }, { en: "Cyberbullying is wrong.", zh: "網絡欺凌是錯誤的。" },
{ en: "Protect your personal information.", zh: "保護你的個人資料。" }, { en: "Reading expands our horizons.", zh: "閱讀擴闊我們的視野。" },
{ en: "Knowledge is power.", zh: "知識就是力量。" }, { en: "Keep a diary every day.", zh: "每天寫日記。" },
{ en: "Good habits are important.", zh: "良好的習慣很重要。" }, { en: "Be punctual for school.", zh: "上學要準時。" },
{ en: "Say please and thank you.", zh: "說請和謝謝。" }, { en: "Queue up for the bus.", zh: "排隊等巴士。" },
{ en: "Respect the elderly.", zh: "尊重長者。" }, { en: "Don't speak with your mouth full.", zh: "食嘢時唔好講嘢。" },
{ en: "Cover your mouth when coughing.", zh: "咳嗽時捂住嘴巴。" }, { en: "The climate is changing.", zh: "氣候正在變化。" },
{ en: "Protect endangered animals.", zh: "保護瀕危動物。" }, { en: "The giant panda is rare.", zh: "大熊貓很稀有。" },
{ en: "Say no to plastic straws.", zh: "對塑膠飲管說不。" }, { en: "Walk more, drive less.", zh: "多走路，少開車。" },
{ en: "Reduce, reuse, and recycle.", zh: "減少使用、物盡其用、循環再造。" }, { en: "I feel stressed about exams.", zh: "我對考試感到壓力。" },
{ en: "Talk to your friends.", zh: "跟你的朋友傾訴。" }, { en: "Take a deep breath.", zh: "深呼吸。" },
{ en: "Think positively.", zh: "正面思考。" }, { en: "Failure is the mother of success.", zh: "失敗乃成功之母。" },
{ en: "Every day is a new start.", zh: "每一天都是新的開始。" }, { en: "Be grateful for what you have.", zh: "感激你所擁有的。" },
{ en: "Kindness costs nothing.", zh: "善良是免費的。" }, { en: "Smile more often.", zh: "多點微笑。" },
{ en: "Music makes me feel relaxed.", zh: "音樂讓我感到放鬆。" }, { en: "Hobbies make life colorful.", zh: "愛好讓生活多彩。" },
{ en: "Cooking is my favorite hobby.", zh: "煮食是我最愛的愛好。" }, { en: "I like photography.", zh: "我喜歡攝影。" },
{ en: "Take photos of nature.", zh: "拍攝大自然的照片。" }, { en: "The mountains are grand.", zh: "山脈很壯觀。" },
{ en: "The ocean is vast.", zh: "海洋很遼闊。" }, { en: "Enjoy the beauty of nature.", zh: "享受大自然的美。" },
{ en: "Have a wonderful weekend.", zh: "祝你有個美好的週末。" }, { en: "See you next week.", zh: "下星期見。" } ],
  P6: [ // P6 題目
{ en: "The window was broken by the ball.", zh: "窗戶被那個球打破了。" }, { en: "The book was written by a child.", zh: "這本書是由一個小孩寫的。" },
{ en: "America was discovered in 1492.", zh: "美洲於 1492 年被發現。" }, { en: "The trash is collected every day.", zh: "垃圾每天都被收集。" },
{ en: "English is spoken all over the world.", zh: "全世界都在說英語。" }, { en: "He said that he was tired.", zh: "他說他很累。" },
{ en: "She asked me where I lived.", zh: "她問我住在哪裡。" }, { en: "They told us to be quiet.", zh: "他們告訴我們要安靜。" },
{ en: "The girl who is singing is my sister.", zh: "正在唱歌的那個女孩是我的姐姐。" }, { en: "The cake which I made is tasty.", zh: "我做的那個蛋糕很好吃。" },
{ en: "The school where I study is big.", zh: "我就讀的那間學校很大。" }, { en: "Although it was raining, he went out.", zh: "雖然下著雨，他還是出去了。" },
{ en: "Unless you work hard, you won't win.", zh: "除非你努力，否則你不會贏。" }, { en: "Not only is he smart, but he is also kind.", zh: "他不僅聰明，而且善良。" },
{ en: "In order to pass, we must study.", zh: "為了合格，我們必須讀書。" }, { en: "So that I can see, I wear glasses.", zh: "為了能看得見，我戴眼鏡。" },
{ en: "I look forward to secondary school.", zh: "我期待中學生活。" }, { en: "Graduation is a big milestone.", zh: "畢業是一個重要的里程碑。" },
{ en: "I will miss my primary school teachers.", zh: "我會想念我的小學老師。" }, { en: "Keep in touch with your friends.", zh: "與你的朋友保持聯絡。" },
{ en: "Success requires persistence.", zh: "成功需要堅持。" }, { en: "Time management is important.", zh: "時間管理很重要。" },
{ en: "Balance study and play.", zh: "平衡學習和娛樂。" }, { en: "Learn to be independent.", zh: "學習獨立。" },
{ en: "Face your challenges bravely.", zh: "勇敢地面對挑戰。" }, { en: "Solve problems by yourself.", zh: "自己解決問題。" },
{ en: "Respect everyone's opinion.", zh: "尊重每個人的意見。" }, { en: "Cooperation leads to better results.", zh: "合作會帶來更好的結果。" },
{ en: "Be a responsible leader.", zh: "做個負責任的領袖。" }, { en: "Teamwork is essential.", zh: "團隊合作是不可或缺的。" },
{ en: "Volunteering is meaningful.", zh: "做義工很有意義。" }, { en: "Help the underprivileged.", zh: "幫助弱勢社群。" },
{ en: "Donate your old clothes.", zh: "捐贈你的舊衣服。" }, { en: "Charity begins at home.", zh: "仁愛始於家庭。" },
{ en: "Global issues affect us all.", zh: "全球議題影響我們所有人。" }, { en: "Poverty is a global problem.", zh: "貧困是一個全球性問題。" },
{ en: "Education is a basic right.", zh: "教育是一項基本權利。" }, { en: "Peace is better than war.", zh: "和平勝於戰爭。" },
{ en: "Protect our cultural heritage.", zh: "保護我們的文化遺產。" }, { en: "Be proud of your heritage.", zh: "為你的遺產感到自豪。" },
{ en: "Climate change is a big threat.", zh: "氣候變化是一個巨大威脅。" }, { en: "Renewable energy is the future.", zh: "再生能源是未來。" },
{ en: "Solar power is clean.", zh: "太陽能是清潔的。" }, { en: "Wind turbines generate electricity.", zh: "風力發電機發電。" },
{ en: "Stop deforestation.", zh: "停止砍伐森林。" }, { en: "Animals are losing their homes.", zh: "動物正失去家園。" },
{ en: "We should live a green life.", zh: "我們應該過綠色生活。" }, { en: "Reduce your carbon footprint.", zh: "減少你的碳足跡。" },
{ en: "I want to be a lawyer.", zh: "我想成為一名律師。" }, { en: "A journalist reports the truth.", zh: "記者報導真相。" },
{ en: "A psychologist helps people.", zh: "心理學家幫助大眾。" }, { en: "An artist expresses feelings.", zh: "藝術家表達情感。" },
{ en: "Explore your potential.", zh: "探索你的潛力。" }, { en: "The sky is the limit.", zh: "天空才是極限（意即無限可能）。" },
{ en: "Follow your passion.", zh: "跟隨你的熱情。" }, { en: "Believe you can and you're halfway there.", zh: "相信你能做到，你就已經成功了一半。" },
{ en: "The internet has its pros and cons.", zh: "互聯網有其利弊。" }, { en: "Be critical of online news.", zh: "對網上新聞保持批判性思考。" },
{ en: "Social media connects people.", zh: "社交媒體連繫大眾。" }, { en: "Avoid spending too much time online.", zh: "避免花太多時間上網。" },
{ en: "Artificial intelligence is developing fast.", zh: "人工智能發展迅速。" }, { en: "Robots can help humans.", zh: "機械人可以幫助人類。" },
{ en: "Technology is a double-edged sword.", zh: "科技是一把雙刃劍。" }, { en: "Use apps for learning.", zh: "使用應用程式學習。" },
{ en: "Keep a healthy body and mind.", zh: "保持身心健康。" }, { en: "Deal with stress effectively.", zh: "有效應對壓力。" },
{ en: "Hobbies provide relaxation.", zh: "愛好提供放鬆。" }, { en: "Self-discipline is the key.", zh: "自律是關鍵。" },
{ en: "Be honest and trustworthy.", zh: "要做一個誠實守信的人。" }, { en: "Courtesy costs nothing.", zh: "禮貌是免費的。" },
{ en: "A promise is a promise.", zh: "承諾就是承諾。" }, { en: "Admit your mistakes.", zh: "承認你的錯誤。" },
{ en: "Forgive and forget.", zh: "寬恕並忘記。" }, { en: "Kindness is a language.", zh: "善良是一種語言。" },
{ en: "A small act makes a difference.", zh: "一個小行動就能帶來改變。" }, { en: "The environment belongs to us.", zh: "環境屬於我們所有人。" },
{ en: "Air pollution is harmful to health.", zh: "空氣污染對健康有害。" }, { en: "Save the oceans.", zh: "拯救海洋。" },
{ en: "No more plastic waste.", zh: "不再有塑膠垃圾。" }, { en: "Protect our wildlife.", zh: "保護我們的野生動物。" },
{ en: "Extinction is forever.", zh: "滅絕是永恆的（意即不可挽回）。" }, { en: "Think global, act local.", zh: "全球思考，在地行動。" },
{ en: "Every drop counts.", zh: "滴水成河（意即每一點都很重要）。" }, { en: "Happiness is a choice.", zh: "快樂是一種選擇。" },
{ en: "Stay curious about the world.", zh: "對世界保持好奇心。" }, { en: "Continuous learning is vital.", zh: "持續學習至關重要。" },
{ en: "Set goals for your future.", zh: "為你的未來設定目標。" }, { en: "Dream big, work hard.", zh: "夢想要大，努力要足。" },
{ en: "Value your friendships.", zh: "珍惜你的友誼。" }, { en: "Loyalty is rare.", zh: "忠誠是罕見的。" },
{ en: "Good books change lives.", zh: "好書改變人生。" }, { en: "Literature is fascinating.", zh: "文學很有吸引力。" },
{ en: "Writing clarifies thoughts.", zh: "寫作理清思路。" }, { en: "Debating improves logic.", zh: "辯論提高邏輯能力。" },
{ en: "Public speaking builds confidence.", zh: "公開演講建立信心。" }, { en: "Life is a journey.", zh: "人生是一場旅程。" },
{ en: "Cherish every moment.", zh: "珍惜每一刻。" }, { en: "Experience is the best teacher.", zh: "經驗是最好的老師。" },
{ en: "The future is in your hands.", zh: "未來掌握在你手中。" }, { en: "Go forth and conquer.", zh: "去前進並征服吧。" } ]
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
