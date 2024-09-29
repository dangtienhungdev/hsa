import type { TModal } from '@/interface/common.type';
import type { TBodyExam, TExam } from '@/interface/exam.type';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Col, Form, Input, Modal, Row, Space, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useEffect, useState } from 'react';

import { examApi } from '@/api/exam.api';
import Editor from '@/components/ckeditor';
import { generateExamCode } from '@/utils/generate-exam-code';

interface FormExamProps {
  modalInfo: TModal<TExam>;
  onClose: () => void;
}

const FormExam = ({ modalInfo, onClose }: FormExamProps) => {
  const queryClient = useQueryClient();
  const { currentData, type, visiable } = modalInfo;
  const [desc, setDesc] = useState<string>('');

  // thêm mới đề thi
  const createExamMutation = useMutation({
    mutationKey: ['create-exam'],
    mutationFn: (body: Omit<TBodyExam, 'id'>) => examApi.createExam(body),
    onSuccess: () => {
      onClose();
      message.success('Thêm mới đề thi thành công!');
      queryClient.invalidateQueries({ queryKey: ['exams'] });
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

  const [form] = useForm();

  const onFinish = (data: Omit<TBodyExam, 'id'>) => {
    if (type === 'add') {
      createExamMutation.mutate(data);
    }
  };

  const handleCloseForm = () => {
    onClose();
    form.resetFields();
  };

  useEffect(() => {
    if (currentData) {
      form.setFieldsValue({
        name: currentData.name || '',
        code: currentData.code || '',
        description: currentData.description || '', // Đảm bảo description là chuỗi hợp lệ
      });
    } else {
      form.resetFields();
    }
  }, [form, currentData]);

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
          <Col span={24}>
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
              className="!mb-0"
            >
              <Editor
                value={desc || ''} // Đảm bảo rằng giá trị truyền vào CKEditor luôn là chuỗi
                setValue={newValue => {
                  setDesc(newValue);
                  form.setFieldsValue({
                    description: newValue,
                  });
                }}
              />
              {/* <Input placeholder={'Mô tả đề thi'} className="!rounded w-full !h-[42px]" size="large" /> */}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default FormExam;
