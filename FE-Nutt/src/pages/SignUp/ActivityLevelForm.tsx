import { Stack, FormControl, FormLabel, VStack } from "@chakra-ui/react";
import { FC } from "react";
import { CardButton } from "../../components/Button";
import ChatBot from "../../components/ChatBot";
import Header from "../../components/Header";
import NavigateButton from "../../components/NavigateButton";
import TemplateGrid from "../../layouts/TemplateGrid";

type ActivityLevelFormProps = {
  pal: 1.2 | 1.375 | 1.55 | 1.725;
  onPalChange: (pal: 1.2 | 1.375 | 1.55 | 1.725) => void;
  onPrevClick: () => void;
  onNextClick: () => void;
};

const ActivityLevelForm: FC<ActivityLevelFormProps> = ({
  pal,
  onPalChange,
  onPrevClick,
  onNextClick,
}) => {
  const header = <Header onPrevClick={onPrevClick}>활동 대사량 추정</Header>;

  const main = (
    <Stack spacing={6} w="full">
      <ChatBot message="식단 관리 계획을 생성하기 위해 일상생활 활동량 지수(Physical Activity Level, PAL)을 계산합니다. 활동량 수준을 알려주세요." />
      <FormControl>
        <FormLabel>활동량 선택</FormLabel>
        <VStack>
          <CardButton
            isActive={pal === 1.2 ? true : false}
            heading="생활 활동량"
            description="일상적인 활동만을 수행하는 경우 (예: 사무실 일, 가사일, 걷기 등)"
            onClick={() => onPalChange(1.2)}
          />
          <CardButton
            isActive={pal === 1.375 ? true : false}
            heading="조금 활동적인 활동량"
            description="약간의 운동이 포함된 경우 (예: 산책, 조깅, 가벼운 유산소 운동 등)"
            onClick={() => onPalChange(1.375)}
          />
          <CardButton
            isActive={pal === 1.55 ? true : false}
            heading="활발한 활동량"
            description="강도가 높은 운동을 수행하는 경우 (예: 중량 트레이닝, 러닝, 수영 등)"
            onClick={() => onPalChange(1.55)}
          />
          <CardButton
            isActive={pal === 1.725 ? true : false}
            heading="매우 활발한 활동량"
            description="매우 높은 강도의 운동을 수행하는 경우 (예: 경쟁적인 스포츠, 하이인텐시티 트레이닝 등)"
            onClick={() => onPalChange(1.725)}
          />
        </VStack>
      </FormControl>
    </Stack>
  );

  const footer = <NavigateButton onClick={onNextClick}>다음</NavigateButton>;

  return <TemplateGrid header={header} main={main} footer={footer} />;
};

export default ActivityLevelForm;
