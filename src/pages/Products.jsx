import MangaList from "../components/MangaList";

const Products = () => {
  return (
    <main>
      <div
        id="top-container"
        className="max-w-full min-h-screen overflow-x-hidden bg-gray-400"
      >
        <MangaList />
      </div>
    </main>
  );
};

export default Products;
