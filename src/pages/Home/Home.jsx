import React from "react";
import Search from "../../components/Search/Search";
import Header from "../../components/Header/Header";
import FilterList from "../../components/FilterList/FilterList";
import "./home.css";
const Home = () => {
  return (
    <div>
      <Search />
      <Header />
      <div className="filterSection">
        <FilterList />
      </div>
    </div>
  );
};

export default Home;
