// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";



// const Login = () => {
//     const navigate = useNavigate();

//     const [form, setForm] = useState({
//         email: "",
//         password: "",
//     });

//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         if (token) {
//             navigate("/dashboard");
//         }
//     }, [navigate]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const res = await axios.post(
//                 "http://localhost:5001/api/auth/login",
//                 form
//             );

//             // ✅ STORE TOKEN
//             localStorage.setItem("token", res.data.token);
//             localStorage.setItem("user", JSON.stringify(res.data.user));
//             localStorage.setItem("userId", res.data.userId);

//             alert("Login successful");

//             navigate("/dashboard");

//         } catch (err) {
//             console.log(err.response); // 🔥 ADD THIS
//             alert(err.response?.data || "Login failed");
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input
//                 type="email"
//                 placeholder="Email"
//                 onChange={(e) =>
//                     setForm({ ...form, email: e.target.value })
//                 }
//             />

//             <input
//                 type="password"
//                 placeholder="Password"
//                 onChange={(e) =>
//                     setForm({ ...form, password: e.target.value })
//                 }
//             />

//             <button>Login</button>
//         </form>
//     );
// };

// export default Login;



import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { gsap } from "gsap";

const Login = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const cardRef = useRef(null);
    const titleRef = useRef(null);
    const formRef = useRef(null);
    const orb1Ref = useRef(null);
    const orb2Ref = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) { navigate("/dashboard"); return; }

        const tl = gsap.timeline();
        tl.fromTo(orb1Ref.current,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" }
        );
        tl.fromTo(orb2Ref.current,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" },
            "-=0.8"
        );
        tl.fromTo(cardRef.current,
            { y: 40, opacity: 0, scale: 0.97 },
            { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "power3.out" },
            "-=0.6"
        );
        tl.fromTo(titleRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
            "-=0.3"
        );
        tl.fromTo(formRef.current?.children || [],
            { y: 15, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "power2.out" },
            "-=0.2"
        );

        // Floating orbs
        gsap.to(orb1Ref.current, {
            y: -30, x: 20, duration: 4, ease: "sine.inOut", yoyo: true, repeat: -1
        });
        gsap.to(orb2Ref.current, {
            y: 25, x: -15, duration: 5, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1
        });
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        gsap.to(cardRef.current, { scale: 0.99, duration: 0.1 });

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, form);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem("userId", res.data.userId);

            gsap.to(cardRef.current, {
                y: -20, opacity: 0, scale: 0.97, duration: 0.4, ease: "power2.in",
                onComplete: () => navigate("/dashboard")
            });
        } catch (err) {
            gsap.to(cardRef.current, {
                x: [-8, 8, -6, 6, 0], duration: 0.4, ease: "power2.inOut"
            });
            alert(err.response?.data || "Login failed");
        } finally {
            setLoading(false);
            gsap.to(cardRef.current, { scale: 1, duration: 0.2 });
        }
    };

    const wrapStyle = {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 20px 40px",
        position: "relative",
        overflow: "hidden",
    };

    const orbStyle = (pos) => ({
        position: "absolute",
        borderRadius: "50%",
        filter: "blur(80px)",
        pointerEvents: "none",
        ...pos,
    });

    const cardStyle = {
        background: "rgba(10, 22, 40, 0.7)",
        border: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(30px)",
        borderRadius: "24px",
        padding: "48px 44px",
        width: "100%",
        maxWidth: "420px",
        boxShadow: "0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(240,192,64,0.05)",
        position: "relative",
        zIndex: 2,
    };

    const inputStyle = {
        width: "100%",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "12px",
        padding: "13px 16px",
        color: "#e2e8f0",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "0.9rem",
        outline: "none",
        transition: "all 0.2s ease",
        marginBottom: "16px",
    };

    return (
        <div style={wrapStyle}>
            {/* Background orbs */}
            <div ref={orb1Ref} style={orbStyle({ width: "400px", height: "400px", background: "rgba(30,58,120,0.5)", top: "-100px", left: "-100px" })} />
            <div ref={orb2Ref} style={orbStyle({ width: "300px", height: "300px", background: "rgba(45,212,191,0.1)", bottom: "-80px", right: "-60px" })} />

            <div ref={cardRef} style={cardStyle}>
                {/* Top accent */}
                <div style={{ height: "2px", background: "linear-gradient(90deg, transparent, #f0c040, transparent)", marginBottom: "36px", borderRadius: "1px" }} />

                <div ref={titleRef}>
                    <p style={{ fontSize: "0.75rem", letterSpacing: "0.15em", color: "#f0c040", fontWeight: 600, textTransform: "uppercase", marginBottom: "8px" }}>
                        Welcome back
                    </p>
                    <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "2.2rem", color: "#fff", lineHeight: 1.1, marginBottom: "8px" }}>
                        Sign in to your<br />
                        <span style={{ color: "#f0c040" }}>account</span>
                    </h1>
                    <p style={{ color: "#475569", fontSize: "0.875rem", marginBottom: "36px" }}>
                        Track and verify your professional skills
                    </p>
                </div>

                <form ref={formRef} onSubmit={handleSubmit}>
                    <label style={{ fontSize: "0.75rem", color: "#94a3b8", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500 }}>
                        Email Address
                    </label>
                    <input
                        type="email"
                        placeholder="you@example.com"
                        style={inputStyle}
                        onFocus={(e) => { e.target.style.borderColor = "#f0c040"; e.target.style.boxShadow = "0 0 0 3px rgba(240,192,64,0.1)"; e.target.style.background = "rgba(240,192,64,0.04)"; }}
                        onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.boxShadow = "none"; e.target.style.background = "rgba(255,255,255,0.04)"; }}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                    />

                    <label style={{ fontSize: "0.75rem", color: "#94a3b8", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500 }}>
                        Password
                    </label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        style={inputStyle}
                        onFocus={(e) => { e.target.style.borderColor = "#f0c040"; e.target.style.boxShadow = "0 0 0 3px rgba(240,192,64,0.1)"; e.target.style.background = "rgba(240,192,64,0.04)"; }}
                        onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.boxShadow = "none"; e.target.style.background = "rgba(255,255,255,0.04)"; }}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: "100%",
                            padding: "14px",
                            background: loading ? "rgba(240,192,64,0.4)" : "linear-gradient(135deg, #f0c040, #e0a820)",
                            color: "#060b18",
                            fontFamily: "'DM Sans', sans-serif",
                            fontWeight: 700,
                            fontSize: "0.95rem",
                            borderRadius: "12px",
                            border: "none",
                            cursor: loading ? "not-allowed" : "pointer",
                            marginTop: "8px",
                            transition: "all 0.25s ease",
                            boxShadow: "0 4px 20px rgba(240,192,64,0.25)",
                            letterSpacing: "0.02em",
                        }}
                        onMouseEnter={(e) => { if (!loading) e.target.style.boxShadow = "0 8px 30px rgba(240,192,64,0.4)"; }}
                        onMouseLeave={(e) => { e.target.style.boxShadow = "0 4px 20px rgba(240,192,64,0.25)"; }}
                    >
                        {loading ? "Signing in..." : "Sign In →"}
                    </button>

                    <p style={{ textAlign: "center", marginTop: "24px", color: "#475569", fontSize: "0.875rem" }}>
                        Don't have an account?{" "}
                        <Link to="/signup" style={{ color: "#f0c040", textDecoration: "none", fontWeight: 600 }}>
                            Create one
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;