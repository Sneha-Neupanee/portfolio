import React, { useEffect, useRef, useState, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import "../styles/ParticlePlayground.css";
import demoSvg from "../assets/demo.svg";

/* ─── 3D Model ───────────────────────── */
function Model({ path }) {
  const gltf = useGLTF(path);
  const { actions } = useAnimations(gltf.animations, gltf.scene);
  useEffect(() => {
    if (actions) Object.values(actions).forEach((a) => a.play());
  }, [actions]);

  return <primitive object={gltf.scene} scale={1.6} position={[0, -0.8, 0]} />;
}

function ModelViewer({ width, height }) {
  return (
    <div style={{ width: width, height: height, flexShrink: 0 }}>
      <Canvas
        camera={{ position: [0, 1.2, 3.5], fov: 55 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true }}
      >
        <ambientLight intensity={2} />
        <directionalLight position={[5, 5, 5]} intensity={3} />
        <directionalLight position={[-5, 5, -5]} intensity={1.5} />
        <pointLight position={[0, 5, 0]} intensity={2} />
        <Suspense fallback={null}>
          <Model path="/models/model.glb" />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          target={[0, 0.5, 0]}
        />
      </Canvas>
    </div>
  );
}

/* ─── Project data ──────────────────────────────────────────── */
const FRONTEND_PROJECTS = [
  {
    id: 1,
    name: "Dr. Priyanka's Clinic",
    image: "/drpriyanka.png",
    link: "https://drpriyankasclinic.com/",
    desc: "A clean, trust-building website for a medical clinic appointment info, services, and a welcoming patient experience.",
  },
  {
    id: 2,
    name: "Kathmandu School Map",
    image: "/kathmandu.png",
    link: "https://kathmandu-school-map.vercel.app/",
    desc: "Interactive map and analytics dashboard for exploring Kathmandu Valley schools vector maps, clustering, heatmaps, area analysis, and aggregate statistics.",
  },
  {
    id: 3,
    name: "TACKLES",
    image: "/handyman.png",
    link: "https://myhandymanfolder.vercel.app/",
    desc: "A vibrant, appetite-first landing page with bold visuals and a seamless menu browsing experience.",
  },
];

const BACKEND_PROJECTS = [
  {
    id: 1,
    name: "HR Desk",
    image: "/employee.png",
    link: "http://snehaneupane.kesug.com/public/login",
    github: "https://github.com/Sneha-Neupanee/employees-management-using-laravel",
    tech: ["Laravel", "PHP", "MySQL", "Sanctum", "Blade", "TailwindCSS", "Alpine.js"],
    desc: "Role-based Employee Management System for internal HR operations covering attendance tracking, leave approvals, department CRUD, and a Sanctum-protected REST API built with clean Laravel architecture.",
  },
  {
    id: 2,
    name: "K Handyman",
    image: "/k-handyman.png",
    link: "https://mernhandymanfinal.vercel.app/",
    github: "https://github.com/Sneha-Neupanee/mernhandymanfinal",
    tech: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Socket.IO",
      "Leaflet",
      "JWT",
    ],
    desc: "Full-stack MERN marketplace connecting homeowners with skilled handymen. Real-time chat, Bayesian provider ranking, interactive maps, and end-to-end service management.",
  },
  {
    id: 3,
    name: "SmartSales AI Assistant",
    image: "/smart.png",
    link: "https://smart-sales-with-ai-assistant.vercel.app/",
    github: "https://github.com/Sneha-Neupanee/SmartSales-with-AI-Assistant",
    tech: ["React", "Python", "FastAPI", "TensorFlow", "OpenAI API", "Pandas"],
    desc: "AI-powered sales analytics platform with ML forecasting, natural language queries, OpenAI insights, and a live dashboard React frontend backed by Python FastAPI.",
  },
];

/* ─── Scroll-reveal hook ─────────────────────────────────────── */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ─── Project card ───────────────────────────────────────────── */
const ProjectCard = ({ project, index }) => {
  const [ref, visible] = useReveal();

  return (
    <div
      ref={ref}
      className={`pp-project-card ${visible ? "pp-visible" : ""}`}
      style={{ transitionDelay: `${index * 140}ms` }}
    >
      <div className="pp-card-img-wrap">
        <img
          src={project.image}
          alt={project.name}
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/480x260/FFB6C1/fff?text=" +
              encodeURIComponent(project.name);
          }}
        />
      </div>
      <div className="pp-card-body">
        <h4 className="pp-card-title">{project.name}</h4>
        <p className="pp-card-desc">{project.desc}</p>
        {project.tech && (
          <div className="pp-tech-row">
            {project.tech.map((t) => (
              <span key={t} className="pp-tech-badge">
                {t}
              </span>
            ))}
          </div>
        )}
        <div className="pp-card-actions">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="custom-btn btn-primary pp-btn"
          >
            Live Demo
          </a>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="custom-btn btn-secondary pp-btn"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─── Main component ─────────────────────────────────────────── */
const ParticlePlayground = () => {
  const navigate = useNavigate();
  const [headerRef, headerVisible] = useReveal();
  const [threeDRef, threeDVisible] = useReveal();
  const [feRef,     feVisible]     = useReveal();
  const [beRef,     beVisible]     = useReveal();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile     = windowWidth < 768;
  const canvasWidth  = isMobile ? Math.min(windowWidth * 0.62, 320) : 400;
  const canvasHeight = isMobile ? Math.min(windowWidth * 0.72, 380) : 500;
  const demoImgWidth = isMobile ? 100 : 180;
  const demoMarginTop = isMobile ? "-15px" : "15px";

  return (
    <section className="pp-skills-section">

      {/* ── "My Skills" heading ── */}
      <div
        ref={headerRef}
        className={`pp-section-label ${headerVisible ? "pp-visible" : ""}`}
      >
        <span className="pp-label-line" />
        <h1 className="pp-section-main-title">
          My <span className="pp-pink">Skills</span>
        </h1>
        <span className="pp-label-line" />
      </div>

      {/* ── 01. 3D Modeling & Animation ── */}
      <div
        ref={threeDRef}
        className={`pp-skill-block ${threeDVisible ? "pp-visible" : ""}`}
      >
        <div className="pp-skill-heading-row">
          <span className="pp-skill-number">01.</span>
          <h2 className="pp-skill-title">
            3D Modeling <span className="pp-pink">&amp;</span> Animation
          </h2>
        </div>

        <div
          className="pp-3d-space"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "center",
            gap: isMobile ? "8px" : "24px",
          }}
        >
          <ModelViewer width={canvasWidth} height={canvasHeight} />
          <div style={{ marginTop: demoMarginTop, flexShrink: 0 }}>
            <img
              src={demoSvg}
              alt="demo"
              style={{ width: demoImgWidth, height: "auto", display: "block" }}
            />
          </div>
        </div>

        <div className="pp-skill-desc-row">
          <p className="pp-skill-desc">
            I use <strong>Blender</strong> to sculpt, rig, and animate 3D
            models from character design to product visualisation. My workflow
            covers full scene lighting, material shading, and render-ready
            exports that embed seamlessly into web experiences.
          </p>
        </div>
      </div>

      <div className="pp-divider" />

      {/* ── 02. Front-end & UI/UX ── */}
      <div
        ref={feRef}
        className={`pp-skill-block ${feVisible ? "pp-visible" : ""}`}
      >
        <div className="pp-skill-heading-row">
          <span className="pp-skill-number">02.</span>
          <h2 className="pp-skill-title">
            Front&#8209;end <span className="pp-pink">&amp;</span> UI/UX
          </h2>
        </div>

        <div className="pp-projects-grid">
          {FRONTEND_PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>

        <div className="pp-skill-desc-row">
          <p className="pp-skill-desc">
            I build interfaces that feel effortless to use. From component
            libraries to polished landing pages, I focus on clarity, motion, and
            responsiveness writing clean React and CSS that works beautifully
            across every device.
          </p>
        </div>
      </div>

      <div className="pp-divider" />

      {/* ── 03. Backend ── */}
      <div
        ref={beRef}
        className={`pp-skill-block ${beVisible ? "pp-visible" : ""}`}
      >
        <div className="pp-skill-heading-row">
          <span className="pp-skill-number">03.</span>
          <h2 className="pp-skill-title">
            Back<span className="pp-pink">end</span>
          </h2>
        </div>

        <div className="pp-projects-grid pp-three-col">
          {BACKEND_PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} isBackend />
          ))}
        </div>

        <div className="pp-skill-desc-row">
          <p className="pp-skill-desc">
            I design and build server-side systems that are fast, secure, and
            easy to maintain spanning Node/Express REST APIs, MongoDB, Python
            FastAPI, real-time Socket.IO, JWT auth, Laravel MVC with Sanctum,
            and ML model deployment.
          </p>
        </div>
      </div>

      {/* ── Footer CTAs ── */}
      <div
        className="pp-footer-ctas"
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: "12px",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <button
          className="custom-btn btn-primary"
          onClick={() => navigate("/projects")}
        >
          View More Projects
        </button>
        <button
          className="custom-btn btn-secondary"
          onClick={() => navigate("/skills")}
        >
          View My Skills
        </button>
      </div>
    </section>
  );
};

export default ParticlePlayground;