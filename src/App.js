import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTags,
  setLoading,
  setError,
  setCurrentPage,
  setTagsPerPage,
  setSortBy,
  setSortDirection,
} from "./appSlice";
import Tags from "./components/Tags";
import Pagination from "./components/Pagination";
import "./App.css";
import axios from "axios";

const App = () => {
  const dispatch = useDispatch();
  const {
    tags,
    loading,
    currentPage,
    tagsPerPage,
    error,
    sortBy,
    sortDirection,
  } = useSelector((state) => state.app);

  const paginate = (pageNumber) => dispatch(setCurrentPage(pageNumber));

  useEffect(() => {
    const fetchTags = async () => {
      dispatch(setLoading(true));
      try {
        const res = await axios.get(
          "https://api.stackexchange.com/2.3/tags?order=desc&sort=popular&site=stackoverflow"
        );
        dispatch(setTags(res.data.items));
      } catch (error) {
        dispatch(setError(error.message));
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchTags();
    }, [dispatch]);
  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleSort = (sortByValue) => {
    const sortedTags = [...tags];
    let newSortDirection = "asc";
    if (sortByValue === sortBy) {
      newSortDirection = sortDirection === "asc" ? "desc" : "asc";
    }
    if (sortByValue === "count") {
      sortedTags.sort((a, b) => {
        if (newSortDirection === "asc") {
          return a.count - b.count;
        } else {
          return b.count - a.count;
        }
      });
    } else if (sortByValue === "name") {
      sortedTags.sort((a, b) => {
        if (newSortDirection === "asc") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
    }
    dispatch(setTags(sortedTags));
    dispatch(setSortBy(sortByValue));
    dispatch(setSortDirection(newSortDirection));
  };

  const handlePerPageChange = (e) => {
    const value = parseInt(e.target.value);
    const newTotalPages = Math.ceil(tags.length / value);
    const newCurrentPage =
      currentPage > newTotalPages ? newTotalPages : currentPage;
    dispatch(setCurrentPage(newCurrentPage));
    dispatch(setTagsPerPage(value));
  };

  const indexOfLastTag = currentPage * tagsPerPage;
  const indexOfFirstTag = indexOfLastTag - tagsPerPage;
  const currentTags = tags.slice(indexOfFirstTag, indexOfLastTag);

  return (
    <div className="container mt-5">
      <h1 className="text-warning mb-3">Tags</h1>
      <Tags
        tags={currentTags}
        loading={loading}
        tagsPerPage={tagsPerPage}
        handlePerPageChange={handlePerPageChange}
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
