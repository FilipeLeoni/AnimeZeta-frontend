import React, { useId } from "react";
import { Control, Controller, useForm } from "react-hook-form";
import MyListOptions from "@/utils/HeaderOptions/MyListOptions";
import dynamic from "next/dynamic";
const SelectCustom = dynamic(() => import("../Select"));

interface FormFieldsProps {
  control: Control;
}

export const ListForm = ({ control }: FormFieldsProps) => {
  const inputId = useId();
  const selectId = useId();

  return (
    <div className="flex gap-8">
      <div className="flex flex-col">
        <label htmlFor={selectId} className="font-medium text-gray-600">
          Status
        </label>
        <div className="z-50">
          <Controller
            name="status"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <div className="drop-shadow-xl z-50">
                <SelectCustom
                  options={MyListOptions.map((option: any) => ({
                    value: option.name,
                    label: option.name,
                  }))}
                  id={selectId}
                  placeholder="Status"
                  isSearchable={false}
                  value={field.value}
                  onChange={field.onChange}
                />
              </div>
            )}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <Controller
          name="episodes"
          control={control}
          defaultValue={0}
          render={({ field }) => (
            <div className="flex flex-col">
              <label htmlFor={inputId} className="font-medium text-gray-600">
                Episode Progress
              </label>
              <input
                id={inputId}
                type="number"
                {...field}
                className="px-4 py-[7px] border text-gray-600 rounded-lg drop-shadow-xl focus:ring-2 focus:ring-primary outline-none"
              />
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
