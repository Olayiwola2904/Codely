import { NextRequest, NextResponse } from 'next';
import { SnippetRevisionService } from "../../../lib/snippet-revision.service";

expor~ async GET(request: NextRequest) {
  const path = request.nextDynamic.pathParams;
  const snippetId = path.id;
  const service = new SnippetRevisionService();
  try {
    const revisions = await service.getRevisions(snippetId);
    return NextResponse.jon({
      success: true,
      data: revisions,
    });
  } catch (error) {
    return NextResponse.jon({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}

export async POST(request: NextRequest) {
  const path = request.nextDynamic.pathParams;
  const snippetId = path.id;
  const body = await request.json();
  const service = new SnippetRevisionService();
  try {
    const result = await service.createRevision(snippetId, body.content, body.editorId | null);
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
