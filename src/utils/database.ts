import { D1Database } from "../types/database";

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

export class Database {
  private db: D1Database;

  constructor(db: D1Database) {
    this.db = db;
  }

// TODO: ここにあるのは全部D1だから使ってないかも

  /**
   * ユーザー検索 Email
   */
  async getUserByEmail(email: string) {
    const result = await this.db
      .prepare("SELECT * FROM users WHERE email = ?")
      .bind(email)
      .first();
    return result;
  }

  // 既存ユーザーの認証プロバイダーIDなどを更新
  async updateUserAuthProvider(
    id: number,
    data: {
      github_id?: string;
      google_id?: string;
      name?: string;
      icon?: string;
    }
  ) {
    const { github_id, google_id, name, icon } = data;
    await this.db
      .prepare(
        `UPDATE users SET
        github_id = COALESCE(?, github_id),
        google_id = COALESCE(?, google_id),
        name = ?,
        icon = ?
      WHERE id = ?`
      )
      .bind(github_id, google_id, name, icon, id)
      .run();

    return this.getUserById(id);
  }

  async getUserById(id: number) {
    const result = await this.db
      .prepare("SELECT * FROM users WHERE id = ?")
      .bind(id)
      .first();
    return result || null;
  }


}
