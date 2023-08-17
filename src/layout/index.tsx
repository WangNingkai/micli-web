import {
  InfoCircleFilled,
  CloseCircleFilled,
  SettingFilled,
} from '@ant-design/icons'
import type { ProSettings } from '@ant-design/pro-components'
import ErrorBoundary from 'antd/es/alert/ErrorBoundary'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import {
  PageContainer,
  ProLayout,
  ProConfigProvider,
} from '@ant-design/pro-components'
import { observer } from 'mobx-react-lite'
import settingStore from '@/stores/settings'
import appStore from '@/stores/app'
import { FloatButton, App } from 'antd'
import props from './_props'
import logo from '@/assets/logo.png'

const Layout = observer(() => {
  const navigate = useNavigate()
  const darkMode = settingStore.basicSetting.darkMode
  const settings: Partial<ProSettings> | undefined = {
    layout: 'side',
  }
  const location = useLocation()
  return (
    <ProConfigProvider dark={darkMode}>
      <App>
        <div
          id="pro-layout"
          style={{
            height: '100vh',
          }}
        >
          <ProLayout
            logo={<img src={logo} />}
            breadcrumbRender={false}
            siderWidth={216}
            bgLayoutImgList={[
              {
                src:
                  'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
                left: 85,
                bottom: 100,
                height: '303px',
              },
              {
                src:
                  'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
                bottom: -68,
                right: -45,
                height: '303px',
              },
              {
                src:
                  'https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png',
                bottom: 0,
                left: 0,
                width: '331px',
              },
            ]}
            {...props}
            location={location}
            actionsRender={(props) => {
              if (props.isMobile) return []
              return [
                <InfoCircleFilled key="InfoCircleFilled" />,
                <CloseCircleFilled
                  key="CloseCircleFilled"
                  onClick={() => {
                    appStore.userLogut()
                    navigate('/login')
                  }}
                />,
                <SettingFilled
                  key="SettingFilled"
                  onClick={() => {
                    navigate('/setting')
                  }}
                />,
              ]
            }}
            menuItemRender={(item, dom) => (
              <Link to={item.path || '/command'}>{dom}</Link>
            )}
            {...settings}
            menu={{
              type: 'group',
            }}
          >
            <PageContainer>
              <ErrorBoundary>
                <Outlet />
              </ErrorBoundary>
            </PageContainer>
          </ProLayout>
        </div>
      </App>
      <FloatButton.BackTop />
    </ProConfigProvider>
  )
})

export default Layout
