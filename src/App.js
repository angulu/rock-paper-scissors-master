import React, { useState } from 'react';
import './App.css';

import Body from './body.js';

import logo from './images/logo.svg';
import rules from './images/image-rules.svg';
import close from './images/icon-close.svg';

function App(props) {

  const [modal, setModal] = useState(false);
  const [score, setScore] = useState(0);

    return (
      <div>
          <div className="container">

            <div className="header">
              <div className="padded_header">
                <img src={logo} className="logo"/>
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
              <div className="footer_content">
                <div className="footer" onClick={() => setModal(true)}>RULES</div>
              </div>
            </div>

            {modal &&
              <div className="modal">
                <div className="inner_modal">
                <p className="modal_header">RULES</p>
                  {/* <p className="modal_header">RULES<span className="modal_cross" onClick={() => setModal(false)}><img src={close} className="cross_img"/></span></p> */}
                </div>

                <img src={rules} className="modal_img"/>

                <img src={close} className="cross_img" onClick={() => setModal(false)}/>
              </div>
            }

        </div>

      </div>
    );
  }

export default App;
