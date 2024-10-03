import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';

import Avator from '@/assets/header/avator.jpeg';
import AntdSvg from '@/assets/logo/antd.svg';
import ReactSvg from '@/assets/logo/react.svg';
import { useAuthContext } from '@/contexts/auth.context';
import { clearLS } from '@/utils/auth.util';
import pathUrl from '@/utils/path.util';

const { Header } = Layout;

interface HeaderProps {
  collapsed: boolean;
  toggle: () => void;
}

const HeaderComponent = ({ collapsed, toggle }: HeaderProps) => {
  const { isAuthenticated } = useAuthContext();

  const navigate = useNavigate();
  // const queryClient = useQueryClient();

  // const logoutMutation = useMutation({
  //   mutationFn: () => userApi.logout(),
  //   onSuccess: () => {
  //     setIsAuthenticated(false);
  //     queryClient.removeQueries();
  //     clearLS();
  //   },
  // });

  const handleLogout = () => {
    // logoutMutation.mutate();
    clearLS();
    navigate(pathUrl.login);
    window.location.href = pathUrl.login;
  };

  return (
    <Header className="!bg-white layout-page-header">
      <div className="logo" style={{ width: collapsed ? 80 : 200 }}>
        <img src={ReactSvg} alt="" style={{ marginRight: collapsed ? '2px' : '20px' }} />
        <img src={AntdSvg} alt="" />
      </div>
      <div className="layout-page-header-main !bg-white">
        <button onClick={toggle}>
          <span id="sidebar-trigger">{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}</span>
        </button>
        <div className="actions">
          {isAuthenticated ? (
            <Dropdown
              menu={{
                items: [
                  {
                    key: '1',
                    icon: <UserOutlined />,
                    label: <button onClick={() => navigate(pathUrl.exams)}>Profile</button>,
                  },
                  {
                    key: '2',
                    icon: <LogoutOutlined />,
                    label: <button onClick={() => handleLogout()}>Đăng xuất</button>,
                  },
                ],
              }}
            >
              <button className="user-action">
                <img src={Avator} className="user-avator !rounded-full" alt="avator" />
              </button>
            </Dropdown>
          ) : (
            <button style={{ cursor: 'pointer' }} onClick={() => navigate({ pathname: pathUrl.login })}>
              Đăng nhập
            </button>
          )}
        </div>
      </div>
    </Header>
  );
};

export default HeaderComponent;
