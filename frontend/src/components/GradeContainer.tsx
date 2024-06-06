import React from "react";
import { toVulgar } from "vulgar-fractions";

export default function GradeContainer({ grade }: { grade: number }) {
  return (
    <div className="flex flex-col bg-cyan-200 m-[10px] rounded-md h-[550px] w-[400px]">
      <div className="w-[70px] h-[70px] rounded-full bg-green-300 text-center text-5xl pt-2 m-2">
        {toVulgar(grade / 6)}
      </div>
      <div className="p-2 w-full h-[450px] text-wrap overflow-auto text-justify"></div>
    </div>
  );
}
