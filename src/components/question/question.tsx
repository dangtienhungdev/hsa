import type { AnswerGroupType, AnswerInputType, AnswerSingleType } from '@/interface/answer.type';
import type { QuestionType } from '@/interface/question.type';

import { Button, InputNumber } from 'antd';

import AnswerGroup from '../answers/answer-group';
import AnswerInput from '../answers/answer-input';
import AnswerSingle from '../answers/answer-single';

interface QuestionProps {
  questions: {
    id: number;
    index: number;
    nameQuestion: string;
    type: QuestionType;
    answers: (AnswerSingleType | AnswerInputType | AnswerGroupType)[];
  };
}

const Question = ({ questions: { answers, id, index, nameQuestion, type } }: QuestionProps) => {
  return (
    <div className="px-4 py-4 border-b border-b-gray-300">
      <div className="flex flex-col gap-3">
        <p className="">
          <span className="text-base font-medium">Câu hỏi {index}: </span> <span className="">{nameQuestion}</span>
        </p>

        {type === 'single' && <AnswerSingle answers={answers as AnswerSingleType[]} />}
        {type === 'input' && <AnswerInput answers={answers as AnswerInputType[]} />}
        {type === 'group' && <AnswerGroup questions={answers as AnswerGroupType[]} />}
      </div>

      <div className="flex items-center justify-end gap-4 pt-4 mt-4 border-t border-t-gray-200">
        <div className="flex items-center gap-2">
          <span className="">Thứ tự hiển thị</span>
          <InputNumber className="!rounded" value={index + 1} />
        </div>

        <Button
          danger
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          }
        />
      </div>
    </div>
  );
};

export default Question;
