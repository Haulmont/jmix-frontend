// Designed as replacement for JmixRestError
export interface JmixServerError extends Error {
  response?: Response
}

export function createJmixServerError(response: Response): JmixServerError {
  return new JmixServerErrorImpl(response);
}

class JmixServerErrorImpl extends Error implements JmixServerError {
  constructor(public response: Response) {
    super(response.statusText);
    this.name = 'JmixServerError';
  }
}
