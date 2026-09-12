export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
}

export function makeMessage(role: Message["role"], content: string, timestamp?: string): Message {
  return { id: crypto.randomUUID(), role, content, timestamp };
}

// Assign IDs once when loading legacy history; repeated text is still distinct.
export function ensureMessageIds(messages: (Omit<Message, "id"> & { id?: string })[]): Message[] {
  const seen = new Set<string>();
  return messages.map(message => {
    const id = message.id && !seen.has(message.id) ? message.id : crypto.randomUUID();
    seen.add(id);
    return { ...message, id };
  });
}
