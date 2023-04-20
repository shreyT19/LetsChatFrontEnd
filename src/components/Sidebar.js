import React, { useContext, useEffect } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../context/appContext";
import { addNotifications, resetNotifications } from "../features/userSlice";
import "./Sidebar.css";

function Sidebar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {
    socket,
    setMembers,
    members,
    setCurrentRoom,
    setRooms,
    privateMemberMsg,
    rooms,
    setPrivateMemberMsg,
    currentRoom,
  } = useContext(AppContext);

  function joinRoom(room, isPublic = true) {
    if (!user) {
      return alert("Please login");
    }
    socket.emit("join-room", room, currentRoom);
    setCurrentRoom(room);

    if (isPublic) {
      setPrivateMemberMsg(null);
    }
    // dispatch for notifications
    dispatch(resetNotifications(room));
  }

  socket.off("notifications").on("notifications", (room) => {
    if (currentRoom != room) dispatch(addNotifications(room));
  });

  useEffect(() => {
    if (user) {
      setCurrentRoom("general");
      getRooms();
      socket.emit("join-room", "general");
      socket.emit("new-user");
    }
  }, []);

  socket.off("new-user").on("new-user", (payload) => {
    setMembers(payload);
  });

  function getRooms() {
    fetch("http://localhost:5001/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data));
  }

  function orderIds(id1, id2) {
    if (id1 > id2) {
      return id1 + "-" + id2;
    } else {
      return id2 + "-" + id1;
    }
  }

  function handlePrivateMemberMsg(member) {
    setPrivateMemberMsg(member);
    const roomId = orderIds(user._id, member._id);
    joinRoom(roomId, false);
  }

  if (!user) {
    return <></>;
  }
  return (
    <div>
      <h2 className="text-slate-50">Available rooms</h2>
      <ul className="flex flex-col items-start">
        {rooms.map((room, idx) => (
          <li
            key={idx}
            onClick={() => joinRoom(room)}
            active={room == currentRoom}
            style={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
            }}
            className={`w-full text-slate-50  border-2 py-2 px-2 list-none ${
              room == currentRoom ? "bg-sky-500" : "bg-[#1a0b0bc7]"
            } `}
          >
            {room}{" "}
            {currentRoom !== room && (
              <span className="badge rounded-pill ">
                {user.newMessages[room]}
              </span>
            )}
          </li>
        ))}
      </ul>
      <h2 className="text-slate-50">Members</h2>
      <ul className="list-none">
        {members.map((member) => (
          <li
            key={member.id}
            style={{ cursor: "pointer" }}
            active={privateMemberMsg?._id === member?._id}
            onClick={() => handlePrivateMemberMsg(member)}
            disabled={member._id === user._id}
            className="list-none"
          >
            <div className="flex relative gap-2">
              <div className="flex flex-col gap-4">
                <img
                  src={member.picture}
                  className="member-status-img"
                  alt=""
                />
                {member.status === "online" ? (
                  <i className="fas fa-circle sidebar-online-status absolute   w-fit"></i>
                ) : (
                  <i className="fas fa-circle sidebar-offline-status absolute  w-fit"></i>
                )}
              </div>
              <div className="text-slate-50">
                {member.name}
                {member._id === user?._id && " (You)"}
                {member.status === "offline" && " (Offline)"}
              </div>
              <div className="text-slate-50">
                <span className="badge rounded-pill bg-primary">
                  {user.newMessages[orderIds(member._id, user._id)]}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
