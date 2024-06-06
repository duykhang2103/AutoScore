import React, { useState } from "react";
import InputForm from "./InputForm";
import GradeContainer from "./GradeContainer";

export default function Body() {
  const [grade, setGrade] = useState<number>(0);

  return (
    <div className="flex flex-row">
      <InputForm setGrade={setGrade} />
      <GradeContainer grade={grade} />
    </div>
  );
}
