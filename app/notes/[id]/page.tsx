import { Metadata } from "next";
import NotePreviewClient from "./NotePreview.client";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `Нотатка ${id} | NoteHub`,
    description: `Детальний перегляд нотатки з ідентифікатором ${id}`,
    openGraph: {
      title: `Нотатка ${id} | NoteHub`,
      description: `Детальний перегляд нотатки з ідентифікатором ${id}`,
      url: `/notes/${id}`,
      images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
    },
  };
}

export default async function NotePreviewPage({ params }: Props) {
  const { id } = await params;
  return <NotePreviewClient id={id} />;
}
