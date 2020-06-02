import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Table, Button } from "react-bootstrap";
//import { Nav} from "react-bootstrap";
//import 'bootstrap/dist/css/bootstrap-theme.css';
import "./css/style.css";
import axios from "axios";

var n = 1;
var totalResults = 0;

class AllUsers extends Component {
  constructor(props) {
    super(props);

    this.checkData = this.checkData.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);

    this.state = {
      persons: [],
      totalResult: 0,
      message: "",
    };
  }

  componentDidMount() {
    axios
      .get("https://idea-app-backend.herokuapp.com/person/pages")
      .then((response) => {
        totalResults = response.data.totalResult;
        this.setState({
          totalResult: response.data.totalResult,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("https://idea-app-backend.herokuapp.com/person/pages?page=1")
      .then((response) => {
        this.setState({
          persons: response.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //   checkBMI(person){
  //       if( ((person.weight)/(person.height * person.height)) <18.5){
  //         return(
  //             <span style={{color: "red"}}>Under Weight</span>
  //         )
  //       }
  //       else if( ((person.weight)/(person.height * person.height)) >24.9){
  //         return(
  //             <span style={{color: "red"}}>Over Weight</span>
  //         )
  //     }
  //     else{
  //         return(
  //             <span style={{color: "green"}}>Normal</span>
  //         )
  //     }
  //   }

  nextPage() {
    if (n < Math.ceil(totalResults / 10)) {
      n++;

      this.setState({
        message: "",
      });
    } else {
      this.setState({
        message: "Last Page Reached!",
      });
    }
    //db.comments.find().skip(pagesize * (n-1)).limit(pagesize);
    axios
      .get(`https://idea-app-backend.herokuapp.com/person/pages?page=${n}`)
      .then((response) => {
        this.setState({
          persons: response.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  previousPage() {
    if (n >= 2) {
      n--;
      this.setState({
        message: "",
      });
    } else {
      this.setState({
        message: "Already at first Page!",
      });
    }
    //db.comments.find().skip(pagesize * (n-1)).limit(pagesize);
    axios
      .get(`https://idea-app-backend.herokuapp.com/person/pages?page=${n}`)
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
    if (this.state.persons) {
      return (
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
      );
    } else {
      return <h3>No Records Found</h3>;
    }
  }

  render() {
    return (
      <div id="wrap" className="container align-items-center">
        <br />
        <div className="align-items-center">
          <h1>All Ideas</h1>
          <br />
          <h3>Total Ideas Submitted: {this.state.totalResult}</h3>

          <div className="table-responsive">{this.checkData()}</div>

          <div className="button">
            <Button variant="outline-secondary" onClick={this.previousPage}>
              Back
            </Button>{" "}
            <Button variant="outline-secondary" onClick={this.nextPage}>
              Next
            </Button>{" "}
          </div>
          <h3 style={{ color: "red" }}>{this.state.message}</h3>
        </div>
      </div>
    );
  }
}

export default AllUsers;
