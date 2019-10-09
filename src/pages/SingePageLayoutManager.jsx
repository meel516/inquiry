import React from 'react';

import InquiryForm from './forms/InquiryMinForm';
import LinksManager from '../components/LinksManager';
import Header from './Headers/Navigator';
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

  render() {
    const props = this.props;
    return (
      <div>
        <Header key="header" />
        <div className="container-fluid">
          <div className="row">
            <div className="col-2">
              <Section key="sectionlinks" />
            </div>
            <div className="col-7 inquiry-form">
              <InquiryForm key="inquiryform" {...props} />
            </div>
            <div className="col-3">
              <LinksManager key="linksmgr" />
            </div>
          </div>
        </div>
        <Footer key="footer" />
      </div>
    )
  }
}
