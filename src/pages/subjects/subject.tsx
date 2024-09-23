import type { TSubject } from '@/interface/subject.type';
import type { TableColumnsType } from 'antd';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Table } from 'antd';

import { subjectApi } from '@/api/subject.api';
import { useToggleModal } from '@/hooks/useToggleModal';
import { formatDate } from '@/utils/format-date';

const Subjects = () => {
  const queClient = useQueryClient();
  const { currentModal, onCloseModal, onOpenModal } = useToggleModal<TSubject>();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['subjects'],
    queryFn: () => subjectApi.getAllSubject(),
  });

  const columns: TableColumnsType<TSubject> = [
    {
      title: <p className="text-base font-medium">Tên bộ môn</p>,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: <p className="text-base font-medium">Mã bộ môn</p>,
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: <p className="text-base font-medium">Ngày tạo</p>,
      dataIndex: 'created_at',
      key: 'created_at',
      render: (created_at: string) => <span className="">{formatDate(created_at, 'DD/MM/YYYY')}</span>,
    },
  ];

  return (
    <div className="flex flex-col w-full gap-6">
      <div className="flex items-center justify-between">
        <Button type="primary" size="large" className="!rounded" onClick={() => onOpenModal('add')}>
          Thêm môn học
        </Button>
      </div>

      <Table
        loading={isLoading || isFetching}
        dataSource={data}
        rowKey={record => record.id}
        className="cursor-pointer"
        columns={columns}
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

      {/* <FormExam modalInfo={currentModal} onClose={onCloseModal} /> */}
    </div>
  );
};

export default Subjects;
