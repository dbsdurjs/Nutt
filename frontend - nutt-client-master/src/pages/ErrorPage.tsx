import { Center, Heading, Text, VStack } from "@chakra-ui/react";
import { useNavigate, useRouteError } from "react-router-dom";
import Header from "../components/Header";
import NavigateButton from "../components/NavigateButton";
import TemplateGrid from "../layouts/TemplateGrid";

interface RouteError {
  data: string;
  error: {
    message: string;
    stack: string;
  };
  internal: boolean;
  status: number;
  statusText: string;
}

function isRouteError(error: any): error is RouteError {
  return (error as RouteError).data !== undefined;
}

export default function ErrorPage() {
  const navigate = useNavigate();

  const error = useRouteError();
  console.error(error);

  const header = <Header>오류 발생</Header>;

  const main = (
    <Center boxSize={"full"}>
      <VStack spacing={10}>
        <Heading>Oops!</Heading>
        <Text>예기치 않은 오류가 발생했습니다.</Text>
        <Text fontStyle={"italic"} color={"gray.400"}>
          {isRouteError(error) && (error.statusText || error.error.message)}
        </Text>
      </VStack>
    </Center>
  );

  const footer = (
    <NavigateButton onClick={() => navigate("/")}>메인 페이지로</NavigateButton>
  );
  return <TemplateGrid header={header} main={main} footer={footer} />;
}
