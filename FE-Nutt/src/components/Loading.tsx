import { Center, VStack, Spinner, Text } from "@chakra-ui/react";

function Loading({ text }: { text: string }) {
  return (
    <Center boxSize="full">
      <VStack spacing={8}>
        <Spinner size="xl" />
        <Text>{text}</Text>
      </VStack>
    </Center>
  );
}

export default Loading;
