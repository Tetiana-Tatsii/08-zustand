import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Сторінку не знайдено | NoteHub",
  description: "На жаль, такої сторінки не існує.",
  openGraph: {
    title: "Сторінку не знайдено | NoteHub",
    description: "На жаль, такої сторінки не існує.",
    url: "/not-found",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub 404 preview",
      },
    ],
  },
};

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>404 - Сторінку не знайдено</h1>
      <p>На жаль, такої сторінки не існує.</p>
      <Link href="/" style={{ color: "blue", textDecoration: "underline" }}>
        Повернутися на головну
      </Link>
    </div>
  );
}
