import { useState, useEffect, useRef } from "react";
import { Minus, Sliders } from "react-feather";

const Filters = () => {
  const [showFilter, setShowFilter] = useState(false);
  const filterRef = useRef<HTMLSpanElement>(null);

  const toggleFilter = () => {
    setShowFilter((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setShowFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <span className="position-relative" ref={filterRef}>
      <button className="filter-btn" onClick={toggleFilter}>
        <Sliders /> Filters
      </button>
      <div
        className="filter_popup"
        style={{ display: showFilter ? "block" : "none" }}
      >
        <div>
          <p className="font-12 mb-0 px-1 color-grey">
            <b>Filter By</b>
          </p>
          <div>
            <div className="row pt-3 px-1">
              <div className="col-12">
                <h1 className="font-12 mb-1">Categories</h1>
              </div>
              <div className="cat_list2">
                <input
                  type="checkbox"
                  id="p1"
                  className="position-absolute cat_chx opacity-0"
                ></input>
                <label htmlFor="p1" className="cat_lbl2">
                  Butter Milk
                </label>
                <input
                  type="checkbox"
                  id="p1"
                  className="position-absolute cat_chx opacity-0"
                ></input>
                <label htmlFor="p1" className="cat_lbl2">
                  Butter Milk
                </label>
                <input
                  type="checkbox"
                  id="p1"
                  className="position-absolute cat_chx opacity-0"
                ></input>
                <label htmlFor="p1" className="cat_lbl2">
                  Butter Milk
                </label>
                <input
                  type="checkbox"
                  id="p1"
                  className="position-absolute cat_chx opacity-0"
                ></input>
                <label htmlFor="p1" className="cat_lbl2">
                  Butter Milk
                </label>
              </div>
            </div>
            <div className="row pt-3 px-1">
              <div className="col-12">
                <h1 className="font-12 mb-1">Availblity</h1>
              </div>
              <div className="cat_list2">
                <input
                  type="checkbox"
                  id="p1"
                  className="position-absolute cat_chx opacity-0"
                ></input>
                <label htmlFor="p1" className="cat_lbl2">
                  In Stock
                </label>
                <input
                  type="checkbox"
                  id="p1"
                  className="position-absolute cat_chx opacity-0"
                ></input>
                <label htmlFor="p1" className="cat_lbl2">
                  Low Stock
                </label>
                <input
                  type="checkbox"
                  id="p1"
                  className="position-absolute cat_chx opacity-0"
                ></input>
                <label htmlFor="p1" className="cat_lbl2">
                  Out Of Stock
                </label>
              </div>
            </div>
            <div className="row pt-3 px-1">
              <div className="col-12">
                <h1 className="font-12 mb-1">Status</h1>
              </div>
              <div className="cat_list2">
                <input
                  type="checkbox"
                  id="p1"
                  className="position-absolute cat_chx opacity-0"
                ></input>
                <label htmlFor="p1" className="cat_lbl2">
                  Active
                </label>
                <input
                  type="checkbox"
                  id="p1"
                  className="position-absolute cat_chx opacity-0"
                ></input>
                <label htmlFor="p1" className="cat_lbl2">
                  In-Active
                </label>
              </div>
            </div>
            <div className="row pt-3 px-1">
              <div className="col-12">
                <h1 className="font-12 mb-1">Order Value</h1>
              </div>

              <div className="price-range pt-1">
                <input type="text" placeholder="Min"></input>
                <Minus></Minus>
                <input type="text" placeholder="Max"></input>
              </div>
            </div>
            <div className="row pt-3 px-1">
              <div className="col-12">
                <h1 className="font-12 mb-1">Price Range</h1>
              </div>

              <div className="price-range pt-1">
                <input type="text" placeholder="Min"></input>
                <Minus></Minus>
                <input type="text" placeholder="Max"></input>
              </div>
            </div>
          </div>
        </div>
      </div>
    </span>
  );
};

export default Filters;
