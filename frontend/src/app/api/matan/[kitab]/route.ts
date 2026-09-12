import { browseBook, isBookId, loadBook } from "@/lib/matan";

export const runtime = "nodejs";

function validNumber(value: string, max: number) {
  return /^\d+$/.test(value) && Number(value) >= 1 && Number(value) <= max;
}

export async function GET(request: Request, context: { params: Promise<{ kitab: string }> }) {
  const { kitab } = await context.params;
  if (!isBookId(kitab)) return Response.json({ detail: "Kitab tidak ditemukan." }, { status: 404 });
  const params = new URL(request.url).searchParams;
  const query = params.get("q") ?? "";
  const page = params.get("page") ?? "1";
  const chapter = params.get("bab");
  if (query.length > 150 || !validNumber(page, 1000) || (chapter !== null && !validNumber(chapter, 16))) {
    return Response.json({ detail: "Parameter pencarian tidak valid." }, { status: 400 });
  }
  try {
    const book = await loadBook(kitab);
    return Response.json(browseBook(book, query, chapter === null ? null : Number(chapter), Number(page)));
  } catch {
    return Response.json({ detail: "Sumber kitab sedang tidak tersedia. Silakan coba lagi." }, { status: 502 });
  }
}
