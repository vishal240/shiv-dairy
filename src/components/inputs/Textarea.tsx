import { Controller } from "react-hook-form";
import { type TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  control: any;
  name: string;
  label: string;
  error?: string;
}

const Textarea = ({ control, name, label, error, ...rest }: TextareaProps) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="lbl">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <textarea {...field} {...rest} className="textarea" />
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

export default Textarea;