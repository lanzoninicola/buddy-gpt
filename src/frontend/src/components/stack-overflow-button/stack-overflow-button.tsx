import stackIcon from "../stack-overflow-button/assets/images/stack-icon.png";
import useGPTQuestion from "../../hooks/useGPTquestion";

export default function StackOverflowButton() {
  const { gptQuestionValue } = useGPTQuestion();

  return (
    <StackOverflowLink question={gptQuestionValue}>
      <div className="shadow-md shadow-orange-300 grid place-items-center p-3 w-[45px] h-[45px] cursor-pointer rounded-md">
        <img src={stackIcon} alt="stack icon" />
      </div>
    </StackOverflowLink>
  );
}

interface StackOverflowLinkProps {
  children: React.ReactNode;
  question: string;
  [key: string]: any;
}

function StackOverflowLink({
  children,
  question,
  ...props
}: StackOverflowLinkProps) {
  if (question === "") {
    return null;
  }

  return (
    <a
      href={`https://stackoverflow.com/search?q=${question}`}
      target="_blank"
      {...props}
    >
      {children}
    </a>
  );
}
