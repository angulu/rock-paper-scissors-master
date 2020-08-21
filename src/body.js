import React from 'react';
import './body.css';

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

          currentComponent.setState({ house_pick: house_value, inner_pick: game[house_pick_num % 3], end_message: game_end, toggle_view: 'results'})

    }).then(function() {

        setTimeout(function() {
            currentComponent.setState({toggle_view: 'end'})
        },
        1000);
    });

  }

  render () {
    
    let up_dot = "", mid_dot = "", down_dot = "", end_svg = "end_house_svg", end_icon = "end_house_icon";

    if (this.state.end_message === 'YOU WIN') {
        up_dot = "dotLeft1"
        mid_dot = "dotLeft2"
        down_dot = "dotLeft3"
    } else if (this.state.end_message === 'YOU LOSE') {
        up_dot = "dot1"
        mid_dot = "dot2"
        down_dot = "dot3"

        if (this.state.house_pick === blue) {
            end_svg = "blue_house_svg"
            end_icon = "blue_house_icon"
        }

    } else {
        end_svg = "tied_house_svg"
        end_icon = "tied_house_icon"
    }

    if (this.state.toggle_view === "play") {

        return (

            <div className="body_div play_div">
                <div>
                    <img src={triangle} className="triangle" alt='triangle'/>
                </div>

                <div className="red_svg">
                    <img src={red} className="circle_img" alt='red'/>
                </div>

                <div className="blue_svg">
                    <img src={blue} className="circle_img" alt='blue'/>
                </div>

                <div className="yellow_svg">
                    <img src={yellow} className="circle_img" alt='yellow'/>
                </div>

                <div className="rock_svg">
                    <img src={rock} onClick={() => this.userPicked(rock)} className="icon_img" alt='rock'/>
                </div>

                <div className="paper_svg">
                    <img src={paper} onClick={() => this.userPicked(paper)} className="icon_img" alt='paper'/>
                </div>

                <div className="scissors_svg">
                    <img src={scissors} onClick={() => this.userPicked(scissors)} className="icon_img" alt='scissors'/>
                </div>

            </div>
        );

    } else if (this.state.toggle_view === 'results') {

        return (

            <div className="body_div">

                <p className="picked_title">YOU PICKED</p>
                <p className="house_title">THE HOUSE PICKED</p>

                <div className="picked_svg">
                    <img src={this.state.users_pick} className="result_svg" alt={this.state.users_pick} />
                </div>

                <div className="picked_icon">
                    <img src={this.state.outer_pick} className="result_icon" alt={this.state.outer_pick} />
                </div>

                <div className="house_svg">
                    <img src={this.state.house_pick ? this.state.house_pick : dot}  className="result_svg" alt={this.state.house_pick} />
                </div>

                <div className="house_icon">
                    <img src={this.state.inner_pick} className="result_icon" alt={this.state.inner_pick} />
                </div>

            </div>
        );

    }

    return (

        <div className="body_div">

            <div className="backgroundCircle">
                <span className={up_dot}></span>
                <span className={mid_dot}></span>
                <span className={down_dot}></span>
            </div>

            <p className="end_picked_title">YOU PICKED</p>
            <p className="end_house_title">THE HOUSE PICKED</p>

            <div className="end_picked_svg">
                <img src={this.state.users_pick} className="end_svg" alt={this.state.users_pick} />
            </div>

            <div className="end_picked_icon">
                <img src={this.state.outer_pick} className="result_icon"  alt={this.state.outer_pick} />
            </div>

            <div className={end_svg}>
                <img src={this.state.house_pick ? this.state.house_pick : dot}  className="end_svg"  alt={this.state.house_pick} />
            </div>

            <div className={end_icon}>
                <img src={this.state.inner_pick} className="result_icon"  alt={this.state.inner_pick} />
            </div>

            <div className="button_div">
                <div>
                    <p className="end_message">{this.state.end_message}</p>
                </div>
                <input className="play-button" type='button' value="PLAY AGAIN" onClick={() => this.setState({toggle_view:"play", inner_pick:"", house_pick:"", outer_pick:"", users_pick:""})}/>
            </div>

        </div>
    );

            
  }
}

export default Body;
