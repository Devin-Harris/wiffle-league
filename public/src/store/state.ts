import { reactive } from "@vue/reactivity"
import { IToast } from '@/interfaces/IToast'

export default reactive({
  isLoggedIn: false,
  loggedInPlayer: {},
  accessToken: '',
  globalToast: {} as IToast,
  currentLeagueName: '',
  currentPlayerName: '',
  currentGameName: '',
  isUsingMockData: false,
  mockOverride: true,
  webSocketConnection: null as any
})