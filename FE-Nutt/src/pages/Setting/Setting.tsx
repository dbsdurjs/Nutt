import { ChevronRightIcon } from "@chakra-ui/icons";
import { Divider, Flex, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import NavigationBar from "../../components/NavigationBar";
import TemplateGrid from "../../layouts/TemplateGrid";

function SettingOption({ name, url }: { name: string; url: string }) {
  const navigate = useNavigate();

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      paddingTop={3}
      paddingBottom={3}
      paddingStart={6}
      paddingEnd={6}
      fontWeight="medium"
      onClick={() => navigate(url)}
    >
      <Text>{name}</Text>
      <ChevronRightIcon />
    </Flex>
  );
}

export default function Setting() {
  const navigate = useNavigate();

  const header = <Header onPrevClick={() => navigate("/")}>설정</Header>;

  const main = (
    <Stack
      borderColor="gray.100"
      borderWidth={1}
      paddingTop={2}
      paddingBottom={2}
      spacing={2}
      borderRadius="md"
    >
      <SettingOption name="계정" url="/setting/physical-information" />
      <Divider />
      <SettingOption name="신체 정보" url="/setting/physical-information" />
      <Divider />
      <SettingOption name="건강 목표" url="/setting/health-goal" />
    </Stack>
  );

  const footer = <NavigationBar />;

  return <TemplateGrid header={header} main={main} footer={footer} />;
}
