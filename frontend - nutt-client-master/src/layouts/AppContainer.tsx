import { Container, Flex } from "@chakra-ui/react";

export default function AppContainer(props: {
  children: React.ReactNode;
  backgroundImage?: string;
}) {
  const { children, backgroundImage } = props;
  return (
    <Container
      backgroundImage={backgroundImage || "none"}
      paddingLeft={0}
      paddingRight={0}
      h="full"
      overflow="hidden"
    >
      <Flex w="full" h="full" direction="column">
        {children}
      </Flex>
    </Container>
  );
}
