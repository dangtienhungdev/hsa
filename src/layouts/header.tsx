import { Dropdown, Layout, theme as antTheme } from 'antd';
import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';

import AntdSvg from '@/assets/logo/antd.svg';
import Avator from '@/assets/header/avator.jpeg';
import ReactSvg from '@/assets/logo/react.svg';
import pathUrl from '@/utils/path.util';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const { Header } = Layout;

interface HeaderProps {
  collapsed: boolean;
  toggle: () => void;
}

type Action = 'userInfo' | 'userSetting' | 'logout';

const HeaderComponent = ({ collapsed, toggle }: HeaderProps) => {
  const { logged, device } = useSelector(state => state.user);
  const navigate = useNavigate();
  const token = antTheme.useToken();

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
    <Header className="layout-page-header bg-2" style={{ backgroundColor: token.token.colorBgContainer }}>
      {device !== 'MOBILE' && (
        <div className="logo" style={{ width: collapsed ? 80 : 200 }}>
          <img src={ReactSvg} alt="" style={{ marginRight: collapsed ? '2px' : '20px' }} />
          <img src={AntdSvg} alt="" />
        </div>
      )}
      <div className="layout-page-header-main">
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
