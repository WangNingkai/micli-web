import {
  CodeOutlined,
  SettingOutlined,
  InteractionOutlined,
} from '@ant-design/icons'

export default {
  route: {
    path: '/',
    routes: [
      {
        path: '/command',
        name: 'Hack 命令',
        icon: <CodeOutlined />,
      },
      {
        name: '高级对话',
        path: '/chat',
        routes: [
          {
            name: '对话设置',
            icon: <InteractionOutlined />,
            path: '/chat',
          },
        ],
      },
      {
        name: '设置',
        path: '/setting',
        icon: <SettingOutlined />,
      },
    ],
  },
  location: {
    pathname: '/',
  },
  title: 'Hack Mi',
}
