import questions from "../../../assets/questions/coding.json";
import useGPTQuestion from "../../../hooks/useGPTquestion";
import { useState } from "react";
import { AiOutlineClose } from "@react-icons/all-files/ai/AiOutlineClose";
import { GoTriangleRight } from "@react-icons/all-files/go/GoTriangleRight";

export default function List() {
  const [showList, setShowList] = useState(false);

  return (
    <div className="flex flex-col bg-white gap-4 rounded-md p-4 h-max ">
      <button
        className="bg-blue-500 text-white rounded-md p-2 text-sm px-4 font-body"
        onClick={() => setShowList(true)}
      >
        Coding Questions
      </button>

      {showList && (
        <div className="flex flex-col ">
          <AiOutlineClose
            className="text-gray-500 cursor-pointer hover:text-gray-700 self-end mb-2"
            onClick={() => setShowList(false)}
          />
          <div className="overflow-y-auto  max-h-[75vh] gap-2">
            <ul className="flex flex-col gap-2 m-2  ">
              {questions.map((q, index) => (
                <Item
                  key={index}
                  text={q.question}
                  tag={q.tag}
                  requireTextArea={q.requireTextArea}
                />
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

interface ItemProps {
  text: string;
  tag: string;
  requireTextArea: boolean;
}

function Item({ text, tag, requireTextArea }: ItemProps) {
  const [showTextArea, setShowTextArea] = useState(false);
  const [localTextAreaValue, setLocalTextAreaValue] = useState<string>("");
  const { gptQuestionTextArea } = useGPTQuestion();

  function onQuestionSelected() {
    if (requireTextArea) {
      setShowTextArea(!showTextArea);
    }

    if (gptQuestionTextArea && requireTextArea === false) {
      gptQuestionTextArea.value = text;
    }
  }

  function onClickGo() {
    if (gptQuestionTextArea) {
      let _value = text;
      _value += "\n";
      _value += "```";
      _value += "\n";
      _value += localTextAreaValue;
      _value += "\n";
      _value += "```";

      gptQuestionTextArea.value = _value;
    }
  }

  return (
    <li className="rounded-md shadow-md text-xs cursor-pointer">
      <div className="flex justify-between">
        <div
          className="flex flex-row justify-between items-center p-2 min-w-max"
          onClick={onQuestionSelected}
        >
          <div className="flex flex-row gap-2 items-center">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <div className="text-gray-500 font-body">{tag}</div>
          </div>
        </div>
        {requireTextArea && showTextArea && (
          <div
            className="bg-blue-500 rounded-md p-2 px-4 flex gap-1 justify-center items-center cursor-pointer"
            onClick={onClickGo}
          >
            <span className="text-xs font-body text-white font-bold">GO</span>
            <GoTriangleRight color="white" />
          </div>
        )}
      </div>
      <div className="p-2 font-body">{text}</div>

      {requireTextArea && showTextArea && (
        <div className="p-2">
          <textarea
            className="w-full h-24 border border-gray-300 rounded-md p-2 font-mono text-xs"
            placeholder="Type your code here..."
            onChange={(e) => setLocalTextAreaValue(e.target.value)}
          ></textarea>
        </div>
      )}
    </li>
  );
}
