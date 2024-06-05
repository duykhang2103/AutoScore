import React from "react";
import { toVulgar } from "vulgar-fractions";

export default function GradeContainer() {
  return (
    <div className="flex flex-col bg-cyan-200 m-[10px] rounded-md h-[550px]">
      <div className="w-[70px] h-[70px] rounded-full bg-green-300 text-center text-5xl pt-2 m-2">
        {toVulgar(1 / 6)}
      </div>
      <div className="p-2 w-full h-[450px] text-wrap overflow-auto text-justify">
        The essay demonstrates adequate mastery, although it will have lapses in
        quality. A typical essay develops a point of view on the issue and
        demonstrates competent critical thinking; the essay using adequate
        examples, reasons, and other evidence taken from the source text(s) to
        support its position; the essay is generally organized and focused,
        demonstrating some coherence and progression of ideas exhibits adequate;
        the essay may demonstrate inconsistent facility in the use of language,
        using generally appropriate vocabulary demonstrates some variety in
        sentence structure; the essay may have some errors in grammar, usage,
        and mechanics.he essay demonstrates adequate mastery, although it will
        have lapses in quality.
      </div>
    </div>
  );
}
