import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, px, color } from "framer-motion";
import { Home, Building2, PenTool, LineChart, Image, Mail, CrownIcon, BriefcaseBusiness, Earth, EarthLock, Cross } from "lucide-react";
import './App.css';
import { useState, useEffect } from "react";
import profileImage from './srcImages/hre.jpg'
import crownImage from './srcImages/crown.jpg'
import christmas from './srcImages/christmas.jpg'
import cross from './srcImages/cross.jpg'

const languages = [
  "Italian", "French", "Spanish", "German", "Swedish",
  "Polish", "Arabic", "Armenian", "Hebrew", "Farsi",
  "Sorani", "Hindi", "Mandarin", "Japanese"
];
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
            <li>My full name is Alvah Ivor Jamell Ivan Bucknor Wisdom Samuels</li>
            <li>I am God and I am not(Nun/None).</li>
            <li>I am going to conquer the world very slowly and very quickly by living from 26th April 2023 to some end date at 32 again and again (10000 times in 5 cycles or maybe 50000 times in 5 cycles) in what I call an iteration of time. Obviously you all iterate with me but don't realise unless I inform you as I am now, don't think about it too much just continue living life.</li>
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
    His Highness He Adds Light Sea to He Adds God's Grace and Favour
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

  const languages = [
    {
      name: "Italian",
      img: "/images/italian.jpg",
      text: "Romance language spoken primarily in Italy: Villa Reale di Monza."
    },
    {
      name: "French",
      img: "/images/french.jpg",
      text: "Widely used in diplomacy and European culture: Versailles."
    },
    {
      name: "Spanish",
      img: "/images/spanish.jpg",
      text: "One of the most spoken languages worldwide: Alhambara."
    },
    {
      name: "German",
      img: "/images/german.jpg",
      text: "Major language of Central Europe: Hohenzollern castle."
    },
    {
      name: "Swedish",
      img: "/images/swedish.jpg",
      text: "Scandinavian language spoken in Sweden: Kalmar Castle."
    },
    {
      name: "Polish",
      img: "/images/polish.jpg",
      text: "Slavic language of Poland: Moszna Castle."
    },
    {
      name: "Arabic",
      img: "/images/arabic.jpg",
      text: "Semitic language used across the Middle East: Citadel of Saladin."
    },
    {
      name: "Armenian",
      img: "/images/armenian.jpg",
      text: "Indo-European language with its own script: Government House number 1: ."
    },
    {
      name: "Hebrew",
      img: "/images/hebrew.jpg",
      text: "Ancient and revived Semitic language: Caesarea."
    },
    {
      name: "Farsi",
      img: "/images/farsi.jpg",
      text: "Persian language spoken in Iran: Borazjan Castle."
    },
    {
      name: "Sorani",
      img: "/images/sorani.jpg",
      text: "Central Kurdish dialect: Sherwana Castle."
    },
    {
      name: "Hindi",
      img: "/images/hindi.jpg",
      text: "Major Indo-Aryan language: Ummaid Bhawan - Jodhpur."
    },
    {
      name: "Mandarin",
      img: "/images/mandarin.jpg",
      text: "Most spoken native language in the world: Forbidden City."
    },
    {
      name: "Japanese",
      img: "/images/japanese.jpg",
      text: "Language of Japan with multiple scripts: Himeji Castle."
    }
  ];

  const visible = [
    currentIndex,
    (currentIndex + 1) % languages.length,
    (currentIndex + 2) % languages.length
  ];

  return (
    <AnimatedPage>
      <h2 style={styles.sectionTitle}>Languages</h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "18px"
        }}
      >
        {/* Carousel Row */}
        <div style={{ display: "flex", gap: "24px", justifyContent: "center" }}>
          {visible.map((idx, pos) => {
            const lang = languages[idx];
            const isExpanded = expandedIndex === idx;

            return (
              <div
                key={idx}
                onClick={() =>
                  setExpandedIndex(isExpanded ? null : idx)
                }
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
                    {/* Image */}
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

                    {/* Text */}
                    <p style={{ marginTop: "10px" }}>{lang.text}</p>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div style={{ display: "flex", gap: "16px" }}>
          <button
            onClick={() => {
              setExpandedIndex(null);
              setCurrentIndex((i) => (i - 1 + languages.length) % languages.length);
            }}
            style={styles.btn}
          >
            Previous
          </button>

          <button
            onClick={() => {
              setExpandedIndex(null);
              setCurrentIndex((i) => (i + 1) % languages.length);
            }}
            style={styles.btn}
          >
            Next
          </button>
        </div>
      </div>
    </AnimatedPage>
  );
}

function BusinessPage() {
  const [openTop, setOpenTop] = useState(null);
  const [openSecond, setOpenSecond] = useState(null);
  const [openThird, setOpenThird] = useState(null);
  const [openFourth, setOpenFourth] = useState(null);

  const [slideIndex, setSlideIndex] = useState(0);

  const slides = [
    "/images/photo1.jpg",
    "/images/photo2.jpg",
    "/images/photo3.jpg",
    "/images/photo4.jpg",
    "/images/photo5.jpg",
    "/images/photo6.jpg",


    
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

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
    { id: 4, title: "Logistics and Research", text: "Delivery and Procurement Networks" },


  ];

  const metric7 = [
    { id: 0, title: "Healthcare and Research", text: "Medical systems and labs." },
    { id: 1, title: "Real Estate", text: "Land and property assets." },
    { id: 2, title: "Construction", text: "Construction development" },
    { id: 3, title: "Telecommunications", text: "Wireless Infrastructure" }


  ];

  const metric8 = [
    { id: 0, title: "Research" },
    { id: 1, title: "Office" },
    { id: 2, title: "Board" },
    { id: 3, title: "Manufacturing" },
    { id: 4, title: "Sales" },
    { id: 5, title: "Delivery" }
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
        "P->M->S,P,L. Performance -> Managers -> Security, Payments, Produce."
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

        {/* ===== Bottom 6 box grid ===== */}
        <div
          style={{
            gridArea: "grid",
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: "1em",
            marginTop: "3em"
          }}
        >
          {metric8.map((m) => (
            <div
              key={m.id}
              style={{
                ...styles.sketch,
                padding: "14px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
              }}
            >
              <strong>{m.title}</strong>
            </div>
          ))}
        </div>
      </div>
    </AnimatedPage>
  );
}


function ReligionPage() {
  // State for the top accordion
  const [activeAccordion, setActiveAccordion] = useState(null);

  // State for expanded grid items
  const [expandedGrid, setExpandedGrid] = useState(null);

  const accordionItems = [
    { number: 5, text: "5 represents the Pentateuch and the breath of life. What it can be defined as numerically is 120, 11, 16 or 120, 2, 16. 120 is the age at which Moses died, it is connected to joining and salvation, with two complete cycles of authority and teaching, learning and the aspiration to go beyond. 11 is associated with potential, actualisation and the palm and 16 is associated with the eyes, insight and perception. 2 is duality and the world made with wisdom. Therefore 5 can be thought of many ways from teaching actualisation of potential to giving an insight into authority. " },
    { number: 4, text: "4 represents materiality and the door to spiritual growth, it is numerically represented as 120,16 or 120, 11. This material world is the actualisation of authority or the the perception of authority. Materiality and the begining of spiritual growth are linked as from birth we are in the material world and that is where we must grow spiritually. This would also link it with potential and actualisation as from spiritual growth a person is able to actualise their potential.  " },
    { number: 3, text: "3 represents kindness, giving and the balance between giving and recieving and is associated with the foot and the Tetragrammaton. It is numerically represented as 120 and 26 or 46. 120 and 26 would mean it is the authority of the Tetragrammaton or the teaching of the Tetragrammaton. 46 would mean it is a combination of spiritual and physical realms. Kindness can therefore stated as being the authority of the Tetragramaton or what the Tetragramaton teaches." },
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
    content: "Christianity Christianity is a monotheistic faith based on the life and teachings of Jesus Christ as the Savior of humanity. It emphasizes the grace of God and the importance of faith, hope, and love in achieving spiritual redemption. Through the study of the Bible, followers seek to live a life modeled after Christ’s compassion and service to others."
  },
  {
    id: 2,
    title: "Islam",
    img: "./images/islam.jpg",
    content: "Islam Islam is a monotheistic religion centered on the belief in one God, Allah, and the teachings of the Prophet Muhammad. It is guided by the Five Pillars, which provide a framework for worship, charity, and a life of intentional devotion. The faith emphasizes the pursuit of justice, peace, and total submission to the divine will as revealed in the Quran."
  },
  {
    id: 3,
    title: "Hinduism",
    img: "/images/hinduism.jpg",
    content: "Hinduism Hinduism is a diverse spiritual tradition that emphasizes the concepts of Dharma (duty), Karma (action), and Samsara (the cycle of rebirth). It offers various paths to spiritual liberation, or Moksha, through devotion, meditation, and ethical living. Practitioners recognize the divine in many forms while acknowledging a single, ultimate reality known as Brahman."
  },
  {
    id: 4,
    title: "Judaism",
    img: "/images/judaism.jpg",
    content: "Judaism Judaism is one of the world’s oldest monotheistic religions, rooted in a foundational covenant between God and the Jewish people. It prioritizes the study of the Torah and the observance of commandments to lead a life of holiness and ethical responsibility. The faith places a strong emphasis on community, historical memory, and the pursuit of Tikkun Olam, or repairing the world."
  },
  {
    id: 5,
    title: "Buddhism",
    img: "/images/buddhism.jpg",
    content: "Buddhism Buddhism is a spiritual path focused on ending suffering by attaining enlightenment and understanding the true nature of reality. It follows the Four Noble Truths and the Eightfold Path, which advocate for mindfulness, ethical conduct, and mental discipline. By practicing meditation and compassion, followers strive to reach a state of Nirvana, free from the cycle of craving and attachment."
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

  const accordionItems = [
  {
    id: 0,
    title: "Love: Service",
    content: "It has remained determined a compatiability metric governed more by materiality than spiritulity. With materiality fulfilled love shall be determined by a persons spiritual journey with mandatroy pairings by age 24."
  },
  {
    id: 1,
    title: "Language: Zoo's and Ham",
    content: "Language is to be polite. Every settlement will contain a zoo that is integrated into the size of the settlement so that no matter where you are you are not far from wild animals. Secondly everybody is to learn Hindi as the new common tongue." // Second item
  },
  {
    id: 2,
    title: "Leadership: Evangellions(Angels)",
    content: "Evangellions can be described as droids or robots. They are designed to be as powerful as biblical angels and are also useful servants, governors, constructors and more. They are built using LL(Lavore Luce) a state of matter between a photon and a fermion. Some will be made of a very durable ceramic, some will have the face of a lion, ox, eagle or a shawl. Others will look like men."
  },
  {
    id: 3,
    title: "Cause: FEST",
    content: "FEST stands for Fashion, Environment, Science and Trade. It is the sub-branch of 4 which in turn is the sub-branch of 9 and is governed by princesses."
  },
  {
    id: 4,
    title: "Justice: JSPEM",
    content: "JSPEM stands for Justice, System, Psychic, Estem and Meal. It is a sub branch of the main branch of the 9 governed by seraphim evangellions. They calculate and operate the core of the governing decisions for many sectors and only submit to decions about FEST.",
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
    summary: "Produce is the most important part of a civillization, I have therefore decided to completely integrate produce to be a unifyer controlled from the top to ensure stability.  ",
    details:
      "Planting: 2, Animals: 2 and priests, Processing: 2, Tending: Common, Reaping: Saints, Packaging: Saints",
  },
  {
    id: 1,
    title: "Manufacturing",
    summary: "Manufcaturing is a vital part of mainting or sustaining a functional society. I have decided to divide the work by size of product.",
    details:
      "Mining: Commoners, Refining: 2 and priests, Small: 2 and priests, Medium: Common, Large: Saints, Gigantic(Collosal): 2 and Priests ",
  },
  {
    id: 2,
    title: "Services",
    summary: "Modern society treates services as if it is the bread and butter. In this new paradigm services will be split into 6 areas with key sectors such as transport, infrastructure, leadership and education being either the work of sneior officials or automated.",
    details:
      "Available areas are medicine, commerce, hospitality, app development, domestics and utilities.",
  },
  {
    id: 3,
    title: "Entertainment",
    summary: "Entertainment is the industry some people work if they seek to be worshipped, others worked in finance but that was outlawed apart from in the 15% where it is controlled to not affect the bigger picture of development. In the new age entertainment will be improved with an open policy where everybody makes music.",
    details:
      "The available industries with the entertainment industry are TV and Film, Music, Sports, Games, Live Entertainment and Publishing and Print",
  },
  {
    id: 4,
    title: "Construction",
    summary: "Construction is mandatory and everybody of able body will be required to take part. Each settlement and its cities have ben predesigned and therefore all construction is government owned.",
    details:
      "There will be assistance in the form of Evangellions, everybody will have a mandated studio flat in a house, cohabitiation will no longer be allowed, although people will be moved to live next to their partner with divorce prohibited. ",
  }
];



const rightGrid = [
  {
    id: 0,
    title: "Settlements",
    content: `Settlements are divided into 3 parts, The capital region is composed of ARX(1: Hearing and Light), HIDALGO(3: Social Services branch of 3), EMIRATE(2: Business), EMPORIUM(9: Queens), RUS(3: The Priesthood of Melchizedek (Head of 3)), THANA(Jurors: A branch of 3) it uses 17% of the land. The middle part uses 15% of the land and is the Wola (Champions 4vs5), Eshkol (Disc 3), Shefa (Deck 4vs5), Hromoda (Card 3), Grad (Stage 4vs5) and the Burg (Level 3). The bottom section uses 48% of the land. It is the Hamlet, Alber, Mish, Kent, Thorpe and Sea Village. Each city has its own focus, the Hamlet is mixed, the Alber is produce, the Mish is manufacturing, the Kent construction, the Thorpe is produce and the Sea Village is manufacturing.`,
    image: "./images/christmas.jpg",
  },
  {
    id: 1,
    title: "Society",
    content: "The social order is headed by Hearing and Light which is the head of the NIFTY59ER and Bucknor Wisdom in the Samuels family, BWITS is a clan of the NIFTY59ER. The government here is in a [37,3,4] format to efficieintly govern all 444 settlements like a super computer. Society is then shaed like a cross with the Priesthood of Melchizidek underneath, 2 which is the business to its left and 9 the Queens governing body to the right. Underneath 2 are Saints who live in the 15% and run businesses that are flexible franchises of 2 and form the only capitalst societies between themsleves directed by a bank owned by 2. They are able to employ people from the bottom part of society who still wish to live in capitalism. The princessess govern the bottom societies along with the priestessess.",
    image: "./images/cross.jpg",
  },
  {
    id: 2,
    title: "Test",
    content: "Where people in society will be placed is to be decided upon by a test that will split into 72 catagroies by a superceding group of 8 and a sub group of 9 for each 8. The 8 are where a person has failed in life and the 9 are where they have failed in good. The 8 are wisdom, the Name of God, righteousness and humility, potential and actualisation of which there are 3 of and 2 of eyes insight and perception. The 9 are a combination of spiritual and physical realms, patience and faith, livlihoodand sustenance, divine power and transformation of which there are 2, faithfullness and continuation of life, potential and actualisation, the future and hope, and the penteteuch and the breath of life or dedication and the fulfillment of vows. ",
    image: "./images/card.jpg",
  },
  {
    id: 3,
    title: "Payment and Process",
    content: "The general process is that each part of scoiety produces what is required of it under my leadership and gives to others in return for what they produce. There is no money required, working a certain number fo hours entitles somebody to a ceertain amount fo goods and there are quotas of production for each part. The mathematics of this is 675 degrees which is 13x50+25 and therefore loving and not cruel as the current economics wishes people to believe is a necessity of having. This is because money is 360 degrees or 50x13 or 63 which means it is and requires support and protection, needs the hidden righteousness of sustainers and functions that it stays within a water (race, community, class). My method adds 25 which is a grace and favour and I can probably explain this better but its the difference between 675 and 360. In the society common people will be expected to work a job in every sub group of production, manufacturing, services,entertainment and construction in order to actualise their potential. This is 6 complete cycles of trial testing and transformation and 3 redemptions and divine presences.  ",
    image: "./images/tet.jpg",
  },
];

  const [openGridImage, setOpenGridImage] = useState(null);

  const carouselItems = Array.from({ length: 3 }).map((_, i) => ({
    id: i,
    title: `Carousel ${i + 1}`,
    content: `Content for carousel ${i + 1}`
  }));
  const [activeImage, setActiveImage] = useState(null);
  const [openLeftCard, setOpenLeftCard] = useState(null);


  const nextCarousel = () => {
    setCarouselIndex((prev) => (prev + 1) % carouselItems.length);
  };

  const prevCarousel = () => {
    setCarouselIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  return (
    <AnimatedPage>
      <h2 style={styles.sectionTitle}>World Rule 1</h2>

      {/* Accordion at the top */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {accordionItems.map((item) => (
  <div
    key={item.id}
    onClick={() =>
      setActiveAccordion(activeAccordion === item.id ? null : item.id)
    }
    style={{
      ...styles.card,
      flex: 1,
      cursor: 'pointer',
      padding: '0.5em',
      borderRadius: '16px',
      boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
      backgroundColor: activeAccordion === item.id ? '#f3f4f6' : '#fff',
      transition: 'all 0.3s ease',
      marginBottom: '16px',
      border: '1px solid #e5e7eb',
    }}
  >
    <h4
      style={{
        margin: 0,
        fontSize: '18px',
        fontWeight: 600,
        color: '#111827',
      }}
    >
      {item.title}
    </h4>

    <div
      style={{
        maxHeight: activeAccordion === item.id ? '500px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.4s ease, padding 0.3s ease',
        paddingTop: activeAccordion === item.id ? '12px' : '0px',
        color: '#374151',
        fontSize: '16px',
        lineHeight: 1.5,
      }}
    >
      <p style={{ margin: 0 }}>{item.content}</p>
    </div>
  </div>
))}
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

      {/* Carousel at the bottom */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '16px', overflow: 'hidden', justifyContent: 'center', width: '100%', maxWidth: '600px' }}>
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
    </AnimatedPage>
  );
}


function WorldRule2Page() {
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [openStatId, setOpenStatId] = useState(null); // <-- track expanded stat
  const metrics = [
  { id: 1, title: "Princess", text:"Princess is the title of the women (virgins 21 and 26) who run the government of KTSHAM on the side of the 4 (FEST) (materiality and the door to spiritual growth). They live in the Wola as Champions in charge of the Hamlet, Alber and Mish, the Shefa as Deck in charge of the Kent and Thorpe and the GRAD(TH) as Stage in charge of the Sea Village. There are 31968 princesses. They have acolytes who help with the managing of the farm and evangellions. Each acolyte is fitted with a collar and braces. There are evangellions who help them to run the government on their side (4,FEST) and on the side of 5 (JSPEM). Princesses have a lot of land and live in a castle " },
  { id: 2, title: "Priestess", text:"Priestess is the title for the women (virgins 16 and 20) who run certain duties within The Priesthood of Melchizedek. Namely the Social Services, the Jurors and 3. Social Services is the global social media, calling, messaging and entertainment service provider. Jurors are the maintainers of temples, readers, organizers of my audience and people's pilgrimage and advisers. 3 run GUM, giving, understanding and movement a government branch based in the Eshkol as the Disc, the Hromoda as the Card and the Burg as the Level. There are 21168 priestesses. Priestesses live in temples and nunneries and also have acolytes and evangellions to help them manage their tasks and their land." },
  { id: 3, title: "Senator", text:"Senators are women (unmarried between the ages of 26 and 32) who run the business 2. There are 23976 senators. " },
  { id: 4, title: "Queen", text:"Queens are the heads of state of a christmas, arrow, or a tooth. They are who the princesses are guided by and they meet with their respective Queens in the department of 4 who in turn meet with the Evangellions in the department of 9. There are 1776 Queens. Queens princesses, priestesses, priests and saints enjoy the luxury of being able to drive ." },
  { id: 5, title: "Saint", text:"Saints are the leaders of families also called, tents, pegs or guilds that operate enclave cities within the 15% where capitalism is permitted. There are 13320 Saints. Saints can choose who they share their priviledges with however they are responsible for the actions of who they share it with. " },
  { id: 6, title: "Priest", text:"Priests live in relic cities which are the cities of this time that have been scaled down fortheir number with only the most important and sacred buildings kept. Usually this would be the city center. The outside area is converted to farmland for animals and manufacturing. The number of priests are Catholic: 570595, Eastern Orthodox: 1.1 million, Anglican 76001, Lutherian: 93002, Islam: 2 million, Hinduism: 6 million, Buddhism: 1.5 million, Judaism: 50000, Sikhism: 100000, this totals to 11489598. It is estimated tere are between 300 to 500 cities worldwide with historically sacred temples which avergaes as 22979 people per city which should give an idea of how mch each city will be scaled back. Priests get evangellions and acolytes." },
];
  const stats6 = Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    title: `${metrics[i].title}`,
    text: `${metrics[i].text}`
  }));

  const metric2 = [
  { id: 1, title: "Justice", text:"Justice: Justice is the leadership and judgement division that deals with handling judical matters, law enforcement and leading the 4vs5 of the 9. It is led by 2 evangellions."},
  { id: 2, title: "System", text:"System stands for Designing, Preparation, Implementation, Maintenance, Surveillance and Analysis. It is tasked with these objectives towards city infrastructure. It is led by 4 evangellions. "},
  { id: 3, title: "Psychic", text:"Psychology, Sports, Culture, Housing, Imbursement, Cohesion. It is tasked towards nurturing and maintaining these areas of a city. It is led by 4 evangellions." },
  { id: 4, title: "Estem", text:"Education and research, Science, Technology, Engineering and Medicine. It is tasked with the implementation of these areas. It is led by 4 evangellions." },
  { id: 5, title: "Meal", text:"Manufacturing, Environment, Agriculture and Labour. It is taked with the implentation and management of these areas of society. It is led by 4 evangellions."}, 
]; 

  const panels5 = Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    title: `${metric2[i].title}`,
    text: `${metric2[i].text}`
  }));

  const metric3 = [
  { id: 1, title: "Fashion", text:"Each city will have it's own fashion decided by the princesses in charge of that settlement. Fashion for the priestesses will be determined by themselves following some guidelines. But generally it is princesses to fashion for KTSHAM, priestesses do their own fashion. Saints don't do fashion, they are given their clothes as part of the bargain. Queens can choose between princess fashion, priestess fashion or making their own clothes. The diversity is brought in by competeing fashion brands from each of the 3 zones of a christmas and from other christmases which total to 1332 different fashion brands worldwide. This of course can be applied to virtually all parts of commerce. I am also including game development as a part of fashion. They have the help of acolytes who also "},
  { id: 2, title: "Environment", text:"Each city has a department of princesses and evangellions tasked with maintaining the environment of the area. Environment is also man made so the style of buildings to an extent although there are parameters they must meet the evangellions will help them to scale it to their ideas. It is a good chance to learn what makes good design."},
  { id: 3, title: "Science", text:"Science deals with knowledge. This is broad and includes the monitoring of civillians. It is also what technology to apply to a problem as their will be a few choices and also how to best develop and in what direction to develop the research tasks given to them. Most of it will be looking for ways to innovate on existing technology to make the most out of its potential. Surveillance and innovation." },
  { id: 4, title: "Test", text:"Test used to be trade, but test made more sense which is the continual testing of the citizenry to better the population. How to adminster the test, what the test is, the pass and fails marks and how to improve the citizens results contiously are all dealth with by test. Each city zone has its own 8 and 9 to improve upon and there will be comparissons betwene the results of HAM , KT and S. As well as tests on each citizen on the other 8 and 9 catagories which will mean some citizens may be relocated if they score too badly in something they should be proficient at. I did consider a situation whereby everybody tried to fail at 42 for example and the solution would be to select the most saddening group of people to move to the 42. " },
]; 


  const blocks4 = Array.from({ length: 4 }).map((_, i) => ({
    id: i,
    title: `${metric3[i].title}`,
    text: `${metric3[i].text}`
  }));

   const metric4 = [
  { id: 1, title: "Big Head", text:"In order to manage the government structure for each of the 444 christmases there is a division of 37 major branches that I personally see to and plot a course each have 3 branches based on region and a further 4 sub regions. This works using spiritual insight and divine wisdom and then runs down as typical with kindness and materiality. So I provide the wisdom then the sub team provides the kindness and their juniors provide the materiality."},
  { id: 2, title: "Acolytes", text:"Acolytes are those who did not meet the criteria of KTSHAM(ming) and therefore have been conscripted to being of priests, priestesses, princesses, Queens myself or any other member of NIFTY59ER. They are fitted with a collar and braces and perform labour. They live in moving studio apartmeents to ensure they can get from job to job in time. There is always 1 evangellion for every 6 acolytes as a redundancy to ensure cooperation."},
  { id: 3, title: "Various", text: "" },
]; 

  const highlights3 = Array.from({ length: 3 }).map((_, i) => ({
    id: i,
    title: `${metric4[i].title}`,
    text: `${metric4[i].text}`
  }));

  useEffect(() => {
    const timer = setInterval(() => {
      setHighlightIndex((i) => (i + 1) % 3);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatedPage>
      <h2 style={styles.sectionTitle}>World Rule II</h2>

      {/* === Top: 6 expandable stats boxes === */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: "12px",
          marginBottom: "24px"
        }}
      >
        {stats6.map((stat) => (
          <div
            key={stat.id}
            style={{
              ...styles.card,
              textAlign: "center",
              cursor: "pointer",
              background: openStatId === stat.id ? "#e0f7fa" : "#f9f9f9",
              transition: "background 0.2s"
            }}
            onClick={() =>
              setOpenStatId(openStatId === stat.id ? null : stat.id)
            }
          >
            <h4>{stat.title}</h4>
            {openStatId === stat.id ? (
              <>
                <strong style={{ fontSize: "22px" }}>{stat.value}</strong>
                <p style={{ marginTop: "8px" }}>{stat.text}</p>
              </>
            ) : (
              <strong style={{ fontSize: "22px" }}>{stat.value}</strong>
            )}
          </div>
        ))}
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
