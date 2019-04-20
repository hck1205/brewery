import React from 'react';


class Pagination extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      pageNum: this.props.currentPage
    }
  }

  changePageNum(e, direction = "") {
    e.stopPropagation();

    let currentPage = this.props.currentPage;
    let numberOfPages = this.props.numberOfPages;

    if(direction === "prev" && currentPage === 1) return false;
    if(direction === "prev") {
      this.props.changePage(currentPage - 1);
    }

    if(direction === "next" && currentPage === numberOfPages) return false;
    if(direction === "next") {
      this.props.changePage(currentPage + 1);
    }

    if(direction === "" && this.state.pageNum <= numberOfPages) {
      this.props.changePage(this.state.pageNum);
    }
  }

  render() {

    if(this.props.isLoaded) {
      return (
        <div className={"pagination-box"}>
          <nav className={"page_number__items"}>
            <ul>
              <li key={"prev"} className={"page__number__list-item prev"} onClick={(e) => this.changePageNum(e, "prev")}> {"<"} </li>
              <li>
                <input type={"text"} value={ this.state.pageNum } onChange={(e) => this.setState({pageNum: e.target.value})} />
              </li>
              <li> / { this.props.numberOfPages } </li>
              <li> <button onClick={(e) => this.changePageNum(e)}>Go</button> </li>
              <li key={"next"} className={"page__number__list-item next"} onClick={(e) => this.changePageNum(e, "next")}> {">"} </li>
            </ul>
          </nav>
        </div>
      );
    } else {
      return(
        <React.Fragment>{}</React.Fragment>
      )
    }

  }
}

export default Pagination;