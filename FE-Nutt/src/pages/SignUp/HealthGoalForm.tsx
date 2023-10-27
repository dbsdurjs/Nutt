import {
  Stack,
  FormControl,
  FormLabel,
  VStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormHelperText,
} from "@chakra-ui/react";
import { FC } from "react";
import { CardButton } from "../../components/Button";
import ChatBot from "../../components/ChatBot";
import Header from "../../components/Header";
import NavigateButton from "../../components/NavigateButton";
import TemplateGrid from "../../layouts/TemplateGrid";

type HealthGoalFormProps = {
  target: "loss" | "maintenance" | "increase";
  weightGainRate: number;
  onTargetChange: (target: "loss" | "maintenance" | "increase") => void;
  onWeightGainRateChange: (stringValue: string, numberValue: number) => void;
  onPrevClick: () => void;
  onNextClick: () => void;
};

const HealthGoalForm: FC<HealthGoalFormProps> = ({
  target,
  weightGainRate,
  onTargetChange,
  onWeightGainRateChange,
  onPrevClick,
  onNextClick,
}) => {
  const header = <Header onPrevClick={onPrevClick}>건강 목표 설정</Header>;

  const main = (
    <Stack spacing={6} w="full">
      <ChatBot message="식단 관리 계획을 생성하기 위해 저에게 건강 목표를 알려주세요." />
      <FormControl>
        <FormLabel>건강 목표 선택</FormLabel>
        <VStack>
          <CardButton
            isActive={target === "loss"}
            heading="체중 감량"
            description="지방 감량으로 건강한 몸무게 유지"
            onClick={() => {
              onTargetChange("loss");
              onWeightGainRateChange("0.1", 0.1);
            }}
          />
          <CardButton
            isActive={target === "maintenance"}
            heading="체중 유지"
            description="균형 잡힌 식습관과 운동 유지로 몸무게 유지"
            onClick={() => {
              onTargetChange("maintenance");
              onWeightGainRateChange("0", 0);
            }}
          />
          <CardButton
            isActive={target === "increase"}
            heading="근육량 증가"
            description="근육량을 늘려 몸의 형태와 기능을 개선하며 대사 속도를 높임"
            onClick={() => {
              onTargetChange("increase");
              onWeightGainRateChange("0.1", 0.1);
            }}
          />
        </VStack>
      </FormControl>
      {target === "maintenance" ? null : (
        <FormControl>
          <FormLabel>
            {target === "loss"
              ? "주간 체중 감소량(kg)"
              : "주간 체중 증가량(kg)"}
          </FormLabel>
          <NumberInput
            value={weightGainRate}
            precision={1}
            max={20}
            min={0.1}
            step={0.1}
            onChange={onWeightGainRateChange}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormHelperText>
            주 단위로 {target === "loss" ? "감량" : "증량"}할 체중을 설정하세요
          </FormHelperText>
        </FormControl>
      )}
    </Stack>
  );

  const footer = <NavigateButton onClick={onNextClick}>다음</NavigateButton>;

  return <TemplateGrid header={header} main={main} footer={footer} />;
};

export default HealthGoalForm;
