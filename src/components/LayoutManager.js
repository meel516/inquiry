import React from 'react';

import InquiryForm from './InquiryForm';
import LinksManager from './LinksManager';
import Navigator from './Headers/Navigator';
import Footer from './Footers/Footer';
import Section from './Section';

export default class LayoutManager extends React.Component {
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
       <div className="container">
        <div className="row">
          <div className="col-2">
            <Section />
          </div>
          <div className="col-7 inquiry-form">
            <InquiryForm />
          </div>
          <div className="col-3">
            <LinksManager />
          </div>
        </div>
       </div>
       <Footer />
     </div>
   )
 }
}
