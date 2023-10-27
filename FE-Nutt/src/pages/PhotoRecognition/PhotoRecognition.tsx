import { Stack } from "@chakra-ui/react";
import { FC } from "react";
import ChatBot from "../../components/ChatBot";
import FileInput from "./FileInput";
import Header from "../../components/Header";
import NavigationBar from "../../components/NavigationBar";
import TemplateGrid from "../../layouts/TemplateGrid";
import { useNavigate } from "react-router-dom";

const PhotoRecognition: FC = () => {
  const navigate = useNavigate();
  // Components
  const header = (
    <Header onPrevClick={() => navigate("/")}>사진 인식 모드</Header>
  );

  const main = (
    <Stack spacing={4} height="full">
      <ChatBot message="사진을 주시면 식단을 자동으로 분석해드릴게요!" />
      <FileInput />
    </Stack>
  );

  const footer = <NavigationBar />;

  return <TemplateGrid header={header} main={main} footer={footer} />;
};

export default PhotoRecognition;
