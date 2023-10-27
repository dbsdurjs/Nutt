import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Stack,
} from "@chakra-ui/react";
import ChatBot from "../../components/ChatBot";
import {
  ScannedPicture,
  NutrientAnalysisTable,
} from "../../components/NutrientAnalysis";

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

function translator(name: string) {
  const names: any = {
    Mandu: "만두",
    KKennip: "깻잎",
    Jabgokbab: "잡곡밥",
    Jeyukbokum: "제육볶음",
    Gimchizzigae: "김치찌개",
    Samgyupsal: "삼겹살",
    Duinjangzzigae: "된장찌개",
    Gamjatang: "감자탕",
    Ramyun: "라면",
    Pizza: "피자",
    Yangnyumchicken: "양념치킨",
    Friedchicken: "후라이드치킨",
    BaechuKimchi: "배추김치",
    Kkakdugi: "깍두기",
    Bulgogi: "불고기",
    Godeungeogui: "고등어구이",
    Zzajangmyun: "짜장면",
    Zzambbong: "짬뽕",
    Friedegg: "계란후라이",
    Gyeranjjim: "계란찜",
  };

  if (names.hasOwnProperty(name)) {
    return names[name];
  } else {
    return name;
  }
}

type MealDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  meal: Meal | null;
};

function MealDrawer({ isOpen, onClose, meal }: MealDrawerProps) {
  if (!meal) return null;

  const { date, img, info } = meal;
  const [year, month, day] = date.split("-");
  const question = `오늘은 ${info.foods
    .map((food) => translator(food.name))
    .join(", ")}을 먹었어. 영양학적 측면에서 평가해줘.`;

  let mealTime = null;
  switch (info.mealTime) {
    case "BREAKFAST":
      mealTime = "아침";
      break;
    case "LUNCH":
      mealTime = "점심";
      break;
    case "DINNER":
      mealTime = "저녁";
      break;
    case "SNACK":
      mealTime = "간식";
      break;
  }

  return (
    <Drawer
      placement="right"
      onClose={onClose}
      isOpen={isOpen}
      size={["xs", "sm"]}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">
          {year}년 {month}월 {day}일 {mealTime}
        </DrawerHeader>
        <DrawerBody>
          <Stack spacing={6} w="full" paddingTop={4} paddingBottom={4}>
            <ChatBot question={question} />
            <ScannedPicture src={img} />

            <NutrientAnalysisTable foods={info.foods} />
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export default MealDrawer;
