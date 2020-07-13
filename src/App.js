import React, { useState } from 'react';
import './App.css';

import Body from './body.js';

import logo from './images/logo.svg';
import rules from './images/image-rules.svg';
import close from './images/icon-close.svg';

function App(props) {

  const [modal, setModal] = useState(false);
  const [score, setScore] = useState(0);

  //render () {
    return (
      <div>
          <div className="container">

            <div className="header">
              <div style={{padding: '20px 20px 15px'}}>
                <img src={logo} height="26%" width="26%"/>
                <div className="inner-header">
                    <p className="score">SCORE</p>
                    <p className="score-value">{score}</p>
                </div>
              </div>
            </div>

            <div>
              <Body scoreCallback={item => setScore(item)}/>
            </div>

            <div className="footer-div">
              <div style={{float:'right', marginRight: '20px'}}>
                <div className="footer" onClick={() => setModal(true)}>RULES</div>
              </div>
            </div>

            {modal &&
              <div className="modal">
                <div style={{width:'100%'}}>
                  <p style={{color:'hsl(238, 12%, 38%)', fontSize:'1.8vw', fontWeight:'700', marginTop:'0px'}}>RULES<span style={{paddingLeft:'70%'}} onClick={() => setModal(false)}><img src={close} height="5%" width="5%"/></span></p>
                </div>

                <img src={rules} height="73%" width="73%"/>
            </div>}


          {/* Rules

          You Picked
          The House Picked

          You Win
          You Lose

          Play Again */}

        </div>

      </div>
    );
  }
//}

export default App;
