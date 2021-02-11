import { JmixRestError } from "@haulmont/jmix-rest";

export function defaultMapJmixRestErrorToIntlId(error: JmixRestError): string {
    if (error.message === "Failed to fetch") {
      return "cubaRest.error.serverNotResponded";
    }
  
    switch (error?.response?.status) {
      case 400: return "cubaRest.error.badRequest";
      case 401: return "cubaRest.error.unauthorized";
      case 404: return "cubaRest.error.notFound";
      case 500: return "cubaRest.error.serverError";
      default: return "cubaRest.error.unknown";
    }
}
  
export function mapJmixRestErrorToIntlId(localMapJmixRestErrorToIntlId: (error: JmixRestError) => string | void, error: JmixRestError): string {
    console.error(error);

    const errorMassageId = localMapJmixRestErrorToIntlId(error);

    return errorMassageId || defaultMapJmixRestErrorToIntlId(error);
}
  
export const loginMapJmixRestErrorToIntlId = (error: JmixRestError): string => mapJmixRestErrorToIntlId(
    (error: JmixRestError): string | void => {
        switch (error?.response?.status) {
            case 400: return 'login.failed';
        }
    },
    error,
);
  