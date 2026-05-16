import { Metadata } from "next";
import NotePreviewClient from "./NotePreview.client";
import { fetchNoteById } from "@/lib/api";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  try {
    const note = await fetchNoteById(id);

    return {
      title: `${note.title} | NoteHub`,
      description: note.content.substring(0, 160),
      openGraph: {
        title: `${note.title} | NoteHub`,
        description: note.content.substring(0, 160),
        url: `https://notehub-public.goit.study/notes/${id}`,
        images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
      },
    };
  } catch (error) {
    return {
      title: "Нотатка | NoteHub",
      description: "Детальний перегляд нотатки",
      openGraph: {
        title: "Нотатка | NoteHub",
        description: "Детальний перегляд нотатки",
        url: `https://notehub-public.goit.study/notes/${id}`,
        images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
      },
    };
  }
}

export default async function NotePreviewPage({ params }: Props) {
  const { id } = await params;
  return <NotePreviewClient id={id} />;
}
