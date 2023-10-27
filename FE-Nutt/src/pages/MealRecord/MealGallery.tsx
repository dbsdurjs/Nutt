import { TimeIcon } from "@chakra-ui/icons";
import {
  Flex,
  Badge,
  Image,
  Card,
  CardBody,
  Center,
  Text,
  Grid,
  AspectRatio,
} from "@chakra-ui/react";
import { nanoid } from "nanoid";

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

function MealGallery({
  meals,
  onImageClick,
}: {
  meals: Meals;
  onImageClick: (meal: Meal) => void;
}) {
  if (!meals.mealData) {
    return (
      <Card variant="outline">
        <CardBody>
          <Center gap={4} color="gray.400">
            <TimeIcon />
            <Text>기록된 식사가 없습니다</Text>
          </Center>
        </CardBody>
      </Card>
    );
  }

  return (
    <Grid templateColumns="repeat(3, 1fr)" gridAutoRows="1fr">
      {meals.mealData.map((meal) => {
        let mealTime = null;
        switch (meal.info.mealTime) {
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

        const date = new Date(meal.date);

        return (
          <Flex key={nanoid()}>
            <AspectRatio ratio={1} boxSize="full">
              <Image
                objectFit="cover"
                boxSize="full"
                src={meal.img}
                cursor="pointer"
                fallbackSrc="https://via.placeholder.com/150"
                onClick={() => onImageClick(meal)}
              />
            </AspectRatio>
            <Badge position="absolute">
              {date.getDate()}일 {mealTime}
            </Badge>
          </Flex>
        );
      })}
    </Grid>
  );
}

export default MealGallery;
