import React from "react";
import { toVulgar } from "vulgar-fractions";

export default function GradeContainer({
  grade,
  evaluation,
}: {
  grade: number;
  evaluation: string;
}) {
  return (
    <div className="flex flex-col bg-cyan-200 m-[10px] rounded-md h-[580px] w-[400px]">
      <div className="flex flex-row  w-[70px] h-[70px] rounded-full bg-green-300 text-center text-5xl pt-2 m-2">
        {/* {toVulgar(grade / 6)} */}
        <div className="block ml-3  text-3xl">{grade ? grade : 0}</div>
        <div className="mt-1 text-4xl">/</div>
        <div className="mt-3 text-3xl">6</div>
      </div>
      <div className="p-2 w-full h-[450px] text-wrap overflow-auto text-justify">
        {evaluation ? evaluation : "Evaluation will be displayed here"}
      </div>
    </div>
  );
}
