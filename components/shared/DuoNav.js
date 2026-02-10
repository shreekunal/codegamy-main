"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function DuoNav() {
    const { data: session } = useSession();
    const userID = session?.user?._id;

    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    return (
        <div id="duo-nav">
            <Link href="/" className="duo-nav-logo">
                <img src="/coding.png" alt="cognicode" />
                <span>COGNICODE</span>
            </Link>
            <div className="part-2">
                <h3><Link href={userID ? "/learn" : "/login"}>LEARN</Link></h3>
                <h3><Link href={userID ? "/problems" : "/login"}>PROBLEMS</Link></h3>
            </div>
            <div className="duo-nav-icons">
                <button onClick={toggleTheme} className="duo-theme-btn">
                    <img
                        src={theme === "light" ? "/dark-mode.png" : "/light-mode.png"}
                        alt="theme"
                    />
                </button>
                <Link href={userID ? "/profile" : "/login"} className="duo-profile-btn">
                    <img src="/profile.png" alt="profile" />
                </Link>
            </div>
        </div>
    );
}