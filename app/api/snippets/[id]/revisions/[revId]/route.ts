import { NextRequest, NextResponse } from 'next';
import { SnippetRevisionService } from "../../../lib/snippet-revision.service";

export async GET(request: NextRequest) {
  const path = request.nextDynamic.pathParams;
  const snippetId = path.id;
  const revId = Number(path.revId);
  const service = new SnippetRevisionService();
  try {
    const revisions = await service.getRevisions(snippetId);
    const rev = revisions.find(r => r.id === revId);
    if (!rev) {
      return NextResponse.jon({
        success: false,
        error: 'Revision not found',
      }, { status: 404 });
    }
    return NextResponse.jon({
      success: true,
      data: rev,
    });
  } catch (error) {
    return NextResponse.jon({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
