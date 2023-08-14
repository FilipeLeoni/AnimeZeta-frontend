import React, { useId } from "react";
import clsx from "clsx";
import Select from "react-select";

import { CaretDown, X } from "@phosphor-icons/react";
import makeAnimated from "react-select/animated";

interface Props {
  options: any;
  id?: string;
  isSearchable?: boolean;
  placeholder: string;
  onChange: any;
  value: any;
  isMulti?: boolean;
}

export default function SelectCustom({
  options,
  placeholder,
  id,
  onChange,
  isSearchable = true,
  value,
  isMulti = false,
}: Props) {
  const DropdownIndicator = () => {
    return (
      <div>
        <CaretDown
          size={20}
          weight="bold"
          className="text-gray-500 hover:text-gray-700"
        />
      </div>
    );
  };
  const inputId = useId();

  const animatedComponents: any = makeAnimated();

  const controlStyles = {
    base: "rounded-lg bg-white hover:cursor-pointer w-64 text-gray-700 transition-all",
    focus: "border-primary ring-2 ring-primary",
    nonFocus: "border-primary hover:border-primary",
  };
  const placeholderStyles = "text-gray-400 pl-1 py-1";
  const selectInputStyles = "pl-1 py-0.5";
  const valueContainerStyles = "pl-5 gap-1";
  const singleValueStyles = "leading-7 ml-1";
  const multiValueStyles =
    "bg-gray-100 rounded items-center py-0.5 pl-2 pr-1 gap-1.5 ";
  const multiValueLabelStyles = "leading-6 py-0.5 ";
  const multiValueRemoveStyles =
    "border border-gray-200 bg-white hover:bg-red-50 hover:text-red-800 text-gray-800 hover:border-red-300 rounded-md";
  const indicatorsContainerStyles = "p-1 gap-1";
  const indicatorSeparatorStyles = "bg-gray-300 text-gray-200";
  const dropdownIndicatorStyles =
    "p-1 hover:bg-gray-100 text-gray-200 rounded-md ";
  const menuStyles = "p-1 mt-2 bg-white rounded-lg";
  const groupHeadingStyles = "ml-3 mt-2 mb-1 text-gray-600 text-sm";
  const optionStyles = {
    base: "hover:cursor-pointer px-3 py-2 rounded text-gray-600",
    focus: "bg-gray-100 active:bg-gray-200",
    selected:
      "after:content-['✔'] after:ml-2 after:text-green-500 text-gray-800",
  };
  const noOptionsMessageStyles =
    "text-gray-500 p-2 bg-gray-600 border border-dashed border-gray-600 rounded-sm";

  return (
    <Select
      isMulti={isMulti}
      name="select"
      options={options}
      onChange={onChange}
      value={value}
      id={id}
      isClearable
      isSearchable={isSearchable}
      placeholder={placeholder}
      components={{ ...animatedComponents, DropdownIndicator }}
      hideSelectedOptions={false}
      unstyled
      styles={{
        input: (base) => ({
          ...base,
          "input:focus": {
            boxShadow: "none",
          },
        }),
        multiValueLabel: (base) => ({
          ...base,
          whiteSpace: "normal",
          overflow: "visible",
        }),
        control: (base) => ({
          ...base,
          transition: "none",
        }),
      }}
      classNames={{
        control: ({ isFocused }) =>
          clsx(
            isFocused ? controlStyles.focus : controlStyles.nonFocus,
            controlStyles.base
          ),
        placeholder: () => placeholderStyles,
        input: () => selectInputStyles,
        valueContainer: () => valueContainerStyles,
        singleValue: () => singleValueStyles,
        multiValue: () => multiValueStyles,
        multiValueLabel: () => multiValueLabelStyles,
        multiValueRemove: () => multiValueRemoveStyles,
        indicatorsContainer: () => indicatorsContainerStyles,
        indicatorSeparator: () => indicatorSeparatorStyles,
        dropdownIndicator: () => dropdownIndicatorStyles,
        menu: () => menuStyles,
        groupHeading: () => groupHeadingStyles,
        option: ({ isFocused, isSelected }) =>
          clsx(
            isFocused && optionStyles.focus,
            isSelected && optionStyles.selected,
            optionStyles.base
          ),
        noOptionsMessage: () => noOptionsMessageStyles,
      }}
    />
  );
}
