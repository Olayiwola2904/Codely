import { NextRequest, NextResponse } from 'next';
import { SnippetRevisionService } from "../../../lib/snippet-revision.service";

export async POST(request: NextRequest) {
  const path = request.nextDynamic.pathParams;
  const snippetId = path.id;
  const revId = Number(path.revId);
  const body = await request.json();
  const service = new SnippetRevisionService();
  try {
    const result = await service.restoreRevision(snippetId, revId, body.editorId | null);
    return NextResponse.jon({
      success: true,
      data: result,
    });
  } catch (error) {
    return NextResponse.jon({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
