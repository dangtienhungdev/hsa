import './index.less';

import { Button, Form, Input, message } from 'antd';

import type { LoginParams } from '@/interface/user/login';
import { useAuthContext } from '@/contexts/auth.context';
import { useForm } from 'antd/es/form/Form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { userApi } from '@/api/user.api';

const LoginForm = () => {
  const navigate = useNavigate();
  const [form] = useForm();
  const { setIsAuthenticated } = useAuthContext();

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: (body: FormData) => userApi.login(body),
    onSuccess: (data: any) => {
      console.log('🚀 ~ LoginForm ~ data:', data);
      setIsAuthenticated(true);
      message.success('Đăng nhập thành công!');
      console.log('first');
    },
    onError: () => {
      setIsAuthenticated(false);
      message.error('Đăng nhập thất bại!');
    },
  });

  const onFinished = async (form: LoginParams) => {
    const formData = new FormData();

    formData.append('email', form.email);
    formData.append('password', form.password);

    loginMutation.mutate(formData);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Form<LoginParams> form={form} onFinish={onFinished} className="flex flex-col gap-6">
        <p className="text-2xl font-medium text-center">Đăng nhập</p>

        <div className="flex flex-col gap-6">
          <Form.Item
            name="email"
            rules={[
              {
                whitespace: true,
                required: true,
                type: 'email',
                message: 'Email là bắt buộc!',
              },
            ]}
            className="!mb-0"
          >
            <Input placeholder={'Email'} className="!rounded md:w-[480px] w-full !h-[42px]" size="large" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                whitespace: true,
                message: 'Mật khẩu là bắt buộc',
              },
            ]}
            className="!mb-0"
          >
            <Input.Password placeholder={'Password'} className="!rounded md:w-[480px] w-full !h-[42px]" size="large" />
          </Form.Item>
        </div>

        <Form.Item>
          <Button
            htmlType="submit"
            className="!rounded md:w-[480px] w-full !h-[42px]"
            size="large"
            type="primary"
            loading={loginMutation.isLoading}
            disabled={loginMutation.isLoading}
          >
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
