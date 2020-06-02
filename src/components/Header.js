import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
//import {Bootstrap, Grid, Row, Col} from 'react-bootstrap';
import { Nav, Navbar } from "react-bootstrap";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import "./css/style.css";
import Home from "./Home";
import AddUser from "./AddUser";
import UpdateUser from "./UpdateUser";
import DeleteUser from "./DeleteUser";
import SearchUser from "./SearchUser";
import AllUsers from "./AllUsers";

class Header extends Component {
  constructor() {
    super();

    this.state = {
      activeTab: "tab1",
      search: "",
    };

    this.changeSearch = this.changeSearch.bind(this);
    this.changeActive = this.changeActive.bind(this);
  }

  changeActive(e) {
    this.setState({ activeTab: e.target.id });
  }

  changeSearch(e) {
    this.setState(
      {
        search: document.getElementById("search").value,
      },
      () => {
        console.log("hello");
      }
    );
  }

  render() {
    //let activeClass= this.state.active +"nav-item";

    return (
      <div>
        <Router>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">Idea Tracker</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/allideas">Show All Ideas</Nav.Link>
                <Nav.Link href="/newidea">Add New Ideas</Nav.Link>
                <Nav.Link href="/updateidea">Update an Existing Idea</Nav.Link>
                <Nav.Link href="/deleteidea">Delete an Idea</Nav.Link>
              </Nav>
              <div className="searchBox">
                <form className="form-inline float-lg-right" action="/">
                  <div>
                    <input
                      className="form-control mr-sm-2"
                      id="search"
                      type="text"
                      placeholder="Search Using Name..."
                    />
                    <Link to="/searchpatient">
                      <button
                        className="btn btn-success"
                        onClick={(e) => {
                          this.changeSearch(e);
                          this.changeActive(e);
                        }}
                        type="submit"
                      >
                        <div className="searchButton" required>
                          Search Ideas
                        </div>
                      </button>
                    </Link>
                  </div>
                </form>
              </div>
            </Navbar.Collapse>
          </Navbar>

          <Route exact strict path="/" component={Home} />

          <Route exact strict path="/newidea" component={AddUser} />
          <Route exact strict path="/allideas" component={AllUsers} />
          <Route exact strict path="/updateidea" component={UpdateUser} />
          <Route exact strict path="/deleteidea" component={DeleteUser} />
          <Route
            exact
            strict
            path="/searchpatient"
            component={() => <SearchUser search={this.state.search} />}
          />

          {/*<Route path='/search/' component={(props) => (<SearchNewsComponent {...props} search={this.state.searchText}/>)}/>
           */}
        </Router>
      </div>
    );
  }
}

export default Header;
