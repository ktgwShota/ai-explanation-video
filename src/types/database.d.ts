import { D1Database as CloudflareD1Database } from "@cloudflare/workers-types";

export type D1Database = CloudflareD1Database;

export interface D1Result<T = unknown> {
  results: T[];
  success: boolean;
  error?: string;
  meta: {
    duration: number;
    changes: number;
    lastRowId: number | null;
  };
}

export interface TopicData {
  id: number;
  keyword: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface VideoData {
  id: number;
  topic_id: number;
  main_speaker_id: number;
  sub_speaker_id: number;
  video_url: string;
  created_at: string;
}

export interface SpeakerData {
  id: number;
  name: string;
}
