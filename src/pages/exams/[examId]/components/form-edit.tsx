import { Col, Form, Modal, Row } from 'antd';
import { useEffect, useState } from 'react';

import Editor from '@/components/ckeditor';

interface Props {
  isOpenModal: boolean;
  question: any;
  onClose: () => void;
}

const FormEdit = ({ isOpenModal, question, onClose }: Props) => {
  console.log('🚀 ~ FormEdit ~ question:', question);

  const [form] = Form.useForm();

  // dạng tên câu hỏi
  const [nameQuestion, setNameQuestion] = useState<string>('');
  // dang đáp án cẩu hỏi trắc nghiệm
  const [options, setOptions] = useState<string[]>([]);
  // dạng câu hỏi input
  const [inputAnswer, setInputAnswer] = useState<string>('');
  // dang câu hỏi group
  const [optionGroups, setOptionGroups] = useState<string[]>([]);

  useEffect(() => {
    if (question) {
      form.setFieldsValue({
        name: question.question,
      });
      setNameQuestion(question.question);
    }
  }, [question, form]);

  return (
    <Modal
      title={`Sửa câu hỏi`}
      open={isOpenModal}
      // onOk={() => form.submit()}
      onCancel={() => onClose()}
      width={'95vw'}
      style={{
        top: '30px',
      }}
      bodyStyle={{
        height: '80vh',
      }}
    >
      <Form
        className="w-full h-full overflow-y-scroll scrollbar-hide"
        form={form}
        layout="vertical"
        autoComplete="off"
        // onFinish={onSubmit}
      >
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Row gutter={[24, 24]}>
              <Col span={24}>
                <Form.Item
                  name={'name'}
                  label={'Tên câu hỏi'}
                  rules={[{ required: true, message: 'Tên câu hỏi là bắt buộc!' }]}
                  className="!mb-0"
                >
                  <Editor
                    value={nameQuestion}
                    setValue={newValue => {
                      setNameQuestion(newValue);
                      form.setFieldsValue({ name: newValue });
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default FormEdit;
