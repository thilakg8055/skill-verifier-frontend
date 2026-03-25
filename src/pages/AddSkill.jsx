// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const AddSkill = () => {
//     const navigate = useNavigate();

//     const [form, setForm] = useState({
//         name: "",
//         verifierEmail: "",
//         company: "",
//         description: "",
//         certificate: null,
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setForm({ ...form, [name]: value });
//     };

//     const handleFileChange = (e) => {
//         setForm({ ...form, certificate: e.target.files[0] });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             // For now sending only text fields
//             await axios.post("http://localhost:5001/api/skills/add", {
//                 name: form.name,
//                 verifierEmail: form.verifierEmail,
//                 company: form.company,
//                 description: form.description,
//             },
//                 {
//                     headers: {
//                         Authorization: localStorage.getItem("token"),
//                     },
//                 }
//             );

//             alert("✅ Skill submitted!");
//             navigate("/dashboard");
//         } catch (err) {
//             console.error(err);
//             alert("❌ Error submitting skill");
//         }
//     };

//     return (
//         <div className="flex justify-center items-center mt-10">
//             <form
//                 onSubmit={handleSubmit}
//                 className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md"
//             >
//                 <h2 className="text-2xl font-bold mb-4 text-center">
//                     Add Skill
//                 </h2>

//                 {/* Skill Name */}
//                 <input
//                     type="text"
//                     name="name"
//                     placeholder="Skill Name"
//                     className="w-full p-2 border mb-3 rounded"
//                     onChange={handleChange}
//                     required
//                 />

//                 {/* Company */}
//                 <input
//                     type="text"
//                     name="company"
//                     placeholder="Company / Organization"
//                     className="w-full p-2 border mb-3 rounded"
//                     onChange={handleChange}
//                 />

//                 {/* Verifier Email */}
//                 <input
//                     type="email"
//                     name="verifierEmail"
//                     placeholder="Verifier Email"
//                     className="w-full p-2 border mb-3 rounded"
//                     onChange={handleChange}
//                     required
//                 />

//                 {/* Description */}
//                 <textarea
//                     name="description"
//                     placeholder="Description (optional)"
//                     className="w-full p-2 border mb-3 rounded"
//                     onChange={handleChange}
//                 />

//                 {/* Certificate Upload */}
//                 <input
//                     type="file"
//                     className="w-full mb-4"
//                     onChange={handleFileChange}
//                 />

//                 <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 w-full rounded">
//                     Submit
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default AddSkill;






import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { gsap } from "gsap";

const AddSkill = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "", verifierEmail: "", company: "", description: "", certificate: null,
    });
    const [loading, setLoading] = useState(false);
    const [dragOver, setDragOver] = useState(false);

    const cardRef = useRef(null);
    const orbRef = useRef(null);
    const fieldsRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();
        tl.fromTo(orbRef.current,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1.1, ease: "power2.out" }
        );
        tl.fromTo(cardRef.current,
            { y: 40, opacity: 0, scale: 0.97 },
            { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "power3.out" },
            "-=0.6"
        );
        tl.fromTo(fieldsRef.current?.children || [],
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: "power2.out" },
            "-=0.3"
        );
        gsap.to(orbRef.current, {
            y: -20, x: 12, duration: 5.5, ease: "sine.inOut", yoyo: true, repeat: -1
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleFileChange = (e) => {
        setForm({ ...form, certificate: e.target.files[0] });
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) setForm({ ...form, certificate: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        gsap.to(cardRef.current, { scale: 0.99, duration: 0.1 });

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/skills/add`, {
                name: form.name,
                verifierEmail: form.verifierEmail,
                company: form.company,
                description: form.description,
            }, {
                headers: { Authorization: localStorage.getItem("token") },
            });

            gsap.to(cardRef.current, {
                y: -20, opacity: 0, scale: 0.97, duration: 0.4, ease: "power2.in",
                onComplete: () => navigate("/dashboard")
            });
        } catch (err) {
            console.error(err);
            gsap.to(cardRef.current, {
                x: [-8, 8, -6, 6, 0], duration: 0.4, ease: "power2.inOut"
            });
            alert("Error submitting skill");
        } finally {
            setLoading(false);
            gsap.to(cardRef.current, { scale: 1, duration: 0.2 });
        }
    };

    const inputStyle = {
        width: "100%",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "11px",
        padding: "12px 16px",
        color: "#e2e8f0",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "0.9rem",
        outline: "none",
        transition: "all 0.2s ease",
    };

    const labelStyle = {
        fontSize: "0.72rem", color: "#94a3b8",
        letterSpacing: "0.08em", textTransform: "uppercase",
        fontWeight: 500, display: "block", marginBottom: "6px",
    };

    const fieldFocus = (e) => {
        e.target.style.borderColor = "#f0c040";
        e.target.style.boxShadow = "0 0 0 3px rgba(240,192,64,0.1)";
        e.target.style.background = "rgba(240,192,64,0.04)";
    };
    const fieldBlur = (e) => {
        e.target.style.borderColor = "rgba(255,255,255,0.08)";
        e.target.style.boxShadow = "none";
        e.target.style.background = "rgba(255,255,255,0.04)";
    };

    return (
        <div style={{
            minHeight: "100vh", padding: "100px 24px 60px",
            position: "relative", overflow: "hidden",
            display: "flex", alignItems: "flex-start", justifyContent: "center",
        }}>
            {/* Orb */}
            <div ref={orbRef} style={{
                position: "fixed", width: "500px", height: "500px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(45,212,191,0.12) 0%, transparent 70%)",
                filter: "blur(70px)",
                bottom: "-150px", right: "-150px",
                pointerEvents: "none", zIndex: 0,
            }} />

            <div ref={cardRef} style={{
                width: "100%", maxWidth: "560px",
                background: "rgba(10,22,40,0.7)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "24px",
                backdropFilter: "blur(30px)",
                boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
                overflow: "hidden",
                position: "relative", zIndex: 1,
            }}>
                <div style={{ height: "3px", background: "linear-gradient(90deg, #2dd4bf, #f0c040)" }} />

                <div style={{ padding: "40px 36px" }}>
                    {/* Title */}
                    <div style={{ marginBottom: "32px" }}>
                        <p style={{ fontSize: "0.72rem", color: "#2dd4bf", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700, marginBottom: "8px" }}>
                            Skill Submission
                        </p>
                        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "2rem", color: "#fff", lineHeight: 1.2, marginBottom: "6px" }}>
                            Add a New <span style={{ color: "#f0c040" }}>Skill</span>
                        </h1>
                        <p style={{ color: "#475569", fontSize: "0.875rem" }}>
                            Submit for peer verification and get certified
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div ref={fieldsRef}>

                            {/* Skill Name */}
                            <div style={{ marginBottom: "18px" }}>
                                <label style={labelStyle}>Skill Name *</label>
                                <input
                                    type="text" name="name" placeholder="e.g. React.js, Machine Learning"
                                    style={inputStyle} onChange={handleChange} required
                                    onFocus={fieldFocus} onBlur={fieldBlur}
                                />
                            </div>

                            {/* Company */}
                            <div style={{ marginBottom: "18px" }}>
                                <label style={labelStyle}>Company / Organization</label>
                                <input
                                    type="text" name="company" placeholder="e.g. Google, Infosys"
                                    style={inputStyle} onChange={handleChange}
                                    onFocus={fieldFocus} onBlur={fieldBlur}
                                />
                            </div>

                            {/* Verifier Email */}
                            <div style={{ marginBottom: "18px" }}>
                                <label style={labelStyle}>Verifier Email *</label>
                                <input
                                    type="email" name="verifierEmail" placeholder="verifier@company.com"
                                    style={inputStyle} onChange={handleChange} required
                                    onFocus={fieldFocus} onBlur={fieldBlur}
                                />
                                <p style={{ color: "#334155", fontSize: "0.75rem", marginTop: "5px" }}>
                                    A verification request will be sent to this email
                                </p>
                            </div>

                            {/* Description */}
                            <div style={{ marginBottom: "20px" }}>
                                <label style={labelStyle}>Description</label>
                                <textarea
                                    name="description"
                                    placeholder="Brief description of the skill or context..."
                                    rows={3}
                                    onChange={handleChange}
                                    style={{
                                        ...inputStyle,
                                        resize: "vertical",
                                        minHeight: "90px",
                                        lineHeight: "1.6",
                                    }}
                                    onFocus={fieldFocus}
                                    onBlur={fieldBlur}
                                />
                            </div>

                            {/* File Upload */}
                            <div style={{ marginBottom: "28px" }}>
                                <label style={labelStyle}>Certificate (optional)</label>
                                <div
                                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                                    onDragLeave={() => setDragOver(false)}
                                    onDrop={handleDrop}
                                    onClick={() => document.getElementById("cert-upload").click()}
                                    style={{
                                        border: `2px dashed ${dragOver ? "#f0c040" : "rgba(255,255,255,0.1)"}`,
                                        borderRadius: "12px",
                                        padding: "24px",
                                        textAlign: "center",
                                        cursor: "pointer",
                                        background: dragOver ? "rgba(240,192,64,0.05)" : "rgba(255,255,255,0.02)",
                                        transition: "all 0.2s ease",
                                    }}
                                >
                                    {form.certificate ? (
                                        <div>
                                            <p style={{ color: "#2dd4bf", fontWeight: 600, marginBottom: "2px" }}>
                                                ✓ {form.certificate.name}
                                            </p>
                                            <p style={{ color: "#475569", fontSize: "0.78rem" }}>
                                                {(form.certificate.size / 1024).toFixed(1)} KB
                                            </p>
                                        </div>
                                    ) : (
                                        <div>
                                            <p style={{ fontSize: "1.5rem", marginBottom: "6px", opacity: 0.4 }}>↑</p>
                                            <p style={{ color: "#475569", fontSize: "0.875rem" }}>
                                                Drag & drop or <span style={{ color: "#f0c040" }}>browse</span>
                                            </p>
                                            <p style={{ color: "#334155", fontSize: "0.75rem", marginTop: "4px" }}>
                                                PDF, PNG, JPG up to 5MB
                                            </p>
                                        </div>
                                    )}
                                    <input
                                        id="cert-upload" type="file" accept=".pdf,.png,.jpg,.jpeg"
                                        style={{ display: "none" }} onChange={handleFileChange}
                                    />
                                </div>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    width: "100%", padding: "14px",
                                    background: loading
                                        ? "rgba(45,212,191,0.4)"
                                        : "linear-gradient(135deg, #2dd4bf, #14b8a6)",
                                    color: "#060b18",
                                    fontFamily: "'DM Sans', sans-serif",
                                    fontWeight: 700, fontSize: "0.95rem",
                                    borderRadius: "12px", border: "none",
                                    cursor: loading ? "not-allowed" : "pointer",
                                    boxShadow: "0 4px 20px rgba(45,212,191,0.3)",
                                    transition: "all 0.25s ease",
                                    letterSpacing: "0.02em",
                                }}
                                onMouseEnter={(e) => { if (!loading) e.target.style.boxShadow = "0 8px 30px rgba(45,212,191,0.45)"; }}
                                onMouseLeave={(e) => { e.target.style.boxShadow = "0 4px 20px rgba(45,212,191,0.3)"; }}
                            >
                                {loading ? "Submitting..." : "Submit for Verification →"}
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate("/dashboard")}
                                style={{
                                    width: "100%", padding: "12px", marginTop: "10px",
                                    background: "transparent",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    borderRadius: "12px", color: "#475569",
                                    fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
                                    cursor: "pointer", fontSize: "0.875rem",
                                    transition: "all 0.2s ease",
                                }}
                                onMouseEnter={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.15)"; e.target.style.color = "#94a3b8"; }}
                                onMouseLeave={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.color = "#475569"; }}
                            >
                                ← Back to Dashboard
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddSkill;