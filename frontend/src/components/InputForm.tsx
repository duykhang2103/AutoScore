import React from "react";

export default function InputForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const text = e.currentTarget[0].value;
    // console.log(text);
  };
  return (
    <div className="flex flex-col w-[60%] items-center">
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <textarea
          className="w-[400px] min-h-[200px] m-[10px] bg-gray-200 border-2 border-gray-300 rounded-lg p-2 break-words max-h-[500px]"
          contentEditable={true}
          placeholder="Input text here..."
        />
        <button className="w-[100px] bg-blue-500 m-[10px] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}
