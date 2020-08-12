import React from 'react';

import triangle from './images/bg-triangle.svg';
import red from './images/red-circle.svg';
import blue from './images/blue-circle.svg';
import yellow from './images/yellow-circle.svg';
import rock from './images/icon-rock.svg';
import paper from './images/icon-paper.svg';
import scissors from './images/icon-scissors.svg';
import dot from './images/dot.svg';

function colorObject(value){

    let color = ""

    if (value === paper) {
        color = blue
    } else if (value === rock) {
        color = red
    } else {
        color = yellow
    }

    console.log('co', color, value);

    return color
}

class Body extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user_score: 0,
      house_score: 0,
      users_pick: "",
      outer_pick: "",
      house_pick: undefined,
      inner_pick: "",
      end_message: "",
      toggle_view: "play"
    };
  }

  userPicked(value) {
    
    this.setState({ users_pick: colorObject(value), outer_pick: value, toggle_view: 'results'})

    let house_pick_num = Math.floor(Math.random() * 9)

    let game = [rock, paper, scissors]

    let currentComponent = this;

    let game_end = ""

    console.log('bp', game[house_pick_num %3], house_pick_num);

    new Promise(function(resolve, reject) {
        setTimeout(function() {
          resolve(colorObject(game[house_pick_num % 3]))
        },
        1000);
    }).then(function(house_value) {

         if (value === paper && game[house_pick_num % 3] === rock){
            currentComponent.setState(prevState => {
                return {user_score: prevState.user_score + 1}
            })
            currentComponent.props.scoreCallback(currentComponent.state.user_score)
            game_end = "YOU WIN"
          }

          if (value === rock && game[house_pick_num % 3] === paper){
            currentComponent.setState(prevState => {
                return {house_score: prevState.house_score + 1}
            })
            currentComponent.props.scoreCallback(currentComponent.state.house_score)
            game_end = "YOU LOSE"
          }
          
          if (value === paper && game[house_pick_num % 3] === scissors){
            currentComponent.setState(prevState => {
                return {house_score: prevState.house_score + 1}
            })
            currentComponent.props.scoreCallback(currentComponent.state.house_score)
            game_end = "YOU LOSE"
          }

          if (value === scissors && game[house_pick_num % 3] === paper){
            currentComponent.setState(prevState => {
                return {user_score: prevState.user_score + 1}
            })
            currentComponent.props.scoreCallback(currentComponent.state.user_score)
            game_end = "YOU WIN"
          }
          
          if (value === rock && game[house_pick_num % 3] === scissors){
            currentComponent.setState(prevState => {
                return {user_score: prevState.user_score + 1}
            })
            currentComponent.props.scoreCallback(currentComponent.state.user_score)
            game_end = "YOU WIN"
          }

          if (value === scissors && game[house_pick_num % 3] === rock){
            currentComponent.setState(prevState => {
                return {house_score: prevState.house_score + 1}
            })
            currentComponent.props.scoreCallback(currentComponent.state.house_score)
            game_end = "YOU LOSE"
          }
    
          if (value === game[house_pick_num % 3]) {
            game_end = "YOU TIED"
          }

        currentComponent.setState({ house_pick: house_value, inner_pick: game[house_pick_num % 3], end_message: game_end})

        console.log(currentComponent.state.house_pick, currentComponent.state.inner_pick);

    }).then(function() {
            currentComponent.setState({toggle_view: 'end'})
    });

  }

  render () {
    
    let up_dot = "", mid_dot = "", down_dot = ""

    if (this.state.end_message === 'YOU WIN') {
        up_dot = "dotLeft1"
        mid_dot = "dotLeft2"
        down_dot = "dotLeft3"
    }

    if (this.state.end_message === 'YOU LOSE') {
        up_dot = "dot1"
        mid_dot = "dot2"
        down_dot = "dot3"
    }

    if (this.state.toggle_view === "play") {

        return (

            <div style={{margin: '100px 0px 0px 100px', width: '300px', height: '300px', top:'35%'}}>
                <div>
                    <img src={triangle} height="70%" width="70%" alt='triangle'/>
                </div>

                <div style={{position:'relative', top:'-37%', left:'-2%'}}>
                    <img src={red} height="72%" width="72%" alt='red'/>
                </div>

                <div style={{position:'relative', z_index:'10', top:'-160%', left:'-35%'}}>
                    <img src={blue} height="72%" width="72%" alt='blue'/>
                </div>

                <div style={{position:'relative', z_index:'10', top:'-225%', left:'34%'}}>
                    <img src={yellow} height="72%" width="72%" alt='yellow'/>
                </div>

                <div style={{position:'relative', z_index:'10', top:'-210.5%', left:'24%'}}>
                    <img src={rock} onClick={() => this.userPicked(rock)} height="20%" width="20%" alt='rock'/>
                </div>

                <div style={{position:'relative', z_index:'10', top:'-292%', left:'-9%'}}>
                    <img src={paper} onClick={() => this.userPicked(paper)} height="20%" width="20%" alt='paper'/>
                </div>

                <div style={{position:'relative', z_index:'10', top:'-315.5%', left:'60%'}}>
                    <img src={scissors} onClick={() => this.userPicked(scissors)} height="20%" width="20%" alt='scissors'/>
                </div>

            </div>
        );

    } else if (this.state.toggle_view === 'results') {

        return (

            <div style={{margin: '100px 0px 0px', width: '300px', height: '300px', top:'35%'}}>

                <p style={{color:'white', fontSize:'1.5vw', position:'relative', z_index:'10', top:'-20%', left:'-40%', paddingLeft:'30%', letterSpacing:'2px'}}>YOU PICKED</p>
                <p style={{color:'white', fontSize:'1.5vw', position:'relative', z_index:'10', top:'-34%', left:'40%', paddingLeft:'20%', letterSpacing:'2px'}}>THE HOUSE PICKED</p>

                <div style={{position:'relative', z_index:'10', top:'-35%', left:'-40%'}}>
                    <img src={this.state.users_pick} height="88%" width="88%" alt={this.state.users_pick} />
                </div>

                <div style={{position:'relative', z_index:'10', top:'-88%', left:'-8%'}}>
                    <img src={this.state.outer_pick} height="23%" width="23%"  alt={this.state.outer_pick} />
                </div>

                <div style={{position:'relative', z_index:'10', top:'-140%', left:'40%'}}>
                    <img src={this.state.house_pick ? this.state.house_pick : dot}  height="88%" width="88%"  alt={this.state.house_pick} />
                </div>

                <div style={{position:'relative', z_index:'10', top:'-193%', left:'72%'}}>
                    <img src={this.state.inner_pick} height="23%" width="23%"  alt={this.state.inner_pick} />
                </div>

                <img src={dot} height="88%" width="88%"  alt={this.state.house_pick} />

            </div>
        );

    }

    return (

        <div style={{margin: '100px 0px 0px', width: '300px', height: '300px', top:'35%', backgroundColor:'none'}}>

            <div className="backgroundCircle">
                <span className={up_dot}></span>
                <span className={mid_dot}></span>
                <span className={down_dot}></span>
            </div>

            <p style={{color:'white', fontSize:'1.5vw', position:'relative', z_index:'10', top:'-113%', left:'-70%', paddingLeft:'20%', letterSpacing:'2px'}}>YOU PICKED</p>
            <p style={{color:'white', fontSize:'1.5vw', position:'relative', z_index:'10', top:'-128%', left:'70%', paddingLeft:'20%', letterSpacing:'2px'}}>THE HOUSE PICKED</p>

            <div style={{position:'relative', z_index:'10', top:'-132%', left:'-78%'}}>
                <img src={this.state.users_pick} height="95%" width="95%" alt={this.state.users_pick} />
            </div>

            <div style={{position:'relative', z_index:'10', top:'-187%', left:'-43%'}}>
                <img src={this.state.outer_pick} height="23%" width="23%"  alt={this.state.outer_pick} />
            </div>

            <div style={{position:'relative', z_index:'10', top:'-247%', left:'75%'}}>
                <img src={this.state.house_pick ? this.state.house_pick : dot}  height="95%" width="95%"  alt={this.state.house_pick} />
            </div>

            <div style={{position:'relative', z_index:'10', top:'-300%', left:'108%'}}>
                <img src={this.state.inner_pick} height="23%" width="23%"  alt={this.state.inner_pick} />
            </div>

            <div style={{position:'relative', z_index:'100', top:'-328%', left:'-5%', display:'flex', alignItems:'center', flexDirection:'column'}}>
                <div>
                    <p style={{color:'white', fontSize:'3.5vw', letterSpacing:'2.5px', margin:'0px 0px 5px'}}>{this.state.end_message}</p>
                </div>
                <input className="play-button" type='button' value="PLAY AGAIN" onClick={() => this.setState({toggle_view:"play", inner_pick:"", house_pick:"", outer_pick:"", users_pick:""})}/>
            </div>

        </div>
    );

            
  }
}

export default Body;
