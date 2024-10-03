import './style.less';

import { useMutation } from '@tanstack/react-query';
import { Button, Col, Drawer, Form, InputNumber, message, Row } from 'antd';
import { useEffect } from 'react';

import { questionApi } from '@/api/questions.api';
import { cn } from '@/libs/cn';

interface DrawerSectionProps {
  open: { visible: boolean; data: any };
  onClose: () => void;
}

const DrawerSection = ({ open, onClose }: DrawerSectionProps) => {
  const { data } = open;

  console.log('🚀 ~ DrawerSection ~ data:', data);
  const [form] = Form.useForm();

  // edit
  const editQuestionMutation = useMutation({
    mutationKey: ['edit-question'],
    mutationFn: (body: any) => questionApi.editQuestion(body),
    onSuccess: () => {
      message.success('Thay đổi vị trí thành công!');
    },
    onError: () => {
      message.error('Thay đổi vị trí thất bại!');
    },
  });

  const onSumit = (value: any) => {
    console.log(value);

    if (data.type === 'single') {
      const dataEdit = {
        subject_id: 3,
        exam_id: 18,
        name: data.question,
        type: data.type,
        correct_answer: 'Lão Hạc',
        is_group: false,
        label: 45,
        ordering: 45,
      };
    }
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        label: data.label,
        ordering: data.ordering,
      });
    }
  }, [form, data]);

  return (
    <Drawer title={'Câu hỏi chi tiết'} placement="right" onClose={onClose} open={open.visible} width={700}>
      <Form onFinish={onSumit} form={form} layout="vertical" className="!h-[calc(100vh_-_24px_-_126px)]">
        <Row className="!mb-6 !hidden" gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item name="label" label="Câu hỏi số">
              <InputNumber min={0} max={51} className="!w-full" size="large" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="ordering" label="Thứ tự câu hỏi">
              <InputNumber min={0} max={51} className="!w-full" size="large" />
            </Form.Item>
          </Col>
        </Row>

        <p className="flex items-start !mb-0 gap-2 text-lg">
          <span className="mb-0 font-semibold whitespace-nowrap">Câu hỏi: {data?.label}</span>
          <span
            className="mb-0 italic"
            dangerouslySetInnerHTML={{
              __html: data?.content_question_group || data?.question,
            }}
          />
        </p>

        {data?.type === 'single' && (
          <div className="">
            {data?.options &&
              data?.options.length > 0 &&
              data?.options.map((option: any, index: number) => {
                // Tạo mảng các chữ cái A, B, C, D... dựa trên chỉ số
                const alphabet = String.fromCharCode(65 + index);

                return (
                  <p
                    key={option?.option_id}
                    className={cn('flex items-start gap-2 px-2 p-1 rounded', {
                      'bg-yellow-200': option.is_correct === '1',
                    })}
                  >
                    {/* Hiển thị A, B, C, D và nội dung câu hỏi */}
                    <span className="font-semibold">{alphabet}.</span>{' '}
                    <span
                      dangerouslySetInnerHTML={{
                        __html: option?.option_text,
                      }}
                    />
                    {option.is_correct === '1' && <span className="">(Đáp án đúng)</span>}
                  </p>
                );
              })}
          </div>
        )}

        {data?.type === 'input' && (
          <div className="flex items-center w-full gap-2 mt-4 bg-yellow-200">
            <p
              className={cn('flex items-center gap-2 px-2 p-1 rounded')}
              dangerouslySetInnerHTML={{
                __html: data?.correct_answer,
              }}
            ></p>
            <span className="">(Đáp án đúng)</span>
          </div>
        )}

        {data?.type === 'group' && (
          <div className="pl-2 mt-3">
            {data?.group_questions &&
              data?.group_questions.length > 0 &&
              data?.group_questions?.map((question: any, index: number) => {
                const { options } = question;

                return (
                  <div className="mt-3" key={question?.question_id}>
                    <p className="flex items-center !mb-0 gap-2">
                      <span className="mb-0 font-semibold">Câu hỏi {index + 1}:</span>
                      <span
                        className="mb-0"
                        dangerouslySetInnerHTML={{
                          __html: question?.content_question_group || question?.question,
                        }}
                      />
                    </p>

                    <div className="">
                      {options &&
                        options.length > 0 &&
                        options.map((option: any) => {
                          return (
                            <p
                              dangerouslySetInnerHTML={{
                                __html: option?.option_text,
                              }}
                              className={cn({ 'bg-yellow-200': option.is_correct === '1' })}
                              key={option?.option_id}
                            />
                          );
                        })}
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </Form>
      <Row className="mt-auto !hidden">
        <Col span={24} className="!flex items-center justify-end">
          <Button htmlType="button" onClick={() => form.submit()} className="!h-[42px] w-[120px]" type="primary">
            Cập nhật
          </Button>
        </Col>
      </Row>
    </Drawer>
  );
};

export default DrawerSection;
