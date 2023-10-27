import { Stack } from "@chakra-ui/react";
import { FC, useEffect, useRef } from "react";
import Message from "../../interfaces/Message";
import { MessageBox } from "./MessageBox";

type MessagesStackProps = {
  context: Array<Message>;
};

const MessagesStack: FC<MessagesStackProps> = ({ context }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (menuRef.current) {
      menuRef.current.scrollTop = menuRef.current.scrollHeight;
    }
  }, [context]);

  return (
    <Stack spacing={5} overflowY="auto" ref={menuRef} scrollBehavior="smooth">
      {context.map((message, index) => (
        <MessageBox key={index} role={message.role} content={message.content} />
      ))}
    </Stack>
  );
};

export default MessagesStack;
