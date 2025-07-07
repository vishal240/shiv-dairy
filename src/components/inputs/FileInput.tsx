import { Controller } from "react-hook-form";
import { UploadCloud } from "react-feather";
import { type InputHTMLAttributes } from "react";

interface FileInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  control: any;
  name: string;
  label: string;
  error?: string;
  currentFile?: string;
}

const FileInput = ({ control, name, label, error, currentFile, ...rest }: FileInputProps) => {
  return (
    <div className="pt-2">
      <p className="color-grey font-12 mb-2 pt-2">
        {currentFile || `${label.toLowerCase()}.pdf`}
      </p>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, ...field } }) => (
          <>
            <label className="lbl_docs" htmlFor={name}>
              <UploadCloud />
              {label}
            </label>
            <input
              {...field}
              {...rest}
              type="file"
              id={name}
              className="doc_npt"
              onChange={(e) => onChange(e.target.files)}
            />
          </>
        )}
      />
      {error && (
        <p
          className="alert alert-danger"
          style={{
            fontSize: "12px",
            marginTop: "5px",
            padding: "8px",
            marginBottom: "15px",
            backgroundColor: "#ffe6e6",
            color: "#d63384",
            border: "1px solid #f5c6cb",
            borderRadius: "5px",
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default FileInput;