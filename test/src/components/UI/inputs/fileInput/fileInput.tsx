import { ChangeEvent, memo, useEffect, useRef, useState } from "react";
import styles from "./fileInput.module.scss";
import Button from "../../buttons/button/button";
import iconUploadUserPhoto from "@source/assets/icons/iconUploadUserPhoto.svg";
import iconCloseBorder from "@source/assets/icons/iconCloseBorder.svg";
import Loader from "../../../loader/loader";

export default memo((props: FileInputProps) => {
  const { selectedFile, setSelectedFile, className, preview, loading, onDeleteFile, acceptFormats = ".png, .jpg, .jpeg, .gif", areaText } = props;
  const [inputPreview, setInputPreview] = useState<string | null>(preview || null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    if (containerRef?.current) {
      containerRef.current.ondragover = containerRef.current.ondragenter = (
        e: DragEvent
      ) => {
        e.preventDefault();
      };
      containerRef.current.ondrop = (e: DragEvent) => {
        if (inputRef?.current && e.dataTransfer) {
          inputRef.current.files = e.dataTransfer.files;

          const dT = new DataTransfer();
          dT.items.add(e.dataTransfer.files[0]);

          inputRef.current.files = dT.files;
          setSelectedFile(e.dataTransfer.files[0]);

          e.preventDefault();
        }
      };
    }
    const container = containerRef.current;
    return () => {
      if (container) {
        container.ondragover = container.ondragenter = container.ondrop = null;
      }
    };
  }, [containerRef, containerRef.current, setSelectedFile]);

  useEffect(() => {
    if (!selectedFile) {
      setInputPreview(null);
      return;
    }
    
    const objectUrl = URL.createObjectURL(selectedFile);
    setInputPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (preview) {
      setInputPreview(preview)
    }
  }, [preview])

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files.length) {
      setSelectedFile(null);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  const onCloseIcon = async () => {
    onDeleteFile && await onDeleteFile();
    setSelectedFile(null);
    setInputPreview(null);
  }
  
  return (
    <div ref={containerRef} className={`${className} ${styles.fileInput}`}>
      {
          inputPreview ? 
          <div className={`${styles.fileInput__avatarWrapper}`}>
              <div className={`${styles.img}`}>
                {
                  loading ?
                  (
                    <>
                      <div className={styles.blur} />

                      <div className={styles.loader}>
                        <Loader width={32} height={32} borderWidth={5} color="#FFFFFF"/>
                      </div>
                    </>
                  )
                  :
                  <></>
                }
             
                <img className={`${styles.file}`} src={inputPreview} alt="avatar"/>

                <img className={styles.closeIcon} src={iconCloseBorder}  onClick={() => onCloseIcon()}/>
              </div>

              <span className={`${styles.fileName}`}>{selectedFile?.name}</span>
            </div>
          :
          <>
            <img className={styles.fileInput_icon} width={64} height={64} src={iconUploadUserPhoto} />

            <div className={styles.fileInput_title}>{areaText || "Drop your image here, or"}</div>

            <Button size="small" variant="outlined" className={styles.fileInput_btn}>
              <label className={styles.fileInput__label}>
                Choose file
                <input
                  className={styles.fileInput__label_input}
                  onChange={onInputChange}
                  type="file"
                  accept={acceptFormats}
                  ref={inputRef}
                />
              </label>
            </Button>
          </>
      }
    </div>
  );
});
interface FileInputProps {
  /** Delete file handler */
  onDeleteFile?: () => void,

  /** Selected file 
   * @default null
  */
  selectedFile: File | null;

  /** set file state function */
  setSelectedFile: (x: File | null) => void;

  /** className for container wrapping FileInput component */
  className?: string;

  /** Input preview */
  preview?: string | null;

  /** Input loading status */
  loading?: boolean;
  acceptFormats?: string,
  areaText?: string,
}
