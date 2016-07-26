var React = require('react');

function ConfirmBattle(props){
  return props.isLoading === true
    ? <p> Loading! </p>
    : <div> Confirm battle!! </div>
}
module.exports = ConfirmBattle;
