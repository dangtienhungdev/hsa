import type { TableColumnsType } from 'antd';

import { useQuery } from '@tanstack/react-query';
import { Breadcrumb, Button, Col, Row, Table, Tag } from 'antd';
import { Link, useParams } from 'react-router-dom';

import { examApi } from '@/api/exam.api';
import pathUrl from '@/utils/path.util';

const SectionPage = () => {
  const { examId, sectionId } = useParams();

  const { data, isLoading, isFetching } = useQuery<any>({
    queryKey: ['list-questions-by-exam-and-section'],
    queryFn: () => examApi.getQuestionInExamSection(examId as string, sectionId as string),
    enabled: !!examId && !!sectionId,
  });

  const questions = data?.questions;

  const columns: TableColumnsType<any> = [
    {
      title: 'Tên câu hỏi',
      dataIndex: 'question',
      key: 'question',
      render: (value: string) => {
        return (
          <p
            dangerouslySetInnerHTML={{
              __html: value,
            }}
          ></p>
        );
      },
    },
    {
      title: 'Dạng câu hỏi',
      dataIndex: 'type',
      key: 'type',
      render: (value: string) => {
        switch (value) {
          case 'single':
            return <Tag color="magenta">Câu hỏi trắc nghiệm</Tag>;
          case 'input':
            return <Tag color="cyan">Câu hỏi input</Tag>;
          default:
            return <Tag color="purple">Câu hỏi group</Tag>;
        }
      },
    },
  ];

  return (
    <Row>
      <Col span={24}>
        <Row className="sticky top-0 left-0 right-0 z-10 pb-6">
          <Col span={12} className="!flex !items-center">
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to={`${pathUrl.exams}/${examId}`}>Đề thi</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <span className="">{data?.section}</span>
              </Breadcrumb.Item>
            </Breadcrumb>
          </Col>
          <Col span={12} className="!flex !justify-end">
            <Button type="primary" size="large" className="!rounded">
              Thêm câu hỏi
            </Button>
          </Col>
        </Row>
      </Col>

      <Col span={24}>
        <Table
          columns={columns}
          loading={isLoading || isFetching}
          dataSource={questions}
          rowKey={record => {
            return record.question_id;
          }}
          pagination={{
            showTotal(total, range) {
              return (
                <div className="flex items-center justify-between w-full mr-auto text-black-second">
                  Showing {range[0]}-{range[1]} of {total}
                </div>
              );
            },
            size: 'default',
          }}
        />
      </Col>
    </Row>
  );
};

export default SectionPage;
