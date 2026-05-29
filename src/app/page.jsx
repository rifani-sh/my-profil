"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const NAV_LINKS = [
  { id: "about", href: "#about" },
  { id: "skills", href: "#skills" },
  { id: "ecosystem", href: "#ecosystem" },
  { id: "projects", href: "#projects" },
  { id: "philosophy", href: "#philosophy" },
  { id: "contact", href: "#contact" },
];

const LANGUAGES = [
  { code: "en", label: "English", short: "EN" },
  { code: "id", label: "Indonesia", short: "ID" },
];

const SKILLS = [
  {
    category: "Mobile & Terminal",
    items: ["Termux", "Zsh", "Linux CLI", "pnpm", "git"],
  },
  {
    category: "Edge AI & Agents",
    items: ["Ollama", "TinyLlama", "Phi-3", "OpenClaw AI", "LLM Orchestration"],
  },
  {
    category: "Web Development",
    items: [
      "Next.js",
      "React",
      "Vercel",
      "Metadata Optimization",
      "Frontend Deployment",
    ],
  },
  {
    category: "Cloud & Infra",
    items: [
      "Oracle Cloud",
      "VPS Administration",
      "Network Security",
      "Remote Server Management",
    ],
  },
  {
    category: "Automation",
    items: [
      "n8n",
      "Webhooks",
      "AI Pipelines",
      "Workflow Automation",
      "Data Orchestration",
    ],
  },
  {
    category: "Programming",
    items: [
      "C#",
      "OOP Principles",
      "Systems Thinking",
      "Shell Scripting",
      "Cybersecurity",
    ],
  },
];

const ECOSYSTEM = [
  {
    // icon: "📱",
    title: "Mobile Systems & Terminal",
    desc: "Primary development environment built on Android via Termux — treating mobile as a fully capable Linux-based workstation. Advanced CLI operations, pnpm package management, and strict git version control.",
  },
  {
    // icon: "🤖",
    title: "Edge AI & Autonomous Agents",
    desc: "Running LLMs locally on consumer hardware using Ollama with TinyLlama and Phi-3. Configuring autonomous frameworks like OpenClaw AI — navigating API gateways, dependency isolation, and agent-driven architecture.",
  },
  {
    // icon: "☁️",
    title: "Cloud Infrastructure",
    desc: "Bridging edge computing with scalable cloud via Oracle Cloud Free Tier. Hands-on VPS management, automated script hosting, background processes, and persistent network gateway configuration.",
  },
  {
    // icon: "⚙️",
    title: "Workflow Automation",
    desc: "Experimenting with n8n for AI-integrated data orchestration — combining webhooks, automation logic, AI-assisted processing, and autonomous task execution into structured pipelines.",
  },
];

const PROJECTS = [
  {
    title: "Arrasyadiyyah",
    desc: "The official website of Yayasan Pondok Pesantren Arrasyadiyyah, an integrated Islamic educational foundation located in Serang, Banten, established in 1994.",
    link: "https://arrasyadiyyah.vercel.app/",
  },
  {
    title: "Katakita Serang City",
    desc: "KataKita is a news monitoring dashboard for Serang City, developed under Diskominfo. The platform allows users to track news statistics, weekly trending topics, trending officials, media sentiment, and the latest news articles from local print media — all visualized in interactive charts and data tables.",
    link: "https://katakita-serangkota.vercel.app/",
  },
  {
    title: "The History of Imam Syafii",
    desc: "An educational storytelling site that presents historical content in a simple, approachable layout.",
    link: "https://rifani-sh.github.io/kisah-imam-syafii/",
  },
  {
    title: "My Resume",
    desc: "A personal portfolio site structured for concise introduction and portfolio presentation.",
    link: "https://rifani-sh.github.io/portfolio-english/",
  },
  {
    title: "Game Suwit",
    desc: "A small browser game project built for lightweight interaction and casual play.",
    link: "https://rifani-sh.github.io/game-suwit/",
  },
];

const SKILLS_ID = [
  {
    category: "Mobile & Terminal",
    items: ["Termux", "Zsh", "Linux CLI", "pnpm", "git"],
  },
  {
    category: "Edge AI & Agents",
    items: ["Ollama", "TinyLlama", "Phi-3", "OpenClaw AI", "Orkestrasi LLM"],
  },
  {
    category: "Web Development",
    items: [
      "Next.js",
      "React",
      "Vercel",
      "Optimasi Metadata",
      "Deployment Frontend",
    ],
  },
  {
    category: "Cloud & Infra",
    items: [
      "Oracle Cloud",
      "Administrasi VPS",
      "Keamanan Jaringan",
      "Manajemen Server Jarak Jauh",
    ],
  },
  {
    category: "Automation",
    items: [
      "n8n",
      "Webhooks",
      "Pipeline AI",
      "Otomasi Workflow",
      "Orkestrasi Data",
    ],
  },
  {
    category: "Programming",
    items: [
      "C#",
      "Prinsip OOP",
      "Systems Thinking",
      "Shell Scripting",
      "Cybersecurity",
    ],
  },
];

const ECOSYSTEM_ID = [
  {
    title: "Mobile Systems & Terminal",
    desc: "Lingkungan development utama dibangun di Android melalui Termux, memperlakukan mobile sebagai workstation Linux yang mampu bekerja penuh. Operasi CLI tingkat lanjut, manajemen package pnpm, dan kontrol versi git yang disiplin.",
  },
  {
    title: "Edge AI & Autonomous Agents",
    desc: "Menjalankan LLM secara lokal di perangkat konsumen menggunakan Ollama dengan TinyLlama dan Phi-3. Mengonfigurasi framework otonom seperti OpenClaw AI, dari API gateway, isolasi dependency, sampai arsitektur berbasis agent.",
  },
  {
    title: "Cloud Infrastructure",
    desc: "Menghubungkan edge computing dengan cloud yang scalable melalui Oracle Cloud Free Tier. Praktik langsung dalam manajemen VPS, script otomatis, proses background, dan konfigurasi network gateway yang persisten.",
  },
  {
    title: "Workflow Automation",
    desc: "Bereksperimen dengan n8n untuk orkestrasi data yang terintegrasi AI, menggabungkan webhook, logika otomasi, pemrosesan berbantuan AI, dan eksekusi task otonom ke dalam pipeline yang terstruktur.",
  },
];

const PROJECTS_ID = [
  {
    title: "Arrasyadiyyah",
    desc: "Website resmi Yayasan Pondok Pesantren Arrasyadiyyah, yayasan pendidikan Islam terpadu di Serang, Banten, yang berdiri sejak 1994.",
    link: "https://arrasyadiyyah.vercel.app/",
  },
  {
    title: "Katakita Serangkota",
    desc: "KataKita adalah dashboard monitoring berita untuk Kota Serang yang dikembangkan di lingkungan Diskominfo. Platform ini membantu pengguna memantau statistik berita, topik trending mingguan, pejabat trending, sentimen media, dan artikel terbaru dari media cetak lokal melalui chart dan tabel interaktif.",
    link: "https://katakita-serangkota.vercel.app/",
  },
  {
    title: "Kisah Imam Syafii",
    desc: "Situs storytelling edukatif yang menyajikan konten sejarah dengan layout sederhana dan mudah diikuti.",
    link: "https://rifani-sh.github.io/kisah-imam-syafii/",
  },
  {
    title: "Portfolio English",
    desc: "Situs portfolio personal yang disusun untuk perkenalan singkat dan presentasi karya.",
    link: "https://rifani-sh.github.io/portfolio-english/",
  },
  {
    title: "Game Suwit",
    desc: "Project game browser kecil yang dibuat untuk interaksi ringan dan permainan kasual.",
    link: "https://rifani-sh.github.io/game-suwit/",
  },
];

const TRANSLATIONS = {
  en: {
    nav: {
      about: "about",
      skills: "skills",
      ecosystem: "ecosystem",
      projects: "projects",
      philosophy: "philosophy",
      contact: "contact",
    },
    languageButton: "languages",
    themeLight: "light",
    themeDark: "dark",
    status: "Open to opportunities",
    heroTag: "Systems Engineer · Indonesia",
    heroBio:
      "Exploring Linux, Cyber Security, AI automation, and modern web technologies. Building decentralized, highly automated environments that move with me — on consumer hardware, from a mobile terminal.",
    whatsappContact: "whatsapp contact",
    sidebarNavigation: "Navigation",
    sidebarLinks: "Links",
    sidebarStack: "Stack",
    aboutSubtitle: "Professional philosophy & background",
    aboutOne:
      "I operate on a fundamental principle: maximum efficiency with a minimal physical footprint. Where others see limitations in consumer hardware or mobile devices, I see an untapped, highly portable edge-computing node.",
    aboutTwo:
      "My technical journey is defined by a desire to break away from traditional, desktop-bound workflows and instead build a decentralized, highly automated environment that moves with me. I do not wait for the perfect infrastructure or high-end workstations to build, experiment, and deploy.",
    calloutTitle: "Problem-solving methodology:",
    calloutBody:
      "When faced with a system failure or broken dependency, my approach is methodical and relentless. I isolate variables, analyze system logs, patch environment-specific bugs, and iterate until the system functions reliably. Hardware and software constraints are parameters within which I optimize — not barriers.",
    aboutThree:
      "My practical exploration is balanced by a structured academic trajectory — actively pursuing an Informatics degree through online learning, marrying industry practice with theoretical frameworks like advanced algorithms, data structures, and software engineering methodologies.",
    skillsSubtitle: "Technology stack & competencies",
    ecosystemSubtitle: "Core technical domains & execution",
    projectsSubtitle: "Selected works and public demos",
    visitSite: "visit site",
    philosophySubtitle: "Technical direction & long-term vision",
    philosophyQuote:
      "I continuously learn through experimentation, iteration, and direct interaction with emerging technologies rather than waiting for ideal conditions or conventional infrastructure. My long-term trajectory is centered around becoming a highly adaptive systems engineer capable of operating across edge AI, decentralized infrastructure, automation systems, cloud-native environments, and autonomous computing ecosystems.",
    taglines: [
      "Efficiency over excess.",
      "Adaptability over dependency.",
      "Execution over limitation.",
    ],
    contactSubtitle: "Get in touch or follow my work",
    contactUs: "Contact Us",
    inquiryTitle: "email inquiry",
    inquiryCopy: "Send a message",
    nameLabel: "Name",
    emailLabel: "Email",
    infoLabel: "Info",
    namePlaceholder: "Your name",
    messagePlaceholder: "Tell me about your project, timeline, or partnership.",
    submitInquiry: "submit inquiry",
    submittingInquiry: "sending...",
    inquirySuccess: "Message sent. I will reply from my email.",
    inquiryError:
      "Message could not be sent. Please try again or contact me through WhatsApp.",
    footer: "efficiency over excess.",
  },
  id: {
    nav: {
      about: "tentang",
      skills: "keahlian",
      ecosystem: "ekosistem",
      projects: "proyek",
      philosophy: "filosofi",
      contact: "kontak",
    },
    languageButton: "bahasa",
    themeLight: "terang",
    themeDark: "gelap",
    status: "Terbuka untuk peluang",
    heroTag: "Systems Engineer · Indonesia",
    heroBio:
      "Mengeksplorasi Linux, Cyber Security, otomasi AI, dan teknologi web modern. Membangun lingkungan terdesentralisasi dan sangat otomatis yang bisa bergerak bersama saya — di perangkat konsumen, dari terminal mobile.",
    whatsappContact: "kontak whatsapp",
    sidebarNavigation: "Navigasi",
    sidebarLinks: "Tautan",
    sidebarStack: "Stack",
    aboutSubtitle: "Filosofi profesional & latar belakang",
    aboutOne:
      "Saya bekerja dengan prinsip dasar: efisiensi maksimum dengan jejak fisik seminimal mungkin. Ketika orang lain melihat keterbatasan pada perangkat konsumen atau mobile, saya melihat node edge-computing yang portabel dan belum dimanfaatkan penuh.",
    aboutTwo:
      "Perjalanan teknis saya dibentuk oleh keinginan untuk lepas dari workflow tradisional yang terikat desktop, lalu membangun lingkungan terdesentralisasi dan sangat otomatis yang bergerak bersama saya. Saya tidak menunggu infrastruktur sempurna atau workstation mahal untuk membangun, bereksperimen, dan deploy.",
    calloutTitle: "Metodologi problem-solving:",
    calloutBody:
      "Saat menghadapi kegagalan sistem atau dependency yang rusak, pendekatan saya metodis dan gigih. Saya mengisolasi variabel, menganalisis log sistem, menambal bug spesifik lingkungan, dan mengulang sampai sistem berjalan stabil. Keterbatasan hardware dan software adalah parameter untuk dioptimalkan — bukan penghalang.",
    aboutThree:
      "Eksplorasi praktis saya diimbangi dengan jalur akademik yang terstruktur — aktif menempuh gelar Informatika melalui pembelajaran online, menggabungkan praktik industri dengan kerangka teori seperti algoritma lanjutan, struktur data, dan metodologi software engineering.",
    skillsSubtitle: "Stack teknologi & kompetensi",
    ecosystemSubtitle: "Domain teknis inti & eksekusi",
    projectsSubtitle: "Karya pilihan dan demo publik",
    visitSite: "kunjungi situs",
    philosophySubtitle: "Arah teknis & visi jangka panjang",
    philosophyQuote:
      "Saya terus belajar melalui eksperimen, iterasi, dan interaksi langsung dengan teknologi baru, bukan menunggu kondisi ideal atau infrastruktur konvensional. Arah jangka panjang saya berpusat pada menjadi systems engineer yang sangat adaptif, mampu bekerja lintas edge AI, infrastruktur terdesentralisasi, sistem otomasi, lingkungan cloud-native, dan ekosistem komputasi otonom.",
    taglines: [
      "Efisiensi di atas kelebihan.",
      "Adaptabilitas di atas ketergantungan.",
      "Eksekusi di atas keterbatasan.",
    ],
    contactSubtitle: "Hubungi atau ikuti karya saya",
    contactUs: "Hubungi Saya",
    inquiryTitle: "email inquiry",
    inquiryCopy: "Kirim pesan",
    nameLabel: "Nama",
    emailLabel: "Email",
    infoLabel: "Info",
    namePlaceholder: "Nama kamu",
    messagePlaceholder:
      "Ceritakan project, timeline, atau rencana kerja sama kamu.",
    submitInquiry: "kirim inquiry",
    submittingInquiry: "mengirim...",
    inquirySuccess: "Pesan terkirim. Saya akan membalas dari email pribadi.",
    inquiryError:
      "Pesan belum bisa dikirim. Coba lagi atau hubungi saya lewat WhatsApp.",
    footer: "efisiensi di atas kelebihan.",
  },
};

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const [theme, setTheme] = useState("dark");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    info: "",
  });
  const [contactStatus, setContactStatus] = useState("idle");
  const [contactMessage, setContactMessage] = useState("");
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const languageRef = useRef(null);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    }

    const savedLanguage = window.localStorage.getItem("portfolio-language");
    if (savedLanguage === "en" || savedLanguage === "id") {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    window.localStorage.setItem("portfolio-language", language);
  }, [language]);

  useEffect(() => {
    if (!menuOpen && !languageOpen) return;

    const handleClickOutside = (event) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }

      if (
        languageOpen &&
        languageRef.current &&
        !languageRef.current.contains(event.target)
      ) {
        setLanguageOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen, languageOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map((l) => l.id);
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    setContactStatus("loading");
    setContactMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactForm),
      });

      if (!response.ok) {
        throw new Error("Failed to send contact form");
      }

      setContactForm({ name: "", email: "", info: "" });
      setContactStatus("success");
      setContactMessage(copy.inquirySuccess);
    } catch {
      setContactStatus("error");
      setContactMessage(copy.inquiryError);
    }
  };

  const copy = TRANSLATIONS[language];
  const currentLanguage = LANGUAGES.find((item) => item.code === language);
  const skills = language === "id" ? SKILLS_ID : SKILLS;
  const ecosystem = language === "id" ? ECOSYSTEM_ID : ECOSYSTEM;
  const projects = language === "id" ? PROJECTS_ID : PROJECTS;

  return (
    <div
      className={`portfolio-shell ${theme}`}
      style={{
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
        minHeight: "100vh",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        :root {
          --bg: #05070b;
          --surface: #0d121b;
          --border: #243041;
          --text: #f5f7fb;
          --muted: #9ca3b0;
          --accent: #62a8ff;
          --accent-light: #12233f;
          --accent-dim: #7db5ff;
          --mono: 'JetBrains Mono', 'Fira Code', monospace;
          --sans: 'DM Sans', sans-serif;
          color-scheme: dark;
        }

        .portfolio-shell {
          background: var(--bg);
          color: var(--text);
        }

        .portfolio-shell.dark {
          --bg: #05070b;
          --surface: #0d121b;
          --border: #243041;
          --text: #f5f7fb;
          --muted: #9ca3b0;
          --accent: #62a8ff;
          --accent-light: #12233f;
          --accent-dim: #7db5ff;
        }

        .portfolio-shell.light {
          --bg: #f6f4ef;
          --surface: #fffdf9;
          --border: #d5d0ca;
          --text: #191919;
          --muted: #5b5752;
          --accent: #1864ab;
          --accent-light: #e8f0fb;
          --accent-dim: #4a90d9;
        }

        a { color: var(--accent); text-decoration: none; }
        a:hover { text-decoration: underline; }

        /* HEADER */
        .header {
          background: var(--bg);
          border-bottom: 1px solid var(--border);
          position: sticky; top: 0; z-index: 100;
        }
        .header-inner {
          max-width: 1100px; margin: 0 auto;
          padding: 0 24px;
          display: flex; align-items: center; justify-content: space-between;
          height: 56px;
        }
        .logo {
          font-family: var(--mono);
          font-weight: 700; font-size: 15px;
          color: var(--text); text-decoration: none;
          display: flex; align-items: center; gap: 10px;
        }
        .header-logo-image {
          width: 34px;
          height: 34px;
          border-radius: 999px;
          object-fit: cover;
          border: 1px solid var(--border);
          flex-shrink: 0;
        }
        .logo-bracket { color: var(--accent); }
        .nav { display: flex; align-items: center; gap: 2px; }
        .nav a {
          font-size: 13px; font-weight: 400;
          color: var(--muted);
          padding: 6px 12px; border-radius: 3px;
          transition: all 0.15s;
          font-family: var(--mono);
        }
        .nav a:hover { color: var(--text); background: var(--surface); text-decoration: none; }
        .nav a.active { color: var(--accent); background: var(--accent-light); }

        /* HERO */
        .hero {
          border-bottom: 1px solid var(--border);
          background: var(--bg);
          padding: 64px 24px 56px;
        }
        .hero-inner {
          max-width: 1100px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr auto; gap: 48px; align-items: start;
        }
        .hero-tag {
          font-family: var(--mono);
          font-size: 11px; font-weight: 600; letter-spacing: 0.12em;
          color: var(--accent);
          text-transform: uppercase;
          margin-bottom: 16px;
          display: flex; align-items: center; gap: 8px;
        }
        .hero-tag::before {
          content: '';
          display: inline-block; width: 20px; height: 1px;
          background: var(--accent);
        }
        .hero h1 {
          font-family: var(--mono);
          font-size: clamp(28px, 5vw, 44px);
          font-weight: 700; line-height: 1.1;
          letter-spacing: -0.02em;
          color: var(--text);
          margin-bottom: 20px;
        }
        .hero h1 span { color: var(--accent); }
        .hero-bio {
          font-family: var(--sans);
          font-size: 15px; line-height: 1.7;
          color: var(--muted); max-width: 580px;
          margin-bottom: 28px;
        }
        .hero-links { display: flex; gap: 12px; flex-wrap: wrap; }
        .btn {
          font-family: var(--mono); font-size: 12px; font-weight: 600;
          padding: 8px 16px; border-radius: 3px;
          display: inline-flex; align-items: center; gap: 6px;
          transition: all 0.15s; text-decoration: none;
          letter-spacing: 0.02em;
          border: 1px solid var(--border);
          background: var(--bg);
          color: var(--muted);
          cursor: pointer;
        }
        .btn:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-light); text-decoration: none; }
        .btn-primary {
          background: var(--accent); color: #fff; border-color: var(--accent);
        }
        .btn-primary:hover { background: #1558a0; border-color: #1558a0; color: #fff; }

        .hero-avatar {
          width: 120px; height: 120px; border-radius: 50%;
          border: 2px solid var(--border);
          object-fit: cover;
          flex-shrink: 0;
        }

        /* LAYOUT */
        .layout {
          max-width: 1100px; margin: 0 auto;
          display: grid; grid-template-columns: 220px 1fr; gap: 0;
          min-height: calc(100vh - 56px - 200px);
        }

        /* SIDEBAR */
        .sidebar {
          border-right: 1px solid var(--border);
          padding: 32px 0;
          position: sticky; top: 56px; height: calc(100vh - 56px);
          overflow-y: auto;
        }
        .sidebar-section { margin-bottom: 28px; }
        .sidebar-label {
          font-family: var(--mono);
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--muted);
          padding: 0 24px; margin-bottom: 8px;
        }
        .sidebar-link {
          display: block; font-family: var(--mono);
          font-size: 13px; color: var(--muted);
          padding: 6px 24px;
          border-left: 2px solid transparent;
          transition: all 0.12s;
        }
        .sidebar-link:hover { color: var(--text); text-decoration: none; background: var(--surface); }
        .sidebar-link.active {
          color: var(--accent); border-left-color: var(--accent);
          background: var(--accent-light);
        }

        /* MAIN */
        .main { padding: 40px 48px; }
        .section { margin-bottom: 60px; padding-top: 8px; }
        .section-title {
          font-family: var(--mono); font-size: 18px; font-weight: 700;
          color: var(--text); margin-bottom: 6px;
          display: flex; align-items: center; gap: 10px;
        }
        .section-title::after {
          content: ''; flex: 1; height: 1px; background: var(--border);
        }
        .section-subtitle {
          font-family: var(--sans); font-size: 13px; color: var(--muted);
          margin-bottom: 24px; padding-top: 4px;
        }

        /* ABOUT */
        .about-text {
          font-family: var(--sans); font-size: 15px; line-height: 1.8;
          color: var(--muted); max-width: 720px;
        }
        .about-text + .about-text { margin-top: 14px; }

        .callout {
          background: var(--surface); border-left: 3px solid var(--accent);
          padding: 14px 18px; border-radius: 0 4px 4px 0;
          font-family: var(--mono); font-size: 12px; line-height: 1.7;
          color: var(--muted); margin: 20px 0;
        }

        /* SKILLS GRID */
        .skills-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
        }
        .skill-card {
          border: 1px solid var(--border); border-radius: 4px;
          padding: 16px 18px; background: var(--bg);
          transition: border-color 0.15s;
        }
        .skill-card:hover { border-color: var(--accent-dim); }
        .skill-card-title {
          font-family: var(--mono); font-size: 12px; font-weight: 700;
          color: var(--accent); margin-bottom: 10px;
          letter-spacing: 0.04em; text-transform: uppercase;
        }
        .skill-tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .tag {
          font-family: var(--mono); font-size: 11px;
          background: var(--surface); color: var(--muted);
          padding: 3px 8px; border-radius: 2px;
          border: 1px solid var(--border);
          transition: all 0.12s;
        }
        .tag:hover { background: var(--accent-light); color: var(--accent); border-color: var(--accent-dim); }

        /* ECOSYSTEM */
        .eco-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
        }
        .eco-card {
          border: 1px solid var(--border); border-radius: 4px;
          padding: 20px; background: var(--bg);
          transition: border-color 0.15s, background 0.15s;
        }
        .eco-card:hover { border-color: var(--accent-dim); background: var(--accent-light); }
        .eco-icon { font-size: 22px; margin-bottom: 10px; display: block; }
        .eco-title {
          font-family: var(--mono); font-size: 13px; font-weight: 700;
          color: var(--text); margin-bottom: 8px;
        }
        .eco-desc {
          font-family: var(--sans); font-size: 13px; line-height: 1.7;
          color: var(--muted);
        }

        /* PROJECTS */
        .project-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 16px;
        }
        .project-card {
          border: 1px solid var(--border);
          border-radius: 4px;
          padding: 18px;
          background: var(--bg);
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: border-color 0.15s, background 0.15s;
        }
        .project-card:hover {
          border-color: var(--accent-dim);
          background: var(--accent-light);
        }
        .project-card-title {
          font-family: var(--mono);
          font-size: 14px;
          font-weight: 700;
          color: var(--text);
        }
        .project-card-desc {
          font-family: var(--sans);
          font-size: 13px;
          line-height: 1.6;
          color: var(--muted);
        }
        .project-card-link {
          margin-top: auto;
          font-family: var(--mono);
          font-size: 11px;
          color: var(--accent);
          text-decoration: none;
        }
        .project-card-link:hover {
          text-decoration: underline;
        }

        /* PHILOSOPHY */
        .philosophy-block { margin-bottom: 16px; }
        .philosophy-block blockquote {
          font-family: var(--mono); font-size: 13px; line-height: 1.8;
          color: var(--muted); background: var(--surface);
          border-left: 3px solid var(--accent);
          padding: 16px 20px; border-radius: 0 4px 4px 0;
          margin: 0;
        }
        .philosophy-tagline {
          display: flex; gap: 24px; flex-wrap: wrap;
          margin-top: 24px;
        }
        .tagline-item {
          font-family: var(--mono); font-size: 13px; font-weight: 700;
          color: var(--accent); letter-spacing: 0.01em;
        }
        .tagline-item::before { content: '→ '; color: var(--border); }

        /* CONTACT */
        .contact-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 12px;
        }
        .contact-card {
          border: 1px solid var(--border); border-radius: 4px;
          padding: 14px 16px; background: var(--bg);
          display: flex; align-items: center; gap: 12px;
          text-decoration: none; transition: all 0.15s;
        }
        .contact-card:hover { border-color: var(--accent); background: var(--accent-light); text-decoration: none; }
        .contact-icon { font-size: 18px; }
        .contact-info { }
        .contact-platform { font-family: var(--mono); font-size: 11px; color: var(--muted); }
        .contact-handle { font-family: var(--mono); font-size: 13px; font-weight: 600; color: var(--accent); }

        /* FOOTER */
        .footer {
          border-top: 1px solid var(--border);
          padding: 24px;
          font-family: var(--mono); font-size: 11px; color: var(--muted);
          display: flex; justify-content: space-between; align-items: center;
          flex-wrap: wrap; gap: 8px;
          max-width: 100%;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .theme-toggle {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 1px solid var(--border);
          background: var(--surface);
          color: var(--text);
          padding: 6px 10px;
          border-radius: 999px;
          cursor: pointer;
          font-family: var(--mono);
          font-size: 11px;
          transition: all 0.2s ease;
        }

        .theme-toggle:hover {
          border-color: var(--accent);
          box-shadow: 0 0 0 1px rgba(98, 168, 255, 0.2);
        }

        .language-switcher {
          position: relative;
        }

        .translate-toggle {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          height: 34px;
          border: 1px solid var(--border);
          border-radius: 2px;
          background: var(--surface);
          color: var(--text);
          padding: 0 10px;
          cursor: pointer;
          font-family: var(--mono);
          font-size: 11px;
          font-weight: 700;
          transition: border-color 0.16s ease, background 0.16s ease, box-shadow 0.16s ease;
        }

        .translate-icon {
          font-size: 14px;
          line-height: 1;
          color: var(--muted);
        }

        .translate-caret {
          font-size: 12px;
          color: var(--muted);
        }

        .translate-menu {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          width: 180px;
          border: 1px solid var(--border);
          border-radius: 2px;
          background: var(--surface);
          padding: 8px;
          z-index: 250;
          box-shadow: 0 14px 32px rgba(0, 0, 0, 0.28);
        }

        .translate-option {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          border: 0;
          border-radius: 2px;
          background: transparent;
          color: var(--muted);
          padding: 8px 10px;
          cursor: pointer;
          font-family: var(--mono);
          font-size: 12px;
          text-align: left;
        }

        .translate-option:hover,
        .translate-option.active {
          color: var(--accent);
          background: var(--accent-light);
        }

        .language-code {
          color: var(--accent);
          font-size: 10px;
        }

        .portfolio-shell.dark .translate-toggle {
          background: #0b1017;
          border-color: #2f7fd3;
          color: #dce6f2;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.04);
        }

        .portfolio-shell.dark .translate-menu {
          background: #0b1017;
          border-color: #2f7fd3;
        }

        .portfolio-shell.dark .translate-toggle:hover,
        .portfolio-shell.dark .translate-toggle:focus-visible {
          background: #111824;
          border-color: #4da3ff;
          box-shadow: 0 0 0 2px rgba(47, 127, 211, 0.24);
        }

        .theme-toggle.mobile-theme-toggle {
          display: none;
          width: 100%;
          margin: 0 0 8px 0;
          border-radius: 3px;
          padding: 6px 12px;
          font-size: 13px;
          justify-content: center;
          align-items: center;
          background: none;
          border: none;
          color: var(--muted);
          text-align: center;
          font-family: var(--mono);
          font-weight: 400;
          transition: background 0.15s, color 0.15s;
        }
        .theme-toggle.mobile-theme-toggle span {
          margin: 0 4px;
        }
        .theme-toggle.mobile-theme-toggle:hover,
        .theme-toggle.mobile-theme-toggle:focus {
          color: var(--accent);
          background: var(--accent-light);
        }

        /* MOBILE NAV */
        .menu-btn {
          display: none;
          width: 44px;
          height: 38px;
          align-items: center;
          justify-content: center;
          background: none;
          border: 1px solid var(--border);
          padding: 0;
          border-radius: 2px;
          cursor: pointer;
          color: var(--muted);
          transition: border-color 0.16s ease, background 0.16s ease, box-shadow 0.16s ease;
        }

        .menu-icon {
          width: 18px;
          display: grid;
          gap: 4px;
        }

        .menu-icon span {
          display: block;
          height: 3px;
          border-radius: 999px;
          background: currentColor;
          transform-origin: center;
          transition: transform 0.16s ease, opacity 0.16s ease, width 0.16s ease;
        }

        .menu-icon span:nth-child(1) { width: 14px; }
        .menu-icon span:nth-child(2) { width: 18px; }
        .menu-icon span:nth-child(3) { width: 10px; }

        .portfolio-shell.dark .menu-btn {
          background: #161b22;
          border-color: #2f7fd3;
          color: #dce6f2;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.04);
        }

        .portfolio-shell.dark .menu-btn:hover,
        .portfolio-shell.dark .menu-btn:focus-visible {
          background: #1b222d;
          border-color: #4da3ff;
          color: #ffffff;
          box-shadow: 0 0 0 2px rgba(47, 127, 211, 0.24);
        }

        .portfolio-shell.light .menu-btn:hover,
        .portfolio-shell.light .menu-btn:focus-visible {
          border-color: var(--accent);
          color: var(--accent);
          background: var(--accent-light);
        }

        .menu-btn.open .menu-icon span:nth-child(1) {
          width: 18px;
          transform: translateY(7px) rotate(45deg);
        }

        .menu-btn.open .menu-icon span:nth-child(2) {
          opacity: 0;
        }

        .menu-btn.open .menu-icon span:nth-child(3) {
          width: 18px;
          transform: translateY(-7px) rotate(-45deg);
        }

        .contact-form-card {
          margin-top: 16px;
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 20px;
          background: var(--surface);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .contact-form-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }

        .contact-form-title {
          font-family: var(--mono);
          font-size: 13px;
          font-weight: 700;
          color: var(--text);
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .contact-form-copy {
          font-family: var(--sans);
          font-size: 12px;
          color: var(--muted);
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .contact-form-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }

        .contact-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .contact-field-label {
          font-family: var(--mono);
          font-size: 10px;
          color: var(--muted);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .contact-field input,
        .contact-field textarea {
          width: 100%;
          border: 1px solid var(--border);
          border-radius: 4px;
          background: var(--bg);
          color: var(--text);
          font-family: var(--sans);
          font-size: 13px;
          padding: 10px 12px;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .contact-field input:focus,
        .contact-field textarea:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 2px rgba(98, 168, 255, 0.16);
        }

        .contact-field textarea {
          min-height: 140px;
          resize: vertical;
        }

        .contact-form-actions {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 12px;
          flex-wrap: wrap;
        }

        .contact-form-status {
          font-family: var(--mono);
          font-size: 11px;
          line-height: 1.5;
        }

        .contact-form-status.success { color: #57d68d; }
        .contact-form-status.error { color: #ff7b72; }

        .arch-submit {
          border: 1px solid #145a96;
          border-radius: 4px;
          padding: 10px 14px;
          font-family: var(--mono);
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #fff;
          cursor: pointer;
          background: linear-gradient(180deg, #4a90d9, #1864ab);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.28), 0 2px 6px rgba(0,0,0,0.24);
          transition: transform 0.18s ease, filter 0.18s ease;
        }

        .arch-submit:hover {
          filter: brightness(1.06);
          transform: translateY(-1px);
        }

        .arch-submit:disabled {
          cursor: wait;
          filter: grayscale(0.25) brightness(0.8);
          transform: none;
        }

        /* STATUS BADGE */
        .status-badge {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: var(--mono); font-size: 11px; color: var(--accent);
          background: var(--accent-light); border: 1px solid var(--accent-dim);
          padding: 3px 10px; border-radius: 2px;
          margin-bottom: 16px;
        }
        .status-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--accent); animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; } 50% { opacity: 0.4; }
        }

        /* RESPONSIVE */
        @media (max-width: 900px) {
          .layout { grid-template-columns: 1fr; }
          .sidebar { display: none; position: static; height: auto; border-right: none; border-bottom: 1px solid var(--border); }
          .sidebar.open { display: block; }
          .menu-btn { display: inline-flex; }
          .main { padding: 28px 24px; }
          .eco-grid { grid-template-columns: 1fr; }
          .hero-inner { grid-template-columns: 1fr; }
          .hero-avatar { display: none; }
          .logo { gap: 8px; }
          .header-logo-image {
            width: 28px;
            height: 28px;
            margin-right: 2px;
          }
          .theme-toggle.desktop-theme-toggle {
            display: none;
          }
          .theme-toggle.mobile-theme-toggle {
            display: flex;
          }
          .translate-toggle {
            width: 44px;
            justify-content: center;
            padding: 0;
          }
          .translate-label,
          .translate-caret {
            display: none;
          }
          .nav { display: none; }
          .nav.mobile-open {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 56px;
            right: 0;
            left: 0;
            background: var(--bg);
            border-bottom: 1px solid var(--border);
            padding: 12px;
            z-index: 200;
          }
        }
      `}</style>

      {/* HEADER */}
      <header className="header">
        <div className="header-inner">
          <a href="#" className="logo">
            <Image
              src="https://avatars.githubusercontent.com/u/89932645?v=4"
              alt="Rifani Syahputra"
              className="header-logo-image"
              width={34}
              height={34}
              unoptimized
            />
            <span className="logo-bracket">[</span>rifani
            <span className="logo-bracket">]</span>
          </a>
          <div className="header-actions">
            <div className="language-switcher" ref={languageRef}>
              <button
                type="button"
                className="translate-toggle"
                onClick={() => setLanguageOpen((current) => !current)}
                aria-label="Change language"
                aria-expanded={languageOpen}
              >
                <span className="translate-icon" aria-hidden="true">
                  A文
                </span>
                <span className="translate-label">
                  {currentLanguage.short} {copy.languageButton}
                </span>
                <span className="translate-caret" aria-hidden="true">
                  ˅
                </span>
              </button>
              {languageOpen && (
                <div className="translate-menu">
                  {LANGUAGES.map((item) => (
                    <button
                      key={item.code}
                      type="button"
                      className={`translate-option${language === item.code ? " active" : ""}`}
                      onClick={() => {
                        setLanguage(item.code);
                        setLanguageOpen(false);
                      }}
                    >
                      <span>{item.label}</span>
                      <span className="language-code">{item.short}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              type="button"
              className="theme-toggle desktop-theme-toggle"
              onClick={() =>
                setTheme((current) => (current === "dark" ? "light" : "dark"))
              }
              aria-label="Toggle theme"
            >
              <span>{theme === "dark" ? "☀" : "☾"}</span>
              <span>{theme === "dark" ? copy.themeLight : copy.themeDark}</span>
            </button>
            <nav
              ref={menuRef}
              className={`nav${menuOpen ? " mobile-open" : ""}`}
            >
              <button
                type="button"
                className="theme-toggle mobile-theme-toggle"
                onClick={() =>
                  setTheme((current) => (current === "dark" ? "light" : "dark"))
                }
                aria-label="Toggle theme"
              >
                <span>{theme === "dark" ? "☀" : "☾"}</span>
                <span>
                  {theme === "dark" ? copy.themeLight : copy.themeDark}
                </span>
              </button>
              {NAV_LINKS.map((l) => (
                <a
                  key={l.id}
                  href={l.href}
                  className={activeSection === l.id ? "active" : ""}
                  onClick={() => setMenuOpen(false)}
                >
                  {copy.nav[l.id]}
                </a>
              ))}
            </nav>
            <button
              ref={menuButtonRef}
              className={`menu-btn${menuOpen ? " open" : ""}`}
              onClick={() => setMenuOpen((v) => !v)}
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <span className="menu-icon" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <div>
            <div className="status-badge">
              <span className="status-dot" />
              {copy.status}
            </div>
            <div className="hero-tag">{copy.heroTag}</div>
            <h1>
              Rifani
              <br />
            </h1>
            <p className="hero-bio">{copy.heroBio}</p>
            <div className="hero-links">
              <a
                href="https://github.com/rifani-sh"
                target="_blank"
                rel="noreferrer"
                className="btn"
              >
                ⌥ github.com/rifani-sh
              </a>
              <a
                href="https://www.linkedin.com/in/rifani-sh"
                target="_blank"
                rel="noreferrer"
                className="btn"
              >
                ⌘ linkedin / rifani-sh
              </a>
              <a
                href="https://wa.me/628977505234?text=Halo%20Rifani%2C%20saya%20ingin%20berdiskusi"
                target="_blank"
                rel="noreferrer"
                className="btn"
              >
                ☎ {copy.whatsappContact}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BODY */}
      <div className="layout">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="sidebar-section">
            <div className="sidebar-label">{copy.sidebarNavigation}</div>
            {NAV_LINKS.map((l) => (
              <a
                key={l.id}
                href={l.href}
                className={`sidebar-link${activeSection === l.id ? " active" : ""}`}
              >
                {copy.nav[l.id]}
              </a>
            ))}
          </div>
          <div className="sidebar-section">
            <div className="sidebar-label">{copy.sidebarLinks}</div>
            <a
              href="https://github.com/rifani-sh"
              target="_blank"
              rel="noreferrer"
              className="sidebar-link"
            >
              GitHub →
            </a>
            <a
              href="https://www.linkedin.com/in/rifani-sh"
              target="_blank"
              rel="noreferrer"
              className="sidebar-link"
            >
              LinkedIn →
            </a>
          </div>
          <div className="sidebar-section">
            <div className="sidebar-label">{copy.sidebarStack}</div>
            {["Next.js", "Termux", "Ollama", "n8n", "Oracle Cloud"].map((s) => (
              <span
                key={s}
                className="sidebar-link"
                style={{ cursor: "default" }}
              >
                {s}
              </span>
            ))}
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="main">
          {/* ABOUT */}
          <section id="about" className="section">
            <h2 className="section-title">{copy.nav.about}</h2>
            <p className="section-subtitle">{copy.aboutSubtitle}</p>
            <p className="about-text">{copy.aboutOne}</p>
            <p className="about-text">{copy.aboutTwo}</p>
            <div className="callout">
              <span>{copy.calloutTitle}</span>
              <br />
              {copy.calloutBody}
            </div>
            <p className="about-text">{copy.aboutThree}</p>
          </section>

          {/* SKILLS */}
          <section id="skills" className="section">
            <h2 className="section-title">{copy.nav.skills}</h2>
            <p className="section-subtitle">{copy.skillsSubtitle}</p>
            <div className="skills-grid">
              {skills.map((group) => (
                <div key={group.category} className="skill-card">
                  <div className="skill-card-title">{group.category}</div>
                  <div className="skill-tags">
                    {group.items.map((item) => (
                      <span key={item} className="tag">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ECOSYSTEM */}
          <section id="ecosystem" className="section">
            <h2 className="section-title">{copy.nav.ecosystem}</h2>
            <p className="section-subtitle">{copy.ecosystemSubtitle}</p>
            <div className="eco-grid">
              {ecosystem.map((item) => (
                <div key={item.title} className="eco-card">
                  <span className="eco-icon">{item.icon}</span>
                  <div className="eco-title">{item.title}</div>
                  <p className="eco-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* PROJECTS */}
          <section id="projects" className="section">
            <h2 className="section-title">{copy.nav.projects}</h2>
            <p className="section-subtitle">{copy.projectsSubtitle}</p>
            <div className="project-grid">
              {projects.map((project) => (
                <article key={project.title} className="project-card">
                  <div className="project-card-title">{project.title}</div>
                  <p className="project-card-desc">{project.desc}</p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="project-card-link"
                  >
                    {copy.visitSite} →
                  </a>
                </article>
              ))}
            </div>
          </section>

          {/* PHILOSOPHY */}
          <section id="philosophy" className="section">
            <h2 className="section-title">{copy.nav.philosophy}</h2>
            <p className="section-subtitle">{copy.philosophySubtitle}</p>
            <div className="philosophy-block">
              <blockquote>{copy.philosophyQuote}</blockquote>
            </div>
            <div className="philosophy-tagline">
              {copy.taglines.map((tagline) => (
                <span key={tagline} className="tagline-item">
                  {tagline}
                </span>
              ))}
            </div>
          </section>

          {/* CONTACT */}
          <section id="contact" className="section">
            <h2 className="section-title">{copy.nav.contact}</h2>
            <p className="section-subtitle">{copy.contactSubtitle}</p>
            <div className="contact-grid">
              <a
                href="https://github.com/rifani-sh"
                target="_blank"
                rel="noreferrer"
                className="contact-card"
              >
                <span className="contact-icon">⌥</span>
                <div className="contact-info">
                  <div className="contact-platform">GitHub</div>
                  <div className="contact-handle">rifani-sh</div>
                </div>
              </a>
              <a
                href="https://www.linkedin.com/in/rifani-sh"
                target="_blank"
                rel="noreferrer"
                className="contact-card"
              >
                <span className="contact-icon">⌘</span>
                <div className="contact-info">
                  <div className="contact-platform">LinkedIn</div>
                  <div className="contact-handle">rifani-sh</div>
                </div>
              </a>
              <a
                href={`https://wa.me/628977505234?text=${encodeURIComponent("hai, saya ingin berbisnis dengan anda")}`}
                target="_blank"
                rel="noreferrer"
                className="contact-card"
              >
                <span className="contact-icon">☎</span>
                <div className="contact-info">
                  <div className="contact-platform">WhatsApp</div>
                  <div className="contact-handle">{copy.contactUs}</div>
                </div>
              </a>
            </div>

            <div className="contact-form-card">
              <div className="contact-form-header">
                <div>
                  <div className="contact-form-title">{copy.inquiryTitle}</div>
                  <div className="contact-form-copy">{copy.inquiryCopy}</div>
                </div>
              </div>

              <form className="contact-form" onSubmit={handleContactSubmit}>
                <div className="contact-form-grid">
                  <label className="contact-field">
                    <span className="contact-field-label">
                      {copy.nameLabel}
                    </span>
                    <input
                      type="text"
                      name="name"
                      value={contactForm.name}
                      maxLength={80}
                      onChange={(event) =>
                        setContactForm((current) => ({
                          ...current,
                          name: event.target.value,
                        }))
                      }
                      placeholder={copy.namePlaceholder}
                      required
                    />
                  </label>

                  <label className="contact-field">
                    <span className="contact-field-label">
                      {copy.emailLabel}
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={contactForm.email}
                      maxLength={120}
                      onChange={(event) =>
                        setContactForm((current) => ({
                          ...current,
                          email: event.target.value,
                        }))
                      }
                      placeholder="you@example.com"
                      required
                    />
                  </label>
                </div>

                <label className="contact-field">
                  <span className="contact-field-label">{copy.infoLabel}</span>
                  <textarea
                    name="info"
                    value={contactForm.info}
                    maxLength={2000}
                    autoComplete="off"
                    onChange={(event) =>
                      setContactForm((current) => ({
                        ...current,
                        info: event.target.value,
                      }))
                    }
                    placeholder={copy.messagePlaceholder}
                    required
                  />
                </label>

                <div className="contact-form-actions">
                  <button
                    className="arch-submit"
                    type="submit"
                    disabled={contactStatus === "loading"}
                  >
                    {contactStatus === "loading"
                      ? copy.submittingInquiry
                      : copy.submitInquiry}
                  </button>
                  {contactMessage && (
                    <span className={`contact-form-status ${contactStatus}`}>
                      {contactMessage}
                    </span>
                  )}
                </div>
              </form>
            </div>
          </section>
        </main>
      </div>

      {/* FOOTER */}
      <footer
        className="footer"
        style={{ maxWidth: "1100px", margin: "0 auto" }}
      >
        <span>© 2026 Rifani-sh</span>
        <span style={{ color: "var(--border)" }}>|</span>
        <span style={{ color: "var(--border)" }}>|</span>
        <span style={{ color: "var(--accent)" }}>{copy.footer}</span>
      </footer>
    </div>
  );
}
