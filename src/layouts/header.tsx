import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, Layout } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Avator from '@/assets/header/avator.jpeg';
import AntdSvg from '@/assets/logo/antd.svg';
import ReactSvg from '@/assets/logo/react.svg';
import pathUrl from '@/utils/path.util';

const { Header } = Layout;

interface HeaderProps {
  collapsed: boolean;
  toggle: () => void;
}

type Action = 'userInfo' | 'userSetting' | 'logout';

const HeaderComponent = ({ collapsed, toggle }: HeaderProps) => {
  const { logged, device } = useSelector(state => state.user);
  const navigate = useNavigate();

  const onActionClick = async (action: Action) => {
    switch (action) {
      case 'userInfo':
        return;
      case 'userSetting':
        return;
    }
  };

  const toLogin = () => {
    navigate('/login');
  };

  return (
    <Header className="!bg-white layout-page-header">
      {device !== 'MOBILE' && (
        <div className="logo" style={{ width: collapsed ? 80 : 200 }}>
          <img src={ReactSvg} alt="" style={{ marginRight: collapsed ? '2px' : '20px' }} />
          <img src={AntdSvg} alt="" />
        </div>
      )}
      <div className="layout-page-header-main !bg-white">
        <div onClick={toggle}>
          <span id="sidebar-trigger">{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}</span>
        </div>
        <div className="actions">
          {logged ? (
            <Dropdown
              menu={{
                items: [
                  {
                    key: '1',
                    icon: <UserOutlined />,
                    label: <span onClick={() => navigate(pathUrl.questions)}>Profile</span>,
                  },
                  {
                    key: '2',
                    icon: <LogoutOutlined />,
                    label: <span onClick={() => onActionClick('logout')}>Đăng xuất</span>,
                  },
                ],
              }}
            >
              <span className="user-action">
                <img src={Avator} className="user-avator" alt="avator" />
              </span>
            </Dropdown>
          ) : (
            <span style={{ cursor: 'pointer' }} onClick={toLogin}>
              Đăng nhập
            </span>
          )}
        </div>
      </div>
    </Header>
  );
};

export default HeaderComponent;
