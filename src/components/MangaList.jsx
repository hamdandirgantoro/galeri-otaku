import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useFetchData, FetchData } from "../utils/fetchData";
import { getMangas } from "../services/mangaService";
import { useState, useEffect } from "react";

const MangaList = () => {
  const param = location.search;
  const { data, error } = useFetchData(getMangas, param);
  const [value, setValue] = useState("");
  const [page, setPage] = useState(1);
  const [mangas, setMangas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const urlSearchParams = new URLSearchParams(location.search);
  const paramMangaName = urlSearchParams.get("q");
  const paramPage = urlSearchParams.get("page");

  useEffect(() => {
    if (data && data.data) {
      setMangas(data.data);
    }
    if (paramMangaName) {
      setValue(paramMangaName);
    } else {
      history.pushState("", "", location.search.replace("&q=", ""));
      history.pushState("", "", location.search.replace("q=&", ""));
    }
    if (!paramPage) {
      history.pushState("", "", location.search.replace("page=&", ""));
      history.pushState("", "", location.search.replace("page=", ""));
    }
    if (!paramMangaName && !paramPage) {
      history.pushState("", "", location.pathname.replace("?", ""));
    }
  }, [data, paramMangaName, paramPage]);

  if (!data || isLoading)
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <p className="animate-spin w-fit h-fit">Loading...</p>
      </div>
    );
  if (error) return <p>Error: {error}</p>;

  const handleSearch = async (value, page, resetPagging = true) => {
    page = resetPagging ? 1 : page;
    const param = `?q=${value}&page=${page}`;
    window.history.pushState("", "", `${location.pathname}${param}`);
    setPage(page);
    setValue(value);
    const search = await FetchData(getMangas, param).then(setIsLoading(true));
    setIsLoading(false);
    setMangas([]);
    data.pagination = search.pagination;
    setMangas(search.data);
    console.log(data.pagination);
  };

  return (
    <div className="flex flex-col items-center font-akira">
      <div className="bg-white mt-2 p-2 rounded-md flex flex-row items-center mb-3">
        <button
          onClick={() => handleSearch(value, page)}
          className="border-r-2 border-gray-300"
        >
          <MagnifyingGlassIcon className="h-10 pr-5 text-gray-400 hover:text-gray-600 transition-colors" />
        </button>
        <input
          type="search"
          name="search_manga"
          id="search-manga"
          className="p-2"
          value={value}
          onBlur={() => handleSearch(value, page)}
          onChange={(event) => setValue(event.target.value)}
        />
      </div>
      <div className="bg-slate-600 rounded drop-shadow-sm">
        <button
          onClick={() => handleSearch(value, 1, false)}
          style={{ marginRight: 10 }}
          disabled={data.pagination.current_page == 1}
          className="text-slate-50 p-2 rounded transition-colors hover:text-white disabled:text-gray-300"
        >
          First
        </button>
        <button
          onClick={() => handleSearch(value, page - 1, false)}
          style={{ marginRight: 10 }}
          disabled={data.pagination.current_page == 1}
          className="text-slate-50 p-2 rounded transition-colors hover:text-white disabled:text-gray-300"
        >
          Prev
        </button>
        <input
          type="number"
          name="page"
          id="page"
          className="rounded w-14 mr-2 pl-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          defaultValue={data.pagination.current_page}
          onChange={(event) => setPage(event.target.value)}
          onBlur={(event) => handleSearch(value, event.target.value, false)}
        />
        <button
          onClick={() => handleSearch(value, page + 1, false)}
          disabled={!data.pagination.has_next_page}
          className="text-slate-50 p-2 rounded transition-colors hover:text-white disabled:text-gray-300"
        >
          Next
        </button>
        <button
          onClick={() =>
            handleSearch(value, data.pagination.last_visible_page, false)
          }
          disabled={!data.pagination.has_next_page}
          className="text-slate-50 p-2 rounded transition-colors hover:text-white disabled:text-gray-300"
        >
          Last
        </button>
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
              className="my-auto md:w-full flex justify-center"
            >
              <img
                src={manga.images.webp.image_url}
                alt={manga.title}
                className="rounded h-80"
              />
            </a>
            <div className="flex pt-1 text-sm overflow-auto justify-center">
              <p className="pr-0.5">by:</p>
              <div className="flex flex-col text-nowrap">
                {manga.authors.map((author, i) => {
                  if (i > 4) return;
                  if (i == 4)
                    return (
                      <div
                        key={i}
                        id="author-group"
                        className={`${i > -1 && "mb-0.5"}`}
                      >
                        <a
                          className="bg-slate-600 rounded text-slate-200 px-1 hover:bg-slate-500 hover:text-white hover:scale-105"
                          target="_blank"
                          href={manga.url}
                        >
                          ...
                        </a>
                      </div>
                    );
                  if (i % 2 === 0)
                    return (
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
                    );
                })}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MangaList;
