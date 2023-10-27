import { FormControl, HStack, IconButton, Input } from "@chakra-ui/react";
import { FC, useEffect, useRef } from "react";
import { AiOutlineSend } from "react-icons/ai";
import Message from "../../interfaces/Message";

type MessageFormProps = {
  message: Message;
  onMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMessageSubmit: (
    e: React.SyntheticEvent,
    ref: React.RefObject<HTMLInputElement>
  ) => void;
  isLoading: boolean;
};

const MessageForm: FC<MessageFormProps> = ({
  message,
  onMessageChange,
  onMessageSubmit,
  isLoading,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [isLoading]);

  return (
    <form onSubmit={(e) => onMessageSubmit(e, inputRef)}>
      <FormControl paddingTop={3} isDisabled={isLoading}>
        <HStack spacing={2}>
          <Input
            placeholder="메세지를 입력하세요"
            autoComplete="off"
            value={message.content}
            onChange={(e) => onMessageChange(e)}
            ref={inputRef}
          />
          <IconButton
            colorScheme="green"
            aria-label="Send Message"
            icon={<AiOutlineSend />}
            type="submit"
            isDisabled={isLoading}
          />
        </HStack>
      </FormControl>
    </form>
  );
};

export default MessageForm;
