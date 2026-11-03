export const portfolioData = {
  profile: {
    name: "Zikran Maulana",
    role: "Full-Stack Web Developer",
    bio: "Focused on building reliable backend APIs, clean database architecture, and modern web applications.",
    contact: {
      email: "maulanazikran602@gmail.com",
      github: "https://github.com/ZikranMaulana",
      linkedin: "https://www.linkedin.com/in/zikran-maulana-971046277"
    }
  },
  skills: [
    { category: "Backend", items: ["PHP", "Laravel", "RESTful API", "CodeIgniter"] },
    { category: "Frontend", items: ["React", "JavaScript", "Tailwind CSS", "Bootstrap"] },
    { category: "Database & Tools", items: ["MySQL", "Git", "Postman", "Linux/VPS"] }
  ],
  projects: [
    {
      id: "performance-360",
      title: "Sistem Penilaian Kinerja 360°",
      description: "Aplikasi penilaian kinerja karyawan berbasis web dengan evaluasi multi-evaluator yang transparan.",
      techStack: ["Laravel", "MySQL", "Bootstrap"],
      githubUrl: "https://github.com/ZikranMaulana",
      liveUrl: ""
    },
    {
      id: "api-cashless",
      title: "Cashless Transaction REST API",
      description: "Backend API ekosistem transaksi non-tunai, akun virtual siswa, dan validasi transaksi kantin.",
      techStack: ["Laravel", "RESTful API", "MySQL"],
      githubUrl: "https://github.com/ZikranMaulana",
      liveUrl: ""
    },
    {
      id: "e-raport",
      title: "Sistem e-Raport Sekolah",
      description: "Platform pelaporan nilai digital berbasis web dengan otentikasi role-based access control.",
      techStack: ["Laravel", "Tailwind CSS", "MySQL"],
      githubUrl: "https://github.com/ZikranMaulana",
      liveUrl: ""
    }
  ]
};