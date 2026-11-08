// ============================================================
// PROCESS REELS
// ------------------------------------------------------------
// Add short clips here — sketching/painting process videos, time-
// lapses, whatever's being filmed. Leave this array empty and the
// site will show "coming soon" cards linking to Instagram instead,
// so the section never looks broken or empty.
//
// Two supported formats:
//
//   Local file:
//   { type: "file", src: "/videos/reel-1.mp4",
//     poster: "/gallery/thumbs/sketch-guru.jpg",
//     title: "Sketching the guru portrait" }
//
//   YouTube video/short (use the ID from the video URL):
//   { type: "youtube", videoId: "dQw4w9WgXcQ",
//     poster: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
//     title: "Time-lapse: Radha Krishna" }
// ============================================================

const videos = [
  {
    type: "file",
    src: "/videos/reel-1.mp4",
    poster: "/gallery/Carton.jpg",
    title: "Sukuna — Anime Drawing",
    medium: "COLOR PENCIL & INK",
  },
  {
    type: "file",
    src: "/videos/reel-2.mp4",
    poster: "/gallery/painting-hanuman.jpg",
    title: "Panchmukhi Hanuman",
    medium: "COLOR PENCIL ON PAPER",
  },
  {
    type: "file",
    src: "/videos/reel-4.mp4",
    poster: "/gallery/painting-radha-krishna-1.jpg",
    title: "Radha Krishna Time-lapse",
    medium: "COLOR PENCIL & GRAPHITE",
  },
];

export default videos;