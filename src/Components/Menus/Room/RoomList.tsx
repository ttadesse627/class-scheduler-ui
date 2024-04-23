import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import ToastNotification from "../../Common/ToastNotification";
import {IRoomData, IRoomForm } from "../../Interfaces/FormData";
import { handleDelete, handleGet, handlePost } from "../../Services/CrudServices";
import Button from "../../Common/Button/Button";
import { UUID } from "crypto";
import { FaSpinner, FaTrashCan } from "react-icons/fa6";
// import { FaEdit } from "react-icons/fa";
import { SelectField } from "../../Common/InputField/InputField";
import RoomRegistration from "./RoomRegistration";
import '../../../styles/modal-style.css'


interface IDepatmentOption
{
  departmentOption: {
    value?: UUID;
    optionText: string;
  }
}

const RoomList: React.FC<IRoomForm | { roomForm?: IRoomForm }> = () => {
  document.title = "List of Rooms";
  const [data, setData] = useState<IRoomForm["roomForm"][]>();

  const [isloading, setIsLoading] = useState(true);
  const [isGrid, setIsGrid] = useState(true);
  const [displayModal, setDisplayModal] = useState("display-none")
  const [displayForm, setDisplayForm] = useState("display-none")

  const [departmentOptions, setDepartmentOptions] = useState<IDepatmentOption["departmentOption"][]>([]);
  const [departmentId, setDepartmentId] = useState<string>();
  const [rooms, setRooms] = useState<IRoomData["roomData"]["rooms"]>([]);

  let roomPayload: IRoomData["roomData"] = {
    rooms: [],
    departmentId: undefined
  }

  let rows: React.JSX.Element[] = [];
  

  useEffect(() => {
    getData();
  }, []);

  if (data != null || data != undefined) {
    if (data.length > 0) {
      rows = data.map((room, index) => (
        <tr key={`${room.id}-${index}`} className="table-row">
          <td className="p-1">{index + 1}</td>
          <td className="p-1">{room.roomNumber}</td>
          <td className="p-1">{room.blockNumber}</td>
          <td className="p-1">{room.roomType}</td>
          <td className="p-1 flex flex-row justify-around">
            <span className="" title="Delete"><FaTrashCan className="cursor-pointer" onClick={() => deleteRoom(room.id)}/></span>
            {/* <span className=""  title="Edit"><FaEdit className="cursor-pointer"  onClick={() => editRoom(room)}/></span> */}
          </td>
        </tr>
      ));
    }
  }

  const getData = async() => {

    const response = await handleGet("Room/GetAll")
    console.log(response)
    if (response.status === 200) {
      setData(response.data)
      
    }
    setIsLoading(false)
  }

  let changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDepartmentId(e.target.value);
  };

  const deleteRoom = async(id?: UUID) => {
    const confirm = window.confirm(`Do you wanna delete the room with an id ${id}`)
    if (confirm === true) {
      const response = await handleDelete(`Room/Delete/${id}`)
      console.log("response: "+response)
      if (response.status == 200) {
        ToastNotification.SuccessNotification("Successfully deleted the room")
        getData()
      }
      else {
        ToastNotification.ErrorNotification("Could not delete the room: "+response)
      }
    }
  }

  const getRooms = (roomCollection: IRoomData["roomData"]["rooms"]) => {
    setRooms(roomCollection)
    setDisplayModal("display-none")
    setIsGrid(false)
    getDepartments()
    setDisplayForm("display-block")

    return roomCollection;
  }

  const addRoomHadler =() =>{
    setDisplayModal("display-block")
  }

  const handleSubmit =(e: React.FormEvent) =>{
    e.preventDefault();
    setIsGrid(true)
    getData()

    roomPayload = {rooms: rooms, departmentId: departmentId}
    submitRoomData(roomPayload)
  }

  const getDepartments = async() =>{
    const {response, success} = await handleGet("Department/GetForRoom")
    if (success) {
      const roomValues = response.data.data;
      if ((response.data.data != undefined)&&(response.data.data.length > 0)) 
      {
        let deptOptions: IDepatmentOption["departmentOption"][] = [{
          value: undefined,
          optionText: "--Select Value--"
        }];

        roomValues.map((dept: { id: UUID; shortName: string; name: string; }) => {
          deptOptions.push({value: dept.id, optionText: `${dept.shortName}-${dept.name}`})
        })
        setDepartmentOptions(deptOptions);
      }
    }
  }

  const submitRoomData = async (payload: IRoomData["roomData"]) => {
    console.log(payload)
    const response = await handlePost("Room/Create", payload)
    if (response.statusCode == 200) {
      ToastNotification.SuccessNotification("Successfully added the room/s")
      getData();
    }
    else{
      ToastNotification.ErrorNotification("Could not delete the required room/s")
      getData();
    }
  }

  // const editRoom = (room: IRoomForm["roomForm"]) => {}

  return (
    <div className="w-11/12 p-4 border-solid border border-gray-200 rounded shadow-black">
        {isGrid?
        (<div>
          <div className="text-blue-600 m-4">
          <Button
              id="addButton"
              type="button"
              text="Add Room"
              onClick={addRoomHadler}
            />
        </div>
          {isloading? (<div><p>Loading...</p><FaSpinner className="animate-spin" /></div>): 
          (rows.length > 0 ? (
            <table className="w-3/4 rounded shadow shadow-black">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Room Number</th>
                  <th>Block Number</th>
                  <th>Room Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </table>
          ) : (
            <p>No data found!</p>
          ))}
            <div id="modal" className={`modal ${displayModal}`}>
              <div className="modal-content">
                <span className="close" onClick={() => setDisplayModal("display-none")}>&times;</span>
                <RoomRegistration  getRoomCollection={getRooms} />
              </div>
            </div>
          </div>): 
          (<div className={displayForm}>
            <form className="p-1 w-3/4" onSubmit={handleSubmit}>
              <SelectField id="departmentId" name="departmentId" type="select" label="Department" optionValues={departmentOptions} onChange={changeInputHandler} value={departmentId}/>
              <ul className="w-3/4 p-1 rounded shadow shadow-black mt-4 mb-4">
                {rooms.map((room, index) => (<li key={index} className="p-1 w-full hover:bg-gray-300 border">{`${room.roomNumber}${room.blockNumber}-${room.roomType}`}</li>))}
              </ul>
              <Button type="submit" text="Submit"/>
            </form>
          </div>)
        }
        <ToastContainer />
    </div>
  );
};

export default RoomList;
