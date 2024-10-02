import './less/index.less';

import { Breadcrumb, Col, Row } from 'antd';
import { Link, createSearchParams, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import ContentExam from './components';
import FormCreateQuestion from './components/form-create-question';
import pathUrl from '@/utils/path.util';
import { useQueryParams } from '@/hooks/useQueryParams';

const ExamId = () => {
  const navigate = useNavigate();
  const params = useQueryParams();
  const { examId } = useParams();

  const { name } = params;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    navigate({
      pathname: `${pathUrl.exams}/${examId}`,
      search: createSearchParams({
        ...params,
        subject: '2',
      }).toString(),
    });
  }, []);

  return (
    <div className="flex flex-col w-full">
      <Row className="sticky top-0 left-0 right-0 z-10 pb-6">
        <Col span={12} className="!flex !items-center">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to={pathUrl.exams}>Đề thi</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span className="">
                Danh sách câu hỏi trong đề thi <span className="font-medium">{name}</span>
              </span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        {/* <Col span={12} className="!flex !justify-end">
          <Button type="primary" size="large" className="!rounded" onClick={() => setIsModalOpen(true)}>
            Thêm câu hỏi
          </Button>
        </Col> */}
      </Row>

      <Row gutter={[16, 16]} className="h-full">
        <Col span={24}>
          <div className="!rounded h-[calc(100vh_-_64px_-_64px_-_32px)] scrollbar-hide overflow-y-scroll">
            <ContentExam />
          </div>
        </Col>
      </Row>

      <FormCreateQuestion isOpenModal={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default ExamId;
