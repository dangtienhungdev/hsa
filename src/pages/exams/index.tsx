import type { TExam } from '@/interface/exam.type';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Table, message } from 'antd';

import { examApi } from '@/api/exam.api';
import { useToggleModal } from '@/hooks/useToggleModal';

import { ColumnExams } from './components/column-exam';
import FormExam from './components/form-exam';

const ExamPage = () => {
  const queryClient = useQueryClient();

  const { currentModal, onCloseModal, onOpenModal } = useToggleModal<TExam>();

  // get all
  const { data, isLoading } = useQuery({
    queryKey: ['exams'],
    queryFn: () => examApi.getExams(),
  });
  const dataExams = data?.data;

  // delete
  const deleteMutation = useMutation({
    mutationKey: ['delete-exams'],
    mutationFn: (id: number) => examApi.deleteExam(id),
    onSuccess: () => {
      message.success('Xoá đề thi thành công!');
      queryClient.invalidateQueries({ queryKey: ['exams'] });
    },
    onError: () => {
      message.error('Xoá đề thi thất bại, thử lại sau!');
    },
  });

  const handleDeleteExam = (id: number) => {
    deleteMutation.mutate(id);
  };

  const columns = ColumnExams({
    onDeleteExam: handleDeleteExam,
    onOpenModal,
    isLoadingDelete: deleteMutation.isPending,
  });

  return (
    <div className="flex flex-col w-full gap-6">
      <div className="flex items-center justify-between">
        <Button type="primary" size="large" className="!rounded" onClick={() => onOpenModal('add')}>
          Thêm đề thi
        </Button>
      </div>

      <Table
        loading={isLoading}
        dataSource={dataExams}
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

      <FormExam modalInfo={currentModal} onClose={onCloseModal} />
    </div>
  );
};

export default ExamPage;
