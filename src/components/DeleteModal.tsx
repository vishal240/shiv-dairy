import React from "react";
import { Check, Trash, X } from "react-feather";
import ApiService from "../services/api";

const DeleteModal = (
  { rowId }: { rowId: string | number },
  deleteAPI: string
) => {
  const deleteItem = () => {
    ApiService.post(deleteAPI, {
      category_id: rowId,
    })
      .then((res: any) => {
        console.log(res);
      })
      .catch((err: any) => {
        alert(err.response.data.message);
      });
  };
  return (
    <div
      className="modal fade show"
      style={{ display: "block" }}
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
              <button className="black_btn" onClick={deleteItem}>
                {" "}
                <Check></Check> Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
