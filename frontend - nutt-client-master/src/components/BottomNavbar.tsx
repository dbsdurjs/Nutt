import { Center } from "@chakra-ui/react";

export default function BottomNavbar(props: { children: React.ReactNode }) {
  return (
    <Center w="full" pl={4} pr={4} pt={4} pb={8} gap={3}>
      {props.children}
    </Center>
  );
}
