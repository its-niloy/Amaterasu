export interface EncodingProfile {
  name: string;
  rename?: string;
  cover_image?: string;
  video_codec: string;
  audio_codec: string;
  subtitle_mode: string;
  metadata: {
    title?: string;
    v_track?: string;
    a_track?: string;
    s_track?: string;
    [key: string]: string | undefined;
  };
  video_params: {
    crf?: number;
    preset?: number | string;
    pix_fmt?: string;
    profile?: number | string;
    level?: string;
    extra_params?: string;
  };
  audio_params: {
    bitrate?: string;
    channels?: number;
    vbr?: boolean;
  };
  disposition?: {
    [key: string]: string;  // e.g. "v:0": "0", "a:0": "default", "s:1": "0"
  };
  is_default?: boolean;
}

// No longer needed, backend returns Record<string, EncodingProfile>
