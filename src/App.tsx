import { ChangeEvent, useState } from "react";
import { UnitSwitcher, ValueChanger } from "./components";
import { UnitType } from "./type";
import {
  ensureSingleDecimalPoint,
  ensureValidMinusSign,
  normalizeDecimalSeparator,
  parseNumericValue,
  removeInvalidCharacters,
} from "./helper";

const App = () => {
  const [unit, setUnit] = useState<UnitType>("%");
  const [value, setValue] = useState<number>(1.0);
  const [inputValue, setInputValue] = useState<string>("1.0");

  const handleUnitChange = (newUnit: UnitType): void => {
    setUnit(newUnit);

    if (newUnit === "%" && value > 100) {
      setValue(100);
      setInputValue("100");
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const rawInput = e.target.value;

    const processedInput = [
      normalizeDecimalSeparator,
      removeInvalidCharacters,
      ensureValidMinusSign,
      ensureSingleDecimalPoint,
    ].reduce((input, fn) => fn(input), rawInput);

    setInputValue(processedInput);
    setValue(parseNumericValue(processedInput));
  };

  const handleBlur = (): void => {
    let newValue = value;

    if (newValue < 0) {
      newValue = 0;
    }

    if (unit === "%" && newValue > 100) {
      newValue = 100;
    }

    setValue(newValue);
    setInputValue(String(newValue));
  };

  const increment = (): void => {
    const newValue = value + 1;
    if (unit === "%" && newValue > 100) return;
    setValue(newValue);
    setInputValue(String(newValue));
  };

  const decrement = (): void => {
    const newValue = value - 1;
    if (newValue < 0) return;
    setValue(newValue);
    setInputValue(String(newValue));
  };

  return (
    <div className="w-screen h-screen bg-neutral-950 flex items-center justify-center text-neutral-100">
      <div className="w-[280px] space-y-4 bg-neutral-800 p-4 rounded-lg">
        <UnitSwitcher currentUnit={unit} onUnitChange={handleUnitChange} />
        <ValueChanger
          value={value}
          inputValue={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onIncrement={increment}
          onDecrement={decrement}
          isPercentage={unit === "%"}
        />
      </div>
    </div>
  );
};

export default App;
