import {
  Text,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Stack,
  FormErrorMessage,
  HStack,
  InputRightElement,
  Button,
  InputGroup,
} from "@chakra-ui/react";
import Header from "../../components/Header";
import ChatBot from "../../components/ChatBot";
import TemplateGrid from "../../layouts/TemplateGrid";
import NavigateButton from "../../components/NavigateButton";
import { useNavigate } from "react-router-dom";
import { FC, useState } from "react";

type SignUpProps = {
  email: string;
  password: string;
  isEmailValid: boolean;
  isPasswordValid: boolean;
  onPrevClick: () => void;
  onNextClick: () => void;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SignUp: FC<SignUpProps> = ({
  email,
  password,
  isEmailValid,
  isPasswordValid,
  onPrevClick,
  onNextClick,
  onEmailChange,
  onPasswordChange,
}) => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);

  const header = <Header onPrevClick={onPrevClick}>회원가입</Header>;

  const main = (
    <Stack spacing={6}>
      <ChatBot message="반갑습니다! 저는 AI 식단 관리 도우미 ‘뉴트(Nutt)입니다. 앱의 모든 기능을 사용하기 위해 회원가입을 진행해주세요." />
      <FormControl isInvalid={email === "" ? false : !isEmailValid}>
        <FormLabel>이메일</FormLabel>
        <Input
          type="email"
          placeholder="nutt@example.com"
          value={email}
          onChange={onEmailChange}
        />
        {email === "" ? (
          <FormHelperText>이메일을 입력하세요</FormHelperText>
        ) : isEmailValid ? (
          <FormHelperText>유효한 이메일입니다</FormHelperText>
        ) : (
          <FormErrorMessage>
            유효한 이메일 주소인지 확인해주세요
          </FormErrorMessage>
        )}
      </FormControl>
      <FormControl>
        <FormLabel>비밀번호</FormLabel>
        <InputGroup size="md">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="8~20자의 영문+숫자+특수문자(!, @, #)"
            value={password}
            onChange={onPasswordChange}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleShowClick}>
              {showPassword ? "숨기기" : "보기"}
            </Button>
          </InputRightElement>
        </InputGroup>
        {password === "" ? (
          <FormHelperText>비밀번호를 입력해주세요</FormHelperText>
        ) : (
          <FormHelperText>
            {isPasswordValid ? (
              <Text color="green.500">사용 가능한 비밀번호입니다</Text>
            ) : (
              <Text color="red.500">
                8~20자의 영문+숫자+특수문자(!, @, #)를 사용해주세요
              </Text>
            )}
          </FormHelperText>
        )}
      </FormControl>
    </Stack>
  );

  const footer = (
    <HStack boxSize="full">
      <NavigateButton onClick={() => navigate("/login")} variant="outline">
        로그인
      </NavigateButton>
      <NavigateButton onClick={onNextClick}>회원가입</NavigateButton>
    </HStack>
  );

  return <TemplateGrid header={header} main={main} footer={footer} />;
};

export default SignUp;
