import React from "react";
import InputForm from "./InputForm";
import GradeContainer from "./GradeContainer";

export default function Body() {
  return (
    <div className="flex flex-row">
      <InputForm />
      <GradeContainer />
    </div>
  );
}
