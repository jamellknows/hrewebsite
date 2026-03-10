import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, } from "framer-motion";
import { Home, Building2, PenTool, Earth, EarthLock, Cross } from "lucide-react";
import './App.css';
import React, { useState, useEffect, useRef, useCallback } from "react";
import crownImage from './srcImages/crown.jpg'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Fix marker icon issue in Leaflet (important)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
});

// Center coordinates of San Marino
const sanMarinoCenter = [43.9424, 12.4578];

const niqqudData = [
  { char: "א", name: "None", position: "None", sound: "Silent / carrier for vowels", value: 1 },
  { char: "אְ", name: "Sheva", position: "Below", sound: "Very short 'e' or silent", value: 100000 },
  { char: "אֱ", name: "Hataf Segol", position: "Below", sound: "Very short 'eh'", value: 100000000 },
  { char: "אֲ", name: "Hataf Patah", position: "Below", sound: "Very short 'ah'", value: 1000000000 },
  { char: "אֳ", name: "Hataf Qamats", position: "Below", sound: "Very short 'o'", value: 100000000000 },
  { char: "אִ", name: "Hiriq", position: "Below", sound: "ee as in 'machine'", value: 10 },
  { char: "אֵ", name: "Tsere", position: "Below", sound: "ay as in 'they'", value: 100 },
  { char: "אֶ", name: "Segol", position: "Below", sound: "eh as in 'bed'", value: 1000 },
  { char: "אַ", name: "Patah", position: "Below", sound: "a as in 'father'", value: 10000 },
  { char: "אָ", name: "Qamats", position: "Below", sound: "ah / aw depending on context", value: 1000000 },
  { char: "אֹ", name: "Holam", position: "Above", sound: "oh as in 'go'", value: 10 },
  { char: "אֻ", name: "Qubuts", position: "Below", sound: "oo as in 'food'", value: 1000 },
  { char: "אּ", name: "Dagesh", position: "Inside", sound: "Consonant strengthening / stop", value: 10 },
  { char: "אֽ", name: "Meteg", position: "Beside", sound: "Stress / vowel length marker", value: 10000000 },
  { char: "אֿ", name: "Rafe", position: "Above", sound: "Soft consonant marker", value: 10000 },
  { char: "אׁ", name: "Shin Dot", position: "Above", sound: "sh sound (normally on ש)", value: 10 },
  { char: "אׂ", name: "Sin Dot", position: "Above", sound: "s sound (normally on ש)", value: 10 },
  { char: "אׇ", name: "Qamats Qatan", position: "Below", sound: "short 'o'", value: 1000000 },
];

function Card({ item }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      onClick={() => setFlipped(!flipped)}
      style={{
        width: "180px",
        height: "220px",
        perspective: "1000px",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          textAlign: "center",
          transition: "transform 0.6s",
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            border: "1px solid #ccc",
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "40px",
            background: "#ffffff",
          }}
        >
          <div>{item.char}</div>
          <div style={{ fontSize: "16px", marginTop: "12px" }}>{item.name}</div>
        </div>

        {/* Back */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            border: "1px solid #ccc",
            borderRadius: "12px",
            padding: "16px",
            background: "#f5f5f5",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div><strong>Position:</strong> {item.position}</div>
          <div style={{ marginTop: "10px" }}>
            <strong>Sound:</strong> {item.sound}
          </div>
          <div style={{ marginTop: "10px" }}>
            <strong>Value:</strong> {item.value}
          </div>
        </div>
      </div>
    </div>
  );
}

function NiqqudExplanation() {
  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>Niqqud Explanation</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "row", // horizontal layout
          flexWrap: "wrap",     // allow cards to wrap to next line
          gap: "20px",          // spacing between cards
          justifyContent: "center", // center horizontally
          marginTop: "30px",
        }}
      >
        {niqqudData.map((item, index) => (
          <Card key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

const letterValues = {
  א: 1, ב: 2, ג: 3, ד: 4, ה: 5,
  ו: 6, ז: 7, ח: 8, ט: 9,
  י: 10, כ: 20, ך: 20,
  ל: 30,
  מ: 40, ם: 40,
  נ: 50, ן: 50,
  ס: 60,
  ע: 70,
  פ: 80, ף: 80,
  צ: 90, ץ: 90,
  ק: 100,
  ר: 200,
  ש: 300,
  ת: 400
};



const greekLetterValues = {
  α: 1,
  β: 2,
  γ: 3,
  δ: 4,
  ε: 5,
  ϛ: 6, // digamma / stigma
  ζ: 7,
  η: 8,
  θ: 9,
  ι: 10,
  κ: 20,
  λ: 30,
  μ: 40,
  ν: 50,
  ξ: 60,
  ο: 70,
  π: 80,
  ϟ: 90, // koppa
  ρ: 100,
  σ: 200,
  τ: 300,
  υ: 400,
  φ: 500,
  χ: 600,
  ψ: 700,
  ω: 800,
  ϡ: 900, // sampi
};

function calculateGreekLetterValue(text) {
  // Remove spaces and convert to lowercase
  const letters = text.replace(/\s+/g, "").toLowerCase();
  let total = 0;
  for (let char of letters) {
    if (greekLetterValues[char]) {
      total += greekLetterValues[char];
    }
  }
  return total;
}

function GreekLetterCalculator() {
  const [text, setText] = useState("");

  const totalValue = calculateGreekLetterValue(text);

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>
        Greek Letter Value Calculator
      </h1>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type Greek letters here..."
        style={{
          width: "100%",
          maxWidth: "600px",
          height: "80px",
          fontSize: "24px",
          padding: "12px",
          marginTop: "20px",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "left", // Greek reads LTR
          direction: "ltr",
        }}
      />

      <div
        style={{
          marginTop: "20px",
          fontSize: "20px",
          textAlign: "center",
        }}
      >
        Total Letter Value: <strong>{totalValue}</strong>
      </div>
    </div>
  );
}

  const armenianLetters = [
{u:"Ա",l:"ա",v:1,s:"Ayb"},
{u:"Բ",l:"բ",v:2,s:"Ben"},
{u:"Գ",l:"գ",v:3,s:"Gim"},
{u:"Դ",l:"դ",v:4,s:"Da"},
{u:"Ե",l:"ե",v:5,s:"Ech"},
{u:"Զ",l:"զ",v:6,s:"Za"},
{u:"Է",l:"է",v:7,s:"Eh"},
{u:"Ը",l:"ը",v:8,s:"Ut"},
{u:"Թ",l:"թ",v:9,s:"To"},
{u:"Ժ",l:"ժ",v:10,s:"Zhe"},
{u:"Ի",l:"ի",v:20,s:"Ini"},
{u:"Լ",l:"լ",v:30,s:"Liwn"},
{u:"Խ",l:"խ",v:40,s:"Khe"},
{u:"Ծ",l:"ծ",v:50,s:"Tsa"},
{u:"Կ",l:"կ",v:60,s:"Ken"},
{u:"Հ",l:"հ",v:70,s:"Ho"},
{u:"Ձ",l:"ձ",v:80,s:"Dza"},
{u:"Ղ",l:"ղ",v:90,s:"Ghad"},
{u:"Ճ",l:"ճ",v:100,s:"Che"},
{u:"Մ",l:"մ",v:200,s:"Men"},
{u:"Յ",l:"յ",v:300,s:"Yi"},
{u:"Ն",l:"ն",v:400,s:"Now"},
{u:"Շ",l:"շ",v:500,s:"Sha"},
{u:"Ո",l:"ո",v:600,s:"Vo"},
{u:"Չ",l:"չ",v:700,s:"Cha"},
{u:"Պ",l:"պ",v:800,s:"Pe"},
{u:"Ջ",l:"ջ",v:900,s:"Jhe"},
{u:"Ռ",l:"ռ",v:1000,s:"Ra"},
{u:"Ս",l:"ս",v:2000,s:"Se"},
{u:"Վ",l:"վ",v:3000,s:"Vew"},
{u:"Տ",l:"տ",v:4000,s:"Tiwn"},
{u:"Ր",l:"ր",v:5000,s:"Re"},
{u:"Ց",l:"ց",v:6000,s:"Co"},
{u:"Ւ",l:"ւ",v:7000,s:"Yiwn"},
{u:"Փ",l:"փ",v:8000,s:"Piwr"},
{u:"Ք",l:"ք",v:9000,s:"Keh"},

// letters without numeric values
{u:"Օ",l:"օ",v:null,s:"O"},
{u:"Ֆ",l:"ֆ",v:null,s:"F"},
{u:"և",l:"և",v:null,s:"Ev"}
  ];

  const valueMap = {};
  armenianLetters.forEach(l=>{
  if(l.v){
  valueMap[l.u]=l.v;
  valueMap[l.l]=l.v;
  }
  });

function ArmenianAlphabet(){

const [flipped,setFlipped]=useState({});
const [input,setInput]=useState("");

function flip(letter){
setFlipped(prev=>({...prev,[letter]:!prev[letter]}));
}

let sum=0;
for(let char of input){
sum += valueMap[char] || 0;
}

return(

<div style={{fontFamily:"serif",padding:"40px"}}>

<h2 style={{textAlign:"center",fontSize:"36px"}}>
Armenian Alphabet
</h2>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fill,90px)",
gap:"16px",
justifyContent:"center",
marginTop:"30px"
}}
>

{armenianLetters.map(l=>(
<div
key={l.u}
style={{perspective:"800px",cursor:"pointer"}}
onClick={()=>flip(l.u)}
>

<div
style={{
width:"90px",
height:"110px",
position:"relative",
transformStyle:"preserve-3d",
transition:"transform 0.6s",
transform:flipped[l.u]?"rotateY(180deg)":"rotateY(0deg)"
}}
>

<div
style={{
position:"absolute",
inset:0,
background:"#f4f4f4",
borderRadius:"10px",
display:"flex",
alignItems:"center",
justifyContent:"center",
fontSize:"40px",
boxShadow:"0 6px 14px rgba(0,0,0,0.25)",
backfaceVisibility:"hidden"
}}
>
{l.u}
</div>

<div
style={{
position:"absolute",
inset:0,
background:"#222",
color:"#fff",
borderRadius:"10px",
display:"flex",
flexDirection:"column",
justifyContent:"center",
alignItems:"center",
fontSize:"14px",
transform:"rotateY(180deg)",
backfaceVisibility:"hidden",
textAlign:"center",
padding:"6px"
}}
>
<div style={{fontSize:"22px"}}>{l.l}</div>
<div>
{l.v ? `Value ${l.v}` : "No value"}
</div>
<div>{l.s}</div>
</div>

</div>
</div>
))}

</div>

<div
style={{
marginTop:"60px",
display:"flex",
flexDirection:"column",
alignItems:"center"
}}
>

<h3 style={{fontSize:"30px"}}>Armenian Alphabet Calculator</h3>

<input
value={input}
onChange={e=>setInput(e.target.value)}
placeholder="Enter Armenian word"
style={{
padding:"10px 14px",
fontSize:"22px",
borderRadius:"6px",
border:"1px solid #999",
textAlign:"center",
marginTop:"10px"
}}
/>

<div style={{fontSize:"28px",marginTop:"18px"}}>
Sum: {sum}
</div>

</div>

</div>

);
}

const greekDiphthongs = [
  { diphthong: "αι", sound: "ai / e", example: "like 'ai' in 'aisle'" },
  { diphthong: "ει", sound: "ei / i", example: "like 'ee' in 'see'" },
  { diphthong: "οι", sound: "oi / i", example: "like 'oi' in 'oil'" },
  { diphthong: "υι", sound: "yi / i", example: "like 'ui' in 'ruin'" },
  { diphthong: "αυ", sound: "au / av", example: "like 'ow' in 'cow'" },
  { diphthong: "ευ", sound: "eu / ev", example: "like 'ev' in 'ever'" },
  { diphthong: "ου", sound: "ou / u", example: "like 'oo' in 'food'" },
  { diphthong: "ηυ", sound: "ēu / ev", example: "rare, classical diphthong" },
];

function GreekAlphabetCards() {
  const [flipped, setFlipped] = useState({});

  const greekLetters = [
    { letter: "α", capital: "Α", value: 1, sound: "a" },
    { letter: "β", capital: "Β", value: 2, sound: "b" },
    { letter: "γ", capital: "Γ", value: 3, sound: "g" },
    { letter: "δ", capital: "Δ", value: 4, sound: "d" },
    { letter: "ε", capital: "Ε", value: 5, sound: "e" },
    { letter: "ϛ", capital: "Ϛ", value: 6, sound: "st / digamma" },
    { letter: "ζ", capital: "Ζ", value: 7, sound: "z" },
    { letter: "η", capital: "Η", value: 8, sound: "ē" },
    { letter: "θ", capital: "Θ", value: 9, sound: "th" },
    { letter: "ι", capital: "Ι", value: 10, sound: "i" },
    { letter: "κ", capital: "Κ", value: 20, sound: "k" },
    { letter: "λ", capital: "Λ", value: 30, sound: "l" },
    { letter: "μ", capital: "Μ", value: 40, sound: "m" },
    { letter: "ν", capital: "Ν", value: 50, sound: "n" },
    { letter: "ξ", capital: "Ξ", value: 60, sound: "x" },
    { letter: "ο", capital: "Ο", value: 70, sound: "o" },
    { letter: "π", capital: "Π", value: 80, sound: "p" },
    { letter: "ϟ", capital: "Ϟ", value: 90, sound: "q / koppa" },
    { letter: "ρ", capital: "Ρ", value: 100, sound: "r" },
    { letter: "σ", capital: "Σ", value: 200, sound: "s" },
    { letter: "τ", capital: "Τ", value: 300, sound: "t" },
    { letter: "υ", capital: "Υ", value: 400, sound: "u / y" },
    { letter: "φ", capital: "Φ", value: 500, sound: "ph / f" },
    { letter: "χ", capital: "Χ", value: 600, sound: "ch" },
    { letter: "ψ", capital: "Ψ", value: 700, sound: "ps" },
    { letter: "ω", capital: "Ω", value: 800, sound: "ō" },
    { letter: "ϡ", capital: "Ϡ", value: 900, sound: "sampi" },
  ];

  const toggleFlip = (letter) => {
    setFlipped((prev) => ({ ...prev, [letter]: !prev[letter] }));
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gap: "16px",
        padding: "20px",
      }}
    >
      {greekLetters.map((g) => (
        <div
          key={g.letter}
          style={{
            perspective: "1000px",
            width: "100%",
            height: "180px",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              textAlign: "center",
              transition: "transform 0.6s",
              transformStyle: "preserve-3d",
              transform: flipped[g.letter] ? "rotateY(180deg)" : "rotateY(0deg)",
              cursor: "pointer",
            }}
            onClick={() => toggleFlip(g.letter)}
          >
            {/* Front */}
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backfaceVisibility: "hidden",
                background: "#fff",
                color: "#000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "3rem",
                borderRadius: "10px",
                boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
              }}
            >
              {g.letter}
            </div>

            {/* Back */}
            <div
              style={{
                position: "absolute",
                width: "90%",
                height: "90%",
                backfaceVisibility: "hidden",
                background: "linear-gradient(135deg, #333, #555)",
                color: "#fff",
                transform: "rotateY(180deg)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "1rem",
                borderRadius: "10px",
                padding: "10px",
              }}
            >
              <ul
                style={{
                  listStyle: "disc",
                  paddingLeft: "20px",
                  textAlign: "left",
                  margin: 0,
                }}
              >
                <li>Capital: {g.capital}</li>
                <li>Value: {g.value}</li>
                <li>Sound: {g.sound}</li>
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function GreekDiphthongCards() {
  const [flipped, setFlipped] = useState({});

  const toggleFlip = (dip) => {
    setFlipped((prev) => ({ ...prev, [dip]: !prev[dip] }));
  };

  return (
    <div style={{ display: "flex", gap: "12px", padding: "20px", overflowX: "auto" }}>
      {greekDiphthongs.map((d) => (
        <div key={d.diphthong} style={{ perspective: "1000px", width: "140px", height: "160px" }}>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              textAlign: "center",
              transition: "transform 0.6s",
              transformStyle: "preserve-3d",
              transform: flipped[d.diphthong] ? "rotateY(180deg)" : "rotateY(0deg)",
              cursor: "pointer",
            }}
            onClick={() => toggleFlip(d.diphthong)}
          >
            {/* Front */}
            <div
              style={{
                position: "absolute",
                width: "90%",
                height: "90%",
                backfaceVisibility: "hidden",
                background: "#fff",
                color: "#000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2.5rem",
                borderRadius: "10px",
                boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
              }}
            >
              {d.diphthong}
            </div>

            {/* Back */}
            <div
              style={{
                position: "absolute",
                width: "90%",
                height: "90%",
                backfaceVisibility: "hidden",
                background: "linear-gradient(135deg, #333, #555)",
                color: "#fff",
                transform: "rotateY(180deg)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "1rem",
                borderRadius: "10px",
                padding: "10px",
              }}
            >
              <ul style={{ listStyle: "disc", paddingLeft: "20px", textAlign: "left" }}>
                <li>Sound: {d.sound}</li>
                <li>Example: {d.example}</li>
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const linearLetterValues = {
  א: 1, ב: 2, ג: 3, ד: 4, ה: 5,
  ו: 6, ז: 7, ח: 8, ט: 9,
  י: 10, כ: 11, ך: 11,
  ל: 12,
  מ: 13, ם: 13,
  נ: 14, ן: 14,
  ס: 15,
  ע: 16,
  פ: 17, ף: 17,
  צ: 18, ץ: 18,
  ק: 19,
  ר: 20,
  ש: 21,
  ת: 22
};

const arabicLetters = [
  { letter: "ا", value: 1, pronunciation: "Alif" },
  { letter: "ب", value: 2, pronunciation: "Ba" },
  { letter: "ج", value: 3, pronunciation: "Jim" },
  { letter: "د", value: 4, pronunciation: "Dal" },
  { letter: "ه", value: 5, pronunciation: "Ha" },
  { letter: "و", value: 6, pronunciation: "Waw" },
  { letter: "ز", value: 7, pronunciation: "Zay" },
  { letter: "ح", value: 8, pronunciation: "Ha (deep)" },
  { letter: "ط", value: 9, pronunciation: "Ta (emphatic)" },
  { letter: "ي", value: 10, pronunciation: "Ya" },
  { letter: "ى", value: 10, pronunciation: "Alif Maqṣūra" },
  { letter: "ك", value: 20, pronunciation: "Kaf" },
  { letter: "ل", value: 30, pronunciation: "Lam" },
  { letter: "م", value: 40, pronunciation: "Mim" },
  { letter: "ن", value: 50, pronunciation: "Nun" },
  { letter: "س", value: 60, pronunciation: "Sin" },
  { letter: "ع", value: 70, pronunciation: "Ain" },
  { letter: "ف", value: 80, pronunciation: "Fa" },
  { letter: "ص", value: 90, pronunciation: "Sad" },
  { letter: "ق", value: 100, pronunciation: "Qaf" },
  { letter: "ر", value: 200, pronunciation: "Ra" },
  { letter: "ش", value: 300, pronunciation: "Shin" },
  { letter: "ت", value: 400, pronunciation: "Ta" },
  { letter: "ة", value: 400, pronunciation: "Ta Marbūṭa" },
  { letter: "ث", value: 500, pronunciation: "Tha" },
  { letter: "خ", value: 600, pronunciation: "Kha" },
  { letter: "ذ", value: 700, pronunciation: "Dhal" },
  { letter: "ض", value: 800, pronunciation: "Dad" },
  { letter: "ظ", value: 900, pronunciation: "Za" },
  { letter: "غ", value: 1000, pronunciation: "Ghain" },
  { letter: "ء", value: 1, pronunciation: "Hamza" },
];

// Abjad lookup object
const abjadValues = arabicLetters.reduce((acc, l) => {
  acc[l.letter] = l.value;
  return acc;
}, {});
 
function ArabicAbjad() {
  const [flipped, setFlipped] = useState({});
  const [inputWord, setInputWord] = useState("");
  const [wordSum, setWordSum] = useState(0);

  const toggleFlip = (letter) => {
    setFlipped((prev) => ({ ...prev, [letter]: !prev[letter] }));
  };

  const calculateWord = () => {
    const sum = inputWord
      .split("")
      .reduce((acc, char) => acc + (abjadValues[char] || 0), 0);
    setWordSum(sum);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Arabic Abjad Letters</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
          gap: "15px",
        }}
      >
        {arabicLetters.map((l) => (
          <div
            key={l.letter}
            onClick={() => toggleFlip(l.letter)}
            style={{
              perspective: "600px",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "80px",
                height: "100px",
                transition: "transform 0.6s",
                transformStyle: "preserve-3d",
                transform: flipped[l.letter] ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {/* Front */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "#f5f5f5",
                  borderRadius: "8px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "32px",
                  boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
                  backfaceVisibility: "hidden",
                }}
              >
                {l.letter}
              </div>
              {/* Back */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "#333",
                  color: "#fff",
                  borderRadius: "8px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "14px",
                  padding: "5px",
                  boxShadow: "0 5px 15px rgba(0,0,0,0.5)",
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  textAlign: "center",
                }}
              >
                <div>Value: {l.value}</div>
                <div style={{ marginTop: "5px" }}>{l.pronunciation}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Word Calculator */}
      <div
  style={{
    marginTop: "50px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Cairo', sans-serif", // elegant Arabic-friendly font
    fontSize: "20px",
    color: "#222",
  }}
>
  <h3 style={{ fontSize: "32px", marginBottom: "20px", color: "#c41e3a" }}>
    Arabic Word Calculator
  </h3>
  <div style={{ display: "flex", gap: "15px" }}>
    <input
      type="text"
      value={inputWord}
      onChange={(e) => setInputWord(e.target.value)}
      placeholder="Enter Arabic word"
      style={{
        padding: "12px 16px",
        fontSize: "22px",
        borderRadius: "8px",
        border: "2px solid #c41e3a",
        textAlign: "center",
        outline: "none",
        width: "250px",
      }}
    />
    <button
      onClick={calculateWord}
      style={{
        padding: "12px 24px",
        fontSize: "22px",
        cursor: "pointer",
        background: "#c41e3a",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
      }}
    >
      Calculate
    </button>
  </div>
  <div style={{ marginTop: "20px", fontSize: "28px", color: "#222" }}>
    Sum: {wordSum}
  </div>
</div>
    </div>
  );
}

function calculateHebrewLetterValue(word) {
  let total = 0;
  for (const char of word) {
    if (letterValues[char]) {
      total += letterValues[char];
    }
  }
  return total;
}

function linearCalculateHebrewLetterValue(word) {
  let total = 0;
  for (const char of word) {
    if (linearLetterValues[char]) {
      total += linearLetterValues[char];
    }
  }
  return total;
}

function HebrewLetterCalculator() {
  const [text, setText] = useState("");

  const totalValue = calculateHebrewLetterValue(text);

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>Conventional Hebrew Letter Value Calculator</h1>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type Hebrew letters here..."
        style={{
          width: "100%",
          maxWidth: "600px",
          height: "80px",
          fontSize: "24px",
          padding: "12px",
          marginTop: "20px",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "right",
          direction: "rtl",
        }}
      />

      <div
        style={{
          marginTop: "20px",
          fontSize: "20px",
          textAlign: "center",
        }}
      >
        Total Letter Value: <strong>{totalValue}</strong>
      </div>
    </div>
  );
}

function LinearHebrewLetterCalculator() {
  const [text, setText] = useState("");

  const totalValue = linearCalculateHebrewLetterValue(text);

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>Linear Hebrew Letter Value Calculator</h1>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type Hebrew letters here..."
        style={{
          width: "100%",
          maxWidth: "600px",
          height: "80px",
          fontSize: "24px",
          padding: "12px",
          marginTop: "20px",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "right",
          direction: "rtl",
        }}
      />

      <div
        style={{
          marginTop: "20px",
          fontSize: "20px",
          textAlign: "center",
        }}
      >
        Total Letter Value: <strong>{totalValue}</strong>
      </div>
    </div>
  );
}

function EnglishLetterCardsCalculator() {
  const [inputText, setInputText] = useState("");

  // Define English letters in groups, no dashes
  const englishLetterGroups = [
    { letters: ["A", "B", "C", "D", "E"] },
    { letters: ["M", "S", "P", "L", "G"] },
    { letters: ["N", "T", "Q", "V", "F"] },
    { letters: ["O", "U", "R", "H", "W"] },
    { letters: ["I", "Z", "J"] },
    { letters: ["X", "K", "Y"] }
  ];

  // Explicit values for each letter
  const letterValues = {
    A: 1, B: 2, C: 3, D: 4, E: 5,
    M: 6, S: 7, P: 8, L: 9, G: 10,
    N: 11, T: 12, Q: 13, V: 14, F: 15,
    O: 16, U: 17, R: 18, H: 19, W: 20,
    I: 21, Z: 22, J: 23,
    X: 24, K: 25, Y: 26
  };

  // Flatten letters into cards
  const englishCards = englishLetterGroups.flatMap(group =>
    group.letters.map(letter => ({
      letter,
      value: letterValues[letter]
    }))
  );

  // Function to calculate total value of typed letters
  const calculateEnglishValue = (text) => {
    let total = 0;
    for (const char of text.toUpperCase()) {
      if (letterValues[char]) total += letterValues[char];
    }
    return total;
  };

  const totalValue = calculateEnglishValue(inputText);

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>The Jamatria: Latin Letter Calculator</h1>

      {/* Cards displayed horizontally with wrapping */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", marginTop: "20px" }}>
        {englishCards.map((card, idx) => (
          <div
            key={idx}
            style={{
              width: "80px",
              height: "100px",
              border: "1px solid #ccc",
              borderRadius: "12px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "32px",
              background: "#f0f0f0",
              margin: "5px",
              color: "#000"
            }}
          >
            <div>{card.letter}</div>
            <div style={{ fontSize: "18px", marginTop: "8px" }}>Value: {card.value}</div>
          </div>
        ))}
      </div>

      {/* Input for live calculator */}
      <div style={{ marginTop: "40px", textAlign: "center" }}>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type letters here..."
          style={{
            width: "100%",
            maxWidth: "600px",
            height: "80px",
            fontSize: "24px",
            padding: "12px",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center",
          }}
        />

        <div style={{ marginTop: "20px", fontSize: "20px" }}>
          Total Value: <strong>{totalValue}</strong>
        </div>
      </div>
    </div>
  );
}

function HindiGematriaCalculator() {

const [inputText,setInputText]=React.useState("")
const [searchValue,setSearchValue]=React.useState("")
const [openHindi,setOpenHindi]=React.useState(false)

const letters=[

{letter:"अ",name:"A",value:1},
{letter:"आ",name:"Ā",value:2},
{letter:"इ",name:"I",value:15},
{letter:"ई",name:"Ī",value:15},
{letter:"उ",name:"U",value:34},
{letter:"ऊ",name:"Ū",value:41},
{letter:"ऋ",name:"Ṛ",value:35},
{letter:"ए",name:"E",value:33},
{letter:"ऐ",name:"Ai",value:7},
{letter:"ओ",name:"O",value:37},
{letter:"औ",name:"Au",value:39},

{letter:"क",name:"ka",value:11},
{letter:"ख",name:"kha",value:12},
{letter:"ग",name:"ga",value:21},
{letter:"घ",name:"gha",value:26},
{letter:"ङ",name:"ṅa",value:27},

{letter:"च",name:"cha",value:24},
{letter:"छ",name:"chha",value:31},
{letter:"ज",name:"ja",value:36},
{letter:"झ",name:"jha",value:46},
{letter:"ञ",name:"ña",value:20},

{letter:"ट",name:"ṭa",value:43},
{letter:"ठ",name:"ṭha",value:44},
{letter:"ड",name:"ḍa",value:28},
{letter:"ढ",name:"ḍha",value:8},
{letter:"ण",name:"ṇa",value:17},

{letter:"त",name:"ta",value:42},
{letter:"थ",name:"tha",value:18},
{letter:"द",name:"da",value:9},
{letter:"ध",name:"dha",value:32},
{letter:"न",name:"na",value:14},

{letter:"प",name:"pa",value:19},
{letter:"फ",name:"pha",value:23},
{letter:"ब",name:"ba",value:45},
{letter:"भ",name:"bha",value:30},
{letter:"म",name:"ma",value:13},

{letter:"य",name:"ya",value:40},
{letter:"र",name:"ra",value:3},
{letter:"ल",name:"la",value:25},
{letter:"व",name:"va",value:29},

{letter:"श",name:"śa",value:22},
{letter:"ष",name:"ṣa",value:38},
{letter:"स",name:"sa",value:6},
{letter:"ह",name:"ha",value:16},

{letter:"क्ष",name:"kṣa",value:47},
{letter:"त्र",name:"tra",value:48},
{letter:"ज्ञ",name:"jña",value:49},
{letter:"श्र",name:"śra",value:50}

]

const letterValues=Object.fromEntries(
letters.map(l=>[l.letter,l.value])
)

const matras={
"ा":letterValues["आ"],
"ि":letterValues["इ"],
"ी":letterValues["ई"],
"ु":letterValues["उ"],
"ू":letterValues["ऊ"],
"े":letterValues["ए"],
"ै":letterValues["ऐ"],
"ो":letterValues["ओ"],
"ौ":letterValues["औ"],
"ृ":letterValues["ऋ"]
}

const conjuncts=["क्ष","त्र","ज्ञ","श्र"]

function calculateValue(text){

let total=0
let i=0

while(i<text.length){

let two=text.slice(i,i+2)

if(conjuncts.includes(two)){
total+=letterValues[two]
i+=2
continue
}

let char=text[i]

if(letterValues[char]) total+=letterValues[char]
else if(matras[char]) total+=matras[char]

i++
}

return total
}

const totalValue=calculateValue(inputText)

const reverseMatches=letters.filter(l=>String(l.value)===searchValue)

return(

<div style={{marginTop:"80px",fontFamily:"sans-serif"}}>

<div
onClick={()=>setOpenHindi(!openHindi)}
style={{
padding:"20px",
textAlign:"center",
fontWeight:600,
fontSize:"18px",
borderRadius:"14px",
background:"#f1f5f9",
cursor:"pointer"
}}
>

{openHindi?"Close Hindi Gematria ▲":"Hindi Devanagari Gematria ▼"}

</div>

{openHindi && (

<div style={{
marginTop:"20px",
padding:"30px",
borderRadius:"18px",
background:"#f8fafc"
}}>

<h3>Devanagari Letter Values</h3>

<div style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(80px,1fr))",
gap:"12px",
marginTop:"20px"
}}>

{letters.map((c,i)=>(

<div key={i}
style={{
padding:"14px",
borderRadius:"14px",
background:"white",
textAlign:"center",
boxShadow:"0 4px 12px rgba(0,0,0,.08)"
}}
>

<div style={{fontSize:"30px",fontWeight:600}}>
{c.letter}
</div>

<div style={{fontSize:"12px",opacity:0.7}}>
{c.name}
</div>

<div style={{fontSize:"14px",fontWeight:600}}>
{c.value}
</div>

</div>

))}

</div>

<div style={{marginTop:"40px",textAlign:"center"}}>

<h3>Gematria Calculator</h3>

<textarea
value={inputText}
onChange={(e)=>setInputText(e.target.value)}
placeholder="Type Hindi text..."
style={{
width:"100%",
maxWidth:"600px",
height:"90px",
fontSize:"22px",
padding:"12px",
display:"block",
margin:"auto",
textAlign:"center"
}}
/>

<div style={{marginTop:"20px",fontSize:"22px"}}>
Total Value: <strong>{totalValue}</strong>
</div>

</div>

<div style={{marginTop:"40px",textAlign:"center"}}>

<h3>Reverse Gematria</h3>

<input
type="number"
value={searchValue}
onChange={(e)=>setSearchValue(e.target.value)}
placeholder="Enter number"
style={{
padding:"10px",
fontSize:"18px",
width:"200px",
textAlign:"center"
}}
/>

<div style={{marginTop:"20px"}}>

{reverseMatches.map((m,i)=>(
<div key={i} style={{fontSize:"20px"}}>
{m.letter} ({m.name})
</div>
))}

</div>

</div>

</div>

)}

</div>

)

}

function CyrillicAlphabetExplorer(){

  const letters = [
{upper:"А",lower:"а",value:1,sound:"a"},
{upper:"В",lower:"в",value:2,sound:"v"},
{upper:"Г",lower:"г",value:3,sound:"g"},
{upper:"Д",lower:"д",value:4,sound:"d"},
{upper:"Є",lower:"є",value:5,sound:"ye"},
{upper:"Ѕ",lower:"ѕ",value:6,sound:"dz"},
{upper:"З",lower:"з",value:7,sound:"z"},
{upper:"И",lower:"и",value:8,sound:"i"},
{upper:"Ѳ",lower:"ѳ",value:9,sound:"f/th"},

{upper:"І",lower:"і",value:10,sound:"i"},
{upper:"К",lower:"к",value:20,sound:"k"},
{upper:"Л",lower:"л",value:30,sound:"l"},
{upper:"М",lower:"м",value:40,sound:"m"},
{upper:"Н",lower:"н",value:50,sound:"n"},
{upper:"Ѯ",lower:"ѯ",value:60,sound:"ks"},
{upper:"О",lower:"о",value:70,sound:"o"},
{upper:"П",lower:"п",value:80,sound:"p"},
{upper:"Ч",lower:"ч",value:90,sound:"ch"},

{upper:"Р",lower:"р",value:100,sound:"r"},
{upper:"С",lower:"с",value:200,sound:"s"},
{upper:"Т",lower:"т",value:300,sound:"t"},
{upper:"У",lower:"у",value:400,sound:"u"},
{upper:"Ф",lower:"ф",value:500,sound:"f"},
{upper:"Х",lower:"х",value:600,sound:"kh"},
{upper:"Ѱ",lower:"ѱ",value:700,sound:"ps"},
{upper:"Ѿ",lower:"ѿ",value:800,sound:"ot"},
{upper:"Ц",lower:"ц",value:900,sound:"ts"}
];

const groups = {
"1–9": letters.filter(l=>l.value < 10),
"10–90": letters.filter(l=>l.value >=10 && l.value <100),
"100–900": letters.filter(l=>l.value >=100)
};

const valueMap = {};
letters.forEach(l=>{
valueMap[l.upper]=l.value;
valueMap[l.lower]=l.value;
});

const [flipped,setFlipped]=useState({});
const [input,setInput]=useState("");

const toggleCard=i=>{
setFlipped(prev=>({...prev,[i]:!prev[i]}));
};

const addLetter=l=>{
setInput(prev=>prev + l);
};

const total=input.split("").reduce((sum,c)=>{
return sum+(valueMap[c]||0);
},0);

return(

<div style={{maxWidth:"1000px",margin:"auto",fontFamily:"sans-serif"}}>

<h2 style={{textAlign:"center"}}>
Cyrillic Alphabet Explorer
</h2>


{/* CARD GROUPS */}

{Object.entries(groups).map(([title,group],gi)=>(

<div key={gi} style={{marginTop:"30px"}}>

<h3>{title}</h3>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fill,minmax(120px,1fr))",
gap:"18px"
}}
>

{group.map((l,i)=>{

const id=title+i;
const isFlipped=flipped[id];

return(

<div
key={id}
onClick={()=>toggleCard(id)}
style={{perspective:"900px",cursor:"pointer"}}
>

<div
style={{
height:"130px",
position:"relative",
transformStyle:"preserve-3d",
transition:"transform .6s",
transform:isFlipped?"rotateY(180deg)":"rotateY(0)"
}}
>

{/* FRONT */}

<div
style={{
position:"absolute",
width:"100%",
height:"100%",
backfaceVisibility:"hidden",
background:"linear-gradient(145deg,#111,#1f2937)",
color:"white",
borderRadius:"14px",
display:"flex",
flexDirection:"column",
alignItems:"center",
justifyContent:"center",
fontSize:"30px",
boxShadow:"0 8px 20px rgba(0,0,0,.35)"
}}
>

<div>{l.upper}</div>

<div style={{fontSize:"14px",opacity:.7}}>
{l.value}
</div>

</div>

{/* BACK */}

<div
style={{
position:"absolute",
width:"100%",
height:"100%",
backfaceVisibility:"hidden",
transform:"rotateY(180deg)",
background:"#f3f4f6",
borderRadius:"14px",
display:"flex",
flexDirection:"column",
alignItems:"center",
justifyContent:"center"
}}
>

<div style={{fontSize:"28px"}}>
{l.lower}
</div>

<div style={{fontSize:"14px"}}>
{l.sound}
</div>

</div>

</div>

</div>

)

})}

</div>

</div>

))}


{/* CALCULATOR */}

<div style={{marginTop:"50px",textAlign:"center"}}>

<h2>Cyrillic Calculator</h2>

<input
value={input}
onChange={e=>setInput(e.target.value)}
style={{
padding:"12px",
fontSize:"20px",
width:"320px",
borderRadius:"10px",
border:"1px solid #ccc"
}}
placeholder="Type or click letters"
/>

<div style={{marginTop:"12px",fontSize:"24px"}}>
Total: <strong>{total}</strong>
</div>

<button
onClick={()=>setInput("")}
style={{
marginTop:"10px",
padding:"8px 18px",
borderRadius:"8px",
border:"none",
background:"#111",
color:"#fff",
cursor:"pointer"
}}
>
Clear
</button>

</div>


{/* CYRILLIC KEYBOARD */}

<div style={{marginTop:"40px"}}>

<h3 style={{textAlign:"center"}}>Keyboard</h3>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fill,minmax(60px,1fr))",
gap:"10px",
maxWidth:"500px",
margin:"auto"
}}
>

{letters.map((l,i)=>(
<button
key={i}
onClick={()=>addLetter(l.upper)}
style={{
padding:"10px",
fontSize:"20px",
borderRadius:"8px",
border:"1px solid #ddd",
background:"#fafafa",
cursor:"pointer"
}}
>
{l.upper}
</button>
))}

</div>

</div>

</div>

);
}



function RussianAlphabetCalculator(){

  const letters = [
{upper:"А",lower:"а",value:1,sound:"a"},
{upper:"Б",lower:"б",value:2,sound:"b"},
{upper:"В",lower:"в",value:14,sound:"v"},
{upper:"Г",lower:"г",value:10,sound:"g"},
{upper:"Д",lower:"д",value:4,sound:"d"},
{upper:"Е",lower:"е",value:20,sound:"ye"},
{upper:"Ё",lower:"ё",value:31,sound:"yo"},
{upper:"Ж",lower:"ж",value:26,sound:"zh"},
{upper:"З",lower:"з",value:23,sound:"z"},
{upper:"И",lower:"и",value:30,sound:"i"},
{upper:"Й",lower:"й",value:13,sound:"y"},
{upper:"К",lower:"к",value:33,sound:"k"},
{upper:"Л",lower:"л",value:9,sound:"l"},
{upper:"М",lower:"м",value:6,sound:"m"},
{upper:"Н",lower:"н",value:11,sound:"n"},
{upper:"О",lower:"о",value:16,sound:"o"},
{upper:"П",lower:"п",value:8,sound:"p"},
{upper:"Р",lower:"р",value:18,sound:"r"},
{upper:"С",lower:"с",value:7,sound:"s"},
{upper:"Т",lower:"т",value:12,sound:"t"},
{upper:"У",lower:"у",value:17,sound:"u"},
{upper:"Ф",lower:"ф",value:15,sound:"f"},
{upper:"Х",lower:"х",value:28,sound:"kh"},
{upper:"Ц",lower:"ц",value:3,sound:"ts"},
{upper:"Ч",lower:"ч",value:32,sound:"ch"},
{upper:"Ш",lower:"ш",value:22,sound:"sh"},
{upper:"Щ",lower:"щ",value:29,sound:"shch"},
{upper:"Ъ",lower:"ъ",value:27,sound:"hard sign"},
{upper:"Ы",lower:"ы",value:13,sound:"y"},
{upper:"Ь",lower:"ь",value:27,sound:"soft sign"},
{upper:"Э",lower:"э",value:5,sound:"e"},
{upper:"Ю",lower:"ю",value:24,sound:"yu"},
{upper:"Я",lower:"я",value:25,sound:"ya"}
];

const [flipped,setFlipped] = useState({});
const [text,setText] = useState("");

const toggleFlip = (i)=>{
setFlipped(prev=>({...prev,[i]:!prev[i]}));
};

const addLetter=(l)=>{
setText(t=>t+l);
};

const calculateValue=()=>{
let sum=0;

for(let char of text){

const match = letters.find(
l=>l.upper===char || l.lower===char
);

if(match) sum+=match.value;

}

return sum;
};

return(

<div style={{
maxWidth:"1200px",
margin:"auto",
fontFamily:"sans-serif",
color:"white"
}}>

<h1 style={{
textAlign:"center",
fontSize:"42px",
letterSpacing:"4px",
marginBottom:"40px",
color: "black"
}}>
The Russian Jamatria
</h1>

{/* CARD GRID */}

<div style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",
gap:"18px",
marginBottom:"60px"
}}>

{letters.map((l,i)=>{

const isFlip=flipped[i];

return(

<div
key={i}
onClick={()=>toggleFlip(i)}
style={{
height:"140px",
perspective:"800px",
cursor:"pointer"
}}
>

<div style={{
position:"relative",
width:"100%",
height:"100%",
transformStyle:"preserve-3d",
transition:"transform 0.6s",
transform:isFlip?"rotateY(180deg)":"rotateY(0deg)"
}}>

{/* FRONT */}

<div style={{
position:"absolute",
width:"100%",
height:"100%",
backfaceVisibility:"hidden",
display:"flex",
flexDirection:"column",
alignItems:"center",
justifyContent:"center",
borderRadius:"16px",
background:"linear-gradient(145deg,#111,#222)",
boxShadow:"0 10px 25px rgba(0,0,0,0.6)",
fontSize:"34px"
}}>

<div>{l.upper}</div>

<div style={{
fontSize:"14px",
opacity:0.7,
marginTop:"6px"
}}>
{l.sound}
</div>

</div>

{/* BACK */}

<div style={{
position:"absolute",
width:"100%",
height:"100%",
backfaceVisibility:"hidden",
transform:"rotateY(180deg)",
display:"flex",
flexDirection:"column",
alignItems:"center",
justifyContent:"center",
borderRadius:"16px",
background:"linear-gradient(145deg,#000,#333)",
boxShadow:"0 10px 25px rgba(0,0,0,0.8)"
}}>

<div style={{fontSize:"32px"}}>
{l.lower}
</div>

<div style={{
marginTop:"8px",
fontSize:"18px"
}}>
{l.value}
</div>

</div>

</div>

</div>

);

})}

</div>

{/* CALCULATOR */}

<div style={{
background:"#111",
padding:"40px",
borderRadius:"20px",
boxShadow:"0 20px 60px rgba(0,0,0,0.7)"
}}>

<h2 style={{textAlign:"center"}}>
Letter Value Calculator
</h2>

<input
value={text}
onChange={e=>setText(e.target.value)}
placeholder="Type Russian letters..."
style={{
width:"100%",
padding:"14px",
fontSize:"20px",
marginTop:"20px",
borderRadius:"10px",
border:"none",
outline:"none",
background:"#222",
color:"white"
}}
/>

<div style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(50px,1fr))",
gap:"10px",
marginTop:"20px"
}}>

{letters.map((l,i)=>(

<button
key={i}
onClick={()=>addLetter(l.lower)}
style={{
padding:"12px",
fontSize:"18px",
borderRadius:"8px",
border:"none",
background:"#333",
color:"white",
cursor:"pointer"
}}
>
{l.upper}
</button>

))}

</div>

<div style={{
marginTop:"30px",
fontSize:"26px",
textAlign:"center"
}}>
Total Value: {calculateValue()}
</div>

<button
onClick={()=>setText("")}
style={{
marginTop:"20px",
padding:"10px 20px",
display:"block",
marginLeft:"auto",
marginRight:"auto",
borderRadius:"10px",
border:"none",
background:"#555",
color:"white",
cursor:"pointer"
}}
>
Clear
</button>

</div>

</div>

);
}

function JapaneseKanaCards() {

const kana = [
{h:"あ",k:"ア",r:"a",v:1},
{h:"い",k:"イ",r:"i",v:2},
{h:"う",k:"ウ",r:"u",v:3},
{h:"え",k:"エ",r:"e",v:4},
{h:"お",k:"オ",r:"o",v:5},

{h:"か",k:"カ",r:"ka",v:6},
{h:"き",k:"キ",r:"ki",v:7},
{h:"く",k:"ク",r:"ku",v:8},
{h:"け",k:"ケ",r:"ke",v:9},
{h:"こ",k:"コ",r:"ko",v:10},

{h:"さ",k:"サ",r:"sa",v:11},
{h:"し",k:"シ",r:"shi",v:12},
{h:"す",k:"ス",r:"su",v:13},
{h:"せ",k:"セ",r:"se",v:14},
{h:"そ",k:"ソ",r:"so",v:15},

{h:"た",k:"タ",r:"ta",v:16},
{h:"ち",k:"チ",r:"chi",v:17},
{h:"つ",k:"ツ",r:"tsu",v:18},
{h:"て",k:"テ",r:"te",v:19},
{h:"と",k:"ト",r:"to",v:20},

{h:"な",k:"ナ",r:"na",v:21},
{h:"に",k:"ニ",r:"ni",v:22},
{h:"ぬ",k:"ヌ",r:"nu",v:23},
{h:"ね",k:"ネ",r:"ne",v:24},
{h:"の",k:"ノ",r:"no",v:25},

{h:"は",k:"ハ",r:"ha",v:26},
{h:"ひ",k:"ヒ",r:"hi",v:27},
{h:"ふ",k:"フ",r:"fu",v:28},
{h:"へ",k:"ヘ",r:"he",v:29},
{h:"ほ",k:"ホ",r:"ho",v:30},

{h:"ま",k:"マ",r:"ma",v:31},
{h:"み",k:"ミ",r:"mi",v:32},
{h:"む",k:"ム",r:"mu",v:33},
{h:"め",k:"メ",r:"me",v:34},
{h:"も",k:"モ",r:"mo",v:35},

{h:"や",k:"ヤ",r:"ya",v:36},
{h:"ゆ",k:"ユ",r:"yu",v:37},
{h:"よ",k:"ヨ",r:"yo",v:38},

{h:"ら",k:"ラ",r:"ra",v:39},
{h:"り",k:"リ",r:"ri",v:40},
{h:"る",k:"ル",r:"ru",v:41},
{h:"れ",k:"レ",r:"re",v:42},
{h:"ろ",k:"ロ",r:"ro",v:43},

{h:"わ",k:"ワ",r:"wa",v:44},
{h:"を",k:"ヲ",r:"wo",v:45},
{h:"ん",k:"ン",r:"n",v:46}
];

const [flipped,setFlipped] = useState({});
const [input,setInput] = useState("");

const valueMap = {};
kana.forEach(k=>{
valueMap[k.h] = k.v;
valueMap[k.k] = k.v;
});

const total = input.split("").reduce((sum,c)=>{
return sum + (valueMap[c] || 0);
},0);

function toggleCard(i){
setFlipped(prev=>({...prev,[i]:!prev[i]}));
}

function addKana(c){
setInput(prev=>prev + c);
}

return(

<div style={{maxWidth:"1000px",margin:"auto",fontFamily:"sans-serif"}}>

<h2 style={{textAlign:"center"}}>Japanese Kana Explorer</h2>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fill,minmax(110px,1fr))",
gap:"16px"
}}
>

{kana.map((k,i)=>{

const isFlipped = flipped[i];

return(

<div key={i} onClick={()=>toggleCard(i)} style={{perspective:"900px",cursor:"pointer"}}>

<div
style={{
height:"120px",
position:"relative",
transformStyle:"preserve-3d",
transition:"transform .6s",
transform:isFlipped ? "rotateY(180deg)" : "rotateY(0)"
}}
>

{/* FRONT */}

<div
style={{
position:"absolute",
width:"100%",
height:"100%",
backfaceVisibility:"hidden",
background:"#111",
color:"#fff",
borderRadius:"12px",
display:"flex",
flexDirection:"column",
alignItems:"center",
justifyContent:"center",
fontSize:"30px"
}}
>

<div>{k.h}</div>
<div style={{fontSize:"14px"}}>{k.v}</div>

</div>

{/* BACK */}

<div
style={{
position:"absolute",
width:"100%",
height:"100%",
backfaceVisibility:"hidden",
transform:"rotateY(180deg)",
background:"#f3f4f6",
borderRadius:"12px",
display:"flex",
flexDirection:"column",
alignItems:"center",
justifyContent:"center"
}}
>

<div style={{fontSize:"28px"}}>{k.k}</div>
<div style={{fontSize:"14px"}}>{k.r}</div>

</div>

</div>

</div>

)

})}

</div>

{/* CALCULATOR */}

<div style={{marginTop:"40px",textAlign:"center"}}>

<h3>Kana Calculator</h3>

<input
value={input}
onChange={(e)=>setInput(e.target.value)}
placeholder="Type kana or use keyboard"
style={{
padding:"10px",
fontSize:"20px",
width:"320px",
borderRadius:"8px",
border:"1px solid #ccc"
}}
/>

<div style={{marginTop:"10px",fontSize:"24px"}}>
Total: <strong>{total}</strong>
</div>

<button
onClick={()=>setInput("")}
style={{
marginTop:"10px",
padding:"8px 18px",
borderRadius:"8px",
border:"none",
background:"#111",
color:"#fff",
cursor:"pointer"
}}
>
Clear
</button>

</div>

{/* KEYBOARD */}

<div style={{marginTop:"40px"}}>

<h3 style={{textAlign:"center"}}>Kana Keyboard</h3>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fill,minmax(60px,1fr))",
gap:"10px",
maxWidth:"500px",
margin:"auto"
}}
>

{kana.map((k,i)=>(
<button
key={i}
onClick={()=>addKana(k.h)}
style={{
padding:"10px",
fontSize:"20px",
borderRadius:"8px",
border:"1px solid #ddd",
background:"#fafafa",
cursor:"pointer"
}}
>
{k.h}
</button>
))}

</div>

</div>

</div>

);
}

function KangxiRadicalExplorer(){

const radicals = [
  {r:"一",strokes:1,pinyin:"yī",meaning:"one",freq:42},
  {r:"丨",strokes:1,pinyin:"gǔn",meaning:"line",freq:21},
  {r:"丶",strokes:1,pinyin:"zhǔ",meaning:"dot",freq:10},
  {r:"丿",strokes:1,pinyin:"piě",meaning:"slash",freq:33},
  {r:"乙",strokes:1,pinyin:"yǐ",meaning:"second",freq:42},
  {r:"亅",strokes:1,pinyin:"jué",meaning:"hook",freq:19},
  {r:"二",strokes:2,pinyin:"èr",meaning:"two",freq:29},
  {r:"亠",strokes:2,pinyin:"tóu",meaning:"lid",freq:38},
  {r:"人",strokes:2,pinyin:"rén",meaning:"man/person",freq:794},
  {r:"亻",strokes:2,pinyin:"rén",meaning:"person (variant)",freq:794},
  {r:"儿",strokes:2,pinyin:"ér",meaning:"son/legs",freq:52},
  {r:"入",strokes:2,pinyin:"rù",meaning:"enter",freq:28},
  {r:"八",strokes:2,pinyin:"bā",meaning:"eight",freq:44},
  {r:"冂",strokes:2,pinyin:"jiōng",meaning:"wide",freq:50},
  {r:"冖",strokes:2,pinyin:"mì",meaning:"cloth cover",freq:30},
  {r:"冫",strokes:2,pinyin:"bīng",meaning:"ice",freq:115},
  {r:"几",strokes:2,pinyin:"jī",meaning:"table",freq:38},
  {r:"凵",strokes:2,pinyin:"qū",meaning:"receptacle",freq:23},
  {r:"刀",strokes:2,pinyin:"dāo",meaning:"knife",freq:377},
  {r:"刂",strokes:2,pinyin:"dāo",meaning:"knife (variant)",freq:377},
  {r:"力",strokes:2,pinyin:"lì",meaning:"power",freq:163},
  {r:"勹",strokes:2,pinyin:"bāo",meaning:"wrap",freq:64},
  {r:"匕",strokes:2,pinyin:"bǐ",meaning:"spoon",freq:19},
  {r:"匚",strokes:2,pinyin:"fāng",meaning:"box",freq:64},
  {r:"匸",strokes:2,pinyin:"xǐ/xì",meaning:"hiding enclosure",freq:17},
  {r:"十",strokes:2,pinyin:"shí",meaning:"ten",freq:55},
  {r:"卜",strokes:2,pinyin:"bǔ",meaning:"divination",freq:45},
  {r:"卩",strokes:2,pinyin:"jié",meaning:"seal",freq:40},
  {r:"厂",strokes:2,pinyin:"hǎn",meaning:"cliff",freq:129},
  {r:"厶",strokes:2,pinyin:"sī",meaning:"private",freq:40},
  {r:"又",strokes:2,pinyin:"yòu",meaning:"again",freq:91},
  {r:"口",strokes:3,pinyin:"kǒu",meaning:"mouth",freq:1146},
  {r:"囗",strokes:3,pinyin:"wéi",meaning:"enclosure",freq:118},
  {r:"土",strokes:3,pinyin:"tǔ",meaning:"earth",freq:580},
  {r:"士",strokes:3,pinyin:"shì",meaning:"scholar",freq:24},
  {r:"夂",strokes:3,pinyin:"zhǐ",meaning:"go",freq:11},
  {r:"夊",strokes:3,pinyin:"suī",meaning:"go slowly",freq:23},
  {r:"夕",strokes:3,pinyin:"xī",meaning:"evening",freq:34},
  {r:"大",strokes:3,pinyin:"dà",meaning:"big",freq:132},
  {r:"女",strokes:3,pinyin:"nǚ",meaning:"woman",freq:681},
  {r:"子",strokes:3,pinyin:"zǐ",meaning:"child",freq:83},
  {r:"宀",strokes:3,pinyin:"mián",meaning:"roof",freq:246},
  {r:"寸",strokes:3,pinyin:"cùn",meaning:"inch",freq:40},
  {r:"小",strokes:3,pinyin:"xiǎo",meaning:"small",freq:41},
  {r:"尢",strokes:3,pinyin:"yóu",meaning:"lame",freq:66},
  {r:"尸",strokes:3,pinyin:"shī",meaning:"corpse",freq:148},
  {r:"屮",strokes:3,pinyin:"chè",meaning:"sprout",freq:38},
  {r:"山",strokes:3,pinyin:"shān",meaning:"mountain",freq:636},
   {r:"巾",strokes:3,pinyin:"jīn",meaning:"towel",freq:49},
  {r:"干",strokes:3,pinyin:"gān",meaning:"dry",freq:22},
  {r:"幺",strokes:3,pinyin:"yāo",meaning:"small thread",freq:33},
  {r:"广",strokes:3,pinyin:"guǎng",meaning:"shelter",freq:116},
  {r:"廴",strokes:3,pinyin:"yǐn",meaning:"long stride",freq:18},
  {r:"廾",strokes:3,pinyin:"gǒng",meaning:"two hands",freq:13},
  {r:"弋",strokes:3,pinyin:"yì",meaning:"shoot",freq:19},
  {r:"弓",strokes:3,pinyin:"gōng",meaning:"bow",freq:96},
  {r:"彐",strokes:3,pinyin:"jì",meaning:"snout",freq:15},
  {r:"彡",strokes:3,pinyin:"shān",meaning:"bristle",freq:50},
  {r:"彳",strokes:3,pinyin:"chì",meaning:"step",freq:180},
  {r:"心",strokes:4,pinyin:"xīn",meaning:"heart",freq:179},
  {r:"忄",strokes:3,pinyin:"xīn",meaning:"heart (side form)",freq:179},
  {r:"戈",strokes:4,pinyin:"gē",meaning:"spear",freq:89},
  {r:"戶",strokes:4,pinyin:"hù",meaning:"door",freq:71},
  {r:"手",strokes:4,pinyin:"shǒu",meaning:"hand",freq:105},
  {r:"扌",strokes:3,pinyin:"shǒu",meaning:"hand (side form)",freq:105},
  {r:"支",strokes:4,pinyin:"zhī",meaning:"branch",freq:35},
  {r:"攴",strokes:4,pinyin:"pū",meaning:"tap",freq:25},
  {r:"文",strokes:4,pinyin:"wén",meaning:"script",freq:54},
  {r:"斗",strokes:4,pinyin:"dǒu",meaning:"dipper",freq:28},
  {r:"斤",strokes:4,pinyin:"jīn",meaning:"axe",freq:68},
  {r:"方",strokes:4,pinyin:"fāng",meaning:"square",freq:90},
  {r:"无",strokes:4,pinyin:"wú",meaning:"not",freq:20},
  {r:"日",strokes:4,pinyin:"rì",meaning:"sun",freq:1035},
  {r:"曰",strokes:4,pinyin:"yuē",meaning:"say",freq:22},
  {r:"月",strokes:4,pinyin:"yuè",meaning:"moon",freq:569},
  {r:"木",strokes:4,pinyin:"mù",meaning:"wood",freq:1258},
  {r:"欠",strokes:4,pinyin:"qiàn",meaning:"lack",freq:187},
  {r:"止",strokes:4,pinyin:"zhǐ",meaning:"stop",freq:193},
  {r:"歹",strokes:4,pinyin:"dǎi",meaning:"death",freq:76},
  {r:"殳",strokes:4,pinyin:"shū",meaning:"weapon",freq:34},
  {r:"毋",strokes:4,pinyin:"wú",meaning:"do not",freq:23},
  {r:"比",strokes:4,pinyin:"bǐ",meaning:"compare",freq:38},
  {r:"毛",strokes:4,pinyin:"máo",meaning:"fur",freq:111},
  {r:"氏",strokes:4,pinyin:"shì",meaning:"clan",freq:51},
  {r:"水",strokes:4,pinyin:"shuǐ",meaning:"water",freq:402},
  {r:"氵",strokes:3,pinyin:"shuǐ",meaning:"water (side form)",freq:402},
  {r:"火",strokes:4,pinyin:"huǒ",meaning:"fire",freq:193},
  {r:"灬",strokes:4,pinyin:"huǒ",meaning:"fire (bottom form)",freq:193},
  {r:"爪",strokes:4,pinyin:"zhǎo",meaning:"claw",freq:63},
  {r:"父",strokes:4,pinyin:"fù",meaning:"father",freq:44},
  {r:"爻",strokes:4,pinyin:"yáo",meaning:"double X",freq:12},
  {r:"爿",strokes:4,pinyin:"qiáng",meaning:"bed",freq:14},
  {r:"片",strokes:4,pinyin:"piàn",meaning:"slice",freq:55},
  {r:"牙",strokes:4,pinyin:"yá",meaning:"tooth",freq:28},
  {r:"牛",strokes:4,pinyin:"niú",meaning:"ox",freq:253},
  {r:"牜",strokes:3,pinyin:"niú",meaning:"ox (side form)",freq:253},
  {r:"犬",strokes:4,pinyin:"quǎn",meaning:"dog",freq:120},
  {r:"犭",strokes:3,pinyin:"quǎn",meaning:"dog (side form)",freq:120},
  {r:"玄",strokes:5,pinyin:"xuán",meaning:"profound/mysterious",freq:15},
  {r:"玉",strokes:5,pinyin:"yù",meaning:"jade",freq:152},
  {r:"王",strokes:4,pinyin:"wáng",meaning:"king",freq:90},
  {r:"瓜",strokes:5,pinyin:"guā",meaning:"melon",freq:20},
  {r:"瓦",strokes:4,pinyin:"wǎ",meaning:"tile",freq:33},
  {r:"甘",strokes:5,pinyin:"gān",meaning:"sweet",freq:38},
  {r:"生",strokes:5,pinyin:"shēng",meaning:"life/grow",freq:165},
  {r:"用",strokes:5,pinyin:"yòng",meaning:"use",freq:48},
  {r:"田",strokes:5,pinyin:"tián",meaning:"field",freq:283},
  {r:"疋",strokes:5,pinyin:"pǐ",meaning:"bolt of cloth",freq:23},
  {r:"疒",strokes:3,pinyin:"nè",meaning:"sickness (side form)",freq:102},
  {r:"癶",strokes:5,pinyin:"bō",meaning:"footsteps",freq:6},
  {r:"白",strokes:5,pinyin:"bái",meaning:"white",freq:150},
  {r:"皮",strokes:5,pinyin:"pí",meaning:"skin",freq:92},
  {r:"皿",strokes:5,pinyin:"mǐn",meaning:"dish",freq:41},
  {r:"目",strokes:5,pinyin:"mù",meaning:"eye",freq:622},
  {r:"矛",strokes:5,pinyin:"máo",meaning:"spear",freq:72},
  {r:"矢",strokes:5,pinyin:"shǐ",meaning:"arrow",freq:42},
  {r:"石",strokes:5,pinyin:"shí",meaning:"stone",freq:242},
  {r:"示",strokes:5,pinyin:"shì",meaning:"spirit/altar",freq:150},
  {r:"礻",strokes:4,pinyin:"shì",meaning:"spirit (side)",freq:150},
  {r:"禸",strokes:5,pinyin:"róu",meaning:"track",freq:5},
  {r:"禾",strokes:5,pinyin:"hé",meaning:"grain",freq:299},
  {r:"穴",strokes:5,pinyin:"xué",meaning:"cave",freq:72},
  {r:"立",strokes:5,pinyin:"lì",meaning:"stand",freq:231},
  {r:"竹",strokes:6,pinyin:"zhú",meaning:"bamboo",freq:117},
  {r:"米",strokes:6,pinyin:"mǐ",meaning:"rice",freq:151},
  {r:"糸",strokes:6,pinyin:"mì",meaning:"silk",freq:494},
  {r:"纟",strokes:3,pinyin:"mì",meaning:"silk (side form)",freq:494},
  {r:"缶",strokes:6,pinyin:"fǒu",meaning:"jar",freq:16},
  {r:"网",strokes:6,pinyin:"wǎng",meaning:"net",freq:137},
  {r:"羊",strokes:6,pinyin:"yáng",meaning:"sheep",freq:126},
  {r:"羽",strokes:6,pinyin:"yǔ",meaning:"feather",freq:58},
  {r:"而",strokes:6,pinyin:"ér",meaning:"and/yet",freq:33},
  {r:"耒",strokes:6,pinyin:"lěi",meaning:"plow",freq:18},
  {r:"耳",strokes:6,pinyin:"ěr",meaning:"ear",freq:208},
  {r:"聿",strokes:6,pinyin:"yù",meaning:"brush",freq:37},
  {r:"肉",strokes:6,pinyin:"ròu",meaning:"meat",freq:127},
  {r:"⺼",strokes:4,pinyin:"ròu",meaning:"meat (variant)",freq:127},
  {r:"臣",strokes:6,pinyin:"chén",meaning:"minister",freq:51},
  {r:"自",strokes:6,pinyin:"zì",meaning:"self",freq:279},
  {r:"至",strokes:6,pinyin:"zhì",meaning:"arrive",freq:100},
  {r:"臼",strokes:6,pinyin:"jiù",meaning:"mortar",freq:20},
  {r:"舌",strokes:6,pinyin:"shé",meaning:"tongue",freq:43},
  {r:"舛",strokes:6,pinyin:"chuǎn",meaning:"opposite",freq:8},
  {r:"舟",strokes:6,pinyin:"zhōu",meaning:"boat",freq:92},
  {r:"艮",strokes:6,pinyin:"gèn",meaning:"stopping",freq:20},
  {r:"色",strokes:6,pinyin:"sè",meaning:"color",freq:142},
  {r:"艸",strokes:6,pinyin:"cǎo",meaning:"grass",freq:196},
  {r:"艹",strokes:3,pinyin:"cǎo",meaning:"grass (side form)",freq:196},
  {r:"虍",strokes:6,pinyin:"hū",meaning:"tiger",freq:9},
  {r:"虫",strokes:6,pinyin:"chóng",meaning:"insect",freq:387},
  {r:"血",strokes:6,pinyin:"xuè",meaning:"blood",freq:51},
  {r:"行",strokes:6,pinyin:"xíng",meaning:"walk",freq:175},
  {r:"衣",strokes:6,pinyin:"yī",meaning:"clothing",freq:123},
  {r:"襾",strokes:6,pinyin:"yà",meaning:"cover",freq:15},
  {r:"見",strokes:7,pinyin:"jiàn",meaning:"see",freq:421},
  {r:"角",strokes:7,pinyin:"jiǎo",meaning:"horn",freq:108},
  {r:"言",strokes:7,pinyin:"yán",meaning:"speech",freq:977},
  {r:"讠",strokes:2,pinyin:"yán",meaning:"speech (side form)",freq:977},
  {r:"谷",strokes:7,pinyin:"gǔ",meaning:"valley",freq:31},
  {r:"豆",strokes:7,pinyin:"dòu",meaning:"bean",freq:73},
  {r:"豕",strokes:7,pinyin:"shǐ",meaning:"pig",freq:14},
  {r:"豸",strokes:7,pinyin:"zhì",meaning:"badger",freq:23},
  {r:"貝",strokes:7,pinyin:"bèi",meaning:"shell/money",freq:195},
  {r:"赤",strokes:7,pinyin:"chì",meaning:"red",freq:26},
  {r:"走",strokes:7,pinyin:"zǒu",meaning:"run",freq:157},
  {r:"足",strokes:7,pinyin:"zú",meaning:"foot",freq:286},
  {r:"身",strokes:7,pinyin:"shēn",meaning:"body",freq:92},
  {r:"車",strokes:7,pinyin:"chē",meaning:"cart",freq:128},
  {r:"辛",strokes:7,pinyin:"xīn",meaning:"bitter",freq:53},
  {r:"辰",strokes:7,pinyin:"chén",meaning:"morning/time",freq:44},
  {r:"辵",strokes:7,pinyin:"chuò",meaning:"walk/movement",freq:172},
  {r:"邑",strokes:7,pinyin:"yì",meaning:"city",freq:65},
  {r:"酉",strokes:7,pinyin:"yǒu",meaning:"wine",freq:23},
  {r:"釆",strokes:7,pinyin:"biàn",meaning:"distinguish",freq:13},
  {r:"里",strokes:7,pinyin:"lǐ",meaning:"village",freq:128},
  {r:"金",strokes:8,pinyin:"jīn",meaning:"metal/gold",freq:402},
  {r:"釒",strokes:8,pinyin:"jīn",meaning:"metal (side form)",freq:402},
  {r:"長",strokes:8,pinyin:"cháng",meaning:"long",freq:111},
  {r:"門",strokes:8,pinyin:"mén",meaning:"door",freq:110},
  {r:"阜",strokes:8,pinyin:"fù",meaning:"mound",freq:52},
  {r:"隶",strokes:8,pinyin:"lì",meaning:"slave",freq:32},
  {r:"隹",strokes:8,pinyin:"zhuī",meaning:"short-tailed bird",freq:42},
  {r:"雨",strokes:8,pinyin:"yǔ",meaning:"rain",freq:171},
  {r:"靑",strokes:8,pinyin:"qīng",meaning:"blue/green",freq:42},
  {r:"非",strokes:8,pinyin:"fēi",meaning:"wrong",freq:52},
  {r:"面",strokes:9,pinyin:"miàn",meaning:"face",freq:49},
  {r:"革",strokes:9,pinyin:"gé",meaning:"leather",freq:99},
  {r:"韋",strokes:9,pinyin:"wéi",meaning:"tanned leather",freq:18},
  {r:"韭",strokes:9,pinyin:"jiǔ",meaning:"leek",freq:23},
  {r:"音",strokes:9,pinyin:"yīn",meaning:"sound",freq:50},
  {r:"頁",strokes:9,pinyin:"yè",meaning:"page/head",freq:132},
  {r:"風",strokes:9,pinyin:"fēng",meaning:"wind",freq:64},
  {r:"飛",strokes:9,pinyin:"fēi",meaning:"fly",freq:41},
  {r:"食",strokes:9,pinyin:"shí",meaning:"eat/food",freq:229},
  {r:"首",strokes:9,pinyin:"shǒu",meaning:"head",freq:120},
  {r:"香",strokes:9,pinyin:"xiāng",meaning:"fragrant",freq:50},
  {r:"馬",strokes:10,pinyin:"mǎ",meaning:"horse",freq:178},
  {r:"骨",strokes:10,pinyin:"gǔ",meaning:"bone",freq:53},
  {r:"高",strokes:10,pinyin:"gāo",meaning:"tall/high",freq:58},
  {r:"髟",strokes:10,pinyin:"biāo",meaning:"long hair",freq:17},
  {r:"鬥",strokes:10,pinyin:"dòu",meaning:"fight",freq:18},
  {r:"鬯",strokes:10,pinyin:"chàng",meaning:"sacrificial wine",freq:9},
  {r:"鬲",strokes:10,pinyin:"gé",meaning:"cauldron",freq:11},
  {r:"鬼",strokes:10,pinyin:"guǐ",meaning:"ghost",freq:68},
  {r:"魚",strokes:11,pinyin:"yú",meaning:"fish",freq:138},
  {r:"鳥",strokes:11,pinyin:"niǎo",meaning:"bird",freq:132},
  {r:"鹵",strokes:11,pinyin:"lǔ",meaning:"salt",freq:17},
  {r:"鹿",strokes:11,pinyin:"lù",meaning:"deer",freq:37},
  {r:"麥",strokes:11,pinyin:"mài",meaning:"wheat",freq:30},
  {r:"麻",strokes:11,pinyin:"má",meaning:"hemp",freq:33},
  {r:"黃",strokes:12,pinyin:"huáng",meaning:"yellow",freq:63},
  {r:"黍",strokes:12,pinyin:"shǔ",meaning:"millet",freq:11},
  {r:"黑",strokes:12,pinyin:"hēi",meaning:"black",freq:89},
  {r:"黹",strokes:12,pinyin:"zhǐ",meaning:"embroidery",freq:7},
  {r:"黽",strokes:12,pinyin:"mǐn",meaning:"frog",freq:15},
  {r:"鼎",strokes:13,pinyin:"dǐng",meaning:"tripod cauldron",freq:20},
    {r:"鼓",strokes:13,pinyin:"gǔ",meaning:"drum",freq:28},
  {r:"鼠",strokes:13,pinyin:"shǔ",meaning:"rat/mouse",freq:41},
  {r:"鼻",strokes:14,pinyin:"bí",meaning:"nose",freq:49},
  {r:"齊",strokes:14,pinyin:"qí",meaning:"even/together",freq:23},
  {r:"齒",strokes:15,pinyin:"chǐ",meaning:"tooth",freq:45},
  {r:"龍",strokes:16,pinyin:"lóng",meaning:"dragon",freq:36},
  {r:"龜",strokes:16,pinyin:"guī",meaning:"turtle",freq:23},
  {r:"龠",strokes:17,pinyin:"yuè",meaning:"flute",freq:7},
  {r:"⻊",strokes:7,pinyin:"zú",meaning:"foot (variant)",freq:286},
  {r:"⻖",strokes:2,pinyin:"fù",meaning:"mound (variant)",freq:52},
  {r:"⻌",strokes:3,pinyin:"chuò",meaning:"walk/movement (variant)",freq:172},
  {r:"⻏",strokes:2,pinyin:"yì",meaning:"city (variant)",freq:65},
  {r:"⻗",strokes:10,pinyin:"fēng",meaning:"wind (variant)",freq:64},
  {r:"⻖",strokes:2,pinyin:"fù",meaning:"hill (variant)",freq:52}
];

const [flipped,setFlipped] = useState({});
const [input,setInput] = useState("");

const radicalMap = {};
radicals.forEach(r=>{
radicalMap[r.r] = r.strokes;
});

const total = input.split("").reduce((sum,c)=>{
return sum + (radicalMap[c] || 0);
},0);
const freqMap = {};
radicals.forEach(r=>{
freqMap[r.r] = r.freq;
});

const frequencyTotal = input.split("").reduce((sum,c)=>{
return sum + (freqMap[c] || 0);
},0);

const radicalCount = input.split("").filter(c=>freqMap[c]).length;

const averageFrequency =
radicalCount ? (frequencyTotal / radicalCount).toFixed(2) : 0;

function toggleCard(i){
setFlipped(prev=>({...prev,[i]:!prev[i]}));
}

function addRadical(r){
setInput(prev=>prev + r);
}

return(

<div style={{maxWidth:"1000px",margin:"auto",fontFamily:"sans-serif"}}>

<h2 style={{textAlign:"center"}}>Kangxi Radical Explorer</h2>

{/* RADICAL CARDS */}

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fill,minmax(110px,1fr))",
gap:"16px"
}}
>

{radicals.map((rad,i)=>{

const isFlipped = flipped[i];

return(

<div
key={i}
onClick={()=>toggleCard(i)}
style={{perspective:"900px",cursor:"pointer"}}
>

<div
style={{
height:"120px",
position:"relative",
transformStyle:"preserve-3d",
transition:"transform .6s",
transform:isFlipped ? "rotateY(180deg)" : "rotateY(0)"
}}
>

{/* FRONT */}

<div
style={{
position:"absolute",
width:"100%",
height:"100%",
backfaceVisibility:"hidden",
background:"#111",
color:"#fff",
borderRadius:"12px",
display:"flex",
flexDirection:"column",
alignItems:"center",
justifyContent:"center",
fontSize:"32px"
}}
>

<div>{rad.r}</div>
<div style={{fontSize:"14px"}}>
{rad.strokes} strokes
</div>
<div style={{fontSize:"14px"}}>
{rad.meaning} 
</div>

</div>

{/* BACK */}

<div
style={{
position:"absolute",
width:"100%",
height:"100%",
backfaceVisibility:"hidden",
transform:"rotateY(180deg)",
background:"#f3f4f6",
borderRadius:"12px",
display:"flex",
flexDirection:"column",
alignItems:"center",
justifyContent:"center"
}}
>

<div style={{fontSize:"18px"}}>
{rad.pinyin}
</div>

<div style={{fontSize:"14px"}}>
freq rank: {rad.freq}
</div>

</div>

</div>

</div>

)

})}

</div>


{/* CALCULATOR */}

<div style={{marginTop:"40px",textAlign:"center"}}>

<h3>Radical Stroke Calculator</h3>

<input
value={input}
onChange={(e)=>setInput(e.target.value)}
placeholder="Type radicals"
style={{
padding:"10px",
fontSize:"20px",
width:"320px",
borderRadius:"8px",
border:"1px solid #ccc"
}}
/>

<div style={{marginTop:"10px",fontSize:"24px"}}>
Total strokes: <strong>{total}</strong>
</div>

<button
onClick={()=>setInput("")}
style={{
marginTop:"10px",
padding:"8px 18px",
borderRadius:"8px",
border:"none",
background:"#111",
color:"#fff",
cursor:"pointer"
}}
>
Clear
</button>

</div>

<div style={{marginTop:"30px",textAlign:"center"}}>

<h3>Radical Frequency Calculator</h3>

<div style={{fontSize:"20px",marginTop:"8px"}}>
Frequency Total: <strong>{frequencyTotal}</strong>
</div>

<div style={{fontSize:"18px"}}>
Average Frequency: <strong>{averageFrequency}</strong>
</div>

<div style={{marginTop:"12px"}}>

{input.split("").map((char,i)=>{

const rad = radicals.find(r=>r.r === char);

if(!rad) return null;

return(
<div key={i} style={{fontSize:"16px"}}>
{rad.r} → freq rank {rad.freq}
</div>
);

})}

</div>

</div>


{/* RADICAL KEYBOARD */}

<div style={{marginTop:"40px"}}>

<h3 style={{textAlign:"center"}}>Radical Keyboard</h3>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fill,minmax(60px,1fr))",
gap:"10px",
maxWidth:"500px",
margin:"auto"
}}
>

{radicals.map((rad,i)=>(
<button
key={i}
onClick={()=>addRadical(rad.r)}
style={{
padding:"10px",
fontSize:"20px",
borderRadius:"8px",
border:"1px solid #ddd",
background:"#fafafa",
cursor:"pointer"
}}
>
{rad.r}
</button>
))}

</div>

</div>

</div>

);
}
function SanMarinoMap() {
  return (
    <div style={{ height: "600px", width: "100%", borderRadius: "20px", overflow: "hidden" }}>
      <MapContainer
        center={sanMarinoCenter}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={sanMarinoCenter}>
          <Popup>
            City of San Marino <br />
            Capital of San Marino
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

const oldTestamentBooks = [
  "Genesis",
  "Exodus",
  "Leviticus",
  "Numbers",
  "Deuteronomy",
  "Joshua",
  "Judges",
  "Ruth",
  "1 Samuel",
  "2 Samuel",
  "Psalms",
  "1 Kings[1:12]",
  "Proverbs",
  "Songs of Solomon",
  "Ecclesiastes",
  "1 Kings[13:22]",
  "2 Kings[1:14]",
  "Jonah",
  "Amos",
  "Isaiah",
  "Hosea",
  "2 Kings[15:16]",
  "Micah",
  "Nahum",
  "2 Kings[17:21]",
  "Jeremiah",
  "Zepheniah",
  "2 Kings[22:25]",
  "Job",
  "Joel",
  "Lamentations",
  "Daniel",
  "Ezekiel",
  "Haggai",
  "Zechariah",
  "Ezra",
  "Nehemiah",
  "Habbakuk",
  "Obadiah",
  "Malachi",
  "Esther",
  "1 Chronicles",
  "2 Chronicles",
];

const bibleStyles = {
  container: {
    padding: "2rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: "#f5f5f5",
    minHeight: "100vh",
  },
  title: {
    textAlign: "center",
    fontSize: "2rem",
    marginBottom: "1.5rem",
    color: "#333",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
    gap: "1rem",
  },
  card: {
    background: "white",
    padding: "1rem",
    borderRadius: "12px",
    textAlign: "center",
    fontWeight: 600,
    fontSize: "1rem",
    color: "#222",
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
    transition: "transform 0.3s, box-shadow 0.3s",
    cursor: "pointer",
  },
};

function OldTestamentList() {
  return (
    <div style={bibleStyles.container}>
      <h2 style={bibleStyles.title}>Old Testament Books</h2>
      <div style={bibleStyles.grid}>
        {oldTestamentBooks.map((book, index) => (
          <div
            key={index}
            style={bibleStyles.card}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.1)";
            }}
          >
            {book}
          </div>
        ))}
      </div>
    </div>
  );
}

// Added inline CSS to replace missing App.css
const styles = {
  app: {
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
  },
  navigation: {
    width: '220px',
    backgroundColor: 'rgba(255,255,255,0.95)',
    backdropFilter: 'blur(10px)',
    padding: '16px',
    borderRadius: '16px 0 0 16px',
    boxShadow: '-4px 0 12px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    position: 'sticky', // stays in view as you scroll
    top: '20px',
    height: 'fit-content',
    marginLeft: 'auto', // pushes it to the right
    marginRight: '20px',
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    borderRadius: '12px',
    textDecoration: 'none',
    color: '#111',
  },
  animatedPage: {
    padding: '40px',
    maxWidth: '1000px',
    margin: '0 auto',
    flex: 1, // main content grows to fill space
  },
  title: {
    fontSize: '48px',
    fontWeight: '700',
    marginBottom: '24px',
  },
  subtitle: {
    fontSize: '18px',
    color: '#6b7280',
    marginBottom: '32px',
  },
  btn: {
    padding: '12px 24px',
    fontSize: '16px',
    borderRadius: '12px',
    border: 'none',
    backgroundColor: '#111827',
    color: '#fff',
    cursor: 'pointer',
  },
  sectionTitle: {
    fontSize: '36px',
    fontWeight: '600',
    marginBottom: '24px',
  },
  grid3: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '24px',
  },
  grid4: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '16px',
  },
  grid2: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '32px',
  },
  card: {
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    padding: '16px',
    backgroundColor: '#fff',
  },
  cardImage: {
    height: '160px',
    backgroundColor: '#e5e7eb',
    borderRadius: '12px',
    marginBottom: '12px',
  },
  sketch: {
    height: '192px',
    borderRadius: '16px',
    background: 'linear-gradient(135deg, #e5e7eb, #d1d5db)',
  },
 

  input: {
    padding: '12px',
    borderRadius: '12px',
    border: '1px solid #d1d5db',
  },
  textarea: {
    padding: '12px',
    borderRadius: '12px',
    border: '1px solid #d1d5db',
  }
};

function AnimatedPage({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      style={styles.animatedPage}
    >
      {children}
    </motion.div>
  );
}

function Navigation() {
  const links = [
    { to: "/", label: "Home", icon: Home },
    { to: "/language", label: "Language", icon: Building2 },
    { to: "/business", label: "Business", icon: PenTool },
    { to: "/religion", label: "Religion", icon: Cross  },
    { to: "/worldrule1", label: "WorldRule1", icon: Earth },
    { to: "/worldrule2", label: "WorldRule2", icon: EarthLock },
  ];

  return (
    <nav style={styles.navigation}>
      {links.map(({ to, label, icon: Icon }) => (
        <Link key={to} to={to} style={styles.navLink}>
          <Icon />
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
}

const LearnMoreButton = () => {
  const [open, setOpen] = useState(false);

  const styles = {
    btn: {
      padding: "10px 20px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    box: {
      marginTop: "10px",
      padding: "15px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      width: "400px",
      backgroundColor: "#f9f9f9",
    },
    bulletList: {
      marginBottom: "10px",
      color: "black"
    },
    textarea: {
      width: "100%",
      height: "80px",
      marginBottom: "10px",
      padding: "5px",
    },
    linkBtn: {
      marginRight: "10px",
      padding: "5px 10px",
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      borderRadius: "3px",
      cursor: "pointer",
    },
  };

  return (
    <button
      style={styles.btn}
      onClick={() => setOpen(!open)}
    >
      Learn More
      {open && (
        <div style={styles.box}>
          <ul style={styles.bulletList}>
            <li>My full name is Alvah Ivan Jamell Ivor Bucknor Wisdom Samuels</li>
            <li>I am God and I am not(Nun/None).</li>
            <li>I am going to conquer the world very slowly and very quickly by living from 26th April 2023 to some end date at 32 again and again (10000 times in 5 cycles or maybe 50000 times in 5 cycles) in what I call an iteration of time. Obviously you all iterate with me but don't realize unless I inform you as I am now, don't think about it too much just continue living life.</li>
          </ul>
          <div>
            <button
              style={styles.linkBtn}
              onClick={(e) => {
                e.stopPropagation();
                window.open("https://www.researchgate.net/profile/Jamell-Samuels", "_blank");
              }}
            >
              Research
            </button>
            <button
              style={styles.linkBtn}
              onClick={(e) => {
                e.stopPropagation();
                window.open("https://www.facebook.com/jamell.samuels/", "_blank");
              }}
            >
              Facebook
            </button>
          </div>
        </div>
      )}
    </button>
  );
};

function InfoRevealButton() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          padding: "12px 22px",
          borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.25)",
          background: "linear-gradient(135deg, #0a2540, #133b5c)",
          color: "#fff",
          fontWeight: 600,
          letterSpacing: "0.4px",
          cursor: "pointer",
          boxShadow:
            "0 10px 25px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.2)",
          transition: "all 0.25s ease"
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.transform = "translateY(-2px)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.transform = "translateY(0)")
        }
      >
        What is a 4vs5?
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "115%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "320px",
            padding: "18px",
            borderRadius: "18px",
            background:
              "linear-gradient(145deg, rgba(20,30,50,0.95), rgba(10,15,30,0.95))",
            color: "#f1f5f9",
            backdropFilter: "blur(14px)",
            border: "1px solid rgba(255,255,255,0.15)",
            boxShadow:
              "0 30px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.1)",
            animation: "fadeIn 0.35s ease"
          }}
        >
          <h4 style={{ marginTop: 0, marginBottom: "8px" }}>
            Expanded Information
          </h4>

          <p style={{ fontSize: "14px", lineHeight: 1.6, opacity: 0.9 }}>
            A 4vs 5 is a tool designed to make the most out of the practical lesson of Genesis 14. It has a side of 4 key points a side of 5 key points, 6 key regions and 3 things to get everything right and then a tenth to give to the right cause. In Genesis 14, a coalition of four Mesopotamian kings—Chedorlaomer of Elam, Amraphel of Shinar, Arioch of Ellasar, and Tidal king of Goiim—had long dominated the Jordan Valley region and launched a campaign to suppress five rebellious Canaanite kings, including those of Sodom and Gomorrah. After defeating these local rulers and carrying off people and goods (including Abram’s nephew Lot), Abram pursued them with a small force, defeated them in a night attack, and recovered the captives and spoils. When Abram returned to the Valley of Shaveh, he was greeted by Melchizedek, who blessed him and received a tithe, and by the king of Sodom, whose offer of reward Abram rejected to show that his success came from God rather than political alliances or plunder.

          </p>

          <ul style={{ paddingLeft: "18px", fontSize: "14px" }}>
            <li>It is a metaphor for everything in this world internally and externally and the only way to win.</li>
            <li>It can be visually expressed, written or even adapted to sound.</li>
          </ul>
        </div>
      )}
    </div>
  );
}

function HomePage() {
  return (
    <AnimatedPage>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '40px',
          fontFamily: '"Times New Roman", serif', // Roman-style font
        }}
      >
        {/* Left Content */}
        <div style={{ flex: 2 }}>
  <h1 style={{ ...styles.title, fontFamily: '"Times New Roman", serif' }}>
    His Highness He Adds Grace and Favour Sea to He Adds Light.
  </h1> 

  <ul style={{ ...styles.subtitle, listStyleType: "none", paddingLeft: 0 }}>
    <li>⭐ Holy Roman Emperor Sancte Romane Imperatoris</li>
    <li>⭐ King of France Roi de France</li>
    <li>⭐ Huangdi 黄帝</li>
    <li>⭐ Chakravarti Samrat चक्रवर्ती सम्राट</li>
    <li>⭐ Maharajadhiraja महाराजाधिराज</li>
    <li>⭐ The Supreme Sultan السلطان الأعظم</li>
    <li>⭐ Basileus Megas kai Autokrator Βασιλεὺς Μέγας καὶ Αὐτοκράτωρ βασιλεύς</li>
    <li>⭐ Imperator i Samoderzhets Император и Самодержец</li>
    <li>⭐ Padishah پادشاه </li>
    <li>⭐ Chinggis Khaan Чингис хаан</li>
    <li>⭐ Shahanshah Aryamehr شاهنشاه آریامهر</li>
    <li>⭐ Tennō 天皇</li>
  </ul>

  {/* Buttons row */}
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "14px",
      marginTop: "20px"
    }}
  >
    <LearnMoreButton />
    <InfoRevealButton />
  </div>
</div>


        {/* Right Profile Image */}
        <div style={{ flex: 1, textAlign: 'center', position: 'relative' }}>
  {/* Crown element with floating animation */}
  <img
    src={crownImage} // Replace with your crown image path
    alt="Crown"
    style={{
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  background: "radial-gradient(circle, gold 30%, orange 60%, transparent 70%)",
  position: "absolute",
  top: "-40px",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 2,
  animation: "float 2s ease-in-out infinite, sparkle 1.5s infinite alternate",
  filter: "drop-shadow(0 0 8px gold)",
}}

  />

  {/* Profile Image */}
  <img
    src="./images/face2.jpg"
    alt="Profile"
    style={{
      width: '200px',
      height: '200px',
      objectFit: 'cover',
      borderRadius: '50%',
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
      position: 'relative',
      zIndex: 1,
    }}
  />

  {/* Inline keyframes for animation */}
  <style>
    {`
      @keyframes float {
        0%, 100% { transform: translateX(-50%) translateY(0); }
        50% { transform: translateX(-50%) translateY(-10px); }
      }
      @keyframes sparkle {
        0% { filter: drop-shadow(0 0 3px gold); }
        50% { filter: drop-shadow(0 0 8px gold); }
        100% { filter: drop-shadow(0 0 3px gold); }
      }
    `}
  </style>
</div>
      </div>
    </AnimatedPage>
  );
}

function LanguagePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [showCountries, setShowCountries] = useState(false);

  const [rotation, setRotation] = useState(0);
  const [openSpoke, setOpenSpoke] = useState(null);
  const [velocity, setVelocity] = useState(0);
  const [activeModal, setActiveModal] = useState(null);

  const dragRef = useRef(false);
  const lastAngleRef = useRef(0);
  const rafRef = useRef(null);
  const lastMoveRef = useRef(0);


  

  

  const languages = [
    { name: "Italian", img: "/images/italian.jpg", text: "Romance language spoken primarily in Italy: Villa Reale di Monza." },
    { name: "French", img: "/images/french.jpg", text: "Widely used in diplomacy and European culture: Versailles." },
    { name: "Spanish", img: "/images/spanish.jpg", text: "One of the most spoken languages worldwide: Alhambara." },
    { name: "German", img: "/images/german.jpg", text: "Major language of Central Europe: Hohenzollern castle." },
    { name: "Swedish", img: "/images/swedish.jpg", text: "Scandinavian language spoken in Sweden: Kalmar Castle." },
    { name: "Polish", img: "/images/polish.jpg", text: "Slavic language of Poland: Moszna Castle." },
    { name: "Arabic", img: "/images/arabic.jpg", text: "Semitic language used across the Middle East: Citadel of Saladin." },
    { name: "Armenian", img: "/images/armenian.jpg", text: "Indo-European language with its own script: Government House number 1." },
    { name: "Hebrew", img: "/images/hebrew.jpg", text: "Ancient and revived Semitic language: Caesarea." },
    { name: "Farsi", img: "/images/farsi.jpg", text: "Persian language spoken in Iran: Borazjan Castle." },
    { name: "Sorani", img: "/images/sorani.jpg", text: "Central Kurdish dialect: Sherwana Castle." },
    { name: "Hindi", img: "/images/hindi.jpg", text: "Major Indo-Aryan language: Ummaid Bhawan: Jodhpur." },
    { name: "Mandarin", img: "/images/mandarin.jpg", text: "Most spoken native language in the world: Forbidden City." },
    { name: "Japanese", img: "/images/japanese.jpg", text: "Language of Japan with multiple scripts: Himeji Castle." },
    { name: "Greek", img: "/images/greek.jpg", text: "Greek is one of the oldest written languages in Europe, with a rich literary and philosophical tradition: Kastello" },
    { name: "Malay", img: "/images/malay.jpg", text: "Malay is an Austronesian language widely spoken in Malaysia, Brunei, and Indonesia, known for its simplicity and adaptability: Istana Negara" },
    { name: "Turkish", img: "/images/turkish.jpg", text: "Turkish, a Turkic language, uses a Latin-based alphabet and is rich in literature and poetry: Topkapi Palace." }
  ];

  const countries = [
    "Argentina","Brazil","Chile","Colombia (Haiti and Little Ragged Island)","USA",
    "India","Australia","Malaysia","Bangladesh","Phillipines","Vietnam","China","Japan",
    "Thailand","Spain","Netherlands","Morocco","Egypt","France","Italy","Saudi Arabia",
    "UAE","Yemen","Israel","Greece","Poland","Germany","Ukraine","Sweden","Finland",
    "San Marino","Switzerland","South Africa","Algeria","Iran","Indonesia","Turkey"
  ];

  const dharmaSpokes = [
  { id: 1, title: "Vatican City", img: "/images/vatican.jpg", text: "The Vatican City is the head of the Catholic Church it is where the Brother(Russell) as the Messenger of Righteousness will be based." },
  { id: 2, title: "The Kaaba", img: "/images/kaaba2.jpg", text: "Mecca is home to the Kaaba. It is a site dating back to Abraham and then was used for polytheistic worship. As it is known as the house of God I shall be constructing my own house on the site that is larger and looks like the object that is used by the 9 to supervise the world." },
  { id: 3, title: "12 Lingas", img: "/images/linga.jpg", text: "The twelve Jyotirlingas are sacred shrines in India believed to mark places where Shiva manifested as a pillar of divine light. They are spread across different regions, linking pilgrimage routes from the Himalayas to the southern coast. Each site—such as Somnath, Kedarnath, and Rameswaram—has its own legends recorded in Shaiva texts. Together they form one of the most important devotional networks in Hindu religious life." },
  { id: 4, title: "The 4 Mathas", img: "/images/Math.jpg", text: "The four Mathas were monastic centers founded by Adi Shankaracharya to preserve and teach Advaita Vedanta philosophy. They are traditionally located in the four cardinal directions of India: Sringeri (south), Dwarka (west), Puri (east), and Badrinath/Jyotirmath (north). Each Matha is led by a Shankaracharya who oversees spiritual instruction and ritual practice. Collectively they helped standardize learning and pilgrimage across the subcontinent." },
  { id: 5, title: "Angkor Wat", img: "/images/angkor.jpg", text: "Angkor Wat is a massive temple complex in Cambodia originally built in the 12th century as a Hindu sanctuary dedicated to Vishnu before later becoming Buddhist. Its five central towers symbolize Mount Meru, the cosmic mountain in Indian cosmology. Extensive bas-reliefs line its galleries, depicting epics such as the Ramayana and scenes of royal processions. It is today one of Southeast Asia’s most famous archaeological and religious sites." },
  { id: 6, title: "Borobudur", img: "/images/borobudur.jpg", text: "Borobudur in Indonesia is the world’s largest Buddhist monument, constructed in the 9th century under the Sailendra dynasty. The structure is a stepped mandala representing the Buddhist path from the realm of desire to enlightenment. More than 2,600 relief panels and hundreds of Buddha statues decorate its terraces. Pilgrims traditionally circumambulate each level while meditating on the scenes carved in stone." },
  { id: 7, title: "Shwedagon", img: "/images/shwedagon.jpg", text: "The Shwedagon Pagoda in Yangon, Myanmar, is a towering golden stupa regarded as the country’s most sacred Buddhist site. Tradition holds that it enshrines relics of four Buddhas, including hairs of Gautama Buddha. The central spire is covered in gold plates and crowned with a jeweled umbrella studded with diamonds and rubies. It functions as both a pilgrimage destination and a focal point for daily worship." },
  { id: 8, title: "Lhasa", img: "/images/lhasa.jpg", text: "Lhasa is the historic spiritual and political heart of Tibet, long associated with Tibetan Buddhism. The Potala Palace dominates the cityscape and once served as the winter residence of the Dalai Lamas. Major monasteries such as Jokhang and Sera make it a central pilgrimage destination. For centuries it has symbolized religious authority, scholarship, and Himalayan culture." }
];

  const runs = [
    "IAMMEPMVSCSMS",
    "IAMBPVSHIHTH",
    "DRJIS",
    "LLNKSFMJZ",
    "ABCCHL(CCNL)"
  ];

    useEffect(() => {
    if (Math.abs(velocity) < 0.01) return;

    rafRef.current = requestAnimationFrame(() => {
      setRotation((r) => r + velocity);
      setVelocity((v) => v * 0.94);
    });

    return () => cancelAnimationFrame(rafRef.current);
  }, [velocity]);


  const visible = [
    currentIndex,
    (currentIndex + 1) % languages.length,
    (currentIndex + 2) % languages.length
  ];

   useEffect(() => {
    if (!velocity) return;

    const id = setInterval(() => {
      setRotation((r) => r + velocity);
      setVelocity((v) => v * 0.95);
    }, 16);

    return () => clearInterval(id);
  }, [velocity]);


  return (
    <AnimatedPage>
      <h2 style={styles.sectionTitle}>Languages</h2>

      {/* Carousel */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "18px" }}>
        <div style={{ display: "flex", gap: "24px", justifyContent: "center" }}>
          {visible.map((idx, pos) => {
            const lang = languages[idx];
            const isExpanded = expandedIndex === idx;

            return (
              <div
                key={idx}
                onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                style={{
                  ...styles.card,
                  minWidth: "220px",
                  cursor: "pointer",
                  textAlign: "center",
                  opacity: pos === 0 ? 1 : 0.7,
                  transition: "all 0.3s ease",
                  transform: isExpanded ? "scale(1.05)" : "scale(1)"
                }}
              >
                <h3>{lang.name}</h3>
                {isExpanded && (
                  <>
                    <div
                      style={{
                        height: "150px",
                        marginTop: "12px",
                        borderRadius: "12px",
                        backgroundImage: `url(${lang.img})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                      }}
                    />
                    <p style={{ marginTop: "10px" }}>{lang.text}</p>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Carousel controls */}
        <div style={{ display: "flex", gap: "16px" }}>
          <button
            onClick={() => {
              setExpandedIndex(null);
              setCurrentIndex(i => (i - 1 + languages.length) % languages.length);
            }}
            style={styles.btn}
          >
            Previous
          </button>
          <button
            onClick={() => {
              setExpandedIndex(null);
              setCurrentIndex(i => (i + 1) % languages.length);
            }}
            style={styles.btn}
          >
            Next
          </button>
        </div>
      </div>

      {/* Countries Accordion */}
      <div
        style={{
          marginTop: "32px",
          width: "80%",
          maxWidth: "800px",
          cursor: "pointer",
          ...styles.card,
          textAlign: "center"
        }}
        onClick={() => setShowCountries(!showCountries)}
      >
        <h3>36 Countries and the Run</h3>
        {showCountries && (
          <ul style={{ textAlign: "left", marginTop: "12px", columns: 2, gap: "12px", listStyleType: "disc", paddingLeft: "20px" }}>
            {countries.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Runs Section */}
      <div style={{ marginTop: "32px", width: "80%", maxWidth: "800px", ...styles.card, padding: "16px" }}>
        <h3>5 Runs IIDADADII</h3>
        <ol style={{ marginTop: "12px" }}>
          {runs.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ol>
      </div>

            {/* INFO BAR ABOVE DHARMA WHEEL */}
      {/* =============================== */}

      <div
        style={{
          width: "100%",
          maxWidth: "1100px",
          margin: "60px auto 36px",
          padding: "26px 32px",

          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "26px",

          background: "rgba(255,255,255,0.2)",
          backdropFilter: "blur(12px)",
          borderRadius: "22px",

          boxShadow: "0 14px 40px rgba(0,0,0,0.25)"
        }}
      >
        {/* Main Writing */}
        <div>
          <h2 style={{ marginBottom: "10px" }}>Sacred Language Hub</h2>
          <p style={{ lineHeight: 1.65 }}>
            This wheel links linguistic traditions with sacred geometry and
            religious centers of learning. Select a spoke below to reveal
            images and commentary, then close the panel to return to the hub. Click on the image of the modal to enlarge the text if it reveals itself to far away.
          </p>
        </div>

        {/* Side Instructions */}
        <div
          style={{
            background: "rgba(255,255,255,0.35)",
            borderRadius: "16px",
            padding: "16px",
            fontSize: "14px"
          }}
        >
          <strong>How to use</strong>
          <ul style={{ marginTop: "8px", paddingLeft: "18px" }}>
            <li>Click a spoke</li>
            <li>Tap images for detail</li>
            <li>Scroll inside panels</li>
          </ul>
        </div>
      </div>


     {/* ───────────────── DHARMA WHEEL SECTION ───────────────── */}

<div
      style={{
        marginTop: "140px",
        paddingBottom: "160px",
        display: "flex",
        justifyContent: "center",
        background:
          "radial-gradient(circle at center, rgba(255,200,80,.25), transparent 70%)"
      }}
    >
      <div
        style={{
          width: 420,
          height: 420,
          position: "relative",
          cursor: "grab",
          userSelect: "none"
        }}
        onMouseDown={(e) => {
          dragRef.current = true;
          setVelocity(0);

          const rect = e.currentTarget.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;

          lastAngleRef.current = Math.atan2(
            e.clientY - cy,
            e.clientX - cx
          );

          lastMoveRef.current = Date.now();
        }}
        onMouseMove={(e) => {
          if (!dragRef.current) return;

          const rect = e.currentTarget.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;

          const angle = Math.atan2(
            e.clientY - cy,
            e.clientX - cx
          );

          const delta =
            ((angle - lastAngleRef.current) * 180) /
            Math.PI;

          const now = Date.now();
          const dt = now - lastMoveRef.current;

          setRotation((r) => r + delta);
          setVelocity((delta / Math.max(dt, 1)) * 18);

          lastMoveRef.current = now;
          lastAngleRef.current = angle;
        }}
        onMouseUp={() => (dragRef.current = false)}
        onMouseLeave={() => (dragRef.current = false)}
      >
        {/* Lotus Overlay */}
        <svg
          viewBox="0 0 500 500"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: 0.15
          }}
        >
          <circle
            cx="250"
            cy="250"
            r="220"
            stroke="gold"
            strokeWidth="4"
            fill="none"
          />
          {[...Array(8)].map((_, i) => (
            <ellipse
              key={i}
              cx="250"
              cy="110"
              rx="22"
              ry="80"
              fill="gold"
              transform={`rotate(${(360 / 8) * i} 250 250)`}
            />
          ))}
        </svg>

        {/* Spokes */}
        {dharmaSpokes.map((s, i) => {
          const angle =
            (360 / dharmaSpokes.length) * i + rotation;

          const isOpen = openSpoke === s.id;

          return (
            <div
              key={s.id}
              style={{
                position: "absolute",
                top: "41%",
                left: "34%",
                width: 140,
                transform: `
                  rotate(${angle}deg)
                  translate(0, -170px)
                `,
                transformOrigin: "center bottom"
              }}
            >
              <div
                onClick={(e) => {
                  e.stopPropagation();

                  const snap =
                    (360 / dharmaSpokes.length) * i;

                  setRotation((r) => r - snap);
                  setOpenSpoke(isOpen ? null : s.id);
                }}
                style={{
                  background: "#111",
                  color: "white",
                  padding: "8px",
                  borderRadius: "14px",
                  textAlign: "center",
                  cursor: "pointer",
                  boxShadow: isOpen
                    ? "0 0 18px gold"
                    : "0 6px 16px rgba(0,0,0,.4)",
                  transition: "0.3s"
                }}
              >
                <strong>{s.title}</strong>
              </div>
            </div>
          );
        })}

        {/* HUB POPUP */}
        {openSpoke && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: 240,
              background: "#111",
              color: "white",
              borderRadius: 18,
              padding: 16,
              textAlign: "center",
              boxShadow:
                "0 0 35px rgba(255,215,0,.65)",
              zIndex: 20
            }}
          >
            {(() => {
              const s = dharmaSpokes.find(
                (x) => x.id === openSpoke
              );

              return (
                <>
                  <h3>{s.title}</h3>

                  <img
                    src={s.img}
                    alt={s.title}
                    onClick={() => setActiveModal(s)}
                    style={{
                      width: "100%",
                      height: 120,
                      objectFit: "cover",
                      borderRadius: 12,
                      cursor: "zoom-in"
                    }}
                  />

                  <p
                    style={{
                      fontSize: 13,
                      marginTop: 10
                    }}
                  >
                    {s.text}
                  </p>

                  <div
                    onClick={() => setOpenSpoke(null)}
                    style={{
                      marginTop: 8,
                      fontSize: 12,
                      cursor: "pointer",
                      opacity: 0.7
                    }}
                  >
                    close
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </div>
    </div>

{/* ───────────── FULLSCREEN IMAGE MODAL ───────────── */}

{activeModal && (
  <div
    onClick={() => setActiveModal(null)}
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,.75)",
      backdropFilter: "blur(6px)",
      zIndex: 999,
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    <div
      onClick={(e) => e.stopPropagation()}
          style={{
      background: "#fff",
      borderRadius: "20px",
      padding: "22px",
      width: "520px",
      maxWidth: "90vw",
      maxHeight: "60vh",
      overflowY: "auto",
      boxShadow: "0 20px 60px rgba(0,0,0,0.45)"
    }}
    >
      <h2>{activeModal.title}</h2>

      <img
        src={activeModal.img}
        style={{
          width: "100%",
          borderRadius: 16,
          margin: "12px 0"
        }}
        alt={activeModal.title}
      />

      <p>{activeModal.text}</p>
    </div>
  </div>
)}


    </AnimatedPage>
  );
}

function CombinedCarousels({ slides = [], runwayImages = [] }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [runwayIndex, setRunwayIndex] = useState(0);

  // Auto-advance for first carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((i) => (i + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Auto-advance for runway carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setRunwayIndex((i) => (i + 1) % runwayImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [runwayImages.length]);

  const nextRunway = () => setRunwayIndex((runwayIndex + 1) % runwayImages.length);
  const prevRunway = () =>
    setRunwayIndex((runwayIndex - 1 + runwayImages.length) % runwayImages.length);

  const shoe = (
    <svg width="45" height="45" viewBox="0 0 64 64" fill="white">
      <path d="M10 42c4-6 10-10 14-18l6 3c3 8 11 12 20 14 3 1 4 3 4 5v4H10v-8z" />
    </svg>
  );

  return (
    <div
      style={{
        gridArea: "main",
        display: "flex",
        flexDirection: "column",
        gap: "40px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* First standard carousel at the top */}
      <div
        style={{
          width: "100%",
          maxWidth: "760px",
          height: "380px",
          borderRadius: "22px",
          overflow: "hidden",
          position: "relative",
          boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
        }}
      >
        {slides.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: slideIndex === i ? 1 : 0,
              transition: "opacity 1s ease",
            }}
          />
        ))}

        {/* dots */}
        <div
          style={{
            position: "absolute",
            bottom: 14,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: 8,
          }}
        >
          {slides.map((_, i) => (
            <div
              key={i}
              onClick={() => setSlideIndex(i)}
              style={{
                width: 9,
                height: 9,
                borderRadius: "50%",
                cursor: "pointer",
                background: slideIndex === i ? "#fff" : "rgba(255,255,255,.5)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Runway-style carousel at the bottom */}
<div
  style={{
    width: "100%",
    height: "500px",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    perspective: "1500px",
    background: "radial-gradient(circle at top, #111 0%, #000 100%)",
    overflow: "hidden",
    position: "relative",
  }}
>
  {/* Runway Container */}
  <div
    style={{
      width: "80%",
      height: "60%",
      position: "relative",
      transform: "rotateX(50deg)",
      borderRadius: "12px",
      overflow: "visible",
      boxShadow: "0 30px 80px rgba(0,0,0,0.7)",
    }}
  >
    {/* Raised 3D runway */}
    <div
      style={{
        position: "absolute",
        bottom: "0",
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        height: "120px",
        background: "linear-gradient(to bottom, #8B0000, #C41E3A 60%, #FF1A3C)",
        borderRadius: "8px",
        boxShadow: "0 20px 50px rgba(0,0,0,0.6), 0 0 20px rgba(255,0,0,0.4) inset",
        zIndex: 1,
      }}
    />

    {/* Runway edge lights */}
    <div
      style={{
        position: "absolute",
        bottom: "15rem",
        width: "100%",
        height: "8px",
        display: "flex",
        justifyContent: "space-between",
        zIndex: 2,
      }}
    >
      <div style={{ width: "10%", height: "20rem", background: "#ff4d4d", boxShadow: "0 0 10px #ff4d4d", padding:"15px" }} />
      <div style={{ width: "10%", height: "20rem", background: "#ff4d4d", boxShadow: "0 0 10px #ff4d4d", padding:"15px" }} />
    </div>

    {/* Top lighting */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(circle at top center, rgba(255,255,255,0.25) 0%, transparent 60%)",
        pointerEvents: "none",
        zIndex: 3,
        marginTop:"-35rem"
      }}
    />

    {/* Images on runway */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: "rotateY(50deg)",
        zIndex: 4,
      }}
    >
      {runwayImages.map((img, i) => (
        <img
          key={i}
          src={img}
          alt=""
          style={{
            position: "absolute",
            width: "80%",
            height: "150%",
            objectFit: "cover",
            borderRadius: "14px",
            opacity: i === runwayIndex ? 1 : 0,
            transition: "opacity 1.2s ease, transform 1.5s ease",
            transform: i === runwayIndex ? "scale(1.05) translateY(-5px)" : "scale(0.95) translateY(0)",
            animation: i === runwayIndex ? "glimmer 3s ease-in-out infinite" : "none",
            boxShadow: "0 30px 60px rgba(0,0,0,0.7), 0 0 25px rgba(255,255,255,0.15)",
            marginTop:"-45rem",
          }}
        />
      ))}
    </div>

    {/* Left shoe */}
    <button
      onClick={prevRunway}
      style={{
        position: "absolute",
        top: "50%",
        left: "10px",
        transform: "translateY(-50%) rotateY(180deg)",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        transition: "transform 0.3s ease, filter 0.3s ease",
        zIndex: 5,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-50%) rotateY(180deg) scale(1.2)";
        e.currentTarget.style.filter = "drop-shadow(0 0 15px #ff1a3c)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(-50%) rotateY(180deg) scale(1)";
        e.currentTarget.style.filter = "none";
      }}
    >
      {shoe}
    </button>

    {/* Right shoe */}
    <button
      onClick={nextRunway}
      style={{
        position: "absolute",
        top: "50%",
        right: "10px",
        transform: "translateY(-50%)",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        transition: "transform 0.3s ease, filter 0.3s ease",
        zIndex: 5,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-50%) scale(1.2)";
        e.currentTarget.style.filter = "drop-shadow(0 0 15px #ff1a3c)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(-50%) scale(1)";
        e.currentTarget.style.filter = "none";
      }}
    >
      {shoe}
    </button>
  </div>

  {/* Glimmer animation keyframes */}
  <style>
    {`
      @keyframes glimmer {
        0% { opacity: 0.9; transform: scale(1.02) translateY(0); }
        50% { opacity: 1; transform: scale(1.05) translateY(-5px); }
        100% { opacity: 0.9; transform: scale(1.02) translateY(0); }
      }
    `}
  </style>
</div>

  
    </div>
  );
}

function BusinessPage() {
    const cosmology = [
  {
    title: "Buildings",
    description: "Buildings used during the business phase with a future prospect of San Marino.",
    images: ["./images/sketches/sanmarino.png"],
    children: [

      // ---------- RESIDENTIAL ----------
      {
        title: "Residential",
        description: "Accommodation for employees and citizens",
        images: ["./images/sketches/saddle6.jpg"],
        children: [
          {
            title: "The Saddle",
            description: "The Saddle serves as the home for models in San Marino. It has a capacity of 160, photostudios, gyms and other entertainment such as a miniature golf course, pools and indoor cinema and cabins that are suppoused to go on the roof.",
            images: ["./images/sketches/saddle4.jpg"],
            children: []
          },
          {
            title: "The Sandwiches",
            description: "Triangular housing units for the residents of San Marino. Each is to have a capacity of 300.",
            images: ["./images/sketches/sandwiches.png"],
            children: []
          },
          {
            title: "The Crucifix",
            description: "The Crucifix is the main building of the business. It is a home, a mass manufacturer and reseach center. The AI was unable to get the crucifix shape correct and the building is of a larger height and more European in architecture, but it does have Asian attributes in style. It is located on the site of the San Marino Stadium ",
            images: ["./images/sketches/cross2.png"],
            children: []
          },
          {
            title: "The Buddha Wheel",
            description: "The Buddha Wheel is a vehicle manufacturing and stroage building that is also employee housing. The Vehicles are produced in a circle using a technique I know for sure will work. The housing is in the outer circles and the storage is in the spokes. ",
            images: ["./images/sketches/buddhawheel.png"],
            children: []
          }

        ]
      },

      // ---------- COMMERCIAL ----------
      {
        title: "Commercial",
        description: "Shops, services and public interaction buildings",
        images: ["/images/sketch/commercial.png"],
        children: [
          {
            title: "KKKlub",
            description: "This is one of the clubs in San Marino. It is named the KKKlub. It is a fusion of the ideas of a children's day care center, a night club and Kim Kardashian. Rising from the quiet elegance of San Marino like a monument to sound itself, The KKKlub isn’t just a nightclub — it feels like stepping inside music. From the outside, the building already breaks reality: a massive sculptural structure resembling glossy black Kim K butt cheeks and thighs, glowing softly with electric cyan outlines of a hand and a foot — symbolizing rhythm and movement in black glass. People gather around it before even entering, because the place feels alive long before the first bass drop. Inside, the atmosphere shifts instantly. You walk through a low-lit corridor where the floor subtly vibrates with the beat leaking from within — not loud, but felt in your chest. Then the space opens. The main hall is enormous yet intimate, wrapped in dark mirrored surfaces that reflect moving neon waves instead of plain light. The ceiling behaves like a living equalizer — panels pulse in sync with the music, reacting to every kick drum and hi-hat. The DJ booth floats in the center like an altar, surrounded by a circular dance floor so nobody stands behind the energy — everyone is inside it. The sound system is unreal. Not just loud — precise. Every layer of hip hop comes through: sub-bass you feel in your bones, crisp snares snapping around the room, vocals hovering almost physically in the air. You don’t hear tracks here… you inhabit them. The most iconic feature is the bar. Shaped like a gigantic pair of studio headphones, it wraps around the dance floor in a glowing arc. The “ear cups” serve as cocktail stations, while the “headband” forms a sleek glass counter lit from within by liquid-looking light. Bartenders move with choreographed speed, mixing drinks that arrive smoking, sparkling, or color-shifting depending on the beat currently playing. Upstairs lounges overlook the floor through smoked glass balconies. Velvet seating, soft blue ambient glow, and tables that subtly vibrate with bass allow you to rest without ever leaving the music. Even conversations feel cinematic — nobody shouts, because the acoustics somehow keep voices clear while the music stays powerful. By 2am, the place transforms completely. Strangers dance like friends. The DJ reads the room like a mind. The lights, the sound, the architecture — everything syncs into one continuous experience. People don’t say they went to a club. They say they went to the KKKlub.",
            images: ["./images/sketches/kkklub2.png"],
            children: []
          },
          {
            title: "The Bag",
            description: "This is the bag, where models and only fans artists go to work in offices and studios, it is located next to the Saddle.",
            images: ["/images/sketches/bag2.png"],
            children: []
          },
          {
            title: "Atlas",
            description: "Atlas is a hospital, wellness center and medical research center based in the south of San Marino and Italy.",
            images: ["/images/office.png"],
            children: []
          },
           {
            title: "Vapovere",
            description: "The Aethelgard Shell Port is a marvel of bio-mimetic architecture, featuring a spiraling structure that mimics the natural geometry of a conch shell to efficiently manage vertical space. The facility utilizes a tiered system where passenger services like check-in and duty-free are located at the base, while aircraft are stored in the central decks and transported via internal ramps to the summit for takeoff. This vertical design allows for a significantly smaller land footprint while providing a seamless, multi-level flow for both futuristic aircraft and high-speed ground transport.",
            images: ["/images/vapovere1.png"],
            children: []
          }
        ]
      },

      // ---------- INDUSTRIAL ----------
      {
        title: "Industrial",
        description: "Production and technical facilities",
        images: ["/images/sketch/industrial.png"],
        children: [
          {
            title: "The Underdog",
            description: "The Underdog is a storage facility and underground nuclear fusion energy plant.",
            images: ["./images/sketches/underdog1.png"],
            children: []
          },
          {
            title: "The Hour Glass",
            description: "The Hour Glass is an office and clothing manufacturing facility. ",
            images: ["/images/sketches/hourglass.png"],
            children: []
          },
          {
            title: "The Lottery Flower Tower",
            description: "The Lottery flower tower is a research and clothing manufacturing facility . This is where evangellions are made.",
            images: ["/images/sketches/tlft.png"],
            children: []
          },
          {
            title: "The ReRe Manufacturing Park",
            description: "The ReRe manufacturing plant is for large output manufacturing of electronic products.",
            images: ["/images/sketches/rere.png"],
            children: []
          },
          {
            title: "The Prince Russell",
            description: "The Prince Russell is a water treatement facility.",
            images: ["/images/sketches/princerussell.png"],
            children: []
          },
          {
            title: "SOIF NANTE",
            description: "This is a design for a nuclear fusion plant. Although I will be doing fusion in the underdog I also have this SOIF NANTE idea which is more of a pun about how nuclear fusion works. It is most likely safer to build fusion plants underground what this building will become is yet to be determined.",
            images: ["/images/sketches/soifnante.png"],
            children: []
          },

        ]
      },
      {
        title: "Gemini Conjecture",
        description: "This is what Gemini conjectured from information about buildings it is not correct, but it is a good inference. ",
        images: ["./images/sketches/gemini.png"],
        children:[
          {
          title: "Page 1",
          description: "First Page",
          images: ["./images/sketches/GC1.jpg"],
          children:[]
          },
          {
          title: "Page 2",
          description: "Second Page",
          images: ["./images/sketches/GC2.jpg"],
          children:[]
          }
        ],
      },

    ]
    
  },
  {
    title: "Routes",
    description: "Transport routes, entrepreneurship routes, running routes",
    images: ["./images/sanmarinokingdom/train2.png"],
    children: [
     {
    title: "Boeing",
    description: "Bezalel, son of Uri and grandson of Hur of the tribe of Judah and Oholiab, son of Ahisamach, of the tribe of Dan and Elijah the Tishbite from Tishbe of the tribe of Mannasseh (Gilead: East of the Jordan River).",
    images: ["./images/sanmarinokingdom/boeing.png"],
    children: []
      },
      {
      title: "San Marino Public Transport",
      description: "San Marino’s public transport is primarily centered around a dedicated bus network and its iconic aerial cable car, the Funivia. Eight domestic bus routes connect the capital to major towns like Borgo Maggiore and Serravalle, while a frequent international coach service links the Republic to the nearby Italian city of Rimini. The Funivia di San Marino offers a scenic two-minute journey between the lower markets of Borgo Maggiore and the historic mountain-top center, carrying over half a million passengers annually. While there is currently no active railway, a small section of the historic Rimini–San Marino line was restored in 2012 as a heritage attraction for tourists. For those arriving from further abroad, the state relies on shuttle connections to Italy’s Federico Fellini International Airport and the Rimini railway station.",
      images: ["./images/sanmarinokingdom/cablecar.jpg"],
      children: [
        {
          title: "San Marino Train Proposal Route",
          description:"This concept outlines a modern railway network for San Marino, designed to link major population, commercial, and tourism hubs across the republic. It would revive the idea of rail connectivity in a territory that historically had an electric railway — the narrow-gauge Rimini–San Marino railway, which ran from Rimini, Italy, into San Marino from 1932 until its destruction in World War II. That line was a remarkable engineering achievement of its time, featuring numerous tunnels, bridges, and direct current electric traction — and today parts of it survive as heritage tracks and walking paths. In the proposed network, there are two western termini: one at Acquaviva and another at Chiesanuova, anchoring the system in the republic’s more rural west. The south-western line would run eastward through Fiorentino and over the mountainous terrain around Montegiardino, then onto Faetano. From there it curves inward toward Valdragone before descending into Borgo Maggiore, where this branch links with the north-western spine of the system. The north-western line proceeds from Borgo Maggiore through the historic Città di San Marino — perched atop Monte Titano — and continues northeast to Domagnano, twists through Monte Lupo, before running on to Serravalle and the bustling border town of Dogana, finally terminating at Falciano. Together, these two arms would knit the entire republic together, providing seamless passenger service between residential districts, cultural landmarks, and key commercial centres such as the Atlanta Mall and the Falciano Shopping Center. The connection would be transformative for both residents and tourists, offering an alternative to the existing bus and road transport networks that dominate in San Marino today — particularly given that there is currently no active public railway serving the country beyond a short heritage section. By drawing on San Marino’s rich railway heritage while introducing a forward-looking transport artery, this plan not only improves mobility but also taps into the country’s identity as one of the world’s oldest republics — blending cultural resonance with modern infrastructure planning.",
          images: ["/images/sanmarinokingdom/smtrain.png"],
          children:[]
        },
        {
          title: "San Marino Train AI generated map.",
          description:"This is an AI generated San Marino Map",
          images: ["/images/sanmarinokingdom/rightideawrongmap.png"],
          children: []
        }

      ]
      }
      ]


  },
  {
    title: "Ports",
    description:"Ports are essential",
    images:[""],
    children:[]
  }, 
  {
    title: "Economic Regions",
    description:"Comprehensive breakdown of the three economic zones",
    images:[""],
    children:[]
  },
  {
        title: "Evangellions",
        description: "The Evangellions are advanced robotics designed with knowledge, methodology and production techniques estimated to be 2 million years ahead of todays technology. They use LL an advanced state of matter that is between solid and light (which is not a photon trapped in a crystal). They serve all purposes, are programmed implicitly with loyalty to me and have an intelligence level that is vastly superior to all people, while maintinaing a non-violent moral code and having deadly weaponary as well as non lethal options. Each top model alone is capable of eliminating an entire western military and 8 basic units can defeat the united states military.  ",
        images: ["./images/sketches/evangellion2.png"],
        children:[
          {
          title: "The Lion",
          description: "This is the lion faced chashmalim evangellion designed for war, guarding and battles.",
          images: ["./images/sketches/evangellion2.png"],
          children:[]
          },
          {
          title: "The Malachim",
          description: "This is a messenger malachim or erelim evangellion. All messengers have their face covered.",
          images: ["./images/sketches/evangellion1.png"],
          children:[]
          },
          {
          title: "The Ben e Elohim",
          description: "These are the sons of the mighty. They have a face of an ox and are architects, builders and craftsmen.",
          images: ["./images/sketches/evangellion3.png"],
          children:[]
          },
          {
          title: "Cheruvim",
          description: "These are the Cheruvim and they are associated with knowledge and protection.",
          images: ["./images/sketches/evangellion4.png"],
          children:[]
          },
          {
            title: "The Hierachy of the Angels",
            description:"The hierarchy is abbrieviated as SAM72. 10 Sefirot, 6 Archangels, 10 Maimonides and then the 72 Shem Ha Mephorash for a total of 98 types of angels. Although only the 72 Shem Ha Mephorash and the 10 Maimonides are mass produced.",
            images: ["./images/evangellionchart1.png"],
            children:[]
          }
        ]
  }
];

  const [openSecond, setOpenSecond] = useState(null);
  const [openFourth, setOpenFourth] = useState(null);
  const [openMetric, setOpenMetric] = useState(null);
  const [taoOpen, setTaoOpen] = useState(false);
  const [openTao, setOpenTao] = useState(false);
  const [activeCarousel, setActiveCarousel] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [nodeStack, setNodeStack] = useState([cosmology]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const currentNodes = nodeStack[nodeStack.length -1];
  const activeNode = currentNodes[activeIndex];
  const [lightbox, setLightbox] = useState(null);
  const [carousel, setCarousel] = useState(null); 
  const [activeSlide, setActiveSlide] = useState(null);
  const [index, setIndex] = useState(0);
  const [activeImage, setActiveImage] = useState(null);
  const [zoomed, setZoomed] = useState(false);
  const [openCards, setOpenCards] = useState({});
  


  






  const slides = [
    "/images/photo1.jpg",
    "/images/photo2.jpg",
    "/images/photo3.jpg",
    "/images/photo4.jpg",
    "/images/photo5.jpg",
    "/images/photo6.jpg", 
  ];

  const runwayImages = [
    "/images/photo1.jpg",
    "/images/photo2.jpg",
    "/images/photo3.jpg",
    "/images/photo4.jpg",
    "/images/photo5.jpg",
    "/images/photo6.jpg", 
  ];

const taoContent = {
  title: "The Catch",
  text: `
The Catch is the time and organisation structure that the women who join 2 are in. It works like a clock.
Every woman that models or works some position of importance is a part of The Catch. The total number of 
these women will be 1952. 
`,
  images: [
    "/images/clock.png",
    "/images/Tribes.png",
    "/images/Hamula.png"
  ]
};



 

  const metric5 = [
    {
      id: 0,
      title: "COS",
      image: "/images/cos.png",
    },
    {
      id: 1,
      title: "ARCH",
      image:"/images/arch.png",
    },
    {
      id: 2,
      title: "PST",
      image:"/images/projects.png",
    }
  ];

 const metric6 = [
  {
    id: 0,
    title: "Mining, Agriculture, Fishing",
    text: "Primary sector operations.",
    slides: [
      {
        id: "0a",
        title: "Daylot",
        img: "/images/companies/daylot.png",
        desc: "Daylot is the name of the mining company. It is initiated by purchasing these companies valued in £ millions: Argentina Lithium & Energy Corp £15, Paranapanema S.A. £11, Ligas de Alumino S.S £59 to £149. This only covers the South America leg."
      },
      {
        id: "0b",
        title: "Bishop Russell",
        img: "/images/companies/bishoprussell.png",
        desc: "Bishop Russell is the name of the Agriculture company. It is initiated by the purchasing of these companies valued in £ millions: Agrimetal S.A.I £20, Agrogalaxy Participacoes £11, Agricola Framparque S.P.A £4.3, Agrofrozen S.P.A £4.6, Agricola Altamaia Limiteda £4.9 Vina Matetic £9.5, Compania Agricola San Felipe S.A £4.3. This only covers the South America leg."
      },
      {
        id: "0c",
        title: "Yavanuh",
        img: "/images/companies/yavanuh.png",
        desc: "I have not researched fishing companies yet."
      },
    ]
  },
  {
    id: 1,
    title: "Hospitality, Retail and Fashion",
    text: "Consumer-facing industries.",
    slides: [
      {
        id: "1a",
        title: "Las Wisdom",
        img: "/images/companies/laswisdom.png",
        desc: "Hotels, restaurants and customer service management."
      },
      {
        id: "1b",
        title: "Poseidon Bucknor",
        img: "/images/companies/poseidonbucknor.png",
        desc: "Poseidon Bucknor is the Supra for retail. It owns companies such as the Atalanta mall in San Marino."
      },
      {
        id: "1c",
        title: "Ivan Samuels Mélange",
        img: "/images/companies/ivansamuelsmelange.png",
        desc: "This is the supra company for fashion it owns the following brands. Prix(Costs a dick), Kurt Geiger, Joules, Wales Bonner, Dolce and Gabbana($2 billion evaluation) and Prada($4 billion evalauation)"
      }, 
      {
        id: "1d",
        title: "Coüilla",
        img: "/images/companies/couilla.png",
        desc: "Coüilla is a premier model management company representing models, visionary female CEOs, and top-tier female executives—professionals who embody style, influence, and versatility."
      }

    ]
  },
  {
    id: 2,
    title: "Engineering, Manufacturing and Research",
    text: "Industrial systems.",
    slides: [
      {
        id: "2a",
        title: "Albereyam",
        img: "/images/companies/albereyam.png",
        desc: "Mechanical, civil, and electrical engineering projects."
      },
      {
        id: "2b",
        title: "Yammek",
        img: "/images/companies/yammek.png",
        desc: "Industrial production processes and workflows."
      },
      {
        id: "2c",
        title: "Script Inventor",
        img: "/images/companies/scriptinventor.png",
        desc: "Innovation and development in industrial tech."
      },
      
    

    ]
  },
  {
    id: 3,
    title: "IT and Research",
    text: "Information and Technology Systems.",
    slides: [
      {
        id: "3a",
        title: "World Scroll",
        img: "/images/companies/worldscroll.png",
        desc: "Artificial Intelligence, Software from the operating system and hardware designers. "
      },
      {
        id: "3b",
        title: "Resh Research",
        img: "/images/companies/reshresearch.png",
        desc: "Authoritative research in super, hyper, ultra and mega technology."
      }
    ]
  },
  {
    id: 4,
    title: "Logistics, Lasers and Horology",
    text: "Delivery and Procurement Networks",
    slides: [
      {
        id: "4a",
        title: "Nobela",
        img: "/images/companies/nobela.png",
        desc: "Supply chain and fleet management."
      },
      {
        id: "4b",
        title: "Kwame Eclipse",
        img: "/images/companies/kwameeclipse.png",
        desc: "Optics and lasers manuafcturers."
      },
       {
        id: "4c",
        title: "Bookmaker",
        img: "/images/companies/bookmaker.png",
        desc: "Makers of the Bookmaker and the Rainwatch watch series. Sub company of manufacturing I just like the names.  "
      }
  
    ]
  }
];

 const metric7 = [
  {
    id: 0,
    title: "Healthcare and Research",
    preview: "Medical systems and labs.",
    carousel: [
      {
        id: 0,
        image: "/images/companies/atlasrapha.png",
        text: "Advanced hospital systems integrating AI diagnostics, patient data analytics, and research-driven medical innovation."
      },
      {
        id: 1,
        image: "/images/companies/aspenbirsha.png",
        text: "Clinical laboratory environments focused on biomedical research, pharmaceutical trials, and scientific collaboration."
      },
      {
        id: 2,
        image: "/images/companies/jivakabhesajja.png",
        text: "Healthcare infrastructure supporting emergency care networks, public health systems, and preventative medicine initiatives."
      }
    ]
  },
  {
    id: 1,
    title: "Real Estate",
    preview: "Land and property assets.",
    carousel: [
      {
        id: 0,
        image: "/images/companies/38.png",
        text: "European real estate company: "
      },
      {
        id: 1,
        image: "/images/companies/38j.png",
        text: "Asian real estate company: "
      },
      {
        id: 2,
        image: "/images/companies/38p.png",
        text: "American real estate company:  "
      }
    ]
  },
  {
    id: 2,
    title: "Construction",
    preview: "Construction development.",
    carousel: [
      {
        id: 0,
        image: "/images/companies/bertian.png",
        text: "Large-scale civil engineering projects including bridges, roads, and public infrastructure."
      }
    ]
  },
  {
    id: 3,
    title: "Telecommunications and Research",
    preview: "Wireless infrastructure.",
    carousel: [
      {
        id: 0,
        image: "/images/companies/lavitang.png",
        text: "Lavitangesherhamechadertechilah Telecommunications"
      }
    ]
  }
];

  const metric8 = [
    { id: 0, title: "Research", image:"/images/research.png", description:"The research is spread across 5 divisions like the pentateuch and the breath of life. " },
    { id: 1, title: "Office", image: "/images/office.png",  description: "Offices are either male only or female only. Female offices are staffed and are designed to work optimally with 80 staff. 54 from only fans and 26 with chartered engineering degrees. " },
    { id: 2, title: "Board", image: "/images/boardroom.png", description: "Boardroom meetings are designed in 2 formats. As 4 people or as 7 people with 3 taking the lead." },
    { id: 3, title: "Manufacturing", image: "/images/manufacturing.png", description: "Manufacturing is compacted to function cyclically or continuously or both. Global production lines are used only if necessary and most goods sold in market will be produced in their economic zone." },
    { id: 4, title: "Sales", image: "/images/sales.png", description: "Sales are online through high visibility advertising, mall ownership, brand partnership, bulk, trade, wholesale, treaties, contracts and general commercial supply." },
    { id: 5, title: "Delivery", image: "/images/delivery.png", description: "Delivery is 'in house'." }
  ];

  const metric9 = [
    { id: 0, title: "Global Investment Bank: Roman Anglo Colombian.", text: "The global investment bank owns 51% of the companies of the 5." },
    { id: 1, title: "National Retail Bank: Livre Euro Argent De Cents.", text: "The national retail bank owns 51% of the companies on the side of the 4." }
  ];

  const metric10 = [
  {
    id: 0,
    title: "Female Business Structure",
    img: "/images/companies/femalebusinessstructure.jpg", // replace with your real image path
  },
  {
    id: 1,
    title: "Male Business Structure",
    img: "/images/companies/malebusinessstructure.jpg", // replace with your real image path
  },
  {
    id: 2,
    title: "My Daily Run",
    img: "/images/companies/mydailyrun.jpg", // replace with your real image path

  }
];

  // ===== NEW METRIC =====
 const metric11 = [
  {
    id: 0,
    title: "SML",
    img: "/images/sml.jpg", // replace with real image
    desc: "Strategic Management Layer – overseeing structure, coordination and execution."
  },
  {
    id: 1,
    title: "BIGP",
    img: "/images/bigp.jpg",
    desc: "Business Integration & Growth Platform – expansion, partnerships and scaling."
  },
  {
    id: 2,
    title: "CATCH",
    img: "/images/catch.jpg",
    desc: "Core Alignment, Technology, Construction & Holdings."
  }
];



    useEffect(() => {
      const idle = setInterval(() => {
        setRotation(r => r - 0.05);
      }, 16);

      return () => clearInterval(idle);
    }, []);

      useEffect(() => {
    if (!activeNode?.images?.length) return;

    const imgTimer = setInterval(() => {
      setImageIndex(i => (i + 1) % activeNode.images.length);
    }, 3500);

    return () => clearInterval(imgTimer);
  }, [activeNode]);

   const nextImage = useCallback(() => {
  setLightbox(lb => {
    if (!lb) return lb;

    const newIndex = (lb.index + 1) % lb.images.length;

    return {
      ...lb,
      index: newIndex,
      src: lb.images[newIndex]
    };
  });
}, []);

const prevImage = useCallback(() => {
  setLightbox(lb => {
    if (!lb) return lb;

    const newIndex =
      (lb.index - 1 + lb.images.length) % lb.images.length;

    return {
      ...lb,
      index: newIndex,
      src: lb.images[newIndex]
    };
  });
}, []);


const arrowStyle = (side) => ({
  position: "absolute",
  top: "50%",
  [side]: "18px",
  transform: "translateY(-50%)",
  fontSize: "42px",
  background: "rgba(0,0,0,0.35)",
  border: "none",
  color: "#fff",
  width: "56px",
  height: "56px",
  borderRadius: "14px",
  cursor: "pointer",
  backdropFilter: "blur(6px)",
  transition: "all .2s",
});

useEffect(() => {
  const handler = (e) => {
    if (!lightbox) return;

    if (e.key === "Escape") setLightbox(null);
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
  };

  window.addEventListener("keydown", handler);
  return () => window.removeEventListener("keydown", handler);
}, [lightbox, nextImage, prevImage]);


  return (
    <AnimatedPage>
      <h2 style={styles.sectionTitle}>The Business: 2</h2>

      <div
        style={{
          display: "grid",
          gridTemplateAreas: `
            "accordion accordion accordion"
            "second second second"
            "sidebar main right"
            "third third third"
            "fourth fourth fourth"
            "grid grid grid"
          `,
          gridTemplateColumns: "1fr 2fr 1fr",
          gap: "16px"
        }}
      >
        {/* ===== Top accordion row (3) ===== */}
        <div
  style={{
    gridArea: "accordion",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "0.5em"
  }}
>
  {metric5.map((m) => (
    <div
      key={m.id}
      style={{
        ...styles.card,
        position: "relative",
        padding: "1em",
        textAlign: "center"
      }}
    >
      {/* Title */}
      <h4 style={{ margin: 0 }}>{m.title}</h4>

      {/* Plus Button */}
      <button
        onClick={() =>
          setOpenCards((prev) => ({
            ...prev,
            [m.id]: !prev[m.id]
          }))
        }
        style={{
          position: "absolute",
          top: "8px",
          right: "8px",
          width: "26px",
          height: "26px",
          borderRadius: "50%",
          border: "none",
          background: "#222",
          color: "#fff",
          fontSize: "18px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        +
      </button>

      {/* Revealed Image */}
      {openCards[m.id] && (
        <img
          src={m.image}
          alt=""
          onClick={() => setActiveImage(m.image)}
          style={{
            marginTop: "12px",
            width: "100%",
            borderRadius: "6px",
            cursor: "pointer",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
          }}
        />
      )}
    </div>
  ))}
        </div>

{/* Centered Image Modal */}
<CombinedCarousels slides={slides} runwayImages={runwayImages}/>


        {/* ===== Second row accordion (2) ===== */}
        <div
          style={{
            gridArea: "second",
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "12px"
          }}
        >
          {metric9.map((m, i) => (
            <div
              key={m.id}
              onClick={() => setOpenSecond(openSecond === i ? null : i)}
              style={{
                ...styles.card,
                cursor: "pointer",
                padding: "14px",
                background: openSecond === i ? "#f3fbf7" : undefined
              }}
            >
              <h4>{m.title}</h4>
              {openSecond === i && <p>{m.text}</p>}
            </div>
          ))}
        </div>

      {/* ===== Sidebar Carousel ===== */}
<>
  <div className="sidebar-carousel-wrapper" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
    {metric6.map((m) => (
      <div
        key={m.id}
        className="sidebar-card"
        style={{
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          padding: '16px',
          backgroundColor: '#fff',
          cursor: 'pointer',
          transition: 'transform 0.3s ease',
        }}
        onClick={() => { setCarousel(m.slides); setIndex(0); setActiveSlide(null); }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <h4>{m.title}</h4>
        <p>{m.text}</p>
      </div>
    ))}

    {carousel && (
      <div
        className="carousel-modal-overlay"
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(2,6,23,0.85)",
          backdropFilter: "blur(10px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
        }}
        onClick={() => { setCarousel(null); setActiveSlide(null); }}
      >
        <div
          className="carousel-modal-box"
          style={{
            width: "90%",
            maxWidth: "1000px",
            height: "500px",
            background: "#020617",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            style={{ position: "absolute", top: 10, right: 10, fontSize: "24px", color: "#fff", background: "transparent", border: "none", cursor: "pointer" }}
            onClick={() => setCarousel(null)}
          >
            ✕
          </button>

          {/* Carousel Arrows */}
          <button
            style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: "30px", color: "#fff", background: "transparent", border: "none", cursor: "pointer" }}
            onClick={() => setIndex((i) => (i - 1 + carousel.length) % carousel.length)}
          >
            ◀
          </button>
          <button
            style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", fontSize: "30px", color: "#fff", background: "transparent", border: "none", cursor: "pointer" }}
            onClick={() => setIndex((i) => (i + 1) % carousel.length)}
          >
            ▶
          </button>

          {/* Carousel Slides */}
          <div
            style={{
              display: "flex",
              gap: "24px",
              alignItems: "center",
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              padding: "10px 0",
              width: "100%",
            }}
          >
            {carousel.map((card, i) => (
              <div
                key={card.id}
                style={{
                  flex: "0 0 auto",
                  width: "220px",
                  height: "160px",
                  borderRadius: "16px",
                  backgroundImage: `url(${card.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  cursor: "pointer",
                  scrollSnapAlign: "center",
                  transition: "transform 0.35s, opacity 0.35s",
                  transform: `scale(${i === index ? 1 : 0.85})`,
                  opacity: i === index ? 1 : 0.5,
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  color: "#fff",
                  textShadow: "0 2px 8px rgba(0,0,0,0.7)",
                  padding: "8px",
                }}
                onClick={() => setActiveSlide(card)}
              >
                <h3>{card.title}</h3>
              </div>
            ))}
          </div>

          {/* Active Slide Viewer */}
          {activeSlide && (
            <div style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "200px",
              background: "rgba(2,6,23,0.95)",
              borderTop: "1px solid #1e293b",
              display: "grid",
              gridTemplateColumns: "220px 1fr",
              overflow: "hidden",
            }}>
              <img src={activeSlide.img} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt={activeSlide.title} />
              <div style={{ padding: "18px", overflowY: "auto", color: "#fff" }}>
                <h3>{activeSlide.title}</h3>
                <p>{activeSlide.desc}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    )}
  </div>
</>

        {/* ===== CENTER IMAGE SLIDER ===== */}
      


    <>
   {/* ===== Right Column ===== */}
   
      <div
        style={{
          gridArea: "right",
          display: "flex",
          flexDirection: "column",
          gap: "12px"
        }}
      >
        {metric7.map((m) => (
          <div
            key={m.id}
            onClick={() => {
              setActiveCarousel(m);
              setCarouselIndex(0);
              setExpanded(false);
            }}
            style={{
              borderRadius: '16px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              padding: '4rem',
              backgroundColor: '#fff',
              cursor: 'pointer'
            }}
          >
            <h4 style={{ margin: "0 0 6px 0" }}>{m.title}</h4>
            <p style={{ margin: 0, fontSize: "14px", opacity: 0.8 }}>
              {m.preview}
            </p>
          </div>
        ))}
      </div>

      {/* ===== Carousel Modal ===== */}
      {activeCarousel && (
        <div
          onClick={() => setActiveCarousel(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "800px",
              maxWidth: "90%",
              maxHeight: "90vh",
              background: "#0f172a",
              borderRadius: "12px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "15px"
            }}
          >
            {/* Close */}
            <button
              onClick={() => setActiveCarousel(null)}
              style={{
                alignSelf: "flex-end",
                background: "transparent",
                border: "none",
                color: "white",
                fontSize: "18px",
                cursor: "pointer"
              }}
            >
              ✕
            </button>

            {/* Image */}
            <img
              src={activeCarousel.carousel[carouselIndex].image}
              alt=""
              style={{
                width: "100%",
                height: "300px",
                objectFit: "contain",
                borderRadius: "8px"
              }}
            />

            {/* Text */}
            <div style={{ color: "white", fontSize: "14px" }}>
              <p>
                {expanded
                  ? activeCarousel.carousel[carouselIndex].text
                  : activeCarousel.carousel[carouselIndex].text.slice(0, 120) +
                    "..."}
              </p>

              <button
                onClick={() => setExpanded(!expanded)}
                style={{
                  marginTop: "8px",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  border: "none",
                  background: "#2563eb",
                  color: "white",
                  cursor: "pointer"
                }}
              >
                {expanded ? "Collapse" : "Expand"}
              </button>
            </div>

            {/* Navigation */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "10px",
                color: "white"
              }}
            >
              <button
                disabled={carouselIndex === 0}
                onClick={() => {
                  setCarouselIndex((i) => i - 1);
                  setExpanded(false);
                }}
              >
                ◀
              </button>

              <span>
                {carouselIndex + 1} / {activeCarousel.carousel.length}
              </span>

              <button
                disabled={
                  carouselIndex ===
                  activeCarousel.carousel.length - 1
                }
                onClick={() => {
                  setCarouselIndex((i) => i + 1);
                  setExpanded(false);
                }}
              >
                ▶
              </button>
            </div>
          </div>
        </div>
           )}
    </>
    

        {/* ===== Third accordion row (3) ===== */}
<div
  style={{
    gridArea: "third",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "0.75em"
  }}
>
  {metric10.map((m, i) => (
    <div
      key={m.id}
      onClick={() => setActiveImage(m.img)}
      style={{
        ...styles.card,
        cursor: "pointer",
        padding: "12px",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"}
      onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
    >
      <h4>{m.title}</h4>
    </div>
  ))}
</div>

{/* ===== Image Modal ===== */}
{activeImage && (
  <div
    onClick={() => {
      setActiveImage(null);
      setZoomed(false);
    }}
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.85)",
      backdropFilter: "blur(8px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
      animation: "fadeIn 0.3s ease"
    }}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        maxWidth: "90%",
        maxHeight: "90%",
        overflow: "hidden",
        borderRadius: "16px",
        cursor: "zoom-in"
      }}
    >
      <img
        src={activeImage}
        alt=""
        onClick={() => setZoomed((z) => !z)}
        style={{
          width: "100%",
          height: "90vh",
          transition: "transform 0.4s ease",
          transform: zoomed ? "scale(1.8)" : "scale(1)",
          cursor: zoomed ? "zoom-out" : "zoom-in"
        }}
      />
    </div>
  </div>
)}

        {/* ===== NEW Accordion above grid (SML / BIGP / CATCH) ===== */}
        <div
          style={{
            gridArea: "fourth",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "14px"
          }}
        >
          {metric11.map((m, i) => (
            <div
              key={m.id}
              onClick={() => setOpenFourth(openFourth === i ? null : i)}
              style={{
                ...styles.card,
                cursor: "pointer",
                padding: "14px",
                background: openFourth === i ? "#f5f0ff" : undefined
              }}
            >
              <h4>{m.title}</h4>
              {openFourth === i && <p>{m.text}</p>}
            </div>
          ))}
        </div>

    {/* ===== Bottom 6 Premium Flip Card Grid ===== */}
<div
  style={{
    gridArea: "grid",
    position: "relative"
  }}
>
  {/* Dark Overlay */}
  {openMetric !== null && (
  <div
    onClick={() => setOpenMetric(null)}
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.45)", // soft dim only
      zIndex: 998,
      transition: "opacity 0.3s ease"
    }}
  />
)}

<div
  style={{
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "40px 20px",
    fontFamily: "Inter, Helvetica, Arial, sans-serif"
  }}
>
  <h2
    style={{
      margin: 0,
      fontSize: "2.2rem",
      fontWeight: 600,
      letterSpacing: "0.04em",
      color: "#111",
    }}
  >
    Areas of Business
  </h2>

  <p
    style={{
      marginTop: "10px",
      fontSize: "1rem",
      fontWeight: 400,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: "#777"
    }}
  >
    Macroscopic & Microscopic
  </p>
</div>
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
      gap: "2em",
      marginTop: "4em",
      justifyItems: "center",
      perspective: "2000px"
    }}
  >
    {metric8.map((m) => {
      const isOpen = openMetric === m.id;

      return (
        <div
          key={m.id}
          onClick={() => setOpenMetric(isOpen ? null : m.id)}
          style={{
            width: "120px",
            height: "170px",
            cursor: "pointer",
            position: isOpen ? "fixed" : "relative",
            top: isOpen ? "50%" : "auto",
            left: isOpen ? "50%" : "auto",
            transform: isOpen
              ? "translate(-50%, -50%) scale(2.2)"
              : "scale(1)",
            zIndex: isOpen ? 999 : 1,
            transition: "all 0.6s cubic-bezier(.23,1,.32,1)"
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              transformStyle: "preserve-3d",
              transition: "transform 0.6s ease",
              transform: isOpen
                ? "rotateY(180deg)"
                : "rotateY(0deg)"
            }}
          >
            {/* FRONT */}
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backfaceVisibility: "hidden",
                borderRadius: "18px",
                overflow: "hidden",
                boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                backgroundImage: `url(${m.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
            >
              <div
                style={{
                  background: "rgba(0,0,0,0.65)",
                  color: "#fff",
                  padding: "10px",
                  fontWeight: 600,
                  fontSize: "14px",
                  textAlign: "center"
                }}
              >
                {m.title}
              </div>
            </div>

            {/* BACK */}
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                borderRadius: "18px",
                padding: "24px",
                background: "#ffffff",
                boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                fontSize: "0.5em",
                lineHeight: 1.6,
              }}
            >
              {m.description}
            </div>
          </div>
        </div>
      );
    })}
  </div>
</div>
</div>

<div
  onClick={() => setOpenTao(true)}
  style={{
    gridColumn: "1 / -1",
    marginTop: "40px",
    display: "flex",
    justifyContent: "center",
  }}
>
  <div
    style={{
      fontSize: "90px",
      cursor: "pointer",
      userSelect: "none",
      transition: "transform .25s ease",
      filter: "drop-shadow(0 10px 25px rgba(0,0,0,.35))",
    
    }}
    onMouseEnter={(e)=> e.currentTarget.style.transform="scale(1.15) rotate(12deg)"}
    onMouseLeave={(e)=> e.currentTarget.style.transform="scale(1) rotate(0deg)"}
  >
    ☯
  </div>
</div>

<img
  src="./images/Tao_symbol.svg.png"
  alt="Tao"
  className="taoSymbol"
  onClick={() => setTaoOpen(true)}
/>

{openTao && (
  <>
    {/* Background */}
    <div
      onClick={() => setOpenTao(false)}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.65)",
        zIndex: 2000
      }}
    />

    {/* Panel */}
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "min(900px, 92vw)",
        maxHeight: "90vh",
        overflowY: "auto",
        background: "#111",
        color: "#fff",
        padding: "40px",
        borderRadius: "28px",
        zIndex: 2001,
        boxShadow: "0 40px 120px rgba(0,0,0,.7)"
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close */}
      <div
        onClick={() => setOpenTao(false)}
        style={{
          position: "absolute",
          top: 18,
          right: 22,
          fontSize: "28px",
          cursor: "pointer",
          opacity: .7
        }}
      >
        ✕
      </div>

      <h2 style={{textAlign:"center", marginBottom:"18px"}}>{taoContent.title}</h2>

      <p style={{lineHeight:1.8, textAlign:"center", marginBottom:"28px"}}>
        {taoContent.text}
      </p>

      {/* Images */}
      <div
        style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",
          gap:"18px"
        }}
      >
        {taoContent.images.map((img,i)=>(
          <img
            key={i}
            src={img}
            alt=""
            style={{
              width:"100%",
              height:"180px",
              objectFit:"cover",
              borderRadius:"14px"
            }}
          />
        ))}
      </div>
    </div>
  </>
)}


{taoOpen && (
  <div className="taoOverlay" onClick={() => setTaoOpen(false)}>
    
    <button 
      className="taoClose" 
      onClick={() => setTaoOpen(false)}
    >
      ×
    </button>

    <div 
      className="taoScroll"
      onClick={(e) => e.stopPropagation()}
    >
      <img 
        src="./images/Calendar.png" 
        alt="Calendar Fullscreen"
        className="taoFullImage"
      />
    </div>

  </div>
)}

<div style={{ gridColumn: "1 / -1", marginTop: "90px" }}>

  {/* BACK BUTTON */}
  {nodeStack.length > 1 && (
    <button
      onClick={() => {
        setNodeStack(s => s.slice(0, -1));
        setActiveIndex(0);
      }}
      style={{
        marginBottom: "0.8em",
        padding: "10px 22px",
        borderRadius: "14px",
        border: "1px solid rgba(255,255,255,0.2)",
        background: "linear-gradient(135deg, #1f2937, #111827)",
        color: "#fff",
        fontWeight: "600",
        letterSpacing: "0.5px",
        backdropFilter: "blur(8px)",
        cursor: "pointer",
        transition: "all 0.25s ease",
        boxShadow: "0 8px 20px rgba(0,0,0,0.35)"
      }}
    >
      ← Back Level
    </button>
  )}

  <div
    style={{
      position: "relative",
      width: "520px",
      height: "520px",
      margin: "auto",
      transform: `rotate(${rotation}deg)`,
      transition: "transform .8s cubic-bezier(.22,1,.36,1)"
    }}
  >

    {/* CENTER */}
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: `translate(-50%,-50%) rotate(${-rotation}deg)`,
        width: "180px",
        height: "180px",
        borderRadius: "50%",
        background: "#0f172a",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "18px",
        zIndex: 10
      }}
    >

      {/* IMAGE */}
      {activeNode.images?.length > 0 && (
        <img
          src={activeNode.images[imageIndex]}
          alt=""
          onClick={() =>
            setLightbox({
              src: activeNode.images[imageIndex],
              title: activeNode.title,
              description: activeNode.description,
              index: imageIndex,
              images: activeNode.images
            })
          }
          style={{
            width: "110px",
            height: "80px",
            objectFit: "cover",
            borderRadius: "10px",
            cursor: "pointer",
            marginBottom: "8px"
          }}
        />
      )}

      {/* TITLE UNDER IMAGE */}
      <h3 style={{ fontSize: "15px", fontWeight: 600 }}>
        {activeNode.title}
      </h3>

    </div>

    {/* ORBITING NODES */}
{currentNodes.map((node, i) => {
  const angle = (i / currentNodes.length) * 360;
  const radius = 230;

  return (
    <div
      key={i}
      onClick={() => {
        setActiveIndex(i);
        setRotation(-angle);

        if (node.children?.length) {
          setTimeout(() => {
            setNodeStack(s => [...s, node.children]);
            setActiveIndex(0);
          }, 500);
        }
      }}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: `
          rotate(${angle}deg)
          translate(${radius}px)
          rotate(${-angle - rotation}deg)
        `,
        padding: "12px 18px",
        borderRadius: "14px",
        background: i === activeIndex ? "#111" : "#e5e7eb",
        color: i === activeIndex ? "#fff" : "#000",
        cursor: "pointer",
        fontWeight: 600,
        transition: "transform .8s cubic-bezier(.22,1,.36,1)"
      }}
    >
      {node.title}
    </div>
  );
})}

  </div>
</div>

{/* LIGHTBOX MODAL */}
{lightbox && (
  <div
    onClick={() => setLightbox(null)}
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(2,6,23,0.92)",
      backdropFilter: "blur(10px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 999,
      padding: "40px"
    }}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        position: "relative", // needed for absolute close button
        display: "grid",
        gridTemplateColumns: "1.5fr 1fr",
        maxWidth: "1200px",
        width: "100%",
        maxHeight: "90vh",
        background: "#020617",
        borderRadius: "18px",
        overflow: "auto",
        boxShadow: "0 30px 90px rgba(0,0,0,0.7)"
      }}
    >

      {/* CLOSE BUTTON */}
      <button
        onClick={() => setLightbox(null)}
        style={{
          position: "absolute",
          top: "16px",
          right: "16px",
          width: "38px",
          height: "38px",
          borderRadius: "50%",
          border: "none",
          background: "rgba(255,255,255,0.08)",
          color: "white",
          fontSize: "20px",
          fontWeight: 600,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(4px)",
          transition: "all 0.2s ease",
          zIndex: 10
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "rgba(255,255,255,0.18)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = "rgba(255,255,255,0.08)")
        }
      >
        ✕
      </button>

      {/* SCROLLABLE IMAGE CONTAINER */}
      <div
        style={{
          position: "relative",
          background: "#000",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          gap: "16px"
        }}
      >
        {lightbox.images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt=""
            style={{
              width: "100%",
              maxHeight: "80vh",
              objectFit: "contain",
              borderRadius: "12px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.5)"
            }}
          />
        ))}

        {lightbox.images.length > 1 && (
          <>
            <button onClick={prevImage} style={arrowStyle("left")}>‹</button>
            <button onClick={nextImage} style={arrowStyle("right")}>›</button>
          </>
        )}
      </div>

      {/* DESCRIPTION PANEL */}
      <div
        style={{
          padding: "32px",
          color: "#e5e7eb",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          background: "linear-gradient(180deg,#020617,#020617 60%,#030a1a)"
        }}
      >
        <h2 style={{ fontSize: "26px", fontWeight: 700 }}>
          {lightbox.title}
        </h2>

        <div style={{ height: "1px", background: "rgba(255,255,255,0.08)" }} />

        <p style={{ lineHeight: "1.7", fontSize: "15px", color: "#cbd5f5" }}>
          {lightbox.description}
        </p>

        <div style={{ marginTop: "auto", opacity: 0.5 }}>
          Image {lightbox.index + 1} / {lightbox.images.length}
        </div>
      </div>
    </div>
  </div>
)}

<SanMarinoMap/>














    </AnimatedPage>
  );
}



 const slides = [
    {
      id: 1,
      image: "https://picsum.photos/600/400",
      top: ["3: Aner: That man", "Eshkol: (His) love (all), pain, dirt, donkey arm(branch, shoulder)", "Mamre: Hair way, uncle, way"],
      left: ["Kedorlaomer: What, yoghurt, beverage, middle, worf, often, thing, when, (snake/sheep): King of security and people: Elam", "Amraphel: Security opinion of acquainted people: King of depression, prosperity, oppurtunity, 'blue', opinions: Shinar", "Aurioch: Bull/Bully/Leadership: King of the cerebreum, mind, opposite view, nations(people), disobedience: Ellasar", "Tidal: Other women: King of hearing that opinion: Goiim"],
      right: ["Bera: Produce, offspring(of women), fruit: King of doubt of authority: Sodom", "Birsha: Wellness of the mind, reflection: King of hearing opinions: Gomorrah", "Shineab: Depression, 'blue of August: King of literature and culture, snake or sheep: Admah", "Shemeber: Renown(name) of children or famour children: King of (not giving) for that reason not giving: Zeboiim", "Nameless: To go without (leave): Bela/Zoar"],
      bottom: "Kurdish/Farsi mix: There's 2 Kurdish languages and Farsi can go from Pashto to Darija"
    },
 {
  id: 2,
  image: "https://picsum.photos/601/400",

  top: [
    "Aner – 'Youth / Servant'",
    "Eshkol – 'Cluster (of Grapes)'",
    "Mamre – 'Strength / Fertility'"
  ],

  left: [
    "Amraphel – 'Speaker of Authority' – King of Shinar ('Land of Two Rivers / Babylonia')",
    "Arioch – 'Lion-like' – King of Ellasar ('God has Bound / God has Chastened')",
    "Chedorlaomer – 'Servant of Lagamar (Elamite god)' – King of Elam ('Highland / Highlands')",
    "Tidal – 'Great Leader' – King of Goiim ('Nations / Peoples')"
  ],

  right: [
    "Bera – 'Son of Evil' – King of Sodom ('Burning / Scorched')",
    "Birsha – 'Son of Wickedness' – King of Gomorrah ('Ruin / Heap / Submersion')",
    "Shinab – 'Splendor of the Father' – King of Admah ('Earth / Ground / Soil')",
    "Shemeber – 'Name is Strong' – King of Zeboiim ('Gazelles / Deer')",
    "Bela – 'Swallowing / Destruction' – King of Bela later Zoar ('Small / Little')"
  ],

  bottom: "Hebrew"
},
    {
      id: 3,
      image: "https://picsum.photos/602/400",
      top: ["3: Aner: Towards force, hacia la fuerza", "Eshkol: Not a friend's neck no es el cuello de un amigo", "Mamre: Mother madre"],
      left: ["4", "Kedorlaomer: The intense buringin question or sea: King of not badly connected: Elam", "Ampraphel: The tone of forced love: King of the lisped narration: Shinar", "Aurioch: 8 gold rivers: King of the stuttered ruler: Ellasar", "Tidal: The demand to give or go: King of Compliant I give or go(I give or go compliantly): Goiim"],
      right: ["5", "Bera: From rebels: Sodom: King of the way from you all", "Birsha: Bear: King of no magicians, no reds, no strong: Gomorrah", "Shineab: Lisped yes(untrue confirmation): King of Toward more/mother: Admah", "Shemeber: Lisped Yes myself have: King of the beige kiss: Zeboiim", "Nameless: King of from putting down, fatigue, prison/ cleverness, agility: Bela/Zoar"],
      bottom: "Spanish"
    },
    {
      id: 4,
      image: "https://picsum.photos/603/400",
      top: ["Aner: Grace", "Eshkol: To gather sin, mistake, offence collect", "Mamre: your/his/her (mother?)"],
      left: ["4", "Chedorlaomer: To cut/to cover indeed(truly): King of Okra, togetherness, fertility, abundance, smoothing: Elam", "Amraphel: To buy/disappear: King of to open(spread, beat, extend, hit, pay): Shinar", "Aurioch: To see and to percieve: King of to cut, divide, skim, pass over: Ellasar", "Tidal: Already since past created established belongings: King of my swell and rise: Goiim"],
      right: ["5", "Bera: Beg to buy: King of cover and lie down/ sew and lie down: Sodom", "Birsha: To be born open: King of rise and buy/rise and dissapear: Gomorrah", "Shineab: Open and spread: King of machette/cutlass, threshold and step: Admah", "Shemeber: Do my beg/Is it my beg?: King of do enter me, do cover men, do protect me: Zeboiim", "Nameless: King of beg to cut, divide, skim/ put together, dance, flow, gather inthe morning, excellence, debt: Bela/Zoar"],
      bottom: "Yoruba"
    },
    {
      id: 5,
      image: "https://picsum.photos/604/400",
      top: ["3: Aner: belongings", "Eshkol: Maim and fighting", "Mamre: Giving"],
      left: ["4", "Chedorlaomer: Time me/ Go love me: King of give and recieve: Elam", "Amraphel: Give take/ recieve grab: King of He/She/it/ this was not to: Shinar", "Aurioch: Eat: King of to sweep/fight/remove: Ellasar", "Tidal: head sleep, head lie, head be located: King of I pour, I throw, I spill: Goiim"],
      right: ["5", "Bera: Future: King of on/above/over/to increase love/like of you(plural): Sodom", "Birsha: Some fight, some sweep, some remove, some to a certain: King of you(plural) pour, throw, spill: Gomorrah", "Shineab: He/She/it/ this was not to build: King of give/let/allow: Admah", "Shemeber: Not me(I) to go love me/ Not I to time me: King of not me: Zeboiim", "Nameless: King of the future: Bela/Zoar", ""],
      bottom: "Akan"
    },
    {
      id: 6,
      image: "https://picsum.photos/605/400",
      top: ["3: Aner: One", "Eshkol: Ash-tree, coal, hill", "Mamre: fame, renoun"],
      left: ["4", "Chedorlaomer: Mare of the by waters or gate spear: King of the storm being: Elam", "Amraphel: Mighty elf: King of the bright realm/ sea: Shinar", "Aurioch: Mud ox/ golden(poetic) ox: King of god of old age/ wound of old age: Ellasar", "Tidal: Time/season flows through the valley: King of the expanse/ one who aws: Goiim"],
      right: ["5", "Bera: To carry, bear: King of judgement of seed, sight and sun: Sodom", "Birsha: Wound of the bright dwelling: King of move through the marsh with counsel: Gomorrah", "Shineab: Shining name: King of inspiration of the moor: Admah", "Shemeber: Vision bearer: King of home of the distant dwellers: Zeboiim", "Nameless: offering hill/ year of the sun: Bela/Zoar"],
      bottom: "Norse"
    },
    {
      id: 7,
      image: "https://picsum.photos/606/400",
      top: ["3: Aner: Not man (one who is different/another)", "Eshkol: Divine family/Lordly clan", "Mamre: O mine/ my one"],
      left: ["4", "Chedorlaomer: Cosmic bringer of the period of man: King of the Mango: Elam", "Amraphel: Mango push: King of the auspiciously educated peaceful man: Shinar", "Arioch: Poetry: King of the bringer of the head essence: Ellasar", "Tidal: Group: King of the cow: Goiim"],
      right: ["5", "Bera: Negative: King of the 100 castes(communities): Sodom", "Birsha: Powerful peaceful brave epic man: King of the way of the peacock cow: Gomorrah", "Shinab: Auspicious educational peaceful 9: King of the great man of begining: Admah", "Shemeber: In: King of the pocket: Zeboiim", "Nameless: King of not bringing: Bela/Zoar"],
      bottom: "Hindi"
    },
    {
      id: 8,
      image: "https://picsum.photos/607/400",
      top: ["3: Aner: An error, wrong, Anna", "Eshkol: exclamation(shock)", "Mamre: mother, ray(light)"],
      left: ["4", "Kedorlaomer: Door: King of Lamb: Elam", "Amraphel: Shock, disbelief, rapping, fool: King of shin(leg): Shinar ", "Aurioch: sympathy, aww, ok: King of lasers and losing: Ellasar", "Tidal: Time, tye dye, tidal waves, waving, rhythm, mothion: King of gong, goo, going(go him): Goiim"],
      right: ["5", "Bera: Bears, bearing, a large amount: King of anal sex, so dumb: Sodom", "Birsha: Cold, fuck it: King of go, move, shock, disbelief, him: Gomorrah", "Shineab: Shineing abs: King of adding, add more, mothers: Admah", "Shemeber: Female, members, cold: King of boy him, last, 'boying': Zeboiim", "Nameless: King of calling, soaring(excelling): Bela/Zoar"],
      bottom: "English"
    }
  ];
function SiddimCarousel() {
  const [index, setIndex] = React.useState(0);



  const next = () => setIndex((prev) => (prev + 1) % slides.length);
  const prev = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  const slide = slides[index];

  const scrollableStyle = {
    maxHeight: "250px",
    overflowY: "auto",
    padding: "10px",
    borderRadius: "12px",
    background: "#f9f9f9",
    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
    fontSize: "1rem",
    lineHeight: "1.5",
  };

  return (
<div style={{ width: "100%", display: "flex", justifyContent: "center", padding: "30px 20px" }}>
  <div
    style={{
      width: "100%",
      maxWidth: "1100px",
      display: "grid",
      gridTemplateColumns: "1fr 2fr 1fr",
      gridTemplateRows: "auto auto auto 400px auto auto auto",
      gap: "15px", // reduced gap
      alignItems: "start",
    }}
  >
    {/* Title */}
    <div
      style={{
        gridColumn: "1 / span 3",
        fontSize: "2rem",
        fontWeight: "700",
        textAlign: "center",
      }}
    >
      Genesis 14 Language Translations
    </div>

    {/* Description under title */}
    <div
      style={{
        gridColumn: "1 / span 3",
        fontSize: "1.1rem",
        lineHeight: "1.5",
        textAlign: "center",
        padding: "12px 20px",
        borderRadius: "12px",
        background: "#f4f4f4",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      A 4vs5 represents the interplay of material and cultural dynamics within the linguistic and semantic landscape of a people. It encompasses the collective neuro-semantic processing of a community, reflecting how meaning, communication, and understanding are constructed and shared. This framework can be applied to analyze structural patterns across multiple scales—from the organization of societies, economies, and nations, to the course of human history, cultural production, and social systems. On a more intimate level, it offers insights into interpersonal relationships, organizational behavior, and business interactions, bridging the microscopic and macroscopic dimensions of human experience.
    </div>

    {/* Top bullets */}
    <div style={{ gridColumn: "1 / span 3", ...scrollableStyle }}>
      <ul style={{ paddingLeft: "20px", listStyle: "disc", margin: 0 }}>
        {Array.isArray(slide.top) ? (
          slide.top.map((item, i) => <li key={i}>{item}</li>)
        ) : (
          <li>{slide.top}</li>
        )}
      </ul>
    </div>

    {/* Left bullets */}
    <div style={scrollableStyle}>
      <ul style={{ paddingLeft: "20px", listStyle: "disc", margin: 0 }}>
        {slide.left.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>

    {/* Image */}
    <div style={{ display: "flex", justifyContent: "center" }}>
      <img
        src={slide.image}
        alt=""
        style={{
          width: "100%",
          maxHeight: "400px",
          objectFit: "cover",
          borderRadius: "14px",
          boxShadow: "0 12px 35px rgba(0,0,0,0.15)",
        }}
      />
    </div>

    {/* Right bullets */}
    <div style={scrollableStyle}>
      <ul style={{ paddingLeft: "20px", listStyle: "disc", margin: 0 }}>
        {slide.right.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>

    {/* Bottom */}
    <div
      style={{
        gridColumn: "1 / span 3",
        fontSize: "1.2rem",
        textAlign: "center",
        fontWeight: "500",
      }}
    >
      {slide.bottom}
    </div>

    {/* Controls */}
    <div style={{ gridColumn: "1 / span 3", textAlign: "center" }}>
      <button
        onClick={prev}
        style={{
          marginRight: "12px",
          padding: "12px 24px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          background: "#4f46e5",
          color: "#fff",
          fontSize: "1.1rem",
          transition: "0.3s",
        }}
        onMouseOver={(e) => (e.target.style.background = "#4338ca")}
        onMouseOut={(e) => (e.target.style.background = "#4f46e5")}
      >
        ◀
      </button>

      <button
        onClick={next}
        style={{
          padding: "12px 24px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          background: "#4f46e5",
          color: "#fff",
          fontSize: "1.1rem",
          transition: "0.3s",
        }}
        onMouseOver={(e) => (e.target.style.background = "#4338ca")}
        onMouseOut={(e) => (e.target.style.background = "#4f46e5")}
      >
        ▶
      </button>
    </div>
  </div>
</div>
  );
}


function ReligionPage() {
  // State for the top accordion
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [flippedLetter, setFlippedLetter] = useState(null);
  const carouselRef = useRef(null);
  const [openSefirot, setOpenSefirot] = useState(false);
  const [openHindi, setOpenHindi] = useState(false);

  // State for expanded grid items
  const [expandedGrid, setExpandedGrid] = useState(null);

  const accordionItems = [
    { number: 5, text: "5 represents the Pentateuch and the breath of life. What it can be defined as numerically is 120, 11, 16 or 120, 2, 16. 120 is the age at which Moses died, it is connected to joining and salvation, with two complete cycles of authority and teaching, learning and the aspiration to go beyond. 11 is associated with potential, actualization and the palm and 16 is associated with the eyes, insight and perception. 2 is duality and the world made with wisdom. Therefore 5 can be thought of many ways from teaching actualization of potential to giving an insight into authority. " },
    { number: 4, text: "4 represents materiality and the door to spiritual growth, it is numerically represented as 120,16 or 120, 11. This material world is the actualization of authority or the the perception of authority. Materiality and the beginning of spiritual growth are linked as from birth we are in the material world and that is where we must grow spiritually. This would also link it with potential and actualization as from spiritual growth a person is able to actualize their potential.  " },
    { number: 3, text: "3 represents kindness, giving and the balance between giving and receiving and is associated with the foot and the Tetragrammaton. It is numerically represented as 120 and 26 or 46. 120 and 26 would mean it is the authority of the Tetragrammaton or the teaching of the Tetragrammaton. 46 would mean it is a combination of spiritual and physical realms. Kindness can therefore stated as being the authority of the Tetragrammaton or what the Tetragrammaton teaches." },
  ];

  const gridItems = [
  {
    id: 0,
    title: "Taoism",
    img: "./images/taoism.jpg",
    content: "Taoism is an ancient Chinese philosophy focused on living in harmony with the Tao, the natural flow of the universe. It advocates for the practice of wu wei, or effortless action, by aligning oneself with the world rather than resisting it. Through simplicity and the balance of yin and yang, practitioners seek a life of spontaneity and profound inner peace."
  },
  {
    id: 1,
    title: "Christianity",
    img: "./images/christianity.jpg",
    content: "Christianity is a monotheistic faith based on the life and teachings of Jesus Christ as the Savior of humanity. It emphasizes the grace of God and the importance of faith, hope, and love in achieving spiritual redemption. Through the study of the Bible, followers seek to live a life modeled after Christ’s compassion and service to others."
  },
  {
    id: 2,
    title: "Islam",
    img: "./images/islam.jpg",
    content: "Islam is a monotheistic religion centered on the belief in one God, Allah, and the teachings of the Prophet Muhammad. It is guided by the Five Pillars, which provide a framework for worship, charity, and a life of intentional devotion. The faith emphasizes the pursuit of justice, peace, and total submission to the divine will as revealed in the Quran."
  },
  {
    id: 3,
    title: "Hinduism",
    img: "/images/hinduism.jpg",
    content: "Hinduism is a diverse spiritual tradition that emphasizes the concepts of Dharma (duty), Karma (action), and Samsara (the cycle of rebirth). It offers various paths to spiritual liberation, or Moksha, through devotion, meditation, and ethical living. Practitioners recognize the divine in many forms while acknowledging a single, ultimate reality known as Brahman."
  },
  {
    id: 4,
    title: "Judaism",
    img: "/images/judaism.jpg",
    content: "Judaism is one of the world’s oldest monotheistic religions, rooted in a foundational covenant between God and the Jewish people. It prioritizes the study of the Torah and the observance of commandments to lead a life of holiness and ethical responsibility. The faith places a strong emphasis on community, historical memory, and the pursuit of Tikkun Olam, or repairing the world."
  },
  {
    id: 5,
    title: "Buddhism",
    img: "/images/buddhism.jpg",
    content: "Buddhism is a spiritual path focused on ending suffering by attaining enlightenment and understanding the true nature of reality. It follows the Four Noble Truths and the Eightfold Path, which advocate for mindfulness, ethical conduct, and mental discipline. By practicing meditation and compassion, followers strive to reach a state of Nirvana, free from the cycle of craving and attachment."
  }
];

const cardFrontStyle = {
  position: "absolute",
  width: "100%",
  height: "100%",
  backfaceVisibility: "hidden",
  background: "#0f172a",
  color: "white",
  borderRadius: "18px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "60px",
  fontWeight: "bold",
  boxShadow: "0 10px 25px rgba(0,0,0,.35)",
  transition: "all .3s ease",
};

const cardBackStyle = {
  position: "absolute",
  width: "100%",
  height: "100%",
  backfaceVisibility: "hidden",
  transform: "rotateY(180deg)",
  background: "linear-gradient(135deg,#1e293b,#0f172a)",
  color: "white",
  borderRadius: "18px",
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  gap: "6px",
  boxShadow: "0 10px 25px rgba(0,0,0,.35)",
};

const arrowStyle = (side) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  [side]: "10px",
  zIndex: 10,
  background: "#0f172a",
  color: "white",
  border: "none",
  borderRadius: "50%",
  width: "40px",
  height: "40px",
  cursor: "pointer",
  fontSize: "22px",
  boxShadow: "0 6px 18px rgba(0,0,0,.3)",
});




  return (
    <AnimatedPage>
      <h2 style={styles.sectionTitle}>Religion</h2>

      {/* Accordion */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        {accordionItems.map((item) => (
          <div
            key={item.number}
            style={{
              ...styles.card,
              flex: 1,
              cursor: 'pointer',
              padding: '16px'
            }}
            onClick={() =>
              setActiveAccordion(activeAccordion === item.number ? null : item.number)
            }
          >
            <h3>{item.number}</h3>
            {activeAccordion === item.number && (
              <p style={{ marginTop: '12px' }}>{item.text}</p>
            )}
          </div>
        ))}
      </div>

      {/* Grid of 6 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px'
        }}
      >
        {gridItems.map((item) => (
          <div
            key={item.id}
            style={{
              ...styles.card,
              cursor: 'pointer',
              padding: '8px',
              position: 'relative'
            }}
            onClick={() =>
              setExpandedGrid(expandedGrid === item.id ? null : item.id)
            }
          >
            {/* Optional Image */}
            {item.img && (
              <div
                style={{
                  height: '150px',
                  backgroundImage: `url(${item.img})`,
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  borderRadius: '12px',
                  marginBottom: '12px'
                }}
              />
            )}

            <h4>{item.title}</h4>

            {/* Expanded Content */}
            {expandedGrid === item.id && (
              <div
                style={{
                  marginTop: '12px',
                  padding: '12px',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '12px'
                }}
              >
                <p>{item.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <SiddimCarousel/>

      {/* Hebrew Carousel */}
<div style={{ marginTop: "70px" }}>
  <h3
    style={{
      textAlign: "center",
      marginBottom: "24px",
      fontSize: "24px",
      fontWeight: 700,
    }}
  >
    The Hebrew Alpha Numeral System
  </h3>

  <div style={{ position: "relative" }}>
    
    {/* Left Arrow */}
    <button
      onClick={() => {
        carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
      }}
      style={arrowStyle("left")}
    >
      ‹
    </button>

    {/* Scroll Container */}
    <div
      ref={carouselRef}
      style={{
        display: "flex",
        overflowX: "auto",
        gap: "18px",
        padding: "20px 60px",
        scrollSnapType: "x mandatory",
        cursor: "grab",
      }}
    >
      {[
  { l: "א", n: 1, name: "Aleph", meaning: "Unity, origin, divine oneness [36,120,26]." },
  { l: "ב", n: 2, name: "Bet", meaning: "House, duality, creation [36 or 120,16]." },
  { l: "ג", n: 3, name: "Gimel", meaning: "Kindness, movement, giving [120,26 or 46]." },
  { l: "ד", n: 4, name: "Dalet", meaning: "Door, humility, entry [120, 16 or 120, 11]." },
  { l: "ה", n: 5, name: "He", meaning: "Breath, revelation, life [120,11 or 16[120, 2*16] or [120,11,16]]." },
  { l: "ו", n: 6, name: "Vav", meaning: "Connection, union, continuity [16]." },
  { l: "ז", n: 7, name: "Zayin", meaning: "Completion, spiritual struggle [26 or 16,26]." },
  { l: "ח", n: 8, name: "Chet", meaning: "Life, transcendence [16,111]." },
  { l: "ט", n: 9, name: "Tet", meaning: "Hidden goodness [16,36]." },
  { l: "י", n: 10, name: "Yod", meaning: "Divine spark, potential [0 or 1]." },
  { l: "כ", n: 20, name: "Kaf", meaning: "Also 11. Potential, power in action [11,11,11,16,18,32,42]." },
  { l: "ל", n: 30, name: "Lamed", meaning: "Also 12. Learning, aspiration [26,120 or 26,26 or 9,35,40,45]." },
  { l: "מ", n: 40, name: "Mem", meaning: "Also 13. Water, wisdom, flow [30,50 or 5,16 or 40,50 or 4[16+40]]." },
  { l: "נ", n: 50, name: "Nun", meaning: "Also 14. Faithfulness, continuation [36,46,56 or [26,120,120,120]]." },
  { l: "ס", n: 60, name: "Samekh", meaning: "Also 15. Support, protection [21: 46,16 or 32:[16,36]]." },
  { l: "ע", n: 70, name: "Ayin", meaning: "Also 16. Insight, perception [50(8,21,42)=16,16,46 | 2*50(21,38,42) = 20,20,4*16]." },
  { l: "פ", n: 80, name: "Pe", meaning: "Also 17. Speech, expression [[T(21), X(16,120,120), Y(111)],[T(6*31), X(6,14,120),Y (2*50)],[T(2*50(21,34)), X(6,6,11), Y(2,11)]]." },
  { l: "צ", n: 90, name: "Tsadi", meaning: "Also 18. Righteousness [T(3*50(11,42), X(5,6,20), Y(4,22,50)][T(2*50(4,12), X(3,6,16,20,36), Y(11,22,50))], [T(4,31), X(16,20,26), Y(2,21,50)]]." },
  { l: "ק", n: 100, name: "Qof", meaning: "Also 19. Holiness, elevation.[T(16,26), X(21), Y(22)]" },
  { l: "ר", n: 200, name: "Resh", meaning: "Also 20. Head, beginning. [11,22,33,44,55,66,77,etc]" },
  { l: "ש", n: 300, name: "Shin", meaning: "Also 21. Fire, transformation [T(1), X(46), Y(4)]." },
  { l: "ת", n: 400, name: "Tav", meaning: "Also 22. Completion, truth. [T(2,12), X(36,120), Y(2,11)],[T(5,12), X(11,26), Y(1,2)]]" },
].map((item, index) => {
        const flipped = flippedLetter === index;

        return (
          <div
            key={index}
            onClick={() =>
              setFlippedLetter(flipped ? null : index)
            }
            style={{
              minWidth: "140px",
              height: "180px",
              perspective: "1000px",
              scrollSnapAlign: "start",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
                transformStyle: "preserve-3d",
                transition: "transform .6s ease",
                transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >

              {/* FRONT */}
              <div style={cardFrontStyle}>
                {item.l}
              </div>

              {/* BACK */}
<div style={cardBackStyle}>
  <div style={{ fontSize: "20px", fontWeight: 600 }}>
    {item.name}
  </div>

  <div style={{ fontSize: "18px", opacity: 0.85 }}>
    {item.n}
  </div>

  <div
    style={{
      marginTop: "8px",
      fontSize: "13px",
      lineHeight: 1.4,
      opacity: 0.75,
      maxHeight: "60px",
      overflowY: "auto",
      padding: "0 4px"
    }}
  >
    {item.meaning}
  </div>
</div>

            </div>
          </div>
        );
      })}
    </div>

    {/* Right Arrow */}
    <button
      onClick={() => {
        carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
      }}
      style={arrowStyle("right")}
    >
      ›
    </button>
  </div>
</div>

{/* Sefirot & Gematria Expandable Section */}
<div style={{ marginTop: "90px" }}>
  <div
    onClick={() => setOpenSefirot(!openSefirot)}
    style={{
      ...styles.card,
      cursor: "pointer",
      padding: "20px",
      textAlign: "center",
      fontWeight: 600,
      fontSize: "18px"
    }}
  >
    {openSefirot ? "Close Sefirot & Gematria ▲" : "Sefirot & Gematria ▼"}
  </div>

  {openSefirot && (
    <div
      style={{
        marginTop: "20px",
        padding: "30px",
        borderRadius: "18px",
        background: "#f8fafc",
        lineHeight: 1.8,
        fontSize: "15px"
      }}
    >
      <h3 style={{ marginTop: 0 }}>The Sefirot</h3>
      <p>
        The Sefirot are the ten divine emanations through which the Infinite
        reveals and structures reality. They represent attributes of divine
        interaction and stages of spiritual refinement:
      </p>

      <ol>
        <li><strong>Keter</strong> – Crown (Divine Will)</li>
        <li><strong>Chokhmah</strong> – Wisdom</li>
        <li><strong>Binah</strong> – Understanding</li>
        <li><strong>Chesed</strong> – Kindness</li>
        <li><strong>Gevurah</strong> – Strength / Judgment</li>
        <li><strong>Tiferet</strong> – Harmony / Beauty</li>
        <li><strong>Netzach</strong> – Endurance</li>
        <li><strong>Hod</strong> – Humility / Splendor</li>
        <li><strong>Yesod</strong> – Foundation</li>
        <li><strong>Malkhut</strong> – Kingship / Presence</li>
      </ol>

      <h3>Gematria</h3>
      <p>
        Gematria is the interpretive system in which Hebrew letters correspond
        to numerical values. Through these values, connections are drawn between
        words, ideas, and spiritual concepts.
      </p>

      <h4>Number Meanings (1–50)</h4>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "8px",
          marginTop: "12px"
        }}
      >
        {Array.from({ length: 50 }, (_, i) => {
          const meanings = {
            1: "Unity, Divine Oneness [God, Unity and Primacy]",
            2: "Duality, Balance [Duality and the world made with wisdom]",
            3: "Harmony, Kindness [Kindness, giving and the balance between giving and receiving]",
            4: "Foundation, Structure [Materiality and the door to spiritual growth]",
            5: "Revelation, Breath [The Pentateuch and the breath of life]",
            6: "Connection, Union [Connection and conjunction]",
            7: "Completion, Spiritual Cycle [Completion and spiritual struggle]",
            8: "Transcendence [Life and the transcendance of natural limitations]",
            9: "Hidden Goodness [Goodness and concealed goodness]",
            10: "Divine Order [A point of energy and the 10 divine emanations]",
            11: "Transition, Excess [Potential and the nurturing process]",
            12: "Governance, Tribes [Teaching and learning and the aspiration to go beyond]",
            13: "Unity (Love) [Water, womb and the hidden and revealed aspects of existence]",
            14: "Deliverance [Faithfulness and the continuation of life]",
            15: "Sacred Name Value [Support and protection]",
            16: "Light, Insight [Eyes, insight and perception]",
            17: "Victory [Mouth, speech and expression]",
            18: "Life (Chai) [Righteousness and humility]",
            19: "Faith[Holiness and cycles of time]",
            20: "Potential [Head, authority and the begining]",
            21: "Divine Name Expansion [Divine power and transformation]",
            22: "Completion of Letters [Truth, completion and the oath]",
            23: "Integration [Divine providence and the union of God's name]",
            24: "Cycles [Priesthood and the distribution of blessings]",
            25: "Grace Multiplied [Grace and favour]",
            26: "Tetragrammaton (YHWH)",
            27: "Hidden Wisdom [Divine intervention and light]",
            28: "Power [Power and strength]",
            29: "Movement [Potential and the nurturing process]",
            30: "Learning [Dedication and the fulfillment of vows]",
            31: "Heart [The future and hope]",
            32: "Paths of Wisdom [32 paths of wisdom]",
            33: "Revelation Through Structure [Hidden divine light and the completion of creation]",
            34: "Growth [Balance of spiritual and material realms]",
            35: "Balance Extended [Transition and change]",
            36: "Hidden Light [Hidden righteousness of sustainers]",
            37: "Expansion [Spiritual insight and divine wisdom]",
            38: "Spiritual Influence [Livelihood and sustenance]",
            39: "Refinement [Preservation and guarding against evil]",
            40: "Transformation [Trial, testing and transformation]",
            41: "New Cycle [Renewal and new beginings]",
            42: "Creative Power [42 letter Name of God]",
            43: "Progression [Healing and recovery]",
            44: "Material Stability [Patience and faith]",
            45: "Humanity (Adam value) [Redemption and divine presence]",
            46: "Spiritual-Physical Unity [Combination of spiritual and material realms]",
            47: "Development [Divine wisdom and the unfolding of mysteries]",
            48: "Endurance of Wisdom [Acquisition of wisdom and the Torah]",
            49: "Completion of Cycle [Preperation and anticipation]",
            50: "Jubilee, Liberation [Freedom, jubilee and the completion of cycles]"
          };

          return (
            <div key={i} style={{ padding: "6px 0" }}>
              <strong>{i + 1}</strong> — {meanings[i + 1]}
            </div>
          );
        })}
      </div>
    </div>
  )}
</div>

<NiqqudExplanation/>
<OldTestamentList/>
<HebrewLetterCalculator/>
<LinearHebrewLetterCalculator/>
<GreekAlphabetCards/>
<GreekDiphthongCards/>
<GreekLetterCalculator/>
<CyrillicAlphabetExplorer/>
<RussianAlphabetCalculator/>
{/* Hindi Alphabet Expandable Section */}
<div style={{ marginTop: "90px" }}>
  <div
    onClick={() => setOpenHindi(!openHindi)}
    style={{
      ...styles.card,
      cursor: "pointer",
      padding: "20px",
      textAlign: "center",
      fontWeight: 600,
      fontSize: "18px"
    }}
  >
    {openHindi ? "Close Hindi Alphabet ▲" : "Hindi (Devanagari) Alphabet ▼"}
  </div>

  {openHindi && (
    <div
      style={{
        marginTop: "20px",
        padding: "30px",
        borderRadius: "18px",
        background: "#f8fafc",
        lineHeight: 1.8,
        fontSize: "15px"
      }}
    >
      <h3 style={{ marginTop: 0 }}>The Devanagari Script</h3>

      <p>
        The Hindi alphabet is written in Devanagari. Unlike Hebrew, it is an
        abugida — each consonant carries an inherent vowel sound unless modified.
        The script is traditionally viewed as sacred in Hindu philosophy,
        associated with mantra, vibration, and sacred sound (Śabda).
      </p>

      {/* Vowels */}
      <h4>Vowels (Svar)</h4>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
          gap: "12px",
          marginTop: "12px"
        }}
      >
       {[
  { letter: "अ", number: 1, name: "A", meaning: "Primordial sound, beginning" },
  { letter: "आ", number: 2, name: "Ā", meaning: "Expansion of being" },
  { letter: "इ", number: 15, name: "I", meaning: "Directed consciousness" },
  { letter: "ई", number: 15, name: "Ī", meaning: "Extended awareness" },
  { letter: "उ", number: 34, name: "U", meaning: "Containment, depth" },
  { letter: "ऊ", number: 41, name: "Ū", meaning: "Expansion of depth" },
  { letter: "ऋ", number: 35, name: "Ṛ", meaning: "Cosmic rhythm" },
  { letter: "ए", number: 33, name: "E", meaning: "Integration" },
  { letter: "ऐ", number: 7, name: "Ai", meaning: "Creative insight" },
  { letter: "ओ", number: 37, name: "O", meaning: "Completion" },
  { letter: "औ", number: 39, name: "Au", meaning: "Full manifestation" }
].map((v, i) => (
  <div
    key={i}
    style={{
      padding: "14px",
      borderRadius: "14px",
      background: "white",
      textAlign: "center",
      boxShadow: "0 4px 12px rgba(0,0,0,.08)"
    }}
  >
    <div style={{ fontSize: "34px", fontWeight: 600 }}>
      {v.letter}
    </div>

    <div
      style={{
        fontSize: "14px",
        fontWeight: 600,
        color: "#0f172a",
        marginTop: "4px"
      }}
    >
      {v.number}
    </div>

    <div style={{ fontSize: "13px", opacity: 0.8 }}>
      {v.name}
    </div>

    <div style={{ fontSize: "12px", opacity: 0.65 }}>
      {v.meaning}
    </div>
  </div>
))}
      </div>

      {/* Consonants */}
      <h4 style={{ marginTop: "30px" }}>Consonants (Vyanjan)</h4>

      <p>
        Consonants are grouped by place of articulation — throat, palate,
        retroflex, dental, and labial. This systematic structure reflects
        the scientific phonetic organization of Sanskrit and Hindi.
      </p>

      <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(60px, 1fr))",
    gap: "10px",
    marginTop: "16px"
  }}
>
  {[
    { letter: "क", name: "ka", number: 11 },
    { letter: "ख", name: "kha", number: 12 },
    { letter: "ग", name: "ga", number: 21 },
    { letter: "घ", name: "gha", number: 26 },
    { letter: "ङ", name: "ṅa", number: 27 },

    { letter: "च", name: "cha", number: 24 },
    { letter: "छ", name: "chha", number: 31 },
    { letter: "ज", name: "ja", number: 36 },
    { letter: "झ", name: "jha", number: 46 },
    { letter: "ञ", name: "ña", number: 20 },

    { letter: "ट", name: "ṭa", number: 43 },
    { letter: "ठ", name: "ṭha", number: 44 },
    { letter: "ड", name: "ḍa", number: 28 },
    { letter: "ढ", name: "ḍha", number: 8 },
    { letter: "ण", name: "ṇa", number: 17 },

    { letter: "त", name: "ta", number: 42 },
    { letter: "थ", name: "tha", number: 18 },
    { letter: "द", name: "da", number: 9 },
    { letter: "ध", name: "dha", number: 32 },
    { letter: "न", name: "na", number: 14 },

    { letter: "प", name: "pa", number: 19 },
    { letter: "फ", name: "pha", number: 23 },
    { letter: "ब", name: "ba", number: 45 },
    { letter: "भ", name: "bha", number: 30 },
    { letter: "म", name: "ma", number: 13 },

    { letter: "य", name: "ya", number: 40 },
    { letter: "र", name: "ra", number: 3 },
    { letter: "ल", name: "la", number: 25 },
    { letter: "व", name: "va", number: 29 },

    { letter: "श", name: "śa", number: 22 },
    { letter: "ष", name: "ṣa", number: 38 },
    { letter: "स", name: "sa", number: 6 },
    { letter: "ह", name: "ha", number: 16 }
  ].map((c, i) => (
    <div
      key={i}
      style={{
        padding: "12px",
        borderRadius: "14px",
        background: "white",
        textAlign: "center",
        boxShadow: "0 4px 12px rgba(0,0,0,.08)"
      }}
    >
      <div style={{ fontSize: "28px", fontWeight: 600 }}>
        {c.letter}
      </div>

      <div
        style={{
          fontSize: "12px",
          marginTop: "4px",
          fontWeight: 500,
          color: "#475569"
        }}
      >
        {c.name}
      </div>

      {c.number !== null && (
        <div
          style={{
            fontSize: "13px",
            marginTop: "4px",
            fontWeight: 600,
            color: "#0f172a"
          }}
        >
          {c.number}
        </div>
      )}
    </div>
  ))}
</div>

      {/* Symbolic Note */}
      <h4 style={{ marginTop: "30px" }}>Spiritual Significance</h4>

      <p>
        In Hindu philosophy, sound (Nāda) is considered the origin of creation.
        The syllable "ॐ" (Om) is regarded as the primordial vibration from
        which all letters and existence emerge. The structure of the alphabet
        reflects ordered manifestation — from subtle vibration to articulated speech.
      </p>
    </div>
  )}
</div>
<HindiGematriaCalculator/>
<ArabicAbjad/>
<ArmenianAlphabet/>

<EnglishLetterCardsCalculator/>
<JapaneseKanaCards/>
<KangxiRadicalExplorer/>

    </AnimatedPage>
  );
}

function WorldRule1Page() { 
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [openSideBox, setOpenSideBox] = useState(null); // "left" | "right" | null
  const [openPyramid, setOpenPyramid] = useState(null);
  const [activeLocation, setActiveLocation] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [activeMain, setActiveMain] = useState(null);
  const [flippedCard, setFlippedCard] = useState(null);
  const [expandedImage, setExpandedImage] = useState(null);
  const [expandedText, setExpandedText] = useState(null);
  const [activeImage, setActiveImage] = useState(null);


useEffect(() => {
  const handleEsc = (e) => {
    if (e.key === "Escape") setExpanded(false);
  };
  window.addEventListener("keydown", handleEsc);
  return () => window.removeEventListener("keydown", handleEsc);
}, []);


  const hubSection = {
  id: "hub",
  name: "Town",
  icon: "🏛️",
  image: "/images/town5.png",
  text: "This is an AI generated image of what an Alber could look like."
};




  const imageCarouselItems = [
  "/images/town3.jpg",
  "/images/town1.jpg",
  "/images/town2.jpg",
  "/images/town4.png",
  "/images/thelv.png"

];

  const pyramidSections = [
    {
      id: 0,
      title: "Foundation",
      image: "./images/automation/pyramid1.png",
      text: "There are 9,900 Sea Villages, each constructed as a paired formation of two heterogeneous pyramids. Every Sea Village is designed to accommodate 202,020 inhabitants, forming a large, self-sustaining community that integrates industry, agriculture, and cultural development. The Sea Villages are interconnected by a network of long bridges and maritime sea lanes, which are guided and supported by Seaporium lighthouses that serve as navigation and coordination points across the ocean settlements. Internally, each Sea Village is organized using a honeycomb structural layout, maximizing spatial efficiency, resilience, and community connectivity. Their social and civic organization mirrors that of the land settlements, operating under a 14-tribe system that structures governance, culture, and economic activity within the village. This design allows the Sea Villages to function as interlinked oceanic cities, combining architectural innovation, maritime infrastructure, and social organization into a unified settlement network."
    },
    {
      id: 1,
      title: "Production",
      image: "./images/automation/pyramid2.png",
      text: "Within each pair of pyramids, the leading structure is designated HI, while the following structure is designated AGO. Each pyramid serves a distinct functional role within the Sea Village’s economic and cultural system. The HI Pyramid represents the sectors of Hybrid Manufacturing and Integrated Manufacturing. It functions as the industrial and engineering center of the Sea Village, supporting advanced production systems, technological development, and complex fabrication processes. The AGO Pyramid represents Aquaponics, Grinding, and Orthography. This pyramid supports sustainable food production through aquaponic systems, precision material processing, and the development and preservation of written systems, knowledge, and communication. Complementing these pyramids are the Seaporium Lighthouses, which guide the maritime networks connecting the Sea Villages. In addition to their navigational role, these structures house additional aquaponic facilities, supporting ocean-based agriculture and environmental monitoring."
    },
    {
      id: 2,
      title: "Culture",
      image: "./images/sv4.png",
      text: "The culture of the Sea Villages is organized around a 14-tribe system, which together forms a total of 126 tribes. Smaller tribes are grouped together to ensure stability and representation, while larger tribes are distributed evenly across the villages to maintain balance between communities. Within this structure, the social ethos of the Sea Villages emphasizes harmony, mutual understanding, and non-violence. These values are cultivated through the guidance of the Cetiya of the Upasika, while the Sanctuary of the Sea retains overall religious and spiritual authority. Each tribe is also tasked with developing its own writing script, encouraging cultural expression and intellectual creativity. To support this tradition, an annual writing and innovation competition is held, attended by the men of the Klēros. The gathering recognizes achievements across several fields, including the best alphanumeric writing system, excellence in manufacturing practices—such as the most refined individual grinding production—and innovations in aquaponics."
    },
    {
      id: 3,
      title: "Governance",
      image: "./images/sv1.png",
      text: "The Sea Villages are integrated into the RACH under the authority of the Sanctuary of the Sea, which serves as the governing maritime institution overseeing the oceanic settlements. Their organisational structure follows a hierarchical progression of 2 → 5 → 5 → 22 → 9, culminating in the Nine Hierera of the Sanctuary of the Sea. This structure organizes the Sea Villages into successive administrative and functional layers, ensuring coordination, governance, and distribution of responsibilities across the network of settlements. At the highest level, the Nine Hierera correspond to the Nine Waters, the major maritime regions within which each cycle of Sea Villages is situated. These waters define the geographic and ecological domains of the Sanctuary’s authority. The Nine Waters are: The Baltic Sea. The Black Sea. Hudson Bay. The Mediterranean Sea. The Caspian Sea. The Sea of Okhotsk. Baffin Bay. The Bering Sea. The Kara Sea. Through this structure, the Sea Villages operate as a coordinated maritime network, linking oceanic communities across multiple regions while remaining unified under the governance of the Sanctuary of the Sea."
    },
    {
      id: 4,
      title: "Judgement",
      image: "./images/sv3.png",
      text: "Admission to the Sea Villages is determined through an evaluative framework known as the CAPE Criteria (CC). This framework serves as a guiding standard for assessing eligibility for entry into the Sea Village communities. The CAPE criteria consider four primary categories: Celebrities, Africans, Politicians, and English. These categories represent individuals who possess cultural influence, continental connection, governance experience, or linguistic compatibility with the operational language of the settlements. While the CAPE criteria play a significant role in the evaluation process, they are not absolute requirements. Exceptions may be granted in certain circumstances where applicants demonstrate exceptional merit, contribution, or alignment with the values and objectives of the Sea Villages. Nevertheless, these parameters remain important factors that weigh heavily in the overall judgment for admission "
    }
  ];


  const [imageCarouselIndex, setImageCarouselIndex] = useState(0);

  const nextImageSlide = () => {
  setImageCarouselIndex((prev) =>
    (prev + 1) % imageCarouselItems.length
  );
  };

  const prevImageSlide = () => {
  setImageCarouselIndex((prev) =>
    (prev - 1 + imageCarouselItems.length) % imageCarouselItems.length
  );
  };


  const accordionItems = [
  {
    id: 0,
    title: "Love: Women, sex, companionship, dating, pairing",
    content: "Marriage is a right of priests, polītai, and members of NIFTYER59HALO. Marriage partners for priests and polītai are found using a dating app. Women that live in the towns are free to have sex with the boys from age 16 to 18(when they leave). Female acolytes aged 20 and above are free to have sex with well performing male acolytes at palatates if using protection. Men that are slaves do not have sex, but donate sperm. The laws regarding sex for Polītai are mostly governed by the Proedros of that Polis, however some laws will still be in effect."
  },
  {
    id: 1,
    title: "Language: People, Zoos and the mandatory second language",
    content: "The official languages of a zone(town, route) will depend on the result of their 89 test. Currently I am thinking Hindi, Mandarin, Armenian, Arabic, Hebrew, Persian and Greek (MAPSHAG) along with German, Italian and French. People will live in towns or routes and will have varying levels of rights and life styles depending on this. Where a person lives is determined by their 89 score, gender and race(ethnic background). All towns will have a zoo and I am considering putting zoos along routes." // Second item
  },
  {
    id: 2,
    title: "Leadership: NIFTYER59HALO",
    content: "NIFTYER59HALO is the name of the family established by Alvah Ivan Jamell Ivor Bucknor Wisdom Samuels during the periods of trial, testing, transformation, and planning that shaped his life—from his years in education through to his experience of homelessness."
  },
  {
    id: 3,
    title: "Cause: Priesthood",
    content: " The priesthood of the Melchizedek has 6 branches together they oversee the whole globe. Current Klēroi from all religions will be recruited and new Klēroi will be made as seen fit and be given the official status Klēros. Klēroi  live in relic cities overseen by the Rabat of the Relics. Klēroi are tasked with purifying these cities starting again from the holiest sites. The 6 branches are the Cetiya of the Upasikayo(lamp), Rabat of the Relic (Relic Cities), Oikos of the Oikodrome(Arx and routes), the Synagogue of the Sefer(Rus), the Sanctuary of the Sea (Sea Village), the Haveli of the Hari(KT HAM), the Temple of the Tao(Thana and Hidalgo) . "
  }, 
  {
    id: 4,
    title: "Justice: Test, Payment and JSPEM",
    content: "To ensure society is fair all people will be tested according to their life (8) and their goodness and concealed goodness (9) togther this is an 89 (celebration of preservation against evil). A person is paid by their living standards and this is determined by where they live which is decided by their race(ethnicity), gender and 89 result. They must then commit to a 114. JSPEM stands for Justice, System, Psychic, Estem and Meal. It is a sub branch of the main branch of the 9 governed by seraphim evangelions. They calculate and operate the core of the governing decisions for many sectors and only submit to decisions about FEST. The nine categories are: [46, 44, 38, 21, 21, 14, 11, 30(5)]. The eight categories are: [32, 42, 18, 11, 11, 11, 16, 16].",
    fontSize: "0.5em"
  },
  {
    id: 5,
    title: "Completion: GUM, FEST, Celebrities, Pokemon and entertainment.",
    content: "GUM stands for giving, understanding and movement. It is a sub branch of social services within the Sanctuary of the Sea that is headed by the Divine Hiereia Megalē (ἹέρειαΜεγάλη) that is one of the five major bodies of the Priesthod of the Melchizedek. It is composed of priestesses who rotate between this role as social media worker. FEST stands for Fashion, Entertainment, Science(espionage) and Test. It is ran by ladies of the lamp of which there are 30 per CLT. This ensures each region has a different cultural identity while also being religiously correct. All celebrities are the children of myself, Russell or Kwame or an adopted daughter. Pokemon will be in the world and the number of Pokemon a person has will be decided by their 89 score. All entertainment venues will be outside of towns i.e discos, stadiums, theatres, gambling etc. Inside of towns will be community centers for group meetings of arts and crafts, yoga and meditation, zoos, gyms, spas, reading groups and play areas which are spaces where women go to play tag, climb walls etc. There are no parks."
  }
];

  const leftCards = [
  {
    id: 0,
    title: "Produce",
    summary: "Indentured, Acolytes",
    details:
      "",
  },
  {
    id: 1,
    title: "Manufacturing",
    summary: "Routes, PPEA",
    details:
      "",
  },
  {
    id: 2,
    title: "Services",
    summary: "Towns: Routes: Relics: PPEA",
    details:
      "",
  },
  {
    id: 3,
    title: "Entertainment",
    summary: "Ultra Artificial Intelligence Generated Filmography, Music and Games.",
    details:
      "",
  },
  {
    id: 4,
    title: "Construction",
    summary: "Route, PPEA",
    details:
      "",
  }
];



const rightGrid = [
  {
    id: 0,
    title: "New land settlements and old land settlements",
    frontImage: "./images/cityparallel.png",
    backImage: "./images/christmas-back.jpg", // you can use same image or a different one
    content: "New Land Settlements, called CLTs, are purpose-built communities for most women and children and many men, organized around 18 expandable town archetypes and divided into three regions: the capital (the Christmas) and two common regions (the Lamp and the Tooth). Old Land Settlements are culturally significant existing cities entrusted to the Priesthood of Melchizedek (under the Rabat of the Relics) for purification and maintenance, where only Klēroi may reside.",
  },
  {
    id: 1,
    title: "Routes and nomads and slaves",
    frontImage: "./images/routesnomads.png",
    backImage: "./images/cross-back.jpg",
    content: "Routes are large logistical and production networks that connect all settlements. They are home to acolytes—men and women who live in large, semi-autonomous freight RVs called Kharvees—and who are selected through testing (the WALT.P WALT.P (Wife, Acolyte, Lady, Townie).(Priestess) for females and the PAD (Priest, Acolyte, Deacon) for males which are parts of the 89 test). Slaves are individuals who have committed crimes, as all crimes result in lifelong slavery. Regardless of status, everyone is housed, fed, and provided for according to their needs—for example, a one-bedroom dwelling includes basic provisions such as a television and a games console.",
  },
  {
    id: 2,
    title: "Sea villages and sky turtles (beyblades, castles).",
    frontImage: "/images/seaandsky.png",
    backImage: "./images/card-back.jpg",
    content: "Sea Villages are newly established communities and a vital extension of the New Settlements. Connected by the Routes, they host a steady rotation of acolytes serving as part of their MSHN, and residence within them is tiered—those with higher 89 scores live at higher levels. Focused on advanced manufacturing, Sea Villages are centers of cutting-edge technology and production. Sky Turtles are airborne towns planned for development after terrestrial infrastructure is complete and before space terraforming begins. They are intended to become the future homes of the Priesthood once the purification of the relic cities has been fully accomplished.",
  },
  {
    id: 3,
    title: "The Moon, other planets and space",
    frontImage: "./images/moonvenusspace.png",
    backImage: "./images/tet-back.jpg",
    content: "The Moon will be the first celestial body to undergo terraforming. This process will be carried out using vast engineered structures known as Spears, designed to regulate and control a planet’s biome. The initial lunar mission is scheduled for completion during the business phase of the plan, though permanent settlements will not be constructed until terraforming has been fully achieved. In time, all celestial bodies will be terraformed or otherwise made habitable, including gas giants, which are designated to serve as habitats for robotic populations. Additional space infrastructure will include space gates (rings) for transit and space platforms (orbital towns) for habitation and operations.",
  },
];




  const bottomThree = [
  { id: 0, title: "MSHN", text: "MAGGOTS, SKOULIKIA, HATI and NOVELISE."},
  { id: 1, title: "SPAM", text:"Service, Produce, Arts, Manufacturing" },
  { id: 2, title: "4SA", text:"" },
  { id: 3, title: "FACTS", text:"Factory, Agriculture, Servitude, Transportation" }

];



const carouselItems = bottomThree.map(item => ({
  id: item.id,
  title: item.title,
  content: item.text || `Content for carousel ${item.id + 1}`
}));

  const [openLeftCard, setOpenLeftCard] = useState(null);


  const nextCarousel = () => {
    setCarouselIndex((prev) => (prev + 1) % carouselItems.length);
  };

  const prevCarousel = () => {
    setCarouselIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  const townSections = [
  { 
    id: 1, 
    title: "Housing & Residential", 
    icon: "🏘️", 
    slides: [
      { image: "/images/automation/saddle.png", text: "The majority of the residents live in the saddle in groups of 18. There are 6 boroughs in a town with 273 saddles each." }
    ]
  },
  { 
    id: 2, 
    title: "Agriculture", 
    icon: "🌾", 
    slides: [
      { image: "/images/automation/farm1.png", text: "The majority of the agriculture will take place within the square walls of the route and the zig zag shapped walls of the CLT. These farms are worked by slaves, passing acolytes and automated units and are overseen by Maimonides class Ivangellions. The rest of the agriculture is along the route and is also worked by the acolytes." }
    ]
  },
  { 
    id: 3, 
    title: "Manufacturing & Industry", 
    icon: "🏭", 
    slides: [
      { image: "/images/automation/emporium1.png", text: "All manufacturing of a CLT is completed within the 4 squares (PPEA) the rest of the maunfacturing is done along the routes with the Emporiums run by a Sexton being a major zone of manufacturing. " },
      { image: "/images/automation/fashion.png", text: "Within the towns women work as fashion designers and child bearers." },
  
    ]
  },
  { 
    id: 4, 
    title: "Services & Utilities", 
    icon: "🏥", 
    slides: [
      { image: "/images/sketches/atlas.png", text: "Hospitals, shops, schools, and public services. All these services will be place within the walls of the towns. " },
      { image: "/images/sketches/princerussell.png", text: "Electricity and water utilities infrastructure. Electricity and water run through the walls and are produced in undeground plants outside of the towns. An entire CLT has one electricity producer and one water producer." },
      { image: "/images/sketches/hourglass2.png", text: "Public service offices and educational centers. Public services and offices are all on the wall. Education is in the center." }, 
      { image: "/images/kharvees.jpg", text: "The Kharvees are the autonomous mobile trackable habitable living units for men. They function on tracks, loops and road. They are fitted with studio accomodation and AI to transport men to where they are needed to work and they can provide support and assistance with training to prepare men for work on arival. There will be 26200 per Eshtion and 314402 Kharvees per CLT." }, 
      { image: "/images/Eshtion.jpg", text: "The Eshtions are the AI depots and hubs where kharvees can be stored and charged if needed and also serves as training locations. There will be 12 Eshtions per CLT." }, 
      
    ]
  },
  { 
    id: 5, 
    title: "Entertainment & Culture", 
    icon: "🎭", 
    slides: [
      { image: "/images/sketches/potalapalacefuturistic.png", text: "Theaters, music halls, parks, and cultural centers. These are managed and directed by FEST. Each CLT has a specialty as a part of a FEST. The Fashion CLT has an arts center, the Entertainment CLT has a hologram world theme park, the Science CLT has a Pokemon Park and the Trade CLT has a Tibet which is the only place where gambling is permitted." },
    ]
  },
  { 
    id: 6, 
    title: "Governance & Security", 
    icon: "🏰", 
    slides: [
      { image: "/images/automation/gov1.png", text: "Direct government is performed by LAID(FEST) and Maimonides type Ivangellions(JSPEM). They are overseen by priestesses from towns ruling religion." }
    ]
  }
];


const mainCards = [
  {
    id: 1,
    title: "Christmas and PPEA",
    image: "/images/christmas2.png",
    subCards: [
      { id: 11, text: "The Christmas contains the Arx, Hidalgo, Rus and Thana. The Arx is the tranportation and distribution capital governed by the Oikos and home to the Elite 4. The Rus is the administrative capital governed by the Synagogue of the Sefer. The Hidalgo and Thana are the directive and religious capitals goverend by the Temple of the Tao and inhabitated only by LAID and Priestesses along Ivangellions. ", image: "/images/christmascity.png" },
      { id: 12, text: "PPEA stands for Palatinate, Polis, Emirate and Arche. There are robotic elves that live in the Emirate and work alongside the male slaves. ", image: "/images/robotelf.png" },
      { id: 13, text: "", image: "/images/daughters.png" },
      { id: 14, text: "", image: "/images/entertainment1.png" },
    ],
  },
  {
    id: 2,
    title: "Lamp and Tooth",
    image: "/images/lamp.png",
    subCards: [
      { id: 21, text: "The Lamp is composed of the Wola, Eshkol, Shefa, Hromoda, Grad and Burg and is governed by the Cetiya of the Upasika. The Tooth is composed of the Hamlet, Alber, Mish, Kent and Thorpe and is governed by the Haveli of the Hari.", image: "/images/tour.png" },
      { id: 22, text: "Males up to the age of 18 live in the towns after which they are inducted into the Oikos of the Oikodrome as an Acolyte. Before they leave town they are not restricted from having sex with any woman above the age of 20 and not oathed to another. Females are given two opportunities to become LAID or Priestesses, typically at the ages of 14 and 18. Exceptional candidates may be recruited into boarding school from the age of 14. All females then spend two years, beginning at age 16, serving as acolytes. At the conclusion of this acolyte period, they are formally assessed to determine who is suitable to advance to the roles of LAID or Priestess. ", image: "/images/acolyte1.png" },
      { id: 23, text: "Males under the age of 18 are given free electronic condoms. They must use them as any unauthorised pregnancy or unprotected sex will result in the male being acolyted immediately. Acolytes are permitted to engage in sexual relations inside the Palatinate on the condition that they have completed every stop along a route.", image: "https://via.placeholder.com/200x150" },
      { id: 24, text: "Women live in families of 3 Head Wives, 4 Tit Wives and 5 Batty Wives. They live in a house called a Saddle that can accomodate 18 people as 12 women and 6 children. The right to bear children is reserved for a Head Wife who can have 2. When a Head Wife has performed very well she is given the option to become a MAC Wife. A MAC wife has no limit on the number of children she can have and lives in a castle between the town walls with women of her choice.", image: "https://via.placeholder.com/200x150" },
    ],
  },
  {
    id: 3,
    title: "Routes",
    image: "/images/Eshtion.jpg",
    subCards: [
      { id: 31, text: "Kharvees are autonomous and manual moveable apartments first made during the business phase of the plan. They are similar to RVs and can drive on road, loop or rail. Kharvees are organised into groups of 21 called Lots and Lots are organised into groups of 13 called Orders and Orders are organised into groups of 5 called Ecclesia and Ecclesia are grouped into 4s called an Koinonia that come under one as an Akoloutheo (Ακολουθέω). The Akoloutheo are administerd by the Oikos of the Oikodome. Altogether this is a Khloe Kao. ", image: "/images/automation/kharveefreight.png" },
      { id: 32, text: "This futuristic operations center allows a single pilot to manage a fleet of Unit 73 Advanced-Ops Droids at a remote, high-altitude mining site. The droids utilize a hybrid leg-and-track system for extreme mobility, while their electromagnetic arms perform high-precision tasks like inserting GeoScan sensor rings into boreholes. Real-time telemetry and 3D wireframe data are transmitted via satellite to the pilot’s console, providing a seamless 'virtual presence' from the safety of the building. To support the heavy machinery, autonomous humanoid assistants and specialized winged sentinel units maintain site security and technical maintenance. This integrated ecosystem replaces traditional manual labor with a standardized, scalable robotic force capable of operating in the planet's harshest environments.", image: "/images/automation/droid4.png" },
      { id: 33, text: "Sex is a reward for men that have completed the MSHN. Each part of the MSHN needs to be perfected. On attainment of these goals they are permitted to enter a given town with an electronic condom to have sex with any woman willing, although not any woman of rank such as ladies. From then they must maintain productivity and continue the MSHN and will be able to have sex thrice a year on Christmas, Easter and the anniversary of when first given their condom.", image: "/images/icon2.png" },
      { id: 34, text: "Work for all people is paired. There is one job that teach and another job that they learn. Once they learn a job it becomes the job they teach and they are given a new job to learn. The goal is to be able to teach and work every job of that zone to the highest skill level.", image: "https://via.placeholder.com/200x150" },
    ],
  },
  {
    id: 4,
    title: "Pyramids",
    image: "/images/tooth.png",
    subCards: [
      { id: 41, text: "In Freestyle Manufacturing, the factory stops being a rigid assembly line and starts acting like a Creative Printer. Instead of having one machine for a phone and another for a wrench, the entire facility is built around the mastery of a specific Core Material (like advanced carbon-fiber composites, recycled polymers, or powdered titanium). By focusing on one material, the factory can achieve ultimate versatility.", image: "/images/freestylemanufacturing.png" },
      { id: 42, text: "", image: "" },
      { id: 43, text: "Sub-card 4C", image: "https://via.placeholder.com/200x150" },
      { id: 44, text: "Sub-card 4D", image: "https://via.placeholder.com/200x150" },
    ],
  },
];

const CarouselContent = ({ large = false }) => (
  <div
    onClick={() => !large && setExpanded(true)}
    style={{
      position: "relative",
      overflow: "hidden",
      borderRadius: large ? "0px" : "22px",
      height: large ? "100%" : "320px",
      width: "100%",
      cursor: large ? "default" : "zoom-in",
      background: "#000",
      boxShadow: large ? "none" : "0 10px 30px rgba(0,0,0,0.15)",
    }}
  >
    {imageCarouselItems.map((img, idx) => (
      <div
        key={idx}
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${img})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          transition: "opacity 0.6s ease",
          opacity: idx === imageCarouselIndex ? 1 : 0,
        }}
      />
    ))}

    {/* LEFT */}
    <button
      onClick={(e) => {
        e.stopPropagation();
        prevImageSlide();
      }}
      style={{
        ...styles.btn,
        position: "absolute",
        left: "12px",
        top: "50%",
        transform: "translateY(-50%)",
        fontSize: large ? "38px" : "22px",
      }}
    >
      ‹
    </button>

    {/* RIGHT */}
    <button
      onClick={(e) => {
        e.stopPropagation();
        nextImageSlide();
      }}
      style={{
        ...styles.btn,
        position: "absolute",
        right: "12px",
        top: "50%",
        transform: "translateY(-50%)",
        fontSize: large ? "38px" : "22px",
      }}
    >
      ›
    </button>
  </div>
);



  return (
    <AnimatedPage>
      <h2 style={styles.sectionTitle}>World Rule 1</h2>

     {/* Accordion at the top (inline toggle version) */}
<div
  style={{
    display: 'flex',
    gap: '12px',
    marginBottom: '24px',
    flexWrap: 'wrap',
    maxHeight: '500px', // <-- max height for the entire accordion container
    overflowY: 'auto',  // <-- enable vertical scrolling
    paddingRight: '8px', // optional, prevent content from being hidden behind scrollbar
  }}
>
  {accordionItems.map((item) => {
    const isOpen = activeAccordion === item.id;
    return (
      <div
        key={item.id}
        onClick={() => setActiveAccordion(isOpen ? null : item.id)}
        style={{
          ...styles.card,
          flex: '1 1 250px',
          cursor: 'pointer',
          padding: '1rem',
          borderRadius: '16px',
          boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
          backgroundColor: isOpen ? '#f3f4f6' : '#fff',
          transition: 'all 0.3s ease',
          border: '1px solid #e5e7eb',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <h4
          style={{
            margin: 0,
            fontSize: '18px',
            fontWeight: 600,
            color: '#111827',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {item.title}
          <span style={{ opacity: 0.6 }}>{isOpen ? '−' : '+'}</span>
        </h4>

        {/* Scrollable expandable content */}
        <div
          style={{
            maxHeight: isOpen ? '200px' : '0px', // scrollable area height
            overflowY: 'auto', // enable vertical scroll
            transition: 'max-height 0.35s ease, padding 0.35s ease',
            paddingTop: isOpen ? '12px' : '0px',
            color: '#374151',
            fontSize: '15px',
            lineHeight: 1.5,
          }}
        >
          <p style={{ margin: 0 }}>{item.content}</p>
        </div>
      </div>
    );
  })}
</div>


      {/* Main layout: Left cards + Right grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gap: '16px',
        marginBottom: '24px'
      }}>
        {/* Left cards */}
<div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
  {leftCards.map((card) => {
    const isOpen = openLeftCard === card.id;

    return (
      <div
        key={card.id}
        style={{
          background: "#f9fafb",
          padding: "18px",
          borderRadius: "16px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
          border: "1px solid #e5e7eb",
        }}
      >
        {/* TITLE CLICK AREA */}
        <h4
          onClick={() =>
            setOpenLeftCard(isOpen ? null : card.id)
          }
          style={{
            margin: 0,
            cursor: "pointer",
            fontSize: "18px",
            fontWeight: 600,
            color: "#111827",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {card.title}
          <span style={{ opacity: 0.5 }}>
            {isOpen ? "−" : "+"}
          </span>
        </h4>

        {/* ALWAYS VISIBLE SUMMARY */}
        <p
          style={{
            marginTop: "8px",
            color: "#4b5563",
            fontSize: "14px",
            lineHeight: 1.6,
          }}
        >
          {card.summary}
        </p>

        {/* EXPANDED CONTENT */}
        <div
          style={{
            maxHeight: isOpen ? "300px" : "0",
            overflow: "hidden",
            transition: "max-height 0.35s ease",
          }}
        >
          {isOpen && (
            <p
              style={{
                marginTop: "10px",
                color: "#374151",
                fontSize: "14px",
                lineHeight: 1.7,
              }}
            >
              {card.details}
            </p>
          )}
        </div>
      </div>
    );
  })}
</div>





        {/* Right grid */}
        {/* Right grid */}
<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    perspective: "1200px",
    rowGap:"4rem",
    columnGap:"2rem"
  }}
>
  {rightGrid.map((item) => {
    const isFlipped = flippedCard === item.id;
    const imageOpen = expandedImage === item.id;
    const textOpen = expandedText === item.id;

    return (
      <div
        key={item.id}
        style={{
          height: "30rem",
          position: "relative"
    
        }}
      >
        <div
          style={{
            width: "90%",
            height: "100%",
            position: "relative",
            transformStyle: "preserve-3d",
            transition: "transform 0.6s ease",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >

          {/* FRONT */}
          <div
            onClick={() => setFlippedCard(item.id)}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
              borderRadius: "16px",
              overflow: "hidden",
              cursor: "pointer",
              backgroundImage: `url(${item.frontImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              alignItems: "flex-end",
              padding: "16px",
              color: "white",
              fontWeight: 600,
              fontSize: "18px",
              backgroundBlendMode: "overlay",
              boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
            }}
          >
            <div
              style={{
                background: "rgba(0,0,0,0.5)",
                padding: "8px 12px",
                borderRadius: "10px",
              }}
            >
              {item.title}
            </div>
          </div>

          {/* BACK */}
          <div
            style={{
              position: "absolute",
              width: "90%",
              height: "100%",
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              borderRadius: "16px",
              background: "#0f172a",
              color: "white",
              padding: "14px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
            }}
          >
            {/* Click to flip back */}
            <div
              style={{
                fontSize: "12px",
                opacity: 0.6,
                cursor: "pointer",
              }}
              onClick={() => setFlippedCard(null)}
            >
              ← Back
            </div>

            {/* Expandable Image */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                setExpandedImage(imageOpen ? null : item.id);
              }}
              style={{
                height: imageOpen ? "160px" : "80px",
                backgroundImage: `url(${item.backImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "10px",
                cursor: "pointer",
                transition: "all .3s ease",
              }}
            />

            {/* Expandable Text */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                setExpandedText(textOpen ? null : item.id);
              }}
              style={{
                overflow: "hidden",
                cursor: "pointer",
                fontSize: "14px",
                lineHeight: 1.2,
                display: "-webkit-box",
                WebkitLineClamp: textOpen ? "unset" : 3,
                WebkitBoxOrient: "vertical",
              }}
            >
              {item.content}
            </div>
          </div>

        </div>
      </div>
    );
  })}
</div>

      </div>

                  {/* IMAGE + SIDE BOXES SECTION */}
<div
  style={{
    marginTop: "80px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "28px", // spacing between boxes and carousel
    width: "100%",
  }}
>
  {/* LEFT BOX */}
  <div
    onClick={() => setOpenSideBox(openSideBox === "left" ? null : "left")}
    style={{
      width: "100%",
      maxWidth: "520px",
      background: "#ffffff",
      padding: "20px 22px",
      borderRadius: "16px",
      border: "1px solid #e5e7eb",
      boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
      cursor: "pointer",
      transition: "all 0.25s ease",
      fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.10)";
      e.currentTarget.style.transform = "translateY(-2px)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)";
      e.currentTarget.style.transform = "translateY(0)";
    }}
  >
    <h3
      style={{
        margin: 0,
        marginBottom: "10px",
        fontSize: "18px",
        fontWeight: "600",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "#111827",
        letterSpacing: "0.2px",
      }}
    >
      Towns 
      <span
        style={{
          fontSize: "22px",
          lineHeight: 1,
          opacity: 0.6,
          transition: "transform 0.3s ease",
          transform: openSideBox === "left" ? "rotate(180deg)" : "rotate(0deg)",
        }}
      >
        {openSideBox === "left" ? "−" : "+"}
      </span>
    </h3>

    <div
      style={{
        maxHeight: openSideBox === "left" ? "400px" : "0px",
        overflow: "hidden",
        transition: "max-height 0.45s ease",
      }}
    >
      <div
        style={{
          maxHeight: "400px",
          overflowY: openSideBox === "left" ? "auto" : "hidden",
          paddingRight: "4px",
        }}
      >
        <p
          style={{
            marginTop: "12px",
            fontSize: "14.5px",
            lineHeight: "1.7",
            color: "#374151",
          }}
        >
          In this society, every woman is a fashion designer whose social standing is woven into the very fabric of her success. 
          Rank is determined by the volume of sales compared to other women, and this hierarchy dictates everything from the materials she may use to the specific garments she is permitted to create.
          A woman's progression through the social strata unlocks new creative frontiers: as a Batty Wife, she is restricted to footwear and lower-body apparel; upon promotion to Tit Wife, she gains the privilege of designing tops; reaching the level of Head Wife allows for the creation of hats, jewelry, watches, and sunglasses; and finally, reaching the rank of MAC grants the exclusive right to produce cosmetics. 
          The system operates on a cycle where finalized designs are sent to high-tech factories for mass production, and the designer must then use her samples to convince women within her CLT (Consumer Loyalty Tier) to purchase her collections using their rank-based purchase points. 
          A basic amount of spending points are distributed every 36-day month with additional bonuses awarded by the Ivangellions and Ladies for exceptional innovation or craftsmanship. 
          Purchase points are strictly single-use to prevent double spending and are directly applied toward a woman's standing within the hierarchy. 
          This ensures that every point spent on a design simultaneously functions as a vote of success, permanently tethering a designer's social rank to the actual consumption of her work. 
          The social hierarchy undergoes a total recalculation every two years, at which point women must relocate to the specific accommodations tied to their new rank.
           This entire system is overseen by the Ladies in Charge of Fashion(Ladies of the Lamp), a council of four elites per FEST who hold the exclusive right to access all materials. 
          These overseers possess the power to award discretionary points to designs they deem exceptional and maintain total authority over selecting the designers who represent their FEST along with them at the prestigious fashion shows (6 Ladies, 6 Townsfolk).
          While the women of the towns focus on the high-stakes world of fashion, all manufacturing and agriculture are performed by those living outside the town limits, and essential services are handled by acolytes, Ivangellions, droids, and slaves, though childcare remains a personal responsibility performed within the home.
        </p>
      </div>
    </div>
  </div>

  {/* CENTER IMAGE CAROUSEL */}
  <CarouselContent />
  {expanded && (
    <div
      onClick={() => setExpanded(false)}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.92)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        animation: "fadeIn 0.25s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "95vw",
          height: "95vh",
          maxWidth: "1600px",
        }}
      >
        <CarouselContent large />
      </div>
    </div>
  )}

  {/* RIGHT BOX */}
  <div
    onClick={() => setOpenSideBox(openSideBox === "right" ? null : "right")}
    style={{
      width: "100%",
      maxWidth: "520px",
      background: "#ffffff",
      padding: "20px 22px",
      borderRadius: "16px",
      border: "1px solid #e5e7eb",
      boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
      cursor: "pointer",
      transition: "all 0.25s ease",
      fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.10)";
      e.currentTarget.style.transform = "translateY(-2px)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)";
      e.currentTarget.style.transform = "translateY(0)";
    }}
  >
    <h3
      style={{
        margin: 0,
        marginBottom: "10px",
        fontSize: "18px",
        fontWeight: "600",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "#111827",
        letterSpacing: "0.2px",
      }}
    >
      Routes
      <span
        style={{
          fontSize: "22px",
          lineHeight: 1,
          opacity: 0.6,
          transition: "transform 0.3s ease",
          transform: openSideBox === "right" ? "rotate(180deg)" : "rotate(0deg)",
        }}
      >
        {openSideBox === "right" ? "−" : "+"}
      </span>
    </h3>

    <div
      style={{
        maxHeight: openSideBox === "right" ? "400px" : "0px",
        overflow: "hidden",
        transition: "max-height 0.45s ease",
      }}
    >
      <div
        style={{
          maxHeight: "400px",
          overflowY: openSideBox === "right" ? "auto" : "hidden",
          paddingRight: "4px",
        }}
      >
        <p
          style={{
            marginTop: "12px",
            fontSize: "14.5px",
            lineHeight: "1.7",
            color: "#374151",
          }}
        >
          Managed by the Oikos of the Oikodrome, life along the routes is powered by Acolytes who perform all menial labor under oath until they are either promoted to Sexton or, if female, return to the towns as a Tit Wife; all men are classified as Acolytes unless they are Priests in a Holy City managed by the Rabat of the Relics or Polites within a Polis, their primary goal is to earn a permanent residence within an Emporium—a manufacturing, social and logistic hub—where a single Sexton oversees operations with a Stunt Double and houses up to four City Girl wives. 
          Women who do not fit into the town hierarchy yet eschew Acolyte labor become City Girls within the Emirate, serving as call girls for high-performing Acolytes who have earned sex points until they are selected by a Sexton to gain exclusive access to Emporium-manufactured clothing, though Acolytes may also engage in heterosexual intercourse and sperm donation at the Palatinate. Realtionships between male and female Acolytes is permitted if the female is above 20 years of age. Points awarded to City girls function similar 
          to those within a town and a city girl has the option of refusing sexual intercourse. The more points a city girl accumulates promtes her higher up the ranks with rewards for studio decorations and clothing. Once decorations are aquired they remain, however access to clothing is recalculated every two years based on the number of points. The minimum time it takes to reach Slay Queen is 8 years.
         


          
        </p>
      </div>
    </div>
  </div>
</div>


      {/* Carousel at the bottom */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5em' }}>
        <div style={{ display: 'flex', gap: '16px', overflow: 'hidden', justifyContent: 'center', width: '100%', maxWidth: '340rem' }}>
          {carouselItems.map((item, idx) => {
            const offset = (idx - carouselIndex + carouselItems.length) % carouselItems.length;
            let scale = 0.8, opacity = 0.5;
            if (offset === 0) { scale = 1; opacity = 1; }
            else if (offset === 1 || offset === carouselItems.length - 1) { scale = 0.9; opacity = 0.7; }

            return (
              <div
                key={item.id}
                style={{
                  ...styles.card,
                  minWidth: '150px',
                  textAlign: 'center',
                  transition: 'transform 0.5s ease, opacity 0.5s ease',
                  transform: `scale(${scale})`,
                  opacity
                }}
              >
                <h4>{item.title}</h4>
                <p>{item.content}</p>
              </div>
            );
          })}
        </div>

        {/* Carousel navigation */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={prevCarousel} style={styles.btn}>Previous</button>
          <button onClick={nextCarousel} style={styles.btn}>Next</button>
        </div>
      </div>

    {/* =============================== */}
    {/* PYRAMID SECTION */}
    {/* =============================== */}

<div
  style={{
    marginTop: "80px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    perspective: "1500px",
  }}
>
  <h2 style={styles.sectionTitle}>Sea Village: Interactive Pyramid</h2>

  <div
    style={{
      width: "90%",
      maxWidth: "600px",
      display: "flex",
      flexDirection: "column-reverse",
      gap: "12px",
    }}
  >
    {pyramidSections.map((tier, idx) => {
      const isOpen = openPyramid === tier.id;
      const width = 85 + (12 - 12 * idx);

      return (
        <div
          key={tier.id}
          onClick={() => setOpenPyramid(isOpen ? null : tier.id)}
          style={{
            margin: "0 auto",
            width: `${width}%`,
            cursor: "pointer",
            position: "relative",
            zIndex: idx,
            transition: "all 0.4s ease",
          }}
        >
          {/* TIER BLOCK */}
          <div
            style={{
              background: "#f9fafb",
              padding: "18px",
              borderRadius: "18px",
              textAlign: "center",
              boxShadow: isOpen
                ? "0 12px 40px rgba(0,0,0,0.25)"
                : "0 6px 20px rgba(0,0,0,0.15)",
              border: "1px solid #e5e7eb",
              transform: isOpen ? "scale(1.03)" : "scale(1)",
              transition: "all 0.35s ease",
            }}
          >
            <h4
              style={{
                margin: 0,
                fontWeight: 600,
                fontSize: "18px",
                color: "#111827",
                textShadow: "0 0 4px rgba(0,0,0,0.2)",
              }}
            >
              {tier.title}
            </h4>
          </div>

          {/* EXPANDABLE CONTENT */}
          <div
            style={{
              maxHeight: isOpen ? "420px" : "0px",
              overflow: "hidden",
              transition: "max-height 0.45s ease, padding 0.35s ease",
              paddingTop: isOpen ? "12px" : "0px",
            }}
          >
            {isOpen && (
              <div
                style={{
                  background: "#fff",
                  borderRadius: "16px",
                  padding: "16px",
                  boxShadow: "0 12px 36px rgba(0,0,0,0.18)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                {/* CLICKABLE IMAGE */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImage(tier.image);
                  }}
                  style={{
                    width: "100%",
                    height: "160px",
                    backgroundImage: `url(${tier.image})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    borderRadius: "12px",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                    cursor: "zoom-in",
                  }}
                />

                {/* SCROLLABLE TEXT */}
                <div
                  style={{
                    maxHeight: "120px",
                    overflowY: "auto",
                    paddingRight: "6px",
                    width: "100%",
                  }}
                >
                  <p
                    style={{
                      fontSize: "15px",
                      lineHeight: 1.6,
                      textAlign: "center",
                      margin: 0,
                    }}
                  >
                    {tier.text}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    })}
  </div>

  {/* IMAGE MODAL */}
  {activeImage && (
    <div
      onClick={() => setActiveImage(null)}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.85)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        cursor: "zoom-out",
      }}
    >
      <img
        src={activeImage}
        alt=""
        style={{
          maxWidth: "90%",
          maxHeight: "90%",
          borderRadius: "14px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
        }}
      />
    </div>
  )}
</div>

  <h2 style={{ ...styles.sectionTitle, marginTop: "3rem", textAlign: "center" }}>
    Town Infrastructure: 6 Pieces
  </h2>

<div
  style={{
    position: "relative",
    width: "100%",
    maxWidth: "620px",
    margin: "2rem auto",
    aspectRatio: "1 / 1",
  }}
>
  {/* CENTER HUB */}
  <div
    onClick={() => setActiveLocation({ ...hubSection, slides: hubSection.slides })}
    style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "90px",
      height: "90px",
      borderRadius: "50%",
      background: "#111827",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 700,
      letterSpacing: "1px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
      zIndex: 5,
      cursor: "pointer",
    }}
  >
    TOWN
  </div>

  {townSections.map((section, idx) => {
    const angleDeg = idx * 60 - 90;
    const angle = (angleDeg * Math.PI) / 180;
    const radius = 46; // % from center

    const x = 50 + radius * Math.cos(angle);
    const y = 50 + radius * Math.sin(angle);

    return (
      <React.Fragment key={section.id}>
        {/* SPOKE LINE */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "2px",
            height: "46%",
            background: "#9ca3af",
            transformOrigin: "top center",
            transform: `rotate(${angleDeg + 90}deg)`,
            zIndex: 1,
            opacity: 0.5,
          }}
        />

        {/* NODE */}
        <div
          onClick={() => {
            setActiveLocation(section);
            setCurrentSlide(0); // reset slide when opening node
          }}
          style={{
            position: "absolute",
            top: `${y}%`,
            left: `${x}%`,
            transform: "translate(-50%, -50%)",
            width: "110px",
            height: "110px",
            background: "#f3f4f6",
            borderRadius: "16px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            cursor: "pointer",
            boxShadow: "0 8px 24px rgba(0,0,0,0.14)",
            transition: "all 0.25s ease",
            zIndex: 4,
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "translate(-50%, -50%) scale(1.08)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "translate(-50%, -50%) scale(1)")
          }
        >
          <div style={{ fontSize: "32px" }}>{section.icon}</div>
          <div style={{ fontSize: "14px", marginTop: "6px", fontWeight: 600 }}>
            {section.title}
          </div>
        </div>
      </React.Fragment>
    );
  })}
</div>

{activeLocation && (
  <div
    onClick={() => setActiveLocation(null)}
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.65)",
      backdropFilter: "blur(6px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 999,
      padding: "40px 20px",
    }}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        background: "#fff",
        borderRadius: "18px",
        width: "100%",
        maxWidth: "600px",
        maxHeight: "90vh",
        overflowY: "auto",
        padding: "28px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h3 style={{ fontSize: "24px", marginBottom: "12px" }}>
        {activeLocation.icon} {activeLocation.name}
      </h3>

      {activeLocation.slides && activeLocation.slides.length > 0 && (
        <div style={{ width: "100%" }}>
          <img
            src={activeLocation.slides[currentSlide].image}
            alt={activeLocation.slides[currentSlide].title}
            style={{
              width: "100%",
              borderRadius: "12px",
              marginBottom: "16px",
            }}
          />
          <p style={{ lineHeight: 1.7, fontSize: "16px" }}>
            {activeLocation.slides[currentSlide].text}
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "12px",
            }}
          >
            <button
              onClick={() =>
                setCurrentSlide(
                  (prev) => (prev - 1 + activeLocation.slides.length) % activeLocation.slides.length
                )
              }
              style={{
                background: "#111827",
                color: "white",
                border: "none",
                borderRadius: "10px",
                padding: "8px 16px",
                cursor: "pointer",
              }}
            >
              Previous
            </button>
            <button
              onClick={() =>
                setCurrentSlide(
                  (prev) => (prev + 1) % activeLocation.slides.length
                )
              }
              style={{
                background: "#111827",
                color: "white",
                border: "none",
                borderRadius: "10px",
                padding: "8px 16px",
                cursor: "pointer",
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setActiveLocation(null)}
        style={{
          marginTop: "24px",
          background: "#111827",
          color: "white",
          border: "none",
          borderRadius: "10px",
          padding: "10px 18px",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        Close
      </button>
    </div>
  </div>
)}


    <div style={{ padding: 20 }}>
      {!activeMain && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {mainCards.map(card => (
            <div
              key={card.id}
              onClick={() => setActiveMain(card)}
              style={{
                height: 220,
                borderRadius: 14,
                backgroundImage: `url(${card.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: 22,
                cursor: "pointer",
                boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
              }}
            >
              {card.title}
            </div>
          ))}
        </div>
      )}

  {activeMain && (
  <div>
    <button
      onClick={() => {
        setActiveMain(null);
        setExpandedText(null);
        setExpandedImage(null);
      }}
      style={{
        marginBottom: "20px",
        background: "rgba(15, 23, 42, 0.9)",
        color: "#f8fafc",
        border: "1px solid rgba(148,163,184,0.25)",
        borderRadius: "12px",
        padding: "10px 20px",
        cursor: "pointer",
        fontWeight: 600,
        fontSize: "14px",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow =
          "0 10px 24px rgba(0,0,0,0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      ← Back
    </button>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 18,
      }}
    >
      {activeMain.subCards.map((sub) => {
        const textOpen = expandedText === sub.id;
        const imageOpen = expandedImage === sub.id;

        return (
          <div
            key={sub.id}
            style={{
              display: "flex",
              borderRadius: 14,
              overflow: "hidden",
              background: "#0f172a",
              color: "white",
              minHeight: textOpen || imageOpen ? 220 : 120,
              transition: "all .3s ease",
              boxShadow: "0 8px 18px rgba(0,0,0,.25)",
            }}
          >
            {/* LEFT IMAGE */}
            <div
              onClick={() =>
                setExpandedImage(imageOpen ? null : sub.id)
              }
              style={{
                width: imageOpen ? "50%" : "35%",
                backgroundImage: `url(${sub.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                cursor: "pointer",
                transition: "all .3s ease",
              }}
            />

            {/* RIGHT TEXT */}
            <div
              onClick={() =>
                setExpandedText(textOpen ? null : sub.id)
              }
              style={{
                padding: 14,
                width: imageOpen ? "50%" : "65%",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: textOpen ? "unset" : 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  fontSize: 14,
                  lineHeight: 1.4,
                }}
              >
                {sub.text}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
)}
    </div>
  


  







      



    </AnimatedPage>
  );
}

function DualCarouselCards() {
  const [activeCarousel, setActiveCarousel] = useState(null);
  const [index, setIndex] = useState(0);

  const carousels = {
    one: [
      { title: "Klēros ", text: "Klēroi  are men that have chosen to dedicate their lives to religion, study and research. New Klēroi are required to gain the highest marks in the 89 (top 0.1%). From the currently existing Klēroi men are allowed to inclue their siblings to be counted with them to move into the Holy/Relic Cities. Klēroi work under the Rabat of the Relic which is the authority over them that also maintains the religous integrity of the city.", img: "/images/classes/priest.png" },
      { title: "Polítēs(Πολίτης)", text: "Polītai(Πολῖται) are thos who performed well enough in the 89 test and have been chosen to be employed to live in the semi-autonomous Polis. All acolytes can apply to be a Polítēs. Polítēs work with the Acolytes who pass through the Polis, however they enjoy luxuries such as an unmoving home and the option of having a city girl as a concubine.", img: "/images/classes/emporati.png"},
      { title: "Indentured", text: "1/17th of the global population is to be indentured. The top half of these are to be given work in the Thana as reapers of harvest and tenders of animals alongside droids and Ivangellions. Indentured wear collars, braces or both. Those that live in the Thana are also the servants of the LAID and Priestesses and carry out their bidding.", img: "/images/classes/priest.png" },
      { title: "Acolyte", text: "Acolytes are the average man who dedicates their life to the Oikos of the Oikodrome and the EPIC MSHN. During a males life he is guaranteed to become an acolyte.", img: "/images/classes/acolyte.png" },
      { title: "Exiles", text:"Exile men are those who have engaged in sexual relations with a female under the age of twenty. As punishment, they are bound to her for life. For six years, they must live together aboard a motorbike, after which they may move into a kharvee. Exiles are forbidden from rising above the rank of acolyte unless recruited to be a Polítēs with their partner. Should an exile form a sexual bond with any other woman, he is stripped of his status and condemned to slavery. If he makes it to Sexton his partner is not counted as one of his three wives. ", img: "/images/classes/exile.png" },
      { title: "Slave", text: "Slaves are those who failed the 89 (bottom1/17th) or comitted a crime (failure of the 114) and now live a life of servitude in the Archon, if they perform well they can become an Indentured and work within the Thana for LAID and the Priestesses.", img: "/images/classes/maleslave.png" }
    ],
    two: [
      { title: "Klēros", text: "Female Klēroi' are the female residents of a Holy/Relic City. They are typically the daughters, wives and nieces of a male Klēros, but can also be Klēros in their own right. ", img: "/images/classes/priestswife.png" },
      { title: "Polítēs(Πολίτης)", text: "Polītai(Πολῖται) are women who scored very well on the 89 and are employed to live and work in the semi-autonomous Polis. They work with the Acolytes who pass through the region, but enjoy luxuries such as the right to marry and bear children at their own discretion(if married).",  img: "/images/classes/femaleemporati.png"},
      { title: "Indentured", text: "1/17th of the global population is to be indentured. The top half of these are to be given work in the Thana as reapers of harvest and tenders of animals alongside droids and Ivangellions. Indentured wear collars, braces or both. Those that live in the Thana are also the servants of the LAID and Priestesses and carry out their bidding.", img: "/images/classes/priest.png" },
      { title: "Townie", text: "Townies are the typical women who scored reasonably well on the 89 exam and continue to pass the 114. They live in the towns where they raise thier children and work as fashion designers.", img: "/images/classes/townie.png" },
      { title: "City girl", text: "'City girls' are women that didn't get a high enough score to remain a townie but do not want to be an acolyte it is a secondary path available after the results of the WALTP. They can apply to live in the Emirate and be a sex worker at their own discretion. If lucky they are chosen to be the concubine of a Polítēs or a Sexton.", img: "/images/classes/citygirl.png" },
      { title: "Acolyte", text: "Acolytes are women that scored below the required score to stay in the town or progress to college and were not recruited to be a Polítēs. They live in a Kharvee along the route and may have a sexual relationship from the age of 20 with a male acolyte.  ", img: "/images/classes/femaleacolyte.png" },
      { title: "Exiles", text:"Exile women are those that had sex before the age of 20 and have been paired for life with the male they had sex with to live in a motorbike for 6 years before living in a kharvee together, they are unable to progress above acolyte unless recruited to be a Polítēs with their partner,should she have sexual relations with another man on the route she will reclassed as a slave to work for the Priestesses in the Thana. This rule also applies to female acolytes who have sex before 20. If her partner progresses to Sexton she is not counted as one of his three wives. If she reaches the rank of a Reader she is allowed to return to the Town to be a Tit Wife.", img: "/images/classes/exile.png" },
      { title: "Slave", text: "Slaves are women that have commited a crime or performed within the bottom 1/17th on the 89 test. If they are perform well by some metric they are made an Indentured and live within the Thana working for LAIDS and the Priestesses.", img: "/images/classes/femaleslave.png" }
    ], 
    three: [
      { title: "Servitude", text: "All slaves are owned by NIFTYER59HALO and are given as needed to LAID and the Priestess. The prerequisite for being a slave is the commiting of a crime, being in the bottom 1/17th of the initial 89 or violating a term of the 114. Slaves live within the Arche, but those who perform well become Indentured and live within the Thana working for a Priestess or LAID. All slaves and indentured wear permanent collars, braces or both. Collars and braces are electronic LL mechanisms used to monitor, guide, and support the wearer. Designed for comfort and produced in various sizes, they are mandatory for slaves, while acolytes are required to wear an ankle collar. Surveillance measures include vehicle cameras for acolytes and in-home audio devices for town residents. The current image is only conceptual; future designs will be less bulky, with braces that do not cover the hands or wrists. These devices are non-removable." , img: "/images/control.png"},
      { title: "Abode", text: "Priests live in houses, Deacons live in flats, Polītai live at the discretion of their proedros, Ladies live in castles, Priestesses live in temples, acolytes live in kharvees, Royalty live in palaces, Townies live in saddles.",  img: "/images/classes/femaleemporati.png"},
      { title: "Freedom of Movement", text: "Movement is restricted for those below the rank of a LAID or Priestess to the PANIC.", img: "/images/classes/fom.png" },
      { title: "Entertainment", text: "", img: "/images/classes/ent3.png" },
      { title: "Technology", text: " Technology is tiered, some forms of technology will not be available to all. The number of Pokemon will be different based on a person's social class. No Pokemon for slaves. 3 maximum for acolytes (based on 89), 6 maximum for townies, 9 maximum for deacons, 12 maximum for romans and 15 maximum for Klēroi.", img: "/images/classes/ent.png" },
      { title: "Vacation", text: "Vacations are based on time off available which is a form of imbursement. Time off can be gambled. Slaves and Acolytes have no time off. ", img: "/images/classes/vacation.png" }
    ],
    four: [
      { title: "Reproduction", text: "Reproduction is the right of the successful. Only the best performing males sperm will be used although all male sperm will be harvested. Priestesses, Ladies of the Lamp and Palatines reproduce within the NIFTY59ER family. Seamen and eggs are checked for genetic compatability etc to ensure the best offspring with a 6 generation goal to rebalance humanity." , img: "/images/spermdonate.png"},
      { title: "Segregation", text: "Society is strictly segregated into two there is no mixing physically or virtually.",  img: "/images/segregation.png"},
    ]
     



  };

  const openCarousel = (key) => {
    setActiveCarousel(key);
    setIndex(0);
  };

  const closeCarousel = () => {
    setActiveCarousel(null);
  };

  const nextSlide = () => {
    setIndex((prev) =>
      prev === carousels[activeCarousel].length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setIndex((prev) =>
      prev === 0 ? carousels[activeCarousel].length - 1 : prev - 1
    );
  };
  const arrowStyle = (side) => ({
  position: "absolute",
  top: "50%",
  [side]: "18px",
  transform: "translateY(-50%)",
  background: "rgba(15,23,42,0.85)",
  border: "1px solid rgba(148,163,184,0.25)",
  color: "#e2e8f0",
  fontSize: "24px",
  padding: "12px 18px",
  cursor: "pointer",
  borderRadius: "14px",
  backdropFilter: "blur(8px)",
  transition: "all 0.2s ease"
});

  return (
   <div
  style={{
    padding: "60px 5vw",
    background: "transparent", // inherit page gradient
    minHeight: "35vh",
    fontFamily: "Inter, sans-serif",
    color: "#e2e8f0"
  }}
>
  {/* MAIN CARDS */}
  <div
    style={{
      display: "flex",
      gap: "40px",
      justifyContent: "center",
      flexWrap: "wrap"
    }}
  >
    <div
      onClick={() => openCarousel("one")}
      style={{
        width: "280px",
        height: "190px",
        background: "rgba(15, 23, 42, 0.75)",
        backdropFilter: "blur(16px)",
        borderRadius: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontSize: "20px",
        fontWeight: 600,
        letterSpacing: "0.4px",
        border: "1px solid rgba(148,163,184,0.12)",
        boxShadow: "0 20px 45px rgba(0,0,0,0.55)",
        transition: "all 0.3s cubic-bezier(.2,.8,.2,1)"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.border =
          "1px solid rgba(148,163,184,0.25)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.border =
          "1px solid rgba(148,163,184,0.12)";
      }}
    >
      Male Classes
    </div>

    <div
      onClick={() => openCarousel("two")}
      style={{
        width: "280px",
        height: "190px",
        background: "rgba(15, 23, 42, 0.75)",
        backdropFilter: "blur(16px)",
        borderRadius: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontSize: "20px",
        fontWeight: 600,
        letterSpacing: "0.4px",
        border: "1px solid rgba(148,163,184,0.12)",
        boxShadow: "0 20px 45px rgba(0,0,0,0.55)",
        transition: "all 0.3s cubic-bezier(.2,.8,.2,1)"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.border =
          "1px solid rgba(148,163,184,0.25)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.border =
          "1px solid rgba(148,163,184,0.12)";
      }}
    >
      Female Classes
    </div>
    <div
      onClick={() => openCarousel("three")}
      style={{
        width: "280px",
        height: "190px",
        background: "rgba(15, 23, 42, 0.75)",
        backdropFilter: "blur(16px)",
        borderRadius: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontSize: "20px",
        fontWeight: 600,
        letterSpacing: "0.4px",
        border: "1px solid rgba(148,163,184,0.12)",
        boxShadow: "0 20px 45px rgba(0,0,0,0.55)",
        transition: "all 0.3s cubic-bezier(.2,.8,.2,1)"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.border =
          "1px solid rgba(148,163,184,0.25)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.border =
          "1px solid rgba(148,163,184,0.12)";
      }}
    >
      Living Standards
    </div>
     <div
      onClick={() => openCarousel("four")}
      style={{
        width: "280px",
        height: "190px",
        background: "rgba(15, 23, 42, 0.75)",
        backdropFilter: "blur(16px)",
        borderRadius: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontSize: "20px",
        fontWeight: 600,
        letterSpacing: "0.4px",
        border: "1px solid rgba(148,163,184,0.12)",
        boxShadow: "0 20px 45px rgba(0,0,0,0.55)",
        transition: "all 0.3s cubic-bezier(.2,.8,.2,1)"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.border =
          "1px solid rgba(148,163,184,0.25)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.border =
          "1px solid rgba(148,163,184,0.12)";
      }}
    >
      Customs
    </div>
  </div>

  {/* MODAL CAROUSEL */}
  {activeCarousel && carousels?.[activeCarousel]?.[index] && (
  <div
    onClick={closeCarousel}
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(2,6,23,0.9)",
      backdropFilter: "blur(18px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: "40px"
    }}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        width: "92%",
        maxWidth: "1000px",
        height: "90vh",
        background: "rgba(15,23,42,0.97)",
        borderRadius: "30px",
        overflow: "hidden",
        border: "1px solid rgba(148,163,184,0.15)",
        boxShadow: "0 50px 120px rgba(0,0,0,0.8)",
        position: "relative",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* CLOSE BUTTON */}
      <button
        onClick={closeCarousel}
        style={{
          position: "absolute",
          top: "18px",
          right: "20px",
          background: "rgba(15,23,42,0.8)",
          border: "1px solid rgba(148,163,184,0.25)",
          color: "#e2e8f0",
          fontSize: "16px",
          padding: "6px 12px",
          borderRadius: "10px",
          cursor: "pointer",
          backdropFilter: "blur(6px)"
        }}
      >
        ✕
      </button>

      {/* IMAGE */}
      <div
  style={{
    background: "#0f172a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "30px 0"
  }}
>
  <img
    src={carousels[activeCarousel][index].img}
    alt=""
    style={{
      width: "45vw",
      maxHeight: "45vh",
      objectFit: "contain"
    }}
  />
</div>

      {/* CONTENT */}
     <div
  style={{
    padding: "28px 40px 40px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    maxHeight: "35vh",
    overflowY: "auto"
  }}
>
  <h2
    style={{
      fontSize: "24px",
      fontWeight: 700,
      color: "#f8fafc",
      margin: 0
    }}
  >
    {carousels[activeCarousel][index].title}
  </h2>

  <p
    style={{
      lineHeight: "1.75",
      fontSize: "1rem",
      color: "#94a3b8",
      margin: 0,
      whiteSpace: "pre-wrap"
    }}
  >
    {carousels[activeCarousel][index].text}
  </p>
</div>
      {/* ARROWS */}
      <button
        onClick={prevSlide}
        style={arrowStyle("left")}
      >
        ‹
      </button>

      <button
        onClick={nextSlide}
        style={arrowStyle("right")}
      >
        ›
      </button>
    </div>
  </div>
)}
</div>
  );
}


function WorldRule2Page() {
  const [openStatId, setOpenStatId] = useState(null); // <-- track expanded stat
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);
  const [openCoreImage, setOpenCoreImage] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [activeTriangle, setActiveTriangle] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [expandedSlide, setExpandedSlide] = useState(null);
  const [openWheelImage, setOpenWheelImage] = useState(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [activeImage, setActiveImage] = useState(null);
  const [flipped, setFlipped] = useState({}); // track which cards are flipped
  



  const metrics = [
  { id: 1, title: "LAID", text:"LAID stands for Lady, Amira, Infanta, and Domina. These women are entrusted with overseeing a CLT’s four principal sectors: fashion, entertainment, science, and trade, respectively. Each CLT is dedicated to one of these sectors and appoints four LAID to govern and develop its focus area. With 12,976 CLTs worldwide, this structure results in a total of 311,424 LAID globally, 24 per CLT and 96 per FEST. LAID are educated within the Colleges of the RUS, located in the CLT where they aspire to serve. As members of NIFTYER59HALO, they commit to a vow that restricts their sexual relations exclusively to Alvah or Russell. They may reside in the castles of any town within their FEST and lead their designated industry with the support of Evangellions, ensuring coordination, growth, and excellence across their domain." },
{
  id: 2,
  title: "Priestesses",
  text: `Priestesses enter the College by freely choosing their devotional path—Catholicism, Taoism, Judaism, Buddhism, Hinduism, or Hellenismos. This spiritual affiliation shapes their formation and informs their service throughout their vocation.

The priesthood is organized into six distinct offices, arranged within a structured six-tier hierarchy. Advancement proceeds from Rank 1 to Rank 6, with Rank 6 representing the highest office and holding a seat on the Rack Government.

Each rank carries defined responsibilities:

- Rank 1 oversees services and the administration of justice.
- Rank 2 directs social affairs and charitable initiatives.
- Rank 3 leads movement, coordination, and institutional leadership.
- Rank 4 is devoted to language, communication, and cultural understanding.
- Rank 5 governs philanthropic work and operates across continental regions.
- Rank 6 exercises senior authority and serves on the Rack Government.

There are 331,068 priestesses worldwide, calculated as 3 priestesses per town. Each receives training within the College of her home RUS, where spiritual devotion is integrated with administrative discipline and leadership formation. While all priestesses may advance through the hierarchy, most aspire to reach the third rank, where leadership, governance, and direct institutional influence are most actively expressed.`
},
  { id: 3, title: "PPEA", text:"There are 51,904 PPEA, an acronym for Proedros, Palatine, Emir, and Archon. These individuals are members of NIFTYER59HALO and are each assigned an independent, semi-autonomous settlement located just beyond the borders of a CLT. Their governance is overseen by the Synagogue of the Sefer, which ensures that all activities remain within the boundaries of the law. Each rulership type operates within a distinct population pool: Emirs oversee city girls and male slaves. Proedros work with the Politai (polite citizens). Palatines guide acolytes. Archons are responsible for female slaves and queer individuals. This structured allocation ensures that each PPEA can manage their settlement effectively while maintaining social and legal order under the guidance of the Synagogue." },
  { id: 4, title: "The Rach Government", text:"The Rach Government serves as the supreme governing body responsible for issuing directives and making all major decisions worldwide. Its membership is composed of the following leaders: Alvah or Russell, serving as the head and Priest of Melchizidek, representing the ruling NIFTYER59HALO family. Dao-shi-ni of the Temple of the Tao. Deva Desi of the Haveli of the Hari. Yeshe Tsoyal of the Cetiya of the Upasika. Mudarib al-Tahara of the Rabat of the Relics. Sacristan of the Oikos of the Oikodrom. Ba’alat Shem of the Synagogue of the Sefer. Thyiades of the Sanctuary of the Sea. The Rach Government convenes for formal meetings once every 14 days, where they deliberate on global matters, issue guidance, and enforce the decisions of the council."},
  { id: 5, title: "Ivangellions and Ivorgellions", text: "Ivangellions and Ivorgellions are autonomous, AI-powered angelic beings crafted from Lavore Luce (LL), designed to excel in all fundamental tasks while mastering specialized disciplines. Ivangellions operate mechanically, like clockwork, whereas Ivorgellions function luminously, harnessing light. Their hierarchy is extensive: 10 Sefirot Angels — the most powerful and influential; 12 Archangels — overseeing advanced governance and strategic matters; 10 Maimonides Angels — experts in complex, specialized domains; and 72 Ha-Shem Mephorah Angels — supporting a wide array of operational and mystical functions. All evangellions and ivorgellions utilize artificial intelligence created by the supreme AI, Metatron, ensuring unmatched precision, learning capacity, and coordinated operation across their spheres of influence."},
  { id: 6, title: "Zones", text: "Zones serve as the organizational framework for determining a person's residence based on their performance across 89 assessments. The zones are B8, B9, F8, F9, A9, and A8, each governed by a specific rank of priesthood or nobility: B8 – Giving and Continent, B9 – Language and Understanding, F8 – Movement and Leadership, F9 – Social and Cause, A9 – Service and Justice, A8 (LAID) – Completion (FEST). A person's continental placement is determined by their strongest assessment result: 18 – North Europe, 42 – Middle East, 32 – South Europe, 11 – America, Africa, or Australia, 16 – South or East Asia. This system ensures individuals are allocated to regions and social structures that align with their abilities and potential. Zones are also connected to hierarchical groupings of settlements and events: A9 – 3 FESTs (SHUBs), F9 – 7 SHUBs (RAVE), F8 – 14 RAVEs (PANIC), B9 – 11 PANICs (DISCO). Continents are organized into differing numbers of DISCOs called BALLs, and 8 BALLs together form a RACH, providing both social and geographic structure while reflecting individual skill hierarchies."}
];
  const stats6 = Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    title: `${metrics[i].title}`,
    text: `${metrics[i].text}`
  }));

  const metric2 = [
  { id: 1, title: "Justice", text:"Justice: Justice is the leadership and judgement division that deals with handling judical matters, law enforcement and leading the 4vs5 of the 9. It is led by 2 evangelions."},
  { id: 2, title: "System", text:"System stands for Designing, Preparation, Implementation, Maintenance, Surveillance and Analysis. It is tasked with these objectives towards city infrastructure. It is led by 4 evangelions. "},
  { id: 3, title: "Psychic", text:"Psychology, Sports, Culture, Housing, Imbursement, Cohesion. It is tasked towards nurturing and maintaining these areas of a city. It is led by 4 evangelions." },
  { id: 4, title: "Estem", text:"Education and research, Science, Technology, Engineering and Medicine. It is tasked with the implementation of these areas. It is led by 4 evangelions." },
  { id: 5, title: "Meal", text:"Manufacturing, Environment, Agriculture and Labour. It is tasked with the implementation and management of these areas of society. It is led by 4 evangelions."}, 
]; 

  const metric3 = [
  {
    id: 1,
    title: "FEST", 
    text: "A FEST is a collective administrative unit composed of four Periféreia, each associated with a distinct culture (CLT). Because every Periféreia corresponds directly to a culture, the terms CLT and Periféreia are used interchangeably. The term FEST is an acronym for Fashion, Entertainment, Science, and Trade, representing the four primary cultural and functional domains of the region. Each Periféreia specialises in one of these domains, forming a coordinated system of governance, production, and cultural organisation. The four Periféreia are governed on behalf of NIFTYER59HALO by a council of women, each of whom holds authority over one of the four institutional Houses that correspond to the FEST sectors. The House of Fashion is led by the Ladies of the Lamp, who oversee and regulate the fashion industry within the CLT. They establish design standards, manage permitted materials, and organise the wider systems of clothing production, craftsmanship, and distribution. The House of Entertainment is directed by the Amiras of the Alpet, who supervise the entertainment sector. They collaborate with the Jewish community of the Arx, indentured workers, and women from the towns to establish and develop creative centres known as “Woods,” where artistic and cultural production takes place. The House of Science is overseen by the Infantas of the Imepgliata, who supervise the researchers of the Hidalgo. These researchers also serve as teachers and lecturers within the towns, ensuring that scientific knowledge, education, and research are integrated into the broader society. The House of Trade is administered by the Dominas of the Domus, who coordinate with the Oikos to ensure the efficient movement of goods throughout the FEST. They also negotiate the exchange of clothing and other products with neighbouring FEST regions. The women who lead these governmental departments are drawn from a range of broad ethnic backgrounds, including Jewish, Middle Eastern, European, East Asian, Native American, Pacific, and South Asian communities, reflecting the diverse composition of the governing body.",
    bg: "/images/.png",    
    image: "/images/.png",
    bulletPoints:[
      "1 FEST = 4 Periféreia CLTs",
      "1 Periféreia CLT = 17 Towns",
      "1 Town = 6 Neighbourhoods",
      "1 Neighbourhood = 6 Estates",
      "1 Estate = 5 Indentures",
      " 1 Indenture = 9 Pueblos",
      "Pueblo = 1 Pu + 1 Blo",
      "1 Pu = 4 Saddles",
      "1 Blo = 5 Saddles",
      "Indenture = 9 Saddles",
      "Estate = 45 Saddles",
      "Neighbourhood = 270 Saddles",
      "Town = 1620 Saddles",
      "1 Saddle = 17 people",
      "Pu = 4 women(+4 droids) + 5 male children + 8 female children",
      "Blo = 5 women(+5 droids) + 4 male children + 8 female children"

    ] 
  },
  {
    id: 2, 
    title: "Relic Cities", 
    text: "Relic Cities are religiously significant cities that have been preserved and integrated into the ultra-modern era. They are governed by the **Relic of the Rabat**, a specialised branch of the **RACH** responsible for safeguarding the historical and spiritual heritage of these locations while elevating the surrounding regions to the standards of ultra-modern development. Within each Relic City reside priests and religious practitioners associated with the faith for which the city holds significance. These individuals live as ordinary citizens while observing the religious laws and practices of their tradition in full. Their presence ensures the continuity of the city’s spiritual character while allowing it to function within the wider civic structure. Relic Cities are supported by surrounding administrative and production districts, including their own **Polis, Palatinate, Arche, and Emirate**, which operate in the areas around the preserved city. These surrounding districts provide the economic, administrative, and logistical infrastructure necessary to sustain the Relic City while maintaining its protected status. The protected boundary of a Relic City extends only to buildings of direct religious importance. Any other structures located within this zone are removed and replaced with ultra-modern architecture that complements the preserved heritage sites. The **Rabat** is responsible for coordinating this process, ensuring that the historical fabric of the city is carefully restored and maintained in a pristine condition while harmonising it with the surrounding modern environment. Residents of Relic Cities are known as **Kleros**. They may also become citizens of the **PPEA** in the surrounding districts if they choose to participate more directly in the broader civic system. In addition, inhabitants of Relic Cities are permitted to visit other holy cities within the **RACH**, although such travel requires prior authorisation.",
    bg: "/images/fest-governance.jpg",    
    image: "/images/fest-diagram.jpg",
    bulletPoints:[""]
  },
  { 
    id: 3, 
    title: "Routes", 
    text:"Routes are the primary transportation and mobility networks of the RACH and are administered by the **Oikos of the Oikodrome**, a specialised branch responsible for infrastructure, transit systems, and logistical coordination across the territories. These routes are primarily used by **Acolytes**, mobile residents who travel and work throughout the network. Acolytes live in **Kharvees** ultra modern freight RVs whereas Exiles like in **Gharbikes** ultra modern freight motorbikes. These advanced transport units are capable of functioning both as living spaces and as cargo carriers. Through this system, individuals are able to move continuously between regions while also transporting goods and materials across the wider economic network. The route system extends throughout the entirety of the RACH, forming a continuous walled infrastructure that connects all major settlements, including **CLTs** and **Relic Cities**. This network allows for the efficient movement of people, resources, and services between regions while maintaining a controlled and secure transportation environment. Distributed along these routes are large multifunctional hubs known as **Emporiums**. Each Emporium acts as a centre for manufacturing, logistics, trade, and social activity. They are administered by officials known as **Sextons**, who coordinate operations and ensure that the facilities function smoothly. Emporiums provide essential services to travelling Acolytes, including workspace, rest areas, resource exchange points, and specialised biological donation facilities. The physical structure of the routes is engineered from an exceptionally resilient material designed to resist scratching, erosion, and structural damage. The enclosing walls vary in composition: some sections are transparent, while others are opaque or frosted translucent, depending on environmental and design requirements. The roadways themselves are wide and integrated with an **electrified grid system** that powers autonomous and assisted vehicles travelling along them. Certain routes run at elevated levels above the landscape, while others remain close to ground level, allowing the network to adapt to different terrains and settlement patterns. Safety and compliance across the network are maintained by **wheel-type Evangelions**, autonomous monitoring units that patrol the routes. These systems oversee traffic behaviour and ensure that drivers using manual control operate vehicles safely and according to the regulations of the Oikodrome.",
    bg: "/images/fest-governance.jpg",    
    image: "/images/fest-diagram.jpg",
    bulletPoints:[
      "Initiation as an Acolyte begins at 16 for women and 18 for men and lasts a minimum of 2 years",
      "For children of Kleros the duration of membership is 1 year",
      "Acolytes are permitted to recieve visits from family members who live in CLTs or Relic Cities at Palatinates",
      "Routes are 8 lanes wide, 6 for Kharvees, 1 for Gharbikes and 2 for unmanned vehicles."

    ]
   },
  { 
    id: 4, 
    title: "The Infinite", 
    text:"Those who have lived a sufficient number of years on Earth (RACHEL) and have performed well during their lifetime are granted the opportunity to begin a new stage of life beyond the ground. Their relocation serves a greater purpose: contributing productively to the long-term colonisation of space. The first destination in this transition is the Sky Castle. Here, Townies are given the opportunity to begin life anew in a setting removed from the Earth’s surface. Separate Sky Castles exist for Townies, while priests and polites share a different one. Acolytes who enter the Sky Castle reside there for three years. After this period, they are re-inducted into the Oikos of the Oikodrome, where they take on service within the Halo. The Halo is a vast halo-shaped megastructure containing factories, transit routes, and industrial systems. Within it, individuals perform their duties to the Oikos by operating Kharvees, vehicles used to move through the structure and maintain its productive functions. During their time in the Sky Castle, residents live with considerable personal freedom and may form relationships with any woman residing there. Life within the Sky Castle and the Halo together forms what is known as the Sky Utopia. Once a person has completed this stage of life, they continue the outward progression of human settlement. They are gradually relocated further into space—first to the Moon, then Venus, Mars, Jupiter, Saturn, and eventually beyond. This progression ensures that the oldest populations live the furthest from RACHEL, while younger generations remain closer to Earth. In doing so, the expansion of humanity into space remains orderly, logical, and efficient as populations gradually extend outward. All childbirth occurs exclusively on Earth. Therefore, once an individual has left the ground and begun life in the Sky Utopia or beyond, they are no longer eligible to have children.",
    bg: "/images/fest-governance.jpg",    
    image: "/images/automation/halo1.png",
    bulletPoints:[
      "After 160 years for Townies, 240 years for priests, 180 years for polites, 190 years for acolytes transition to the next ground",
      "Men are within the town (Sky castle, moon town etc) for 3 years then 5 years alternating where they are free to have sexual intercourse with any woman.",
      "Childbirth is prohibited off Earth"
    ]
   },
]; 



  
   const metric5 = [
  { id: 1, title: "Sea Village (Pyramid)", text:"The Sea Village is goverened by the Hellenistic Sanctuary of the Sea.It forms the Diamond zone of a CLT. The total number of Sea Villages to be constructed is 12976. They will be designed to have a capacity of 29542 meaning that the total Sea Village capacity is 383336992 people. The clever part of their design is that they go as far down as they are built up. It has a pyramid shape above the water and is flipped to be the shape whether under the sea(floats) or the seabed(embedded). The Sea Village is black. "},
  { id: 2, title: "Hidalgo and Thana", text:"The Thana is the residence of LAID, Indentured workers (braces) and Priestesses, the indentured workers bring in the harvest from within the outer perimeter(square walls). It is a part of the Shade zone of a CLT. The Thanas in the capital are specialin that they also are the residences of every female celebrity(Hollywood and Bollywood: 3300) and female model(60,000). Hidalgos and the Thanas are the residences of LAID and Priestesses. LAID live in the Hidalgo and the Priestesses live in the Thana. The Capital Hidalgos are home to 141 genetically engineered 'super' women clones each for a total of 2820 women. They are super in that they have boosted intelligence and health. Those who live within the Hidalgos and Thanas are allowed to travel to any Hidalgo or Thana within their PANIC at will except from those at the capital Hidalgo who remain there coducting super research. Hidalgos and Thanas are designed/constructed using the PATH SHIFT principle. PATH= [Pokemon Gardens, Arts Center, Tibet, Holoworld], SHIFT = [Stadium, Houses, Institute, Factory Plaza, Tibet]."},
  { id: 3, title: "Wola, Eshkol, Shefa, Hromoda and Grad and Burg (LAMP)", text:"The Wola, Eshkol, Shefa, Hromoda, Grad and Burg form the Lamp zone of a CLT governed by the Cetiya of the Upasika. The Wola and the Eshkol are European, the Shefa, Hromada and the Grad are East Asian and the Burg is Native American and Native Pacific." },
  { id: 4, title: "Ham, Alber, Mish, Kent and Thorpe", text:"The Hamlet, Alber, MIsh, Kent and Thorpe form the Nightstand zone of the CLT goverened by the Haveli of the Hari.It is where browns live.  " },
  { id: 5, title: "Palatinate, Polis, Emirate and Arche ", text:"The Palatinate, Polis, Emirate and Arche are the semi autonomus regions outside of the walls of the main part of a CLT. They are governed by members of NIFTYER59HALO or those who have extreme favour with them. Each is for a different purpose and has a different population. The Polis is full of the politests people of a CLT and they help the acolytes who pass in the factory, the Arche is for slaves(criminals), the Emirate is for queers and city girls(women who gave up on being an acolyte) and the Palatinate is for the temporary acolytes who work their while on their route."},
  { id: 6, title: "Rus", text:"The Rus is the Capital Town of a CLT and the administrative center. It is home to the frontier brains and is governed by the Synagogue of the Sefer. It is a part of the Bulb zone of a CLT. The Rus is where children of Klēroi go for their education comencing at 14 for the females and 16 for the males. Their religious education lasts for 4 years during which they spend a year as an acolyte (16 to 17 females)(18 to 19 males). After which they return to their Holy City fully ordained and ready for work, marriage and in touch with life within a CLT. The Rus is Middle Eastern. "},
  { id: 7, title: "Emporium", text:"The Emporiums are trade posts along the routes governed by a Sexton."},
  { id: 8, title: "Statistics",   text: "• 8.27 billion total people\n• 1.2 billion sea village inhabitants\n• 2 billion 469 million 300 thousand acolytes\n• 827 million queer people (not going to be a separate class now they probably just join the MSHN)\n• 3 billion 773 million 700 thousand remaining people (nothings)"},
  { id: 9, title: "Glossary", text: "1. Town — A land settlement within a CLT (maximum population: 29,542) • 2. Village (Sea Village) — A water settlement within a CLT (maximum population: 29,542) • 3. CLT — A group consisting of 17 Towns, 1 Village, 1 Emirate, 1 Palatinate, 1 Arche, and 1 Polis • 4. FEST — A federation of 4 CLTs, each with a unique focus: Fashion, Entertainment, Science, and Trade • 5. SHUBs — A grouping of 3 FESTs • 6. RAVE — A grouping of 7 SHUBs • 7. PANIC — A grouping of 14 RAVEs • 8. DISCO — A grouping of 11 PANICs • 9. BALL — A collection of DISCOs (ranging from 1 to N depending on continent size) • 10. RACH — The total sum of all BALLs"},
  { id: 10, title: "Numbers", text: `• Town population (women and children): 29,542 — Women: 17,210 — Children: 12,332 \n• CLT population — Capacity: 531,756 — Women: 309,778 \n • Kharvees per CLT: 26,200`},
  { id: 11, title: "Arx", text:"The Arx is the Bastion of a CLT and the logistics center simply put it is the gate.  It is governed by the Oikos of the Oikodrome and is home to the Elite 4. It is a part of the Bulb zone of a CLT. It is where the Jewish people who are not Klēroi live."}, 

]; 



const blocks4 = metric3.map((m) => ({
  id: m.id,
  title: m.title ?? "",
  text: m.text ?? "",
  bg: m.bg ?? "#fff",
  image: m.image ?? "",
  bulletPoints: m.bulletPoints || []
}));


const panels5 = Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      title: `${metric2[i].title}`,
      text: `${metric2[i].text}`
    }));


 const triangles = [
    {
      id: 1,
      slides: [
        {
          title: "Sea Routes",
          text:"Sea Routes are the sea sisters of the routes on land used by the land acolytes. Sea Villages are constructed in complete cycles that are connected via long roads and water passageways. Sea acolytes therefore must drive the seavee an automated kharvee+boat hybrid to traverse over land and sea.",
          image:"/images/automation/searoutes.png"
        },
        {
          title: "Seavee",
          text: "This ultra-modern cargo vessel is a sophisticated, energy-efficient transport solution specifically designed to ferry diverse goods and modular containers between self-sustaining sea villages and seaporiums within a futuristic marine network.",
          image:"/images/automation/seavee.png"
        },
        {
          title: "Stunt Doubles",
          text: "Stunt Doubles are remote controlled work droids used by men who have attained the rank of a Reader, a Sexton is able to pilot 3 Stunt Doubles at a time. ",
          image: "/images/automation/droid4.png"
        }
      ]
    }, 
    {
      id: 2,
      slides: [
         {
          title: "Schedule",
          text: "Scheduling is fundamentally about knowing where you need to be and when you need to be there. To do that effectively, a person must first determine what is important and why it matters at a given time. For some men, their priorities may be strongly influenced by sexual desire and attraction. In that case, their schedule might revolve around pursuing relationships or encounters with women they are attracted to and who they believe are strongly interested in them as well.",
          image: "/images/religious/gfs.png"
        },
        {
          title: "Capital",
          text: "The Rack Capital comprises 40 CLTs, equivalent to 10 FESTs or 3 SHUBs plus 1 FEST. Candidate locations for its establishment include Australia and the region surrounding Mount Arat, with the Mount Arat site encompassing from the two lakes to its south all the way to Donetsk, Rostov-on-Don, and Volgograd. Complementing the capital, 40 Sea Villages will be constructed in the Black Sea, designed with a layout reminiscent of the shape of Australia.",
          image: "/images/religious/map.png"
        },
        {
          title: "ARAT",
          text: "This is a hypothetical AI generated image of the capital at Arat that I thought looked interesting enough to include. The person on a motorbike would be an exile and I would not have exiles so close to the capital, but it is interesting that Gemini remembers previous images I have asked it to make.",
          image: "/images/automation/arat.png"
        },
        {
          title: "Space Colonisation ",
          text: "Space colonisation will be organised in a way that uses the natural growth of the human population to expand outward in a structured and efficient manner. Advancement beyond Earth is not automatic; it is granted to individuals who have lived responsibly, contributed sufficient labour, and demonstrated acceptable competence in the required skills. In this system, off-world relocation serves both a reward and a responsibility. Those who meet the required standards of work, conduct, and capability are gradually moved beyond Earth to participate directly in the expansion of human civilisation into space. As populations increase naturally on Earth, qualified individuals are progressively transferred outward through the stages of the off-world system—beginning with the Sky Castles and the Halo, and later to further planetary settlements such as the Moon, Venus, Mars, and beyond. This method ensures that space colonisation develops steadily, logically, and sustainably, while also maintaining a culture in which every individual contributes meaningful work before being entrusted with life beyond Earth.",
          image: "/images/automation/space1.png"
        }
      ]
    },
    {
      id: 3,
      slides: [
        {
          title: "Angelic Distribution",
          text: "The ratio of angels to females for a CLAPPET is 33 angels to 1 adult female +  1 droid for each adult woman.",
          image: "/images/angelic1.jpg"
        },
        {
          title: "World Wide Vacations",
          text: "Travel historically has been a disruptor, that is why people will remain within their SHUB unless they are acolytes which permits worldwide travel along the route. The rules for travel regarding members of the RACH government is LAID can travel anywhere within their PANIC and can leave their BALL and DISCO once a year. There will be new oasis resorts for vacations built within the Sahara Desert.  ",
          image: "/images/automation/oasis.png"
        },
         {
          title: "Fashion",
          text: "Each town contains eight distinct brands, each represented by its own logo. Every brand is managed by a MAC, who serves as the creative director for that brand. Upon assuming the role, the MAC designs the brand’s official logo, which must appear on the label of every garment produced under that brand. All women in the town are affiliated with one of these eight brands. However, within their assigned brand they retain creative freedom. They may design and produce any clothing they wish, provided that the garments align with their rank. The MAC does not dictate the specific designs produced by individual women. Instead, she provides overall creative direction and identity for the brand through the logo and brand concept. Because all women receive the same number of points, each woman has, in theory, the same capacity to produce clothing. As a result, the potential number of garments owned or produced by each woman can be equal, with differences arising only from individual design choices within their rank. ",
          image: "/images/automation/fashion2.png"
        },
        {
          title: "Modes of travel",
          text: "To the honour of Leonardo Da Vinci commericial/common air travel will be banned with people using land or sea routes to travel.",
          image: "/images/automation/travel.png"
        }
      ]
    }
  ];



const navButton = {
  padding: "10px 18px",
  borderRadius: "14px",
  border: "none",
  background:
    "linear-gradient(135deg,#6C5CE7,#4834D4)",
  color: "#fff",
  fontSize: "1rem",
  cursor: "pointer",
  transition: "all 0.2s ease",
  boxShadow:
    "0 10px 25px rgba(0,0,0,0.3)"
};





    const carouselSlides = [
    {
      title: "Sea Village",
      text: metric5[0].text,
      img: "/images/tooth.png"
    },
    {
      title: "Hidalgo and Thana",
      text: metric5[1].text,
      img: "/images/city6.png"
    },
    {
      title: "Wola, Eshkol, Shefa, Hromoda and Grad",
      text: metric5[2].text,
      img: "/images/city3.png"
    },
    {
      title: "Hamlet, Alber, Mish, Kent and Thorpe",
      text: metric5[3].text,
      img: "/images/city4.jpg"
    },
    {
      title: "Palatinate, Polis, Emirate and Arche",
      text: metric5[4].text,
      img: "/images/city1.jpg"
    },
    {
      title: "Rus",
      text: metric5[5].text,
      img: "/images/city7.png"
    },
    {
      title: "Emporium",
      text: metric5[6].text,
      img: "/images/city2.png"
    },
    {
      title: "Statstics",
      text: metric5[7].text,
      img: "/images/city6.png"
    },
    {
      title: "Calculations",
      text: metric5[8].text,
      img: "/images/calculator.png"
    },
    {
      title: "Basics",
      text: metric5[9].text,
      img: "/images/boxsky.png"
    },
    {
      title: "Arx",
      text: metric5[10].text,
      img: "/images/city9.png"
    }
   
  ];

    const wheelPanels = [
    {
      id: 1,
      title: "The Ruling class and Slavery",
      images: ["/images/religious/1cltofafest.png"]
    },
    {
      id: 2,
      title: "Materiality",
      images: ["/images/towniechart.png", "/images/citygirlchart.png", "/images/tpa.png"]
    },
    {
      id: 3,
      title: "Religious Service and Movement",
      images: ["/images/ap.png"]
    },
    {
      id: 4,
      title: "Feminism",
      images: ["/images/felp.png"]
    },
    {
      id: 5,
      title: "Traditionalism",
      images: ["/images/melp.png"]
    },
    {
      id: 6,
      title: "Teaching and learning",
      images: ["/images/religious/hierarchies.png"]
    }
  ];

   const cards = [
    {
      id: 1,
      title: "Cetiya of the Upāsikāyo",
      image: "/images/religious/cetiya.png",
      text: "The Cettiya of the Upāsikāyo is the Buddhist order in charge of women who pilot Kharvees."
    },
    {
      id: 2,
      title: "Rabat of the Relics",
      image: "/images/religious/rabat2.png",
      text: "The Rabat of the Relics is the Islamic order in charge of Relic cities which are the former cities of the previous world still occupied by Klēroi."
    },
    {
      id: 3,
      title: "Oikos of the Oikodrome",
      image: "/images/religious/oikos.png",
      text: "The Oikos of the Oikodrome is the Greek order in charge of the men who pilot Kharvees."
    },
    {
      id: 4,
      title: "Synagogue of the Sefer",
      image: "/images/religious/synagogue2.png",
      text: "The Synagogue of the Sefer is the Jewish religious order in charge of research and knowledge."
    },
    {
      id: 5,
      title: "Sanctuary of the Sea",
      image: "/images/religious/sanctuary.png",
      text: "The Sanctuary of the Sea is the Catholic religious order for the towns and contains the branch of Social Services."
    }
  ];


  useEffect(() => {
  if (isPaused) return;

    const timer = setInterval(() => {
      setCarouselIndex((i) => (i + 1) % carouselSlides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused, carouselSlides.length]);



    const arrowStyle = (side) => ({
      position: "absolute",
      top: "50%",
      [side]: "-70px",
      transform: "translateY(-50%)",
      fontSize: "42px",
      background: "rgba(255,255,255,0.35)",
      backdropFilter: "blur(10px)",
      border: "none",
      borderRadius: "50%",
      width: "54px",
      height: "54px",
      cursor: "pointer",
      boxShadow: "0 8px 22px rgba(0,0,0,0.25)"
    });


const toggleTriangle = (index) => {
    if (activeTriangle === index) {
      setActiveTriangle(null);
      setActiveSlide(0);
    } else {
      setActiveTriangle(index);
      setActiveSlide(0);
    }
  };

  const slides =
    activeTriangle !== null
      ? triangles[activeTriangle].slides
      : [];

  const nextSlide = () =>
    setActiveSlide((prev) => (prev + 1) % slides.length);

  const prevSlide = () =>
    setActiveSlide(
      (prev) => (prev - 1 + slides.length) % slides.length
    );

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff =
      e.changedTouches[0].clientX - touchStartX.current;
    if (diff > 50) prevSlide();
    if (diff < -50) nextSlide();
  };

  const toggleFlip = (id) => {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
  };


  return (
    <AnimatedPage>
      <h2 style={styles.sectionTitle}>World Rule II</h2>

     {/* === Top: 6 expandable stats boxes (fullscreen-style expand) === */}
<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: "12px",
    marginBottom: "24px",
  }}
>
  {stats6.map((stat) => {
    const isOpen = openStatId === stat.id;
    return (
      <div
        key={stat.id}
        onClick={() => setOpenStatId(isOpen ? null : stat.id)}
        style={{
          ...styles.card,
          textAlign: "center",
          cursor: "pointer",
          background: isOpen ? "#e0f7fa" : "#f9f9f9",
          transition: "all 0.35s ease",
          position: "relative",
          zIndex: isOpen ? 100 : 1,
          gridColumn: isOpen ? "span 6" : "span 1", // expand to full row
          padding: isOpen ? "2rem" : "1rem",
          boxShadow: isOpen
            ? "0 12px 40px rgba(0,0,0,0.25)"
            : "0 6px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h4 style={{ marginBottom: "8px" }}>{stat.title}</h4>
        <strong style={{ fontSize: "22px" }}>{stat.value}</strong>
        {isOpen && (
          <p style={{ marginTop: "12px", fontSize: "15px", lineHeight: 1.6 }}>
            {stat.text}
          </p>
        )}
      </div>
    );
  })}
</div>


      {/* === Middle layout === */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "20px",
          marginBottom: "28px"
        }}
      >
        {/* Left: 5 stacked panels */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {panels5.map((p) => (
            <div key={p.id} style={styles.card}>
              <h4>{p.title}</h4>
              <p>{p.text}</p>
            </div>
          ))}
        </div>

        {/* Right: 4 interactive blocks */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "2rem",
        }}
      >
        {blocks4.map((b) => (
          <div key={b.id} style={{ perspective: "1000px", height: "30rem" }}>
            <div
              style={{
                position: "relative",
                width: "95%",
                height: "100%",
                textAlign: "center",
                transition: "transform 0.8s",
                transformStyle: "preserve-3d",
                transform: flipped[b.id] ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {/* Front Side */}
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backfaceVisibility: "hidden",
                  background: "#fff",
                  color: "#000",
                  display: "flex",
                  flexDirection: "column",
                  padding: "14px",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                  borderRadius: "8px",
                }}
              >
                <h3 style={{ textAlign: "center", fontSize: "1.3rem", marginBottom: "8px" }}>
                  {b.title}
                </h3>
                <div
                  style={{
                    flex: 1,
                    overflowY: "auto",
                    fontSize: "0.95rem",
                    lineHeight: "1.4",
                    paddingRight: "4px",
                  }}
                >
                  {b.text}
                </div>
                <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                  <button
                    onClick={() => setActiveImage(b.image)}
                    style={{
                      marginTop: "10px",
                      padding: "6px 14px",
                      borderRadius: "6px",
                      border: "none",
                      background: "#222",
                      color: "white",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                    }}
                  >
                    View Image
                  </button>
                  <button
                    onClick={() => toggleFlip(b.id)}
                    style={{
                      marginTop: "10px",
                      padding: "6px 14px",
                      borderRadius: "6px",
                      border: "none",
                      background: "#555",
                      color: "white",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                    }}
                  >
                    Flip
                  </button>
                </div>
              </div>

              {/* Back Side */}
              <div
                style={{
                  position: "absolute",
                  width: "90%",
                  height: "100%",
                  backfaceVisibility: "hidden",
                  background: "linear-gradient(135deg, #333, #555)",
                  color: "#fff",
                  transform: "rotateY(180deg)",
                  display: "flex",
                  flexDirection: "column",
                  padding: "16px",
                  borderRadius: "8px",
                  overflowY: "auto",
                  fontFamily: "'Courier New', monospace",
                }}
              >
                <h3 style={{ textAlign: "center", fontSize: "1.3rem", marginBottom: "12px" }}>
                  Details
                </h3>
                <ul style={{ textAlign: "left", paddingLeft: "20px", margin: 0 }}>
                  {b.bulletPoints?.map((point, i) => (
                    <li key={i} style={{ marginBottom: "6px" }}>
                      {point}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => toggleFlip(b.id)}
                  style={{
                    marginTop: "auto",
                    alignSelf: "center",
                    padding: "6px 14px",
                    borderRadius: "6px",
                    border: "none",
                    background: "#777",
                    color: "white",
                    cursor: "pointer",
                    fontSize: "0.85rem",
                  }}
                >
                  Flip Back
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Image Modal */}
      {activeImage && (
        <div
          onClick={() => setActiveImage(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <button
              onClick={() => setActiveImage(null)}
              style={{
                position: "absolute",
                top: "-10px",
                right: "-10px",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                border: "none",
                background: "#ffffff",
                color: "#000",
                fontSize: "18px",
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
              }}
            >
              ✕
            </button>

            <img
              src={activeImage}
              alt="preview"
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                borderRadius: "8px",
                boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
              }}
            />
          </div>
        </div>
      )}



      </div>

{/* === Bottom: clickable highlights with expandable carousel === */}

 <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "80px 0",
        position: "relative"
      }}
    >
      {/* Pyramid Layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "auto auto",
          justifyItems: "center",
          gap: "80px"
        }}
      >
        {triangles.map((triangle, index) => (
          <div
            key={triangle.id}
            style={{
              gridColumn:
                index === 0 ? "1 / span 2" : "auto",
              textAlign: "center"
            }}
          >
            {/* Triangle */}
            <div
              onClick={() => toggleTriangle(index)}
              style={{
                width: 0,
                height: 0,
                borderLeft: "80px solid transparent",
                borderRight: "80px solid transparent",
                borderBottom:
                  activeTriangle === index
                    ? "160px solid #6C5CE7"
                    : "140px solid #111",
                cursor: "pointer",
                transition:
                  "all 0.5s cubic-bezier(.2,.8,.2,1)",
                transform:
                  activeTriangle === index
                    ? "scale(1.2) rotate(3deg)"
                    : "scale(1)",
                filter:
                  activeTriangle === index
                    ? "drop-shadow(0 25px 35px rgba(0,0,0,0.5))"
                    : "drop-shadow(0 12px 20px rgba(0,0,0,0.3))"
              }}
            />

            {/* Glass Panel */}
            {activeTriangle === index && slides.length > 0 && (
              <div
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                style={{
                  marginTop: "50px",
                  width: "360px",
                  padding: "28px",
                  borderRadius: "24px",
                  background:
                    "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(18px)",
                  WebkitBackdropFilter: "blur(18px)",
                  border:
                    "1px solid rgba(255,255,255,0.3)",
                  boxShadow:
                    "0 30px 60px rgba(0,0,0,0.35)",
                  transition: "all 0.4s ease",
                  animation: "fadeIn 0.4s ease"
                }}
              >
                <img
                  key={activeSlide}
                  src={slides[activeSlide].image}
                  alt=""
                  style={{
                    width: "100%",
                    borderRadius: "18px",
                    marginBottom: "20px",
                    transition: "opacity 0.4s ease"
                  }}
                />

                <h2
                  style={{
                    marginBottom: "12px",
                    fontWeight: 600
                  }}
                >
                  {slides[activeSlide].title}
                </h2>

                <p
                  style={{
                    lineHeight: "1.6",
                    fontSize: "0.95rem"
                  }}
                >
                  {slides[activeSlide].text}
                </p>

                {/* Navigation */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "22px"
                  }}
                >
                  <button
                    onClick={prevSlide}
                    style={navButton}
                  >
                    ←
                  </button>

                  <button
                    onClick={() =>
                      setFullscreen(true)
                    }
                    style={{
                      ...navButton,
                      background:
                        "linear-gradient(135deg,#00B894,#019875)"
                    }}
                  >
                    ⤢
                  </button>

                  <button
                    onClick={nextSlide}
                    style={navButton}
                  >
                    →
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Fullscreen Overlay */}
      {fullscreen && slides.length > 0 && (
        <div
          onClick={() => setFullscreen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background:
              "rgba(0,0,0,0.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
            animation: "fadeIn 0.3s ease"
          }}
        >
          <div
            style={{
              maxWidth: "80%",
              textAlign: "center"
            }}
          >
            <img
              src={slides[activeSlide].image}
              alt=""
              style={{
                marginTop:"3rem",
                maxHeight:"65vh",
                maxWidth: "100%",
                borderRadius: "1rem",
                marginBottom: "1rem"
              }}
            />
            <h2 style={{ color: "#fff" }}>
              {slides[activeSlide].title}
            </h2>
            <p
              style={{
                color: "#ddd",
                maxWidth: "95vw",
                margin: "0 auto",
                fontSize:"0.5rem"
              }}
            >
              {slides[activeSlide].text}
            </p>
          </div>
        </div>
      )}
    </div>



        {/* ===================== */}
        {/* PREMIUM CAROUSEL */}
        {/* ===================== */}

<div
  style={{
    marginTop: "80px",
    display: "flex",
    justifyContent: "center"
  }}
>
  <div
    style={{
      position: "relative",
      width: "75%",
      maxWidth: "900px"
    }}
    onMouseEnter={() => setIsPaused(true)}
    onMouseLeave={() => setIsPaused(false)}
    onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
    onTouchEnd={(e) => {
      const delta = e.changedTouches[0].clientX - touchStartX.current;
      if (delta > 60)
        setCarouselIndex(
          (carouselIndex - 1 + carouselSlides.length) % carouselSlides.length
        );
      if (delta < -60)
        setCarouselIndex((carouselIndex + 1) % carouselSlides.length);
    }}
  >
    {/* Slides */}
    {carouselSlides.map((slide, i) => {
      const offset = i - carouselIndex;

      return (
        <div
          key={i}
          onClick={() => offset === 0 && setExpandedSlide(slide)}
          style={{
            position: "absolute",
            inset: 0,
            opacity: offset === 0 ? 1 : 0,
            transform: `translateX(${offset * 60}px) scale(${offset === 0 ? 1 : 0.95})`,
            transition: "all 0.6s ease",
            pointerEvents: offset === 0 ? "auto" : "none",

            backdropFilter: "blur(14px)",
            background: "rgba(255,255,255,0.18)",
            borderRadius: "22px",
            boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
            padding: "30px",

            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
            alignItems: "center",
            minHeight: "320px",
            overflow: "hidden",
            cursor: "pointer"
          }}
        >
          {/* Text */}
          <div
            style={{
              maxHeight: "160px",
              overflowY: "auto",
              paddingRight: "8px",
              wordBreak: "break-word"
            }}
          >
            <h2 style={{ fontSize: "clamp(18px, 2vw, 28px)", marginBottom: "10px" }}>
              {slide.title}
            </h2>
            <p style={{ fontSize: "clamp(12px, 1.2vw, 16px)", lineHeight: 1.4 }}>
              {slide.text}
            </p>
          </div>

          {/* Image */}
          <div style={{ width: "100%", height: "220px", borderRadius: "18px", overflow: "hidden" }}>
            <img
              src={slide.img}
              alt={slide.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      );
    })}

    {/* Arrows */}
    <button
      onClick={() =>
        setCarouselIndex(
          (carouselIndex - 1 + carouselSlides.length) % carouselSlides.length
        )
      }
      style={arrowStyle("left")}
    >
      ‹
    </button>

    <button
      onClick={() =>
        setCarouselIndex((carouselIndex + 1) % carouselSlides.length)
      }
      style={arrowStyle("right")}
    >
      ›
    </button>

    {/* Dots */}
    <div
      style={{
        position: "absolute",
        bottom: "-48px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        gap: "10px"
      }}
    >
      {carouselSlides.map((_, i) => (
        <button
          key={i}
          onClick={() => setCarouselIndex(i)}
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            border: "none",
            background: i === carouselIndex ? "#000" : "#aaa",
            cursor: "pointer"
          }}
        />
      ))}
    </div>
  </div>

  {/* Expanded Slide Modal */}
  {expandedSlide && (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.85)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
        zIndex: 9999
      }}
    >
      {/* Close Button */}
      <button
        onClick={() => setExpandedSlide(null)}
        style={{
          position: "absolute",
          top: "25px",
          right: "35px",
          fontSize: "28px",
          border: "none",
          background: "white",
          borderRadius: "50%",
          width: "44px",
          height: "44px",
          cursor: "pointer"
        }}
      >
        ×
      </button>

      {/* Expanded Image */}
      <img
        src={expandedSlide.img}
        alt={expandedSlide.title}
        style={{
          maxWidth: "80%",
          maxHeight: "60vh",
          borderRadius: "16px",
          marginBottom: "24px",
          objectFit: "contain"
        }}
      />

      {/* Scrollable Text Under Image */}
      <div
        style={{
          maxWidth: "700px",
          maxHeight: "40vh",
          color: "white",
          textAlign: "center",
          overflowY: "auto",
          paddingRight: "12px"
        }}
      >
        <h2 style={{ fontSize: "clamp(22px, 3vw, 36px)", marginBottom: "12px" }}>
          {expandedSlide.title}
        </h2>
        <p style={{ fontSize: "clamp(16px, 1.5vw, 20px)", lineHeight: 1.5 }}>
          {expandedSlide.text}
        </p>
      </div>
    </div>
  )}
</div>

      {/* ====================================== */}
      {/* STEERING WHEEL DASHBOARD — BOTTOM */}
      {/* ====================================== */}

      <div
  style={{
    marginTop: "30rem",
    paddingBottom: "70em",
    display: "flex",
    justifyContent: "center"
  }}
>
  <div
    style={{
      position: "relative",
      width: "560px",
      height: "560px",
      borderRadius: "50%",
      background:
        "radial-gradient(circle at center, #f7f7f7 0%, #ddd 52%, #aaa 100%)",
      boxShadow: "0 32px 90px rgba(0,0,0,0.35)",
      border: "20px solid #222"
    }}
  >
    {/* CENTER HUB */}
    <div
      onClick={() => setOpenCoreImage(true)}
      style={{
        position: "absolute",
        inset: "190px",
        borderRadius: "50%",
        background: "#111",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontWeight: 700,
        fontSize: "18px",
        letterSpacing: "1px",
        cursor: "pointer",
        boxShadow: "0 0 38px rgba(0,0,0,0.6)"
      }}
    >
      WORLD CORE
    </div>

    {/* SPOKES */}
    {wheelPanels.map((panel, i) => {
  const angle = (360 / wheelPanels.length) * i;

  return (
    <div
      key={panel.id}
      onClick={() => {
  setOpenWheelImage(panel);
  setCurrentImgIndex(0);
}}
      style={{
        position: "absolute",
        top: "40%",
        left: "33%",
        transform: `
          rotate(${angle}deg)
          translate(0, -215px)
          rotate(-${angle}deg)
        `,
        transformOrigin: "center",
        transition: "all 0.45s cubic-bezier(.22,.61,.36,1)",
        cursor: "pointer",
        zIndex: 2
      }}
    >
      <div
        style={{
          width: "165px",
          height: "84px",
          background: "rgba(255,255,255,0.95)",
          borderRadius: "18px",
          padding: "12px",
          boxShadow: "0 10px 28px rgba(0,0,0,0.25)",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 600
        }}
      >
        {panel.title}
      </div>
    </div>
  );
})}
  </div>
</div>

{/* CORE MODAL */}
{openCoreImage && (
  <div
    onClick={() => setOpenCoreImage(false)}
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.85)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999
    }}
  >
    <img
      src="/images/religious/nifty59erhalogoverningcouncil.png"
      alt="World Core"
      onClick={(e) => e.stopPropagation()}
      style={{
        maxWidth: "90%",
        maxHeight: "90%",
        borderRadius: "14px",
        boxShadow: "0 0 40px rgba(0,0,0,0.9)"
      }}
    />
  </div>
)}

{/* PANEL IMAGE MODAL */}
{openWheelImage && (
  <div
    onClick={() => setOpenWheelImage(null)}
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.92)",
      backdropFilter: "blur(6px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999
    }}
  >
    <div
      style={{ position: "relative", display: "flex", alignItems: "center" }}
      onClick={(e) => e.stopPropagation()}
    >

      {/* PREVIOUS BUTTON */}
      {openWheelImage.images.length > 1 && (
        <button
          onClick={() =>
            setCurrentImgIndex(
              (currentImgIndex - 1 + openWheelImage.images.length) %
                openWheelImage.images.length
            )
          }
          style={{
            position: "absolute",
            left: "-60px",
            fontSize: "30px",
            background: "white",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 10px 30px rgba(0,0,0,0.6)"
          }}
        >
          ‹
        </button>
      )}

      {/* IMAGE */}
      <img
        src={openWheelImage.images[currentImgIndex]}
        alt={openWheelImage.title}
        style={{
          width: "92vw",
          height: "92vh",
          objectFit: "contain",
          borderRadius: "20px",
          boxShadow: "0 40px 120px rgba(0,0,0,0.8)"
        }}
      />

      {/* NEXT BUTTON */}
      {openWheelImage.images.length > 1 && (
        <button
          onClick={() =>
            setCurrentImgIndex(
              (currentImgIndex + 1) % openWheelImage.images.length
            )
          }
          style={{
            position: "absolute",
            right: "-60px",
            fontSize: "30px",
            background: "white",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 10px 30px rgba(0,0,0,0.6)"
          }}
        >
          ›
        </button>
      )}

      {/* CLOSE BUTTON */}
      <button
        onClick={() => setOpenWheelImage(null)}
        style={{
          position: "absolute",
          top: "-18px",
          right: "-18px",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "none",
          background: "#ffffff",
          color: "#000",
          fontSize: "18px",
          fontWeight: "bold",
          cursor: "pointer",
          boxShadow: "0 10px 30px rgba(0,0,0,0.6)"
        }}
      >
        ✕
      </button>

    </div>
  </div>
)}
        
  




      {/* 5 Cards for social order*/}
     <div
  style={{
    width: "100%",
    padding: "60px 5vw",
    boxSizing: "border-box",
    background: "transparent", // inherit page gradient
    color: "#e2e8f0",
    fontFamily: "Inter, sans-serif",
    marginTop: "-60rem"
  }}
>
  {/* SLIDER */}
  <div
    style={{
      display: "flex",
      gap: "28px",
      overflowX: "auto",
      scrollSnapType: "x mandatory",
      paddingBottom: "30px"
    }}
  >
    {cards.map((card) => (
      <div
        key={card.id}
        onClick={() => setActiveCard(card)}
        style={{
          minWidth: "260px",
          height: "340px",
          background: "rgba(15, 23, 42, 0.75)", // darker slate
          backdropFilter: "blur(18px)",
          borderRadius: "24px",
          cursor: "pointer",
          flexShrink: 0,
          scrollSnapAlign: "start",
          border: "1px solid rgba(148,163,184,0.12)", // subtle slate border
          boxShadow: "0 20px 45px rgba(0,0,0,0.55)",
          transition: "all 0.35s cubic-bezier(.2,.8,.2,1)",
          overflow: "hidden"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-8px)";
          e.currentTarget.style.border =
            "1px solid rgba(148,163,184,0.25)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "none";
          e.currentTarget.style.border =
            "1px solid rgba(148,163,184,0.12)";
        }}
      >
        <img
          src={card.image}
          alt={card.title}
          style={{
            width: "100%",
            height: "210px",
            objectFit: "cover",
            filter: "brightness(0.9) contrast(1.05)"
          }}
        />

        <div
          style={{
            padding: "22px",
            fontSize: "17px",
            fontWeight: 600,
            letterSpacing: "0.4px",
            textAlign: "center",
            color: "#f1f5f9"
          }}
        >
          {card.title}
        </div>
      </div>
    ))}
  </div>

  {/* EXPANDED VIEW */}
  {activeCard && (
    <div
      onClick={() => setActiveCard(null)}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(2,6,23,0.88)", // matches page base
        backdropFilter: "blur(16px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
        zIndex: 1000
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "rgba(15,23,42,0.95)",
          width: "100%",
          maxWidth: "900px",
          borderRadius: "28px",
          overflow: "hidden",
          border: "1px solid rgba(148,163,184,0.15)",
          boxShadow: "0 40px 100px rgba(0,0,0,0.75)",
          transition: "all 0.3s ease"
        }}
      >
        <img
          src={activeCard.image}
          alt={activeCard.title}
          style={{
            width: "100%",
            height: "380px",
            objectFit: "scale-down",
            background: "#0f172a"
          }}
        />

        <div style={{ padding: "40px" }}>
          <h2
            style={{
              marginBottom: "18px",
              fontSize: "26px",
              fontWeight: 700,
              color: "#f8fafc"
            }}
          >
            {activeCard.title}
          </h2>

          <p
            style={{
              fontSize: "15.5px",
              lineHeight: "1.9",
              color: "#94a3b8" // slate-400 tone
            }}
          >
            {activeCard.text}
          </p>
        </div>
      </div>
    </div>
  )}
</div>



  <DualCarouselCards/>


    </AnimatedPage>
  );
}


function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/language" element={<LanguagePage />} />
        <Route path="/business" element={<BusinessPage />} />
        <Route path="/religion" element={<ReligionPage />} />
        <Route path="/worldrule1" element={<WorldRule1Page />} />
        <Route path="/worldrule2" element={<WorldRule2Page />} />
      </Routes>
    </AnimatePresence>
  );
}



export default function App() {
  return (
    <Router>
      <div style={styles.app}>
        <Navigation />
        <AnimatedRoutes />
      </div>
    </Router>
  );
}
