import {
  ProCard,
  ProForm,
  ProFormDependency,
  ProFormGroup,
  ProFormInstance,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-components'
import { App } from 'antd'
import { useRef } from 'react'
const Command = () => {
  const { message } = App.useApp()
  const formRef = useRef<
    ProFormInstance<{
      status: boolean
      model: string
      sk: string
      base: string
      stream: boolean
      keyword: string
      end_keyword: string
    }>
  >()

  const handleFormChange = (changeValues: unknown) => {
    console.log(changeValues)
    formRef.current?.validateFieldsReturnFormatValue?.().then((values) => {
      console.log(values)
      message.success('保存成功')
    })
  }
  return (
    <ProCard>
      <ProForm<{
        status: boolean
        model: string
        sk: string
        base: string
        stream: boolean
        keyword: string
        end_keyword: string
      }>
        formRef={formRef}
        formKey="setting-form"
        autoFocusFirstInput
        initialValues={{
          status: false,
          model: 'gpt3.5-turbo',
          sk: '',
          base: '',
        }}
        request={async () => {
          return {
            status: false,
            model: 'gpt3.5-turbo',
            sk: '',
            base: '',
            stream: false,
            keyword: '',
            end_keyword: '',
          }
        }}
        onFinish={async (values) => handleFormChange(values)}
      >
        <ProFormSwitch
          name="status"
          label="开启高级对话"
          checkedChildren="OFF"
          unCheckedChildren="ON"
          fieldProps={{
            onChange: (checked) => handleFormChange({ status: checked }),
          }}
        />

        <ProFormDependency name={['status']}>
          {({ status }) => {
            if (status === true) {
              return (
                <>
                  <ProFormGroup>
                    <ProFormText.Password
                      width="md"
                      name="sk"
                      label="OpenAI API key"
                    />
                    <ProFormSelect.SearchSelect
                      name="model"
                      label="选择模型"
                      width="md"
                      debounceTime={300}
                      request={async ({ keyWords = '' }) => {
                        return [
                          { label: 'gpt4', value: 'gpt4' },
                          { label: 'gpt4-0314', value: 'gpt4-0314' },
                          { label: 'gpt4-0613', value: 'gpt4-0613' },
                          { label: 'gpt4-32k', value: 'gpt4-32k' },
                          { label: 'gpt4-32k-0314', value: 'gpt4-32k-0314' },
                          { label: 'gpt4-32k-0613', value: 'gpt4-32k-0613' },
                          { label: 'gpt3.5-turbo', value: 'gpt3.5-turbo' },
                          {
                            label: 'gpt3.5-turbo-0301',
                            value: 'gpt3.5-turbo-0301',
                          },
                          {
                            label: 'gpt3.5-turbo-0613',
                            value: 'gpt3.5-turbo-0613',
                          },
                          {
                            label: 'gpt3.5-turbo-16k',
                            value: 'gpt3.5-turbo-16k',
                          },
                          {
                            label: 'gpt3.5-turbo-16k-0613',
                            value: 'gpt3.5-turbo-16k-0613',
                          },
                        ].filter(({ value, label }) => {
                          return (
                            value.includes(keyWords) || label.includes(keyWords)
                          )
                        })
                      }}
                    />
                    <ProFormText width="md" name="base" label="接口地址" />
                  </ProFormGroup>
                  <ProFormGroup>
                    <ProFormText
                      width="md"
                      name="keyword"
                      label="开启关键词"
                      help="唤起高级对话关键词"
                    />
                    <ProFormText
                      width="md"
                      name="end_keyword"
                      label="结束关键词"
                      help="结束高级对话关键词"
                    />
                  </ProFormGroup>
                  <ProFormGroup>
                    <ProFormSwitch
                      name="useEdgeTTS"
                      label="开启本地语音合成"
                      checkedChildren="OFF"
                      unCheckedChildren="ON"
                      fieldProps={{
                        onChange: (checked) =>
                          handleFormChange({ useEdgeTTS: checked }),
                      }}
                    />
                    <ProFormDependency name={['useEdgeTTS']}>
                      {({ useEdgeTTS }) => {
                        if (useEdgeTTS === true) {
                          return (
                            <ProFormSelect.SearchSelect
                              name="edgeTTSVoice"
                              label="选择语音合成模型"
                              width="md"
                              debounceTime={300}
                              request={async ({ keyWords = '' }) => {
                                return [
                                  { label: 'gpt4', value: 'gpt4' },
                                ].filter(({ value, label }) => {
                                  return (
                                    value.includes(keyWords) ||
                                    label.includes(keyWords)
                                  )
                                })
                              }}
                            />
                          )
                        }
                      }}
                    </ProFormDependency>
                  </ProFormGroup>
                  <ProFormSwitch
                    name="stream"
                    label="开启流式对话"
                    checkedChildren="OFF"
                    unCheckedChildren="ON"
                    fieldProps={{
                      onChange: (checked) =>
                        handleFormChange({ stream: checked }),
                    }}
                  />
                  <ProFormSwitch
                    name="mute"
                    label="阻断小爱回答"
                    checkedChildren="OFF"
                    unCheckedChildren="ON"
                    fieldProps={{
                      onChange: (checked) =>
                        handleFormChange({ mute: checked }),
                    }}
                  />
                </>
              )
            }
          }}
        </ProFormDependency>
      </ProForm>
    </ProCard>
  )
}
export default Command
