import {
  Check,
  DownloadCloud,
  File,
  Plus,
  UploadCloud,
  X,
} from "react-feather";

const ImportExport = () => {
  return (
    <>
      <span className="gap-10 d-flex align-items-center justify-content-md-end">
        <button
          className="btn_imprt"
          data-bs-toggle="modal"
          data-bs-target="#import"
        >
          <UploadCloud></UploadCloud> Import
        </button>
        <button className="btn_imprt">
          <DownloadCloud></DownloadCloud> Export
        </button>
        <button className="black_btn">
          <Plus></Plus> Add New
        </button>
      </span>

      <div
        className="modal fade"
        id="import"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body text-center">
              <label htmlFor="import" className="lbl_mprt">
                <File></File>
                <p>Drag here or Click here for Upload File</p>
                <p>You have upload Orders.xls</p>
              </label>
              <input type="file" name="" id="import" />
              <p className="file_frmt">
                {" "}
                <u>
                  <b>Click here</b>
                </u>{" "}
                to Download the File Formate{" "}
              </p>

              <div className="d-flex justify-content-end gap-10">
                <button className="btn_imprt">
                  {" "}
                  <X></X> Cancel
                </button>
                <button className="black_btn">
                  {" "}
                  <Check></Check> Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImportExport;
