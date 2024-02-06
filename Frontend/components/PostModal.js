import ReportProblem from "./reportProblem";
import { useState, u, useEffect } from "react";
import { Modal, Button } from "native-base";

function EventOrProblem  ({onProblem, onEvent})  {
  return (
    <>
      <Button
        variant="outline"
        onPress={onProblem}>
        Spot a problem
      </Button>
      <Button
        variant="outline"
        title="Event"
        onPress={onEvent}>
        Create an event
      </Button>
    </>
  );
};
export const PostModal = ({navigation}) => {
  const [showModal, setShowModal] = useState(true);
  const [problem, setProblem] = useState(false);

  const [event, setEvent] = useState(false);
  
  const handleProblem = ()=>{
    navigation.navigate("Set location")
    setShowModal(false);
  }
  const handleEvent = ()=>{
    navigation.navigate("AddEvent")
    setShowModal(false);
  }
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
            {/* {problem && <renderMediaAction/>} */}
            {!problem && !event && <EventOrProblem onProblem={handleProblem} onEvent={handleEvent}/>}
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};