import React from "react";
import clsx from "clsx";
import styles from "./TestButton.module.css";
import type { TestButtonProps } from "./TestButton.types";

const TestButton: React.FC<TestButtonProps> = ({
  children, className, ...rest
}) => {
  
  return (
    <div
      className={clsx(styles.root, className)}
      {...rest}
    >
      {children}
    </div>
  );
};

export default TestButton;
