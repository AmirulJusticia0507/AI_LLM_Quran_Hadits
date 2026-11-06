export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
  references?: Reference[];
}

/** A reference explicitly mentioned in an AI response, kept with the chat. */
export interface Reference {
  id: string;
  type: "quran" | "hadith";
  label: string;
  detail: string;
  href: string;
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
