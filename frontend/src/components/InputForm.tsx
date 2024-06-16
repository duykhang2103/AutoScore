import axios from "axios";
import React, { useRef, useState } from "react";

export default function InputForm({
  setGrade,
  setEvaluation,
}: {
  setGrade: React.Dispatch<React.SetStateAction<number>>;
  setEvaluation: React.Dispatch<React.SetStateAction<string>>;
}) {
  // const [inputText, setInputText] = useState<string>("");
  const divRef = useRef<HTMLDivElement>(null);

  const standardizePunctuation = (text: string) => {
    const punc = [".", ",", "!", "?", ";", ":", ")", "]", "}", ">", "…"];
    const leftPunc = ["(", "[", "{", "<"];
    let newText = text;
    for (let i = 0; i < newText.length; i++) {
      if (
        punc.includes(newText[i]) &&
        newText[i + 1] &&
        newText[i + 1] !== " "
      ) {
        newText = newText.slice(0, i + 1) + " " + newText.slice(i + 1);
        i++;
      }
      if (
        leftPunc.includes(newText[i]) &&
        newText[i - 1] &&
        newText[i - 1] !== " "
      ) {
        newText = newText.slice(0, i) + " " + newText.slice(i);
        i++;
      }
    }

    // text = text.replace(/([\)\].,!?;:])/g, "$1 ");
    // text = text.replace(/(\s+)/g, " ");
    return newText;
  };

  const colorWords = (text: string, words: string[]) => {
    words.forEach((word) => {
      const regex = new RegExp("\\b" + word + "\\b", "gi");
      text = text.replace(
        regex,
        `<span class="bg-red-200 hover:bg-red-400">${
          text.match(regex)?.[0]
        }</span>`
      );
    });

    // document.querySelectorAll("span").forEach((span) => {
    //   console.log(span.innerText);

    //   span.addEventListener("click", handleCorrectWord);
    // });
    text = text.split("\n").join("<br />");

    return text;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await axios.post("http://localhost:8000/grade", {
      // content: inputText,
      content: divRef.current?.innerText,
    });
    if (response.status === 200) {
      setGrade(response.data.result);
      setEvaluation(response.data.evaluation);
      console.log(response.data.misspelleds);
      let newText = divRef.current!.innerText;
      newText = standardizePunctuation(newText);
      newText = colorWords(newText, response.data.misspelleds);
      divRef.current!.innerHTML = newText;
    }
  };

  return (
    <div className="flex flex-col w-[60%] items-center">
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div
          className="w-[400px] min-h-[200px] m-[10px] bg-gray-200 border-2 border-gray-300 rounded-lg p-2 break-words max-h-[530px] overflow-auto whitespace-pre-wrap whitespace-pre-line"
          contentEditable={true}
          ref={divRef}
          suppressContentEditableWarning={true}
          data-text="Enter text here"
          // placeholder="Input text here..."
          // value={inputText}
          // onChange={(e) => setInputText(e.target.innerText)}
        ></div>
        <button className="w-[100px] bg-blue-500 m-[10px] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}
