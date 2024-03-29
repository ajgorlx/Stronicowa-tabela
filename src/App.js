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
  const [sortBy, setSortBy] = useState("count");
  const [sortDirection, setSortDirection] = useState('asc');

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
  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleSort = (sortByValue) => {
    const sortedTags = [...tags];
    let newSortDirection = 'asc';
    if (sortByValue === sortBy) {
      newSortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    }
    if (sortByValue === 'count') {
      sortedTags.sort((a, b) => {
        if (newSortDirection === 'asc'){
          return a.count - b.count;
        } else {
          return b.count - a.count;
        }
      })
    } else if (sortByValue === 'name') {
      sortedTags.sort((a, b) => {
        if (newSortDirection === 'asc') {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name)
        }
      });
    }
    setTags(sortedTags);
    setSortBy(sortByValue);
    setSortDirection(newSortDirection);
  }

  const handlePerPageChange = (e) => {
    const value = parseInt(e.target.value);
    const newTotalPages = Math.ceil(tags.length / value);
    const newCurrentPage =
      currentPage > newTotalPages ? newTotalPages : currentPage;
    setCurrentPage(newCurrentPage);
    setTagsPerPage(value);
  };

  const indexOfLastTag = currentPage * tagsPerPage;
  const indexOfFirstTag = indexOfLastTag - tagsPerPage;
  const currentTags = tags.slice(indexOfFirstTag, indexOfLastTag);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <h1 className="text-warning mb-3">Tags</h1>
      <Tags
        tags={currentTags}
        loading={loading}
        handlePerPageChange={handlePerPageChange}
        tagsPerPage={tagsPerPage}
        handleSort={handleSort}
        sortBy={sortBy}
        sortDirection={sortDirection}
      />
      <Pagination
        tagsPerPage={tagsPerPage}
        totalTags={tags.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default App;
