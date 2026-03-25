// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";


// const Resume = () => {
//     const { userId } = useParams();
//     const [skills, setSkills] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchSkills = async () => {
//             try {
//                 const res = await axios.get(
//                     `http://localhost:5001/api/skills/user/${userId}`
//                 );

//                 setSkills(res.data); // already filtered in backend
//             } catch (err) {
//                 console.error(err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchSkills();
//     }, [userId]);

//     const handleCopy = () => {
//         const link = window.location.href;

//         if (navigator.clipboard && window.isSecureContext) {
//             navigator.clipboard.writeText(link)
//                 .then(() => alert("✅ Link copied!"))
//                 .catch(() => alert("❌ Failed to copy"));
//         } else {
//             // Fallback for HTTP / IP address
//             const textarea = document.createElement("textarea");
//             textarea.value = link;
//             textarea.style.position = "fixed";
//             textarea.style.left = "-9999px";

//             document.body.appendChild(textarea);
//             textarea.select();

//             try {
//                 document.execCommand("copy");
//                 alert("✅ Link copied!");
//             } catch (err) {
//                 alert("❌ Copy failed");
//             }

//             document.body.removeChild(textarea);
//         }
//     };
//     return (
//         <div className="max-w-4xl mx-auto p-6">

//             {/* Header */}
//             <div className="text-center mb-8">
//                 <h1 className="text-3xl font-bold">My Resume</h1>
//                 <p className="text-gray-500">
//                     Verified Skills on Blockchain
//                 </p>
//             </div>

//             {/* Skills */}
//             {loading && <p>Loading...</p>}

//             {!loading && skills.length === 0 && (
//                 <p className="text-gray-500 text-center">
//                     No verified skills yet
//                 </p>
//             )}
//             <button
//                 onClick={handleCopy}
//                 className="bg-green-500 text-white px-4 py-2 rounded mt-4"
//             >
//                 Copy Resume Link
//             </button>

//             {!loading && skills.length > 0 && (
//                 <div className="grid gap-4">
//                     {skills.map((skill) => (
//                         <div
//                             key={skill._id}
//                             className="p-4 border rounded shadow-sm bg-white"
//                         >
//                             <h3 className="text-xl font-semibold">
//                                 {skill.name}
//                             </h3>

//                             <p className="text-gray-600">
//                                 {skill.company}
//                             </p>

//                             <p className="text-sm text-gray-500">
//                                 Verified ✔️
//                             </p>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Resume;


// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const Resume = () => {
//     const { userId } = useParams(); // ✅ correct place

//     const [user, setUser] = useState(null);
//     const [skills, setSkills] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 // 👤 fetch user
//                 const userRes = await axios.get(
//                     `http://localhost:5001/api/auth/user/${userId}`
//                 );

//                 // 🧠 fetch verified skills
//                 const skillRes = await axios.get(
//                     `http://localhost:5001/api/skills/user/${userId}`
//                 );

//                 setUser(userRes.data);
//                 setSkills(skillRes.data);
//             } catch (err) {
//                 console.error(err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [userId]);

//     if (loading) return <p className="p-6">Loading...</p>;
//     if (!user) return <p className="p-6">User not found</p>;

//     return (
//         <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">

//             {/* 🔹 HEADER */}
//             <h1 className="text-3xl font-bold">{user.name}</h1>
//             <p>{user.email}</p>
//             <p>{user.phone}</p>

//             {/* 🔹 LINKS */}
//             <div className="mt-2">
//                 <a href={user.github} className="text-blue-500 mr-4">
//                     GitHub
//                 </a>
//                 <a href={user.linkedin} className="text-blue-500">
//                     LinkedIn
//                 </a>
//             </div>

//             {/* 🔹 EDUCATION */}
//             <h2 className="text-xl font-semibold mt-6">Education</h2>
//             {user.education?.map((edu, i) => (
//                 <p key={i}>
//                     {edu.college} — {edu.degree}
//                 </p>
//             ))}

//             {/* 🔹 PROJECTS */}
//             <h2 className="text-xl font-semibold mt-6">Projects</h2>
//             {user.projects?.map((p, i) => (
//                 <div key={i}>
//                     <p className="font-medium">{p.title}</p>
//                     <p className="text-gray-600">{p.description}</p>
//                 </div>
//             ))}

//             {/* 🔹 EXPERIENCE */}
//             <h2 className="text-xl font-semibold mt-6">Experience</h2>
//             {user.experience?.map((e, i) => (
//                 <p key={i}>
//                     {e.company} — {e.role} ({e.duration})
//                 </p>
//             ))}

//             {/* 🔹 VERIFIED SKILLS */}
//             <h2 className="text-xl font-semibold mt-6">
//                 Certified Skills (Blockchain Verified)
//             </h2>

//             {skills.length === 0 ? (
//                 <p>No verified skills yet</p>
//             ) : (
//                 skills.map((s) => (
//                     <p key={s._id}>✅ {s.name}</p>
//                 ))
//             )}

//             {/* 🔥 COPY LINK BUTTON */}
//             <button
//                 onClick={() => {
//                     navigator.clipboard.writeText(window.location.href);
//                     alert("Resume link copied!");
//                 }}
//                 className="mt-6 bg-blue-500 text-white px-4 py-2 rounded"
//             >
//                 Copy Resume Link
//             </button>
//         </div>
//     );
// };

// export default Resume;


// import { useEffect, useState } from "react";
// import axios from "axios";
// //import { useEffect, useRef } from "react";
// //import { gsap } from "gsap";

// const Resume = () => {
//     const [user, setUser] = useState(null);
//     const [skills, setSkills] = useState([]);


//     const userId = localStorage.getItem("userId");

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 // USER DATA
//                 const userRes = await axios.get(
//                     `http://localhost:5001/api/auth/user/${userId}`
//                 );
//                 setUser(userRes.data);

//                 // VERIFIED SKILLS
//                 const skillRes = await axios.get(
//                     `http://localhost:5001/api/skills/user/${userId}`
//                 );

//                 setSkills(skillRes.data);
//                 console.log(skillRes.data);
//                 //setSkills(verified);
//             } catch (err) {
//                 console.error(err);
//             }
//         };

//         fetchData();
//     }, [userId]);

//     if (!user) return <p className="p-6">Loading...</p>;

//     return (
//         <div className="max-w-4xl mx-auto bg-white shadow-lg p-8 mt-6">

//             {/* HEADER */}
//             <div className="border-b pb-4 mb-4">
//                 <h1 className="text-3xl font-bold">{user.name}</h1>
//                 <p className="text-gray-600">{user.email}</p>
//                 <p className="text-gray-600">{user.phone}</p>

//                 <div className="flex gap-4 mt-2 text-blue-600">
//                     {user.github && (
//                         <a href={user.github} target="_blank" rel="noopener noreferrer">
//                             GitHub
//                         </a>
//                     )}
//                     {user.linkedin && (
//                         <a href={user.linkedin} target="_blank" rel="noopener noreferrer">
//                             LinkedIn
//                         </a>
//                     )}
//                 </div>
//             </div>

//             {/* EDUCATION */}
//             <div className="mb-6">
//                 <h2 className="text-xl font-semibold border-b mb-2">
//                     Education
//                 </h2>

//                 {user.education?.map((edu, i) => (
//                     <div key={i} className="mb-2">
//                         <p className="font-semibold">{edu.college}</p>
//                         <p>{edu.degree}</p>
//                         <p className="text-gray-500 text-sm">{edu.year}</p>
//                     </div>
//                 ))}
//             </div>

//             {/* EXPERIENCE */}
//             <div className="mb-6">
//                 <h2 className="text-xl font-semibold border-b mb-2">
//                     Experience
//                 </h2>

//                 {user.experience?.map((exp, i) => (
//                     <div key={i} className="mb-2">
//                         <p className="font-semibold">
//                             {exp.role} - {exp.company}
//                         </p>
//                         <p className="text-gray-500 text-sm">
//                             {exp.duration}
//                         </p>
//                     </div>
//                 ))}
//             </div>

//             {/* PROJECTS */}
//             <div className="mb-6">
//                 <h2 className="text-xl font-semibold border-b mb-2">
//                     Projects
//                 </h2>

//                 {user.projects?.map((proj, i) => (
//                     <div key={i} className="mb-2">
//                         <p className="font-semibold">{proj.title}</p>
//                         <p>{proj.description}</p>

//                         {proj.link && (
//                             <a
//                                 href={proj.link}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="text-blue-500 text-sm"
//                             >
//                                 View Project
//                             </a>
//                         )}
//                     </div>
//                 ))}
//             </div>

//             {/* CERTIFIED SKILLS */}
//             <div className="mb-6">
//                 <h2 className="text-xl font-semibold border-b mb-2">
//                     Certified Skills
//                 </h2>

//                 {skills.length === 0 ? (
//                     <p className="text-gray-500">No verified skills</p>
//                 ) : (
//                     <ul className="list-disc ml-5">
//                         {skills.map((skill) => (
//                             <li key={skill._id}>
//                                 {skill.name} ✅
//                             </li>
//                         ))}
//                     </ul>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Resume;




import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { gsap } from "gsap";
import { useParams } from "react-router-dom";
const Resume = () => {
    const [user, setUser] = useState(null);
    const [skills, setSkills] = useState([]);
    //const userId = localStorage.getItem("userId");
    const { userId } = useParams();

    const headerRef = useRef(null);
    const sectionsRef = useRef([]);
    const orbRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/user/${userId}`);
                setUser(userRes.data);
                const skillRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/skills/user/${userId}`);
                setSkills(skillRes.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, [userId]);

    useEffect(() => {
        if (!user) return;
        const tl = gsap.timeline();
        tl.fromTo(orbRef.current,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" }
        );
        tl.fromTo(headerRef.current,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
            "-=0.6"
        );
        tl.fromTo(sectionsRef.current.filter(Boolean),
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.12, ease: "power2.out" },
            "-=0.3"
        );
        gsap.to(orbRef.current, {
            y: -25, x: 15, duration: 6, ease: "sine.inOut", yoyo: true, repeat: -1
        });
    }, [user]);

    const addSection = (el, i) => { sectionsRef.current[i] = el; };

    if (!user) return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ textAlign: "center" }}>
                <div style={{
                    width: "44px", height: "44px", borderRadius: "50%",
                    border: "3px solid rgba(240,192,64,0.15)", borderTopColor: "#f0c040",
                    animation: "spin 0.8s linear infinite", margin: "0 auto 14px",
                }} />
                <p style={{ color: "#475569" }}>Loading resume...</p>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        </div>
    );

    const pageStyle = {
        minHeight: "100vh",
        padding: "40px 24px",
        position: "relative",
        overflow: "hidden",
    };

    const cardStyle = {
        maxWidth: "860px",
        margin: "0 auto",
        background: "rgba(10,22,40,0.65)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "24px",
        backdropFilter: "blur(30px)",
        overflow: "hidden",
        boxShadow: "0 40px 100px rgba(0,0,0,0.5)",
    };

    const sectionStyle = {
        padding: "28px 36px",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
    };

    const sectionTitleStyle = {
        fontSize: "0.72rem",
        letterSpacing: "0.15em",
        color: "#f0c040",
        textTransform: "uppercase",
        fontWeight: 700,
        marginBottom: "18px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
    };

    const pillStyle = (color = "#f0c040") => ({
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "6px 14px",
        background: `${color}15`,
        border: `1px solid ${color}30`,
        borderRadius: "20px",
        fontSize: "0.82rem",
        color: color,
        fontWeight: 500,
    });

    const verified = skills.filter(s => s.status === "verified" || s.status === "Accepted");
    const pending = skills.filter(s => s.status !== "verified" && s.status !== "Accepted");

    const handleCopyLink = () => {
        const link = window.location.href;

        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(link)
                .then(() => alert("✅ Resume link copied!"))
                .catch(() => alert("❌ Copy failed"));
        } else {
            const textarea = document.createElement("textarea");
            textarea.value = link;
            document.body.appendChild(textarea);
            textarea.select();

            try {
                document.execCommand("copy");
                alert("✅ Resume link copied!");
            } catch {
                alert("❌ Copy failed");
            }

            document.body.removeChild(textarea);
        }
    };
    const handleExportPDF = () => {
        const originalTitle = document.title;
        document.title = "Resume";

        setTimeout(() => {
            window.print();
            document.title = originalTitle;
        }, 300);
    };
    return (
        <div style={pageStyle}>
            {/* Orb */}
            <div ref={orbRef} style={{
                position: "fixed",
                width: "600px", height: "600px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(30,58,120,0.35) 0%, transparent 70%)",
                filter: "blur(80px)",
                top: "-200px", right: "-200px",
                pointerEvents: "none", zIndex: 0,
            }} />

            <div style={{ position: "relative", zIndex: 1, maxWidth: "860px", margin: "0 auto" }}>

                {/* Print button */}
                {/* <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "16px" }}>*/}
                <div style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "10px",
                    marginBottom: "16px"
                }}>
                    <button
                        className="no-print"
                        onClick={handleCopyLink}
                        style={{
                            padding: "9px 18px",
                            background: "linear-gradient(135deg, #2dd4bf, #14b8a6)",
                            color: "#060b18",
                            fontWeight: 700,
                            fontSize: "0.85rem",
                            borderRadius: "10px",
                            border: "none",
                            cursor: "pointer",
                            boxShadow: "0 4px 20px rgba(45,212,191,0.25)",
                        }}
                    >
                        🔗 Copy Link
                    </button>
                    <button
                        className="no-print"
                        onClick={handleExportPDF}
                        style={{
                            padding: "9px 22px",
                            background: "linear-gradient(135deg, #f0c040, #e0a820)",
                            color: "#060b18", fontFamily: "'DM Sans', sans-serif",
                            fontWeight: 700, fontSize: "0.85rem",
                            borderRadius: "10px", border: "none", cursor: "pointer",
                            boxShadow: "0 4px 20px rgba(240,192,64,0.25)",
                            display: "flex", alignItems: "center", gap: "7px",
                        }}
                    >
                        ↓ Export PDF
                    </button>
                </div>

                <div className="resume-container" style={cardStyle}>
                    {/* Gold top bar */}
                    <div style={{ height: "3px", background: "linear-gradient(90deg, #f0c040, #2dd4bf, #f0c040)" }} />

                    {/* HEADER */}
                    <div ref={headerRef} style={{ padding: "44px 36px 32px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "20px" }}>
                            <div>
                                <h1 style={{
                                    fontFamily: "'DM Serif Display', serif",
                                    fontSize: "2.8rem", color: "#fff",
                                    lineHeight: 1.1, marginBottom: "8px",
                                }}>
                                    {user.name}
                                </h1>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginTop: "12px" }}>
                                    {user.email && (
                                        <span style={{ color: "#94a3b8", fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "5px" }}>
                                            ✉ {user.email}
                                        </span>
                                    )}
                                    {user.phone && (
                                        <span style={{ color: "#94a3b8", fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "5px" }}>
                                            ✆ {user.phone}
                                        </span>
                                    )}
                                </div>
                                <div style={{ display: "flex", gap: "10px", marginTop: "14px" }}>
                                    {user.github && (
                                        <a href={user.github} target="_blank" rel="noopener noreferrer"
                                            style={{ ...pillStyle("#2dd4bf"), textDecoration: "none" }}>
                                            ↗ GitHub
                                        </a>
                                    )}
                                    {user.linkedin && (
                                        <a href={user.linkedin} target="_blank" rel="noopener noreferrer"
                                            style={{ ...pillStyle("#6366f1"), textDecoration: "none" }}>
                                            ↗ LinkedIn
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Skill count badge */}
                            <div style={{
                                background: "rgba(240,192,64,0.08)",
                                border: "1px solid rgba(240,192,64,0.2)",
                                borderRadius: "16px", padding: "16px 24px", textAlign: "center",
                            }}>
                                <p style={{ fontSize: "2.2rem", fontWeight: 700, color: "#f0c040", fontFamily: "'DM Serif Display', serif", lineHeight: 1 }}>
                                    {verified.length}
                                </p>
                                <p style={{ color: "#94a3b8", fontSize: "0.78rem", marginTop: "4px" }}>Verified Skills</p>
                            </div>
                        </div>
                    </div>

                    {/* EDUCATION */}
                    {user.education?.length > 0 && (
                        <div ref={el => addSection(el, 0)} style={sectionStyle}>
                            <p style={sectionTitleStyle}>
                                <span style={{ width: "20px", height: "2px", background: "#f0c040" }} />
                                Education
                            </p>
                            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                                {user.education.map((edu, i) => (
                                    <div key={i} style={{
                                        display: "flex", justifyContent: "space-between",
                                        alignItems: "flex-start", flexWrap: "wrap", gap: "8px",
                                        padding: "16px 20px",
                                        background: "rgba(255,255,255,0.02)",
                                        borderRadius: "12px",
                                        border: "1px solid rgba(255,255,255,0.04)",
                                    }}>
                                        <div>
                                            <p style={{ fontWeight: 600, color: "#e2e8f0", marginBottom: "3px" }}>{edu.college}</p>
                                            <p style={{ color: "#94a3b8", fontSize: "0.875rem" }}>{edu.degree}</p>
                                        </div>
                                        {edu.year && <span style={pillStyle("#f0c040")}>{edu.year}</span>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* EXPERIENCE */}
                    {user.experience?.length > 0 && (
                        <div ref={el => addSection(el, 1)} style={sectionStyle}>
                            <p style={sectionTitleStyle}>
                                <span style={{ width: "20px", height: "2px", background: "#f0c040" }} />
                                Experience
                            </p>
                            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                                {user.experience.map((exp, i) => (
                                    <div key={i} style={{
                                        padding: "16px 20px",
                                        background: "rgba(255,255,255,0.02)",
                                        borderRadius: "12px",
                                        border: "1px solid rgba(255,255,255,0.04)",
                                        display: "flex", justifyContent: "space-between",
                                        alignItems: "flex-start", flexWrap: "wrap", gap: "8px",
                                    }}>
                                        <div>
                                            <p style={{ fontWeight: 600, color: "#e2e8f0", marginBottom: "2px" }}>{exp.role}</p>
                                            <p style={{ color: "#94a3b8", fontSize: "0.875rem" }}>{exp.company}</p>
                                        </div>
                                        {exp.duration && <span style={pillStyle("#2dd4bf")}>{exp.duration}</span>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* PROJECTS */}
                    {user.projects?.length > 0 && (
                        <div ref={el => addSection(el, 2)} style={sectionStyle}>
                            <p style={sectionTitleStyle}>
                                <span style={{ width: "20px", height: "2px", background: "#f0c040" }} />
                                Projects
                            </p>
                            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                                {user.projects.map((proj, i) => (
                                    <div key={i} style={{
                                        padding: "16px 20px",
                                        background: "rgba(255,255,255,0.02)",
                                        borderRadius: "12px",
                                        border: "1px solid rgba(255,255,255,0.04)",
                                    }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                                            <p style={{ fontWeight: 600, color: "#e2e8f0" }}>{proj.title}</p>
                                            {proj.link && (
                                                <a href={proj.link} target="_blank" rel="noopener noreferrer"
                                                    style={{ ...pillStyle("#6366f1"), textDecoration: "none", fontSize: "0.78rem" }}>
                                                    ↗ View
                                                </a>
                                            )}
                                        </div>
                                        <p style={{ color: "#94a3b8", fontSize: "0.875rem", lineHeight: 1.6 }}>{proj.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* VERIFIED SKILLS */}
                    <div ref={el => addSection(el, 3)} style={{ ...sectionStyle, borderBottom: "none" }}>
                        <p style={sectionTitleStyle}>
                            <span style={{ width: "20px", height: "2px", background: "#f0c040" }} />
                            Certified Skills
                        </p>

                        {skills.length === 0 ? (
                            <p style={{ color: "#475569", fontSize: "0.875rem" }}>No verified skills yet.</p>
                        ) : (
                            <>
                                {verified.length > 0 && (
                                    <div style={{ marginBottom: "16px" }}>
                                        <p style={{ fontSize: "0.75rem", color: "#94a3b8", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Verified</p>
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                                            {verified.map((skill) => (
                                                <span key={skill._id} style={{
                                                    padding: "7px 16px",
                                                    background: "rgba(45,212,191,0.1)",
                                                    border: "1px solid rgba(45,212,191,0.25)",
                                                    borderRadius: "20px",
                                                    color: "#2dd4bf",
                                                    fontSize: "0.85rem",
                                                    fontWeight: 500,
                                                    display: "flex", alignItems: "center", gap: "6px",
                                                }}>
                                                    ✓ {skill.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {pending.length > 0 && (
                                    <div>
                                        <p style={{ fontSize: "0.75rem", color: "#94a3b8", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Pending</p>
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                                            {pending.map((skill) => (
                                                <span key={skill._id} style={{
                                                    padding: "7px 16px",
                                                    background: "rgba(240,192,64,0.08)",
                                                    border: "1px solid rgba(240,192,64,0.2)",
                                                    borderRadius: "20px",
                                                    color: "#f0c040",
                                                    fontSize: "0.85rem",
                                                    fontWeight: 500,
                                                    display: "flex", alignItems: "center", gap: "6px",
                                                }}>
                                                    ⏳ {skill.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Resume;