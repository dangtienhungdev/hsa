import type { TableColumnsType } from 'antd';

import { useQuery } from '@tanstack/react-query';
import { Breadcrumb, Button, Col, Row, Table, Tag } from 'antd';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { examApi } from '@/api/exam.api';
import pathUrl from '@/utils/path.util';

import FormCreateQuestion from '../components/form-create-question';
import DrawerSection from './drawer';

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
          <div aria-hidden={true} className="flex items-start gap-1" onClick={() => handleOpen(record)}>
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
      dataIndex: 'label',
      align: 'center',
      key: 'label',
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
    // {
    //   title: 'Edit câu hỏi',
    //   width: 120,
    //   align: 'center',
    //   dataIndex: 'action',
    //   key: 'action',
    //   render: (_: string, record) => {
    //     return (
    //       <div className="flex items-center justify-center w-full">
    //         <Button
    //           className="!flex items-center justify-center !rounded"
    //           icon={
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               fill="none"
    //               viewBox="0 0 24 24"
    //               strokeWidth={1.5}
    //               stroke="currentColor"
    //               className="size-6"
    //             >
    //               <path
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
    //               />
    //             </svg>
    //           }
    //         ></Button>
    //       </div>
    //     );
    //   },
    // },
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
          rowKey={record => {
            return record.question_id;
          }}
          pagination={false}
        />
      </Col>

      <FormCreateQuestion isOpenModal={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <DrawerSection open={open} onClose={() => setOpen({ visible: false, data: null })} />
      {/* <FormEdit isOpenModal={openFormEdit} onClose={() => setOpenFormEdit(false)} question={currentValue} /> */}
    </Row>
  );
};

export default SectionPage;
