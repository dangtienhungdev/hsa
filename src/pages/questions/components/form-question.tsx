import type { TModal } from '@/interface/common.type';
import type { TQuestion } from '@/interface/question.type';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Col, Form, Modal, Row, Select, Space, Switch } from 'antd';
import { useState } from 'react';

import { subjectApi } from '@/api/subject.api';
import Editor from '@/components/ckeditor';

interface FormQuestionProps {
  modalInfo: TModal<TQuestion>;
  onClose: () => void;
}

const FormQuestion = ({ modalInfo, onClose }: FormQuestionProps) => {
  const queryClient = useQueryClient();
  const { currentData, type, visiable } = modalInfo;

  const [form] = Form.useForm();

  const [nameQuestion, setNameQuestion] = useState<string>('');

  // data subject
  const { data: dataSubjects } = useQuery({
    queryKey: ['subjects'],
    queryFn: () => subjectApi.getAllSubject(),
    enabled: visiable,
  });

  return (
    <Modal
      title={type === 'add' ? 'Thêm câu hỏi' : 'Sửa câu hỏi'}
      width={1200}
      // open={visiable}
      open={true}
      onOk={() => form.submit()}
      onCancel={onClose}
      footer={
        <Space align="center" className="!flex-1 w-full flex items-center justify-center">
          <Button danger className="!rounded md:min-w-[120px] w-full !h-[42px]" size="large" type="default">
            Đóng
          </Button>
          <Button
            key="submit"
            htmlType="submit"
            className="!rounded md:min-w-[120px] !h-[42px]"
            size="large"
            onClick={() => form.submit()}
            type="primary"
          >
            Tạo câu hỏi
          </Button>
        </Space>
      }
    >
      <Form form={form} layout="vertical" autoComplete="off" name="dynamic_form_item">
        <Form.Item
          name={'name'}
          label={'Tên câu hỏi'}
          rules={[{ required: true, message: 'Tên câu hỏi là bắt buộc!', whitespace: true }]}
        >
          <Editor value={nameQuestion} setValue={setNameQuestion} />
        </Form.Item>

        <Row gutter={[24, 24]}>
          <Col span={12}>
            <Form.Item
              name={'type'}
              label={'Dạng câu hỏi'}
              rules={[{ required: true, message: 'Dạng câu hỏi là bắt buộc!' }]}
            >
              <Select
                defaultValue="single"
                size="large"
                className="w-full"
                options={[
                  {
                    value: 'single',
                    label: 'Câu hỏi trắc nghiệm',
                  },
                  {
                    value: 'input',
                    label: 'Câu hỏi điền trả lời',
                  },
                  {
                    value: 'group',
                    label: 'Câu hỏi group',
                  },
                ]}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name={'subject_id'}
              label={'Câu hỏi bộ môn'}
              rules={[{ required: true, message: 'Bộ môn của câu hỏi là bắt buộc!' }]}
            >
              <Select
                size="large"
                className="w-full"
                options={dataSubjects?.map(subject => ({
                  value: subject.id,
                  label: subject.name,
                }))}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.List name="options" initialValue={[{}, {}, {}, {}]}>
          {fields => {
            console.log('🚀 ~ FormQuestion ~ fields:', fields);

            return (
              <>
                {fields.map(({ key, name, ...restField }) => {
                  return (
                    <Row gutter={24} key={key}>
                      <Col span={20}>
                        <Form.Item
                          label={'Nội dung đáp án'}
                          className="!mb-0"
                          {...restField}
                          name={[name, 'text']}
                          rules={[{ required: true, message: 'Đáp án là bắt buộc!' }]}
                        >
                          {/* <Input placeholder="First Name" /> */}
                          <Editor value={nameQuestion} setValue={setNameQuestion} />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item
                          label={'Đáp án'}
                          className="!mb-0"
                          {...restField}
                          name={[name, 'is_correct']}
                          rules={[{ required: true, message: 'Đáp án là bắt buộc!' }]}
                        >
                          <Switch />
                        </Form.Item>
                      </Col>
                    </Row>
                  );
                })}
              </>
            );
          }}
        </Form.List>
      </Form>
    </Modal>
  );
};

export default FormQuestion;
