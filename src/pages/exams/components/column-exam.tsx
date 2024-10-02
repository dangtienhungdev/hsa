import { Button, Popconfirm, Space, Tooltip, message } from 'antd';

import type { TExam } from '@/interface/exam.type';
import type { TModalType } from '@/interface/common.type';
import type { TableColumnsType } from 'antd';
import { formatDate } from '@/utils/format-date';
import pathUrl from '@/utils/path.util';
import { useNavigate } from 'react-router-dom';

interface ColumnExamProps {
  isLoadingDelete?: boolean;
  onOpenModal: (type: TModalType, data?: TExam) => void;
  onDeleteExam: (id: number) => void;
}

export const ColumnExams = ({ onOpenModal, isLoadingDelete, onDeleteExam }: ColumnExamProps) => {
  const navigate = useNavigate();

  const handleCopy = (name: string) => {
    navigator.clipboard.writeText(name);
    message.success('Copped: ' + name);
  };

  const columns: TableColumnsType<TExam> = [
    {
      title: <p className="text-base font-medium">Tên đề thi</p>,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: <p className="text-base font-medium">Mã đề thi</p>,
      dataIndex: 'code',
      key: 'code',
      render: (code: string) => {
        return (
          <Tooltip title={`Copy mã đề ${code}`}>
            <button className="cursor-pointer" onClick={() => handleCopy(code)}>
              {code}
            </button>
          </Tooltip>
        );
      },
    },
    {
      title: <p className="text-base font-medium">Ngày tạo</p>,
      dataIndex: 'created_at',
      key: 'created_at',
      render: (created_at: string) => <span className="">{formatDate(created_at)}</span>,
    },
    {
      title: <p className="text-base font-medium"></p>,
      width: 200,
      dataIndex: 'action',
      key: 'action',
      render: (_: string, record: TExam) => {
        return (
          <Space align="center">
            <Button
              className="flex items-center justify-center !rounded-md"
              onClick={() => navigate(`${pathUrl.exams}/${record.id}?name=${record.name}`)}
            >
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
                  d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                />
              </svg>
            </Button>
            {/* <Button
              className="flex items-center justify-center !rounded-md"
              type="primary"
              onClick={() => onOpenModal('edit', record)}
            >
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
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </Button> */}
            <Popconfirm title="Bạn muốn xoá đề thi?" onConfirm={() => onDeleteExam(record.id)}>
              <Button
                className="flex items-center justify-center !rounded-md"
                disabled={isLoadingDelete}
                loading={isLoadingDelete}
                danger
              >
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
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return columns;
};
