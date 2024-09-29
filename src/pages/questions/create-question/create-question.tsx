import type { QuestionType, TQuestionInput, TQuestionSingle } from '@/interface/question.type';

import { useMutation, useQuery } from '@tanstack/react-query';
import { Breadcrumb, Button, Col, Form, Input, Row, Select, Switch, message } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { questionApi } from '@/api/questions.api';
import { subjectApi } from '@/api/subject.api';
import Editor from '@/components/ckeditor';
import pathUrl from '@/utils/path.util';

const CreateQuestion = () => {
  const [form] = Form.useForm();

  // subject
  const [subject, setSubject] = useState<{ value: number; label: string }>({ label: '', value: 0 });
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
  const [typeOptionGroup, setTypeOptionGroup] = useState<string[]>([]);

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

  // data subject
  const { data: dataSubjects } = useQuery({
    queryKey: ['subjects'],
    queryFn: () => subjectApi.getAllSubject(),
  });

  // select question type
  const handleSelectQuestionType = (type: QuestionType) => {
    setQuestionType(type);
  };

  // const handle select subject
  const handleSelectSubject = (value: { value: number; label: string }) => {
    setSubject(value);
  };

  // submit
  const onFinish = (values: TQuestionSingle | TQuestionInput) => {
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
        is_group: false,
        options: updatedOptions,
      };

      const hasCorrectAnswer = updatedOptions.some(option => option.is_correct === true);

      if (!hasCorrectAnswer) {
        // Báo lỗi nếu không có đáp án đúng
        message.error('Bạn chưa chọn đáp án đúng!');

        return;
      }

      createQuestion.mutate(updatedValues);
    }

    // submit dang câu hỏi input
    if (questionType === 'input') {
      const data: TQuestionInput = {
        ...values,
        is_group: false,
        correct_answer: (values as any).correct_answer_input,
      };

      createQuestion.mutate(data);
    }

    // submit dang câu hỏi group
    if (questionType === 'group') {
      console.log(values);
    }
  };

  useEffect(() => {
    if (dataSubjects) {
      form.setFieldsValue({
        subject_id: dataSubjects[0].id,
        type: questionType,
      });
    }
  }, [dataSubjects, questionType, form]);

  return (
    <Form
      className="w-full h-full overflow-y-scroll scrollbar-hide"
      form={form}
      layout="vertical"
      autoComplete="off"
      onFinish={onFinish}
    >
      <Row className="!mb-6 sticky top-0 right-0 left-0 z-10 bg-0-gray-secondary shadow-sm pb-6">
        <Col span={12} className="!flex !items-center">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to={pathUrl.questions}>Danh sách câu hỏi</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span className="">Thêm mới câu hỏi</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col span={12} className="!flex !justify-end">
          <Button className="!h-10" type="primary" onClick={() => form.submit()}>
            Thêm câu hỏi
          </Button>
        </Col>
      </Row>

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

            <Col span={12}>
              <Form.Item
                name={'subject_id'}
                label={'Câu hỏi bộ môn'}
                rules={[{ required: true, message: 'Bộ môn của câu hỏi là bắt buộc!' }]}
                className="!mb-0"
              >
                <Select
                  size="large"
                  onChange={(_, subject) => handleSelectSubject(subject as any)}
                  className="w-full"
                  options={dataSubjects?.map(subject => ({
                    value: subject.id,
                    label: subject.name,
                  }))}
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
                  <>
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
                                  // onChange={value => handleSelectQuestionType(value as QuestionType)}
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
                        <Form.Item
                          {...restField}
                          name={[name, 'first']}
                          rules={[{ required: true, message: 'Missing first name' }]}
                        >
                          <Input placeholder="First Name" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'last']}
                          rules={[{ required: true, message: 'Missing last name' }]}
                        >
                          <Input placeholder="Last Name" />
                        </Form.Item>
                      </Row>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()}>
                        Add field
                      </Button>
                    </Form.Item>
                  </>
                );
              }}
            </Form.List>
          </Col>
        )}
      </Row>
    </Form>
  );
};

export default CreateQuestion;
