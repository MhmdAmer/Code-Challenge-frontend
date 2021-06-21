import React,{useEffect} from "react";
import { connect, ConnectedProps } from "react-redux";
import { Layout,Row,Col } from "antd";
import { registerActions } from "./register.slice";
import { push } from "redux-first-history";

import { RootState } from "&store/store";
import { H1 } from "&styled/typography/typography.component";
import styles from "./register.module.css";
import { useLocation } from "react-router";

type ReduxProps = ConnectedProps<typeof connector>;

const ThanksComponent = (props: ReduxProps) => {
 const {setUrl,verify,url,push,isRegis}=props
  const search = useLocation().search;
  const email_url = new URLSearchParams(search).get('email_verify_url');
  const hash = new URLSearchParams(search).get('hash');
  const signature = new URLSearchParams(search).get('signature');
  useEffect(() => {
    if(!isRegis)
      push('/register')
    }, [isRegis,push])
  useEffect(() => {
 
   console.log(`${email_url}&hash=${hash}&signature=${signature}`)
    setUrl(`${email_url}&hash=${hash}&signature=${signature}`)
   
  }, [email_url, hash, setUrl, signature])

  useEffect(() => {
    if(url !== "")
      verify(url)
  }, [verify,url])
  
  



  return (
    <Layout className={styles.layout}>
          <Row justify="center">
        <Col xs={24} sm={22} md={20} lg={14} xl={14} xxl={12}></Col>
    <H1  >Thanks For Registering</H1>
    
    </Row>
    
    </Layout>
  );
};

const mapStateToProps = (state: RootState) => ({
  url:state.register.email_verify_url,
  isRegis: state.register.isRegis
});

const mapDispatchToProps = {
  push,
  verify:registerActions.verify,
  setUrl:registerActions.setEmail_Url

};

const connector = connect(mapStateToProps, mapDispatchToProps);
const ThanksComponentRedux = connector(ThanksComponent);

export { ThanksComponentRedux as ThanksComponent };
