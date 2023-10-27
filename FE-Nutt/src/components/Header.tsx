import { Flex, HStack, Heading } from "@chakra-ui/react";
import PreviousButton from "./PreviousButton";
import MoreMenuButton from "./MoreMenuButton";
import { FC } from "react";

type HeaderProps = {
  onPrevClick?: () => void;
  isMoreMenuVisible?: boolean;
  children: React.ReactNode;
  color?: string;
};

const Header: FC<HeaderProps> = ({
  isMoreMenuVisible,
  children,
  onPrevClick,
  color,
}) => {
  return (
    <Flex boxSize="full" align="center" justify="space-between" color={color}>
      <HStack>
        <PreviousButton onClick={onPrevClick} />
        <Heading size="md">{children}</Heading>
      </HStack>
      <MoreMenuButton isMoreMenuVisible={isMoreMenuVisible} />
    </Flex>
  );
};

export default Header;
