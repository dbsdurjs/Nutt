import { Heading, Text, Flex, VStack } from "@chakra-ui/react";

export function CardButton(props: {
  heading: string;
  description: string;
  src?: string;
  isActive?: boolean;
  onClick: () => void;
}) {
  return (
    <Flex
      as="button"
      direction="row"
      w="full"
      border="1px"
      borderColor={props.isActive ? "green.500" : "gray.200"}
      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
      bgColor={props.isActive ? "gray.50" : "transparent"}
      p={3}
      alignItems="center"
      borderRadius={8}
      gap={3}
      _hover={{
        bgColor: "gray.50",
      }}
      _active={{
        bgColor: "gray.100",
      }}
      onClick={() => props.onClick()}
    >
      <VStack alignItems="flex-start" textAlign="start">
        <Heading fontSize="sm">{props.heading}</Heading>
        <Text fontSize="xs">{props.description}</Text>
      </VStack>
    </Flex>
  );
}
