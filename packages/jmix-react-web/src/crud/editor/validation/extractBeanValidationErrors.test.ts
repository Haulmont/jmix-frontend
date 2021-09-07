import { ApolloError } from "@apollo/client";
import {extractBeanValidationErrors} from "./extractBeanValidationErrors";

const graphQLErrorPartial = {
  message: '',
  locations: [],
  path: [],
  nodes: [],
  source: undefined,
  positions: [],
  originalError: undefined,
  name: '',
};

const apolloErrorPartial = {
  message: '',
  networkError: null,
  extraInfo: '',
  name: ''
};

describe('extractBeanValidationErrors()', () => {
  it('returns fieldErrors when there are field-related constraint violations', () => {
    const apolloError: ApolloError = {
      ...apolloErrorPartial,
      graphQLErrors: [
        {
          ...graphQLErrorPartial,
          extensions: {
            constraintViolations: [
              {
                path: 'regNumber',
                message: 'error message',
              },
              {
                path: 'manufacturer',
                message: 'another message',
              }
            ]
          }
        }
      ],
      clientErrors: []
    };
    const errors = extractBeanValidationErrors(apolloError);
    expect(errors?.fieldErrors?.size).toEqual(2);
    expect(errors?.fieldErrors?.get('regNumber')).toEqual(['error message']);
    expect(errors?.fieldErrors?.get('manufacturer')).toEqual(['another message']);
  });

  it('returns globalErrors when there are non-field-related constraint violations', () => {
    const apolloError: ApolloError = {
      ...apolloErrorPartial,
      graphQLErrors: [
        {
          ...graphQLErrorPartial,
          extensions: {
            constraintViolations: [
              {
                path: '',
                message: 'global error'
              }
            ]
          }
        }
      ],
      clientErrors: []
    };

    const errors = extractBeanValidationErrors(apolloError);
    expect(errors?.globalErrors).toEqual(['global error']);
  });

  it('returns both fieldErrors and globalErrors when there are both types of constraint violations', () => {
    const apolloError: ApolloError = {
      ...apolloErrorPartial,
      graphQLErrors: [
        {
          ...graphQLErrorPartial,
          extensions: {
            constraintViolations: [
              {
                path: 'regNumber',
                message: 'error message',
              },
              {
                path: 'manufacturer',
                message: 'another message',
              },
              {
                path: '',
                message: 'global error'
              }
            ]
          }
        }
      ],
      clientErrors: []
    };

    const errors = extractBeanValidationErrors(apolloError);
    expect(errors?.globalErrors).toEqual(['global error']);
    expect(errors?.fieldErrors?.size).toEqual(2);
    expect(errors?.fieldErrors?.get('regNumber')).toEqual(['error message']);
    expect(errors?.fieldErrors?.get('manufacturer')).toEqual(['another message']);
  });

  it('multiple errors on same field', () => {
    const apolloError: ApolloError = {
      ...apolloErrorPartial,
      graphQLErrors: [
        {
          ...graphQLErrorPartial,
          extensions: {
            constraintViolations: [
              {
                path: 'regNumber',
                message: 'error1',
              },
              {
                path: 'regNumber',
                message: 'error2',
              },
              {
                path: 'regNumber',
                message: 'error3'
              }
            ]
          }
        }
      ],
      clientErrors: []
    };

    const errors = extractBeanValidationErrors(apolloError);
    expect(errors?.fieldErrors?.size).toEqual(1);
    expect(errors?.fieldErrors?.get('regNumber')).toEqual(['error1', 'error2', 'error3']);
  });

  it('returns undefined when there are no constraint violations', () => {
    const apolloError: ApolloError = {
      ...apolloErrorPartial,
      graphQLErrors: [
        {
          ...graphQLErrorPartial,
          extensions: {}
        }
      ],
      clientErrors: []
    };

    expect(extractBeanValidationErrors(apolloError)).toBeUndefined();
    expect(extractBeanValidationErrors(undefined)).toBeUndefined();
  });
});
