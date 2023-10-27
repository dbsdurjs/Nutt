import {
  SimpleGrid,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

function DateForm({
  month,
  year,
  onMonthChange,
  onYearChange,
}: {
  month: number;
  year: number;
  onMonthChange: (str: string, num: number) => void;
  onYearChange: (str: string, num: number) => void;
}) {
  return (
    <SimpleGrid as="form" columns={2} spacing={6}>
      <FormControl>
        <FormLabel>년</FormLabel>
        <NumberInput
          min={2023}
          value={year}
          max={new Date().getFullYear()}
          allowMouseWheel
          onChange={onYearChange}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
      <FormControl>
        <FormLabel>월</FormLabel>
        <NumberInput
          min={1}
          max={new Date().getMonth() + 1}
          value={month}
          allowMouseWheel
          onChange={onMonthChange}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
    </SimpleGrid>
  );
}

export default DateForm;
