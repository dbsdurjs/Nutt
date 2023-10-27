import { Heading } from "@chakra-ui/react";
import { FC } from "react";

interface ArticleHeadingProps {
  text: string;
}

const ArticleHeading: FC<ArticleHeadingProps> = ({ text }) => {
  return (
    <Heading as="h3" fontSize={18} fontWeight={400}>
      {text}
    </Heading>
  );
};

export default ArticleHeading;
