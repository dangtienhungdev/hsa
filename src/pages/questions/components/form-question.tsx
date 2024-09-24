import { Button, Form, Input, Modal, Space } from 'antd';

import Editor from '@/components/ckeditor';
import type { TModal } from '@/interface/common.type';
import type { TQuestion } from '@/interface/question.type';
import { useQueryClient } from '@tanstack/react-query';

interface FormQuestionProps {
  modalInfo: TModal<TQuestion>;
  onClose: () => void;
}

const FormQuestion = ({ modalInfo, onClose }: FormQuestionProps) => {
  const queryClient = useQueryClient();
  const { currentData, type, visiable } = modalInfo;

  const [form] = Form.useForm();

  return (
    <Modal
      title={type === 'add' ? 'Thêm đề thi' : 'Sửa đề thi'}
      width={800}
      // open={visiable}
      open={true}
      onOk={() => form.submit()}
      onCancel={onClose}
      footer={
        <Space align="center" className="!flex-1 w-full flex items-center justify-center">
          <Button danger className="!rounded md:min-w-[120px] w-full !h-[42px]" size="large" type="default">
            Đóng đề thi
          </Button>
          <Button
            key="submit"
            htmlType="submit"
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
      <Form form={form} layout="vertical" autoComplete="off">
        <Form.Item
          name={'name'}
          label={'Tên đề thi'}
          rules={[{ required: true, message: 'Tên đề thi là bắt buộc!', whitespace: true }]}
        >
          <Input placeholder={'Tên câu hỏi'} className="!rounded w-full !h-[42px]" size="large" />
        </Form.Item>

        <Form.Item>
          <Editor />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FormQuestion;
