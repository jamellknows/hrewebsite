import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, } from "framer-motion";
import { Home, Building2, PenTool, Earth, EarthLock, Cross } from "lucide-react";
import './App.css';
import React, { useState, useEffect, useRef  } from "react";
import crownImage from './srcImages/crown.jpg'



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
    <li>⭐ Maharajadhiraja महाराजाधिराज</li>
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

            {isOpen && (
              <div style={{ marginTop: 8 }}>
                <img
                  src={s.img}
                  alt={s.title}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveModal(s);
                  }}
                  style={{
                    width: "100%",
                    height: 45,
                    objectFit: "cover",
                    borderRadius: 10,
                    cursor: "zoom-in"
                  }}
                />

                <p
                  style={{
                    fontSize: 12,
                    marginTop: 6
                  }}
                >
                  {s.text}
                </p>
              </div>
            )}
          </div>
        </div>
      );
    })}
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

function BusinessPage() {
  const [openTop, setOpenTop] = useState(null);
  const [openSecond, setOpenSecond] = useState(null);
  const [openThird, setOpenThird] = useState(null);
  const [openFourth, setOpenFourth] = useState(null);
  const [openMetric, setOpenMetric] = useState(null);
  const [taoOpen, setTaoOpen] = useState(false);
  const [openTao, setOpenTao] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  const slides = [
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



  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const metric5 = [
    {
      id: 0,
      title: "COS",
      text:
        "Chief of staff divided into 6 parts, women, communications, CEO's charity and publishing, legal and publishing, progress. The anagram is WCCCAPLAPP."
    },
    {
      id: 1,
      title: "ARCH",
      text:
        "Arch runs PISH which is how a company of this size can be efficiently run by one person. Presentations, Implementations, support and hiring."
    },
    {
      id: 2,
      title: "PST",
      text:
        "Also called Projects, PST is primary, secondary, tertiary and is run by female graduates from married working parents."
    }
  ];

  const metric6 = [
    { id: 0, title: "Mining, Agriculture, Fishing and Research", text: "Primary sector operations." },
    { id: 1, title: "Hospitality, Retail and Fashion", text: "Consumer-facing industries." },
    { id: 2, title: "Engineering, Manufacturing and Research", text: "Industrial systems." },
    { id: 3, title: "IT and Research", text: "Information and Technology Systems." },
    { id: 4, title: "Logistics", text: "Delivery and Procurement Networks" },


  ];

  const metric7 = [
    { id: 0, title: "Healthcare and Research", text: "Medical systems and labs." },
    { id: 1, title: "Real Estate", text: "Land and property assets." },
    { id: 2, title: "Construction", text: "Construction development" },
    { id: 3, title: "Telecommunications and Research", text: "Wireless Infrastructure" }


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
    { id: 0, title: "Global Investment Bank", text: "The global investment bank owns 51% of the companies of the 5." },
    { id: 1, title: "National Retail Bank", text: "The national retail bank owns 51% of the companies on the side of the 4." }
  ];

  const metric10 = [
    {
      id: 0,
      title: "Female Business Structure",
      text:
        "A->C->CLI, Arch->CEO's->Computer, Laboratory, Integrity (Labour, Internal, Affairs, Network, Procurement)."
    },
    {
      id: 1,
      title: "Male Business Structure",
      text:
        "P->M->S,P,L. Performance(7 women from the female side) -> Managers -> Security, Payments, Produce(Labour, Safety, Office, Marketing, Procurement)."
    },
    {
      id: 2,
      title: "My Daily Run",
      text:
        "GRACEN->PST, Government & GIB, Research, Arch & Agriculture, COS & Construction."
    }
  ];

  // ===== NEW METRIC =====
  const metric11 = [
    { id: 0, title: "SML", text: "STEM: Science, Technology, Engineering, Medicine. MOLE: Marketing, Office, Logistics, Entrepreneurship. LAMB: Law, Accounting, Modelling, Banking." },
    { id: 1, title: "BIGP", text: "BOSONS: Think. IONS: Image, GASSERS: Word. PAPILO: Foot" },
    { id: 2, title: "CATCH", text: "Calendar: 36 day plan. Ayin: Attractiveness groupings (BB), Tribe: STEM, MOLE, LAMB. Clan: BIGP. Hamula: BB" }
  ];

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
            gap: "12px"
          }}
        >
          {metric5.map((m, i) => (
            <div
              key={m.id}
              onClick={() => setOpenTop(openTop === i ? null : i)}
              style={{
                ...styles.card,
                cursor: "pointer",
                padding: "16px",
                background: openTop === i ? "#eef6ff" : undefined
              }}
            >
              <h4>{m.title}</h4>
              {openTop === i && <p>{m.text}</p>}
            </div>
          ))}
        </div>

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

        {/* ===== Sidebar ===== */}
        <div
          style={{
            gridArea: "sidebar",
            display: "flex",
            flexDirection: "column",
            gap: "12px"
          }}
        >
          {metric6.map((m) => (
            <div key={m.id} style={styles.card}>
              <h4>{m.title}</h4>
              <p>{m.text}</p>
            </div>
          ))}
        </div>

        {/* ===== CENTER IMAGE SLIDER ===== */}
        <div
          style={{
            gridArea: "main",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <div
            style={{
              width: "100%",
              height: "380px",
              maxWidth: "760px",
              borderRadius: "22px",
              overflow: "hidden",
              position: "relative",
              boxShadow: "0 20px 60px rgba(0,0,0,0.35)"
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
                  transition: "opacity 1s ease"
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
                gap: 8
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
                    background: slideIndex === i ? "#fff" : "rgba(255,255,255,.5)"
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ===== Right column ===== */}
        <div
          style={{
            gridArea: "right",
            display: "flex",
            flexDirection: "column",
            gap: "12px"
          }}
        >
          {metric7.map((m) => (
            <div key={m.id} style={styles.card}>
              <h4>{m.title}</h4>
              <p>{m.text}</p>
            </div>
          ))}
        </div>

        {/* ===== Third accordion row (3) ===== */}
        <div
          style={{
            gridArea: "third",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "14px"
          }}
        >
          {metric10.map((m, i) => (
            <div
              key={m.id}
              onClick={() => setOpenThird(openThird === i ? null : i)}
              style={{
                ...styles.card,
                cursor: "pointer",
                padding: "14px",
                background: openThird === i ? "#fff8ec" : undefined
              }}
            >
              <h4>{m.title}</h4>
              {openThird === i && <p>{m.text}</p>}
            </div>
          ))}
        </div>

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









    </AnimatedPage>
  );
}



function ReligionPage() {
  // State for the top accordion
  const [activeAccordion, setActiveAccordion] = useState(null);

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
    </AnimatedPage>
  );
}

function WorldRule1Page() {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [openSideBox, setOpenSideBox] = useState(null); // "left" | "right" | null
  const [openPyramid, setOpenPyramid] = useState(null);
  const [activeLocation, setActiveLocation] = useState(null);

  const hubSection = {
  id: "hub",
  name: "Town:Alber",
  icon: "🏛️",
  image: "/images/town5.png",
  text: "This is an AI generated image of what an Alber could look like."
};




  const imageCarouselItems = [
  "/images/town3.jpg",
  "/images/town1.jpg",
  "/images/town2.jpg",
  "/images/town4.png",

];

  const pyramidSections = [
    {
      id: 0,
      title: "Foundation",
      image: "./images/sv7.jpg",
      text: "The base of the system provides housing, agriculture, logistics, and population stability across all villages."
    },
    {
      id: 1,
      title: "Production",
      image: "./images/sv2.png",
      text: "Production is to flow through the sea village chain where it is delivered to the land via 2 end points. Sea Villages are self sufficient and only rely on the land for materials for production."
    },
    {
      id: 2,
      title: "Culture",
      image: "./images/sv4.png",
      text: "The culture in the Sea Villages is very religious, the focus is on language building, manners, politeness, etiquette and moral and social responsibility. The sea villages are tasked to invent two writing scripts. Land pilgrimages are permitted 6 times a year every 60 days and last for 3 days with transport and accommodation provided."
    },
    {
      id: 3,
      title: "Governance",
      image: "./images/sv1.png",
      text: "The Sea Villages are special administrative zones run by Evangelions who form JSPEM and 16 Ladies of the Wave. Ladies of the wave are the most beautiful virgin women who are tasked with fashion, research, employment and entertainment (FREE).  "
    },
    {
      id: 4,
      title: "Judgement",
      image: "./images/sv3.png",
      text: "Testing cycles evaluate citizens and redistribute the civilians every five years. Families that have a female family member as a lady of the wave enjoy special privileges in employment.  "
    },
    {
      id: 5,
      title: "Completion",
      image: "./images/sv6.jpg",
      text: "The Sea Villages are home to advanced engineering, to ensure security there are many evangelions. Those who live in the Sea Village will be transferred to live on water worlds when space colonization commences.  "
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
    title: "Love: Service",
    content: "It has remained determined a compatibility metric governed more by materiality than spirituality. With materiality fulfilled love shall be determined by a persons spiritual journey with mandatory pairings by age 24."
  },
  {
    id: 1,
    title: "Language: Zoo's and Ham",
    content: "Language is to be polite. Every settlement will contain a zoo that is integrated into the size of the settlement so that no matter where you are you are not far from wild animals. Secondly everybody is to learn Hindi as the new common tongue." // Second item
  },
  {
    id: 2,
    title: "Leadership: Evangelions(Angels)",
    content: "Evangelions can be described as droids or robots. They are designed to be as powerful as biblical angels and are also useful servants, governors, constructors and more. They are built using LL(Lavore Luce) a state of matter between a photon and a fermion. Some will be made of a very durable ceramic, some will have the face of a lion, ox, eagle or a shawl. Others will look like men."
  },
  {
    id: 3,
    title: "Cause: FEST",
    content: "FEST stands for Fashion, Environment, Science and Test. It is the sub-branch of 4 which in turn is the sub-branch of 9 and is governed by women titled Ladies of the Lamp."
  },
  {
    id: 4,
    title: "Justice: JSPEM",
    content: "JSPEM stands for Justice, System, Psychic, Estem and Meal. It is a sub branch of the main branch of the 9 governed by seraphim evangelions. They calculate and operate the core of the governing decisions for many sectors and only submit to decisions about FEST.",
    fontSize: "0.5em"
  },
  {
    id: 5,
    title: "Completion: GUM",
    content: "GUM stands for giving, understanding and movement. It is a sub branch of 3(The priesthood of Melchizedek). It is composed of priestesses who rotate between this role and those of a juror and a social worker."
  }
];

  const leftCards = [
  {
    id: 0,
    title: "Produce",
    summary: "Produce is the most important part of a civilization, I have therefore decided to completely integrate produce to be a unifier controlled from the top to ensure stability.  ",
    details:
      "Planting: 2, Animals: 2 and priests, Processing: 2, Tending: Common, Reaping: Priests, Packaging: 2",
  },
  {
    id: 1,
    title: "Manufacturing",
    summary: "Manufcaturing is a vital part of maintaining or sustaining a functional society. I have decided to divide the work by size of product.",
    details:
      "Mining: Commoners, Refining: priests, Small: 2, Medium: Common, Large: Common, Gigantic(Colossal): 2 and Priests ",
  },
  {
    id: 2,
    title: "Services",
    summary: "Modern society treats services as if it is the bread and butter. In this new paradigm services will be split into 6 areas with key sectors such as transport, infrastructure, leadership and education being either the work of senior officials or automated.",
    details:
      "Available areas are medicine, commerce, hospitality, app development, domestics and utilities.",
  },
  {
    id: 3,
    title: "Entertainment",
    summary: "Entertainment will be open source with everybody having access to a studio, theatre etc at one on the 12 towns in their locality. There is also the Queer entertainment from the THANA.",
    details:
      "The available industries with the entertainment industry are TV and Film, Music, Sports, Games, Live Entertainment and Publishing and Print",
  },
  {
    id: 4,
    title: "Construction",
    summary: "Construction is mandatory and everybody of able body will be required to take part. Each settlement and its cities have ben pre-designed and therefore all construction is government owned.",
    details:
      "There will be assistance in the form of Evangelions, everybody will have a mandated studio flat in a house, cohabitation will no longer be allowed, although people will be moved to live next to their partner with divorce prohibited. ",
  }
];



const rightGrid = [
  {
    id: 0,
    title: "A Cat",
    content: `There are 12977 Cats, a Cat is divided into 3 parts, The capital region known as a christmas is composed of ARX(1: Hearing and Light), HIDALGO(3: Social Services branch of 3), EMIRATE(2: Business), EMPORIUM(9: Ladies of the Light), RUS(3: The Priesthood of Melchizedek (Head of 3)), THANA(Jurors: A branch of 3) it uses 17% of the land. The middle part known as an arrow uses 15% of the land and is the Wola (Champions 4vs5), Eshkol (Disc 3), Shefa (Deck 4vs5), Hromoda (Card 3), Grad (Stage 4vs5) and the Burg (Level 3). The bottom section known as a tooth uses 48% of the land. It is the Hamlet, Alber, Mish, Kent, Thorpe and Sea Village. Each city has its own focus, the Hamlet is mixed, the Alber is produce, the Mish is manufacturing, the Kent construction, the Thorpe is produce and the Sea Village is manufacturing.`,
    image: "./images/christmas.jpg",
  },
  {
    id: 1,
    title: "Society",
    content: "The social order is headed by Hearing and Light which is the head of the NIFTY59ER and Bucknor Wisdom in the Samuels family, BWITS is a clan of the NIFTY59ER. The government here is in a [37,3,4] format to efficiently govern all 444 settlements like a super computer. Society is then shaped like a cross with the Priesthood of Melchizidek underneath, 2 which is the business to its left and 9 the Ladies of the Light governing body to the right. They are able to employ people from the bottom part of society who still wish to live in capitalism. The Ladies of the Lamp govern the bottom societies along with the priestesses.",
    image: "./images/cross.jpg",
  },
  {
    id: 2,
    title: "Test",
    content: "The Test is a series of tests that test a persons life metrics (8) and their goodness metrics (9). These are used to place a person within a category like: Best 9->Worst 8-> Worst 9->avg(other 9's)->avg(other 8's). The final metric determines if a person lives in KTSHAM(bottom,low score) or WEBSHG(top, high score). The test is administered every 5 years. The 8 are wisdom, the Name of God, righteousness and humility, potential and actualization of which there are 3 of and 2 of eyes insight and perception. The 9 are a combination of spiritual and physical realms, patience and faith, livlihood and sustenance, divine power and transformation of which there are 2, faithfulness and continuation of life, potential and actualization, the future and hope, and the pentateuch and the breath of life or dedication and the fulfillment of vows. ",
    image: "./images/card.jpg",
  },
  {
    id: 3,
    title: "Payment and Process",
    content: "The general process is that each part of society produces what is required of it under my leadership and gives to others in return for what they produce. There is no money required, working a certain number fo hours entitles somebody to a certain amount fo goods and there are quotas of production for each part. The mathematics of this is 675 degrees which is 13x50+25 and therefore loving and not cruel as the current economics wishes people to believe is a necessity of having. This is because money is 360 degrees or 50x13 or 63 which means it is and requires support and protection, needs the hidden righteousness of sustainer and functions that it stays within a water (race, community, class). My method adds 25 which is a grace and favour and I can probably explain this better but its the difference between 675 and 360. In the society common people will be expected to work a job in every sub group of production, manufacturing, services,entertainment and construction in order to actualize their potential. This is 6 complete cycles of trial testing and transformation and 3 redemptions and divine presences.  ",
    image: "./images/tet.jpg",
  },
];



  const [openGridImage, setOpenGridImage] = useState(null);

  const bottomThree = [
  { id: 0, title: "PMSEC", text: "PMSEC stands for produce, manufacturing, services, entertainment and construction. It is the typical category for a civilian of the world empire." },
  { id: 1, title: "Queer", text: "Anybody who falls within the category of queer will be taken to live in the THANA and be given an electronic collar made of LL. They will be given a range of tasks from innovation of products to running a business to entertainment. Civilians from WE SHG B can come to visit the EMPORIUM and browse their goods. Queers can kiss their partner, but they can not cause the ejaculation of their partner." },
  { id: 2, title: "ACOLYTES", text: "ACOLYTES are those who failed the 89 exam and therefore have been put into a lifetime of servitude for the 9, the priesthood of Melchizedek or Hearing and Light. Acolytes can be male or female and have the right to marry and have children. They live in the EMPORIUM and wear electronic braces made from LL or ceramic on their arms and legs. Acolytes work as labourers and have the option of pitching a business idea to work half time on." },
  { id: 3, title: "FDELM", text:"FDELM stands for fashion designer, evangellion, lady of the lamp and models. Each town has 16 people who are members of FDELM. This is the 4 that goes against the PMSEC 5. This is 4 fashion designers and 12 models." }
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
    { id: 0, title: "Housing & Residential", icon: "🏘️", text: "Residential areas with multi-level flats and public squares." },
    { id: 1, title: "Agriculture", icon: "🌾", text: "Farms, gardens, and food production integrated into town layout." },
    { id: 2, title: "Manufacturing & Industry", icon: "🏭", text: "Crafts, workshops, and light industrial zones." },
    { id: 3, title: "Services & Utilities", icon: "🏥", text: "Hospitals, shops, schools, and public services." },
    { id: 4, title: "Entertainment & Culture", icon: "🎭", text: "Theaters, music halls, parks, and cultural centers." },
    { id: 5, title: "Governance & Security", icon: "🏰", text: "Castles, government offices, and security posts." },
    { id: 6, title: "Governance & Security", icon: "🏰", text: "Castles, government offices, and security posts." },

  ];

  return (
    <AnimatedPage>
      <h2 style={styles.sectionTitle}>World Rule 1</h2>

     {/* Accordion at the top (inline toggle version) */}
<div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
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

        {/* Expandable content */}
        <div
          style={{
            maxHeight: isOpen ? '200px' : '0px',
            overflow: 'hidden',
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
    gap: "14px",
  }}
>
  {rightGrid.map((item) => (
  <div
    key={item.id}
    style={{
      ...styles.card,
      cursor: "pointer",
      padding: "8px",
      position: "relative",
    }}
    onClick={() =>
      setOpenGridImage(openGridImage === item.id ? null : item.id)
    }
  >
    {/* Optional Image when expanded */}
    {openGridImage === item.id && item.image && (
      <div
        style={{
          height: "15em",
          backgroundImage: `url(${item.image})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          borderRadius: "1em",
          marginBottom: "1em",
        }}
      />
    )}

    <h4>{item.title}</h4>

    {/* Expanded Content */}
    {openGridImage === item.id && (
      <div
        style={{
          marginTop: "12px",
          padding: "12px",
          backgroundColor: "#f3f4f6",
          borderRadius: "12px",
        }}
      >
        <p>{item.content}</p>
      </div>
    )}
  </div>
))}

</div>

      </div>

                  {/* IMAGE + SIDE BOXES SECTION */}
            <div
      style={{
        marginTop: "80px",
        display: "grid",
        gridTemplateColumns: "1fr 2fr 1fr",
        gap: "28px",
        alignItems: "center",
      }}
    >
      {/* LEFT BOX */}
      <div
        onClick={() =>
          setOpenSideBox(openSideBox === "left" ? null : "left")
        }
        style={{
          background: "#f9fafb",
          padding: "22px",
          borderRadius: "18px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
          border: "1px solid #e5e7eb",
          cursor: "pointer",
        }}
      >
        <h3
          style={{
            marginBottom: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Alber
          <span style={{ opacity: 0.6 }}>
            {openSideBox === "left" ? "−" : "+"}
          </span>
        </h3>

        <div
          style={{
            maxHeight: openSideBox === "left" ? "200rem" : "50px",
            overflow: "hidden",
            transition: "max-height 0.4s ease",
          }}
        >
          <p style={{ fontSize: "15px", lineHeight: 1.6 }}>
            Each letter of HAM KT S WE SHG B aka KTSHAM WEBSHG represents a town. 
            These towns are made up of 6 villages designed to hold 4560 people in saddles or 4380 people in triangles/sandwiches. 
            They are agriculture centered with the outside zones being for manufacturing. 
            Each residential area has a temple, church or mosque (TCIHJB) and each town is walled with roads that run alongside on multiple levels with buildings. 
            On the levels are the service and entertainment buildings designed like elephant heads to be multileveled and support the roads and transport to and from. 
            There are 8 castles that serve as government buildings and Ladies of the Lamp residences. 
            This is where the members of FDELM will also go to work. 
            The Towns are designed to be good for the Ladies of the Lamp as they don't have to travel for to shop and can remain safe in the castle while also being supported by the evangelions and FDELM.
          </p>
        </div>
      </div>

      {/* CENTER IMAGE CAROUSEL */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "22px",
          height: "320px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
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

        <button
          onClick={prevImageSlide}
          style={{
            ...styles.btn,
            position: "absolute",
            left: "12px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          ‹
        </button>

        <button
          onClick={nextImageSlide}
          style={{
            ...styles.btn,
            position: "absolute",
            right: "12px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          ›
        </button>
      </div>

      {/* RIGHT BOX */}
      <div
        onClick={() =>
          setOpenSideBox(openSideBox === "right" ? null : "right")
        }
        style={{
          background: "#f9fafb",
          padding: "22px",
          borderRadius: "18px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
          border: "1px solid #e5e7eb",
          cursor: "pointer",
        }}
      >
        <h3
          style={{
            marginBottom: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          More About Towns etc
          <span style={{ opacity: 0.6 }}>
            {openSideBox === "right" ? "−" : "+"}
          </span>
        </h3>

        <div
          style={{
            maxHeight: openSideBox === "right" ? "200rem" : "50px",
            overflow: "hidden",
            transition: "max-height 0.4s ease",
          }}
        >
          <p style={{ fontSize: "15px", lineHeight: 1.6 }}>
            There are 20 Ladies of the Lamp per city and 12 towns per city and the total number of Ladies of the Lamp is 93312 worldwide. 
            The Ladies of the Lamp will move about often. The total population of a city is 354504 and a Town is 29542. 
            Saddles can contain 38 people and are built in neighborhoods of 120 and sandwiches can contain 60 people and are built in neighborhoods of 73. 
            Priestesses are shared between 4 cities. Hospitals are a service and within the walls. 
            There will be local health facilities and convenience stores at each residential area serviced by people and evangelions. 
            Training will be provided for a range of work in PMSEC and everybody will have a specialism in one job in these categories. 
            People are sorted based on a test which ranks their best goodness, then their worst attribute in life, followed by their worst attribute in goodness, 
            then the average of their other goodness and then sorted between KTSHAM and WEBSHG by the average of their other life attributes. It works 
            out that the Ladies of the Lamp have a similar group of people to work with and therefore design a FEST that suits them all and improves them. 
            This is where trial testing and transformation is important. The 9 is [46,44,38,21,21,14,11,30(5)], the 8 is [32, 42, 18, 11, 11, 11, 16,16]. 
            There are 6 religious leaders for each town who the Palatines of the business communicate with to ensure that production is on target. 
          </p>
        </div>
      </div>
    </div>


      {/* Carousel at the bottom */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
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
  <h2 style={styles.sectionTitle}>Sea Village:Interactive Pyramid</h2>

  <div
    style={{
      width: "90%",
      maxWidth: "600px",
      display: "flex",
      flexDirection: "column-reverse", // bottom tier first
      gap: "12px",
    }}
  >
    {pyramidSections.map((tier, idx) => {
      const isOpen = openPyramid === tier.id;

      // Bottom tier widest, top tier narrowest
      const width = 85 + (12- 12*idx); // adjust these numbers for steeper/shallower pyramid

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
              position: "relative",
              zIndex: idx,
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
              maxHeight: isOpen ? "400px" : "0px",
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
                {/* IMAGE INSIDE TIER */}
                <div
                  style={{
                    width: "100%",
                    height: "160px",
                    backgroundImage: `url(${tier.image})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    borderRadius: "12px",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                  }}
                  alt={tier.title}
                />

                {/* TEXT INSIDE TIER */}
                <p style={{ fontSize: "15px", lineHeight: 1.6, textAlign: "center" }}>
                  {tier.text}
                </p>
              </div>
            )}
          </div>
        </div>
      );
    })}
  </div>
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
  onClick={() => setActiveLocation(hubSection)}
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
    cursor: "pointer"
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
            onClick={() => setActiveLocation(section)}
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
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translate(-50%, -50%) scale(1.08)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translate(-50%, -50%) scale(1)")}
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
      }}
    >
      <h3 style={{ fontSize: "24px", marginBottom: "12px" }}>
        {activeLocation.icon} {activeLocation.name}
      </h3>

      <img
        src={activeLocation.image}
        alt={activeLocation.name}
        style={{
          width: "100%",
          borderRadius: "12px",
          marginBottom: "16px",
        }}
      />

      <p style={{ lineHeight: 1.7, fontSize: "16px" }}>
        {activeLocation.text}
      </p>

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






      



    </AnimatedPage>
  );
}


function WorldRule2Page() {
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [openStatId, setOpenStatId] = useState(null); // <-- track expanded stat
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);
  const [openWheelId, setOpenWheelId] = useState(null);
  const [openCoreImage, setOpenCoreImage] = useState(false);





  
  


  const metrics = [
  { id: 1, title: "Ladies of the Lamp, Amiras of the Alpet, Infantas of the Impagliata and Divines of the Domus", text:"These are the women who hold positions in the 9th Arm. Once the world has been conquered the requirements to enter will be to be a virgin between the ages of 18 and 26 with an academy accepting intake for their training from age 11.  There are 389310 Ladies of the Lamp, 32832 Amiras of the Alper, 180 Infantas of the Impagliata and 6 Divines of the Dommus. " },
  { id: 2, title: "Priestess", text:"Priestess is the title for the women (virgins 16 and 20) who run certain duties within The Priesthood of Melchizedek. Namely the Social Services, the Jurors and 3. Social Services is the global social media, calling, messaging and entertainment service provider. Jurors are the maintainers of temples, readers, organizers of my audience and people's pilgrimage and advisers. 3 run GUM, giving, understanding and movement a government branch based in the Eshkol as the Disc, the Hromoda as the Card and the Burg as the Level. There are 23328 priestesses. Priestesses live in temples and nunneries and also have acolytes and evangelions to help them manage their tasks and their land. They split their time between running SS3 half of the year in cities and as a juror in temples the other half." },
  { id: 3, title: "Palatines", text:"Palatines are women (unmarried between the ages of 26 and 32) who run the business 2. There are 23976 Palatines." },
  { id: 4, title: "Mac", text:"The Mac are the women responsible for recieving the instructions and goods from the Palatines. They ensure that each city manufactures, produces and constructs as requested and handle trade between 2 and their town. There are 12 Macs per town."},
  { id: 5, title: "Religious Leaders", text:"There are 6 religious leaders for each town. 1 for each religion of (TCIHJB), they each are in charge one of the 6 boroughs of a town. There are 16 members of FDELM for each Town 4 are fashion designers and 12 are models." },
  { id: 5, title: "Priest", text:"Priests live in relic cities which are the cities of this time that have been scaled down for their number with only the most important and sacred buildings kept. Usually this would be the city center. The outside area is converted to farmland for animals and manufacturing. The number of priests are Catholic: 570595, Eastern Orthodox: 1.1 million, Anglican 76001, Lutherian: 93002, Islam: 2 million, Hinduism: 6 million, Buddhism: 1.5 million, Judaism: 50000, Sikhism: 100000, this totals to 11489598."}
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
  { id: 1, title: "Fashion", text:"Each city will have it's own fashion decided by the Ladies of the Lamp in charge of that settlement. Fashion for the priestesses will be determined by themselves following some guidelines. Ladies of the Lamp do fashion for WESHGB KTSHAM, as there is 1 Ladies of the Lamp per department for all of the towns (12, 12 towns = 1 city). Priestesses do their own fashion. Ladies of the Light can choose between Ladies of the Lamp fashion, priestess fashion or making their own clothes. The diversity is brought in by competing fashion brands from each of the Ladies of the Lamp which total to 23328 different fashion brands worldwide. The Ladies of the Lamp use the city to produce their brand after which they compete with each other worldwide. Her home city will always wear her clothes. I am also including game development as a part of fashion. "},
  { id: 2, title: "Entertainment", text:"Each city has a department of Ladies of the Lamp and evangelions tasked with the control of the entertainment of their domain.   "},
  { id: 3, title: "Science", text:"Science deals with knowledge. This is broad and includes the monitoring of civilians. It is also what technology to apply to a problem as their will be a few choices and also how to best develop and in what direction to develop the research tasks given to them. Most of it will be looking for ways to innovate on existing technology to make the most out of its potential. Surveillance and innovation." },
  { id: 4, title: "Test", text:"Test is the continual testing of the citizenry to better the population. How to administer the test, what the test is, the pass and fails marks and how to improve the citizens results continuously are all death with by test(department of Ladies of the Lamp). Each city zone has its own 8 and 9 to improve upon and there will be comparisons between the results of towns and cities. As well as tests on each citizen on the other 8 and 9 categories which will mean some citizens may be relocated if they score too badly in something they should be proficient at. I did consider a situation whereby everybody tried to fail at 42 (on purpose of course) for example and the solution would be to select the most saddening group of people to move to the 42 fail cities. " },
]; 


    const metric4 = [
    { id: 1, title: "Big Head", text:"In order to manage the government structure for each of the 23328 christmases there is a division of 37 Head Ladies of the Light wives (Agostina + 36) they are divided into 4 groups of 9 for the 4 regions of the world. Each of these wives have 12 Chest Ladies of the Light wives who in turn have 4 Leg Ladies of the Light wives. This is a total of 1777 wives with 432 for each region and Agostina's group of 48 as the senior branch. They all are assisted by evangelions. 4 groups of 432 vs their 5's and the total 1777 vs the chief 5."},
    { id: 2, title: "Acolytes", text:"Acolytes are those who did not meet the criteria of KTSHAM(ming) or WEBSHG(ing) and therefore have been conscripted to being the property of myself or any other member of NIFTY59ER. They are fitted with a electronic LL or ceramic braces and perform labour. Some live in moving studio apartments to ensure they can get from job to job in time. I am considering 1 Evangelion for every 6 acolytes as a redundancy to ensure cooperation."},
    { id: 3, title: "The Priesthood", text: "As previously explained priests live in relic cities. These are the cities of today reduced to only their core major building of worship, palace or any other grand building. As there are 23328 cities, I require that number of priest cities. Therefore there are 471 priests per priest city with 1884 wives(max), 900 servitor robots, 5 Seraphim(advanced) and 1000 sheep dogs. They are to work THAT (Teaching, Husbandry, Authorship and Technology) or TATA (Teaching, Agriculture, Technology, Authorship). After bulldozing the irrelevant parts of the relic cities, fields and manufacturing will be established in place. With 4 wives each the populations should steadily increase. Of course the rules for monks and nuns apply to all priests (Buddhism)." },
  ];
  
   const metric5 = [
  { id: 1, title: "Sea Village", text:"The total number of Sea Villages to be constructed is 3385. They will be designed to have a capacity of 354504 people. The clever part of their design is that they go as far down as they are built up. In the same shape of a pyramid. This can be done by laying a flat plate with a door and then completing the sides full of water and using aquatic robots to open the door and drill a hole which will allow the water to flow out and then completing the underground pyramid."},
  { id: 2, title: "Emporium and Thana", text:"The Emporium and the Thana are parts of the Christmas of a Cat. They are designed to have a capacity of 75244 people from the Queer social class. The Emporium is a business and town and the Thana is for agriculture."},
  { id: 3, title: "WESHGB", text:"The Wola, Eshkol, Shefa, Hromoda and Grad are the majority of the arrow. This is where those who scored the best in life for their circumstances live. They have a design capacity of 29542 but after accounting for the test they will be filled with 26436 people." },
  { id: 4, title: "HAM", text:"The Hamlet, the Alber and the Mish are the upper levels of the Tooth. They will have populations of 26436 each.  They are the staple producers and manufacturers of a Cat. It is where those who scored in the lower half of the avergae of other 8s metric reside. " },
  { id: 5, title: "KT", text:"The Kent and the Thorpe are the coastal town of the Tooth, populations of 26436 each. They focus on fishing and other aquatic activities and will generate clean water and energy using hydrogen fusion."},
  { id: 6, title: "R(Rus)", text:"The Rus is the designated Holy Town of the Christmas. It is where the priestesses of a Cat reside between travelling. I am considering using the priests like the priestesses where they spend a half or third of the year in a Rus and the rest at the Relic city."},
  { id: 7, title: "HE", text:"The Hidalgo and the Emirate are the Towns that serve as the production centers for 2. They are the homes for the Acolytes who have been designated for labour, hard work and programming in the Hidalgo or tiny work, innovation, factories and laboratories in the Emirate. "},
  { id: 8, title: "Statistics",   text: "• 8.27 billion total people\n• 1.2 billion sea village inhabitants\n• 2 billion 469 million 300 thousand acolytes\n• 827 million queer people\n• 3 billion 773 million 700 thousand remaining people (nothings)"},
  { id: 9, title: "Calculations", text:"Using the populations for the former empires of the world which are: Britain, Spain, France, Russia, China, Turkey, India, Germany, Sweden and the Netherlands. I used 84% as the number to be acolyted which equals 3.52 billion I then added 15% from the populations of the other countires. I then subtracted the number of black people in the world 1.2 billion (black people are not to be acolyted). This equalled 2.4693 billion. This is 49% of the populations of the former empires plus 15% of the other nations. I then divided by the number of CATs to get the populations for each town."}, 
  { id: 10, title: "Arx", text:"The Arx is the capital town of a Cat. It is where the official royal residence is and the home of the Ladies of the Light. It is where the 9 meet and where the 2 business is centered and where the head cathedra is."}, 

]; 

const metric6 = [
  {id: 1, title: "Governance", text: "Governance is localised while maintaining a strict heirachy. It is a matriarchal society with only women in direct leadership all of whom have taken a pledge to only give themselves to the Father or the Brother." },
  {id: 2, title: "Infrastructure", text: "The infrastructure is designed so that each town forms a part of a produce chain as a Cat. Each Cat then is a part of a chain called the Pig (Production Integrated Globe)." },
  {id: 3, title: "Culture", text: "The culture is religious. Entertainment is the work of the ladies of the lamp who oversee sports teams for each town and who select representative musicians for each town. As the culture is designed to be inclusive all people are required to create a song that they can perform every 5 months." },
  {id: 4, title: "Science", text: "Education is completed over a 12 year programme from the age of 5 to 17. Scientific research is done by HAL, POM, and 2. Major scientific projects include Pokemon creation and other novelties for everybodies enjoyment." },
  {id: 5, title: "Labour", text: "The work pattern is 4 hour and 5 hour shifts with a 3 hour break in between to enjoy the town. There are no days off apart from religious holidays. Major labour projects include, spaceships, sea villages, sky castles, orbital platforms and trident terraforming spears." },
  {id: 6, title: "Population", text: "The population is controlled everywhere. When the population increases too high a new CAT will be constructed or more will be taken to the 17%. " }

];

const blocks4 = Array.from({ length: 4 }).map((_, i) => ({
    id: i,
    title: `${metric3[i].title}`,
    text: `${metric3[i].text}`
  }));

const panels5 = Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      title: `${metric2[i].title}`,
      text: `${metric2[i].text}`
    }));


  const highlights3 = Array.from({ length: 3 }).map((_, i) => ({
    id: i,
    title: `${metric4[i].title}`,
    text: `${metric4[i].text}`
  }));


    const carouselSlides = [
    {
      title: "Sea Villiage",
      text: metric5[0].text,
      img: "/images/seavillage.jpg"
    },
    {
      title: "Emporium and Thana",
      text: metric5[1].text,
      img: "/images/city3.png"
    },
    {
      title: "Wola, Eshkol, Shefa, Hromoda and Grad",
      text: metric5[2].text,
      img: "/images/city2.png"
    },
    {
      title: "Hamlet, Alber and Mish",
      text: metric5[3].text,
      img: "/images/city3.png"
    },
    {
      title: "Kent and Thorpe",
      text: metric5[4].text,
      img: "/images/city4.jpg"
    },
    {
      title: "Rus",
      text: metric5[5].text,
      img: "/images/city5.png"
    },
    {
      title: "Hidalgo, Emirate",
      text: metric5[6].text,
      img: "/images/city7.png"
    },
    {
      title: "Statstics",
      text: metric5[7].text,
      img: "/images/city6.png"
    },
    {
      title: "Arx",
      text: metric5[9].text,
      img: "/images/city9.png"
    },
    {
      title: "Calculations",
      text: metric5[8].text,
      img: "/images/calculator.png"
    }
  ];

    const wheelPanels = [
    {
      id: 1,
      title: "Governance",
      text: metric6[0].text,
      img: "/images/city2.png"
    },
    {
      id: 2,
      title: "Infrastructure",
      text: metric6[1].text,
      img: "/images/city3.png"
    },
    {
      id: 3,
      title: "Culture",
      text: metric6[2].text,
      img: "/images/city4.jpg"
    },
    {
      id: 4,
      title: "Science",
      text: metric6[3].text,
      img: "/images/city5.png"
    },
    {
      id: 5,
      title: "Labour",
      text: metric6[4].text,
      img: "/images/city6.png"
    },
    {
      id: 6,
      title: "Population",
      text: metric6[5].text,
      img: "/images/city9.png"
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
            gap: "12px"
          }}
        >
          {blocks4.map((b) => (
            <div
              key={b.id}
              style={{
                ...styles.card,
                cursor: "pointer"
              }}
            >
              <h4>{b.title}</h4>
              <p>{b.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* === Bottom: rotating highlights (3) === */}
      <div
        style={{
          position: "relative",
          maxWidth: "700px",
          margin: "0 auto",
          textAlign: "center"
        }}
      >
        <div style={styles.card}>
          <h3>{highlights3[highlightIndex].title}</h3>
          <p>{highlights3[highlightIndex].text}</p>
        </div>

        <div
          style={{
            marginTop: "12px",
            display: "flex",
            gap: "10px",
            justifyContent: "center"
          }}
        >
          {highlights3.map((_, i) => (
            <button
              key={i}
              onClick={() => setHighlightIndex(i)}
              style={{
                ...styles.btn,
                padding: "6px 12px",
                opacity: highlightIndex === i ? 1 : 0.5
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
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
                  (carouselIndex - 1 + carouselSlides.length) %
                    carouselSlides.length
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
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity: offset === 0 ? 1 : 0,
                    transform: `translateX(${offset * 60}px) scale(${
                      offset === 0 ? 1 : 0.95
                    })`,
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
                    minHeight: "320px"
                  }}
                >
                  {/* Text */}
                  <div>
                    <h2>{slide.title}</h2>
                    <p>{slide.text}</p>
                  </div>

                  {/* Image */}
                  <div
                    style={{
                      width: "100%",
                      height: "220px",
                      borderRadius: "18px",
                      overflow: "hidden"
                    }}
                  >
                    <img
                      src={slide.img}
                      alt={slide.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                      }}
                    />
                  </div>
                </div>
              );
            })}

            {/* Arrows */}
            <button
              onClick={() =>
                setCarouselIndex(
                  (carouselIndex - 1 + carouselSlides.length) %
                    carouselSlides.length
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
        {/* ================= */}
        {/* CENTER HUB */}
        {/* ================= */}

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
          src="/images/tepig.png"
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



          {/* ================= */}
          {/* SPOKES */}
          {/* ================= */}

          {wheelPanels.map((panel, i) => {
            const angle = (360 / wheelPanels.length) * i;
            const isOpen = openWheelId === panel.id;

            return (
              <div
                key={panel.id}
                onClick={() =>
                  setOpenWheelId(isOpen ? null : panel.id)
                }
                style={{
                  position: "absolute",
                  top: "40%",
                  left: "33%",
                  transform: `
                  rotate(${angle}deg)
                  translate(0, -215px)
                  rotate(-${angle}deg)
                  scale(${isOpen ? 1.18 : 1})
`,
                  transformOrigin: "center",
                  transition: "all 0.45s cubic-bezier(.22,.61,.36,1)",
                  cursor: "pointer",
                  zIndex: isOpen ? 5 : 2
                }}
              >
                {/* PANEL NODE */}
                <div
                  style={{
                    width: "165px",
                    minHeight: "84px",
                    background: isOpen
                      ? "#ffffff"
                      : "rgba(255,255,255,0.9)",
                    borderRadius: "18px",
                    padding: "12px",
                    boxShadow: isOpen
                      ? "0 22px 46px rgba(0,0,0,0.4)"
                      : "0 6px 16px rgba(0,0,0,0.22)",
                    textAlign: "center"
                  }}
                >
                  <strong>{panel.title}</strong>

                  {isOpen && (
                    <div style={{ marginTop: "10px" }}>
                      <img
                        src={panel.img}
                        alt={panel.title}
                        style={{
                          width: "100%",
                          height: "95px",
                          objectFit: "cover",
                          borderRadius: "12px",
                          marginBottom: "8px"
                        }}
                      />

                      <p
                        style={{
                          fontSize: "12px",
                          lineHeight: 1.45
                        }}
                      >
                        {panel.text}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>


        

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
