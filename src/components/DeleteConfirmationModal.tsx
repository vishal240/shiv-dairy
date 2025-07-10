import { Check, Trash, X } from "react-feather";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  title?: string;
  message?: string;
}

export const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onDelete,
  title = "Delete Confirmation",
  message = "Are you sure you want to delete this item?",
}: DeleteConfirmationModalProps) => {
  return (
    <div
      className="modal fade show"
      style={{ display: isOpen ? "block" : "none" }}
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
            <h3 className="mdl_head">{title}</h3>
            <p>{message}</p>
            <div className="d-flex justify-content-center gap-10">
              <button className="btn_imprt" onClick={onClose}>
                {" "}
                <X></X> Cancel
              </button>
              <button className="black_btn" onClick={onDelete}>
                {" "}
                <Check></Check>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
