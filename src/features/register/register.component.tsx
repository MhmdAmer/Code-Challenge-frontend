import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Row,Layout,Col } from "antd";

import { push } from "redux-first-history";

import { RootState } from "&store/store";
import { Kyc1Component } from "./kyc1.component";
import styles from "./register.module.css";

type ReduxProps = ConnectedProps<typeof connector>;

/**
 * Main component that manages registration process.
 * Handles presentation of components based on current stage
 */
const RegisterComponent = (props: ReduxProps) => {
  



  /** Contains side effects executed at the start of specific stages */

  return (
    <Layout className={styles.layout}>
      <Row justify="center">
        <Col xs={24} sm={22} md={20} lg={14} xl={14} xxl={12}>
        <Kyc1Component />
      </Col>
    </Row>
    </Layout>
  );
};

const mapStateToProps = (state: RootState) => ({
  
});

const mapDispatchToProps = {
  push,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
const RegisterComponentRedux = connector(RegisterComponent);

export { RegisterComponentRedux as RegisterComponent };
