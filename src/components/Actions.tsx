import { useState, useEffect, useRef } from "react";
import { Check, Edit, Eye, MoreVertical, Trash, X } from "react-feather";

const Actions = () => {
  const [showFilter, setShowFilter] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const toggleFilter = () => {
    setShowFilter((prev) => !prev);
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
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
    <>
      <span className="position-relative d-inline-block" ref={popupRef}>
        <button className="actions-btn" onClick={toggleFilter}>
          <MoreVertical size={16} />
        </button>
        <div
          className="action_popup"
          style={{ display: showFilter ? "block" : "none" }}
        >
          <button className="btn_crud">
            <Edit /> Edit
          </button>
          <button className="btn_crud">
            <Eye /> View
          </button>
          <button
            className="btn_crud text-red"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <Trash /> Delete
          </button>
        </div>
      </span>
      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body text-center">
              <div className="d-flex justify-content-center">
                <span className="icon_modal icon_red">
                  <Trash></Trash>
                </span>
              </div>
              <h3 className="mdl_head">Are you sure?</h3>
              <div className="d-flex justify-content-center gap-10">
                <button className="btn_imprt">
                  {" "}
                  <X></X> Cancel
                </button>
                <button className="black_btn">
                  {" "}
                  <Check></Check> Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Actions;
