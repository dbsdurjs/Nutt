import { useToast } from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { JWTTokens } from "../../interfaces/JWT";
import AccountForm from "./AccountForm";
import ActivityLevelForm from "./ActivityLevelForm";
import BasicInfoForm from "./BasicInfoForm";
import HealthGoalForm from "./HealthGoalForm";
import RecommendedIntakeForm from "./RecommendedIntakeForm";

const API_URL = process.env.REACT_APP_NUTT_API_URL;

export default function SignUp() {
  // Hooks
  const navigate = useNavigate();
  const toast = useToast();

  // States
  const [stage, setStage] = useState<
    | "회원가입"
    | "기초정보수집"
    | "건강목표설정"
    | "활동량추정"
    | "권장섭취량계산"
  >("회원가입");
  const [email, setEmail] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number>(20);
  const [gender, setGender] = useState<"MALE" | "FEMALE">("MALE");
  const [height, setHeight] = useState<number>(160);
  const [weight, setWeight] = useState<number>(60);
  const [target, setTarget] = useState<"loss" | "maintenance" | "increase">(
    "maintenance"
  );
  const [weightGainRate, setWeightGainRate] = useState<number>(1.2);
  const [pal, setPal] = useState<1.2 | 1.375 | 1.55 | 1.725>(1.2);
  const [dailyKcal, setDailyKcal] = useState<number>(0);
  const [dailyCarbohydrate, setDailyCarbohydrate] = useState<number>(0);
  const [dailyProtein, setDailyProtein] = useState<number>(0);
  const [dailyFat, setDailyFat] = useState<number>(0);

  // 이벤트 리스너
  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputEmail = e.target.value;
    const pattern = /^[a-zA-Z0-9+-\\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    setEmail(inputEmail);
    setIsEmailValid(pattern.test(inputEmail));
  };
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwd = e.target.value;
    const pattern = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#]).{8,20}$/;
    setPassword(pwd);
    setIsPasswordValid(pattern.test(pwd));
  };
  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const onAgeChange = (stringValue: string, numberValue: number) =>
    setAge(numberValue);
  const onGenderChange = (value: "MALE" | "FEMALE") => setGender(value);
  const onHeightChange = (stringValue: string, numberValue: number) =>
    setHeight(numberValue);
  const onWeightChange = (stringValue: string, numberValue: number) =>
    setWeight(numberValue);
  const onTargetChange = (target: "loss" | "maintenance" | "increase") =>
    setTarget(target);
  const onWeightGainRateChange = (stringValue: string, numberValue: number) =>
    setWeightGainRate(numberValue);
  const onPalChange = (pal: 1.2 | 1.375 | 1.55 | 1.725) => setPal(pal);
  const onDailyKcalChange = (stringValue: string, numberValue: number) =>
    setDailyKcal(numberValue);
  const onDailyCarbohydrateChange = (
    stringValue: string,
    numberValue: number
  ) => setDailyCarbohydrate(numberValue);
  const onDailyProteinChange = (stringValue: string, numberValue: number) =>
    setDailyProtein(numberValue);
  const onDailyFatChange = (stringValue: string, numberValue: number) =>
    setDailyFat(numberValue);

  console.log("회원가입 정보: ", {
    password,
    email,
    name,
    gender,
    age,
    height,
    weight,
    target,
    weightGainRate,
    pal,
    dailyKcal,
    dailyCarbohydrate,
    dailyProtein,
    dailyFat,
  });

  switch (stage) {
    case "회원가입":
      return (
        <AccountForm
          email={email}
          password={password}
          isEmailValid={isEmailValid}
          isPasswordValid={isPasswordValid}
          onEmailChange={onEmailChange}
          onPasswordChange={onPasswordChange}
          onPrevClick={() => navigate("/")}
          onNextClick={() => {
            if (!isEmailValid || !isPasswordValid) {
              const id = "basic-info-warning-toast";
              if (!toast.isActive(id)) {
                toast({
                  id,
                  position: "top",
                  title: "회원가입 오류",
                  description: "이메일 또는 비밀번호를 확인해주세요.",
                  status: "warning",
                  duration: 3000,
                  isClosable: true,
                });
                return;
              }
            }
            axios
              .post(`${API_URL}/api/email-check`, {
                email,
              })
              .then((res) => {
                console.log(res);
                if (res.data.message === "DATA_SUCCESSFULLY_PROCESSED") {
                  setStage("기초정보수집");
                }
              })
              .catch((err) => {
                const id = "email-duplicate-error-toast";
                const { errorMessage, description } = err.response.data;
                if (!toast.isActive(id)) {
                  toast({
                    id,
                    position: "top",
                    title: errorMessage,
                    description: description,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                  });
                }
              });
          }}
        />
      );
    case "기초정보수집":
      return (
        <BasicInfoForm
          name={name}
          age={age}
          gender={gender}
          height={height}
          weight={weight}
          onNameChange={onNameChange}
          onAgeChange={onAgeChange}
          onGenderChange={onGenderChange}
          onHeightChange={onHeightChange}
          onWeightChange={onWeightChange}
          onPrevClick={() => setStage("회원가입")}
          onNextClick={() => {
            if (!(name === "")) {
              setStage("건강목표설정");
            } else {
              const id = "health-goal-warning-toast";
              if (!toast.isActive(id)) {
                toast({
                  id,
                  position: "top",
                  title: "회원가입 오류",
                  description: "이름을 확인해주세요.",
                  status: "warning",
                  duration: 3000,
                  isClosable: true,
                });
              }
            }
          }}
        />
      );
    case "건강목표설정":
      return (
        <HealthGoalForm
          target={target}
          weightGainRate={weightGainRate}
          onTargetChange={onTargetChange}
          onWeightGainRateChange={onWeightGainRateChange}
          onPrevClick={() => setStage("기초정보수집")}
          onNextClick={() => setStage("활동량추정")}
        />
      );
    case "활동량추정":
      return (
        <ActivityLevelForm
          pal={pal}
          onPalChange={onPalChange}
          onPrevClick={() => setStage("건강목표설정")}
          onNextClick={() => {
            const user = {
              age,
              gender,
              height,
              weight,
              pal,
              weightGainRate,
              target,
            };
            axios
              .post(`${API_URL}/api/set/achieve`, user)
              .then((res) => {
                const { dailyCarbohydrate, dailyFat, dailyKcal, dailyProtein } =
                  res.data.data;
                console.log(res.data);
                setDailyCarbohydrate(parseInt(dailyCarbohydrate));
                setDailyFat(parseInt(dailyFat));
                setDailyKcal(parseInt(dailyKcal));
                setDailyProtein(parseInt(dailyProtein));
                setStage("권장섭취량계산");
                return;
              })
              .catch((err) => {
                console.error(err);
                return;
              });
          }}
        />
      );
    case "권장섭취량계산":
      return (
        <RecommendedIntakeForm
          dailyKcal={dailyKcal}
          dailyCarbohydrate={dailyCarbohydrate}
          dailyProtein={dailyProtein}
          dailyFat={dailyFat}
          onDailyKcalChange={onDailyKcalChange}
          onDailyCarbohydrateChange={onDailyCarbohydrateChange}
          onDailyProteinChange={onDailyProteinChange}
          onDailyFatChange={onDailyFatChange}
          onPrevClick={() => setStage("활동량추정")}
          onNextClick={async () => {
            const userProfile = {
              password,
              email,
              name,
              gender,
              age,
              height,
              weight,
              dailyKcal,
              dailyCarbohydrate,
              dailyProtein,
              dailyFat,
            };
            try {
              // 회원가입 요청
              await axios.post(`${API_URL}/api/signUp`, userProfile);

              // 회원가입 성공 시 즉시 로그인
              const loginResponse: AxiosResponse = await axios.post(
                `${API_URL}/api/login`,
                {
                  email,
                  password,
                }
              );
              console.log(loginResponse.data);
              const { accessToken }: JWTTokens = loginResponse.data.data;
              localStorage.setItem("accessToken", accessToken);
              navigate("/");
            } catch (error) {
              const toastId = "signup-error-toast";
              if (!toast.isActive(toastId)) {
                toast({
                  id: toastId,
                  position: "top",
                  title: "회원가입 실패",
                  description: "회원가입에 실패했습니다. 다시 시도해주세요.",
                  status: "error",
                  duration: 3000,
                  isClosable: true,
                });
              }
            }
          }}
        />
      );
  }
}
