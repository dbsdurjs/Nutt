import { RepeatClockIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { FC } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

type MoreMenuButtonProps = {
  isMoreMenuVisible?: boolean;
};

const MoreMenuButton: FC<MoreMenuButtonProps> = ({ isMoreMenuVisible }) => {
  const navigate = useNavigate();

  if (!isMoreMenuVisible) return null;

  return (
    <Menu autoSelect={false}>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<FiMoreVertical />}
        variant="ghost"
      />
      <MenuList minW="0" w={"160px"}>
        <MenuItem
          icon={<RepeatClockIcon />}
          onClick={() => navigate("/meal-record")}
        >
          식단 기록
        </MenuItem>
        {/* <MenuItem icon={<SettingsIcon />} onClick={() => navigate("/setting")}>
          설정
        </MenuItem> */}
        <MenuDivider />
        <MenuItem
          icon={<RiLogoutBoxLine />}
          onClick={() => {
            localStorage.removeItem("accessToken");
            navigate(0);
          }}
          color="red.500"
        >
          로그아웃
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
export default MoreMenuButton;
