import { Controller } from "react-hook-form";
import { Minus } from "react-feather";
import { useState } from "react";
import dummy from "../../assets/img-dummy.jpg";

interface ImageUploadProps {
  control: any;
  name: string;
  label: string;
  error?: string;
  multiple?: boolean;
}

const ImageUpload = ({ control, name, label, error, multiple = false }: ImageUploadProps) => {
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleFileChange = (files: FileList | null, onChange: (files: FileList | null) => void) => {
    if (files) {
      const fileArray = Array.from(files);
      const imageUrls = fileArray.map(file => URL.createObjectURL(file));
      setPreviewImages(imageUrls);
      onChange(files);
    }
  };

  const removeImage = (index: number, onChange: (files: FileList | null) => void) => {
    const newImages = previewImages.filter((_, i) => i !== index);
    setPreviewImages(newImages);
    
    // If no images left, clear the field
    if (newImages.length === 0) {
      onChange(null);
    }
  };

  return (
    <div className="pt-3">
      <label className="lbl">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, ...field } }) => (
          <div className="media mt-1 pt-5">
            <div className="img_con">
              {previewImages.length === 0 && (
                <span>
                  <img src={dummy} alt="placeholder" />
                </span>
              )}
              {previewImages.map((image, index) => (
                <span key={index}>
                  <img src={image} alt={`preview-${index}`} />
                  <button
                    type="button"
                    onClick={() => removeImage(index, onChange)}
                  >
                    <Minus />
                  </button>
                </span>
              ))}
            </div>
            <p className="text-center font-14 pt-3">
              Drag and drop image here, or click add image
            </p>
            <div className="d-flex justify-content-center">
              <label className="upload_btn" htmlFor={name}>
                Add Image
              </label>
              <input
                {...field}
                type="file"
                id={name}
                className="file_npt"
                accept="image/*"
                multiple={multiple}
                onChange={(e) => handleFileChange(e.target.files, onChange)}
              />
            </div>
          </div>
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

export default ImageUpload;