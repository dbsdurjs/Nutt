import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  useToast,
  InputGroup,
  Button,
  InputRightElement,
} from "@chakra-ui/react";
import Header from "../../components/Header";
import ChatBot from "../../components/ChatBot";
import NavigateButton from "../../components/NavigateButton";
import TemplateGrid from "../../layouts/TemplateGrid";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { JWTTokens } from "../../interfaces/JWT";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  const header = (
    <Header onPrevClick={() => navigate("/signup")}>로그인</Header>
  );

  const main = (
    <Stack spacing={6} w="full">
      <ChatBot message="이미 계정을 가지고 있나요? 이메일과 비밀번호로 로그인하세요." />
      <FormControl>
        <FormLabel>이메일</FormLabel>
        <Input
          type="email"
          placeholder="nutt@example.com"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>비밀번호</FormLabel>
        <InputGroup size="md">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호 입력"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleShowClick}>
              {showPassword ? "숨기기" : "보기"}
            </Button>
          </InputRightElement>
        </InputGroup>
        {/* <FormHelperText>
          비밀번호를 잊으셨나요?{" "}
          <Link
            href="/reset/password"
            color={"green.500"}
            fontWeight={"semibold"}
          >
            비밀번호 찾기
          </Link>
        </FormHelperText> */}
      </FormControl>
    </Stack>
  );

  const footer = (
    <NavigateButton
      onClick={async () => {
        const API_URL = process.env.REACT_APP_NUTT_API_URL;

        try {
          const response: AxiosResponse = await axios.post(
            `${API_URL}/api/login`,
            {
              email,
              password,
            }
          );
          const { data } = response.data;
          const { accessToken }: JWTTokens = data;
          localStorage.setItem("accessToken", accessToken);
          dispatch({ type: "SET_ACCESS_TOKEN", payload: accessToken });
          navigate("/");
        } catch (error) {
          const id = "login-failed-toast";
          if (!toast.isActive(id)) {
            toast({
              id,
              position: "top",
              title: "로그인 실패",
              description: "이메일 혹은 비밀번호를 다시 확인하세요.",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          }
        }
      }}
    >
      로그인
    </NavigateButton>
  );

  return <TemplateGrid header={header} main={main} footer={footer} />;
}
