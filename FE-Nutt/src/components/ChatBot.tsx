import {
  Center,
  Circle,
  keyframes,
  VStack,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useChatGPT from "../hooks/useChatGPT";

function ChatAvatar({ isError }: { isError: boolean }) {
  const GREEN_SCHEME = ["rgba(72, 187, 120, 0.6)", "rgba(154, 230, 180, 0.5)"];
  const RED_SCHEME = ["rgba(255, 141, 125, 0.6)", "rgba(255, 80, 56, 0.3)"];

  let scheme = isError ? RED_SCHEME : GREEN_SCHEME;

  const breathe = keyframes`
      0% {
        box-shadow: 0 0 0 7px ${scheme[0]}, 0 0 0 13px ${scheme[1]};
      }
      50% {
        box-shadow: 0 0 0 5px ${scheme[0]}, 0 0 0 9px ${scheme[1]};
      }
      100% {
        box-shadow: 0 0 0 7px ${scheme[0]}, 0 0 0 13px ${scheme[1]};
      }
     `;
  return (
    <Center w="40px" h="40px">
      <Circle
        size="12px"
        bg="white"
        animation={`${breathe} 2s ease-in-out infinite`}
      />
    </Center>
  );
}

type ChatBoxProps = {
  message: string;
  isLoading: boolean;
  isError: boolean;
};

function ChatBox(props: ChatBoxProps) {
  return (
    <Flex
      w="full"
      bgGradient={
        props.isError
          ? "linear(to-r, #ff8d7d, #ff5038)"
          : "linear(to-r, #48BB78, #38A169)"
      }
      borderRadius={8}
      padding={3}
      color="white"
      fontSize="sm"
      lineHeight={6}
      whiteSpace="pre-wrap"
    >
      {props.isLoading ? (
        <Center width="full" padding={4}>
          <Spinner />
        </Center>
      ) : (
        props.message
      )}
    </Flex>
  );
}

type ChatBotProps = {
  question?: string; // ChatGPT에 전달할 질문
  message?: string; // 사용자 정의 문자열
};

export default function ChatBot(props: ChatBotProps) {
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>(props.message || "");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { callChatGPT } = useChatGPT();

  useEffect(() => {
    if (props.question) {
      setIsLoading(true);
      callChatGPT(props.question).then((data) => {
        const { answer, success } = data;
        setIsLoading(false);
        setMessage(answer);
        setIsError(!success);
      });
    }
    return function cleanup() {
      setIsLoading(false);
      setMessage("");
      setIsError(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <VStack w={"full"} alignItems="flex-start">
      <ChatAvatar isError={isError} />
      <ChatBox message={message} isLoading={isLoading} isError={isError} />
    </VStack>
  );
}
