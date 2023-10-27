import { ChevronLeftIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { FC } from "react";

type PreviousButtonProps = {
  onClick?: () => void;
};

const PreviousButton: FC<PreviousButtonProps> = ({ onClick }) => {
  if (!onClick) return null;
  return (
    <IconButton
      aria-label="Go to previous page."
      icon={<ChevronLeftIcon />}
      backgroundColor="transparent"
      onClick={onClick}
    />
  );
};

export default PreviousButton;
