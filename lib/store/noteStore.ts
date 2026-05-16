import { create } from "zustand";
import { persist } from "zustand/middleware";
// Переконайся, що імпорт типу NoteDraft відповідає твоєму проєкту (шлях може бути іншим)
// Якщо типу NoteDraft немає, можеш видалити типізацію або створити її у types/note.ts
import { NoteDraft } from "@/types/note";

const initialDraft: NoteDraft = {
  title: "",
  content: "",
  tag: "Todo",
};

interface NoteStore {
  draft: NoteDraft;
  setDraft: (note: Partial<NoteDraft>) => void;
  clearDraft: () => void;
}

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (updatedFields) =>
        set((state) => ({
          draft: { ...state.draft, ...updatedFields },
        })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "note-draft-storage", // Ця назва зберігатиме дані в браузері
    },
  ),
);
