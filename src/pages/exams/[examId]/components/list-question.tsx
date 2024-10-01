import type { TQuestion, TQuestionInput, TQuestionSingle } from '@/interface/question.type';
import type { TableColumnsType, TabsProps } from 'antd';

import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Col, Row, Table, Tabs, message } from 'antd';
import { omit } from 'lodash';
import { useEffect } from 'react';
import { createSearchParams, useNavigate, useParams } from 'react-router-dom';

import { questionApi } from '@/api/questions.api';
import { useQueryParams } from '@/hooks/useQueryParams';
import pathUrl from '@/utils/path.util';

const ListQuestionOfExam = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const params = useQueryParams();
  const { subject, page, limit } = params;

  // get data questions
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['questions', params],
    queryFn: () => questionApi.getAllQuestions({ ...params, subject_id: subject }),
  });
  const dataQuestions = data?.data;

  // create question signle
  const createQuestion = useMutation({
    mutationKey: ['create-question'],
    mutationFn: (body: TQuestionSingle | TQuestionInput) => questionApi.createQuestion(body),
    onSuccess: () => {
      message.success('Thêm mới câu hỏi thành công!');
    },
    onError: () => {
      message.error('Thêm mới câu hỏi thất bại!');
    },
  });

  const columns: TableColumnsType<TQuestion> = [
    {
      title: undefined,
      dataIndex: 'name',
      key: 'name',
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
      title: undefined,
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      render: (_, record: TQuestion) => {
        return (
          <Button className="!rounded-md" onClick={() => handleAddQuestion(record)}>
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
                d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12"
              />
            </svg>
          </Button>
        );
      },
    },
  ];

  // handle add question
  const handleAddQuestion = (question: TQuestion) => {
    const questionData: any = {
      ...question,
      exam_id: Number(examId),
      subject_id: Number(subject),
    };

    createQuestion.mutate(questionData);
  };

  // handle change tab
  const handleChangeTab = (value: string) => {
    const newParams = omit(params, 'page');

    navigate({
      pathname: `${pathUrl.exams}/${examId}`,
      search: createSearchParams({
        ...newParams,
        type: value,
      }).toString(),
    });
  };

  const items: TabsProps['items'] = [
    {
      key: 'single',
      label: 'Câu hỏi trắc nghiệm',
      children: (
        <Table
          columns={columns}
          loading={isLoading || isFetching}
          dataSource={dataQuestions}
          rowKey={record => record.id}
          pagination={{
            current: Number(page) || 1,
            pageSize: Number(limit) || 10,
            total: data?.total,
            onChange: (page, pageSize) => {
              navigate({
                pathname: `${pathUrl.exams}/${examId}`,
                search: createSearchParams({
                  ...params,
                  page: page.toString(),
                  limit: pageSize.toString(),
                }).toString(),
              });
            },
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
      ),
    },
    {
      key: 'input',
      label: 'Câu hỏi input',
      children: (
        <Table
          columns={columns}
          rowKey={record => record.id}
          loading={isLoading || isFetching}
          dataSource={dataQuestions}
          pagination={{
            current: Number(page) || 1,
            pageSize: Number(limit) || 10,
            total: data?.total,
            onChange: (page, pageSize) => {
              navigate({
                pathname: `${pathUrl.exams}/${examId}`,
                search: createSearchParams({
                  ...params,
                  page: page.toString(),
                  limit: pageSize.toString(),
                }).toString(),
              });
            },
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
      ),
    },
    {
      key: 'group',
      label: 'Câu hỏi group',
      children: (
        <Table
          rowKey={record => record.id}
          columns={columns}
          loading={isLoading || isFetching}
          dataSource={dataQuestions}
          pagination={{
            current: Number(page) || 1,
            pageSize: Number(limit) || 8,
            total: data?.total,
            onChange: (page, pageSize) => {
              navigate({
                pathname: `${pathUrl.exams}/${examId}`,
                search: createSearchParams({
                  ...params,
                  page: page.toString(),
                  limit: pageSize.toString(),
                }).toString(),
              });
            },
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
      ),
    },
  ];

  useEffect(() => {
    navigate({
      pathname: `${pathUrl.exams}/${examId}`,
      search: createSearchParams({
        ...params,
        type: 'single',
      }).toString(),
    });
  }, []);

  return (
    <div className="h-full p-6 bg-white">
      <h2 className="text-lg font-medium">Danh sách câu hỏi</h2>

      <Row>
        <Col span={24}>
          <Tabs items={items} defaultActiveKey="single" onChange={value => handleChangeTab(value)} />
        </Col>
      </Row>
    </div>
  );
};

export default ListQuestionOfExam;
