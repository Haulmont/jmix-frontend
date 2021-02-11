export class JmixRestError extends Error {
    public response?: Response;
    public name = 'JmixRestError' as const;

    constructor({message, response}: {
        message: string,
        response?: Response
    }) {
        super(message);
        if (response !== undefined) {
            this.response = response;
        }
    }
}
