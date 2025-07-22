import { Controller } from "react-hook-form";
import { type InputHTMLAttributes } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  control: any;
  name: string;
  label: string;
  error?: string;
}

const TextEditor = ({ control, name, label, error, ...rest }: InputProps) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="lbl">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <CKEditor
            editor={ClassicEditor}
            data={field.value || ""}
            config={{
              licenseKey: 'GPL',
              toolbar: [
                "heading",
                "bold",
                "italic",
                "underline",
                "link",
                "numberedList",
                "bulletedList",
                "blockQuote",
                "imageUpload",
                "mediaEmbed",
                "insertTable",
                "alignment",
                "code",
                "codeBlock",
                "undo",
                "redo",
                "strikethrough",
                "fontFamily",
                "fontSize",
                "fontColor",
                "highlight",
                "indent",
                "outdent",
                "horizontalLine",
                "pageBreak",
                "removeFormat",
                "subscript",
                "superscript",
              ],
              placeholder: "Start writing here...",
            }}
            onChange={(event, editor) => {
              field.onChange(editor.getData());
            }}
          />
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

export default TextEditor;