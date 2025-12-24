import React from 'react';
import Constants from "../../constants/routes";
import { Link } from 'react-router-dom';

function Header2({ title, linkText1, linkText2 , link1 , link2}) {
  return (
    <section>
      <header>
        <div className="row pt-0 pb-0 p-4">
          <div className="col-md-6">
            <h5 className="textcolor" style={{fontFamily : Constants.FontConstants.FONTMON}}>{title}</h5>
          </div>
          <div className="col-md-4"></div>
          <div className="col-md-2">
          {linkText1 && (
            <i className="fa fa-home fa-2x"><style dangerouslySetInnerHTML={{__html: "\n\ni.fa.fa-home.fa-2x:hover {\n   color:#6a6c6f;\n   cursor:pointer;\n}\n\n" }} /></i>)}
            <span style={{fontFamily : Constants.FontConstants.FONTMON}}>
              {linkText1 && (<>
                <span>  / </span><Link to={link1}> {linkText1} </Link> <span>  / </span><Link to={link2}> {linkText2} </Link></>)}
              
            </span>
          </div>
        </div>
      </header>
    </section>
  );
}

export default Header2;