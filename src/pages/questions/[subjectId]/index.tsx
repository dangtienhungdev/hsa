import type { TQuestion } from '@/interface/question.type';
import type { TableColumnsType, TabsProps } from 'antd';

import { useQuery } from '@tanstack/react-query';
import { Button, Table, Tabs } from 'antd';
import { omit } from 'lodash';
import { useEffect } from 'react';
import { createSearchParams, useNavigate, useParams } from 'react-router-dom';

import { questionApi } from '@/api/questions.api';
import { useQueryParams } from '@/hooks/useQueryParams';
import pathUrl from '@/utils/path.util';

const QuestionDetail = () => {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const searchParams = useQueryParams();
  const { page, limit } = searchParams;

  // get data questions
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['questions', subjectId, searchParams],
    queryFn: () => questionApi.getAllQuestions({ subject_id: subjectId as string, ...searchParams }),
  });
  const dataQuestions = data?.data;

  const columns: TableColumnsType<TQuestion> = [
    {
      title: <p className="text-base font-medium">Tên câu hỏi</p>,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: <p className="text-base font-medium">Dạng câu hỏi</p>,
      dataIndex: 'type',
      key: 'type',
    },
  ];

  const handleChangeTab = (value: string) => {
    const newParams = omit(searchParams, 'page');

    navigate({
      pathname: `${pathUrl.questions}/${subjectId}`,
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
                pathname: `${pathUrl.questions}/${subjectId}`,
                search: createSearchParams({
                  ...searchParams,
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
                pathname: `${pathUrl.questions}/${subjectId}`,
                search: createSearchParams({
                  ...searchParams,
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
            pageSize: Number(limit) || 10,
            total: data?.total,
            onChange: (page, pageSize) => {
              navigate({
                pathname: `${pathUrl.questions}/${subjectId}`,
                search: createSearchParams({
                  ...searchParams,
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
      pathname: `${pathUrl.questions}/${subjectId}`,
      search: createSearchParams({
        type: 'single',
      }).toString(),
    });
  }, []);

  return (
    <div className="flex flex-col w-full gap-6">
      <div className="flex items-center justify-between">
        <Button type="primary" size="large" className="!rounded" onClick={() => navigate(pathUrl.addQuestion)}>
          Thêm câu hỏi
        </Button>
      </div>

      <Tabs items={items} defaultActiveKey="single" onChange={value => handleChangeTab(value)} />
    </div>
  );
};

export default QuestionDetail;
