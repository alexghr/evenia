import {
  ChangeEventHandler,
  InputHTMLAttributes,
  MouseEventHandler,
  ReactNode,
  forwardRef,
  useRef,
  useState,
} from "react";
import styles from "./FileInput.module.scss";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "placeholder"> & {
  placeholder?: ReactNode;
  preview?: (files: FileList) => ReactNode;
};

export default forwardRef<HTMLInputElement, Props>(function FileInput(
  { className = "", type = "file", placeholder, preview, onChange, ...props },
  ref
) {
  const [previewFiles, setPreviewFiles] = useState<FileList | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (ev) => {
    const input = rootRef.current?.querySelector("input");
    input?.click();
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (ev) => {
    setPreviewFiles(ev.target.files);
    onChange?.(ev);
  };

  const handleClear: MouseEventHandler<HTMLButtonElement> = (ev) => {
    const input = rootRef.current?.querySelector("input");
    setPreviewFiles(null);
    if (input) {
      input.value = "";
    }
  };

  return (
    <div ref={rootRef} className={styles.wrapper + " " + className}>
      <input
        {...props}
        onChange={handleChange}
        className={styles.input}
        type={type}
        ref={ref}
      />
      {previewFiles && preview && (
        <div className={styles.preview}>
          {preview(previewFiles)}
          <button onClick={handleClear} className={styles.clear}>
            &times;
          </button>
        </div>
      )}
      {!previewFiles && (
        <button onClick={handleClick} className={styles.trigger}>
          {placeholder}
        </button>
      )}
    </div>
  );
});
