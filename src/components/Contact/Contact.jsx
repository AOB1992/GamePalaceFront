import React from "react";
import ContactStyles from './ContactStyles.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { useState, useEffect } from 'react';
import randomColor from 'randomcolor';


export default function Contact() {

  const [borderColor, setBorderColor] = useState('red');
  
  

  const updateBorderColor1 = () => {
    const newColor = randomColor();
    setBorderColor(newColor);
  };

  useEffect(() => {
    const intervalId = setInterval(updateBorderColor1, 700);
    return () => clearInterval(intervalId);
  }, []);

    return (
        
<div className={ContactStyles.cardcontainer}>
  <div className={ContactStyles.card} style={{ border: `8px solid ${borderColor}`, padding: '10px' }}>
    <img src="https://avatars.githubusercontent.com/u/95720785?s=400&u=aab5ac9de7c5b678612417458b4e97c09165f05e&v=4" alt="agus"/>
    <br></br>
    <h3>Agustín Córdoba</h3>
    <br></br>
    <div className={ContactStyles.cardi}>
    <a href='https://www.linkedin.com/in/agustin-cordoba/' target="_blank"><button><FontAwesomeIcon icon={faLinkedin}/></button></a>
    <a href='https://github.com/magichands22' target="_blank"><button><FontAwesomeIcon icon={faGithub}/></button></a>
    </div>
  </div>
  
  <div className={ContactStyles.card} style={{ border: `8px solid ${borderColor}`, padding: '10px' }}>
    <img src="https://ca.slack-edge.com/TPRS7H4PN-U04023GBN80-2033c758937a-512" alt="ale"/>
    <br></br>
    <h3>Alejandro Ohrnialian</h3>
    <br></br>
    <div className={ContactStyles.cardi}>
    <a href='https://www.linkedin.com/in/a-ob/' target="_blank"><button><FontAwesomeIcon icon={faLinkedin}/></button></a>
    <a href='https://github.com/AOB1992' target="_blank"><button><FontAwesomeIcon icon={faGithub}/></button></a>
    </div>
  </div>
  
  <div className={ContactStyles.card} style={{ border: `8px solid ${borderColor}`, padding: '10px' }}>
    <img src="https://ca.slack-edge.com/TPRS7H4PN-U03THTDD2A0-02673447fe65-512" alt="valen"/>
    <br></br>
    <h3>Valentina Massa</h3>
    <br></br>
    <div className={ContactStyles.cardi}>
    <a href='https://www.linkedin.com/in/valentina-massa-b08469254/' target="_blank"><button><FontAwesomeIcon icon={faLinkedin}/></button></a>
    <a href='https://github.com/massavalentina' target="_blank"><button><FontAwesomeIcon icon={faGithub}/></button></a>
    </div>
  </div>
  
  <div className={ContactStyles.card} style={{ border: `8px solid ${borderColor}`, padding: '10px' }}>
    <img src="https://ca.slack-edge.com/TPRS7H4PN-U042J6B52KY-5bf86dc923b2-512" alt="elias"/>
    <br></br>
    <h3>Elias Piolatto</h3>
    <br></br>
    <div className={ContactStyles.cardi}>
    <a href='https://www.linkedin.com/in/el%C3%ADas-mart%C3%ADn-piolatto-59335572/' target="_blank"><button><FontAwesomeIcon icon={faLinkedin}/></button></a>
    <a href='https://github.com/EliasPiolatto' target="_blank"><button><FontAwesomeIcon icon={faGithub}/></button></a>
    </div>
  </div>
  
  <div className={ContactStyles.card} style={{ border: `8px solid ${borderColor}`, padding: '10px' }}>
    <img src="https://ca.slack-edge.com/TPRS7H4PN-U03UZQ3TRSL-ae7d994a8a0d-512" alt="fati"/>
    <br></br>
    <h3>Fatima Ponce</h3>
    <br></br>
    <div className={ContactStyles.cardi}>
    <a href='https://www.linkedin.com/in/fatimavponce/' target="_blank"><button><FontAwesomeIcon icon={faLinkedin}/></button></a>
    <a href='https://github.com/faatiiponce' target="_blank"><button><FontAwesomeIcon icon={faGithub}/></button></a>
    </div>
  </div>
  
  <div className={ContactStyles.card} style={{ border: `8px solid ${borderColor}`, padding: '10px' }}>
    <img src="https://ca.slack-edge.com/TPRS7H4PN-U03UZQ3MFR6-22dafcff1cae-512" alt="asael"/>
    <br></br>
    <h3>Asael Hernández</h3>
    <br></br>
    <div className={ContactStyles.cardi}>
    <a href='https://www.linkedin.com/in/asael-hernandez-29a279241/' target="_blank"><button><FontAwesomeIcon icon={faLinkedin}/></button></a>
    <a href='https://github.com/Azzzako' target="_blank"><button><FontAwesomeIcon icon={faGithub}/></button></a>
    </div>
  </div>
</div>

        
    );
};
