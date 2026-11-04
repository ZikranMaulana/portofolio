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
      category: "Laravel", // Tambahkan kategori
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
      category: "Laravel", // Tambahkan kategori
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
      category: "Backend / API", // Tambahkan kategori
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
      category: "Laravel", // Tambahkan kategori
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
  const [activeFilter, setActiveFilter] = useState("All");
  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(item => item.category === activeFilter);

  // Scroll Reveal Observer (Animasi Muncul Saat Discroll)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = document.querySelectorAll(".reveal-item");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Background Canvas: Bintang, Meteor & Planet
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

    const planets = [
      {
        x: width * 0.9,
        y: height * 0.22,
        radius: 36,
        color: "#6366f1",
        glow: "rgba(99, 102, 241, 0.4)",
        hasRing: true,
        angle: 0,
        speed: 0.0006,
        orbitX: 25,
        orbitY: 15,
      },
      {
        x: width * 0.08,
        y: height * 0.78,
        radius: 22,
        color: "#06b6d4",
        glow: "rgba(6, 182, 212, 0.35)",
        hasRing: false,
        angle: Math.PI,
        speed: 0.0009,
        orbitX: 18,
        orbitY: 12,
      },
    ];

    let meteor = { x: Math.random() * width, y: 0, length: 120, speed: 12, active: true };

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

      if (meteor.active) {
        ctx.save();
        const grad = ctx.createLinearGradient(meteor.x, meteor.y, meteor.x - meteor.length, meteor.y - meteor.length * 0.6);
        grad.addColorStop(0, "rgba(255, 255, 255, 0.9)");
        grad.addColorStop(1, "rgba(34, 211, 238, 0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(meteor.x, meteor.y);
        ctx.lineTo(meteor.x - meteor.length, meteor.y - meteor.length * 0.6);
        ctx.stroke();
        ctx.restore();

        meteor.x += meteor.speed;
        meteor.y += meteor.speed * 0.6;
        if (meteor.x > width + 200 || meteor.y > height + 200) {
          meteor.active = false;
          setTimeout(() => {
            meteor.x = Math.random() * (width * 0.8);
            meteor.y = -50;
            meteor.active = true;
          }, Math.random() * 5000 + 3500);
        }
      }

      planets.forEach((p) => {
        p.angle += p.speed;
        const currentX = p.x + Math.sin(p.angle) * p.orbitX;
        const currentY = p.y + Math.cos(p.angle) * p.orbitY;

        const radialGlow = ctx.createRadialGradient(currentX, currentY, p.radius * 0.2, currentX, currentY, p.radius * 2.2);
        radialGlow.addColorStop(0, p.glow);
        radialGlow.addColorStop(1, "transparent");
        ctx.fillStyle = radialGlow;
        ctx.beginPath();
        ctx.arc(currentX, currentY, p.radius * 2.2, 0, Math.PI * 2);
        ctx.fill();

        const planetGrad = ctx.createRadialGradient(
          currentX - p.radius * 0.35,
          currentY - p.radius * 0.35,
          p.radius * 0.1,
          currentX,
          currentY,
          p.radius
        );
        planetGrad.addColorStop(0, "#ffffff");
        planetGrad.addColorStop(0.3, p.color);
        planetGrad.addColorStop(1, "#030712");
        ctx.fillStyle = planetGrad;
        ctx.beginPath();
        ctx.arc(currentX, currentY, p.radius, 0, Math.PI * 2);
        ctx.fill();

        if (p.hasRing) {
          ctx.save();
          ctx.translate(currentX, currentY);
          ctx.rotate(-Math.PI / 6);
          ctx.beginPath();
          ctx.ellipse(0, 0, p.radius * 2.2, p.radius * 0.55, 0, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(165, 180, 252, 0.45)";
          ctx.lineWidth = 3;
          ctx.stroke();
          ctx.restore();
        }
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
      <div 
        className={`pointer-events-none fixed z-40 rounded-full border border-cyan-400/60 -translate-x-1/2 -translate-y-1/2 transition-[width,height,background-color,border-color] duration-300 ease-out ${
          isHovered 
            ? "w-16 h-16 bg-cyan-400/15 border-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.3)] backdrop-blur-[1px]" 
            : "w-8 h-8 bg-transparent"
        }`}
        style={{ left: `${cursorTrailing.x}px`, top: `${cursorTrailing.y}px` }}
      />

      {/* Spotlight */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(56, 189, 248, 0.07), transparent 80%)`
        }}
      />

      {/* Navbar Minimalis */}
      <nav className="relative z-20 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2 font-mono text-lg font-bold text-white tracking-wider">
          <span className="text-cyan-400">&lt;/&gt;</span> Zikran Maulana
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-slate-400 font-medium">
          <a href="#about" className="hover:text-cyan-400 transition">About</a>
          <a href="#projects" className="hover:text-cyan-400 transition">Projects</a>
          <a href="#journey" className="hover:text-cyan-400 transition">Journey</a>
          <a 
            href={profile.contact.instagram} 
            target="_blank" 
            rel="noreferrer" 
            className="px-4 py-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500 hover:text-black transition"
          >
            Contact
          </a>
        </div>
      </nav>

      {/* HERO SECTION RESPONSIF */}
      <section id="about" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 pb-16 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Kolom Kiri: Teks & Headline Utama */}
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
                href="#projects"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-600 hover:bg-cyan-500 text-white hover:text-black flex items-center justify-center shadow-lg shadow-blue-600/30 transition-all duration-300 hover:scale-110"
              >
                <span className="text-lg sm:text-xl">↓</span>
              </a>
            </div>
          </div>

          {/* Kolom Tengah: Foto Portrait Besar dengan Fade to Dark */}
          <div className="lg:col-span-5 flex justify-center items-end relative min-h-[360px] sm:min-h-[460px] lg:min-h-[560px] z-10 overflow-hidden order-2">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 sm:w-72 h-64 sm:h-72 bg-gradient-to-tr from-cyan-500/20 to-blue-600/20 blur-[80px] rounded-full pointer-events-none" />

            <div 
              className="relative w-full max-w-[300px] sm:max-w-[360px] lg:max-w-[420px] h-[400px] sm:h-[480px] lg:h-[560px] flex items-end justify-center"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img 
                src={profile.avatar} 
                alt={profile.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/profile.jpg";
                }}
                className="w-full h-full object-cover object-top filter contrast-[1.05] brightness-95"
              />

              {/* FADING MASKING: Memudar Halus ke Gelap */}
              <div className="absolute inset-x-0 bottom-0 h-32 sm:h-44 bg-gradient-to-t from-[#030712] via-[#030712]/90 to-transparent pointer-events-none" />
              <div className="absolute inset-y-0 left-0 w-6 sm:w-8 bg-gradient-to-r from-[#030712] to-transparent pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-6 sm:w-8 bg-gradient-to-l from-[#030712] to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Kolom Kanan: Info & Console Code Box */}
          <div className="lg:col-span-3 space-y-6 text-center lg:text-left z-20 order-3">
            <div className="space-y-1">
              <h3 className="text-xs font-mono uppercase tracking-widest text-slate-300 font-bold">About Me</h3>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto lg:mx-0">
                Lulusan D3 Teknik Informatika dengan spesialisasi backend, arsitektur REST API, dan basis data relasional.
              </p>
            </div>

            {/* Terminal Console */}
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
                <p className="text-slate-500 text-[10px] mb-1.5">$ inspect developer</p>
                {terminalCode.map((line) => (
                  <p key={line.label} className="break-all">
                    <span className="text-cyan-400">"{line.label}"</span>: <span className="text-amber-300">{line.val}</span>,
                  </p>
                ))}
                <p className="pt-1 flex items-center text-slate-400 text-[10px]">
                  <span className="text-emerald-400 mr-1.5">➜</span> status: 200 OK <span className="inline-block w-1.5 h-3 ml-1 bg-cyan-400 animate-pulse"></span>
                </p>
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

      {/* Konten Bagian Bawah dengan Scroll Reveal Animation */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 space-y-24">

        {/* Stats Metrics (Reveal on Scroll) */}
        <section className="reveal-item grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((item, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md text-center space-y-1 hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
                {item.value}
              </div>
              <div className="text-xs font-semibold text-slate-200">{item.label}</div>
              <div className="text-[11px] text-slate-500 font-mono">{item.detail}</div>
            </div>
          ))}
        </section>

        {/* Projects Showcase dengan Tombol Filter Interaktif */}
        <section id="projects" className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-block text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">Portfolio Showcase</div>
              <h2 className="text-3xl font-bold tracking-tight text-white">Proyek Unggulan</h2>
            </div>
            
            {/* Tombol Kategori Filter */}
            <div className="flex flex-wrap gap-2">
              {["All", "Laravel", "Backend / API"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-3.5 py-1.5 text-xs font-mono rounded-xl transition-all duration-300 ${
                    activeFilter === cat
                      ? "bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/25"
                      : "bg-slate-900/80 text-slate-400 border border-slate-800 hover:border-cyan-500/40 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {filteredProjects.map((item, index) => (
              <div 
                key={item.id} 
                onClick={() => setSelectedProject(item)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                // Hapus kelas "reveal-item" dari sini agar kartu tidak transparan/hilang saat difilter
                className="group relative rounded-2xl bg-slate-900/60 backdrop-blur-md border border-slate-800/80 p-6 flex flex-col justify-between hover:border-cyan-500/65 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/15 cursor-pointer overflow-hidden"
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${item.accent} opacity-40 group-hover:opacity-100 transition-opacity duration-300`} />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-500 group-hover:text-cyan-400 transition-colors">
                      {item.tagline}
                    </span>
                    <span className="text-[11px] font-mono text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      Inspect System ↗
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {item.techStack.map((tech) => (
                      <span 
                        key={tech} 
                        className="px-2.5 py-1 text-xs font-mono text-slate-300 bg-slate-800/80 border border-slate-700/60 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-cyan-300 transition-colors">
                    <span>Lihat Blueprint & Solusi</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section (Reveal on Scroll) */}
        <section className="reveal-item space-y-8">
          <div>
            <div className="inline-block text-xs font-mono uppercase tracking-widest text-purple-400 mb-2">Arsenal</div>
            <h2 className="text-3xl font-bold tracking-tight text-white">Keahlian & Teknologi</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {skills.map((group) => (
              <div 
                key={group.category} 
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`p-6 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-slate-800 transition-all duration-300 hover:shadow-lg ${group.glow}`}
              >
                <h3 className="text-base font-semibold text-white tracking-wide mb-4">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span 
                      key={skill} 
                      className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800/60 hover:bg-slate-700/80 border border-slate-700/40 rounded-lg transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Modal Popup Detail Proyek Responsif */}
        {selectedProject && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md transition-opacity"
            onClick={() => setSelectedProject(null)}
          >
            <div 
              className="relative w-full max-w-2xl max-h-[88vh] flex flex-col rounded-2xl bg-slate-900/95 border border-slate-700/80 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Modal (Sticky di Atas) */}
              <div className="flex items-start justify-between p-5 sm:p-6 border-b border-slate-800 bg-slate-900/90 backdrop-blur-sm">
                <div className="space-y-1 pr-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                    {selectedProject.tagline}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {selectedProject.title}
                  </h3>
                </div>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition shrink-0"
                  aria-label="Tutup modal"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Body Modal (Bisa Di-scroll Secara Mandiri jika Layar Kecil) */}
              <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-slate-300">
                <div className="space-y-1.5">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                    Ringkasan Sistem
                  </h4>
                  <p className="text-sm leading-relaxed text-slate-300">
                    {selectedProject.description}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/90 space-y-1.5">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
                    <span>⚡</span> Arsitektur & Pendekatan Teknis
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {selectedProject.architecture}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/90 space-y-1.5">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                    <span>🛠</span> Tantangan & Solusi
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {selectedProject.challenge}
                  </p>
                </div>

                {/* Tags Teknologi */}
                <div className="space-y-1.5 pt-1">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                    Tech Stack Digunakan
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech) => (
                      <span 
                        key={tech} 
                        className="px-2.5 py-1 text-xs font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-800/40 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Modal (Sticky di Bawah) */}
              <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-900/90 flex flex-wrap items-center justify-end gap-3">
                <a 
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto text-center px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
                >
                  Buka Repositori GitHub
                </a>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-semibold transition"
                >
                  Tutup
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="pt-8 border-t border-slate-800/80 text-center text-xs text-slate-500 font-mono">
          © {new Date().getFullYear()} {profile.name}. Crafted with React & Tailwind CSS.
        </footer>

      </div>
    </div>
  );
}