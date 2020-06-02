import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Table, Button } from "react-bootstrap";
//import { Nav} from "react-bootstrap";
//import 'bootstrap/dist/css/bootstrap-theme.css';
import "./css/style.css";
import axios from "axios";

var n = 1;
var totalResults = 0;

class UpdateUser extends Component {
  constructor(props) {
    super(props);

    this.updateRow = this.updateRow.bind(this);
    this.submitUpdate = this.submitUpdate.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);

    this.onChangeFname = this.onChangeFname.bind(this);
    this.onChangeLname = this.onChangeLname.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangePortalId = this.onChangePortalId.bind(this);
    this.onChangeAccount = this.onChangeAccount.bind(this);
    this.onChangeDepartment = this.onChangeDepartment.bind(this);
    this.onChangeFocusArea = this.onChangeFocusArea.bind(this);
    this.onChangeProblem = this.onChangeProblem.bind(this);
    this.onChangeSolution = this.onChangeSolution.bind(this);

    this.state = {
      persons: [],
      fname: "",
      lname: "",
      email: "",
      date: "",
      portalID: "",
      account: "",
      department: "",
      focusArea: "",
      problem: "",
      solution: "",
      messageUpdate: "",
      totalResult: 0,
      message: "",
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

  submitUpdate(e) {}

  updateRow(e) {
    if (e.target.innerHTML === "Edit") {
      // Get a NodeList of all .demo elements
      var x = "." + e.target.id;
      const demoClasses = document.querySelectorAll(x);

      // Change the text of multiple elements with a loop
      demoClasses.forEach((element) => {
        element.contentEditable = "true";
      });
      e.target.innerHTML = "Update";

      var id1 = "id1" + e.target.id.substring(3);
      var id2 = "id2" + e.target.id.substring(3);
      var id3 = "id3" + e.target.id.substring(3);
      var id4 = "id4" + e.target.id.substring(3);
      var id5 = "id5" + e.target.id.substring(3);
      var id6 = "id6" + e.target.id.substring(3);
      var id7 = "id7" + e.target.id.substring(3);
      var id8 = "id8" + e.target.id.substring(3);
      var id9 = "id9" + e.target.id.substring(3);
      var id10 = "id10" + e.target.id.substring(3);

      this.setState({
        portalID: document.getElementById(id1).innerHTML,
        fname: document.getElementById(id2).innerHTML,
        lname: document.getElementById(id3).innerHTML,
        problem: document.getElementById(id4).innerHTML,
        solution: document.getElementById(id5).innerHTML,
        date: document.getElementById(id6).innerHTML,
        email: document.getElementById(id7).innerHTML,
        account: document.getElementById(id8).innerHTML,
        department: document.getElementById(id9).innerHTML,
        focusArea: document.getElementById(id10).innerHTML,
      });
    } else {
      //e.preventDefault();
      const user = {
        fname: this.state.fname,
        lname: this.state.lname,
        email: this.state.email,
        date: this.state.date,
        portalID: this.state.portalID,
        account: this.state.account,
        department: this.state.department,
        focusArea: this.state.focusArea,
        problem: this.state.problem,
        solution: this.state.solution,
      };
      console.log(user);
      //e.target.id.substring(3);
      axios
        .put(
          `https://idea-app-backend.herokuapp.com/person/${e.target.id.substring(
            3
          )}`,
          user
        )
        .then((res) => console.log(res.data));

      this.setState({
        username: "",
        messageUpdate: "Idea details Successfully Updated!",
        message: "",
      });
      var y = "." + e.target.id;
      const demoClasses = document.querySelectorAll(y);

      // Change the text of multiple elements with a loop
      demoClasses.forEach((element) => {
        element.contentEditable = "false";
      });

      e.target.innerHTML = "Edit";
    }
  }
  onChangeFname(e) {
    console.log("ONCHANGE First NAME CALLED");
    /*e.addEventListener('input', function() {
            this.setState({
                fname: e.target.innerHTML
            },
            ()=>{
                console.log("value updated")
            })
        });
        */

    this.setState(
      {
        fname: e.target.innerHTML,
      },
      () => {
        console.log("value updated");
      }
    );
  }
  onChangeLname(e) {
    console.log("ONCHANGE LAST NAME CALLED");
    this.setState(
      {
        lname: e.target.innerHTML,
      },
      () => {
        console.log("hello");
      }
    );
    /**/
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.innerHTML,
    });
  }
  onChangeDate(e) {
    this.setState({
      date: e.target.innerHTML,
    });
  }

  onChangePortalId(e) {
    this.setState({
      portalID: e.target.innerHTML,
    });
  }

  onChangeAccount(e) {
    this.setState({
      account: e.target.innerHTML,
    });
  }
  onChangeDepartment(e) {
    this.setState({
      department: e.target.innerHTML,
    });
  }
  onChangeFocusArea(e) {
    this.setState({
      focusArea: e.target.innerHTML,
    });
  }
  onChangeProblem(e) {
    this.setState({
      problem: e.target.innerHTML,
    });
  }
  onChangeSolution(e) {
    this.setState({
      solution: e.target.innerHTML,
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

  render() {
    return (
      <div id="wrap" className="">
        <br />
        <br />
        <div className="container align-items-center">
          <h3 style={{ color: "green" }} className="label label-success">
            {this.state.messageUpdate}
          </h3>

          <h1>Select Your Idea to Update</h1>
          <br />

          <div className="table-responsive">
            <Table responsive size="xs" striped hover bordered>
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
                    <td
                      className={"doc" + person._id}
                      id={"id1" + person._id}
                      onBlur={this.onChangePortalId}
                      contentEditable="false"
                    >
                      {person.portalID}
                    </td>
                    <td
                      className={"doc" + person._id}
                      id={"id2" + person._id}
                      onBlur={this.onChangeFname}
                      value={this.state.fname}
                      contentEditable="false"
                    >
                      {person.fname}
                    </td>
                    <td
                      className={"doc" + person._id}
                      id={"id3" + person._id}
                      onBlur={this.onChangeLname}
                      value={this.state.lname}
                      contentEditable="false"
                    >
                      {person.lname}
                    </td>
                    <td
                      className={"doc" + person._id}
                      id={"id4" + person._id}
                      onBlur={this.onChangeProblem}
                      contentEditable="false"
                    >
                      {person.problem}
                    </td>
                    <td
                      className={"doc" + person._id}
                      id={"id5" + person._id}
                      onBlur={this.onChangeSolution}
                      contentEditable="false"
                    >
                      {person.solution}
                    </td>
                    <td
                      className={"doc" + person._id}
                      id={"id6" + person._id}
                      onBlur={this.onChangeDate}
                      contentEditable="false"
                    >
                      {person.date}
                    </td>
                    <td
                      className={"doc" + person._id}
                      id={"id7" + person._id}
                      onBlur={this.onChangeEmail}
                      contentEditable="false"
                    >
                      {person.email}
                    </td>
                    <td
                      className={"doc" + person._id}
                      id={"id8" + person._id}
                      onBlur={this.onChangeAccount}
                      contentEditable="false"
                    >
                      {person.account}
                    </td>
                    <td
                      className={"doc" + person._id}
                      id={"id9" + person._id}
                      onBlur={this.onChangeDepartment}
                      contentEditable="false"
                    >
                      {person.department}
                    </td>
                    <td
                      className={"doc" + person._id}
                      id={"id10" + person._id}
                      onBlur={this.onChangeFocusArea}
                      contentEditable="false"
                    >
                      {person.focusArea}
                    </td>

                    <td>
                      <button
                        id={"doc" + person._id}
                        type="button"
                        onClick={this.updateRow}
                        className="btn btn-warning btn-sm"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
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

export default UpdateUser;
