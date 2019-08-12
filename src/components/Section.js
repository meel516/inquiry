import React from 'react';

export default function Section(props) {
  return (
    <div class="row">
      <div class="col">
        <div class="list-group list-group-flush">
          <div class="list-group-item">
            <label>Section Links</label>
          </div>
          <div class="list-group-item">
            <a href="#contactinfo">Contact Info</a>
          </div>
          <div class="list-group-item">
            <a href="#situation">Situation</a>
          </div>
          <div class="list-group-item">
            <a href="#budget">Budget Passions & Personality</a>
          </div>
          <div class="list-group-item">
            <a href="#nextsteps">Next Steps</a>
          </div>
        </div>
      </div>
    </div>
  )
}
