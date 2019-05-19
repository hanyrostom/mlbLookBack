import React     from "react";
import ErrorPage from "./errorPage"


class Loader extends React.Component {

  render() {
    let { data, applicationState } = this.props;

    if (data === null && applicationState === "MISSING_DATA") {
      return  <ErrorPage />;
    } 
    if (
      data && data.length === 0 && applicationState === "HAS_DATA") {
      return (<h1>Schedule not available yet, check back later!</h1>);
    }
    if (applicationState === "FETCHING_DATA") {
      return (
          <h1 className="loader-wrapper">Loading...</h1>
      )} 
      return this.props.children;
  }
}

export default Loader;
