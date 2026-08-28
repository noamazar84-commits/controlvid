import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

// 1. SolidCoins (Finance / Wealth)
export const SolidCoins = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M12 2C6.48 2 2 4.01 2 6.5s4.48 4.5 10 4.5 10-2.01 10-4.5S17.52 2 12 2zm0 18c-5.52 0-10-2.01-10-4.5v-3.5c0 2.49 4.48 4.5 10 4.5s10-2.01 10-4.5v3.5c0 2.49-4.48 4.5-10 4.5zm0-5.5c-5.52 0-10-2.01-10-4.5v-3.5c0 2.49 4.48 4.5 10 4.5s10-2.01 10-4.5v3.5c0 2.49-4.48 4.5-10 4.5z" fill="#FFFFFF" />
  </svg>
);

// 2. SolidDollarSign
export const SolidDollarSign = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm1 5.5h-2v1.5H8.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5H11v3H8.5V14h2v1.5h2V14h2.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5H13V8h2.5V6.5H13v-1h-1v1.5z" fill="#FFFFFF" />
  </svg>
);

// 3. SolidBitcoin (Crypto)
export const SolidBitcoin = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4 11.5c0 1.38-1.12 2.5-2.5 2.5H10V18H8v-2h-1.5v-2H8v-3H6.5v-2H8V7H10v2h3.5c1.38 0 2.5 1.12 2.5 2.5 0 .73-.31 1.39-.81 1.84.49.44.81 1.09.81 1.66zM10 11h3.5c.28 0 .5-.22.5-.5s-.22-.5-.5-.5H10v1zm3.5 3H10v1h3.5c.28 0 .5-.22.5-.5s-.22-.5-.5-.5z" fill="#FFFFFF" />
  </svg>
);

// 4. SolidHome (Rental Property / Real Estate)
export const SolidHome = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z" fill="#FFFFFF" />
  </svg>
);

// 5. SolidShield (Tax Saving / Protection)
export const SolidShield = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" fill="#FFFFFF" />
  </svg>
);

// 6. SolidFlame (Fitness / Energy / Stoicism)
export const SolidFlame = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M13.5 2c-5.62 5.62-3.85 10.9-1.11 13.5.38.36.97.23 1.16-.27C14.7 12.35 15.7 10 17 8c1.3 2 3.12 5.38 2.05 9.5C17.9 21.88 13.5 23 12 23s-7.1-1.32-8.5-5.5C2 12.5 6.5 7.5 13.5 2z" fill="#FFFFFF" />
  </svg>
);

// 7. SolidDumbbell (Workout / Strength)
export const SolidDumbbell = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M21.5 6.5h-1c-.83 0-1.5.67-1.5 1.5v2h-4v-2c0-.83-.67-1.5-1.5-1.5H11c-.83 0-1.5.67-1.5 1.5v2h-4v-2C5.5 7.17 4.83 6.5 4 6.5H3C1.34 6.5 0 7.84 0 9.5s1.34 3 3 3h1c.83 0 1.5-.67 1.5-1.5v-2h4v2c0 .83.67 1.5 1.5 1.5H11.5c.83 0 1.5-.67 1.5-1.5v-2h4v2c0 .83.67 1.5 1.5 1.5h1c1.66 0 3-1.34 3-3s-1.34-3-3-3z" fill="#FFFFFF" />
  </svg>
);

// 8. SolidSalad (Diet / Nutrition)
export const SolidSalad = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" fill="#FFFFFF" />
  </svg>
);

// 9. SolidRunningShoe (Cardio / Speed)
export const SolidRunningShoe = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M22 12.5c0-2.49-2.01-4.5-4.5-4.5H14l-2.5-4h-4L5 9.5H2c-1.1 0-2 .9-2 2v3c0 1.1.9 2 2 2h18.5c1.38 0 2.5-1.12 2.5-2.5v-1.5z" fill="#FFFFFF" />
  </svg>
);

// 10. SolidHeart (Love / Relationship)
export const SolidHeart = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#FFFFFF" />
  </svg>
);

// 11. SolidBrain (Mind / Psychology)
export const SolidBrain = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
    <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
    <path d="M12 5V4" />
    <path d="M12 18v1" />
    <path d="M12 11h.01" />
  </svg>
);

// 12. SolidBriefcase (Business / Work)
export const SolidBriefcase = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" fill="#FFFFFF" />
  </svg>
);

// 13. SolidCompass (Travel / Digital Nomad)
export const SolidCompass = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.12 10.12L9 15l2.88-5.12L15 9l-2.88 3.12z" fill="#FFFFFF" />
  </svg>
);

// 14. SolidLaptop (Tech / Code)
export const SolidLaptop = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z" fill="#FFFFFF" />
  </svg>
);

// 15. SolidCpu (AI / Tech / Processors)
export const SolidCpu = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M19 9h2V7h-2V5h-2V3h-2v2h-2V3H9v2H7V3H5v2H3v2h2v2H3v2h2v2H3v2h2v2H3v2h2v2h2v-2h2v2h2v-2h2v2h2v-2h2v2h2v-2h-2v-2h2v-2h-2v-2h2v-2h-2V9h2zm-4 6H9V9h6v6z" fill="#FFFFFF" />
  </svg>
);

// 16. SolidRocket (Startups / Scaling / Launch)
export const SolidRocket = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M12 2C12 2 4 8 4 14c0 3.31 2.69 6 6 6h4c3.31 0 6-2.69 6-6 0-6-8-12-8-12zm2 14h-4v-2h4v2z" fill="#FFFFFF" />
  </svg>
);

// 17. SolidLineChart (Growth / Analytics)
export const SolidLineChart = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z" fill="#FFFFFF" />
  </svg>
);

// 18. SolidOrbit (Space / Atoms / Cosmic Science)
export const SolidOrbit = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <circle cx="12" cy="12" r="5" fill="#FFFFFF" />
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#FFFFFF" />
  </svg>
);

// 19. SolidGraduationCap (School / Education)
export const SolidGraduationCap = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" fill="#FFFFFF" />
  </svg>
);

// 20. SolidBookOpen (History / Secret Files)
export const SolidBookOpen = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M21 3.01H3c-1.1 0-2 .9-2 2V19c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5.01c0-1.1-.9-2-2-2zM9 17H3V5h6v12zm12 0h-6V5h6v12z" fill="#FFFFFF" />
  </svg>
);

// 21. SolidGhost (Horror / Dark Stories)
export const SolidGhost = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M12 2c-4.97 0-9 4.03-9 9v11l2.5-2.5 2.5 2.5 2.5-2.5 2.5 2.5 2.5-2.5 2.5 2.5V11c0-4.97-4.03-9-9-9zm-3 9c-.83 0-1.5-.67-1.5-1.5S8.17 8 9 8s1.5.67 1.5 1.5S9.83 11 9 11zm6 0c-.83 0-1.5-.67-1.5-1.5S14.17 8 15 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" fill="#FFFFFF" />
  </svg>
);

// 22. SolidLock (Dark Web / Cyber Security)
export const SolidLock = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" fill="#FFFFFF" />
  </svg>
);

// 23. SolidKey (Treasure / Secrets)
export const SolidKey = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" fill="#FFFFFF" />
  </svg>
);

// 24. SolidDetective (Crime / Unsolved mysteries)
export const SolidDetective = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="#FFFFFF" />
  </svg>
);

// 25. SolidMessageSquare (Chat Stories / Fake Text)
export const SolidMessageSquare = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" fill="#FFFFFF" />
  </svg>
);

// 26. SolidUsers (Social / People Groups)
export const SolidUsers = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="#FFFFFF" />
  </svg>
);

// 27. SolidClock (Sleep / Recovery / Morning Habits)
export const SolidClock = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" fill="#FFFFFF" />
  </svg>
);

// 28. SolidTarget (Focus / Persuasion / Speedruns)
export const SolidTarget = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="#FFFFFF" />
  </svg>
);

// 29. SolidFilm (Movie Easter Eggs / Cinematic)
export const SolidFilm = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" fill="#FFFFFF" />
  </svg>
);

// 30. SolidMusic (BGM / Audio tracks)
export const SolidMusic = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h6V3h-8z" fill="#FFFFFF" />
  </svg>
);

// 31. SolidCar (Roadtrips / Scenic routes)
export const SolidCar = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.27-3.82c.1-.29.37-.18.66-.18h10.14c.29 0 .56.11.66.18L19 11H5z" fill="#FFFFFF" />
  </svg>
);

// 32. SolidCrown (Luxury / Old Money / Underwood CEO)
export const SolidCrown = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M2 19h20v2H2v-2zm18-12l-4 4-4-8-4 8-4-4-2 11h20L20 7z" fill="#FFFFFF" />
  </svg>
);

// 33. SolidBiohazard (Survival / Apocalypse)
export const SolidBiohazard = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="#FFFFFF" />
  </svg>
);

// 34. SolidGamepad (Gaming module)
export const SolidGamepad = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 3c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm3-3c-.83 0-1.5-.67-1.5-1.5S17.67 10 18.5 10s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" fill="#FFFFFF" />
  </svg>
);

// 35. SolidCloud (Cyber / Blackouts)
export const SolidCloud = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="#FFFFFF" />
  </svg>
);

// 36. SolidSearch (General exploration / investigation)
export const SolidSearch = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="#FFFFFF" />
  </svg>
);

// 37. SolidSmartphone (Mobile / Apps)
export const SolidSmartphone = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" fill="#FFFFFF" />
  </svg>
);

// 38. SolidCheckSquare (Finished items)
export const SolidCheckSquare = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#FFFFFF" />
  </svg>
);

// 39. SolidMap (Beaches / Road Trips / Destination)
export const SolidMap = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48v15.12c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z" fill="#FFFFFF" />
  </svg>
);

// 40. SolidDNA (Longevity / Recoveries / Human health DNA)
export const SolidDNA = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm0-4h-2V7h2v8z" fill="#FFFFFF" />
  </svg>
);

// 41. SolidSparkles (Stoic Morning routine / Unshakable mindset)
export const SolidSparkles = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M11.5 2L9 8.5 2.5 11l6.5 2.5L11.5 20l2.5-6.5L20.5 11l-6.5-2.5L11.5 2z" fill="#FFFFFF" />
  </svg>
);

// 42. SolidShieldAlert (Conspiracy / Warning alarms)
export const SolidShieldAlert = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" fill="#FFFFFF" />
  </svg>
);

// 43. SolidPlanet (Astronomy / Deep mysteries)
export const SolidPlanet = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#FFFFFF" />
  </svg>
);

// 44. SolidAtom (Fusion Energy, etc.)
export const SolidAtom = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 5h-2v3H8v2h3v3h2v-3h3v-2h-3V7zm-7 5a1 1 0 100-2 1 1 0 000 2zm12 0a1 1 0 100-2 1 1 0 000 2z" fill="#FFFFFF" />
  </svg>
);

// 45. SolidTelescope (James Webb Space Discoveries)
export const SolidTelescope = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M11.47 7.12l7.07-7.07 4.24 4.24-7.07 7.07-4.24-4.24zm-1.41 1.41L4.4 14.2l2.83 2.83 5.66-5.66-2.83-2.83zM12 18l-3 4h6l-3-4z" fill="#FFFFFF" />
  </svg>
);

// 46. SolidScroll (Lost Civilizations / Ancient Engineering)
export const SolidScroll = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M22 6V4H2v2c0 1.1.9 2 2 2h1v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V8h1c1.1 0 2-.9 2-2zm-5 12H7V8h10v10zM5 6V5h14v1c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1z" fill="#FFFFFF" />
  </svg>
);

// 47. SolidQuill (Untold History / Historical Conspiracies)
export const SolidQuill = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M20.41 3.59a3.38 3.38 0 0 0-4.78 0L9 10.24l.11 3.12 3.12.11 6.65-6.65a3.38 3.38 0 0 0 0-4.78L20.41 3.59zM3 21h4.24l-3-3L3 21z" fill="#FFFFFF" />
  </svg>
);

// 48. SolidRobot (AI / Humanoid Robots / Robotics)
export const SolidRobot = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M19 8h-2V7c0-2.76-2.24-5-5-5S7 4.24 7 7v1H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2zm-7-4c1.66 0 3 1.34 3 3v1H9V7c0-1.66 1.34-3 3-3zm-4 9c-.83 0-1.5-.67-1.5-1.5S7.17 10 8 10s1.5.67 1.5 1.5S8.83 13 8 13zm8 0c-.83 0-1.5-.67-1.5-1.5S15.17 10 16 10s1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM7 16h10v2H7v-2z" fill="#FFFFFF" />
  </svg>
);

// 49. SolidMicrochip (Quantum Computing / AI Automation)
export const SolidMicrochip = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M19 7h2v2h-2v2h2v2h-2v2h2v2h-2v2h-2v2h-2v-2H11v2H9v-2H7v2H5v-2H3v-2h2v-2H3v-2h2V9H3V7h2V5h2V3h2v2h2V3h2v2h2V3h2v2h2v2zM7 7v10h10V7H7z" fill="#FFFFFF" />
  </svg>
);

// 50. SolidRings (Relationships - Long-distance / Proposal)
export const SolidRings = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M8 2a6 6 0 100 12A6 6 0 008 2zm0 10a4 4 0 110-8 4 4 0 010 8zm8-6a6 6 0 100 12A6 6 0 0016 6zm0 10a4 4 0 110-8 4 4 0 010 8z" fill="#FFFFFF" />
  </svg>
);

// 51. SolidCouple (Relationships - Love Triangle / Romantic)
export const SolidCouple = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M8 8a3 3 0 100-6 3 3 0 000 6zm0 2c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4zm8-2a3 3 0 100-6 3 3 0 000 6zm0 2c-.54 0-1.15.06-1.78.18 1.1 1.05 1.78 2.5 1.78 3.82v3h8v-3c0-2.66-5.33-4-8-4z" fill="#FFFFFF" />
  </svg>
);

// 52. SolidSkull (Horror - Haunted Dolls / Sleep paralysis)
export const SolidSkull = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M12 2C7.58 2 4 5.58 4 10c0 3.25 1.94 6.03 4.75 7.25L8 19.5c0 .83.67 1.5 1.5 1.5h5c.83 0 1.5-.67 1.5-1.5l-.75-2.25C18.06 16.03 20 13.25 20 10c0-4.42-3.58-8-8-8zm-3 9c-.83 0-1.5-.67-1.5-1.5S8.17 8 9 8s1.5.67 1.5 1.5S9.83 11 9 11zm6 0c-.83 0-1.5-.67-1.5-1.5S14.17 8 15 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-3 5h-2v-2h2v2z" fill="#FFFFFF" />
  </svg>
);

// 53. SolidShieldCheck (AI era Cybersecurity)
export const SolidShieldCheck = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 15l-4-4 1.41-1.41L10 13.17l5.59-5.59L17 9l-7 7z" fill="#FFFFFF" />
  </svg>
);

// 54. SolidFingerprint (Crime - Missing persons / FBI interrogations)
export const SolidFingerprint = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M12 1C5.93 1 1 5.93 1 12c0 3.04 1.23 5.79 3.22 7.78l1.41-1.41C4.04 16.78 3 14.51 3 12c0-4.97 4.03-9 9-9s9 4.03 9 9c0 2.51-1.04 4.78-2.63 6.37l1.41 1.41C21.77 17.79 23 15.04 23 12c0-6.07-4.93-11-11-11zm0 4c-3.87 0-7 3.13-7 7 0 1.94.79 3.69 2.06 4.94l1.41-1.41C7.56 13.75 7 12.94 7 12c0-2.76 2.24-5 5-5s5 2.24 5 5c0 .94-.56 1.75-1.47 2.53l1.41 1.41C18.21 14.69 19 13.44 19 12c0-3.87-3.13-7-7-7zm0 4c-1.66 0-3 1.34-3 3 0 .83.34 1.58.88 2.12l1.41-1.41c-.18-.18-.29-.44-.29-.71 0-.55.45-1 1-1s1 .45 1 1c0 .27-.11.53-.29.71l1.41 1.41c.54-.54.88-1.29.88-2.12 0-1.66-1.34-3-3-3z" fill="#FFFFFF" />
  </svg>
);

// 55. SolidApple (Fitness - Biohacking / Nutrition)
export const SolidApple = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M12 5c-.32-1.63-1.41-3-3-3s-.68 1.37-.5 3c.18 1.63 1.41 3 3 3s.68-1.37.5-3zm6.5 4.5c.32 1.63 1.41 3 3 3s.68-1.37.5-3c-.18-1.63-1.41-3-3-3s-.68 1.37-.5 3zm-6.5-1c-3.58 0-6.5 2.92-6.5 6.5s2.92 6.5 6.5 6.5 6.5-2.92 6.5-6.5S15.58 8.5 12 8.5z" fill="#FFFFFF" />
  </svg>
);

// 56. SolidGem (Wealth - Luxury lifestyle / Undercover millionaire)
export const SolidGem = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M12 2L2 9l10 13 10-13L12 2zm0 3.25l6.5 4.55H5.5L12 5.25zm-5.5 6h11L12 18.75 6.5 11.25z" fill="#FFFFFF" />
  </svg>
);

// 57. SolidTent (Travel - National Parks / Budget Backpacking)
export const SolidTent = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`niche-tile-icon ${props.className || ""}`} {...props}>
    <path d="M12 2L2 20h20L12 2zm0 4.25L18.5 18h-13L12 6.25zM12 9l-4 7h8l-4-7z" fill="#FFFFFF" />
  </svg>
);


// Exact 1-to-1 Sub-Niche to SVG component database mapping
const exactSubNicheMapping: Record<string, React.ComponentType<any>> = {
  // FINANCE & WEALTH
  "dividend growth investing": SolidLineChart,
  "high-income side hustles": SolidCoins,
  "rental property investing": SolidHome,
  "etf investing for beginners": SolidDollarSign,
  "ai-powered investing tools": SolidCpu,
  "crypto": SolidBitcoin,
  "financial freedom (fire)": SolidFlame,
  "tax saving strategies": SolidShield,
  "passive income (digital products)": SolidLaptop,
  "millionaire money habits": SolidCrown,

  // FITNESS & DIET
  "weight loss for men over 35": SolidRunningShoe,
  "natural testosterone optimization": SolidFlame,
  "high-protein meal prep": SolidSalad,
  "home workouts (no equipment)": SolidDumbbell,
  "muscle building after 40": SolidDumbbell,
  "intermittent fasting for fat loss": SolidClock,
  "longevity & healthy aging": SolidDNA,
  "walking for fat loss": SolidRunningShoe,
  "biohacking for better health": SolidApple,
  "sleep optimization & recovery": SolidClock,

  // TECH & FUTURE AI
  "ai tools for business owners": SolidBriefcase,
  "ai automation workflows": SolidMicrochip,
  "chatgpt for productivity": SolidMessageSquare,
  "ai side hustles": SolidCoins,
  "ai agents for small businesses": SolidUsers,
  "no-code ai app development": SolidLaptop,
  "ai video creation": SolidFilm,
  "cybersecurity in the ai era": SolidShieldCheck,
  "humanoid robots & robotics": SolidRobot,
  "future ai jobs & careers": SolidCpu,

  // MOTIVATION & MINDSET
  "stoicism for modern men": SolidFlame,
  "self-discipline systems": SolidTarget,
  "morning routines of millionaires": SolidClock,
  "deep work & focus": SolidBrain,
  "mental toughness training": SolidDumbbell,
  "building unshakable confidence": SolidSparkles,
  "breaking bad habits": SolidLock,
  "productivity systems": SolidLaptop,
  "goal achievement frameworks": SolidLineChart,
  "resilience after failure": SolidFlame,

  // BUSINESS & STARTUPS
  "ai saas startup ideas": SolidRocket,
  "one-person businesses": SolidBriefcase,
  "b2b lead generation systems": SolidUsers,
  "sales funnels that convert": SolidLineChart,
  "high-ticket consulting businesses": SolidBriefcase,
  "shopify brand growth": SolidSmartphone,
  "subscription business models": SolidCoins,
  "linkedin personal branding": SolidCrown,
  "agency growth strategies": SolidBriefcase,
  "startup case studies": SolidBookOpen,

  // TRAVEL & EXPLORATION
  "hidden european destinations": SolidMap,
  "luxury travel on a budget": SolidCrown,
  "digital nomad cities": SolidLaptop,
  "national parks adventures": SolidTent,
  "solo travel safety": SolidShield,
  "food tourism around the world": SolidApple,
  "remote islands & secret beaches": SolidMap,
  "budget backpacking": SolidTent,
  "scenic road trips": SolidCar,
  "adventure travel experiences": SolidCompass,

  // HUMAN PSYCHOLOGY
  "dark psychology explained": SolidBrain,
  "body language analysis": SolidDetective,
  "cognitive biases in daily life": SolidTarget,
  "emotional intelligence": SolidHeart,
  "persuasion & influence": SolidBrain,
  "psychology of attraction": SolidHeart,
  "habit formation science": SolidClock,
  "social status & human behavior": SolidUsers,
  "manipulation tactics (educational)": SolidTarget,
  "decision-making psychology": SolidBrain,

  // SCIENCE & SPACE
  "james webb space discoveries": SolidTelescope,
  "black holes explained": SolidOrbit,
  "mars colonization": SolidPlanet,
  "quantum computing": SolidMicrochip,
  "neuroscience & the brain": SolidBrain,
  "longevity research": SolidDNA,
  "fusion energy": SolidAtom,
  "search for alien life": SolidPlanet,
  "future space missions": SolidRocket,
  "ancient mysteries explained by science": SolidBookOpen,

  // POP CULTURE & MEDIA
  "youtube algorithm secrets": SolidLineChart,
  "creator economy trends": SolidUsers,
  "celebrity business empires": SolidCrown,
  "streaming platform wars": SolidFilm,
  "viral marketing campaigns": SolidSparkles,
  "movie easter eggs & hidden details": SolidFilm,
  "music industry business": SolidMusic,
  "internet culture & memes": SolidSmartphone,
  "social media growth strategies": SolidLineChart,
  "brand success stories": SolidBriefcase,

  // UNTOLD HISTORY
  "lost civilizations (atlantis, göbekli tepe, etc.)": SolidScroll,
  "secret military projects": SolidShieldAlert,
  "cold war spy stories": SolidDetective,
  "ancient engineering mysteries": SolidScroll,
  "forgotten empires": SolidCrown,
  "history's greatest heists": SolidKey,
  "hidden treasure legends": SolidGem,
  "archaeological discoveries": SolidScroll,
  "historical conspiracies (evidence-based)": SolidShieldAlert,
  "unsolved historical mysteries": SolidBookOpen,

  // --- SPECIAL NICHES & SUB-NICHES ---
  // Relationships
  "cheating partner gets exposed": SolidDetective,
  "toxic ex returns": SolidHeart,
  "secret admirer": SolidHeart,
  "long-distance relationship drama": SolidRings,
  "love triangle": SolidCouple,
  "gold digger stories": SolidCoins,
  "fake pregnancy prank": SolidSparkles,
  "marriage proposal gone wrong": SolidRings,
  "jealous best friend": SolidUsers,
  "breakup revenge": SolidFlame,

  // Horror
  "haunted hotel": SolidGhost,
  "unknown phone number": SolidSmartphone,
  "stalker stories": SolidLock,
  "paranormal encounters": SolidGhost,
  "creepy neighbors": SolidDetective,
  "dark web messages": SolidLaptop,
  "midnight challenges": SolidClock,
  "haunted dolls": SolidSkull,
  "sleep paralysis": SolidSkull,
  "urban legends": SolidBookOpen,

  // Crime & Mystery
  "missing person cases": SolidFingerprint,
  "bank robberies": SolidCoins,
  "serial killer stories": SolidDetective,
  "detective investigations": SolidDetective,
  "prison escape stories": SolidLock,
  "identity theft": SolidSmartphone,
  "famous unsolved mysteries": SolidSearch,
  "kidnapping survival": SolidShieldAlert,
  "fbi interrogations": SolidFingerprint,
  "scammer revenge": SolidFlame,

  // Wealth & Luxury
  "billionaire tests strangers": SolidCrown,
  "hidden millionaire": SolidGem,
  "lottery winner stories": SolidCoins,
  "rich vs poor": SolidBriefcase,
  "ceo undercover": SolidBriefcase,
  "luxury lifestyle": SolidGem,
  "old money families": SolidCrown,
  "inheritance drama": SolidScroll,
  "private jet lifestyle": SolidRocket,
  "supercar collections": SolidCar,

  // School & College
  "mean teacher": SolidGraduationCap,
  "strict principal": SolidGraduationCap,
  "school bully revenge": SolidFlame,
  "exam cheating": SolidLock,
  "prom drama": SolidHeart,
  "college roommate stories": SolidUsers,
  "secret crush": SolidHeart,
  "school prank wars": SolidGamepad,
  "teacher favoritism": SolidGraduationCap,
  "graduation stories": SolidGraduationCap,

  // Workplace
  "toxic boss": SolidBriefcase,
  "office romance": SolidHeart,
  "getting fired": SolidBriefcase,
  "employee revenge": SolidBriefcase,
  "crazy customers": SolidUsers,
  "startup founder life": SolidRocket,
  "job interview fails": SolidBriefcase,
  "coworker betrayal": SolidUsers,
  "promotion drama": SolidCrown,
  "work-from-home disasters": SolidLaptop,

  // Survival & Apocalypse
  "zombie outbreak": SolidBiohazard,
  "nuclear war": SolidBiohazard,
  "alien invasion": SolidPlanet,
  "last person alive": SolidTarget,
  "survival island": SolidMap,
  "ai takes over": SolidRobot,
  "global blackout": SolidFlame,
  "pandemic survival": SolidBiohazard,
  "world ends tomorrow": SolidClock,
  "bunker life": SolidShield,

  // Gaming
  "gta roleplay": SolidGamepad,
  "minecraft survival": SolidGamepad,
  "fortnite moments": SolidGamepad,
  "roblox stories": SolidGamepad,
  "horror game pov": SolidGhost,
  "speedrun fails": SolidClock,
  "mobile gaming": SolidSmartphone,
  "streamer drama": SolidUsers,
  "gaming challenges": SolidTarget,
  "esports stories": SolidGamepad,

  // Psychology & Mind Games
  "dark psychology": SolidBrain,
  "manipulation tactics": SolidBrain,
  "narcissist behavior": SolidBrain,
  "human behavior facts": SolidBrain,
  "body language secrets": SolidDetective,
  "high iq puzzles": SolidTarget,
  "social experiments": SolidUsers,
  "reverse psychology": SolidBrain,
  "lie detection": SolidFingerprint,

  // AI & Technology
  "ai becomes sentient": SolidRobot,
  "chatbot conversations": SolidMessageSquare,
  "time-travel app": SolidSmartphone,
  "hacker stories": SolidLock,
  "smart home gone wrong": SolidHome,
  "deepfake drama": SolidFilm,
  "future technology": SolidCpu,
  "secret government ai": SolidShieldAlert,
  "robot friendships": SolidRobot,
  "virtual reality gone wrong": SolidGamepad
};

// Dynamic mapping logic
export function getNicheIcon(name: string) {
  const n = name.toLowerCase().trim();
  
  // 1. Check exact match in the dictionary first
  if (exactSubNicheMapping[n]) {
    return exactSubNicheMapping[n];
  }

  // 2. Fallbacks based on topic-specific keywords
  if (n.includes("dividend") || n.includes("etf")) return SolidLineChart;
  if (n.includes("crypto") || n.includes("bitcoin")) return SolidBitcoin;
  if (n.includes("rental") || n.includes("property") || n.includes("real estate")) return SolidHome;
  if (n.includes("tax") || n.includes("saving") || n.includes("shield")) return SolidShield;
  if (n.includes("passive") || n.includes("side hustle") || n.includes("millionaire")) return SolidCoins;
  if (n.includes("wealth") || n.includes("finance") || n.includes("money")) return SolidCoins;

  // FITNESS & DIET sub-niches
  if (n.includes("diet") || n.includes("meal") || n.includes("salad") || n.includes("nutrition")) return SolidSalad;
  if (n.includes("cardio") || n.includes("walking") || n.includes("running") || n.includes("shoe")) return SolidRunningShoe;
  if (n.includes("muscle") || n.includes("testosterone") || n.includes("strength")) return SolidDumbbell;
  if (n.includes("workout") || n.includes("fitness") || n.includes("gym")) return SolidDumbbell;
  if (n.includes("sleep") || n.includes("recovery") || n.includes("clock")) return SolidClock;
  if (n.includes("biohacking") || n.includes("health") || n.includes("aging") || n.includes("longevity")) return SolidDNA;

  // Tech & Future AI
  if (n.includes("chatgpt") || n.includes("automation") || n.includes("workflow")) return SolidCpu;
  if (n.includes("agent") || n.includes("sentient") || n.includes("chatbot")) return SolidCpu;
  if (n.includes("cybersecurity") || n.includes("hacker")) return SolidLock;
  if (n.includes("robot") || n.includes("hardware")) return SolidGamepad;
  if (n.includes("tech") || n.includes("laptop") || n.includes("software") || n.includes("code") || n.includes("app")) return SolidLaptop;

  // Motivation & Mindset
  if (n.includes("stoic") || n.includes("discipline") || n.includes("resilience")) return SolidFlame;
  if (n.includes("routine") || n.includes("morning")) return SolidClock;
  if (n.includes("deep work") || n.includes("focus") || n.includes("concentration") || n.includes("habit")) return SolidTarget;
  if (n.includes("confidence") || n.includes("motivation") || n.includes("mindset")) return SolidSparkles;

  // Business & Startups
  if (n.includes("saas") || n.includes("startup") || n.includes("launch")) return SolidRocket;
  if (n.includes("lead") || n.includes("sale") || n.includes("funnel") || n.includes("scale") || n.includes("growth")) return SolidLineChart;
  if (n.includes("brand") || n.includes("linkedin") || n.includes("b2b")) return SolidBriefcase;
  if (n.includes("business") || n.includes("consulting") || n.includes("agency")) return SolidBriefcase;

  // Travel & Exploration
  if (n.includes("hidden") || n.includes("secret") || n.includes("beach") || n.includes("destination")) return SolidMap;
  if (n.includes("luxury travel") || n.includes("nomad")) return SolidCompass;
  if (n.includes("park") || n.includes("adventure") || n.includes("road trip") || n.includes("backpack")) return SolidCar;
  if (n.includes("travel") || n.includes("exploration") || n.includes("world") || n.includes("food tourism")) return SolidCompass;

  // Human Psychology
  if (n.includes("dark psychology") || n.includes("manipulation")) return SolidLock;
  if (n.includes("body language") || n.includes("attraction")) return SolidHeart;
  if (n.includes("cognitive") || n.includes("bias") || n.includes("persuasion") || n.includes("lie")) return SolidTarget;
  if (n.includes("psychology") || n.includes("brain") || n.includes("narcissist") || n.includes("behavior")) return SolidBrain;
  if (n.includes("social") || n.includes("intelligence") || n.includes("emotion")) return SolidUsers;

  // Science & Space
  if (n.includes("space") || n.includes("mars") || n.includes("james webb") || n.includes("astronomy") || n.includes("mission")) return SolidRocket;
  if (n.includes("black hole") || n.includes("quantum") || n.includes("fusion") || n.includes("planet") || n.includes("alien")) return SolidOrbit;
  if (n.includes("neuroscience") || n.includes("longevity research") || n.includes("biology") || n.includes("dna") || n.includes("science")) return SolidDNA;

  // Pop Culture & Media
  if (n.includes("algorithm") || n.includes("growth strategy") || n.includes("viral marketing")) return SolidLineChart;
  if (n.includes("creator") || n.includes("celebrity") || n.includes("empire")) return SolidCrown;
  if (n.includes("streaming") || n.includes("movie") || n.includes("easter egg") || n.includes("cinema") || n.includes("show")) return SolidFilm;
  if (n.includes("music") || n.includes("song")) return SolidMusic;
  if (n.includes("culture") || n.includes("meme") || n.includes("social media") || n.includes("pop")) return SolidSmartphone;

  // Untold History
  if (n.includes("civilization") || n.includes("ancient") || n.includes("archaeological") || n.includes("history")) return SolidBookOpen;
  if (n.includes("spy") || n.includes("conspiracy") || n.includes("military") || n.includes("unsolved") || n.includes("mystery")) return SolidDetective;
  if (n.includes("heist") || n.includes("treasure") || n.includes("legend")) return SolidKey;

  // Special engine sub-niches:
  // Relationships
  if (n.includes("cheat") || n.includes("ex") || n.includes("breakup") || n.includes("revenge") || n.includes("relationship") || n.includes("love") || n.includes("marriage") || n.includes("propose") || n.includes("triangle")) return SolidHeart;
  if (n.includes("gold digger") || n.includes("prank") || n.includes("friend")) return SolidUsers;
  // Horror
  if (n.includes("haunted") || n.includes("ghost") || n.includes("creepy") || n.includes("midnight") || n.includes("horror") || n.includes("sleep paralysis") || n.includes("urban legend")) return SolidGhost;
  if (n.includes("dark web") || n.includes("stalker") || n.includes("unknown phone")) return SolidLock;
  // Crime & Mystery
  if (n.includes("robber") || n.includes("prison") || n.includes("fbi") || n.includes("crime") || n.includes("detective") || n.includes("serial killer") || n.includes("interrog") || n.includes("kidnap")) return SolidDetective;
  // Wealth & Luxury
  if (n.includes("billionaire") || n.includes("millionaire") || n.includes("ceo") || n.includes("rich") || n.includes("luxury") || n.includes("old money") || n.includes("supercar") || n.includes("jet") || n.includes("lottery") || n.includes("inheritance")) return SolidCrown;
  // School & College
  if (n.includes("school") || n.includes("college") || n.includes("teacher") || n.includes("principal") || n.includes("exam") || n.includes("prom") || n.includes("crush") || n.includes("bully") || n.includes("graduation")) return SolidGraduationCap;
  // Workplace
  if (n.includes("workplace") || n.includes("office") || n.includes("employee") || n.includes("coworker") || n.includes("boss") || n.includes("fired") || n.includes("customer") || n.includes("job") || n.includes("work-from-home")) return SolidBriefcase;
  // Survival & Apocalypse
  if (n.includes("zombie") || n.includes("apocalypse") || n.includes("survival") || n.includes("invasion") || n.includes("nuclear") || n.includes("war") || n.includes("bunker") || n.includes("blackout") || n.includes("world ends")) return SolidBiohazard;
  // Gaming
  if (n.includes("gaming") || n.includes("game") || n.includes("minecraft") || n.includes("gta") || n.includes("fortnite") || n.includes("roblox") || n.includes("streamer") || n.includes("speedrun") || n.includes("esports")) return SolidGamepad;

  // Fallbacks based on keywords
  if (n.includes("heart") || n.includes("relation") || n.includes("partner")) return SolidHeart;
  if (n.includes("ghost") || n.includes("scary")) return SolidGhost;
  if (n.includes("science") || n.includes("atom") || n.includes("space")) return SolidOrbit;
  if (n.includes("dollar") || n.includes("coin") || n.includes("pay") || n.includes("earn")) return SolidCoins;
  if (n.includes("health") || n.includes("workout") || n.includes("fit")) return SolidDumbbell;
  if (n.includes("brain") || n.includes("psycho")) return SolidBrain;
  if (n.includes("tech") || n.includes("code") || n.includes("ai")) return SolidCpu;
  if (n.includes("car") || n.includes("drive") || n.includes("vehicle")) return SolidCar;
  if (n.includes("crown") || n.includes("king") || n.includes("queen") || n.includes("luxury")) return SolidCrown;
  if (n.includes("book") || n.includes("read") || n.includes("educat")) return SolidBookOpen;
  if (n.includes("star") || n.includes("sparkle")) return SolidSparkles;
  if (n.includes("chat") || n.includes("message") || n.includes("sms")) return SolidMessageSquare;

  return SolidCheckSquare; // Final fallback
}
