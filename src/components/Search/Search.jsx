import React, { useEffect, useState } from "react";
import "./search.css";
import {
  filterPostsApi,
  getAllPostApi,
  searchPostsApi,
} from "../../redux/store/postApiCalls";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSearch,
  filterPostList,
  filterPostListBoolen,
} from "../../redux/store/postSlice";

const Search = () => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    rent: false,
    sale: false,
    book: false,
  });
  const { searched } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    if (search === "") {
      dispatch(clearSearch());
      getAllPostApi(dispatch);
      dispatch(filterPostListBoolen(false));
      setFilters({
        rent: false,
        sale: false,
        book: false,
      });
    }
  }, [search]);
  const handleSearch = (e) => {
    e.preventDefault();
    if (search !== "") {
      searchPostsApi(search, dispatch);
    }
  };
  useEffect(() => {
    const { rent, sale, book } = filters;
    if (rent || sale || book) {
      const filterQuery = { searched, filters, search };
      filterPostsApi(filterQuery, dispatch);
    }
    if (!rent && !sale && !book) {
      if (search !== "") {
        searchPostsApi(search, dispatch);
      } else {
        getAllPostApi(dispatch);
      }
    }
    dispatch(filterPostListBoolen(false));
    dispatch(filterPostList([]));
  }, [filters]);

  return (
    <div className="searchContainer">
      <form className="formContainerSearch">
        <input
          type="search"
          className="searchBar"
          name="search"
          id="search"
          placeholder="search location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="submitButton" onClick={handleSearch}>
          Search
        </button>
      </form>
      <div className="filterContainer">
        <div className="filterList">
          <ul>
            <li
              className={filters?.rent === true ? "selected" : ""}
              onClick={(e) => setFilters({ rent: !filters.rent })}
            >
              For Rent
            </li>
            <li
              className={filters?.sale === true ? "selected" : ""}
              onClick={(e) => setFilters({ sale: !filters.sale })}
            >
              For Sale
            </li>
            <li
              className={filters?.book === true ? "selected" : ""}
              onClick={(e) => setFilters({ book: !filters.book })}
            >
              For Book
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Search;
