import type { EncodingProfile } from '../types';

export const QUICK_PRESETS: EncodingProfile[] = [
  {
    name: "🎯 H.265 Balanced",
    video_codec: "libx265",
    audio_codec: "aac",
    subtitle_mode: "copy",
    metadata: {},
    video_params: {
      crf: 23,
      preset: "medium",
      pix_fmt: "yuv420p"
    },
    audio_params: {
      bitrate: "192k"
    }
  },
  {
    name: "💎 H.265 High Quality",
    video_codec: "libx265",
    audio_codec: "flac",
    subtitle_mode: "copy",
    metadata: {},
    video_params: {
      crf: 18,
      preset: "slow",
      pix_fmt: "yuv420p10le"
    },
    audio_params: {}
  },
  {
    name: "⚡ H.264 Fast Encode",
    video_codec: "libx264",
    audio_codec: "aac",
    subtitle_mode: "copy",
    metadata: {},
    video_params: {
      crf: 20,
      preset: "veryfast",
      pix_fmt: "yuv420p"
    },
    audio_params: {
      bitrate: "192k"
    }
  },
  {
    name: "🔬 AV1 Max Compression",
    video_codec: "libsvtav1",
    audio_codec: "libopus",
    subtitle_mode: "copy",
    metadata: {},
    video_params: {
      crf: 28,
      preset: 4,
      pix_fmt: "yuv420p10le"
    },
    audio_params: {
      bitrate: "128k"
    }
  },
  {
    name: "🎌 Anime Encode",
    video_codec: "libx265",
    audio_codec: "libopus",
    subtitle_mode: "copy",
    metadata: {},
    video_params: {
      crf: 20,
      preset: "slow",
      pix_fmt: "yuv420p10le",
      extra_params: "tune=animation"
    },
    audio_params: {
      bitrate: "192k"
    }
  },
  {
    name: "🌐 Web Streaming",
    video_codec: "libx264",
    audio_codec: "aac",
    subtitle_mode: "copy",
    metadata: {},
    video_params: {
      crf: 23,
      preset: "fast",
      pix_fmt: "yuv420p",
      profile: "high",
      level: "4.1",
      extra_params: "tune=zerolatency"
    },
    audio_params: {
      bitrate: "128k"
    }
  }
];

export const OPTIONS = {
  videoCodecs: [
    { value: "libsvtav1", label: "SVT-AV1 (Best for 4K/HDR)" },
    { value: "libx265", label: "H.265 / HEVC (Best for 1080p)" },
    { value: "libx264", label: "H.264 / AVC (Most Compatible)" },
    { value: "libvpx-vp9", label: "VP9 (YouTube format)" },
    { value: "mpeg4", label: "MPEG-4 (Legacy)" },
    { value: "copy", label: "Copy (No re-encode)" }
  ],
  audioCodecs: [
    { value: "libopus", label: "Opus (Best Quality/Size)" },
    { value: "aac", label: "AAC (Most Compatible)" },
    { value: "flac", label: "FLAC (Lossless)" },
    { value: "libmp3lame", label: "MP3" },
    { value: "ac3", label: "AC-3 (Dolby Digital)" },
    { value: "copy", label: "Copy (No re-encode)" }
  ],
  subtitleModes: [
    { value: "copy", label: "Copy original subtitles" },
    { value: "none", label: "Remove subtitles" },
    { value: "burn", label: "Burn-in (Hardsubs)" }
  ],
  pixelFormats: [
    { value: "yuv420p", label: "8-bit YUV 4:2:0 (Standard)" },
    { value: "yuv420p10le", label: "10-bit YUV 4:2:0 (HDR/Banding prevention)" },
    { value: "yuv422p", label: "8-bit YUV 4:2:2" },
    { value: "yuv444p", label: "8-bit YUV 4:4:4" }
  ],
  svtAv1Presets: Array.from({ length: 14 }, (_, i) => ({ value: i, label: `Preset ${i} ${i < 4 ? '(Slowest)' : i > 9 ? '(Fastest)' : ''}` })),
  x264x265Presets: [
    { value: "veryslow", label: "Very Slow" },
    { value: "slower", label: "Slower" },
    { value: "slow", label: "Slow" },
    { value: "medium", label: "Medium" },
    { value: "fast", label: "Fast" },
    { value: "faster", label: "Faster" },
    { value: "veryfast", label: "Very Fast" },
    { value: "superfast", label: "Super Fast" },
    { value: "ultrafast", label: "Ultra Fast" }
  ],
  audioBitrates: [
    { value: "64k", label: "64 kbps (Low)" },
    { value: "96k", label: "96 kbps" },
    { value: "128k", label: "128 kbps (Standard)" },
    { value: "192k", label: "192 kbps (High)" },
    { value: "256k", label: "256 kbps" },
    { value: "320k", label: "320 kbps (Maximum)" }
  ],
  audioChannels: [
    { value: 0, label: "Keep Original" },
    { value: 1, label: "Mono (1.0)" },
    { value: 2, label: "Stereo (2.0)" },
    { value: 6, label: "Surround (5.1)" },
    { value: 8, label: "Surround (7.1)" }
  ],
  formatProfiles: [
    { value: "", label: "Default / Auto" },
    { value: "0", label: "0 / Main (AV1)" },
    { value: "1", label: "1 / High (AV1)" },
    { value: "2", label: "2 / Professional (AV1)" },
    { value: "baseline", label: "Baseline (H.264)" },
    { value: "main", label: "Main (H.264/H.265)" },
    { value: "high", label: "High (H.264)" },
    { value: "high10", label: "High 10 (H.264)" },
    { value: "main10", label: "Main 10 (H.265)" }
  ],
  formatLevels: [
    { value: "", label: "Default / Auto" },
    { value: "3.0", label: "3.0" },
    { value: "3.1", label: "3.1" },
    { value: "4.0", label: "4.0 (1080p30)" },
    { value: "4.1", label: "4.1 (1080p60)" },
    { value: "5.0", label: "5.0" },
    { value: "5.1", label: "5.1 (4K)" },
    { value: "5.2", label: "5.2" },
    { value: "6.0", label: "6.0 (8K)" },
    { value: "6.1", label: "6.1" },
    { value: "6.2", label: "6.2" }
  ],
  colorSpaces: [
    { value: "", label: "Default / Auto" },
    { value: "bt709", label: "BT.709 (HD/SDR)" },
    { value: "bt2020", label: "BT.2020 (HDR/UHD)" },
    { value: "smpte170m", label: "SMPTE 170M (SD/NTSC)" },
    { value: "smpte240m", label: "SMPTE 240M" },
    { value: "bt470bg", label: "BT.470 BG (SD/PAL)" }
  ]
};
