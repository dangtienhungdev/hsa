import type { QuestionType, TQuestionSingle } from '@/interface/question.type';

import { useMutation, useQuery } from '@tanstack/react-query';
import { Breadcrumb, Button, Col, Form, Row, Select, Switch, message } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { questionApi } from '@/api/questions.api';
import { subjectApi } from '@/api/subject.api';
import Editor from '@/components/ckeditor';
import pathUrl from '@/utils/path.util';

const CreateQuestion = () => {
  const [form] = Form.useForm();

  const [questionType, setQuestionType] = useState<QuestionType>('single');
  const [nameQuestion, setNameQuestion] = useState<string>('');
  const [options, setOptions] = useState<string[]>([]);

  // create question signle
  const createQuestionSingle = useMutation({
    mutationKey: ['question-single'],
    mutationFn: (body: TQuestionSingle) => questionApi.createQuestionSignle(body),
    onSuccess: () => {
      message.success('Thêm mới câu hỏi thành công!');
      form.resetFields();
      setOptions([]);
      setNameQuestion('');
      setQuestionType('single');
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

  // submit
  const onFinish = (values: TQuestionSingle) => {
    const options = values.options || [];

    // Xử lý options để đảm bảo mỗi option có is_correct
    const updatedOptions = options.map(option => ({
      ...option,
      is_correct: option.is_correct ?? false, // Nếu is_correct là true, giữ nguyên, nếu không có hoặc false thì set false
    }));

    // Thay thế options trong values với updatedOptions
    const updatedValues = {
      ...values,
      is_group: questionType === 'group' ? true : false,
      options: updatedOptions,
    };

    const hasCorrectAnswer = updatedOptions.some(option => option.is_correct === true);

    if (!hasCorrectAnswer) {
      // Báo lỗi nếu không có đáp án đúng
      message.error('Bạn chưa chọn đáp án đúng!');

      return;
    }

    if (questionType === 'single') {
      createQuestionSingle.mutate(updatedValues);
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
      <Row className="!mb-6">
        <Col span={12}>
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
                              value={options[index]}
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
      </Row>
    </Form>
  );
};

export default CreateQuestion;
