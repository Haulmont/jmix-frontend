import React, { ReactNode } from "react";
import styles from "./Centered.module.css";

interface CenteredProps {
  children?: ReactNode;
}

const Centered = ({ children }: CenteredProps) => {
  return <div className={styles.centered}>{children}</div>;
};

export default Centered;
