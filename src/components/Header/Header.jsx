import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./header.css";
import Post from "../Post/Post";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import NodataFound from "../NodataFound/NodataFound";
const Header = () => {
  const { posts, pending, filtersListPosts, filterPostBoolen } = useSelector(
    (state) => state.post
  );
  useEffect(() => {
    if (filterPostBoolen) {
      setViewList(filtersListPosts.length > 0 ? filtersListPosts : []);
    } else if (!filterPostBoolen && filtersListPosts !== posts) {
      setViewList(filtersListPosts.length > 0 ? filtersListPosts : posts);
    }
  }, [filtersListPosts, posts]);

  const [viewList, setViewList] = useState([]);
  return (
    <div className="headerContainer">
      {pending !== true ? (
        viewList?.length === 0 ? (
          <NodataFound />
        ) : (
          <div className="gridContainer">
            {viewList?.map((post) => {
              return (
                <div className="grid" key={post._id}>
                  <Post post={post} />
                </div>
              );
            })}
          </div>
        )
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Header;
