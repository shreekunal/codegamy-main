"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export const dynamic = 'force-dynamic';

export default function ProfileSection() {
  const [data, setData] = useState({});

  async function fetchUserInfo() {
    try {
      const response = await axios.get("/api/getUserInfo");
      const data = response.data;
      setData(data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  }

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const [userInfo] = useState({
    username: "sultan",
    rankings: {
      problems: {
        total: 50,
        solved: 30,
        easy: { total: 20, solved: 15 },
        medium: { total: 20, solved: 10 },
        tough: { total: 10, solved: 5 },
      },
    },
    badges: [
      { name: "Guardian", image: "/guardian.jpeg" },
      { name: "January", image: "/january.jpg" },
      { name: "June", image: "/june.png" },
      { name: "July", image: "/july.png" },
      { name: "Knight", image: "/knight_badge.png" },
      { name: "Soldier", image: "/soldier.png" },
    ],
    skills: {
      Advanced: [
        { name: "Dynamic Programming", count: 1 },
        { name: "Divide and Conquer", count: 1 },
      ],
      Intermediate: [
        { name: "Hash Table", count: 2 },
        { name: "Math", count: 2 },
        { name: "Depth-First Search", count: 3 },
      ],
      Fundamental: [
        { name: "Array", count: 4 },
        { name: "String", count: 2 },
        { name: "Sorting", count: 1 },
      ],
    },
  });

  /* Info rows for the profile card */
  const infoRows = [
    { label: "Age", value: data.age },
    { label: "Gender", value: data.gender },
    { label: "College", value: data.college },
    { label: "City", value: data.city },
    { label: "Country", value: data.country },
    { label: "Rating", value: data.rating },
    { label: "Amount", value: data.amount },
  ];

  const totalSolved =
    userInfo.rankings.problems.easy.solved +
    userInfo.rankings.problems.medium.solved +
    userInfo.rankings.problems.tough.solved;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-10 min-h-screen">
      {/* Page header */}
      <div className="mb-10 animate-on-load animate-slide-down">
        <h1 className="text-3xl font-bold text-dark-1 dark:text-light-1">Profile</h1>
        <div className="h-1 w-12 bg-accent rounded-full mt-2"></div>
      </div>

      {/* Main grid — left sidebar / right content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* === LEFT COLUMN (1/3) === */}
        <div className="flex flex-col gap-6 lg:col-span-1">

          {/* User Info Card */}
          <div className="bg-light-2 dark:bg-dark-3 rounded-2xl shadow-lg p-6 card-hover border border-transparent hover:border-accent/20 animate-on-load animate-slide-up delay-100">
            <h2 className="text-2xl font-bold text-dark-1 dark:text-light-1 mb-1">
              {data.name || "User"}
            </h2>
            <p className="text-sm text-gray-1 dark:text-gray-2 mb-4">{data.email}</p>

            <div className="space-y-2.5">
              {infoRows.map((row) => (
                <div key={row.label} className="flex items-center gap-2">
                  <span className="font-medium min-w-[80px] text-sm text-gray-1 dark:text-gray-2">{row.label}:</span>
                  <span className="text-sm text-dark-1 dark:text-light-4">{row.value || "—"}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2 mt-5">
              <Link
                href="/edit-profile"
                className="bg-accent hover:bg-accent-dark text-white font-semibold py-2.5 px-4 rounded-xl text-center text-sm transition-colors duration-300"
              >
                Edit Profile
              </Link>
              <Link
                href="/login"
                className="bg-light-3 dark:bg-dark-4 hover:bg-light-4 dark:hover:bg-dark-2 text-dark-1 dark:text-light-1 font-semibold py-2.5 px-4 rounded-xl text-center text-sm transition-colors duration-300"
              >
                Logout
              </Link>
            </div>
          </div>

          {/* Skills Card */}
          <div className="bg-light-2 dark:bg-dark-3 rounded-2xl shadow-lg p-6 card-hover border border-transparent hover:border-accent/20 animate-on-load animate-slide-up delay-300">
            <h3 className="text-lg font-bold text-dark-1 dark:text-light-1 mb-4">Skills</h3>
            {Object.entries(userInfo.skills).map(([category, skills]) => (
              <div key={category} className="mb-4 last:mb-0">
                <h4 className="text-sm font-semibold text-accent mb-1.5">{category}</h4>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="text-xs bg-light-3 dark:bg-dark-4 text-dark-1 dark:text-light-4 px-3 py-1.5 rounded-full border border-light-4 dark:border-dark-4"
                    >
                      {skill.name} <span className="text-accent font-semibold">×{skill.count}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* === RIGHT COLUMN (2/3) === */}
        <div className="flex flex-col gap-6 lg:col-span-2">

          {/* Solved Problems Card */}
          <div className="bg-light-2 dark:bg-dark-3 rounded-2xl shadow-lg p-6 card-hover border border-transparent hover:border-accent/20 animate-on-load animate-slide-up delay-200">
            <h3 className="text-lg font-bold text-dark-1 dark:text-light-1 mb-5">Solved Problems</h3>
            <div className="flex gap-8 items-center w-full max-sm:flex-col max-sm:items-start">

              {/* Donut-style circle */}
              <div className="relative min-w-[110px] min-h-[110px]">
                <div className="w-[110px] h-[110px] rounded-full bg-light-4 dark:bg-dark-4 flex justify-center items-center">
                  <div className="w-[90px] h-[90px] rounded-full bg-light-2 dark:bg-dark-3 flex flex-col justify-center items-center">
                    <span className="text-2xl font-bold text-dark-1 dark:text-light-1">{totalSolved}</span>
                    <span className="text-xs text-gray-1 dark:text-gray-2">Solved</span>
                  </div>
                </div>
              </div>

              {/* Progress bars */}
              <div className="flex-grow w-full space-y-3">
                <ProgressBar label="Easy" solved={userInfo.rankings.problems.easy.solved} total={userInfo.rankings.problems.easy.total} color="bg-green-500" />
                <ProgressBar label="Medium" solved={userInfo.rankings.problems.medium.solved} total={userInfo.rankings.problems.medium.total} color="bg-yellow-500" />
                <ProgressBar label="Tough" solved={userInfo.rankings.problems.tough.solved} total={userInfo.rankings.problems.tough.total} color="bg-accent" />
              </div>
            </div>
          </div>

          {/* Badges Card */}
          <div className="bg-light-2 dark:bg-dark-3 rounded-2xl shadow-lg p-6 card-hover border border-transparent hover:border-accent/20 animate-on-load animate-slide-up delay-400">
            <h3 className="text-lg font-bold text-dark-1 dark:text-light-1 mb-4">Badges</h3>
            <Carousel
              additionalTransfrom={0}
              arrows
              autoPlaySpeed={3000}
              centerMode={true}
              containerClass="carousel-container"
              draggable
              focusOnSelect={false}
              infinite
              keyBoardControl
              minimumTouchDrag={80}
              renderButtonGroupOutside={true}
              renderDotsOutside={false}
              responsive={{
                desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3, partialVisibilityGutter: 40 },
                tablet: { breakpoint: { max: 1024, min: 464 }, items: 2, partialVisibilityGutter: 30 },
                mobile: { breakpoint: { max: 464, min: 0 }, items: 1, partialVisibilityGutter: 30 },
              }}
              showDots={false}
              slidesToSlide={1}
              swipeable
            >
              {userInfo.badges.map((badge, index) => (
                <div key={index} className="flex flex-col justify-center items-center h-44 px-2">
                  <img
                    src={badge.image}
                    alt={badge.name}
                    className="w-28 h-28 object-contain rounded-full ring-2 ring-light-4 dark:ring-dark-4 hover:ring-accent transition-all duration-300"
                  />
                  <span className="mt-2 text-xs font-medium text-gray-1 dark:text-gray-2">{badge.name}</span>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Reusable progress bar */
function ProgressBar({ label, solved, total, color }) {
  const pct = total > 0 ? Math.round((solved / total) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="w-16 text-sm font-medium text-gray-1 dark:text-light-4">{label}</span>
      <div className="flex-grow h-3 bg-light-4 dark:bg-dark-4 rounded-full overflow-hidden">
        <div className={`${color} h-full rounded-full transition-all duration-700 ease-out`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs text-gray-1 dark:text-gray-2 min-w-[40px] text-right">{solved}/{total}</span>
    </div>
  );
}
