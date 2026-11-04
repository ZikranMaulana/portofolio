import React, { useState, useEffect, useRef } from "react";

const portfolioData = {
  profile: {
    name: "Zikran Maulana",
    role: "Web Developer",
    status: "Available for Hire",
    shortBio: "Membangun sistem informasi terintegrasi, arsitektur RESTful API yang scalable, dan aplikasi web modern berbasis performa tinggi.",
    avatar: "/zikran.jpg",
    contact: {
      instagram: "https://www.instagram.com/zkrn.mlna?dlrf=MWZtYnVxN3RudzE3cw==",
      github: "https://github.com/ZikranMaulana",
      linkedin: "https://www.linkedin.com/in/zikran-maulana-971046277"
    }
  },
  terminalCode: [
    { label: "name", val: '"Zikran Maulana"' },
    { label: "location", val: '"Riau, Indonesia"' },
    { label: "status", val: '"Online & Ready to Collaborate"' },
    { label: "main_stack", val: '["Laravel", "React", "REST API", "MySQL"]' },
    { label: "architecture", val: '"Clean Architecture & RBAC"' }
  ],
  stats: [
    { label: "Sistem Skala Instansi", value: "4+", detail: "SIM, PSB, POS, & Evaluasi" },
    { label: "Record Data Dikelola", value: "1,500+", detail: "Santri, Siswa & Transaksi" },
    { label: "Latency Response API", value: "<150ms", detail: "Optimized Backend Queries" },
    { label: "Otentikasi & Security", value: "RBAC", detail: "Role-Based Access Control" },
  ],
  experiences: [
    {
      period: "2026",
      role: "Web Developer Intern & Project Lead",
      institution: "Yayasan Wakaf Al-Ihsan Riau (IBS Riau)",
      description: "Memimpin refactoring panel admin, arsitektur REST API transaksi cashless santri, dan integrasi modul terpusat.",
      skills: ["Laravel", "REST API", "MySQL", "Tailwind CSS"]
    },
    {
      period: "2025 - 2026",
      role: "Tugas Akhir / Final Project",
      institution: "Politeknik Kampar",
      description: "Sistem Informasi Penilaian Kinerja Karyawan Metode 360 Derajat Berbasis Web untuk evaluasi multi-penilai.",
      skills: ["PHP", "Laravel", "MySQL", "Bootstrap"]
    },
    {
      period: "2023 - 2026",
      role: "D3 Teknik Informatika",
      institution: "Politeknik Kampar",
      description: "Penerima Beasiswa SDMPKS. Berfokus pada Rekayasa Perangkat Lunak dan Basis Data Relasional.",
      skills: ["Software Engineering", "Database Systems"]
    }
  ],
  skills: [
    { 
      category: "Backend & Systems", 
      glow: "hover:border-cyan-500/50 hover:shadow-cyan-500/20",
      items: ["PHP", "Laravel", "RESTful API", "CodeIgniter", "Livewire"] 
    },
    { 
      category: "Frontend Experience", 
      glow: "hover:border-purple-500/50 hover:shadow-purple-500/20",
      items: ["React", "JavaScript (ES6+)", "Tailwind CSS", "Bootstrap"] 
    },
    { 
      category: "Database & Infrastructure", 
      glow: "hover:border-pink-500/50 hover:shadow-pink-500/20",
      items: ["MySQL", "Supabase", "Git & GitHub", "Linux/VPS", "Postman"] 
    }
  ],
  projects: [
    {
      id: "psb-online",
      title: "Sistem PSB IBS RIAU",
      tagline: "Student Admission Portal",
      category: "Laravel",
      description: "Portal Penerimaan Santri/Siswa Baru terintegrasi: registrasi mandiri, verifikasi berkas, seleksi, hingga pengumuman kelulusan.",
      architecture: "Arsitektur modular di Laravel dengan generator nomor registrasi unik dan validasi berkas multi-tahap.",
      challenge: "Menjaga stabilitas server dan keutuhan data saat lonjakan pendaftaran massal bersamaan.",
      techStack: ["Laravel", "MySQL", "Tailwind CSS"],
      accent: "from-amber-400 to-orange-600",
      githubUrl: "https://github.com/ZikranMaulana"
    },
    {
      id: "sim-akademik",
      title: "SIM Akademik",
      tagline: "Academic Management Platform",
      category: "Laravel",
      description: "Sistem Informasi Manajemen Akademik terpadu dengan hak akses multi-role (Admin, Guru, Wali Kelas), mengelola presensi, kurikulum, dan rapor.",
      architecture: "Role-Based Access Control (RBAC) ketat dengan pemisahan otorisasi nilai dan relasi database teroptimasi.",
      challenge: "Menghitung agregasi kalkulasi bobot nilai dinamis tanpa membebani performa query database.",
      techStack: ["Laravel", "Tailwind CSS", "MySQL"],
      accent: "from-pink-500 to-rose-600",
      githubUrl: "https://github.com/ZikranMaulana"
    },
    {
      id: "api-cashless",
      title: "Cashless Transaction REST API",
      tagline: "Secure Payment Ecosystem",
      category: "Backend / API",
      description: "Backend API transaksi non-tunai kantin sekolah, manajemen saldo virtual santri, dan riwayat mutasi otomatis.",
      architecture: "RESTful API dengan otentikasi token dan isolasi transaksi ACID untuk menjamin keakuratan nominal saldo.",
      challenge: "Mencegah race condition (double spending) pada transaksi saldo saat antrean kasir kantin padat.",
      techStack: ["Laravel", "REST API", "MySQL", "Postman"],
      accent: "from-purple-500 to-indigo-600",
      githubUrl: "https://github.com/ZikranMaulana"
    },
    {
      id: "performance-360",
      title: "Sistem Penilaian Kinerja 360°",
      tagline: "Enterprise Evaluation System",
      category: "Laravel",
      description: "Platform penilaian performa multi-evaluator berbasis web yang mengkalkulasi skor objektif metode 360 derajat.",
      architecture: "Algoritma kalkulasi bobot otomatis antar penilai dengan visualisasi kompetensi spider chart.",
      challenge: "Menjaga anonimitas penilaian antar kolega kerja sekaligus menghasilkan analitik komprehensif.",
      techStack: ["Laravel", "MySQL", "Bootstrap"],
      accent: "from-cyan-500 to-blue-600",
      githubUrl: "https://github.com/ZikranMaulana"
    }
  ]
};

export default function App() {
  const { profile, terminalCode, stats, experiences, skills, projects } = portfolioData;

  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [cursorTrailing, setCursorTrailing] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState("projects"); // Tab ala referensi: projects / journey / skills
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(item => item.category === activeFilter);

  // Background Canvas: Bintang & Planet
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const STAR_COUNT = 130;
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.3,
      speed: Math.random() * 0.25 + 0.05,
      alpha: Math.random(),
      alphaChange: (Math.random() * 0.01 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      stars.forEach((star) => {
        star.y -= star.speed;
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }
        star.alpha += star.alphaChange;
        if (star.alpha <= 0.15 || star.alpha >= 0.95) star.alphaChange = -star.alphaChange;
        ctx.fillStyle = `rgba(224, 242, 254, ${Math.max(0.1, star.alpha)})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Tracking Mouse
  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    let frameId;
    const follow = () => {
      setCursorTrailing((prev) => ({
        x: prev.x + (mousePos.x - prev.x) * 0.15,
        y: prev.y + (mousePos.y - prev.y) * 0.15,
      }));
      frameId = requestAnimationFrame(follow);
    };
    frameId = requestAnimationFrame(follow);
    return () => cancelAnimationFrame(frameId);
  }, [mousePos]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      
      {/* Background Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* Cursor Neon */}
      <div 
        className="pointer-events-none fixed z-50 w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_12px_#22d3ee] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out"
        style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
      />

      {/* Navbar Minimalis */}
      <nav className="relative z-20 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2 font-mono text-lg font-bold text-white tracking-wider">
          <span className="text-cyan-400">&lt;/&gt;</span> Zikran Maulana
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-slate-400 font-medium">
          <a href="#about" className="hover:text-cyan-400 transition">About</a>
          <a href="#content-section" className="hover:text-cyan-400 transition">Portfolio</a>
          <a href={profile.contact.instagram} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500 hover:text-black transition">Contact</a>
        </div>
      </nav>

      {/* HERO SECTION LENGKAP */}
      <section id="about" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 pb-16 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Kolom Kiri: Teks & Headline */}
          <div className="lg:col-span-4 space-y-5 text-center lg:text-left z-20 order-1">
            <div className="w-12 h-1 bg-white/80 hidden lg:block mb-4" />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              I'm <span className="text-white">Zikran,</span> <br />
              <span className="text-slate-300">a Web Developer</span>
            </h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-md mx-auto lg:mx-0">
              {profile.shortBio}
            </p>
            <div className="pt-2 flex justify-center lg:justify-start">
              <a 
                href="#content-section"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-600 hover:bg-cyan-500 text-white hover:text-black flex items-center justify-center shadow-lg shadow-blue-600/30 transition-all duration-300 hover:scale-110"
              >
                <span className="text-lg sm:text-xl">↓</span>
              </a>
            </div>
          </div>

          {/* Kolom Tengah: Foto Portrait */}
          <div className="lg:col-span-5 flex justify-center items-end relative min-h-[360px] sm:min-h-[460px] lg:min-h-[560px] z-10 overflow-hidden order-2">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 sm:w-72 h-64 sm:h-72 bg-gradient-to-tr from-cyan-500/20 to-blue-600/20 blur-[80px] rounded-full pointer-events-none" />
            <div className="relative w-full max-w-[300px] sm:max-w-[360px] lg:max-w-[420px] h-[400px] sm:h-[480px] lg:h-[560px] flex items-end justify-center">
              <img 
                src={profile.avatar} 
                alt={profile.name}
                onError={(e) => { e.target.onerror = null; e.target.src = "/profile.jpg"; }}
                className="w-full h-full object-cover object-top filter contrast-[1.05] brightness-95"
              />
              <div className="absolute inset-x-0 bottom-0 h-32 sm:h-44 bg-gradient-to-t from-[#030712] via-[#030712]/90 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Kolom Kanan: Terminal Code & Follow Me */}
          <div className="lg:col-span-3 space-y-6 text-center lg:text-left z-20 order-3">
            <div className="space-y-1">
              <h3 className="text-xs font-mono uppercase tracking-widest text-slate-300 font-bold">About Me</h3>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto lg:mx-0">
                Lulusan D3 Teknik Informatika Politeknik Kampar dengan spesialisasi backend, arsitektur REST API, dan basis data relasional.
              </p>
            </div>

            <div className="max-w-sm mx-auto lg:mx-0 rounded-xl bg-slate-950/90 border border-slate-800 shadow-2xl backdrop-blur-md overflow-hidden text-left font-mono text-xs">
              <div className="flex items-center justify-between px-3.5 py-2 bg-slate-900/80 border-b border-slate-800">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-slate-500 text-[10px]">bash ~ config.json</span>
              </div>
              <div className="p-3.5 space-y-1 text-slate-300 text-[11px] leading-tight">
                {terminalCode.map((line) => (
                  <p key={line.label} className="break-all">
                    <span className="text-cyan-400">"{line.label}"</span>: <span className="text-amber-300">{line.val}</span>,
                  </p>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <h3 className="text-xs font-mono uppercase tracking-widest text-slate-300 font-bold">Follow Me</h3>
              <div className="flex justify-center lg:justify-start items-center gap-4 text-slate-400">
                <a href={profile.contact.github} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition font-mono text-xs">GitHub</a>
                <a href={profile.contact.linkedin} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition font-mono text-xs">LinkedIn</a>
                <a href={profile.contact.instagram} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition font-mono text-xs">Instagram</a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* STATS METRICS */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((item, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md text-center space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
                {item.value}
              </div>
              <div className="text-xs font-semibold text-slate-200">{item.label}</div>
              <div className="text-[11px] text-slate-500 font-mono">{item.detail}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PORTFOLIO TAB SECTION (Ala Referensi Alfari dengan Tab Navigasi Atas) */}
      <div id="content-section" className="relative z-10 max-w-6xl mx-auto px-6 py-12 space-y-10">
        <div className="flex flex-col items-center text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Portfolio</h2>
          
          {/* Tombol Tab Navigasi Utama */}
          <div className="flex flex-wrap justify-center gap-2 p-1.5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
            <button
              onClick={() => setActiveTab("projects")}
              className={`px-5 py-2 text-xs font-mono font-semibold rounded-xl transition-all ${
                activeTab === "projects" ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25" : "text-slate-400 hover:text-white"
              }`}
            >
              📂 Projects
            </button>
            <button
              onClick={() => setActiveTab("journey")}
              className={`px-5 py-2 text-xs font-mono font-semibold rounded-xl transition-all ${
                activeTab === "journey" ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25" : "text-slate-400 hover:text-white"
              }`}
            >
              🎓 Education & Experience
            </button>
            <button
              onClick={() => setActiveTab("skills")}
              className={`px-5 py-2 text-xs font-mono font-semibold rounded-xl transition-all ${
                activeTab === "skills" ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25" : "text-slate-400 hover:text-white"
              }`}
            >
              ⚡ Tech Stack & Arsenal
            </button>
          </div>
        </div>

        {/* KONTEN TAB 1: PROJECTS (Dengan Filter Kategori) */}
        {activeTab === "projects" && (
          <div className="space-y-6 animate-fadeIn">
            {/* Sub-Filter Kategori Proyek */}
            <div className="flex justify-center gap-2">
              {["All", "Laravel", "Backend / API"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-3.5 py-1.5 text-xs font-mono rounded-xl transition-all ${
                    activeFilter === cat ? "bg-blue-600 text-white font-bold" : "bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {filteredProjects.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => setSelectedProject(item)}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="group relative rounded-2xl bg-slate-900/60 backdrop-blur-md border border-slate-800/80 p-6 flex flex-col justify-between hover:border-cyan-500/65 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/15 cursor-pointer overflow-hidden"
                >
                  <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${item.accent} opacity-40 group-hover:opacity-100 transition-opacity duration-300`} />
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-500 group-hover:text-cyan-400">{item.tagline}</span>
                      <span className="text-[11px] font-mono text-cyan-400 opacity-0 group-hover:opacity-100">Inspect System ↗</span>
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-200">{item.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                  </div>
                  <div className="pt-6 space-y-4">
                    <div className="flex flex-wrap gap-1.5">
                      {item.techStack.map((tech) => (
                        <span key={tech} className="px-2.5 py-1 text-xs font-mono text-slate-300 bg-slate-800/80 border border-slate-700/60 rounded-md">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-cyan-300">
                      <span>Lihat Blueprint & Solusi</span>
                      <span>→</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* KONTEN TAB 2: JOURNEY / PENDIDIKAN & PENGALAMAN */}
        {activeTab === "journey" && (
          <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn">
            <div className="relative border-l border-slate-800/80 pl-6 sm:pl-8 ml-2 sm:ml-4 space-y-10">
              {experiences.map((exp, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-400 group-hover:border-teal-300 transition-all shadow-[0_0_10px_#22d3ee]" />
                  <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span className="text-xs font-mono text-cyan-400 font-semibold">{exp.period}</span>
                      <span className="text-xs font-mono text-slate-500">{exp.institution}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{exp.description}</p>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {exp.skills.map((s) => (
                        <span key={s} className="px-2 py-0.5 text-[11px] font-mono text-slate-400 bg-slate-800/60 rounded">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* KONTEN TAB 3: SKILLS / TECH STACK */}
        {activeTab === "skills" && (
          <div className="grid gap-6 sm:grid-cols-3 animate-fadeIn">
            {skills.map((group) => (
              <div key={group.category} className={`p-6 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-slate-800 ${group.glow}`}>
                <h3 className="text-base font-semibold text-white tracking-wide mb-4">{group.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span key={skill} className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800/60 border border-slate-700/40 rounded-lg">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* MODAL DETAIL PROYEK */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md" onClick={() => setSelectedProject(null)}>
          <div className="relative w-full max-w-2xl max-h-[88vh] flex flex-col rounded-2xl bg-slate-900/95 border border-slate-700/80 shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between p-5 sm:p-6 border-b border-slate-800 bg-slate-900/90">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">{selectedProject.tagline}</span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">{selectedProject.title}</h3>
              </div>
              <button onClick={() => setSelectedProject(null)} className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white">✕</button>
            </div>
            <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-slate-300">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-1">Ringkasan Sistem</h4>
                <p className="text-sm leading-relaxed">{selectedProject.description}</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/90 space-y-1">
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">⚡ Arsitektur & Pendekatan Teknis</h4>
                <p className="text-xs sm:text-sm">{selectedProject.architecture}</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/90 space-y-1">
                <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">🛠 Tantangan & Solusi</h4>
                <p className="text-xs sm:text-sm">{selectedProject.challenge}</p>
              </div>
            </div>
            <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-900/90 flex justify-end gap-3">
              <a href={selectedProject.githubUrl} target="_blank" rel="noreferrer" className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold">Buka GitHub</a>
              <button onClick={() => setSelectedProject(null)} className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-semibold">Tutup</button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="pt-12 pb-8 border-t border-slate-800/80 text-center text-xs text-slate-500 font-mono">
        © {new Date().getFullYear()} {profile.name}. Crafted with React & Tailwind CSS.
      </footer>

    </div>
  );
}