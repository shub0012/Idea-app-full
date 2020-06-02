import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Table, Button } from "react-bootstrap";
//import { Nav} from "react-bootstrap";
//import 'bootstrap/dist/css/bootstrap-theme.css';
import "./css/style.css";
import axios from "axios";

var n = 1;
var totalResults = 0;

class DeleteUser extends Component {
  constructor(props) {
    super(props);

    this.deleteUser = this.deleteUser.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);

    this.state = {
      persons: [],
      message: "",
      messageDelete: "",
    };
  }

  componentDidMount() {
    axios
      .get(`https://idea-app-backend.herokuapp.com/person/pages`)
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
      .get(`https://idea-app-backend.herokuapp.com/person/pages?page=1`)
      .then((response) => {
        this.setState({
          persons: response.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

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

  async deleteUser(e) {
    // eslint-disable-next-line no-restricted-globals
    var result = confirm("Want to delete?");
    if (result) {
      //Logic to delete the item

      await axios
        .delete(`https://idea-app-backend.herokuapp.com/person/${e.target.id}`)
        .then(
          console.log("deleted")

          //this.forceUpdate();
          //window.location= '/deleteuser';
        )
        .catch((error) => {
          console.log(error);
        });

      await axios
        .get("https://idea-app-backend.herokuapp.com/person/pages")
        .then((response) => {
          this.setState(
            {
              persons: response.data.data,
              messageDelete: "Record Successfully Deleted!",
            },
            () => {
              console.log(this.state.persons);
            }
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  //     if (result) {

  //   }

  render() {
    return (
      <div id="wrap" className="">
        <br />
        <br />
        <div className="container align-items-center">
          <h3 style={{ color: "green" }} className="label label-success">
            {this.state.messageDelete}
          </h3>

          <h1>Select a Idea, You to Delete</h1>
          <br />

          <div className="table-responsive">
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
                    <th>Action</th>
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

                      <td>
                        <button
                          type="button"
                          id={person._id}
                          onClick={this.deleteUser}
                          className="btn btn-danger btn-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>

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

export default DeleteUser;
