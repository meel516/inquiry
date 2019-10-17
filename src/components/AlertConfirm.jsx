import React from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types'

export default class AlertConfirm extends React.Component {
    state = {
        shouldSubmit: false,
        hasErrors: false,
    }

    componentDidMount() {
        console.log('AlertConfirm.componentDidMount()')
        this.setState({
            shouldSubmit: false,
        })
    }

    handleConfirm = (e) => {
        this.setState(prevState => ({
            shouldSubmit: !prevState.shouldSubmit,
        }));
    }

    handleOk = async (e) => {
        this.props.handleSubmit(e)
            .then(function() {
                console.log('no errors, good day')
            })
            .catch(function() {
                console.log('errors in submission')
            })
            .finally(this.handleConfirm)
    }

    render() {
        const { hasErrors } = this.state;
        return (
            <React.Fragment>
                <Button type="button" color="primary" size="sm" onClick={this.handleConfirm}>{this.props.buttonLabel || 'Submit'}</Button>
                <Modal isOpen={this.state.shouldSubmit} toggle={this.handleConfirm} className={this.props.className}>
                    <ModalBody>
                        {!hasErrors &&
                            "Are you sure you want to continue?"}
                        {hasErrors &&
                            "There are errors on the page, please check required fields before proceeding."}
                    </ModalBody>
                    <ModalFooter>
                        {!hasErrors &&
                            <SubmitButtonBar isSubmitting={this.props.isSubmitting} handleConfirm={this.handleConfirm} handleSubmit={this.handleOk} />
                        }
                        {hasErrors &&
                            <Button type="submit" size="sm" color="primary" onClick={this.handleConfirm}>Ok</Button>
                        }
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        )
    }
}

function SubmitButtonBar(props) {
    return (
        <React.Fragment>
            <Button type="submit" size="sm" color="primary" disabled={props.isSubmitting} onClick={props.handleSubmit}>Yes</Button>{' '}
            <Button type="button" color="secondary" size="sm" disabled={props.isSubmitting} onClick={props.handleConfirm}>No</Button>
        </React.Fragment>
    )
}

AlertConfirm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleValidate: PropTypes.func.isRequired,
    handleReset: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
}