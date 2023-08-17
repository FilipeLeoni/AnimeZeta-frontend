import React, { useId } from "react";
import { Control, Controller, useForm } from "react-hook-form";
import MyListOptions from "@/utils/HeaderOptions/MyListOptions";
import dynamic from "next/dynamic";
import clsx from "clsx";
const SelectCustom = dynamic(() => import("../Select"));

interface FormFieldsProps {
  control: any;
  episodes?: number;
}

export const ListForm = ({ control, episodes }: FormFieldsProps) => {
  const inputId = useId();
  const selectId = useId();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col">
        <label htmlFor={selectId} className="font-medium text-gray-600 mb-1">
          Status
        </label>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <div className="drop-shadow-xl z-50">
              <SelectCustom
                options={MyListOptions.map((option: any) => ({
                  value: option.name,
                  label: option.name,
                }))}
                id={selectId}
                placeholder="Status"
                isClearable={false}
                isSearchable={false}
                value={field.value}
                onChange={field.onChange}
              />
            </div>
          )}
        />
      </div>
      <div className="flex flex-col">
        <Controller
          name="episodeProgress"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col">
              <label
                htmlFor={inputId}
                className="font-medium text-gray-600 mb-1"
              >
                Episode Progress
              </label>
              <div className="relative w-full max-w-[256px]">
                <input
                  id={inputId}
                  type="number"
                  {...field}
                  max={episodes !== null ? episodes : ""}
                  className="pl-4 pr-28 py-[7px] border text-gray-600 rounded-lg drop-shadow-xl focus:ring-2 focus:ring-primary outline-none w-full"
                />
                <div className="bg-primary text-sm font-medium text-gray-600 absolute py-[10px] px-4 top-0 right-0 rounded-lg">
                  OF {episodes !== null ? episodes : "-"} EPS
                </div>
              </div>
            </div>
          )}
        />
        <Controller
          name="rating"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col mt-7">
              <label
                htmlFor={inputId}
                className="font-medium text-gray-600 ml-2 mb-1"
              >
                Rating
              </label>
              <div className="rating rating-md rating-half">
                <input
                  type="radio"
                  className="rating-hidden"
                  checked={field.value === 0}
                />
                {Array.from({ length: 10 }, (_, index) => {
                  const value = (index + 1) / 2;
                  return (
                    <input
                      key={value}
                      type="radio"
                      className={clsx(
                        "mask mask-star-2",
                        index % 2 === 0 ? "mask-half-1" : "mask-half-2",
                        field.value === 0
                          ? "opacity-100 backdrop-brightness-100"
                          : "bg-primary"
                      )}
                      {...field}
                      value={value}
                      defaultChecked={field.value === value}
                      checked={field.value === value}
                      onChange={() => field.onChange(value)}
                    />
                  );
                })}
              </div>
            </div>
          )}
        />

        {/* <label htmlFor={inputId} className="font-medium text-gray-600">
          Episode Progress
        </label>
        <input
          id={inputId}
          {...register("episodes")}
          type="number"
          placeholder={0}
          value={episodeProgress}
          onChange={(e) => setEpisodeProgress(+e.target.value)}
          className="px-4 py-[7px] border rounded-lg drop-shadow-xl focus:ring-2 focus:ring-primary outline-none"
        /> */}
      </div>
    </div>
  );
};
