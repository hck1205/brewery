import React from 'react';
import axios from 'axios';
import Router from 'next/router';
import Pagination from './Pagination'
import { urlParam } from '../static/js/common'
import { isIE } from 'react-device-detect';

class BeerList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      numberOfPages: 0,
      items: [],
      isLoaded: false
    };

  }

  componentDidMount() {
    let page = "";

    if(isIE) {
      page = urlParam("page") ? urlParam("page") : 1;
    } else {
      const urlParams = new URLSearchParams(window.location.search);
      page = urlParams.get('page') ? urlParams.get('page') : 1;
    }
    console.log("page:",page)
    this.getBeerList(page);
  }

  getBeerList(page) {
    axios.get(`/api/beers/${page}`).then((res) => {
      if(res.status === 200 && res.data.status === "success") {
        this.setState({
          currentPage: res.data.currentPage,
          numberOfPages: res.data.numberOfPages,
          items: res.data.data,
          isLoaded: true
        })
      }
    })
  }

  getDetailBeerInfo(item) {
    let itemId = item.id;

    Router.push({
      pathname: '/beer',
      query: { id: itemId }
    })
  };

  changePage = (page) => {
    Router.push(`/?page=${page}`);
    this.setState({
      isLoaded: false
    });
    this.getBeerList(page);
  };

  render() {
    let beerList = [];
    let defaultImg = '/static/images/default.png';
    if(this.state.items.length > 0) {
      beerList = this.state.items.map(item => {

        let imgPath = item.hasOwnProperty('labels') ? item.labels.icon : defaultImg;

        return (
            <li key={item.id} className={"beer-item"} onClick={(e) => this.getDetailBeerInfo(item)}>
              <div className={"beer-item-img-box"}>
                <img src={imgPath} onError={(e) => e.target.src = defaultImg} width={50} height={50} />
                <div>{item.name}</div>
              </div>
              <div className={"beer-item-short-info-box"}>
                <div>ABV: {item.abv === undefined ? "Not Provided" : item.abv}</div>
                <div>IBU: {item.ibu === undefined ? "Not Provdied" : item.ibu}</div>
              </div>
            </li>
        )
      });
    }

    return (
      <React.Fragment>
        {
          this.state.isLoaded ?
            <React.Fragment>
              <nav className={"beer_list__items"}>
                <ul>
                  { beerList }
                </ul>
              </nav>
              <Pagination
                currentPage = { this.state.currentPage }
                numberOfPages = { this.state.numberOfPages }
                isLoaded = { this.state.isLoaded }
                changePage = {this.changePage}
              />
            </React.Fragment> : <div className={"signal"}>{}</div>
        }
      </React.Fragment>
    );
  }
}

export default BeerList;