import { useQuery } from '@tanstack/react-query';
import { Button, Col, Row } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import { subjectApi } from '@/api/subject.api';
import { Card, CardDescription, CardTitle } from '@/components/ui/cart';
import pathUrl from '@/utils/path.util';

const Questions = () => {
  const navigate = useNavigate();

  // get data subject
  const { data: dataSubject } = useQuery({
    queryKey: ['subjects'],
    queryFn: () => subjectApi.getAllSubject(),
  });

  return (
    <div className="flex flex-col w-full gap-6">
      <div className="flex items-center justify-between">
        <Button type="primary" size="large" className="!rounded" onClick={() => navigate(pathUrl.addQuestion)}>
          Thêm câu hỏi
        </Button>
      </div>

      <Row gutter={[24, 24]}>
        {dataSubject &&
          dataSubject.length > 0 &&
          dataSubject.map(subject => {
            return (
              <Col span={6} key={subject.id}>
                <Link to={`${pathUrl.questions}/${subject.id}`}>
                  <Card className="!rounded-md cursor-pointer hover:bg-blue-50">
                    <CardTitle>{subject.name}</CardTitle>
                    <CardDescription>{subject.description}</CardDescription>
                  </Card>
                </Link>
              </Col>
            );
          })}
      </Row>

      {/* <FormQuestion modalInfo={currentModal} onClose={onCloseModal} /> */}
    </div>
  );
};

export default Questions;
