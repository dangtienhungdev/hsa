import { Col, Form, Row, Switch } from 'antd';
import { useState } from 'react';

import Editor from '@/components/ckeditor';

const QuestionSingle = () => {
  const [nameQuestion, setNameQuestion] = useState<string>('');

  return (
    <Col span={24}>
      <Form.List name="options" initialValue={[{}, {}, {}, {}]}>
        {fields => {
          return (
            <>
              {fields.map(({ key, name, ...restField }) => {
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
                        <Editor value={nameQuestion} setValue={setNameQuestion} />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item label={'Đáp án'} className="!mb-6" {...restField} name={[name, 'is_correct']}>
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
  );
};

export default QuestionSingle;
