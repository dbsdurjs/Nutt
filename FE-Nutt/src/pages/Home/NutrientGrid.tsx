import {
  Box,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { BiBowlRice } from "react-icons/bi";
import { BsFire } from "react-icons/bs";
import { GiJellyBeans } from "react-icons/gi";
import { IconType } from "react-icons/lib";
import { TbMeat } from "react-icons/tb";

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

type NutrientCardProps = {
  name: string;
  value: number;
  maxValue: number;
  unit: string;
  bgGradient?: string;
  color?: string;
  icon: IconType;
};

function NutrientCard(props: NutrientCardProps) {
  return (
    <Box
      w="full"
      // bgGradient={props.bgGradient}
      color="black"
      paddingTop={4}
      paddingBottom={4}
      paddingStart={4}
      paddingEnd={4}
      borderRadius="md"
      boxShadow="base"
    >
      <Stack spacing={3}>
        <HStack>
          <Icon as={props.icon} boxSize={5} color="green.500" />
          <Heading size="sm">{props.name}</Heading>
        </HStack>
        <Text as="span" fontWeight="semibold">
          {props.value}
          <Text as="span" fontWeight="normal">
            {`/${props.maxValue}${props.unit}`}
          </Text>
        </Text>
      </Stack>
    </Box>
  );
}

function NutrientGrid({ user }: { user: User }) {
  return (
    <SimpleGrid w="full" padding={1} columns={2} spacing={4}>
      <NutrientCard
        icon={BsFire}
        name="열량"
        value={Math.round(user.currentKcal)}
        maxValue={Math.round(user.targetKcal)}
        unit="kcal"
        bgGradient={"linear(to-r, green.400, green.500)"}
        color="white"
      />
      <NutrientCard
        icon={BiBowlRice}
        name="탄수화물"
        value={Math.round(user.currentCarbohydrate)}
        maxValue={Math.round(user.targetCarbohydrate)}
        unit="g"
      />
      <NutrientCard
        icon={GiJellyBeans}
        name="단백질"
        value={Math.round(user.currentProtein)}
        maxValue={Math.round(user.targetProtein)}
        unit="g"
      />
      <NutrientCard
        icon={TbMeat}
        name="지방"
        value={Math.round(user.currentFat)}
        maxValue={Math.round(user.targetFat)}
        unit="g"
      />
    </SimpleGrid>
  );
}

export default NutrientGrid;
