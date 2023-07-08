import Image from "next/image";
import React from "react";
import RatingStar from "../RatingStar";

export default function Accordion({ data }: any) {
  function HTMLRenderer({ html }: any) {
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  }
  return (
    <div className="ml-4 w-full h-36 rounded px-4 flex justify-center ">
      <div className="chat chat-start w-full">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full drop-shadow-md">
            <Image
              src={data.user.images.webp.image_url}
              alt=""
              width={50}
              height={50}
            />
          </div>
        </div>
        <div className="chat-header ">
          <p>{data.user.username}</p>
        </div>

        <div className="chat-bubble bg-gray-300 drop-shadow-md w-full relative flex flex-col">
          <div className="pt-2 mb-2 px-2 text-overflow-ellipsis line-clamp-3 text-teal-950">
            <HTMLRenderer html={data.review} />
          </div>
          <div className="place-self-end mt-px text-xs">
            {data.tags.map((tag: any) => (
              <p key={tag}>{tag}</p>
            ))}
          </div>
          <div className="absolute right-2 -top-6">
            {" "}
            <RatingStar score={data.score} />
          </div>
        </div>
      </div>
    </div>
  );
}
