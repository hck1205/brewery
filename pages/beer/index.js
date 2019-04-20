import React, { Component } from 'react'
import Layout from "../../layout/Layout";
import { isIE } from "react-device-detect";
import { urlParam, isEmptyObj } from "../../static/js/common";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";

class Index extends Component {

  constructor(props) {
    super(props);

    this.state = {
      beerInfo: {},
      isLoaded: false
    }
  }

  componentDidMount() {

    const urlParams = new URLSearchParams(window.location.search);

    let beerId = isIE ? urlParam("id") : urlParams.get("id");

    axios.get(`/api/beer/${beerId}`).then((res) => {
      if(res.status === 200 && res.data.status === "success") {
        this.setState({
          beerInfo: res.data.data,
          isLoaded: true
        });
      }
    })
  }

  parseData(data, isGlass = false) {

    if(data === "Y" || data === "N") {
      return data === "Y" ? "Yes" : "No"
    }

    if(typeof data === "object") {

      if(isGlass) {
        return Object.keys(data).map(key => {
          return <div key={key}>{key} : {data[key]}</div>;
        });
      } else {
        return Object.keys(data).map(key =>
          <img key={key} className={"labels-img"} src={data[key]} alt={"beer"} />
        );
      }
    }

    if(data === undefined || isEmptyObj(data) || data === "") {
      return "Not Provided"
    }

    return data
  }

  render() {
      let beer = this.state.beerInfo;
      return(
        this.state.isLoaded ?
          <BrowserRouter>
          <Layout>
            <div className={"beer__info__container"}>
              <table className={"beer__table"}>
                <tbody>
                <tr>
                  <td colSpan={"2"}>{beer.name}</td>
                </tr>
                <tr>
                  <th>ABV [Alcohol by Volume]</th>
                  <td>{this.parseData(beer.abv)}</td>
                </tr>
                <tr>
                  <th>IBU [International Bittering Units]</th>
                  <td>{this.parseData(beer.ibu)}</td>
                </tr>
                <tr>
                  <th>Organic</th>
                  <td>{this.parseData(beer.isOrganic)}</td>
                </tr>
                <tr>
                  <th colSpan={"2"}>Labels</th>
                </tr>
                <tr>
                  <td colSpan={"2"}>
                    {this.parseData(beer.labels)}
                  </td>
                </tr>
                <tr>
                  <th>Year</th>
                  <td>{this.parseData(beer.year)}</td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td>{this.parseData(beer.status)}</td>
                </tr>
                <tr>
                  <th>Glass</th>
                  <td>{this.parseData(beer.glass,true)}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </Layout>
          </BrowserRouter> : <div className={"signal"}>{}</div>
      )
  }
}

export default Index