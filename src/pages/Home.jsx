import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FetchData } from "../utils/fetchData";
import { getMangasHome } from "../services/mangaService";

const Home = () => {
  const [mangas, setMangas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMangas = async () => {
      try {
        const data = await FetchData(getMangasHome);
        setMangas(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch manga data:", error);
        setLoading(false);
      }
    };
    fetchMangas();
  }, []);

  return (
    <main className="font-akira">
      {/* Hero Section */}
      <div
        id="top-container"
        className="max-w-screen-2xl bg-gray-400 flex flex-col items-center justify-center text-center min-h-screen text-slate-900 p-4"
      >
        <h1 className="text-4xl font-bold mb-4">
          Selamat Datang di Galeri Otaku
        </h1>
        <p className="text-lg mb-6">
          Platform showcase untuk berbagai manga favorit Anda. Jelajahi beragam
          seri manga populer dan tautan langsung ke page Myanimelistnya.
        </p>
        <Link
          to="/products"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Lihat Koleksi Manga
        </Link>
      </div>

      {/* Manga Gallery Section */}
      <section
        id="manga-gallery"
        className="max-w-screen-2xl mx-auto bg-white text-slate-900 p-4 py-8"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">
          Galeri Manga
        </h2>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {mangas.map((manga) => (
              <div
                key={manga.mal_id}
                className="flex flex-col items-center text-center p-2 border rounded shadow-sm hover:shadow-md transition"
              >
                <a href={manga.url} target="_blank" rel="noopener noreferrer">
                  <img
                    src={manga.images.webp.image_url}
                    alt={manga.title}
                    className="w-full h-auto rounded mb-2"
                  />
                </a>
                <p className="font-semibold text-sm">{manga.title}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Summary Section */}
      <section
        id="summary"
        className="max-w-screen-2xl mx-auto bg-white text-slate-900 p-4 py-8"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">
          Tentang Galeri Otaku
        </h2>
        <p className="text-center mb-6">
          Galeri Otaku adalah aplikasi web untuk menampilkan berbagai manga dari
          berbagai genre. Website ini menggunakan{" "}
          <span className="font-bold">Jikan API v4</span> untuk mendapatkan
          informasi manga terkini. Ikon-ikon dalam aplikasi ini didukung oleh{" "}
          <span className="font-bold">Heroicons</span>, memberikan pengalaman
          antarmuka yang menarik.
        </p>
        <div className="flex justify-center items-center gap-4">
          <div className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-12 h-12 text-blue-600 mx-auto mb-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
            <p className="font-semibold">Database Manga Terbaru</p>
          </div>
          <div className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-12 h-12 text-blue-600 mx-auto mb-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 6h13M8 6c0 1.125.268 2.217.768 3.2M8 6C5.791 6 4 7.791 4 10s1.791 4 4 4h4m6-6v6"
              />
            </svg>
            <p className="font-semibold">Informasi</p>
          </div>
          <div className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-12 h-12 text-blue-600 mx-auto mb-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 9l-5 5-5-5"
              />
            </svg>
            <p className="font-semibold">Navigasi Mudah</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
