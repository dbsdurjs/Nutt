import { VStack } from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";

export default function MainContentContainer(props: {
  children: React.ReactNode;
}) {
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  function handleScroll() {
    if (ref.current) {
      const element = ref.current;
      const atBottom =
        element.scrollHeight - element.scrollTop === element.clientHeight;
      setIsScrolledToBottom(atBottom);
    }
  }

  useEffect(() => {
    handleScroll();
  }, []);

  return (
    <VStack
      h="full"
      spacing={4}
      onScroll={handleScroll}
      overflowY="auto"
      borderBottomWidth={isScrolledToBottom ? "none" : "1px"}
      borderColor="rgba(0, 0, 0, 0.08)"
      ref={ref}
      paddingTop={4}
      paddingBottom={4}
      paddingLeft={4}
      paddingRight={4}
      alignItems="start"
    >
      {props.children}
    </VStack>
  );
}
