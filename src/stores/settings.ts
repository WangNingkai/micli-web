import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

interface IBasicSetting {
  darkMode: boolean
}

class Settings {
  basicSetting: IBasicSetting = {
    darkMode: false,
  }
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
    makePersistable(this, {
      name: 'SettingStore',
      properties: ['basicSetting'],
      storage: window.localStorage,
    })
  }

  setSetting(setting: IBasicSetting) {
    this.basicSetting = setting
  }
}

const settingStore = new Settings()

export default settingStore
