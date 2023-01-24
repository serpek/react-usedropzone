import React, { createRef, useEffect, useState } from "react";
import Dropzone from "./react-dropzone";
const imageAcceptTypes = {
  "image/png": [],
  "image/jpeg": [],
};
const documentAcceptTypes = {
  "application/pdf": [],
};

export const Dropzone2 = () => {
  const [acceptTypes, setAcceptTypes] = useState(imageAcceptTypes);

  const dropzoneRef = createRef();
  const openDialog = () => {
    // Note that the ref is set async,
    // so it might be null at some point
    if (dropzoneRef.current) {
      dropzoneRef.current?.open();
    }
  };

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
    if (dropzoneRef.current) {
      window.setTimeout(() => {
        dropzoneRef.current?.open();
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
    dropzoneRef.current?.setFiles(a, e);
  };

  // Disable click and keydown behavior on the <Dropzone>
  return (
    <section
      className="container"
      style={{ backgroundColor: "gray" }}
    >
      <Dropzone ref={dropzoneRef} noClick noKeyboard accept={acceptTypes}>
        {({ getRootProps, getInputProps, acceptedFiles }) => {
          return (
            <div className="container">
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here</p>
                <button type="button" onClick={openDialog}>
                  Open File Dialog
                </button>

                <button onClick={dropZoneClick} data-type="document">
                  Document
                </button>
                <button onClick={dropZoneClick} data-type="image">
                  Image
                </button>
              </div>
              <aside>
                <h4>Files</h4>
                <ul>
                  {acceptedFiles.map((file) => (
                    <li key={file.name}>
                      {file.name} - {file.size} bytes
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          );
        }}
      </Dropzone>
    </section>
  );
};
