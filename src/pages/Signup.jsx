// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Signup = () => {
//     const navigate = useNavigate();

//     const [form, setForm] = useState({
//         name: "",
//         email: "",
//         password: "",
//         phone: "",
//         github: "",
//         linkedin: "",
//         college: "",
//         degree: "",
//     });

//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             await axios.post("http://localhost:5001/api/auth/signup", {
//                 name: form.name,
//                 email: form.email,
//                 password: form.password,
//                 phone: form.phone,
//                 github: form.github,
//                 linkedin: form.linkedin,

//                 education: [
//                     {
//                         college: form.college,
//                         degree: form.degree,
//                     }
//                 ],

//                 projects: [],      // optional for now
//                 experience: [],    // optional for now
//             });

//             alert("Signup successful!");
//             navigate("/");
//         } catch (err) {
//             console.log(err.response); // 🔥 ADD THIS
//             alert(err.response?.data || "Error signing up");
//         }
//     };

//     return (
//         <div className="flex justify-center items-center h-screen">
//             <form
//                 onSubmit={handleSubmit}
//                 className="bg-white p-6 rounded shadow w-80"
//             >
//                 <h2 className="text-xl font-bold mb-4 text-center">
//                     Signup
//                 </h2>

//                 <input
//                     type="text"
//                     name="name"
//                     placeholder="Name"
//                     className="w-full p-2 border mb-3"
//                     onChange={handleChange}
//                     required
//                 />

//                 <input
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     className="w-full p-2 border mb-3"
//                     onChange={handleChange}
//                     required
//                 />



//                 <input name="phone" placeholder="Phone" onChange={handleChange} />
//                 <input name="github" placeholder="GitHub Link" onChange={handleChange} />
//                 <input name="linkedin" placeholder="LinkedIn Link" onChange={handleChange} />

//                 <input name="college" placeholder="College" onChange={handleChange} />
//                 <input name="degree" placeholder="Degree" onChange={handleChange} />

//                 <input
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                     className="w-full p-2 border mb-3"
//                     onChange={handleChange}
//                     required
//                 />

//                 <button className="bg-green-500 text-white w-full py-2">
//                     Signup
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default Signup;


import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { gsap } from "gsap";

const Signup = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "", email: "", password: "", phone: "",
        github: "", linkedin: "", college: "", degree: "",
    });
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
    const cardRef = useRef(null);
    const step1Ref = useRef(null);
    const step2Ref = useRef(null);
    const orbRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();
        tl.fromTo(orbRef.current,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1, ease: "power2.out" }
        );
        tl.fromTo(cardRef.current,
            { y: 50, opacity: 0, scale: 0.96 },
            { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "power3.out" },
            "-=0.5"
        );

        gsap.to(orbRef.current, {
            y: -20, x: 15, duration: 5, ease: "sine.inOut", yoyo: true, repeat: -1
        });
    }, []);

    const goToStep2 = () => {
        if (!form.name || !form.email || !form.password) {
            gsap.to(cardRef.current, { x: [-6, 6, -4, 4, 0], duration: 0.3 });
            alert("Please fill required fields");
            return;
        }
        gsap.to(step1Ref.current, {
            x: -30, opacity: 0, duration: 0.3, ease: "power2.in",
            onComplete: () => {
                setStep(2);
                gsap.fromTo(step2Ref.current,
                    { x: 30, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
                );
            }
        });
    };

    const goToStep1 = () => {
        gsap.to(step2Ref.current, {
            x: 30, opacity: 0, duration: 0.3, ease: "power2.in",
            onComplete: () => {
                setStep(1);
                gsap.fromTo(step1Ref.current,
                    { x: -30, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
                );
            }
        });
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/signup`, {
                name: form.name, email: form.email, password: form.password,
                phone: form.phone, github: form.github, linkedin: form.linkedin,
                education: [{ college: form.college, degree: form.degree }],
                projects: [], experience: [],
            });
            gsap.to(cardRef.current, {
                y: -20, opacity: 0, scale: 0.97, duration: 0.4, ease: "power2.in",
                onComplete: () => navigate("/")
            });
        } catch (err) {
            alert(err.response?.data || "Error signing up");
        } finally {
            setLoading(false);
        }
    };

    const wrapStyle = {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "90px 20px 40px",
        position: "relative",
        overflow: "hidden",
    };

    const cardStyle = {
        background: "rgba(10, 22, 40, 0.7)",
        border: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(30px)",
        borderRadius: "24px",
        padding: "44px 40px",
        width: "100%",
        maxWidth: "480px",
        boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
        position: "relative",
        zIndex: 2,
        overflow: "hidden",
    };

    const inputStyle = {
        width: "100%",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "10px",
        padding: "12px 14px",
        color: "#e2e8f0",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "0.875rem",
        outline: "none",
        transition: "all 0.2s ease",
        marginBottom: "14px",
    };

    const labelStyle = {
        fontSize: "0.72rem",
        color: "#94a3b8",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        fontWeight: 500,
        display: "block",
        marginBottom: "5px",
    };

    const rowStyle = {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "12px",
    };

    const handleFocus = (e) => {
        e.target.style.borderColor = "#f0c040";
        e.target.style.boxShadow = "0 0 0 3px rgba(240,192,64,0.1)";
        e.target.style.background = "rgba(240,192,64,0.04)";
    };
    const handleBlur = (e) => {
        e.target.style.borderColor = "rgba(255,255,255,0.08)";
        e.target.style.boxShadow = "none";
        e.target.style.background = "rgba(255,255,255,0.04)";
    };

    return (
        <div style={wrapStyle}>
            <div ref={orbRef} style={{
                position: "absolute",
                width: "500px", height: "500px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(30,58,120,0.45) 0%, transparent 70%)",
                filter: "blur(60px)",
                top: "-150px", right: "-100px",
                pointerEvents: "none",
            }} />

            <div ref={cardRef} style={cardStyle}>
                <div style={{ height: "2px", background: "linear-gradient(90deg, transparent, #f0c040, transparent)", marginBottom: "32px" }} />

                {/* Step indicator */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
                    {[1, 2].map((s) => (
                        <div key={s} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <div style={{
                                width: "28px", height: "28px", borderRadius: "50%",
                                background: step >= s ? "linear-gradient(135deg, #f0c040, #e0a820)" : "rgba(255,255,255,0.06)",
                                border: step >= s ? "none" : "1px solid rgba(255,255,255,0.1)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: "0.78rem", fontWeight: 700,
                                color: step >= s ? "#060b18" : "#475569",
                                transition: "all 0.3s ease",
                            }}>{s}</div>
                            <span style={{ fontSize: "0.78rem", color: step >= s ? "#94a3b8" : "#2d3748" }}>
                                {s === 1 ? "Account" : "Profile"}
                            </span>
                            {s < 2 && <div style={{ width: "40px", height: "1px", background: step > 1 ? "#f0c040" : "rgba(255,255,255,0.08)", transition: "all 0.3s ease" }} />}
                        </div>
                    ))}
                </div>

                <p style={{ fontSize: "0.72rem", letterSpacing: "0.15em", color: "#f0c040", fontWeight: 600, textTransform: "uppercase", marginBottom: "6px" }}>
                    {step === 1 ? "Step 1 of 2" : "Step 2 of 2"}
                </p>
                <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.9rem", color: "#fff", marginBottom: "28px", lineHeight: 1.2 }}>
                    {step === 1 ? "Create your account" : "Your professional profile"}
                </h1>

                {step === 1 && (
                    <div ref={step1Ref}>
                        <label style={labelStyle}>Full Name *</label>
                        <input name="name" placeholder="Alex Johnson" style={inputStyle} onChange={handleChange} value={form.name} onFocus={handleFocus} onBlur={handleBlur} required />

                        <label style={labelStyle}>Email Address *</label>
                        <input name="email" type="email" placeholder="alex@example.com" style={inputStyle} onChange={handleChange} value={form.email} onFocus={handleFocus} onBlur={handleBlur} required />

                        <label style={labelStyle}>Password *</label>
                        <input name="password" type="password" placeholder="••••••••" style={inputStyle} onChange={handleChange} value={form.password} onFocus={handleFocus} onBlur={handleBlur} required />

                        <button
                            onClick={goToStep2}
                            style={{
                                width: "100%", padding: "14px",
                                background: "linear-gradient(135deg, #f0c040, #e0a820)",
                                color: "#060b18", fontFamily: "'DM Sans', sans-serif",
                                fontWeight: 700, fontSize: "0.95rem",
                                borderRadius: "12px", border: "none", cursor: "pointer",
                                marginTop: "6px", boxShadow: "0 4px 20px rgba(240,192,64,0.25)",
                            }}
                        >
                            Continue →
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div ref={step2Ref}>
                        <div style={rowStyle}>
                            <div>
                                <label style={labelStyle}>Phone</label>
                                <input name="phone" placeholder="+91 9876..." style={{ ...inputStyle, marginBottom: 0 }} onChange={handleChange} value={form.phone} onFocus={handleFocus} onBlur={handleBlur} />
                            </div>
                            <div>
                                <label style={labelStyle}>Degree</label>
                                <input name="degree" placeholder="B.Tech CSE" style={{ ...inputStyle, marginBottom: 0 }} onChange={handleChange} value={form.degree} onFocus={handleFocus} onBlur={handleBlur} />
                            </div>
                        </div>
                        <div style={{ marginBottom: "14px" }} />

                        <label style={labelStyle}>College / University</label>
                        <input name="college" placeholder="IIT Bombay" style={inputStyle} onChange={handleChange} value={form.college} onFocus={handleFocus} onBlur={handleBlur} />

                        <label style={labelStyle}>GitHub URL</label>
                        <input name="github" placeholder="https://github.com/username" style={inputStyle} onChange={handleChange} value={form.github} onFocus={handleFocus} onBlur={handleBlur} />

                        <label style={labelStyle}>LinkedIn URL</label>
                        <input name="linkedin" placeholder="https://linkedin.com/in/username" style={inputStyle} onChange={handleChange} value={form.linkedin} onFocus={handleFocus} onBlur={handleBlur} />

                        <div style={{ display: "flex", gap: "10px", marginTop: "6px" }}>
                            <button
                                onClick={goToStep1}
                                style={{
                                    flex: 1, padding: "14px",
                                    background: "transparent",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    color: "#94a3b8", fontFamily: "'DM Sans', sans-serif",
                                    fontWeight: 600, borderRadius: "12px", cursor: "pointer",
                                    transition: "all 0.2s ease",
                                }}
                                onMouseEnter={(e) => { e.target.style.borderColor = "#f0c040"; e.target.style.color = "#f0c040"; }}
                                onMouseLeave={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.color = "#94a3b8"; }}
                            >
                                ← Back
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                style={{
                                    flex: 2, padding: "14px",
                                    background: loading ? "rgba(240,192,64,0.4)" : "linear-gradient(135deg, #f0c040, #e0a820)",
                                    color: "#060b18", fontFamily: "'DM Sans', sans-serif",
                                    fontWeight: 700, fontSize: "0.95rem",
                                    borderRadius: "12px", border: "none", cursor: loading ? "not-allowed" : "pointer",
                                    boxShadow: "0 4px 20px rgba(240,192,64,0.25)",
                                }}
                            >
                                {loading ? "Creating account..." : "Create Account ✓"}
                            </button>
                        </div>
                    </div>
                )}

                <p style={{ textAlign: "center", marginTop: "24px", color: "#475569", fontSize: "0.875rem" }}>
                    Already have an account?{" "}
                    <Link to="/" style={{ color: "#f0c040", textDecoration: "none", fontWeight: 600 }}>Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;