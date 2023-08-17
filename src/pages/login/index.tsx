import { LockOutlined } from '@ant-design/icons'
import {
  LoginForm,
  ProFormCheckbox,
  ProFormText,
  ProConfigProvider,
} from '@ant-design/pro-components'
import { message } from 'antd'
import appStore from '@/stores/app'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { waitTime } from '@/utils'
const Login = observer(() => {
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()
  const user = appStore.user
  const handleSubmit = async (values: any) => {
    values.isLogined = true
    appStore.setUser(values)
    messageApi.success('登录成功')
    await waitTime(500)
    navigate('/')
  }
  return (
    <ProConfigProvider hashed={false}>
      {contextHolder}
      <div
        style={{
          backgroundColor: 'white',
          height: '100vh',
          paddingTop: '10vh',
        }}
      >
        <LoginForm
          title="MiCLI"
          subTitle="Hack mi"
          initialValues={user}
          onFinish={async (values) => {
            handleSubmit(values)
          }}
        >
          <>
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />,
              }}
              placeholder={'请输入管理密码！'}
              rules={[
                {
                  required: true,
                  message: '请输入管理密码！',
                },
              ]}
            />
          </>
          <div
            style={{
              marginBlockEnd: 24,
            }}
          >
            <ProFormCheckbox noStyle name="remember">
              记住登录
            </ProFormCheckbox>
          </div>
        </LoginForm>
      </div>
    </ProConfigProvider>
  )
})
export default Login
