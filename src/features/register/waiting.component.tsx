import React, {useEffect} from "react";
import { connect, ConnectedProps } from "react-redux";
import { Layout,Row,Col } from "antd";

import { push } from "redux-first-history";

import { RootState } from "&store/store";
import { H1 } from "&styled/typography/typography.component";
import styles from "./register.module.css";

type ReduxProps = ConnectedProps<typeof connector>;

/**
 * Main component that manages registration process.
 * Handles presentation of components based on current stage
 */
const WaitingComponent = (props: ReduxProps) => {
  const {isRegis,push} = props
  
  useEffect(() => {
  if(!isRegis)
    push('/register')
  }, [isRegis,push])



  /** Contains side effects executed at the start of specific stages */

  return (
    <Layout className={styles.layout}>
          <Row justify="center">
        <Col xs={24} sm={22} md={20} lg={14} xl={14} xxl={12}></Col>
    <H1>Check Your Email For Verification</H1>
    
    </Row>
    
    </Layout>
  );
};

const mapStateToProps = (state: RootState) => ({
  isRegis:state.register.isRegis
});

const mapDispatchToProps = {
  push,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
const WaitingComponentRedux = connector(WaitingComponent);

export { WaitingComponentRedux as WaitingComponent };
