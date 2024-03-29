import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Tags from "./components/Tags";
import Pagination from "./components/Pagination";

const App = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [tagsPerPage, setTagsPerPage] = useState(10);

  useEffect(() => {
    const fetchTags = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://api.stackexchange.com/2.3/tags?order=desc&sort=popular&site=stackoverflow"
        );
        setTags(res.data.items);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTags();
  }, []);

  const indexOfLastTag = currentPage * tagsPerPage;
  const indexOfFirstTag = indexOfLastTag - tagsPerPage;
  const currentTags = tags.slice(indexOfFirstTag, indexOfLastTag);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="container">
      <h1 className="text-warning mb-3">Tags</h1>
      <Tags tags={currentTags} loading={loading} />
      <Pagination
        tagsPerPage={tagsPerPage}
        totalTags={tags.length}
        paginate={paginate}
      />
    </div>
  );
};

export default App;
