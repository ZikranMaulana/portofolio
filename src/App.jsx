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
  const [selectedProject, setSelectedProject] = useState(null);
  
  // Tab ala referensi: "projects" | "journey" | "skills"
  const [activeTab, setActiveTab] = useState("projects"); 

  // Background Canvas Bintang
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

    const STAR_COUNT = 120;
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.6 + 0.3,
      speed: Math.random() * 0.2 + 0.05,
      alpha: Math.random(),
      alphaChange: (Math.random() * 0.01 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
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
        if (star.alpha <= 0.1 || star.alpha >= 0.9) star.alphaChange = -star.alphaChange;
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

  // Tracking Mouse untuk Spotlight
  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">
      
      {/* Background Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* Spotlight Effect */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(37, 99, 235, 0.06), transparent 80%)`
        }}
      />

      {/* Navbar Atas */}
      <nav className="relative z-20 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2 font-mono text-lg font-bold text-white tracking-wider">
          <span className="text-blue-500">&lt;/&gt;</span> Zikran Maulana
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-slate-400 font-medium">
          <a href="#about" className="hover:text-blue-400 transition">About</a>
          <a href="#portfolio-section" className="hover:text-blue-400 transition">Portfolio</a>
          <a href={profile.contact.instagram} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-xl bg-blue-600/10 text-blue-400 border border-blue-500/30 hover:bg-blue-600 hover:text-white transition">Contact</a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="about" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-4 sm:pt-8 pb-12 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          <div className="lg:col-span-4 space-y-5 text-center lg:text-left z-20 order-1">
            <div className="w-12 h-1 bg-white/80 hidden lg:block mb-4" />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              I'm <span className="text-white">Zikran,</span> <br />
              <span className="text-slate-400">a Web Developer</span>
            </h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-md mx-auto lg:mx-0">
              {profile.shortBio}
            </p>
            <div className="pt-2 flex justify-center lg:justify-start">
              <a 
                href="#portfolio-section"
                className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-600/30 transition-all duration-300 hover:scale-110"
              >
                <span>↓</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center items-end relative min-h-[360px] sm:min-h-[460px] lg:min-h-[520px] z-10 overflow-hidden order-2">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-600/15 blur-[90px] rounded-full pointer-events-none" />
            <div className="relative w-full max-w-[300px] sm:max-w-[360px] h-[400px] sm:h-[480px] flex items-end justify-center">
              <img 
                src={profile.avatar} 
                alt={profile.name}
                onError={(e) => { e.target.onerror = null; e.target.src = "/profile.jpg"; }}
                className="w-full h-full object-cover object-top filter contrast-[1.05] brightness-95"
              />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#030712] via-[#030712]/80 to-transparent pointer-events-none" />
            </div>
          </div>

          <div className="lg:col-span-3 space-y-6 text-center lg:text-left z-20 order-3">
            <div className="space-y-1">
              <h3 className="text-xs font-mono uppercase tracking-widest text-slate-300 font-bold">About Me</h3>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto lg:mx-0">
                Lulusan D3 Teknik Informatika Politeknik Kampar dengan spesialisasi backend, arsitektur REST API, dan basis data relasional.
              </p>
            </div>

            <div className="max-w-sm mx-auto lg:mx-0 rounded-xl bg-slate-950/90 border border-slate-800 shadow-2xl overflow-hidden text-left font-mono text-xs">
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
                    <span className="text-blue-400">"{line.label}"</span>: <span className="text-amber-300">{line.val}</span>,
                  </p>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <h3 className="text-xs font-mono uppercase tracking-widest text-slate-300 font-bold">Follow Me</h3>
              <div className="flex justify-center lg:justify-start items-center gap-4 text-slate-400 text-xs font-mono">
                <a href={profile.contact.github} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition">GitHub</a>
                <a href={profile.contact.linkedin} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition">LinkedIn</a>
                <a href={profile.contact.instagram} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition">Instagram</a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* STATS METRICS */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md text-center space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                {item.value}
              </div>
              <div className="text-xs font-semibold text-slate-200">{item.label}</div>
              <div className="text-[11px] text-slate-500 font-mono">{item.detail}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PORTFOLIO SECTION UTAMA (Gaya Tab Kartu Atas Ala Alfari) */}
      <div id="portfolio-section" className="relative z-10 max-w-5xl mx-auto px-6 py-12 space-y-8">
        <div className="text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">Portfolio</h2>
          
          {/* Menu Tab Navigasi Atas (Persis ala referensi) */}
          <div className="inline-flex flex-wrap justify-center gap-2 p-2 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
            <button
              onClick={() => setActiveTab("projects")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                activeTab === "projects" 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" 
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              <span>📁</span> Projects
            </button>
            <button
              onClick={() => setActiveTab("journey")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                activeTab === "journey" 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" 
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              <span>🎓</span> Education & Journey
            </button>
            <button
              onClick={() => setActiveTab("skills")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                activeTab === "skills" 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" 
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              <span>⚡</span> Tech Stack
            </button>
          </div>
        </div>

        {/* KONTEN TAB 1: PROJECTS */}
        {activeTab === "projects" && (
          <div className="grid gap-6 md:grid-cols-2 pt-4">
            {projects.map((item) => (
              <div 
                key={item.id} 
                onClick={() => setSelectedProject(item)}
                className="group relative rounded-2xl bg-slate-900/50 border border-slate-800/80 p-6 flex flex-col justify-between hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-blue-500/10 cursor-pointer overflow-hidden backdrop-blur-md"
              >
                <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${item.accent} opacity-40 group-hover:opacity-100 transition-opacity`} />
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-500 group-hover:text-blue-400">{item.tagline}</span>
                    <span className="text-[11px] font-mono text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">Details →</span>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-200 transition-colors">{item.title}</h3>
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
                  <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-blue-300">
                    <span>Inspect System</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* KONTEN TAB 2: EDUCATION & JOURNEY */}
        {activeTab === "journey" && (
          <div className="max-w-2xl mx-auto pt-4 space-y-6">
            <div className="relative border-l border-slate-800 pl-6 space-y-8 ml-2">
              {experiences.map((exp, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-slate-950 border-2 border-blue-500 group-hover:scale-125 transition-transform shadow-[0_0_8px_#3b82f6]" />
                  <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-2 backdrop-blur-md">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-mono text-blue-400 font-semibold">{exp.period}</span>
                      <span className="text-xs font-mono text-slate-500">{exp.institution}</span>
                    </div>
                    <h3 className="text-base font-bold text-white">{exp.role}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* KONTEN TAB 3: TECH STACK */}
        {activeTab === "skills" && (
          <div className="grid gap-6 sm:grid-cols-3 pt-4">
            {skills.map((group) => (
              <div key={group.category} className={`p-6 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-md ${group.glow}`}>
                <h3 className="text-sm font-semibold text-white tracking-wide mb-4">{group.category}</h3>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md" onClick={() => setSelectedProject(null)}>
          <div className="relative w-full max-w-xl max-h-[85vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between p-5 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-blue-400">{selectedProject.tagline}</span>
                <h3 className="text-xl font-bold text-white">{selectedProject.title}</h3>
              </div>
              <button onClick={() => setSelectedProject(null)} className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white">✕</button>
            </div>
            <div className="p-5 overflow-y-auto space-y-4 text-slate-300 text-xs sm:text-sm">
              <p className="leading-relaxed">{selectedProject.description}</p>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <h4 className="font-mono uppercase text-blue-400 font-bold text-[11px]">Arsitektur & Pendekatan Teknis</h4>
                <p>{selectedProject.architecture}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <h4 className="font-mono uppercase text-amber-400 font-bold text-[11px]">Tantangan & Solusi</h4>
                <p>{selectedProject.challenge}</p>
              </div>
            </div>
            <div className="p-4 border-t border-slate-800 bg-slate-900/90 flex justify-end gap-3">
              <a href={selectedProject.githubUrl} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold">GitHub</a>
              <button onClick={() => setSelectedProject(null)} className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold">Tutup</button>
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