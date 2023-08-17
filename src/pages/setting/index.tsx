import { ProFormInstance } from '@ant-design/pro-components'
import { ProForm, ProFormSwitch, ProCard } from '@ant-design/pro-components'
import { App } from 'antd'
import { useRef } from 'react'
import settingStore from '@/stores/settings'

const Setting = () => {
  const { message } = App.useApp()
  const formRef = useRef<
    ProFormInstance<{
      darkMode: boolean
    }>
  >()
  const basicSetting = settingStore.basicSetting

  const handleFormChange = (changeValues: unknown) => {
    console.log(changeValues)
    formRef.current?.validateFieldsReturnFormatValue?.().then((values) => {
      const { darkMode } = values
      settingStore.setSetting({
        darkMode,
      })
      message.success('保存成功')
    })
  }

  return (
    <ProCard>
      <ProForm<{
        darkMode: boolean
      }>
        formRef={formRef}
        formKey="setting-form"
        autoFocusFirstInput
        initialValues={{
          ...basicSetting,
        }}
        request={async () => {
          return {
            ...basicSetting,
          }
        }}
        onFinish={async (values) => handleFormChange(values)}
      >
        <ProFormSwitch
          name="darkMode"
          label="黑夜模式"
          checkedChildren="🌜"
          unCheckedChildren="🌞"
          fieldProps={{
            onChange: (checked) => handleFormChange({ darkMode: checked }),
          }}
        />
      </ProForm>
    </ProCard>
  )
}

export default Setting
