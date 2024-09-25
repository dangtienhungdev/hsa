import type { AnswerGroupType } from '@/interface/answer.type';

import Question from '../question/question';

interface AnswerGroupProps {
  questions: AnswerGroupType[];
}

const AnswerGroup = ({ questions }: AnswerGroupProps) => {
  console.log('🚀 ~ AnswerGroup ~ questions:', questions);

  return (
    <>
      {questions?.map((question: any, index) => {
        return (
          <Question
            key={question.id}
            questions={{
              id: question.id,
              nameQuestion: question.name,
              answers: question.answers,
              type: question.type,
              index: index + 1,
            }}
          />
        );
      })}
    </>
  );
};

export default AnswerGroup;
