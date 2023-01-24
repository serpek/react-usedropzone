import { useState, useRef } from "react";
import { useDropzone } from "./react-dropzone";

const imageAcceptTypes = {
  "image/png": [],
  "image/jpeg": [],
};
const documentAcceptTypes = {
  "application/pdf": [],
};

export const Dropzone1 = () => {
  const [count, setCount] = useState(0);
  const [acceptTypes, setAcceptTypes] = useState({
    ...documentAcceptTypes,
    ...imageAcceptTypes,
  });
  const pasteRef = useRef();

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    rootRef,
    open,
    setFiles,
  } = useDropzone({
    /*accept: {
      "image/jpg": [".jpg", ".png"],
      "image/jpeg": [".jpeg", ".png"],
      "image/png": [".png"],
      "image/gif": [".gif"],
      "image/tiff": [".tiff"],
      "image/x-ms-bmp": [".bmp"],
      "image/x-canon-cr2:": [".cr2"],
      "image/svg+xml": [".svg", ".svgz"],
      "video/mp4": [".mp4"],
      "video/quicktime": [".mov"],
      "video/3gpp": [".3gpp"],
      "video/webm": [".webm"],
      "video/x-ms-asf": [".asf"],
      "audio/mpeg": [".mpeg"],
      "audio/mpeg3": [".mpeg3"],
      "audio/mpg": [".mpg"],
      "audio/mp3": [".mp3"],
      "audio/x-mpeg": [".mpeg"],
      "audio/x-mpeg3": [".mpeg3"],
      "audio/x-mpg": [".mpg"],
      "audio/x-mp3": [".mp3"],
      "audio/mp4": [".mp4"],
      "audio/aac": [".aac"],
      "audio/x-wav": [".wav"],
      "audio/x-hx-aac-adts": [".aac"],
      "audio/midi": [".midi"],
      "audio/aiff": [".aiff"],
      "audio/x-aiff": [".aiff"],
      "audio/x-flac": [".flac"],
      "audio/wav": [".wav"],
      "application/ogg": [".ogg"],
      "application/msword": [".doc", ".docx"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xls",
        ".xlsx",
      ],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".doc", ".docx"],
      "application/vnd.ms-excel": [".xls", ".xlsx"],
      "application/vnd.ms-powerpoint": [".ppt", ".pptx"],
      "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        [".ppt", ".pptx"],
      "application/pdf": [".pdf"],
      "application/x-iwork-keynote-sffkey": [".keynote"],
      "application/x-iwork-numbers-sffnumbers": [".numbers"],
      "text/plain": [".txt"],
      "application/rtf": [".rtf"],
      "application/x-rtf": [".rtf"],
      "text/richtext": [".rtf"],
      "text/csv": [".csv"],
      "text/comma-separated-values": [".csv"],
      "text/rtf": [".rtf"],
      "text/x-c": [".dic"],
      "text/x-vcard": [".vcf"],
      "application/vnd.apple.keynote.13": [".keynote"],
      "application/vnd.apple.numbers": [".numbers"],
      "application/vnd.apple.pages.13": [".par"],
      "application/vnd.oasis.opendocument.text": [".odt"],
      "application/zip": [".zip"],
      "application/x-rar": [".rar"],
      "application/x-gzip": [".gzip"],
      "application/x-7z-compressed": [".7z"],
      "application/x-zip-compressed": [".zip"],
      "application/xml": [".xml"],
      "application/json": [".json"],
    },*/
    accept: acceptTypes,
    maxFiles: 30,
    maxSize: 100 * 1024 * 1024,
    onDropAccepted(files, event) {
      //  console.log("onDropAccepted: ", files, event);
    },
    onDrop(acceptedFiles, fileRejections, event) {
      // console.log("onDrop: ", acceptedFiles, fileRejections, event);
      setAcceptTypes({ ...documentAcceptTypes, ...imageAcceptTypes });
    },
    onDropRejected(fileRejections, event) {
      // console.log("onDropRejected: ", fileRejections, event);
    },
    validator(file, event) {
      // console.log("validator: ", file, event);
    },
    pasteContainerRef: pasteRef,
  });

  const dropZoneClick = (e: MouseEvent) => {
    const type = e.target.dataset.type;
    switch (type) {
      case "document": {
        setAcceptTypes(documentAcceptTypes);
        break;
      }
      case "image": {
        setAcceptTypes(imageAcceptTypes);
        break;
      }
      default:
        return;
    }
    if (open) {
      window.setTimeout(() => {
        open();
      }, 100);
    }
    return;
  };

  const onPaste = (e) => {
    const files = e.clipboardData.files;
    const a = [];
    for (const file of files) {
      a.push(file);
    }
    setFiles(a, e);
  };

  const files = acceptedFiles.map((file: File) => {
    return (
      <li key={file.name}>
        {file.name} - {file.size} bytes
      </li>
    );
  });

  return (
    <section
      ref={pasteRef}
      className="container"
      style={{ backgroundColor: "gray", padding: "10px" }}
    >
      <div className="container">
        <button onClick={dropZoneClick} data-type="document">
          Document
        </button>
        <button onClick={dropZoneClick} data-type="image">
          Image
        </button>
      </div>
      <br />
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  );
};
