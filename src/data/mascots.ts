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
  working2d: {
    src: '/website-original/mascot/ramuni-mascot-working-dashboard.webp',
    width: 560,
    height: 560,
  },
  workLoop2d: {
    src: '/website-original/mascot/ramuni-mascot-work-loop-poster.webp',
    width: 376,
    height: 422,
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
