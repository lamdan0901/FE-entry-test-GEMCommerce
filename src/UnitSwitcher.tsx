import { UnitType } from "./type";

interface UnitSwitcherProps {
  currentUnit: UnitType;
  onUnitChange: (unit: UnitType) => void;
}

export const UnitSwitcher = ({
  currentUnit,
  onUnitChange,
}: UnitSwitcherProps) => {
  return (
    <div className="flex items-center justify-between">
      <p className="text-xs text-[#AAAAAA]">Unit</p>
      <div className="flex text-xs text-[#F9F9F9] bg-[#212121] px-[2px] h-9 items-center w-[140px] rounded-lg justify-between">
        <button
          className={`w-[67px] h-8 cursor-pointer rounded-md ${
            currentUnit === "%" && "bg-[#424242]"
          }`}
          onClick={() => onUnitChange("%")}
        >
          %
        </button>
        <button
          className={`w-[67px] h-8 cursor-pointer rounded-md ${
            currentUnit === "px" && "bg-[#424242]"
          }`}
          onClick={() => onUnitChange("px")}
        >
          px
        </button>
      </div>
    </div>
  );
};
