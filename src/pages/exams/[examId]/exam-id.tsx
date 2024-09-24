import type { TabsProps } from 'antd';

import { Col, Row, Tabs } from 'antd';

import ContentExam from './components';

const ExamId = () => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Tư duy định lượng (Toán học)',
      children: <ContentExam />,
    },
    {
      key: '2',
      label: 'Tư duy định tính (Văn học)',
      children: 'Content of Tab Pane 2',
    },
    {
      key: '3',
      label: 'Tổ hợp Lý Hoá Sinh',
      children: 'Content of Tab Pane 3',
    },
  ];

  return (
    <Row gutter={[16, 16]} className="h-full">
      <Col span={12}>
        <div className="border border-gray-100 shadow !rounded-md bg-white h-full">
          <Tabs defaultActiveKey="1" items={items} />
        </div>
      </Col>
      <Col span={12}>
        <div className="border border-gray-100 shadow !rounded-md bg-white p-6 h-full">
          <h2 className="text-lg font-medium">Danh sách câu hỏi</h2>
        </div>
      </Col>
    </Row>
  );
};

export default ExamId;
