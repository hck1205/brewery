import Header from './Header'
import React from "react";

class Layout extends React.Component {
  render() {
    return (
        <div>
          <Header />
          <div className={"title"}>Welcome to Brewery DB</div>
          <div>{this.props.children}</div>
        </div>
    )
  }
}

export default Layout