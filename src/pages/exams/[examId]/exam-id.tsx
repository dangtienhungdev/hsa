import type { TabsProps } from 'antd';

import './less/index.less';

import { Breadcrumb, Button, Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import { Link, createSearchParams, useNavigate, useParams } from 'react-router-dom';

import { useQueryParams } from '@/hooks/useQueryParams';
import pathUrl from '@/utils/path.util';

import ContentExam from './components';
import FormCreateQuestion from './components/form-create-question';

const ExamId = () => {
  const navigate = useNavigate();
  const params = useQueryParams();
  const { examId } = useParams();

  const { name } = params;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const items: TabsProps['items'] = [
    {
      key: '2', // id tư duy định lương (toán)
      label: 'Tư duy định lượng (Toán học)',
      children: <ContentExam />,
    },
    {
      key: '3', // id tư duy định tính (ngữ văn)
      label: 'Tư duy định tính (Văn học)',
      children: 'Content of Tab Pane 2',
    },
  ];

  const handleChangeTab = (value: string) => {
    navigate({
      pathname: `${pathUrl.exams}/${examId}`,
      search: createSearchParams({
        ...params,
        subject: value,
      }).toString(),
    });
  };

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
        <Col span={12} className="!flex !justify-end">
          <Button type="primary" size="large" className="!rounded" onClick={() => setIsModalOpen(true)}>
            Thêm câu hỏi
          </Button>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="h-full">
        <Col span={24}>
          <div className="!rounded h-[calc(100vh_-_64px_-_64px_-_32px)] scrollbar-hide overflow-y-scroll">
            <ContentExam />
          </div>
        </Col>
        {/* <Col span={12}>
          <div className="shadow !rounded bg-white h-[calc(100vh_-_64px_-_64px_-_32px)] scrollbar-hide overflow-y-scroll">
            <ListQuestionOfExam />
          </div>
        </Col> */}
      </Row>

      <FormCreateQuestion isOpenModal={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default ExamId;
