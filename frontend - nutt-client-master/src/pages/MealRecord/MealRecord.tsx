import {
  Button,
  Stack,
  Text,
  useDisclosure,
  Center,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { MouseEventHandler, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search2Icon } from "@chakra-ui/icons";
import Header from "../../components/Header";
import TemplateGrid from "../../layouts/TemplateGrid";

import axios from "axios";
import DateForm from "./DateForm";
import MealDrawer from "./MealDrawer";
import MealGallery from "./MealGallery";

interface Food {
  name: string;
  kcal: number;
  carbohydrate: number;
  protein: number;
  fat: number;
}

interface Meal {
  date: string;
  time: string;
  img: string;
  info: {
    mealTime: "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK";
    foods: Food[];
  };
}

interface Meals {
  date: string;
  mealData: Meal[];
}

function Loading() {
  return (
    <Center boxSize="full">
      <VStack spacing={8}>
        <Spinner size="xl" />
        <Text>식단 기록을 가져오는 중</Text>
      </VStack>
    </Center>
  );
}

function LookupButton({
  onClick,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <Button
      w="full"
      size="lg"
      fontWeight="medium"
      bgColor="green.500"
      color="white"
      leftIcon={<Search2Icon boxSize={4} />}
      _hover={{
        bgColor: "green.500",
      }}
      _active={{
        bgColor: "green.600",
      }}
      onClick={onClick}
    >
      조회
    </Button>
  );
}

export default function MealRecord() {
  // Hooks
  const navigation = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // States
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [meals, setMeals] = useState<Meals | null>(null);
  const [meal, setMeal] = useState<Meal | null>(null);

  // Side-effects
  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_NUTT_API_URL}/api/search/date/${year}/${month}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => {
      const { data } = res.data;
      setMeals(data);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Pre-rendering
  if (meals === null) {
    return <Loading />;
  }

  // Components
  const header = <Header onPrevClick={() => navigation("/")}>식단 기록</Header>;

  const main = (
    <>
      <Stack spacing={4}>
        <DateForm
          year={year}
          month={month}
          onYearChange={(_str: string, num: number) => setYear(num)}
          onMonthChange={(_str: string, num: number) => setMonth(num)}
        />
        <MealGallery
          meals={meals}
          onImageClick={(meal: Meal) => {
            setMeal(meal);
            onOpen();
          }}
        />
      </Stack>
      <MealDrawer isOpen={isOpen} onClose={onClose} meal={meal} />
    </>
  );

  const footer = (
    <LookupButton
      onClick={() => {
        axios({
          method: "get",
          url: `${process.env.REACT_APP_NUTT_API_URL}/api/search/date/${year}/${month}`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }).then((res) => setMeals(res.data.data));
      }}
    />
  );

  return <TemplateGrid header={header} main={main} footer={footer} />;
}
