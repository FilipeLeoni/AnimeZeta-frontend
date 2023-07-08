import Image from "next/image";
import React from "react";

export default function StaffCard({ data }: any) {
  return (
    <div className="flex w-72 bg-gray-300 h-44 rounded-md overflow-hidden">
      <div
        className="w-32 h-44 bg-center bg-cover"
        style={{ backgroundImage: `url(${data.person.images.jpg.image_url})` }}
      ></div>
      <div className="ml-2 mt-3 p-2">
        <p className="font-medium text-xl mb-2">{data.person.name}</p>
        {data.positions.map((position: any) => (
          <p key={position} className="text-sm">
            {position}
          </p>
        ))}
      </div>
    </div>
  );
}
