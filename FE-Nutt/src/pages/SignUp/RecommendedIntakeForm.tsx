import {
  FormLabel,
  FormControl,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  SimpleGrid,
} from "@chakra-ui/react";
import { FC } from "react";
import ChatBot from "../../components/ChatBot";
import Header from "../../components/Header";
import NavigateButton from "../../components/NavigateButton";
import TemplateGrid from "../../layouts/TemplateGrid";

type RecommendedIntakeFormProps = {
  dailyKcal: number;
  dailyCarbohydrate: number;
  dailyProtein: number;
  dailyFat: number;
  onDailyKcalChange: (stringValue: string, numberValue: number) => void;
  onDailyCarbohydrateChange: (stringValue: string, numberValue: number) => void;
  onDailyProteinChange: (stringValue: string, numberValue: number) => void;
  onDailyFatChange: (stringValue: string, numberValue: number) => void;
  onPrevClick: () => void;
  onNextClick: () => void;
};

const RecommendedIntakeForm: FC<RecommendedIntakeFormProps> = ({
  dailyKcal,
  dailyCarbohydrate,
  dailyProtein,
  dailyFat,
  onDailyKcalChange,
  onDailyCarbohydrateChange,
  onDailyProteinChange,
  onDailyFatChange,
  onPrevClick,
  onNextClick,
}) => {
  const header = <Header onPrevClick={onPrevClick}>권장 섭취량 설정</Header>;

  const main = (
    <Stack spacing={6} w="full">
      <ChatBot message="수집한 신체 정보, 건강 목표 및 활동량을 통해 최적의 에너지 섭취량과 영양소 섭취량을 계산했습니다. 계산된 섭취량을 조정하거나 '시작하기'를 누르세요." />
      <SimpleGrid columns={2} spacing={6}>
        <FormControl>
          <FormLabel>섭취 칼로리 (kcal)</FormLabel>
          <NumberInput
            value={dailyKcal}
            max={5000}
            min={100}
            step={100}
            onChange={onDailyKcalChange}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl>
          <FormLabel>탄수화물 (g)</FormLabel>
          <NumberInput
            value={dailyCarbohydrate}
            max={5000}
            min={100}
            step={10}
            onChange={onDailyCarbohydrateChange}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl>
          <FormLabel>단백질 (g)</FormLabel>
          <NumberInput
            value={dailyProtein}
            max={5000}
            min={100}
            step={10}
            onChange={onDailyProteinChange}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl>
          <FormLabel>지방 (g)</FormLabel>
          <NumberInput
            value={dailyFat}
            max={5000}
            min={100}
            step={10}
            onChange={onDailyFatChange}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </SimpleGrid>
    </Stack>
  );

  const footer = (
    <NavigateButton onClick={onNextClick}>시작하기</NavigateButton>
  );

  return <TemplateGrid header={header} main={main} footer={footer} />;
};

export default RecommendedIntakeForm;
