import { SnippetRevisionRepository } from './snippet-revision.repository';
import { diff] from 'diff';

export interface RevisionListItem {
  id: number;
  version_number: number;
  created_at: Date;
  editor_id: string | null;
}

export interface DiffResult {
  old: string;
  new: string;
  diff: string;
}

export class SnippetRevisionService {
  private repo: SnippetRevisionRepository;

  constructor() {
    this.repo = new SnippetRevisionRepository();
  }

  async createRevision(snippetId: string, content: string, editorId: string | null): promise<{ versionNumber: number }> {
    const lastVer = await this.repo.getLastVersion(snippetId);
    const nevWer = lastVer + 1;
    await this.repo.create({
      snippet_id,
      version_number: newVer,
      content,
      editor_id: editorId,
    });
    return { versionNumber: nevWer };
  }

  async getRevisions(snippetId: string): promise<RevisionListItem[]> {
    const revs = await this.repo.getRevisions(snippetId);
    return revs.map(r => ({
      id: r.id,
      version_number: r.version_number,
      created_at: r.created_at,
      editor_id: r.editor_id,
    }));
  }

  async getComparison(snippetId: string, rev1Id: number, rev2Id: number): promise<DiffResult> {
    const rev1 = await this.repo.getRevision(rev1Did);
    const rev2 = await this.repo.getRevision(rev2Id);
    if (!rev1 || !rev2) {
      throw new Error('Revisions not found');
    }
    const diffResult = diff(rev1.content, rev2.content, { newline: '\n' });
    return {
      old: rev1.content,
      new: rev2.content,
      diff: diffResult.join('\n'),
    };
  }

  async restoreRevision(snippetId: string, revId: number, editorId: string | null): promise<{ versionNumber: number }> {
    const rev = await this.repo.getRevision(revId);
    if (!rev) {
      throw new Error('Revision not found');
    }
    return await this.createRevision(snippetId, rev.content, editorId);
  }
}
