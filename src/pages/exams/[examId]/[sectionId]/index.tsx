import { Breadcrumb, Button, Col, Row, Table, Tag } from 'antd';
import { Link, useParams } from 'react-router-dom';

import DrawerSection from './drawer';
import FormCreateQuestion from '../components/form-create-question';
import type { TableColumnsType } from 'antd';
import { examApi } from '@/api/exam.api';
import pathUrl from '@/utils/path.util';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const SectionPage = () => {
  const { examId, sectionId } = useParams();

  const [open, setOpen] = useState<{ visible: boolean; data: any }>({
    visible: false,
    data: null,
  });

  const { data, isLoading, isFetching } = useQuery<any>({
    queryKey: ['list-questions-by-exam-and-section'],
    queryFn: () => examApi.getQuestionInExamSection(examId as string, sectionId as string),
    enabled: !!examId && !!sectionId,
  });

  const questions = data?.questions;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const columns: TableColumnsType<any> = [
    {
      title: 'Tên câu hỏi',
      dataIndex: 'question',
      key: 'question',
      render: (value: string, record) => {
        const nameQuestion = record.content_question_group || value;

        return (
          <div className="flex items-start gap-1">
            <p className="font-medium whitespace-nowrap">Câu hỏi {record?.label}:</p>
            <p
              dangerouslySetInnerHTML={{
                __html: nameQuestion,
              }}
            ></p>
          </div>
        );
      },
    },
    {
      width: 120,
      title: 'Thứ tự hiển thị',
      dataIndex: 'ordering',
      align: 'center',
      key: 'ordering',
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
      width: 200,
      title: 'Nhóm câu hỏi',
      dataIndex: 'subject',
      align: 'center',
      key: 'subject',
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
      width: 200,
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

  const handleOpen = (value: any) => {
    setOpen({
      visible: true,
      data: value,
    });
  };

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
            <Button type="primary" size="large" className="!rounded" onClick={() => setIsModalOpen(true)}>
              Thêm câu hỏi
            </Button>
          </Col>
        </Row>
      </Col>

      <Col span={24}>
        <Table
          columns={columns}
          scroll={{ y: '700px', x: 1000 }}
          style={{ cursor: 'pointer' }}
          loading={isLoading || isFetching}
          dataSource={questions}
          onRow={record => ({
            onClick: () => handleOpen(record), // Thay đổi ở đây
          })}
          rowKey={record => {
            return record.question_id;
          }}
          pagination={false}
        />
      </Col>

      <FormCreateQuestion isOpenModal={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <DrawerSection open={open} onClose={() => setOpen({ visible: false, data: null })} />
    </Row>
  );
};

export default SectionPage;
