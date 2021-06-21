import { Select as AntdSelect } from "antd";
import { SelectProps } from "antd/lib/select";
import React from "react";

import styles from "./select.module.css";

const Option = AntdSelect.Option;

const Select = ({ children, ...props }: SelectProps<string>) => (
  <AntdSelect className={styles.select} {...props}>
    {children}
  </AntdSelect>
);



export { Select, Option };
