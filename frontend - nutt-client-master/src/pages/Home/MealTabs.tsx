import { TimeIcon } from "@chakra-ui/icons";
import {
  TabPanel,
  Card,
  CardBody,
  Center,
  HStack,
  Stack,
  Badge,
  Heading,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  Text,
  Image,
} from "@chakra-ui/react";
import Meal from "../../interfaces/Meal";

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

function MealTab({ meals }: { meals?: Meal[] }) {
  if (meals?.length === 0 || meals === undefined) {
    return (
      <TabPanel paddingLeft={0} paddingRight={0}>
        <Card variant="outline">
          <CardBody>
            <Center gap={4} color="gray.400">
              <TimeIcon />
              <Text>기록된 식사가 없습니다</Text>
            </Center>
          </CardBody>
        </Card>
      </TabPanel>
    );
  }
  return (
    <TabPanel paddingLeft={0} paddingRight={0}>
      {meals.map((meal, index) => (
        <Card key={index} variant="outline" marginBottom={2} overflow="hidden">
          <CardBody p={0}>
            <HStack spacing={7}>
              <Image
                src={meal.img || "https://via.placeholder.com/150"}
                alt="Food"
                width="50%"
                height={["120px", "150px"]}
                objectFit="cover"
              />
              <Stack spacing={4}>
                <HStack>
                  {meal.foods.map((food, index) => {
                    if (index > 1) return null;
                    return (
                      <Badge key={index} fontSize={["xs", "sm"]}>
                        #{translator(food.name)}
                      </Badge>
                    );
                  })}
                </HStack>
                <Stack
                  direction={["column", "row"]}
                  spacing={[2, 3]}
                  align={["start", "center"]}
                >
                  <Heading fontSize={"md"}>섭취 칼로리</Heading>
                  <Text fontSize={"md"}>
                    {meal.foods.reduce(
                      (accumulator, currentValue) =>
                        accumulator + currentValue.kcal,
                      0
                    )}
                    kcal
                  </Text>
                </Stack>
              </Stack>
            </HStack>
          </CardBody>
        </Card>
      ))}
    </TabPanel>
  );
}

function MealTabs({
  breakfast,
  lunch,
  dinner,
  snack,
}: {
  breakfast?: Meal[];
  lunch?: Meal[];
  dinner?: Meal[];
  snack?: Meal[];
}) {
  return (
    <Tabs variant="soft-rounded" colorScheme="green" size="sm">
      <TabList>
        <Tab>아침</Tab>
        <Tab>점심</Tab>
        <Tab>저녁</Tab>
        <Tab>간식</Tab>
      </TabList>
      <TabPanels>
        <MealTab meals={breakfast} />
        <MealTab meals={lunch} />
        <MealTab meals={dinner} />
        <MealTab meals={snack} />
      </TabPanels>
    </Tabs>
  );
}

export default MealTabs;
