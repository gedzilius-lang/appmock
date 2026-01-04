import React from 'react';

const Pattern1: React.FC<{className?: string}> = ({ className }) => (
  <svg className={className} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="p1" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="10" cy="10" r="1.5" fill="currentColor"/>
      </pattern>
    </defs>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#p1)"/>
  </svg>
);

const Pattern2: React.FC<{className?: string}> = ({ className }) => (
  <svg className={className} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="p2" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <path d="M 0 10 H 40 M 10 0 V 40" stroke="currentColor" strokeWidth="1"/>
      </pattern>
    </defs>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#p2)"/>
  </svg>
);

const Pattern3: React.FC<{className?: string}> = ({ className }) => (
  <svg className={className} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="p3" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
        <path d="M 0 0 L 15 15 L 30 0 L 15 -15 Z M 15 15 L 0 30 L -15 15 L 0 0 Z" stroke="currentColor" strokeWidth="0.5" fill="none"/>
      </pattern>
    </defs>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#p3)"/>
  </svg>
);

const Pattern4: React.FC<{className?: string}> = ({ className }) => (
  <svg className={className} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="p4" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
         <path d="M-10,10 a20,20 0 0,1 40,0" stroke="currentColor" strokeWidth="1" fill="none" />
         <path d="M10,-10 a20,20 0 0,1 0,40" stroke="currentColor" strokeWidth="1" fill="none" />
         <path d="M-10,30 a20,20 0 0,1 40,0" stroke="currentColor" strokeWidth="1" fill="none" />
         <path d="M30,-10 a20,20 0 0,1 0,40" stroke="currentColor" strokeWidth="1" fill="none" />
      </pattern>
    </defs>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#p4)"/>
  </svg>
);

const Pattern5: React.FC<{className?: string}> = ({ className }) => (
  <svg className={className} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="p5" x="0" y="0" width="15" height="15" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
        <path d="M 0 0 V 15" stroke="currentColor" strokeWidth="1.5"/>
      </pattern>
    </defs>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#p5)"/>
  </svg>
);

export const THUMBNAIL_PATTERNS = [Pattern1, Pattern2, Pattern3, Pattern4, Pattern5];
