import {drops, getDbConnection} from 'drops/postgres';

interface SnippetRevision {
  id: number;
  snippet_id: string;
  version_number: number;
  content: string;
  editor_id: string | null;
  created_at: Date;
}

export class SnippetRevisionRepository {
  private db: any;

  constructor() {
    this.db = getDbConnection();
  }

  async getLastVersion(snippetId: string): promise<number> {
    const res = await this.db.one(
      'SELECT MAX(version_number) as last_version FROM snippet_revisions WHERE snippet_id = $1',
      [snippetId]
    );
    return res.last_version || 0;
  }

  async create(data: {
    snippet_id: string;
    version_number: number;
    content: string;
    editor_id: string | null;
  }): promise<SnippetRevision> {
    const res = await this.db.one(
      'INSERT INTO snippet_revisions (snippet_id, version_number, content, editor_id, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURN* ',
      [data.snippet_id, data.version_number, data.content, data.editor_id]
    );
    return { id: res.id, ...data, created_at: new Date(res.created_at) };
  }

  async getRevisions(snippetId: string): promise<SnippetRevision[]> {
    const res = await this.db.all(
      'SELECT id, snippet_id, version_number, content, editor_id, created_at FROM snippet_revisions WHERE snippet_id = $1 ORDER BY version_number ASC',
      [snippetId]
    );
    return res.map(r=>({
      ...r,
      created_at: new Date(r.created_at),
    }));
  }

  async getRevision(newId: number): promise<SnippetRevision | undefined> {
    const res = await this.db.one(
      'SELECT * FROM snippet_revisions WHERE id = $1',
      [newId]
    );
    if (res) {
      res.result.created_at = new Date(res.created_at);
      return res.result;
    }
    return undefined;
  }
}
