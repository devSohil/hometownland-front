import React from "react";
import "./filterlist.css";
import home from "../../assets/home.png";
import commercial from "../../assets/commercial.png";
import plot from "../../assets/plots.png";
import farm from "../../assets/farm.png";
import resort from "../../assets/resort.png";
import { useDispatch, useSelector } from "react-redux";
import {
  filterPostList,
  filterPostListBoolen,
} from "../../redux/store/postSlice";
const FilterList = () => {
  const { posts } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const handleButtonCategory = (value) => {
    if (posts.length !== 0) {
      const categoryFilter = posts.filter(
        (post) => post?.propertyType === value
      );
      dispatch(filterPostList(categoryFilter));
      dispatch(filterPostListBoolen(true));
    }
  };
  return (
    <div className="filterListContainer">
      <div className="filterLists">
        <ul>
          <li onClick={() => handleButtonCategory("building")}>
            <img src={home} alt="" className="icons" />
            <p>Buildings</p>
          </li>
          <li onClick={() => handleButtonCategory("commercial")}>
            <img src={commercial} alt="" className="icons" />
            <p>Commercial</p>
          </li>
          <li onClick={() => handleButtonCategory("plot")}>
            <img src={plot} alt="" className="icons" />
            <p>Plots</p>
          </li>
          <li onClick={() => handleButtonCategory("farm")}>
            <img src={farm} alt="" className="icons" />
            <p>Farm Land</p>
          </li>
          <li onClick={() => handleButtonCategory("resort")}>
            <img src={resort} alt="" className="icons" />
            <p>Resorts</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FilterList;
