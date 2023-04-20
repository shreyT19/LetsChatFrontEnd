import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { AppContext } from "../context/appContext";
import "./MessageForm.css";
function MessageForm() {
  const [message, setMessage] = useState("");
  const user = useSelector((state) => state.user);
  const { socket, currentRoom, setMessages, messages, privateMemberMsg } =
    useContext(AppContext);
  const messageEndRef = useRef(null);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function getFormattedDate() {
    const date = new Date();
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();

    month = month.length > 1 ? month : "0" + month;
    let day = date.getDate().toString();

    day = day.length > 1 ? day : "0" + day;

    return month + "/" + day + "/" + year;
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  function scrollToBottom() {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  const todayDate = getFormattedDate();

  socket.off("room-messages").on("room-messages", (roomMessages) => {
    setMessages(roomMessages);
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (!message) return;
    const today = new Date();
    const minutes =
      today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
    const time = today.getHours() + ":" + minutes;
    const roomId = currentRoom;
    socket.emit("message-room", roomId, message, user, time, todayDate);
    setMessage("");
  }
  return (
    <>
      <div className="messages-output">
        {user && !privateMemberMsg?._id && (
          <div className="w-full bg-black px-4 py-4 text-slate-50">
            You are in the {currentRoom} room
          </div>
        )}
        {user && privateMemberMsg?._id && (
          <>
            <div className="w-full bg-black px-4 py-4 text-slate-50 flex">
              <div className="flex">
                Your conversation with {privateMemberMsg.name}{" "}
                {/* <img
                   src={privateMemberMsg.picture}
                  className="rounder-[100%] border-2px border-white"
                   alt=""
                 /> */}
              </div>
            </div>
          </>
        )}
        {!user && <div className="alert alert-danger">Please login</div>}

        {user &&
          messages.map(({ _id: date, messagesByDate }, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-center mt-2">
                <p className="bg-[#cff4fc] px-2 py-2 rounded">{date}</p>
              </div>
              {messagesByDate?.map(
                ({ content, time, from: sender }, msgIdx) => (
                  <div
                    className={
                      sender?.email === user?.email
                        ? "message"
                        : "incoming-message"
                    }
                    key={msgIdx}
                  >
                    <div className="message-inner">
                      <div className="d-flex align-items-center mb-3">
                        {/*<img
                          src={sender.picture}
                          style={{
                            width: 35,
                            height: 35,
                            objectFit: "cover",
                            borderRadius: "50%",
                            marginRight: 10,
                          }}
                          alt=""
                        /> */}
                        {/*<p className="message-sender">
                          {sender._id === user?._id ? "You" : sender.name}
                    </p> */}
                      </div>
                      <div className="flex justify-between gap-3">
                        <p className="message-content">{content}</p>
                        <span
                          className={`text-right px-2 rounded h-fit text-[#333] self-end ${
                            sender?.email === user?.email
                              ? "text-[#333]"
                              : "text-slate-50"
                          } `}
                        >
                          {time}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          ))}
        <div ref={messageEndRef} />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-3">
          <div className="flex flex-col flex-1">
            <div className="w-full">
              <input
                type="text"
                placeholder="Your message"
                disabled={!user}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="py-2 px-2 rounded w-full"
              ></input>
            </div>
          </div>
          <div className="flex flex-col" md={1}>
            <Button
              variant="primary"
              type="submit"
              style={{ width: "100%", backgroundColor: "orange" }}
              disabled={!user}
            >
              <i className="fas fa-paper-plane"></i>
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}

export default MessageForm;
