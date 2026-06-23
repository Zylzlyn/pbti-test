"use client";

export default function BeachScene() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#92A8D1" />
            <stop offset="30%" stopColor="#AFC0E0" />
            <stop offset="60%" stopColor="#DAE2F0" />
            <stop offset="85%" stopColor="#F5D5D8" />
            <stop offset="100%" stopColor="#F7CAC9" />
          </linearGradient>
          <linearGradient id="oceanGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7B9BC8" />
            <stop offset="30%" stopColor="#92A8D1" />
            <stop offset="70%" stopColor="#AFC0E0" />
            <stop offset="100%" stopColor="#D4C5D0" />
          </linearGradient>
          <linearGradient id="sandGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F5D5D8" />
            <stop offset="30%" stopColor="#F2CDD0" />
            <stop offset="70%" stopColor="#EABFC3" />
            <stop offset="100%" stopColor="#D4ADB5" />
          </linearGradient>
          <linearGradient id="sandShore" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F0D0D3" />
            <stop offset="100%" stopColor="#F7CAC9" />
          </linearGradient>
          <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F0B0B5" stopOpacity="0.95" />
            <stop offset="15%" stopColor="#F0B0B5" stopOpacity="0.6" />
            <stop offset="40%" stopColor="#F7CAC9" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#F7CAC9" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="1440" height="900" fill="url(#skyGrad)" />

        {/* sun glow */}
        <circle cx="720" cy="370" r="320" fill="url(#sunGlow)" />
        <circle cx="720" cy="370" r="50" fill="#E88B92" opacity="0.95" />
        <circle cx="720" cy="370" r="65" fill="#F0B0B5" opacity="0.3" />
        <circle cx="720" cy="370" r="90" fill="#F7CAC9" opacity="0.1" />

        {/* clouds */}
        <g opacity="0.85">
          <g>
            <ellipse cx="200" cy="180" rx="70" ry="28" fill="white" />
            <ellipse cx="250" cy="165" rx="55" ry="32" fill="white" />
            <ellipse cx="160" cy="170" rx="45" ry="22" fill="white" />
            <ellipse cx="220" cy="155" rx="40" ry="20" fill="white" opacity="0.9" />
          </g>
          <g>
            <ellipse cx="500" cy="130" rx="60" ry="24" fill="white" />
            <ellipse cx="550" cy="115" rx="48" ry="28" fill="white" />
            <ellipse cx="470" cy="120" rx="38" ry="18" fill="white" />
          </g>
          <g>
            <ellipse cx="950" cy="150" rx="75" ry="30" fill="white" />
            <ellipse cx="1010" cy="135" rx="55" ry="32" fill="white" />
            <ellipse cx="900" cy="140" rx="42" ry="20" fill="white" />
            <ellipse cx="980" cy="125" rx="38" ry="18" fill="white" opacity="0.9" />
          </g>
          <g>
            <ellipse cx="1250" cy="200" rx="55" ry="22" fill="white" />
            <ellipse cx="1300" cy="185" rx="42" ry="25" fill="white" />
            <ellipse cx="1210" cy="190" rx="35" ry="17" fill="white" />
          </g>
          <g opacity="0.6">
            <ellipse cx="350" cy="245" rx="50" ry="18" fill="white" />
            <ellipse cx="390" cy="235" rx="35" ry="20" fill="white" />
            <ellipse cx="800" cy="215" rx="45" ry="16" fill="white" />
            <ellipse cx="840" cy="205" rx="32" ry="18" fill="white" />
            <ellipse cx="1080" cy="275" rx="40" ry="15" fill="white" />
            <ellipse cx="1110" cy="265" rx="28" ry="16" fill="white" />
          </g>
        </g>

        {/* distant birds */}
        <g stroke="#92A8D1" strokeWidth="1.5" fill="none" opacity="0.35">
          <path d="M300 300 Q308 293 316 300" />
          <path d="M320 290 Q326 285 332 290" />
          <path d="M280 305 Q286 300 292 305" />
          <path d="M1180 260 Q1186 254 1192 260" />
          <path d="M1160 270 Q1168 263 1176 270" />
        </g>

        {/* ocean */}
        <path
          d="M0 520 Q180 505 360 515 Q540 525 720 510 Q900 495 1080 510 Q1260 525 1440 515 L1440 900 L0 900Z"
          fill="url(#oceanGrad)"
        />

        {/* wave lines on ocean */}
        <g stroke="#B3C7E3" strokeWidth="1.5" fill="none" opacity="0.25">
          <path d="M40 560 Q100 553 160 560 Q220 567 280 560 Q340 553 400 560" />
          <path d="M380 580 Q440 573 500 580 Q560 587 620 580 Q680 573 740 580" />
          <path d="M700 555 Q760 548 820 555 Q880 562 940 555 Q1000 548 1060 555" />
          <path d="M1020 575 Q1080 568 1140 575 Q1200 582 1260 575 Q1320 568 1380 575" />
          <path d="M100 600 Q160 593 220 600 Q280 607 340 600 Q400 593 460 600" />
          <path d="M600 610 Q660 603 720 610 Q780 617 840 610 Q900 603 960 610" />
          <path d="M1100 600 Q1160 593 1220 600 Q1280 607 1340 600" />
        </g>

        {/* shore / foam */}
        <path
          d="M0 640 Q180 625 360 640 Q540 655 720 635 Q900 615 1080 635 Q1260 655 1440 640 L1440 660 Q1260 670 1080 655 Q900 640 720 650 Q540 660 360 650 Q180 640 0 655Z"
          fill="white"
          opacity="0.35"
        />

        {/* sand / beach */}
        <path
          d="M0 660 Q360 640 720 650 Q1080 660 1440 645 L1440 900 L0 900Z"
          fill="url(#sandGrad)"
        />
        <path
          d="M0 720 Q360 700 720 715 Q1080 730 1440 710 L1440 900 L0 900Z"
          fill="#EABFC3"
          opacity="0.5"
        />

        {/* sand texture dots */}
        <g fill="#D4ADB5" opacity="0.25">
          {Array.from({ length: 40 }).map((_, i) => {
            const x = 40 + (i * 1360) / 39 + Math.sin(i * 1.7) * 15;
            const y = 700 + (i * 180) / 39 + Math.cos(i * 2.3) * 12;
            return <circle key={i} cx={x} cy={y} r={1 + (i % 3) * 0.5} />;
          })}
        </g>

        {/* small shells on beach */}
        <g opacity="0.2">
          <text x="300" y="775" fontSize="12" fill="#C89DA5">✦</text>
          <text x="650" y="795" fontSize="10" fill="#C89DA5">✦</text>
          <text x="1050" y="765" fontSize="11" fill="#C89DA5">✦</text>
          <text x="500" y="835" fontSize="8" fill="#C89DA5">✦</text>
          <text x="900" y="855" fontSize="9" fill="#C89DA5">✦</text>
        </g>
      </svg>
    </div>
  );
}
