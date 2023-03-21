import React, { useEffect, useRef } from "react";
import { MessageType } from "../App";

type MessageContainerProps = {
  messages: MessageType[];
};
const MessageContainer = ({ messages }: MessageContainerProps) => {
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageRef && messageRef.current) {
      const { scrollHeight, clientHeight } = messageRef.current;
      // alert(scrollHeight);

      messageRef.current.scrollTo({
        left: 0,
        top: scrollHeight - clientHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div
      ref={messageRef}
      className="flex flex-col items-end gap-4 h-[80vh] overflow-auto p-4"
    >
      {messages.map((message, i) => (
        <div key={i} className={"flex flex-col items-end"}>
          <div className="bg-teal-400 rounded-2xl w-fit py-2 px-4 text-white">
            {message.message}
          </div>
          <div>{message.user}</div>
        </div>
      ))}
    </div>
  );
};

export default MessageContainer;
