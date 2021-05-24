import React, { ReactElement } from 'react';

interface Props {
  /**
   * condition to run onTrue callback
   */
  condition?: boolean;

  /**
   * callback which returns any react element
   */
  onTrue: () => ReactElement<any, any> | null;
}


/**
 * This component is used for conditional rendering of components 
 * which were returned from passed to onTrue render function
 *
 * @example
 * const CustomComponent: React.FC = () => {
 *   return (
 *     <>
 *       <IF condition={true} onTrue = {() => (
 *         <div>
 *           any content
 *         </div>  
 *       )}/>
 *     </>
 *   )
 * }
 */
export const IF: React.FC<Props> = ({condition, onTrue}) => {
  return (
    condition ? onTrue() : null
  )
}
