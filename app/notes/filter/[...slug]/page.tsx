import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesFilterClient from "./Notes.client";

import { Metadata } from "next";

// Залишаємо тільки ОДИН правильний тип Props
type Props = {
  params: Promise<{ slug: string[] }>;
};

// Робимо функцію асинхронною і дістаємо slug через await
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  // slug - це масив, тому ми об'єднуємо його в рядок для відображення
  const filterValue = slug.join("/");

  return {
    title: `Фільтр: ${filterValue} | NoteHub`,
    description: `Перегляд нотаток відфільтрованих за параметром: ${filterValue}`,
    openGraph: {
      title: `Фільтр: ${filterValue} | NoteHub`,
      description: `Перегляд нотаток відфільтрованих за параметром: ${filterValue}`,
      url: `/notes/filter/${filterValue}`,
      images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
    },
  };
}

export default async function NotesByCategory({ params }: Props) {
  const { slug } = await params;

  const tag = slug[0] === "all" ? "" : slug[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", tag],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, search: "", tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesFilterClient tag={tag} />
    </HydrationBoundary>
  );
}
