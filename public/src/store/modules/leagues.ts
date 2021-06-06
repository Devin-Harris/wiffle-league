import api from '@/api/api'

export const LeagueActions = {
  fetchLeaguesTableColumns() {
    return [
      {columnLabel: 'Name', columnName: 'name', maxWidth: '10rem', isHidden: false},
      {columnLabel: 'Players', columnName: 'players', maxWidth: 'unset', isHidden: false},
      {columnLabel: 'Start Date', columnName: 'startDate', maxWidth: 'unset', isHidden: false},
      {columnLabel: 'End Date', columnName: 'endDate', maxWidth: 'unset', isHidden: false},
      {columnLabel: 'Id', columnName: 'id', maxWidth: 'unset', isHidden: true}
    ]
  },
  fetchLeagues() {
    return new Promise((resolve, reject) => {
      api.get('/leagues')
        .then(({data}) => {
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  fetchLeagueById(_: any, id: String) {
    return new Promise((resolve, reject) => {
      api.get(`/leagues/${id}`)
        .then(({data}) => {
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  fetchLeagueStatsById(_: any, id: String) {
    return new Promise((resolve, reject) => {
      api.get(`/leagues/${id}/stats`)
        .then(({data}) => {
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  createLeague({ getters }:any, payload: any) {
    const { creatorId, name, maxPlayers, numGames, teamSize, startDate, endDate, deadlineDate, other, gender } = payload
    api.defaults.headers.common['Authorization'] = `Bearer ${getters.getAccessToken}`;
    return new Promise((resolve, reject) => {
      api.post(`/leagues/create`, {
        name: name,
        player_ids: [],
        player_stats: [],
        max_num_players: maxPlayers,
        league_creator_id: creatorId,
        game_ids: [],
        num_games: numGames,
        games_created: false,
        team_size: teamSize,
        start_date: startDate,
        end_date: endDate,
        deadline_date: deadlineDate,
        about_text: other,
        gender: gender
      })
        .then(({data}) => {
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}