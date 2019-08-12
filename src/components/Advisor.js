import React from 'react';
import Select from 'react-select';

const advisorList = [
  {
    label: "Alex Lane",
    value: 1,
  },
  {
    label: "Alicia Hallums",
    value: 2,
  },
  {
    label: "Amanda Brown",
    value: 3,
  },
  {
    label: "Amanda Rollins",
    value: 4,
  },
  {
    label: "Amber Clinkscales",
    value: 5,
  },
  {
    label: "Andrea Tate",
    value: 6,
  },
  {
    label: "Anitra Atkins",
    value: 7,
  }
]

export default class Advisor extends React.Component {
  render() {
    return (
      <div>
        <div class="row">
          <div class="col">
            <label>Advisor</label>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <Select options={advisorList} />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label for="">Advisor First Name</label>
            <input type="text" class="form-control" placeholder="First name" />
          </div>
          <div class="col">
            <label for="">Advisor Last Name</label>
            <input type="text" class="form-control" placeholder="Advisor Last name" />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label for="">Advisor Email</label>
            <input type="text" class="form-control" placeholder="Advisor Email" />
          </div>
        </div>
      </div>
    )
  }
}
