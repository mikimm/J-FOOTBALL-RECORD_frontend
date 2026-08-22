import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
function PictureModal({
  show,
  setShow,
  file,
  setFile,
  registerFile,
  setRegisterFile,
}) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const [SaveImagedisabled, setSaveImagdisabled] = useState(true);
  const [target_file, setTargetFile] = useState(null);
  const handleClose = () => {
    setShow(false);
    setTargetFile(registerFile);
  };
  const saveFile = (target_file) => {
    setShow(false);
    setRegisterFile(target_file);
  };
  const deleteFile = () => {
    setFile(null);
    setTargetFile(null);
    setRegisterFile(null);
    setShow(false);
    setSaveImagdisabled(true);
  };
  useEffect(() => {
    if (acceptedFiles) {
      acceptedFiles.map((file) => {
        setFile(file);
        setTargetFile({ file: file.name, preview: URL.createObjectURL(file) });
        setSaveImagdisabled(false);
      });
    }
  }, [acceptedFiles]);
  return (
    <Modal show={show} centered={true} onHide={handleClose}>
      <Modal.Header onHide={handleClose} closeButton>
        <Modal.Title>画像投稿</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group
            className="mb-3"
            {...getRootProps({ className: "dropzone" })}
          >
            <input {...getInputProps()} />
            <Form.Label>
              drop some files here ,or click to select files
            </Form.Label>
            {target_file && (
              <>
                <div>選択中のファイル：{target_file.file}</div>
                <img width="100%" src={target_file.preview} />
              </>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={deleteFile}>
          Delete Image
        </Button>
        <Button
          variant="primary"
          onClick={() => saveFile(target_file)}
          disabled={SaveImagedisabled}
        >
          Save Image
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default PictureModal;
