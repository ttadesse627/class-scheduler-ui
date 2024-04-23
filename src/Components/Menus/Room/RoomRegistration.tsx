import React, {useState } from "react";
import { InputField, SelectField } from "../../Common/InputField/InputField";
import {IRoomForm} from "../../Interfaces/FormData";
import { FaCut } from "react-icons/fa";


const roomTypeOptions = [
  {
    value: "",
    optionText: "--Select Room Type--"
  },
  {
    value: "Lecture",
    optionText: "Lecture"
  },
  {
    value: "Lab",
    optionText: "LAB"
  }
];

const RoomRegistration: React.FC<{getRoomCollection: (
  newRoomCollection: IRoomForm["roomForm"][]
) => void;
} > = ({getRoomCollection}) => {
  const [roomFormData, setRoomFormData] = useState<IRoomForm["roomForm"]>(
    {
      id: undefined,
      roomNumber: "",
      blockNumber: "",
      roomType: ""
    }
  );
  const [roomCollection, setRoomCollection] = useState<
    IRoomForm["roomForm"][]
  >([]);

  let tableRows: JSX.Element[] = [];

  let changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRoomFormData({ ...roomFormData, [name]: value });
  };

  const addTest = (e: React.FormEvent) => {
    e.preventDefault();
    const newRoomCollection = [...roomCollection, roomFormData];
    setRoomCollection(newRoomCollection);
    setRoomFormData({
      id: undefined,
      roomNumber: "",
      blockNumber: "",
      roomType: ""
    })
  };

  if (roomCollection.length > 0) {
    tableRows = roomCollection.map((room, index) => (
      <tr key={`${room.id}-${index}`} className="w-full p-1">
        <td className="text-center">{index + 1}</td>
        <td className="text-center">{room.roomNumber}</td>
        <td className="text-center">{room.blockNumber}</td>
        <td className="text-center">{room.roomType}</td>
        <td className="text-center">
          <button
            className="w-8 h-8"
            type="button"
            title="Remove"
            style={{ padding: 0, margin: 0 }}
            onClick={() => handleRemove(room.roomNumber)}
          >
            <FaCut />
          </button>
        </td>
      </tr>
    ));
  } 

  const handleRemove = (roomNumber: string) => {
setRoomCollection(roomCollection.filter((room) => room.roomNumber != roomNumber))
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    getRoomCollection(roomCollection);
  }

  const { roomNumber, blockNumber, roomType } = roomFormData;

  return (
      <form className="p-2" onSubmit={handleSubmit}>
        <h1 className="text-2xl text-center">Room Registration Form</h1>
        <div>
          <div className="m-4 p-2 flex justify-around items-center border-2 h-24">
            <InputField
              id="roomNumber"
              type="text"
              name="roomNumber"
              label="Room Number"
              value={roomNumber}
              onChange={changeInputHandler}
            />
            <InputField
              id="blockNumber"
              type="text"
              name="blockNumber"
              label="Block Number"
              value={blockNumber}
              onChange={changeInputHandler}
            />
            <SelectField
              id="roomType"
              type="select"
              name="roomType"
              label="Room Type"
              value={roomType}
              optionValues={roomTypeOptions}
              onChange={changeInputHandler}
            />
          </div>
          <button onClick={addTest}>Add More</button>
        </div>
        {tableRows.length > 0 && (
        <><div className="w-3/5 mt-4 rounded p-1 shadow shadow-black">
          <table className="w-full">
            <thead>
              <tr className="text-center">
                <th>Index</th>
                <th>Room Number</th>
                <th>Block Number</th>
                <th>Room Type</th>
              </tr>
            </thead>
            <tbody>
              {tableRows}
            </tbody>
          </table>
          
        </div>
        <button className="w-40 h-8 text-center text-white text-lg m-4 ml-20 right-4 rounded bg-primary p-1 shadow shadow-black" type="submit">Finish</button>
        </>)}
      </form>
  );
};

export default RoomRegistration;
