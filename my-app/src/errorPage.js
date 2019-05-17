import React from "react";


const ErrorPage = (props) => {
  console.log('game: ', props)

    return (
      <div className="section-details">
        <h1>Yikes!</h1>
        <p>There was an issue getting what you need, please try again later champ!</p>
      </div>
    );
  }


export default ErrorPage;
