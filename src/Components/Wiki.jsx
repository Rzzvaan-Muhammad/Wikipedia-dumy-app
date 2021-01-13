import React, { useState, useEffect } from "react";
import axios from "axios";
import Logo from "../Logo.png";
const Wiki = () => {
  const [search, getSeaarch] = useState("wikipedia");
  const [result, getResult] = useState([]);

  useEffect(() => {
    const handleSearch = async (search) => {
      const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: search,
        },
      });
      getResult(data);
    };
    if (search && !result.length) {
      handleSearch(search);
    } else {
      const timeOut = setTimeout(() => {
        handleSearch(search);
      }, 300);
      return () => {
        clearTimeout(timeOut);
      };
    }
  }, [search, result.length]);
  return (
    <>
      <div className="wiki-nav">
        <div className="nav-link">
          <a href="/">
            <ion-icon name="person-sharp"></ion-icon> Not logged in
          </a>
          <a href="/">Talk</a>
          <a href="/">Contributions</a>
          <a href="/">Create account</a>
          <a href="/">Log In</a>
        </div>
        <div className="nav-link-bottom">
          <a href="/"> Read</a>
          <a href="/">View source</a>
          <a href="/">View history</a>
        </div>
        <div className="search-input">
          <input
            type="search"
            name="search"
            placeholder="search wikipedia"
            id="search"
            value={search}
            onChange={(e) => getSeaarch(e.target.value)}
          ></input>
          <ion-icon name="search-sharp"></ion-icon>
        </div>
      </div>
      <div className="side-manu">
        <div className="side-nav-img">
          <img alt="logo" src={Logo}></img>
        </div>
        <div className="side-nav-links">
          <a href="/">Main page</a>
          <a href="/">Contents</a>
          <a href="/">Current events</a>
          <a href="/">Random article</a>
          <a href="/">About Wikipedia</a>
          <a href="/">Contact us</a>
          <a href="/">Donate</a>
          <p>Contribute</p>
          <a href="/">Help</a>
          <a href="/">Learn to edit</a>
          <a href="/">Community portal</a>
          <a href="/">Recent changes</a>
          <a href="/">Upload file</a>
          <p>Tools</p>
          <a href="/">What links here</a>
          <a href="/">Related changes</a>
          <a href="/">Special pages</a>
          <a href="/">Permanent link</a>
          <a href="/">Page information</a>
          <a href="/">Cite this page</a>
          <a href="/">Wikidata item</a>
        </div>
      </div>

      <div className="content">
        {result.query ? (
          result.query.search.map((arr, index) => (
            <div key={index}>
              <h6>{arr.title}</h6>
              <span dangerouslySetInnerHTML={{ __html: arr.snippet }}></span>
              <a href={`https://en.wikipedia.org?curid=${arr.pageid}`}>
                details...
              </a>
            </div>
          ))
        ) : (
          <h6>Loading...</h6>
        )}
      </div>
    </>
  );
};

export default Wiki;
