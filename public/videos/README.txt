Drop short video clips here (e.g. reel-1.mp4, reel-2.mp4) — keep them
reasonably compressed (a phone-recorded clip is usually fine as-is,
but under ~15MB per clip loads much faster).

Then open src/data/videos.js and add an entry for each clip. Two
formats are supported — a local file, or a YouTube video (recommended
if the clip is already posted as a Reel/Short, since YouTube hosts and
compresses it for you):

  // Local file
  { type: "file", src: "/videos/reel-1.mp4", poster: "/gallery/thumbs/sketch-guru.jpg", title: "Sketching the guru portrait" }

  // YouTube video/short — use the ID from the video URL
  { type: "youtube", videoId: "dQw4w9WgXcQ", poster: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg", title: "Time-lapse: Radha Krishna" }

Until you add entries here, the "Process Reels" section on the site
shows a few "coming soon" cards that link to the Instagram profile
instead — so the section never looks broken or empty.
