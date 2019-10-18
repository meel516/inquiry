import React from 'react'
import { Alert, Row } from 'reactstrap';
import PropTypes from 'prop-types'

export default function DisplayErrors(props) {

    if (props.readOnly) {
        return (
            <section className="errors">
            </section>
        )
    }

    if (props.status.error) {
        return (
            <section className="errors">
                <Alert color="danger">
                    {props.status.message}
                </Alert>
            </section>
        )
    }

    return (
        <section className="errors">
            <Row>
                {!!props.error &&
                    <Alert color="danger">{props.message}</Alert>}
            </Row>
        </section>
    )
}

DisplayErrors.propTypes = {
    status: PropTypes.object.isRequired,
    valid: PropTypes.bool,

    readOnly: PropTypes.bool,
    error: PropTypes.bool,

    message: PropTypes.string,
}

DisplayErrors.defaultProps = {
    readOnly: false,
    error: false,
}
