import React from 'react';

interface LFCLogoProps {
  className?: string;
  size?: number | string;
  customLogoUrl?: string;
}

export const LFCLogo: React.FC<LFCLogoProps> = ({ className = 'w-12 h-12', size, customLogoUrl }) => {
  const style = size ? { width: size, height: size } : undefined;

  if (customLogoUrl && customLogoUrl.trim() !== '') {
    return (
      <img
        src={customLogoUrl}
        alt="LFC Logo"
        className={`object-contain ${className}`}
        style={style}
        onError={(e) => {
          // If custom image path fails, hide broken img
          e.currentTarget.style.display = 'none';
        }}
      />
    );
  }

  return (
    <svg
      viewBox="0 0 520 380"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <defs>
        {/* Exact Original LFC Warm Gold Hue */}
        <linearGradient id="lfcOriginalGold" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFB300" />
          <stop offset="50%" stopColor="#FFA000" />
          <stop offset="100%" stopColor="#F57C00" />
        </linearGradient>

        <linearGradient id="lfcBeakGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFCA28" />
          <stop offset="100%" stopColor="#FF9800" />
        </linearGradient>

        {/* Crisp Shadow */}
        <filter id="logoShadow" x="-5%" y="-5%" width="115%" height="115%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.3" />
        </filter>
      </defs>

      <g filter="url(#logoShadow)">
        {/* ================= LETTER L (Original Serif) ================= */}
        <path
          d="M 50 145 
             L 120 145 
             L 120 158 
             L 102 158 
             L 102 268 
             L 165 268 
             L 174 232 
             L 185 232 
             L 180 282 
             L 50 282 
             L 50 268 
             L 70 268 
             L 70 158 
             L 50 158 
             Z"
          fill="url(#lfcOriginalGold)"
        />

        {/* ================= LETTER F (Original Serif) ================= */}
        <path
          d="M 185 145 
             L 268 145 
             L 268 180 
             L 256 180 
             L 252 158 
             L 226 158 
             L 226 208 
             L 252 208 
             L 252 220 
             L 226 220 
             L 226 268 
             L 248 268 
             L 248 282 
             L 185 282 
             L 185 268 
             L 204 268 
             L 204 158 
             L 185 158 
             Z"
          fill="url(#lfcOriginalGold)"
        />

        {/* ================= LETTER C (ROOSTER LOGO EMBLEM) ================= */}
        
        {/* 1. Rooster Comb on Top (3 Curved Horns/Crests) */}
        <path
          d="M 368 146 
             C 362 126, 375 102, 396 95 
             C 402 108, 403 124, 400 135 
             C 414 115, 436 106, 444 114 
             C 448 128, 440 142, 432 152 
             C 448 140, 464 142, 466 152 
             C 466 166, 444 176, 430 180 
             C 394 174, 374 162, 368 146 
             Z"
          fill="url(#lfcOriginalGold)"
        />

        {/* 2. Outer 'C' Crescent Body */}
        <path
          d="M 445 296 
             C 386 324, 312 296, 298 222 
             C 286 162, 332 114, 396 108 
             C 418 106, 440 114, 452 126 
             C 444 134, 434 140, 424 142 
             C 368 144, 332 180, 340 230 
             C 348 274, 396 292, 435 275 
             L 445 296 
             Z"
          fill="url(#lfcOriginalGold)"
        />

        {/* 3. Inner White Silhouette of Rooster Face */}
        <path
          d="M 370 166 
             C 388 144, 426 144, 442 160 
             C 452 170, 456 184, 456 196 
             L 446 201 
             C 430 203, 408 216, 416 234 
             C 424 248, 446 250, 468 248 
             C 478 247, 486 239, 486 228 
             C 486 212, 462 200, 440 204 
             C 408 206, 380 234, 364 262 
             C 356 240, 356 196, 370 166 
             Z"
          fill="#FFFFFF"
        />

        {/* 4. Upper Beak Blade */}
        <path
          d="M 450 184 
             L 476 191 
             L 450 199 
             Z"
          fill="url(#lfcBeakGold)"
        />

        {/* 5. Lower Beak Blade */}
        <path
          d="M 450 201 
             L 472 208 
             L 452 215 
             Z"
          fill="url(#lfcBeakGold)"
        />

        {/* 6. Lower Wattle Under Beak */}
        <path
          d="M 454 217 
             C 461 217, 466 224, 462 231 
             C 458 238, 448 236, 446 228 
             Z"
          fill="url(#lfcBeakGold)"
        />

        {/* 7. Expressive Rooster Eye */}
        <ellipse cx="422" cy="178" rx="8" ry="6.5" fill="#C67D00" />
        <ellipse cx="422" cy="178" rx="5.5" ry="5" fill="#FFFFFF" />
        <circle cx="423" cy="178" r="3" fill="#1C1C1C" />
        <circle cx="421" cy="176" r="1.2" fill="#FFFFFF" />

        {/* 8. Cheek Smile Line */}
        <path
          d="M 412 204 
             C 422 224, 442 232, 464 232"
          stroke="#C67D00"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
      </g>
    </svg>
  );
};
