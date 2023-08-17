import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'
interface IUser {
  remember: boolean
  isLogined: boolean
  password?: string
}
class App {
  user: IUser = {
    remember: false,
    isLogined: false,
    password: '',
  }
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
    makePersistable(this, {
      name: 'AppStore',
      properties: ['user'],
      storage: window.localStorage,
    })
  }

  setUser(bucket: IUser) {
    this.user = bucket
  }

  userLogut() {
    if (this.user.remember) {
      this.user = {
        remember: true,
        isLogined: false,
        password: this.user.password,
      }
      return
    }
    this.user = {
      remember: false,
      isLogined: false,
    }
  }
}

const appStore = new App()

export default appStore
