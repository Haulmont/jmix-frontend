import {ApolloError} from "@apollo/client";
import { JmixConstraintViolation } from "@haulmont/jmix-react-core";
import { useMemo } from "react";
import {JmixServerValidationErrors} from "../../../common/JmixServerValidationErrors";

export function extractBeanValidationErrors(apolloError?: ApolloError): JmixServerValidationErrors | undefined {
  if (apolloError == null) {
    return undefined;
  }

  const constraintViolations = apolloError
    ?.graphQLErrors
    ?.[0]
    ?.extensions
    ?.constraintViolations;

  if (constraintViolations == null) {
    return undefined;
  }

  const fieldErrors = new Map<string, string[]>();
  const globalErrors: string[] = [];

  constraintViolations.forEach((violation: JmixConstraintViolation) => {
    // Global error, e.g. cross-validation
    if (violation.path === '') {
      globalErrors.push(violation.message);
      return;
    }

    // Field error
    const messages = fieldErrors.get(violation.path) ?? [];
    messages.push(violation.message);
    fieldErrors.set(violation.path, messages);
  });

  return {
    fieldErrors,
    globalErrors
  };
}

export function useExtractBeanValidationErrors(apolloError?: ApolloError): JmixServerValidationErrors | undefined {
  return useMemo(() => extractBeanValidationErrors(apolloError), [apolloError]);
}