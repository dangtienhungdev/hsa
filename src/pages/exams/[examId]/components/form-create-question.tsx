import type { QuestionType, TQuestionInput, TQuestionSingle } from '@/interface/question.type';

import { useMutation } from '@tanstack/react-query';
import { Button, Col, Form, message, Modal, Row, Select, Switch } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { questionApi } from '@/api/questions.api';
import Editor from '@/components/ckeditor';
import { useQueryParams } from '@/hooks/useQueryParams';

interface FormCreateQuestionProps {
  isOpenModal: boolean;
  onClose: () => void;
}

const FormCreateQuestion = ({ onClose, isOpenModal }: FormCreateQuestionProps) => {
  const { examId } = useParams();
  const [form] = Form.useForm();
  const params = useQueryParams();
  const { subject } = params;

  // create question signle
  const createQuestion = useMutation({
    mutationKey: ['create-question'],
    mutationFn: (body: TQuestionSingle | TQuestionInput) => questionApi.createQuestion(body),
    onSuccess: () => {
      message.success('Thêm mới câu hỏi thành công!');
      setOptions([]);
      setNameQuestion('');
    },
    onError: () => {
      message.error('Thêm mới câu hỏi thất bại!');
    },
  });

  // dạng câu hỏi phụ
  const [questionType, setQuestionType] = useState<QuestionType>('single');

  // dạng tên câu hỏi
  const [nameQuestion, setNameQuestion] = useState<string>('');
  // dang đáp án cẩu hỏi trắc nghiệm
  const [options, setOptions] = useState<string[]>([]);
  // dạng câu hỏi input
  const [inputAnswer, setInputAnswer] = useState<string>('');
  // dang câu hỏi group
  const [optionGroups, setOptionGroups] = useState<string[]>([]);

  // select question type
  const handleSelectQuestionType = (type: QuestionType) => {
    setQuestionType(type);
  };

  const onSubmit = (values: any) => {
    if (questionType === 'input') {
      const data = {
        ...values,
        subject_id: Number(subject),
        is_group: false,
        exam_id: Number(examId),
        correct_answer: values.correct_answer_input,
      };

      createQuestion.mutate(data);
    }

    if (questionType === 'single') {
      const options = (values as TQuestionSingle).options || [];

      // Xử lý options để đảm bảo mỗi option có is_correct
      const updatedOptions = options.map(option => ({
        ...option,
        is_correct: option.is_correct ?? false, // Nếu is_correct là true, giữ nguyên, nếu không có hoặc false thì set false
      }));

      // Thay thế options trong values với updatedOptions
      const updatedValues = {
        ...values,
        subject_id: Number(subject),
        is_group: false,
        exam_id: Number(examId),
        options: updatedOptions,
      };

      const hasCorrectAnswer = updatedOptions.some(option => option.is_correct === true);

      if (!hasCorrectAnswer) {
        // Báo lỗi nếu không có đáp án đúng
        message.error('Bạn chưa chọn đáp án đúng!');

        return;
      }

      // kiểm tra xem option có mấy đáp án đúng
      const checkMutipleOptions = updatedOptions.filter(option => option.is_correct);

      if (checkMutipleOptions.length > 1) {
        message.error('Bạn chỉ được chọn 1 đáp án đúng!');

        return;
      }

      createQuestion.mutate(updatedValues);
    }

    if (questionType === 'group') {
      console.log(values);
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      type: questionType,
    });
  }, [form]);

  return (
    <Modal
      title={`Thêm mới câu hỏi ${subject === '2' ? 'Tư duy định lượng (Toán học)' : 'Tư duy định tính (Văn học)'}`}
      open={isOpenModal}
      onOk={() => form.submit()}
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
        onFinish={onSubmit}
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

              <Col span={12}>
                <Form.Item
                  name={'type'}
                  label={'Dạng câu hỏi'}
                  rules={[{ required: true, message: 'Dạng câu hỏi là bắt buộc!' }]}
                  className="!mb-0"
                >
                  <Select
                    defaultValue={questionType}
                    size="large"
                    className="w-full"
                    onChange={value => handleSelectQuestionType(value as QuestionType)}
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
            </Row>
          </Col>

          {questionType === 'single' && (
            <Col span={24}>
              <Form.List name="options" initialValue={[{}, {}, {}, {}]}>
                {fields => {
                  return (
                    <>
                      {fields.map(({ key, name, ...restField }, index) => {
                        return (
                          <Row gutter={24} key={key}>
                            <Col span={20}>
                              <Form.Item
                                label={'Nội dung đáp án'}
                                className="!mb-6"
                                {...restField}
                                name={[name, 'text']}
                                rules={[{ required: true, message: 'Đáp án là bắt buộc!' }]}
                              >
                                <Editor
                                  value={options && options.length > 0 ? options[index] : ''}
                                  setValue={newValue => {
                                    // Cập nhật giá trị cho từng editor
                                    const updatedOptions: any = [...options];

                                    updatedOptions[index] = newValue;
                                    setOptions(updatedOptions);
                                    // Đồng bộ với form field
                                    form.setFieldsValue({
                                      options: form
                                        .getFieldValue('options')
                                        .map((option: { text: string }, i: number) =>
                                          i === index ? { ...option, text: newValue } : option,
                                        ),
                                    });
                                  }}
                                />
                              </Form.Item>
                            </Col>
                            <Col span={4}>
                              <Form.Item
                                label={'Đáp án'}
                                className="!mb-6"
                                {...restField}
                                name={[name, 'is_correct']}
                                valuePropName="checked"
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
            </Col>
          )}
          {questionType === 'input' && (
            <Col span={24}>
              <Form.Item
                label={'Nội dung đáp án'}
                className="!mb-6"
                name={'correct_answer_input'}
                rules={[{ required: questionType === 'input' ? true : false, message: 'Đáp án là bắt buộc!' }]}
              >
                <Editor
                  value={inputAnswer || ''}
                  setValue={newValue => {
                    setInputAnswer(newValue);
                    form.setFieldsValue({
                      correct_answer_input: newValue,
                    });
                  }}
                />
              </Form.Item>
            </Col>
          )}
          {questionType === 'group' && (
            <Col span={24}>
              <Form.List name="group_questions">
                {(fields, { add, remove }) => {
                  return (
                    <div className="flex flex-col gap-4">
                      {fields.map(({ key, name, ...restField }, index) => (
                        <Row gutter={[24, 24]} key={key} className="bg-gray-300 !rounded p-6">
                          <Col span={24}>
                            <Row gutter={[24, 24]}>
                              <Col span={24}>
                                <Form.Item
                                  {...restField}
                                  name={[name, 'name_group']}
                                  label={'Tên câu hỏi'}
                                  rules={[{ required: true, message: 'Tên câu hỏi là bắt buộc!' }]}
                                  className="!mb-0"
                                >
                                  <Editor
                                    value={optionGroups[index] || ''}
                                    setValue={newValue => {
                                      // Cập nhật giá trị cho từng editor
                                      const updatedOptions: any = [...optionGroups];

                                      updatedOptions[index] = newValue;
                                      setOptionGroups(updatedOptions);

                                      // Đồng bộ với form field
                                      const currentGroupQuestions = form.getFieldValue('group_questions') || [];

                                      currentGroupQuestions[index] = {
                                        ...currentGroupQuestions[index],
                                        name_group: newValue, // Cập nhật giá trị 'name_group'
                                      };

                                      form.setFieldsValue({
                                        group_questions: currentGroupQuestions,
                                      });
                                    }}
                                  />
                                </Form.Item>
                              </Col>

                              <Col span={12}>
                                <Form.Item
                                  {...restField}
                                  name={[name, 'type_group']}
                                  label={'Dạng câu hỏi'}
                                  rules={[{ required: true, message: 'Dạng câu hỏi là bắt buộc!' }]}
                                  className="!mb-0"
                                >
                                  <Select
                                    size="large"
                                    className="w-full"
                                    onChange={value => {
                                      const currentGroupQuestions = form.getFieldValue('group_questions') || [];

                                      currentGroupQuestions[index].type_group = value;
                                      form.setFieldsValue({
                                        group_questions: currentGroupQuestions,
                                      });
                                    }}
                                    options={[
                                      {
                                        value: 'single',
                                        label: 'Câu hỏi trắc nghiệm',
                                      },
                                      {
                                        value: 'input',
                                        label: 'Câu hỏi điền trả lời',
                                      },
                                    ]}
                                  />
                                </Form.Item>
                              </Col>
                            </Row>
                          </Col>

                          {/* Hiển thị dạng câu hỏi dựa trên type_group */}
                          <Col span={24}>
                            {form.getFieldValue(['group_questions', index, 'type_group']) === 'single' && (
                              <Form.List name={[name, 'options']}>
                                {optionFields => {
                                  console.log('🚀 ~ FormCreateQuestion ~ optionFields:', optionFields);

                                  return (
                                    <>
                                      {[{}, {}, {}, {}].map(({ key, name, ...restField }, index) => (
                                        <Row gutter={24} key={index}>
                                          <Col span={20}>
                                            <Form.Item
                                              {...restField}
                                              name={[name, 'text']}
                                              label={'Đáp án'}
                                              rules={[{ required: true, message: 'Đáp án là bắt buộc!' }]}
                                            >
                                              <Editor
                                                value={form.getFieldValue(['group_questions', name, 'text']) || ''}
                                                setValue={newValue => {
                                                  form.setFieldsValue({
                                                    group_questions: form
                                                      .getFieldValue('group_questions')
                                                      .map((item, idx) =>
                                                        idx === name ? { ...item, text: newValue } : item,
                                                      ),
                                                  });
                                                }}
                                              />
                                            </Form.Item>
                                          </Col>
                                          <Col span={4}>
                                            <Form.Item
                                              label={'Đáp án'}
                                              {...restField}
                                              name={[name, 'is_correct']}
                                              valuePropName="checked"
                                            >
                                              <Switch />
                                            </Form.Item>
                                          </Col>
                                        </Row>
                                      ))}
                                    </>
                                  );
                                }}
                              </Form.List>
                            )}
                          </Col>

                          {form.getFieldValue(['group_questions', index, 'type_group']) === 'input' && (
                            <Form.Item
                              {...restField}
                              name={[name, 'input_answer']}
                              label={'Câu trả lời'}
                              rules={[{ required: true, message: 'Câu trả lời là bắt buộc!' }]}
                            >
                              <Editor
                                value={form.getFieldValue(['group_questions', name, 'input_answer']) || ''}
                                setValue={newValue => {
                                  form.setFieldsValue({
                                    group_questions: form
                                      .getFieldValue('group_questions')
                                      .map((item, idx) => (idx === name ? { ...item, input_answer: newValue } : item)),
                                  });
                                }}
                              />
                            </Form.Item>
                          )}
                        </Row>
                      ))}
                      <Form.Item>
                        <Button type="dashed" onClick={() => add()}>
                          Thêm câu hỏi phụ
                        </Button>
                      </Form.Item>
                    </div>
                  );
                }}
              </Form.List>
            </Col>
          )}
        </Row>
      </Form>
    </Modal>
  );
};

export default FormCreateQuestion;
