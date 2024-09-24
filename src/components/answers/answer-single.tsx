import { cn } from '@/libs/cn';

interface AnswerSignleProps {
  answers: { id: number; content: string; correct: boolean }[];
}

const AnswerSingle = ({ answers }: AnswerSignleProps) => {
  return (
    <div className="flex flex-col w-full gap-1">
      {answers?.map(answer => {
        return (
          <span className={cn('rounded-sm py-1 px-2', { 'bg-yellow-100': answer.correct })} key={answer.id}>
            {answer.content}
          </span>
        );
      })}
    </div>
  );
};

export default AnswerSingle;
