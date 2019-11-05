export default class ServerError extends Error {
    constructor(status, message, entity, ...params) {
        super(...params)

        this.status = status;
        this.message = message;
        this.entity = entity;
    }
}
