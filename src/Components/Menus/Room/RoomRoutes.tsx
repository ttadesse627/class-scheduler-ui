import { Route, Routes } from "react-router-dom";
import PageNotFound from "../PageNotFound";
import RoomRegistration from "./RoomRegistration";
import RoomList from "./RoomList";

function RoomRoutes() {
  return (
    <Routes>
      <Route
        index
        element={<RoomList />}
      />
      <Route
        path="add-new"
        element={
          <RoomRegistration getRoomCollection={() => (): void => {
            throw new Error("Function not implemented.");
          } }  />
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default RoomRoutes;
