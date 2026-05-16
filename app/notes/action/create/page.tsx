import { Metadata } from "next";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";

export const metadata: Metadata = {
  title: "Створити нотатку | NoteHub",
  description: "Створіть нову нотатку та збережіть свої думки.",
  openGraph: {
    title: "Створити нотатку | NoteHub",
    description: "Створіть нову нотатку та збережіть свої думки.",
    url: "/notes/action/create",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>

        <NoteForm />
      </div>
    </main>
  );
}
