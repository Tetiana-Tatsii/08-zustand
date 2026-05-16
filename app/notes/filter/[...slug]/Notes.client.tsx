"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Link from "next/link"; // Імпортуємо Link замість Modal та NoteForm
import useDebounce from "@/hooks/useDebounce";

type Props = {
  tag: string;
};

export default function NotesFilterClient({ tag }: Props) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  // Стан для модалки видалено

  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading } = useQuery({
    queryKey: ["notes", page, debouncedSearch, tag],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        search: debouncedSearch,
        tag: tag === "all" ? "" : tag,
      }),
    refetchOnMount: false,
  });

  const notes = data?.notes || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          alignItems: "center",
        }}
      >
        <SearchBox value={search} onChange={setSearch} />
        {/* Замінили button на Link, який веде на нашу нову сторінку */}
        <Link
          href="/notes/action/create"
          style={{
            padding: "10px 20px",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            textDecoration: "none", // Щоб посилання не було підкресленим
            display: "inline-block", // Для правильного відображення відступів
          }}
        >
          Create note +
        </Link>
      </div>

      <h2>{tag ? `Notes tagged: ${tag}` : "All Notes"}</h2>

      {isLoading ? (
        <p>Loading notes...</p>
      ) : (
        <>
          <NoteList notes={notes} />

          <Pagination
            pageCount={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        </>
      )}

      {/* Блок з Modal та NoteForm повністю видалено */}
    </div>
  );
}
