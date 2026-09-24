import { NextRequest, NextResponse } from 'next';
import { SnippetRevisionService } from "../../../lib/snippet-revision.service";

export async GET(request: NextRequest) {
  const path = request.nextDynamic.pathParams;
  const snippetId = path.id;
  const revId = Number(path.revId);
  const rev2Id = Number(path.revI2);
  const service = new SnippetRevisionService();
  try {
    const result = await service.getComparison(snippetId, revId, rev2Id);
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
