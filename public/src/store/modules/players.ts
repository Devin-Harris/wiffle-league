import api from '@/api/api'

export const PlayerActions = {
  fetchPlayerStatsTableColumns() {
    return [
      { columnLabel: 'Hits', columnName: 'hits', maxWidth: 'unset', isHidden: false },
      { columnLabel: '1B', columnName: 'singles', maxWidth: 'unset', isHidden: false },
      { columnLabel: '2B', columnName: 'doubles', maxWidth: 'unset', isHidden: false },
      { columnLabel: '3B', columnName: 'triples', maxWidth: 'unset', isHidden: false },
      { columnLabel: 'HR', columnName: 'homeruns', maxWidth: 'unset', isHidden: false },
      { columnLabel: 'At Bats', columnName: 'at_bats', maxWidth: 'unset', isHidden: false },
      { columnLabel: 'Games', columnName: 'games', maxWidth: 'unset', isHidden: false },
      { columnLabel: 'Plate Appearances', columnName: 'plate_appearances', maxWidth: 'unset', isHidden: false },
      { columnLabel: 'Wins', columnName: 'wins', maxWidth: 'unset', isHidden: false },
      { columnLabel: 'Losses', columnName: 'losses', maxWidth: 'unset', isHidden: false },
      { columnLabel: 'Points', columnName: 'points', maxWidth: 'unset', isHidden: false }
    ]
  },
  createNewPlayer({ getters }: any, payload: any) {
    const { email, password, fname, lname, nname, phone, gender } = payload
    return new Promise((resolve, reject) => {
      api.post(`/players/create`, { email, password, fname, lname, nname, phone, gender })
        .then(({data}) => {
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  logPlayerIn({ commit, getters }: any, payload: any) {
    const { email, password } = payload
    return new Promise((resolve, reject) => {
      api.post(`/players/login`, { email, password })
          .then(({data}) => {
              if (data.status == 200) {
                  commit('updateIsLoggedIn', true);
                  commit('updateLoggedInPlayer', data.player);
                  commit('updateAccessToken', data.accessToken);
                  resolve(data);
              } else {
                  throw 'Invalid Login'
              }
          })
          .catch((error) => {
            reject(error)
          })
    })
  },
  logPlayerOut({ commit }: any) {
    return new Promise((resolve, reject) => {
      api.post(`/players/logout`)
        .then(({data}) => {
          if (data.status == 200) {
            commit('updateIsLoggedIn', false);
            commit('updateLoggedInPlayer', {});
            commit('updateAccessToken', null);
            resolve(data);
          } else {
            throw 'Invalid logout'
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  updateUserSettings({ commit, getters }: any, payload: any) {
    api.defaults.headers.common['Authorization'] = `Bearer ${getters.getAccessToken}`;
    const { playerId, updates } = payload
    return new Promise((resolve, reject) => {
      api.put(`/players/update-profile`, { playerId, updates })
        .then(({data}) => {
            if (data.status == 200) {
              commit('updateLoggedInPlayer', data.player);
              resolve(data);
            } else {
              throw 'Invalid logout'
            }
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  fetchPlayerById(_:any, id: string) {
    return new Promise((resolve, reject) => {
      api.get(`/players/${id}`)
        .then(({data}: any) => {
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  fetchPlayerSelectedSchedules({ getters }: any, id: string) {
    return new Promise((resolve, reject) => {
      api.get(`/players/${id}/selected-schedules`)
        .then(({data}: any) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  addSelectedSchedule({ getters }: any, id: string) {
    return new Promise((resolve, reject) => {
      api.put(`/players/${getters.getLoggedInPlayer._id}/selected-schedules/add`, { id })
        .then(({data}: any) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error)
        })
      })
  },
  removeSelectedSchedule({ getters }: any, id: string) {
    return new Promise((resolve, reject) => {
      api.put(`/players/${getters.getLoggedInPlayer._id}/selected-schedules/remove`, { id })
        .then(({data}: any) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error)
        })
      })
  }
}