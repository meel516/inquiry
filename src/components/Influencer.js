import React from 'react';

export default function InfluencerForm() {
  return (
    <div>
      <div class="row">
        <div class="col"><label for="phone">Name</label></div>
      </div>
      <div class="row">
        <div class="col-5"><input type="text" class="form-control" placeholder="First name" /></div>
        <div class="col-5"><input type="text" class="form-control" placeholder="Last name" /></div>
      </div>
      <div class="row">
        <div class="col-5">
          <label for="phone">Phone</label>
          <input type="text" class="form-control" id="phone" placeholder="Phone" />
        </div>
        <div class="col-5">
          <label for="phoneType">Phone Type</label>
          <select class="form-control" id="phoneType">
            <option></option>
            <option>Home</option>
            <option>Mobile</option>
            <option>Fax</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <label for="email">Email</label>
          <input type="text" class="form-control" id="email" placeholder="Email" />
        </div>
      </div>
    </div>
  )
}
