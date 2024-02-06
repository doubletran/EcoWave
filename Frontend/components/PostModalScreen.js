import ReportProblem from "./reportProblem";
import { useState, u, useEffect } from "react";
import { Modal, Button } from "native-base";

export const PostModalScreen = () => {
  const [showModal, setShowModal] = useState(true);
  const [problem, setProblem] = useState(false);
  
  const [event, setEvent] = useState(false);
  const renderPostAction = () => {
    return (
      <>

        <Button
          variant="outline"
          onPress={() => {
            setShowModal(false);
            setProblem(true);
          }}
        >
          Spot a problem
        </Button>
        <Button
          variant="outline"
          title="Event"
          onPress={() => {
            setEvent(true);
            setShowModal(false);
          }}
        >
          Create an event
        </Button>
      </>
    );
  };
  const renderMediaAction = () => {
    const [action, setAction] = useState(false);
    return (
      <>
           {action &&
     <ImageUploader action={action}/>}
        <Button
          variant="outline"
          onPress={() => {
            setShowModal(false);
            setAction("camera");
          }}
        >
          Launch Camera
          {icons.camera}
        </Button>
        <Button
          variant="outline"
          title="Camera"
          onPress={() => {
            setAction("gallery");
            setShowModal(false);
          }}
        >
          Launch Gallery
          {icons.gallery}
        </Button>
      </>
    );
  };

  return (
    <>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content marginBottom="0" marginTop="auto">
          <Modal.Header>Choose an action</Modal.Header>
          <Modal.Body>
            {problem && <renderMediaAction/>}
            {}
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};
