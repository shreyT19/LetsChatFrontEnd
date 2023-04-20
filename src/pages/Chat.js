import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import MessageForm from "../components/MessageForm";
//bg-[#1f1e1ee6]
function Chat() {
  return (
    <div className="  flex-1 flex py-4 px-8 bg-[#171616]">
      <div className="flex w-screen items gap-4">
        <div className="flex-1">
          <Sidebar />
        </div>
        <div className="flex-1">
          <MessageForm />
        </div>
      </div>
    </div>
  );
}

export default Chat;
