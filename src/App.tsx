import 'dayjs/locale/zh-cn';

import { ConfigProvider } from 'antd';
import { Suspense } from 'react';

import RenderRouter from './routes';

const App: React.FC = () => {
  return (
    <ConfigProvider componentSize="middle">
      <Suspense fallback={null}>
        <RenderRouter />
      </Suspense>
    </ConfigProvider>
  );
};

export default App;
