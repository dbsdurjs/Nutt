import {
  Stack,
  Flex,
  Progress,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  TableContainer,
  Table,
  Image,
  Box,
  Text,
  AspectRatio,
} from "@chakra-ui/react";
import { nanoid } from "nanoid";
import FoodNutrient from "../interfaces/Food";
import ArticleHeading from "./ArticleHeading";

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

type ScannedPictureProps = {
  src: string;
};

type NutrientProgressBarProps = {
  name: string;
  current: number;
  target: number;
};

type NutrientAnalysisTableProps = {
  foods: FoodNutrient[];
};

export function ScannedPicture({ src }: ScannedPictureProps) {
  return (
    <Stack spacing={3}>
      <ArticleHeading text="식단 사진" />
      <Box border="1px" borderColor="gray.100" borderRadius="lg" padding={2}>
        <AspectRatio ratio={16 / 9}>
          <Image
            src={src}
            borderRadius="lg"
            fallbackSrc="https://via.placeholder.com/150"
          />
        </AspectRatio>
      </Box>
    </Stack>
  );
}

export function NutrientProgressBar({
  name,
  current,
  target,
}: NutrientProgressBarProps) {
  return (
    <Stack>
      <Flex justify="space-between">
        <Text fontSize="sm">{name}</Text>
        <Text fontSize="sm" color="gray.400">
          {current}/{target}kcal
        </Text>
      </Flex>
      <Progress
        colorScheme="green"
        size="xs"
        value={Math.floor((current / target) * 100)}
      />
    </Stack>
  );
}

type TargetAchievementProps = {
  currentKcal: number;
  targetKcal: number;
  currentCarbohydrate: number;
  targetCarbohydrate: number;
  currentProtein: number;
  targetProtein: number;
  currentFat: number;
  targetFat: number;
};

export function TargetAchievement({
  currentKcal,
  targetKcal,
  currentCarbohydrate,
  targetCarbohydrate,
  currentProtein,
  targetProtein,
  currentFat,
  targetFat,
}: TargetAchievementProps) {
  return (
    <Stack spacing={3}>
      <ArticleHeading text="목표 영양소 달성 예상치" />
      <Stack
        spacing={3}
        border="1px"
        borderColor="gray.200"
        borderRadius={8}
        padding={4}
      >
        <NutrientProgressBar
          name="칼로리"
          current={Math.round(currentKcal)}
          target={Math.round(targetKcal)}
        />
        <NutrientProgressBar
          name="탄수화물"
          current={Math.round(currentCarbohydrate)}
          target={Math.round(targetCarbohydrate)}
        />
        <NutrientProgressBar
          name="단백질"
          current={Math.round(currentProtein)}
          target={Math.round(targetProtein)}
        />
        <NutrientProgressBar
          name="지방"
          current={Math.round(currentFat)}
          target={Math.round(targetFat)}
        />
      </Stack>
    </Stack>
  );
}

export function NutrientAnalysisTable({ foods }: NutrientAnalysisTableProps) {
  let sum = {
    kcal: 0,
    carbohydrate: 0,
    protein: 0,
    fat: 0,
  };

  const thead = (
    <Thead>
      <Tr>
        <Th>이름</Th>
        <Th isNumeric>열량</Th>
        <Th isNumeric>탄수화물</Th>
        <Th isNumeric>단백질</Th>
        <Th isNumeric>지방</Th>
      </Tr>
    </Thead>
  );

  const tbody = (
    <Tbody>
      {foods.map((food) => {
        sum.kcal += food.kcal;
        sum.carbohydrate += food.carbohydrate;
        sum.protein += food.protein;
        sum.fat += food.fat;
        return (
          <Tr key={nanoid()}>
            <Td>{translator(food.name)}</Td>
            <Td isNumeric>{Math.round(food.kcal)}</Td>
            <Td isNumeric>{Math.round(food.carbohydrate)}</Td>
            <Td isNumeric>{Math.round(food.protein)}</Td>
            <Td isNumeric>{Math.round(food.fat)}</Td>
          </Tr>
        );
      })}
    </Tbody>
  );

  const tfoot = (
    <Tfoot>
      <Tr>
        <Th>합계</Th>
        <Th isNumeric>{Math.round(sum.kcal)}</Th>
        <Th isNumeric>{Math.round(sum.carbohydrate)}</Th>
        <Th isNumeric>{Math.round(sum.protein)}</Th>
        <Th isNumeric>{Math.round(sum.fat)}</Th>
      </Tr>
    </Tfoot>
  );

  return (
    <Stack spacing={3}>
      <ArticleHeading text="영양 성분 분석" />
      <TableContainer
        border="1px"
        borderColor="gray.200"
        borderRadius={8}
        padding={2}
      >
        <Table variant="simple" size="sm">
          {thead}
          {tbody}
          {tfoot}
        </Table>
      </TableContainer>
      <Text fontSize="xs" color="gray.500" paddingStart={1}>
        단위: 열량(kcal), 탄수화물(g), 단백질(g), 지방(g)
      </Text>
    </Stack>
  );
}
