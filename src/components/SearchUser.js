import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Table } from "react-bootstrap";
//import {Bootstrap, Grid, Row, Col} from 'react-bootstrap';
//import { Nav} from "react-bootstrap";
//import 'bootstrap/dist/css/bootstrap-theme.css';
import "./css/style.css";
import axios from "axios";

class SearchUser extends Component {
  constructor(props) {
    super(props);

    this.checkData = this.checkData.bind(this);

    this.state = {
      persons: [],
    };
  }

  componentDidMount() {
    axios
      .get(
        `https://idea-app-backend.herokuapp.com/person/query?name=${this.props.search}`
      )
      .then((response) => {
        this.setState({
          persons: response.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  checkData() {
    if (
      (this.state.persons && this.state.persons.length === 0) ||
      this.state.persons == null
    ) {
      //console.log(this.state.persons);
      return <h1>Oops!!!! No Record Found</h1>;
    } else {
      //console.log(this.state.persons);
      return (
        <div>
          <h1>Search Details for '{this.props.search}'</h1>
          <br />

          <div className="table-responsive">
            <Table responsive size="md" bordered striped hover>
              <thead>
                <tr>
                  <th>PortalID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Idea</th>
                  <th>Solution</th>
                  <th>Date Submitted</th>
                  <th>Email Id</th>
                  <th>Account</th>
                  <th>Department</th>
                  <th>Focus Area</th>
                </tr>
              </thead>
              <tbody>
                {this.state.persons.map((person) => (
                  <tr>
                    <td>{person.portalID}</td>
                    <td>{person.fname}</td>
                    <td>{person.lname}</td>
                    <td>{person.problem}</td>
                    <td>{person.solution}</td>
                    <td>{person.date}</td>
                    <td>{person.email}</td>
                    <td>{person.account}</td>
                    <td>{person.department}</td>
                    <td>{person.focusArea}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div id="wrap" className="">
        <br />
        <br />
        <div className="container align-items-center">{this.checkData()}</div>
      </div>
    );
  }
}

export default SearchUser;
