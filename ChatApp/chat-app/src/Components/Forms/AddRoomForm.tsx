import React, { useState } from "react";
import useRooms from "../../API/Services/useRooms";
import {
  toastyErrorMessage,
  toastySuccessMessage,
} from "../../Utils/toastTypes";
import Button from "../Inputs/Button";
import TextInput from "../Inputs/TextInput";

type AddRoomFormProps = {
  refreshFunction: () => void;
  close: () => void;
};
const AddRoomForm = ({ refreshFunction, close }: AddRoomFormProps) => {
  const [newRoom, setNewRoom] = useState<string>("");

  const { addRoom: addRoomRequest } = useRooms();

  const addRoom = async (name: string) => {
    const resp = await addRoomRequest(name);
    if (resp.error)
      toastyErrorMessage(
        resp.error.message ? resp.error.message : "Unable to add room"
      );
    else {
      close();
      toastySuccessMessage("Room Added");
      refreshFunction();
    }
  };
  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        addRoom(newRoom);
      }}
    >
      <h3>Add Room</h3>
      <TextInput placeholder="name" value={newRoom} onChange={setNewRoom} />
      <div className="flex flex-row gap-2 items-center justify-center">
        <Button onClick={() => {}}>Add</Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            close();
          }}
        >
          Close
        </Button>
      </div>
    </form>
  );
};

export default AddRoomForm;
