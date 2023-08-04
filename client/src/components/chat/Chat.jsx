import React, { useState } from "react";
import "./Chat.scss";
import HelpIcon from "@mui/icons-material/Help";
import ChatMessage from "./ChatMessage";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
function Chat() {
  const [chatOpen, setChatOpen] = useState(false);

  const openChat = () => {
    setChatOpen(true);
  };

  const closeChat = () => {
    setChatOpen(false);
  };

  return (
    <div className="app-container">
      <div className="chat-support">
        <button onClick={openChat}>
          <HelpIcon style={{ fontSize: "3rem" }} />
        </button>
      </div>
    </div>
  );
}

export default Chat;
