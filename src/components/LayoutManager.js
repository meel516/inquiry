import React, { Component } from 'react';
import InquiryForm from './InquiryForm';
import LinksManager from './LinksManager';
import Contact from './Contact';
import Navigator from './Navigator';
import Footer from './Footer';
import Section from './Section';

class LayoutManager extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    console.log('handling form submit')
    event.preventDefault();
  }

  render () {
   return (
     <div>
       <Navigator/>
       <div class="container">
        <div class="row">
          <div class="col-2">
            <Section />
          </div>
          <div class="col-7 inquiry-form">
            <InquiryForm />
          </div>
          <div class="col-3">
            <LinksManager />
          </div>
        </div>
       </div>
       <Footer />
     </div>
   )
 }
}

export default LayoutManager;
