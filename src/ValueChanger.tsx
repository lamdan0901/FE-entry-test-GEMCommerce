import { ChangeEvent } from "react";
import { MinusIcon, PlusIcon } from "./icons";

interface ValueChangerProps {
  value: number;
  inputValue: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
  isPercentage: boolean;
}

export const ValueChanger = ({
  value,
  inputValue,
  onChange,
  onBlur,
  onIncrement,
  onDecrement,
  isPercentage,
}: ValueChangerProps) => {
  return (
    <div className="flex items-center justify-between">
      <p className="text-xs text-[#AAAAAA]">Value</p>
      <div className="flex text-xs text-[#F9F9F9] bg-[#212121] h-9 items-center w-[140px] rounded-lg justify-between">
        <button
          className={`size-9 flex justify-center disabled:cursor-not-allowed rounded-l-lg hover:bg-[#3B3B3B] shrink-0 items-center cursor-pointer disabled:hover:bg-transparent disabled:text-[#3B3B3B]`}
          onClick={onDecrement}
          disabled={value <= 0}
        >
          <MinusIcon />
        </button>
        <input
          type="text"
          value={inputValue}
          onChange={onChange}
          onBlur={onBlur}
          className="bg-transparent w-full text-center focus:outline-none"
        />
        <button
          className={`size-9 flex justify-center disabled:cursor-not-allowed rounded-r-lg hover:bg-[#3B3B3B] shrink-0 items-center cursor-pointer disabled:hover:bg-transparent disabled:text-[#3B3B3B]`}
          onClick={onIncrement}
          disabled={isPercentage && value >= 100}
        >
          <PlusIcon />
        </button>
      </div>
    </div>
  );
};
