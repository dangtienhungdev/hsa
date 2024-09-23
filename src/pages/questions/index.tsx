import type { TQuestion } from '@/interface/question.type';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Col, Row } from 'antd';

import { questionApi } from '@/api/questions.api';
import { subjectApi } from '@/api/subject.api';
import { Card, CardDescription, CardTitle } from '@/components/ui/cart';
import { useToggleModal } from '@/hooks/useToggleModal';

const Questions = () => {
  const queryClient = useQueryClient();
  const { currentModal, onCloseModal, onOpenModal } = useToggleModal<TQuestion>();

  // get data questions
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['questions'],
    queryFn: () => questionApi.getAllQuestions(),
  });

  // get data subject
  const {
    data: dataSubject,
    isLoading: isLoadingSubject,
    isFetching: isFetchingSubject,
  } = useQuery({
    queryKey: ['subjects'],
    queryFn: () => subjectApi.getAllSubject(),
  });

  return (
    <div className="flex flex-col w-full gap-6">
      <div className="flex items-center justify-between">
        <Button type="primary" size="large" className="!rounded" onClick={() => onOpenModal('add')}>
          Thêm câu hỏi
        </Button>
      </div>

      <Row gutter={[24, 24]}>
        {dataSubject &&
          dataSubject.length > 0 &&
          dataSubject.map(subject => {
            return (
              <Col span={6} key={subject.id}>
                <Card className="!rounded-md cursor-pointer hover:bg-blue-50">
                  <CardTitle>{subject.name}</CardTitle>
                  <CardDescription>{subject.description}</CardDescription>
                </Card>
              </Col>
            );
          })}
      </Row>
    </div>
  );
};

export default Questions;
