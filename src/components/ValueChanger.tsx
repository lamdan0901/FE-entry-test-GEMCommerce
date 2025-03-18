import { ChangeEvent } from "react";
import { MinusIcon, PlusIcon } from "../icons";
import { Tooltip } from "./Tooltip";

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

      <div className="flex overflow-hidden text-xs [&>input:hover~*]:bg-[#3B3B3B] [&>input:hover]:bg-[#3B3B3B] [&>*:has(~input:hover)]:bg-[#3B3B3B] text-[#F9F9F9] bg-[#212121] h-9 items-center w-[140px] rounded-lg justify-between">
        <Tooltip
          text="Value must greater than 0"
          show={isPercentage && value <= 0}
        >
          <button
            className={`size-9 flex justify-center disabled:cursor-auto rounded-l-lg hover:bg-[#3B3B3B] shrink-0 items-center cursor-pointer disabled:hover:bg-transparent disabled:text-[#3B3B3B]`}
            onClick={onDecrement}
            disabled={isPercentage && value <= 0}
            aria-label="decrement"
          >
            <MinusIcon />
          </button>
        </Tooltip>

        <input
          type="text"
          data-testid="value-input"
          value={inputValue}
          onChange={onChange}
          onBlur={onBlur}
          className="bg-transparent size-full text-center hover:bg-[#3B3B3B] focus:outline-none "
        />

        <Tooltip
          text="Value must smaller than 100"
          show={isPercentage && value >= 100}
        >
          <button
            className={`size-9 flex justify-center disabled:cursor-auto rounded-r-lg hover:bg-[#3B3B3B] shrink-0 items-center cursor-pointer disabled:hover:bg-transparent disabled:text-[#3B3B3B]`}
            onClick={onIncrement}
            disabled={isPercentage && value >= 100}
            aria-label="increment"
          >
            <PlusIcon />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};
