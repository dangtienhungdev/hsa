import type { AnswerInputType } from '@/interface/answer.type';

import { cn } from '@/libs/cn';

interface AnswerInputProps {
  answers: AnswerInputType[];
}

const AnswerInput = ({ answers }: AnswerInputProps) => {
  return (
    <div className="flex flex-col w-full gap-1">
      {answers?.map(answer => {
        return (
          <span className={cn('rounded-sm py-1 px-2 bg-yellow-100')} key={answer.id}>
            {answer.content}
          </span>
        );
      })}
    </div>
  );
};

export default AnswerInput;
