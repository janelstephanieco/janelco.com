import { useState, useEffect } from "react";

const PROJECTS = [
  { id: "fraserhealth", category: "Fraserhealth", title: "Increasing long-term engagement for Physicians", role: "Role · UX Research, Visual, Interaction", image: "/images/fraserhealth.png", href: "https://janelco.framer.website/pulsepoint" },
  { id: "foodstash", category: "Food Stash Foundation", title: "Driving community action through clearer design", role: "Role · Visual, Brand", image: "/images/foodstash.png", href: "#" },
  { id: "vancouver", category: "City of Vancouver", title: "Improving access to cooling resources during extreme heat events", role: "Role · UX Research, Interaction", image: "/images/vancouver.png", href: "#" },
  { id: "translink", category: "TransLink", title: "Improving accessibility in voice-first transit trip planning", role: "Role · UX Research, Visual, Interaction", image: "/images/translink.png", href: "https://janelco.framer.website/translink-kiosk" },
];

const CREATIVE = [
  { id: "skygarden", category: "Animation", title: "The Secret of the Sky Garden", role: "Role · Animator, 3D Model, Video Editor", image: "https://framerusercontent.com/images/THCjcWtqGfIheU65QhGOAapP5a4.jpg?width=900", href: "https://www.youtube.com/watch?v=ddLLOiwsk9s" },
  { id: "shower", category: "Motion Typography", title: "Shower by Becky G", role: "Role · Animator", image: "https://framerusercontent.com/images/excYXZzjXafkpblig6uslWbDGlw.png?width=900", href: "https://www.youtube.com/watch?v=Kg5TTZ5YaNk" },
];

const SPRING = "cubic-bezier(0.22,1,0.36,1)";

// Each token: string = plain word/space, object = highlighted word
const TOKENS = [
  "Hey", " ", "there,", " ", "I\u2019m", " ", "Janel", " ", "\uD83D\uDC4B\uD83C\uDFFB", " ",
  "a", " ", "Product", " ", "Designer", " ", "driven", " ", "by", " ",
  { word: "curiosity", hl: "cur" }, " ", "and", " ",
  { word: "creative solutions,", hl: "cre" },
  " ", "based", " ", "in", " ", "Vancouver.",
];

const STAGGER = 130;  // ms between each word
const START   = 200;  // ms before first word

function HeroText() {
  const [revealedWords, setRevealedWords] = useState(0);
  const [showCur, setShowCur] = useState(false);
  const [showCre, setShowCre] = useState(false);

  useEffect(() => {
    const timers = [];
    let wordIdx = 0;
    TOKENS.forEach((tok) => {
      const text = typeof tok === "object" ? tok.word : tok;
      if (text === " ") return;
      const delay = START + wordIdx * STAGGER;
      const idx = wordIdx;
      timers.push(setTimeout(() => setRevealedWords(c => c + 1), delay));
      wordIdx++;
    });

    // Count word positions for curiosity and creative solutions
    let wc = 0;
    let curPos = -1, crePos = -1;
    TOKENS.forEach((tok) => {
      const text = typeof tok === "object" ? tok.word : tok;
      if (text === " ") return;
      if (typeof tok === "object" && tok.hl === "cur" && curPos === -1) curPos = wc;
      if (typeof tok === "object" && tok.hl === "cre" && crePos === -1) crePos = wc;
      wc++;
    });

    // Highlight draws in after its last word has fully appeared
    timers.push(setTimeout(() => setShowCur(true), START + curPos * STAGGER));

    // "creative solutions," spans 2 words — use position of "solutions,"
    let wc2 = 0, creEndPos = -1;
    TOKENS.forEach((tok) => {
      const text = typeof tok === "object" ? tok.word : tok;
      if (text === " ") return;
      if (typeof tok === "object" && tok.hl === "cre") creEndPos = wc2;
      wc2++;
    });
    timers.push(setTimeout(() => setShowCre(true), START + creEndPos * STAGGER));

    return () => timers.forEach(clearTimeout);
  }, []);

  let wordIdx = 0;

  return (
    <h1 style={{
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "clamp(30px, 3.55vw, 54px)",
      fontWeight: "500",
      lineHeight: 1.35,
      letterSpacing: "-0.015em",
      color: "#1c1c1a",
      margin: 0,
      maxWidth: "640px",
      width: "100%",
      textAlign: "left",
    }}>
      {/* Render non-cre tokens normally, wrap creative+solutions in one box */}
      {(() => {
        const result = [];
        let wi = wordIdx;

        // We'll manually iterate and group "cre" tokens into one highlight span
        let j = 0;
        while (j < TOKENS.length) {
          const tok = TOKENS[j];
          const text = typeof tok === "object" ? tok.word : tok;
          const isSpace = text === " ";

          if (isSpace) {
            result.push(<span key={j}> </span>);
            j++;
            continue;
          }

          // Group all consecutive cre-highlighted words (and the space between) into one span
          if (typeof tok === "object" && tok.hl === "cre") {
            // collect all cre words + spaces between them
            const creTokens = [];
            while (j < TOKENS.length) {
              const t = TOKENS[j];
              const txt = typeof t === "object" ? t.word : t;
              if (typeof t === "object" && t.hl === "cre") {
                const myIdx = wi++;
                const visible = myIdx < revealedWords;
                creTokens.push({ txt, myIdx, visible, j });
                j++;
              } else if (txt === " " && j + 1 < TOKENS.length && typeof TOKENS[j+1] === "object" && TOKENS[j+1].hl === "cre") {
                creTokens.push({ txt: " ", myIdx: -1, visible: true, j });
                j++;
              } else {
                break;
              }
            }
            const anyVisible = creTokens.some(ct => ct.myIdx >= 0 && ct.visible);
            result.push(
              <span
                key={"cre-group"}
                style={{
                  display: "inline",
                  backgroundImage: "linear-gradient(to bottom, transparent 58%, rgba(254,228,228,0.81) 58%, rgba(254,228,228,0.81) 92%, transparent 92%)",
                  backgroundSize: showCre ? "100% 100%" : "0% 100%",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "left center",
                  transition: `background-size 0.9s ${SPRING}`,
                  padding: "0 2px",
                  margin: "0 -2px",
                  boxDecorationBreak: "clone",
                  WebkitBoxDecorationBreak: "clone",
                }}
              >
                {creTokens.map((ct, ci) => (
                  ct.txt === " "
                    ? <span key={ci}> </span>
                    : <span key={ci} style={{
                        display: "inline-block",
                        opacity: ct.visible ? 1 : 0,
                        filter: ct.visible ? "blur(0px)" : "blur(3px)",
                        transform: ct.visible ? "translateY(0px)" : "translateY(8px)",
                        transition: ct.visible ? `opacity 1s ${SPRING}, filter 1.1s ${SPRING}, transform 1s ${SPRING}` : "none",
                      }}>{ct.txt}</span>
                ))}
              </span>
            );
            continue;
          }

          // Normal word (cur highlight or plain)
          const myIdx = wi++;
          const visible = myIdx < revealedWords;
          const isHL = typeof tok === "object" && tok.hl === "cur";
          const showHL = isHL && showCur;

          result.push(
            <span
              key={j}
              style={{
                display: "inline-block",
                opacity: visible ? 1 : 0,
                filter: visible ? "blur(0px)" : "blur(3px)",
                transform: visible ? "translateY(0px)" : "translateY(8px)",
                backgroundImage: isHL
                  ? "linear-gradient(to bottom, transparent 58%, rgba(254,228,228,0.81) 58%, rgba(254,228,228,0.81) 92%, transparent 92%)"
                  : "none",
                backgroundSize: showHL ? "100% 100%" : "0% 100%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left center",
                transition: visible
                  ? `opacity 1s ${SPRING}, filter 1.1s ${SPRING}, transform 1s ${SPRING}, background-size 0.9s ${SPRING}`
                  : "none",
                padding: isHL ? "0 2px" : "0",
                margin: isHL ? "0 -2px" : "0",
              }}
            >
              {text}
            </span>
          );
          j++;
        }
        wordIdx = wi;
        return result;
      })()}
    </h1>
  );
}

function FadeUp({ children, delay = 0, style = {} }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, []);
  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0px)" : "translateY(24px)",
      transition: `opacity 1s ${SPRING}, transform 1s ${SPRING}`,
      ...style,
    }}>
      {children}
    </div>
  );
}

function Card({ p, delay = 0 }) {
  const [hov, setHov] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, []);
  return (
    <a
      href={p.href} target="_blank" rel="noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", flexDirection: "column",
        textDecoration: "none", color: "inherit",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(24px)",
        transition: `opacity 0.9s ${SPRING}, transform 0.9s ${SPRING}`,
      }}
    >
      <div style={{ width: "100%", aspectRatio: "4/3", borderRadius: "12px", overflow: "hidden", background: "#e3e0d9", marginBottom: "14px" }}>
        <img src={p.image} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .4s ease", transform: hov ? "scale(1.04)" : "scale(1)", display: "block" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "3px", flex: 1 }}>
        <p style={{ fontSize: "12.5px", color: "#999", margin: 0 }}>{p.category}</p>
        <p style={{ fontSize: "15px", color: "#1c1c1a", margin: 0, fontWeight: "400", lineHeight: "1.43" }}>{p.title}</p>
        <p style={{ fontSize: "11.5px", color: "#bbb", margin: 0, marginTop: "1px" }}>{p.role}</p>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "14px" }}>
        <span style={{ fontSize: "12px", color: hov ? "#1c1c1a" : "#999", border: `1px solid ${hov ? "#1c1c1a" : "#999"}`, borderRadius: "12px", padding: "5px 14px", transition: "border-color .2s, color .2s" }}>View →</span>
      </div>
    </a>
  );
}

function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  useEffect(() => {
    const move = (e) => { setPos({ x: e.clientX, y: e.clientY }); setVisible(true); };
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);
    const over = (e) => setHovering(!!e.target.closest("a, button"));
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    document.addEventListener("mouseover", over);
    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
      document.removeEventListener("mouseover", over);
    };
  }, []);
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, zIndex: 9999, pointerEvents: "none",
      width: hovering ? "26px" : "20px",
      height: hovering ? "26px" : "20px",
      borderRadius: "50%",
      background: hovering ? "rgba(230,180,180,0.92)" : "rgba(254,228,228,0.81)",
      transform: `translate(${pos.x - (hovering ? 13 : 10)}px, ${pos.y - (hovering ? 13 : 10)}px)`,
      opacity: visible ? 1 : 0,
      transition: "opacity 0.2s ease, width 0.2s ease, height 0.2s ease, background 0.2s ease",
    }} />
  );
}

function Nav({ page, setPage }) {
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, height: "72px", display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: "0 44px 16px", background: "#FFFDFA" }}>
      <button onClick={() => setPage("home")} style={{ fontFamily: "'Hiragino Maru Gothic Pro', 'Hiragino Maru Gothic ProN', 'Meiryo', sans-serif", fontSize: "22px", fontWeight: "400", color: "#1c1c1a", background: "none", border: "none", cursor: "none", padding: 0, lineHeight: 1 }}>
        {"\u8A31"}
      </button>
      <div style={{ display: "flex", gap: "28px", alignItems: "center" }}>
        <button onClick={() => setPage("about")} style={{ background: "none", border: "none", fontSize: "14px", fontWeight: "400", color: page === "about" ? "#1c1c1a" : "#666", fontFamily: "'DM Sans', sans-serif", cursor: "none", padding: 0, textDecoration: page === "about" ? "underline" : "none", textUnderlineOffset: "3px" }}>About</button>
        <a href="https://drive.google.com/file/d/1jR0-UFpSR3s455D-ho1Jdca-T7b124f-/view?usp=sharing" target="_blank" rel="noreferrer" style={{ fontSize: "14px", color: "#666", textDecoration: "none", fontFamily: "'DM Sans', sans-serif" }}>Resume</a>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop: "1px solid #e8e4dc", padding: "20px 44px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#FFFDFA" }}>
      <p style={{ fontSize: "10.5px", color: "#aaa", letterSpacing: "0.09em", textTransform: "uppercase", margin: 0 }}>Designed with {"\uD83E\uDD0D"} by Janel Co</p>
      <div style={{ display: "flex", gap: "24px" }}>
        {[{ l: "Linkedin", h: "https://www.linkedin.com/in/janelco/" }, { l: "Email", h: "mailto:janelstephanie@yahoo.com" }, { l: "Resume", h: "https://drive.google.com/file/d/1jR0-UFpSR3s455D-ho1Jdca-T7b124f-/view?usp=sharing" }].map(({ l, h }) => (
          <a key={l} href={h} target={h.startsWith("http") ? "_blank" : undefined} rel="noreferrer" style={{ fontSize: "13px", color: "#555", textDecoration: "none" }}>{l}</a>
        ))}
      </div>
    </footer>
  );
}

function Home() {
  return (
    <main style={{ paddingTop: "72px", background: "#FFFDFA", minHeight: "100vh" }}>
      <section style={{ maxWidth: "1160px", margin: "0 auto", padding: "108px 44px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <HeroText />
        <FadeUp delay={TOKENS.filter(t => (typeof t === "object" ? t.word : t) !== " ").length * STAGGER + START + 400} style={{ display: "flex", justifyContent: "center", marginTop: "52px", width: "100%" }}>
          <div style={{ animation: "bounce 2s ease-in-out infinite" }}>
            <svg width="22" height="13" viewBox="0 0 22 13" fill="none">
              <path d="M1 1L11 11L21 1" stroke="#1c1c1a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </FadeUp>
      </section>
      <section style={{ maxWidth: "1160px", margin: "0 auto", padding: "100px 44px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "52px 28px" }}>
          {PROJECTS.map((p, i) => <Card key={p.id} p={p} delay={300 + i * 150} />)}
        </div>
      </section>
      <section style={{ maxWidth: "1160px", margin: "0 auto", padding: "96px 44px 0" }}>
        <FadeUp delay={400}>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "20px", fontWeight: "500", color: "#1c1c1a", textAlign: "center", marginBottom: "40px", letterSpacing: "-0.01em" }}>My other creative work {"\u2728"}</h2>
        </FadeUp>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "52px 28px" }}>
          {CREATIVE.map((p, i) => <Card key={p.id} p={p} delay={500 + i * 150} />)}
        </div>
      </section>
      <div style={{ marginTop: "96px" }}><Footer /></div>
    </main>
  );
}

function About() {
  return (
    <main style={{ paddingTop: "72px", background: "#FFFDFA", minHeight: "100vh" }}>
      <section style={{ maxWidth: "1160px", margin: "0 auto", padding: "108px 44px 80px" }}>
        <FadeUp delay={100}>
          <p style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "#D4537E", marginBottom: "16px" }}>GET TO KNOW ME</p>
        </FadeUp>
        <FadeUp delay={220}>
          <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(28px, 3.6vw, 48px)", fontWeight: "500", color: "#1c1c1a", marginBottom: "28px", lineHeight: 1.22, maxWidth: "600px" }}>Hi there, I{"\u2019"}m Janel! Nice to meet you {"\uD83D\uDC4B\uD83C\uDFFB"}</h1>
        </FadeUp>
        <FadeUp delay={380}>
          <p style={{ fontSize: "16px", color: "#555", lineHeight: 1.8, maxWidth: "580px", marginBottom: "14px" }}>I{"\u2019"}m a Product Designer based in Vancouver, BC, driven by a passion for learning and exploring innovative ideas. I{"\u2019"}m currently an Interactive Arts and Technology student at Simon Fraser University.</p>
          <p style={{ fontSize: "16px", color: "#555", lineHeight: 1.8, maxWidth: "580px", marginBottom: "36px" }}>Outside of design, I enjoy makeup artistry, digital art, exploring new restaurants, and attending concerts.</p>
          <a href="https://drive.google.com/file/d/14xG657SVpu8rUv6r4Fj_f0MBewrT8FCw/view?usp=sharing" target="_blank" rel="noreferrer" style={{ display: "inline-block", padding: "10px 24px", border: "1px solid #1c1c1a", borderRadius: "24px", fontSize: "14px", color: "#1c1c1a", textDecoration: "none", fontFamily: "'DM Sans', sans-serif" }}>Download resume</a>
        </FadeUp>
      </section>
      <Footer />
    </main>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#FFFDFA" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #FFFDFA; cursor: none; }
        a, button { cursor: none; }
        @keyframes bounce { 0%,100%{transform:translateY(0)} 55%{transform:translateY(7px)} }
        a:hover { color: #E99DAC !important; }
        a:active { color: #F6C8D1 !important; }
        button:hover { color: #E99DAC !important; }
        button:active { color: #F6C8D1 !important; }
      `}</style>
      <Cursor />
      <Nav page={page} setPage={setPage} />
      {page === "home" ? <Home /> : <About />}
    </div>
  );
}
