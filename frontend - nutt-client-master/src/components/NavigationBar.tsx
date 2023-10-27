import {
  HStack,
  LinkBox,
  VStack,
  Icon,
  Text,
  Button,
  keyframes,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import { FC } from "react";
import { IoMdChatbubbles } from "react-icons/io";
import { RiHomeFill } from "react-icons/ri";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { TbPhotoSensor2 } from "react-icons/tb";
import { Link as RouterLink, useLocation } from "react-router-dom";

type ShootModeOptionProps = {
  icon: FC;
  text: string;
  to: string;
  isDisabled?: boolean;
};

const ShootModeOption: FC<ShootModeOptionProps> = ({
  icon,
  text,
  to,
  isDisabled,
}) => {
  return (
    <LinkBox
      width="full"
      padding={4}
      display="flex"
      gap={3}
      alignItems="center"
      as={RouterLink}
      to={to}
      _hover={{ backgroundColor: "gray.100" }}
      _active={{ backgroundColor: "gray.200" }}
      justifyContent="center"
      fontWeight="medium"
      cursor={isDisabled ? "not-allowed" : "pointer"}
      // onClick={isDisabled ? (e) => e.preventDefault() : undefined}
    >
      <Icon
        as={icon}
        boxSize={6}
        color={isDisabled ? "gray.300" : "green.500"}
      />
      <Text display="inline" color={isDisabled ? "gray.300" : "black"}>
        {text}
      </Text>
    </LinkBox>
  );
};

const ShootModePopover: FC = () => {
  const breathe = keyframes`
        0% {
          box-shadow: 0 0 0 7px rgb(255, 212, 206);
        }
        50% {
          box-shadow: 0 0 0 5px rgb(255, 212, 206)
        }
        100% {
          box-shadow: 0 0 0 7px rgb(255, 212, 206);
        }
       `;
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          boxSize="32px"
          minWidth={0}
          borderRadius="full"
          bg="#ff9386"
          animation={`${breathe} 2s ease-in-out infinite`}
          _hover={{ background: "#ff9386" }}
          _active={{ background: "#f77a6a" }}
        />
      </PopoverTrigger>
      <PopoverContent width={200}>
        <PopoverArrow />
        <PopoverBody padding={0}>
          <VStack>
            <ShootModeOption
              icon={TbPhotoSensor2}
              text="실시간 인식 모드"
              to=""
              isDisabled
            />
            <ShootModeOption
              icon={MdOutlinePhotoCamera}
              text="사진 인식 모드"
              to="/photo-recognition"
            />
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

type NavItemProps = {
  icon: FC;
  text: string;
  to: string;
};

const NavItem: FC<NavItemProps> = ({ icon, text, to }) => {
  const location = useLocation();

  return (
    <LinkBox as={RouterLink} to={to}>
      <VStack color={location.pathname === to ? "black" : "gray.300"}>
        <Icon as={icon} boxSize="20px" />
        <Text fontSize="sm" fontWeight="semibold">
          {text}
        </Text>
      </VStack>
    </LinkBox>
  );
};

export default function NavigationBar() {
  const homeNav = <NavItem icon={RiHomeFill} text="홈" to="/" />;

  const chatNav = <NavItem icon={IoMdChatbubbles} text="채팅" to="/chat" />;

  return (
    <HStack
      justify="space-around"
      borderTop="1px"
      borderColor="gray.100"
      paddingTop={5}
      paddingStart={5}
      paddingEnd={5}
    >
      {homeNav}
      <ShootModePopover />
      {chatNav}
    </HStack>
  );
}
