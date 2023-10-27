import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  RadioGroup,
  Radio,
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { FC } from "react";
import ChatBot from "../../components/ChatBot";
import Header from "../../components/Header";
import NavigateButton from "../../components/NavigateButton";
import TemplateGrid from "../../layouts/TemplateGrid";

type UserInfoFormProps = {
  name: string;
  age: number;
  gender: "MALE" | "FEMALE";
  height: number;
  weight: number;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAgeChange: (stringValue: string, numberValue: number) => void;
  onGenderChange: (value: "MALE" | "FEMALE") => void;
  onHeightChange: (stringValue: string, numberValue: number) => void;
  onWeightChange: (stringValue: string, numberValue: number) => void;
  onPrevClick: () => void;
  onNextClick: () => void;
};
const UserInfoForm: FC<UserInfoFormProps> = ({
  name,
  age,
  gender,
  height,
  weight,
  onNameChange,
  onAgeChange,
  onGenderChange,
  onHeightChange,
  onWeightChange,
  onPrevClick,
  onNextClick,
}) => {
  const header = <Header onPrevClick={onPrevClick}>기초 정보 입력</Header>;

  const main = (
    <Stack spacing={6}>
      <ChatBot message="이름, 나이, 성별 등의 신체 정보를 알려주세요." />
      <Stack spacing={6} w="full">
        <FormControl>
          <FormLabel>이름</FormLabel>
          <Input placeholder="홍길동" onChange={onNameChange} value={name} />
        </FormControl>
        <FormControl>
          <FormLabel>나이(세)</FormLabel>
          <NumberInput
            value={age}
            max={100}
            min={0}
            step={1}
            onChange={onAgeChange}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl>
          <FormLabel>성별</FormLabel>
          <RadioGroup value={gender} onChange={onGenderChange}>
            <Stack spacing={5} direction="row">
              <Radio colorScheme="green" value="MALE">
                남성
              </Radio>
              <Radio colorScheme="green" value="FEMALE">
                여성
              </Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
        <HStack>
          <FormControl>
            <FormLabel>키(cm)</FormLabel>
            <NumberInput
              value={height}
              precision={1}
              max={220}
              min={80}
              step={0.1}
              onChange={onHeightChange}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl>
            <FormLabel>몸무게(kg)</FormLabel>
            <NumberInput
              value={weight}
              precision={1}
              max={200}
              min={20}
              step={0.1}
              onChange={onWeightChange}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </HStack>
      </Stack>
    </Stack>
  );

  const footer = <NavigateButton onClick={onNextClick}>다음</NavigateButton>;

  return <TemplateGrid header={header} main={main} footer={footer} />;
};

export default UserInfoForm;
