import { JmixServerError } from "@haulmont/jmix-react-core";

export function defaultMapJmixRestErrorToIntlId(error: JmixServerError): string {
  if (error.message === "Failed to fetch") 
    return "cubaRest.error.serverNotResponded";
    
  
  switch (error?.response?.status) {
  case 400: return "cubaRest.error.badRequest";
  case 401: return "cubaRest.error.unauthorized";
  case 404: return "cubaRest.error.notFound";
  case 500: return "cubaRest.error.serverError";
  default: return "cubaRest.error.unknown";
  }
}
  
export function mapJmixRestErrorToIntlId(localMapJmixRestErrorToIntlId: (error: JmixServerError) => string | void, error: JmixServerError): string {
  console.error(error);

  const errorMassageId = localMapJmixRestErrorToIntlId(error);

  return errorMassageId || defaultMapJmixRestErrorToIntlId(error);
}
  
export const loginMapJmixRestErrorToIntlId = (error: JmixServerError): string => mapJmixRestErrorToIntlId(
  (error: JmixServerError): string | void => {
    switch (error?.response?.status) {
    case 400: return 'login.failed';
    }
  },
  error,
);
  