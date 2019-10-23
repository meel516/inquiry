import React from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types'
import { toast } from 'react-toastify';

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

        })
        .catch(function() {
            toast.error("Please fix the errors before continuing.", {
                position: toast.POSITION.TOP_CENTER
            });
        })
        .finally(this.handleConfirm)
    }

    render() {
        return (
            <React.Fragment>
                <Button 
                    type="button" 
                    color="primary" 
                    size="sm" 
                    onClick={this.handleConfirm} 
                    disabled={this.props.isReadOnly}
                >
                    {this.props.buttonLabel || 'Submit'}
                </Button>
                <Modal isOpen={this.state.shouldSubmit} toggle={this.handleConfirm} className={this.props.className}>
                    <ModalBody>Are you sure you want to continue?</ModalBody>
                    <ModalFooter>
                        <SubmitButtonBar 
                            isSubmitting={this.props.isSubmitting} 
                            isReadOnly={this.props.isReadOnly} 
                            handleConfirm={this.handleConfirm} 
                            handleSubmit={this.handleOk} 
                        />
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        )
    }
}

function SubmitButtonBar(props) {
    return (
        <React.Fragment>
            <Button type="button" size="sm" color="primary" disabled={props.isSubmitting} onClick={props.handleSubmit}>Yes</Button>{' '}
            <Button type="button" color="secondary" size="sm" disabled={props.isSubmitting} onClick={props.handleConfirm}>No</Button>
        </React.Fragment>
    )
}

AlertConfirm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleValidate: PropTypes.func.isRequired,
    handleReset: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,

    isReadOnly: PropTypes.bool,
}

AlertConfirm.defaultProps = {
    isReadOnly: false,
}