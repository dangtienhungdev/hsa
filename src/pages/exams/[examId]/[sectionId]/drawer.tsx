import './style.less';

import { Button, Col, Drawer, Form, InputNumber, Row, message } from 'antd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { cn } from '@/libs/cn';
import { questionApi } from '@/api/questions.api';
import { useEffect } from 'react';

interface DrawerSectionProps {
  open: { visible: boolean; data: any };
  onClose: () => void;
}

const DrawerSection = ({ open, onClose }: DrawerSectionProps) => {
  const { data } = open;

  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const { data: questionDetail } = useQuery({
    queryKey: ['question-detail', data],
    queryFn: () => questionApi.getDetailQuestion(data?.question_id),
    enabled: !!data && !!data?.question_id,
  });
  const question = questionDetail?.question;

  // edit
  const editQuestionMutation = useMutation({
    mutationKey: ['edit-question'],
    mutationFn: (body: any) => questionApi.editQuestion(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['list-questions-by-exam-and-section'] });
      message.success('Thay đổi vị trí thành công!');
      onClose();
    },
    onError: () => {
      message.error('Thay đổi vị trí thất bại!');
    },
  });

  const onSumit = (value: any) => {
    if (question.type === 'single' && question) {
      const optionUpdate = question.options.map((option: any) => ({
        text: option.option_text,
        is_correct: option.is_correct,
      }));

      const dataEdit = {
        ...question,
        label: value.label,
        ordering: value.ordering,
        options: optionUpdate,
      };

      editQuestionMutation.mutate(dataEdit);
    }

    if (question.type === 'input') {
      const dataEdit = {
        ...question,
        ordering: value.ordering,
      };

      editQuestionMutation.mutate(dataEdit);
    }
  };

  useEffect(() => {
    if (question) {
      form.setFieldsValue({
        label: question.label,
        ordering: question.ordering,
      });
    }
  }, [form, question]);

  return (
    <Drawer title={'Câu hỏi chi tiết'} placement="right" onClose={onClose} open={open.visible} width={700}>
      <Form onFinish={onSumit} form={form} layout="vertical" className="!h-[calc(100vh_-_24px_-_126px)]">
        <Row className={cn('!mb-6', { '!hidden': data?.type === 'group' })} gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item name="ordering" className="!mb-0" label="Thứ tự câu hỏi" rules={[{ required: true }]}>
              <InputNumber min={0} max={51} className="!w-full" size="large" />
            </Form.Item>
          </Col>
        </Row>

        <p className="flex items-start !mb-0 gap-2 text-base">
          <span className="mb-0 font-semibold whitespace-nowrap">Câu hỏi: {question?.label}</span>
          <span
            className="mb-0 italic"
            dangerouslySetInnerHTML={{
              __html:
                question?.content_question_group ||
                question?.question ||
                question?.name ||
                data?.content_question_group,
            }}
          />
        </p>

        {question?.type === 'single' && (
          <div className="">
            {question?.options &&
              question?.options.length > 0 &&
              question?.options.map((option: any, index: number) => {
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

        {question?.type === 'input' && (
          <div className="flex items-center w-full gap-2 mt-4 bg-yellow-200">
            <p
              className={cn('flex items-center gap-2 px-2 p-1 rounded')}
              dangerouslySetInnerHTML={{
                __html: question?.correct_answer,
              }}
            ></p>
            <span className="">(Đáp án đúng)</span>
          </div>
        )}

        {data?.type === 'group' &&
          data?.group_questions &&
          data?.group_questions.length > 0 &&
          data?.group_questions?.map((item: any, index: number) => {
            if (item?.type === 'single') {
              return (
                <div className="mt-6" key={item.question_id}>
                  <p className="flex items-start !mb-0 gap-2 text-base">
                    <span className="mb-0 font-semibold whitespace-nowrap">Câu hỏi phụ: {index + 1}</span>
                    <span
                      className="mb-0 italic"
                      dangerouslySetInnerHTML={{
                        __html: item?.content_question_group || item?.question || item?.name,
                      }}
                    />
                  </p>
                  <div className="">
                    {item?.options &&
                      item?.options.length > 0 &&
                      item?.options.map((option: any, index: number) => {
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
                </div>
              );
            }

            if (item?.type === 'input') {
              return (
                <div className="mt-6" key={item.question_id}>
                  <p className="flex items-start !mb-0 gap-2 text-base">
                    <span className="mb-0 font-semibold whitespace-nowrap">Câu hỏi phụ: {index + 1}</span>
                    <span
                      className="mb-0 italic"
                      dangerouslySetInnerHTML={{
                        __html: item?.content_question_group || item?.question || item?.name,
                      }}
                    />
                  </p>
                  <div className="flex items-center w-full gap-2 mt-4 bg-yellow-200">
                    <p
                      className={cn('flex items-center gap-2 px-2 p-1 rounded')}
                      dangerouslySetInnerHTML={{
                        __html: item?.correct_answer,
                      }}
                    ></p>
                    <span className="">(Đáp án đúng)</span>
                  </div>
                </div>
              );
            }
          })}

        {question?.type === 'group' && (
          <div className="pl-2 mt-3">
            {question?.group_questions &&
              question?.group_questions.length > 0 &&
              question?.group_questions?.map((question: any, index: number) => {
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
      <Row className="mt-auto">
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
