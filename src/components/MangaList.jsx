import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useFetchData, FetchData } from "../utils/fetchData";
import { getMangas } from "../services/mangaService";
import { useState, useEffect } from "react";

const MangaList = () => {
  const param = location.search;
  const { data, error } = useFetchData(getMangas, param);
  const [value, setValue] = useState("");
  const [mangas, setMangas] = useState([]);

  useEffect(() => {
    if (data && data.data) {
      setMangas(data.data);
    }
  }, [data]);

  if (!data)
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <p className="animate-spin w-fit h-fit">Loading...</p>
      </div>
    );
  if (error) return <p>Error: {error}</p>;

  const handleSearch = async (value) => {
    window.history.pushState("", "", `${location.pathname}?q=${value}`);
    setValue(value);
    const search = await FetchData(getMangas, param);
    setMangas(search.data);
  };

  return (
    <div className="flex flex-col items-center font-akira">
      <div className="flex flex-row items-center">
        <MagnifyingGlassIcon className="h-10 pr-5 pt-2 " />
        <input
          type="search"
          name="search_manga"
          id="search-manga"
          className="rounded-md mt-2 scale-110 p-2"
          value={value}
          onChange={(event) => handleSearch(event.target.value)}
        />
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 place-items-center my-2">
        {mangas.map((manga, i) => (
          <li key={i} className="">
            <a
              target="_blank"
              href={manga.url}
              className="font-semibold text-center"
            >
              <div>{manga.title_english}</div>
              <div>
                {manga.title_english
                  ? `(${manga.title_japanese})`
                  : manga.title_japanese}
              </div>
            </a>
            <a
              target="_blank"
              href={manga.url}
              className="my-auto w-screen md:w-full flex justify-center"
            >
              <img src={manga.images.webp.image_url} alt={manga.title} />
            </a>
            <div className="flex pt-1 text-sm overflow-auto justify-center">
              <p className="pr-0.5">by:</p>
              <div className="flex flex-col text-nowrap">
                {manga.authors.map((author, i) =>
                  i % 2 === 0 ? (
                    <div
                      key={i}
                      id="author-group"
                      className={`${i > -1 && "mb-0.5"}`}
                    >
                      <a
                        className="bg-slate-600 rounded text-slate-200 px-1 hover:bg-slate-500 hover:text-white hover:scale-105"
                        target="_blank"
                        href={author.url}
                      >
                        {author.name}
                      </a>

                      {manga.authors[i + 1] && (
                        <a
                          className="bg-slate-600 rounded text-slate-200 px-1 hover:bg-slate-500 hover:text-white hover:scale-105"
                          target="_blank"
                          href={manga.authors[i + 1].url}
                        >
                          {manga.authors[i + 1].name}
                        </a>
                      )}
                    </div>
                  ) : null
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MangaList;
