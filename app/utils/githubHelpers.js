var axios = require('axios');

var id = "YOUR_CLIENT_ID";
var sec = "YOUR_SECRET_ID";
var param = "?client_id=" + id + "&client_secret" + sec;

function getUserInfo(username){
  return axios.get('https://api.github.com/users/' + username + param);
}

function getRepos(username){
  //fetch github in order to get repos
  return axios.get('https://api.github.com/users/' + username +'/repos' + param + '&per_page=100');
}

function getTotalStars(repos){
  //calculate all the stars that the player has
  return repos.data.reduce(function(prev, current){
    return prev + current.stargazers_count
  }, 0)

}

function getPlayersData(player){
  // get repos
  // get total stars
  // return object with that data
  return getRepos(player.login)
    .then(getTotalStars)
    .then(function(totalStars){
      return {
        followers: player.followers,
        totalStars: totalStars
      }
    })
}

function calculateScores(players) {
  //return array after fancy algorithms to determine winner
  return [
    players[0].followers * 3 + players[0].totalStars,
    players[1].followers * 3 + players[1].totalStars
  ]
}

var helpers = {
  getPlayersInfo: function(players){
    // fetch some data from github
    return axios.all(players.map(function(username){
      return getUserInfo(username);
    })).then(function(info){
      //console.log('INFO', info);
      return info.map(function(user){
        return user.data;
      })
    }).catch(function(err){
      console.warn('Error in getPlayersInfo', err);
    })
  },
  battle: function(players){

  }
};

module.exports = helpers;
