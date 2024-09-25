import type { TModal } from '@/interface/common.type';
import type { TBodyExam, TExam } from '@/interface/exam.type';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Col, Form, Input, Modal, Row, Space, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useEffect, useState } from 'react';

import { examApi } from '@/api/exam.api';
import { subjectApi } from '@/api/subject.api';
import { generateExamCode } from '@/utils/generate-exam-code';

interface FormExamProps {
  modalInfo: TModal<TExam>;
  onClose: () => void;
}

const FormExam = ({ modalInfo, onClose }: FormExamProps) => {
  const queryClient = useQueryClient();
  const { currentData, type, visiable } = modalInfo;

  // thêm mới đề thi
  const createExamMutation = useMutation({
    mutationKey: ['create-exam'],
    mutationFn: (body: Omit<TBodyExam, 'id'>) => examApi.createExam(body),
    onSuccess: () => {
      message.success('Thêm mới đề thi thành công!');
      queryClient.invalidateQueries({ queryKey: ['exams'] });
      onClose();
      form.resetFields();
    },
    onError: () => {
      message.error('Có lỗi xảy ra, thử lại sau!');
    },
  });

  // edit
  const editExamMutation = useMutation({
    mutationKey: ['edit-exam'],
    mutationFn: (body: TBodyExam) => examApi.editExam(body),
    onSuccess: () => {
      message.success('Cập nhật đề thi thành công!');
      queryClient.invalidateQueries({ queryKey: ['exams'] });
      onClose();
      form.resetFields();
    },
    onError: () => {
      message.error('Có lỗi xảy ra vui lòng thử lại!');
    },
  });

  // get data subject
  const {
    data: dataSubject,
    isLoading: isLoadingSubject,
    isFetching: isFetchingSubject,
  } = useQuery({
    queryKey: ['subjects'],
    queryFn: () => subjectApi.getAllSubject(),
  });

  const [form] = useForm();

  const onFinish = (data: Omit<TBodyExam, 'id'>) => {
    if (type === 'add') {
      createExamMutation.mutate(data);
    }

    // if (type === 'edit') {
    //   editExamMutation.mutate({ ...data, id: currentData?.id as number });
    // }
  };

  const handleCloseForm = () => {
    onClose();
    form.resetFields();
  };

  useEffect(() => {
    if (currentData) {
      form.setFieldsValue({
        name: currentData.name,
        code: currentData.code,
        description: currentData.description,
      });
    }
  }, [form, currentData]);

  const [selectSubjects, setSelectSubjects] = useState<number[]>([]);

  const onChangeChecked = (checkedValues: number[]) => {
    if (checkedValues.length > 3) {
      message.error('Bạn chỉ được chọn tổ hợp 3 môn học!');

      return;
    }

    setSelectSubjects(checkedValues);
  };

  return (
    <Modal
      title={type === 'add' ? 'Thêm đề thi' : 'Sửa đề thi'}
      width={800}
      open={visiable}
      onOk={() => form.submit()}
      onCancel={handleCloseForm}
      footer={
        <Space align="center" className="!flex-1 w-full flex items-center justify-center">
          <Button
            danger
            className="!rounded md:min-w-[120px] w-full !h-[42px]"
            size="large"
            type="default"
            onClick={handleCloseForm}
          >
            Đóng đề thi
          </Button>
          <Button
            key="submit"
            htmlType="submit"
            disabled={createExamMutation.isLoading}
            loading={createExamMutation.isLoading}
            className="!rounded md:min-w-[120px] !h-[42px]"
            size="large"
            onClick={() => form.submit()}
            type="primary"
          >
            Tạo đề thi
          </Button>
        </Space>
      }
    >
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
        initialValues={{
          code: generateExamCode(),
        }}
      >
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              name={'name'}
              label={'Tên đề thi'}
              rules={[{ required: true, message: 'Tên đề thi là bắt buộc!', whitespace: true }]}
            >
              <Input placeholder={'Tên đề thi'} className="!rounded w-full !h-[42px]" size="large" />
            </Form.Item>
            <Form.Item
              name={'code'}
              label={'Mã đề thi'}
              rules={[{ required: true, message: 'Mã đề thi là bắt buộc!', whitespace: true }]}
            >
              <Input placeholder={'Mã đề thi'} className="!rounded w-full !h-[42px]" size="large" />
            </Form.Item>
            <Form.Item
              name={'description'}
              label={'Mô tả đề thi'}
              rules={[{ required: true, message: 'Mô tả đề thi là bắt buộc!', whitespace: true }]}
            >
              <Input placeholder={'Mô tả đề thi'} className="!rounded w-full !h-[42px]" size="large" />
            </Form.Item>
          </Col>
          {/* <Col span={12} className="h-[300px] overflow-y-scroll">
            <Form.Item
              name={'subject_ids'}
              label={'Tổ hợp đề thi'}
              rules={[{ required: true, message: 'Chọn tổ hợp môn!' }]}
            >
              <Checkbox.Group style={{ width: '100%' }} onChange={e => onChangeChecked(e)}>
                {dataSubject?.map(item => (
                  <section className="flex items-center justify-between w-full" key={item.id}>
                    <Checkbox value={item.id} className="flex-1">
                      {item.name}
                    </Checkbox>
                  </section>
                ))}
              </Checkbox.Group>
            </Form.Item>
          </Col> */}
        </Row>
      </Form>
    </Modal>
  );
};

export default FormExam;
