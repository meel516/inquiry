import React from 'react';

import InquiryForm from '../components/InquiryForm';
import LinksManager from '../components/LinksManager';
import Navigator from './Headers/Navigator';
import Footer from './Footers/Footer';
import Section from '../components/Section';

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
       <div className="container-fluid">
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
