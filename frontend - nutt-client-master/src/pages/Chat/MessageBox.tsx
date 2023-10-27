import { Flex, Skeleton, Stack } from "@chakra-ui/react";
import { FC } from "react";
import Message from "../../interfaces/Message";

export const MessageBox: FC<Message> = ({ role, content }) => {
  const bgColor = role === "user" ? "green.500" : "gray.100";
  const color = role === "user" ? "white" : "black";
  return (
    <Flex
      maxWidth="90%"
      paddingTop={2}
      paddingBottom={2}
      paddingStart={3}
      paddingEnd={3}
      color={color}
      backgroundColor={bgColor}
      borderRadius="lg"
      wordBreak="break-all"
      alignSelf={role === "user" ? "end" : "start"}
    >
      {content === "" ? (
        <Stack>
          <Skeleton width="200px" height="4px" />
          <Skeleton width="200px" height="4px" />
          <Skeleton width="200px" height="4px" />
        </Stack>
      ) : (
        content
      )}
    </Flex>
  );
};
