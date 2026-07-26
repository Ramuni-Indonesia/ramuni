export const mascots = {
  decisionVisual: {
    src: '/website-original/ramuni-mascot-problem-section.webp',
    width: 900,
    height: 900,
  },
  welcome2d: {
    src: '/website-original/ramuni-mascot-muni-manyar.webp',
    width: 720,
    height: 720,
  },
  guide3d: {
    src: '/website-original/mascot/ramuni-mascot-3d-guide.webp',
    width: 384,
    height: 384,
  },
  evidence3d: {
    src: '/website-original/mascot/ramuni-mascot-3d-evidence.webp',
    width: 384,
    height: 384,
  },
} as const;

export type MascotKey = keyof typeof mascots;
