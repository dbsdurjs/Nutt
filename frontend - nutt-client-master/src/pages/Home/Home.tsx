import { Stack, useToast } from "@chakra-ui/react";
import ChatBot from "../../components/ChatBot";
import Header from "../../components/Header";
import TemplateGrid from "../../layouts/TemplateGrid";
import ArticleHeading from "../../components/ArticleHeading";
import NavigationBar from "../../components/NavigationBar";
import { useEffect, useState } from "react";
import Meal from "../../interfaces/Meal";
import NutrientGrid from "./NutrientGrid";
import Loading from "../../components/Loading";
import MealTabs from "./MealTabs";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface User {
  name: string;
  currentKcal: number;
  targetKcal: number;
  currentCarbohydrate: number;
  targetCarbohydrate: number;
  currentProtein: number;
  targetProtein: number;
  currentFat: number;
  targetFat: number;
}

export default function Home() {
  // States
  const [user, setUser] = useState<User>();
  const [kcal, setKcal] = useState<number>(0);
  const [carbohydrate, setCarbohydrate] = useState<number>(0);
  const [protein, setProtein] = useState<number>(0);
  const [fat, setFat] = useState<number>(0);
  const [targetKcal, setTargetKcal] = useState<number>(0);
  const [targetCarbohydrate, setTargetCarbohydrate] = useState<number>(0);
  const [targetProtein, setTargetProtein] = useState<number>(0);
  const [targetFat, setTargetFat] = useState<number>(0);
  const [breakfast, setBreakfast] = useState<Meal[]>();
  const [lunch, setLunch] = useState<Meal[]>();
  const [dinner, setDinner] = useState<Meal[]>();
  const [snack, setSnack] = useState<Meal[]>();

  const toast = useToast();
  const navigate = useNavigate();
  // Side-effects

  useEffect(() => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_NUTT_API_URL}/api/search/today-intake`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        const { data } = res.data;
        console.log(data);
        const {
          dailyCarbohydrate,
          dailyFat,
          dailyKcal,
          dailyProtein,
          intakeCarbohydrateSum,
          intakeFatSum,
          intakeKcalSum,
          intakeProteinSum,
          mealData,
        } = data;
        setKcal(intakeKcalSum);
        setCarbohydrate(intakeCarbohydrateSum);
        setProtein(intakeProteinSum);
        setFat(intakeFatSum);
        setTargetKcal(dailyKcal);
        setTargetCarbohydrate(dailyCarbohydrate);
        setTargetProtein(dailyProtein);
        setTargetFat(dailyFat);

        let breakfast: any = [];
        let lunch: any = [];
        let dinner: any = [];
        let snack: any = [];

        mealData &&
          mealData.forEach((meal: any) => {
            if (meal.mealTime === "BREAKFAST") breakfast.push(meal);
            else if (meal.mealTime === "LUNCH") lunch.push(meal);
            else if (meal.mealTime === "DINNER") dinner.push(meal);
            else if (meal.mealTime === "SNACK") snack.push(meal);
          });

        setBreakfast(breakfast);
        setLunch(lunch);
        setDinner(dinner);
        setSnack(snack);
        console.log(mealData);
      })
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          toast({
            title: "인증 토큰 만료",
            description: "다시 로그인 해주세요.",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
          localStorage.removeItem("accessToken");
          navigate("/signup");
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setUser({
      name: "",
      currentKcal: kcal,
      targetKcal: targetKcal,
      currentCarbohydrate: carbohydrate,
      targetCarbohydrate: targetCarbohydrate,
      currentProtein: protein,
      targetProtein: targetProtein,
      currentFat: fat,
      targetFat: targetFat,
    });
  }, [
    carbohydrate,
    fat,
    kcal,
    protein,
    targetCarbohydrate,
    targetFat,
    targetKcal,
    targetProtein,
  ]);
  // Pre-rendering
  if (!user) {
    return <Loading text="사용자 정보를 가져오는 중" />;
  }

  // Components
  const header = <Header isMoreMenuVisible>안녕하세요.</Header>;

  const main = (
    <Stack spacing={4}>
      <ChatBot question="건강한 식단을 위한 팁을 알려줘." />
      <ArticleHeading
        text={`${new Date().getFullYear()}년 ${
          new Date().getMonth() + 1
        }월 ${new Date().getDate()}일`}
      />
      <NutrientGrid user={user} />
      <MealTabs
        breakfast={breakfast}
        lunch={lunch}
        dinner={dinner}
        snack={snack}
      />
    </Stack>
  );

  const footer = <NavigationBar />;

  return <TemplateGrid header={header} main={main} footer={footer} />;
}
