import React, {ReactNode} from "react";
import './Centered.css';

interface CenteredProps {
  children?: ReactNode;
}

const Centered = ({children}: CenteredProps) => {
  return (
    <div className='_centered'>
      {children}
    </div>
  )
};

export default Centered
