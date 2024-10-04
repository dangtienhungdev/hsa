import { Breadcrumb, Button, Col, Popconfirm, Row, Table, Tag, message } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import DrawerSection from './drawer';
import FormCreateQuestion from '../components/form-create-question';
import type { TableColumnsType } from 'antd';
import { examApi } from '@/api/exam.api';
import pathUrl from '@/utils/path.util';
import { questionApi } from '@/api/questions.api';
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
          <div aria-hidden={true} className="flex items-start gap-1" onClick={() => handleOpen(record)}>
            <p className="font-medium whitespace-nowrap">Câu hỏi {record?.ordering || record?.label}:</p>
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
    {
      title: false,
      width: 120,
      align: 'center',
      dataIndex: 'action',
      key: 'action',
      render: (_: string, record) => {
        return (
          <div className="flex items-center justify-center w-full">
            <Popconfirm title="Bạn muốn xoá?" onConfirm={() => handleDelteQuesion(record)}>
              <Button
                className="!flex items-center justify-center !rounded"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4 !stroke-red-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                }
              ></Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const queryClient = useQueryClient();

  // delete question
  const deleteQuestionMutation = useMutation({
    mutationKey: ['delte-questioin'],
    mutationFn: (id: number) => questionApi.deleteQuestion(id),
    onSuccess: () => {
      message.success('Xoá câu hỏi thành công!');
      queryClient.invalidateQueries({ queryKey: ['list-questions-by-exam-and-section'] });
    },
    onError: () => {
      message.error('Xoá câu hỏi thật bại!');
    },
  });

  const handleDelteQuesion = (record: any) => {
    console.log(record);

    if (record.type === 'single' || record.type === 'single') {
      const questionId = record.question_id;

      deleteQuestionMutation.mutate(questionId);
    }

    if (record.type === 'group') {
      if (record?.group_questions && record?.group_questions?.length > 0) {
        for (const questionItem of record?.group_questions) {
          console.log('🚀 ~ handleDelteQuesion ~ questionItem:', questionItem);
          const questionId = questionItem.question_id;

          deleteQuestionMutation.mutate(questionId);
        }
      }
    }
  };

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
