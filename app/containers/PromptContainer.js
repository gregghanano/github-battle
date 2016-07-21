var React = require('react');
var transparentBg = require('../styles/index.js').transparentBg;
var Prompt = require('../components/Prompt.js');

var PromptContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function(){
    return {
      username: ''
    }
  },
  handleUpdateuser: function(e){
    this.setState({
      username: e.target.value
    })
  },
  handleSubmitUser: function(e){
    e.preventDefault();
    var username = this.state.username;
    this.setState({
      username:''
    });
    if(this.props.routeParams.playerOne){
      //console.log(this.context);
      // go to /battle
      this.context.router.push({
        pathname: '/battle',
        query: {
          playerOne: this.props.routeParams.playerOne,
          playerTwo: this.state.username
        }
      });
    } else {
      //console.log(this.context);
      // go to player two
      this.context.router.push('/playerTwo/'+this.state.username)
    }
  },
  render: function(){
    return (
      <Prompt
        onSubmitUser={this.handleSubmitUser}
        onUpdateUser={this.handleUpdateuser}
        header={this.props.route.header}
        username={this.state.username} />
    )
  }
});

module.exports = PromptContainer;
