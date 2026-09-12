export type ChatStreamEvent =
  | { type: "token"; text: string }
  | { type: "error"; message: string }
  | { type: "done" };

function parseEvent(line: string): ChatStreamEvent | null {
  if (!line.startsWith("data:")) return null;
  const payload = line.slice(5).trim();
  if (payload === "[DONE]") return { type: "done" };
  try {
    const event = JSON.parse(payload);
    if (event.type === "token" && typeof event.text === "string") return event;
    if (event.type === "error" && typeof event.message === "string") return event;
    if (event.type === "done") return event;
  } catch { /* Ignore non-JSON events, never discard partial network chunks. */ }
  return null;
}

export async function readChatStream(response: Response, onEvent: (event: ChatStreamEvent) => void): Promise<void> {
  const reader = response.body?.getReader();
  if (!reader) throw new Error("Server tidak mengirim stream jawaban.");
  const decoder = new TextDecoder();
  let pending = "";
  const emit = (line: string) => {
    const event = parseEvent(line);
    if (event) onEvent(event);
  };
  try {
    let finished = false;
    while (!finished) {
      const { done, value } = await reader.read();
      finished = done;
      pending += decoder.decode(value, { stream: !done });
      const lines = pending.split("\n");
      pending = lines.pop() ?? "";
      lines.forEach(emit);
    }
    if (pending) emit(pending);
  } finally {
    reader.releaseLock();
  }
}
