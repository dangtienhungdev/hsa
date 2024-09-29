import type { TExam } from '@/interface/exam.type';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Breadcrumb, Button, Col, Row, Table, message } from 'antd';
import { Link } from 'react-router-dom';

import { examApi } from '@/api/exam.api';
import { useToggleModal } from '@/hooks/useToggleModal';
import pathUrl from '@/utils/path.util';

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
    isLoadingDelete: deleteMutation.isLoading,
  });

  return (
    <div className="flex flex-col w-full gap-6">
      <Row className="!mb-6 sticky top-0 right-0 left-0 z-10 bg-0-gray-secondary shadow-sm pb-6">
        <Col span={12} className="!flex !items-center">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to={pathUrl.exams}>Đề thi</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span className="">Danh sách đề thi</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col span={12} className="!flex !justify-end">
          <Button type="primary" size="large" className="!rounded" onClick={() => onOpenModal('add')}>
            Thêm đề thi
          </Button>
        </Col>
      </Row>

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
