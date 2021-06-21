import React, { useEffect } from "react";
import {  Layout,List,  Space,Row,Col, Radio,Select, InputNumber } from "antd";
import { connect, ConnectedProps } from "react-redux";
import { push } from "redux-first-history";


import { InputText } from "&styled/input/input.component";
import { LinkButton, PrimaryButton } from "&styled/button/button.component";
import styles from "./admin.module.css";
import { RootState } from "&store/store";
import { adminActions } from "./admin.slice";
import { loginActions } from "../login/login.slice";


type ReduxProps = ConnectedProps<typeof connector>;

const AdminComponent = (props: ReduxProps) => {
  const { getCustomers,customers,push,perPage,filterSearch,filter,page,total ,setPage,setFilter,
    setFilterSearch,setPerPage,average,type,time,getAverage,setTime,setType,isAuth,logout} = props;
 

    useEffect(() => {
        if(!isAuth)
             push('/login')
    }, [isAuth,push])

  useEffect(() => {
    getCustomers({perPage,page,filter,filterSearch});
  }, [getCustomers,perPage,page,filter,filterSearch]);


  useEffect(() => {
    getAverage({time,type})
  }, [time,type,getAverage])

  return (
    <Layout className={styles.layout}>
        <Row justify="center">
        <PrimaryButton  onClick={()=>logout()} >
                    Log Out
                  </PrimaryButton>
         <Col xs={24} sm={22} md={20} lg={18} xl={16} xxl={14}>

<Row className={styles.container} >
<Col className={styles.form} span={24}>
    <h2>Average Registrations:{average}</h2><InputNumber defaultValue={time} onChange={(e)=>setTime(e)}/>
    <Select defaultValue={`By ${type}`} onChange={(e)=>setType(e)}>
            <option value="hours">By Hours</option>
            <option value="weeks">By Weeks</option>
            <option value="months">By Months</option>
            <option value="years">By Years</option>
            </Select>
            <Space></Space>
        {customers !== null?<>
        <InputText onChange={(e)=>setFilterSearch(e.target.value)} placeholder={` ${filter !== null ? "Filter By "+filter : "Choose one From down options" }`}/>   
        <Radio.Group onChange={(e)=>setFilter(e.target.value)} value={filter}>
        <Space direction="vertical">
          <Radio value="id"> Id</Radio>
          <Radio value="name">Name</Radio>
          <Radio value="email">Email</Radio>
         
        </Space>
      </Radio.Group>
          
      <List
      pagination={{
          total:total,
        defaultCurrent:page,
        onChange: page => {
            
        setPage(page)
        },
        pageSize: perPage,
      }}
    itemLayout="horizontal"
    dataSource={customers}
    renderItem={(item:any) => (
      <List.Item>
        <List.Item.Meta
          title={item.name}
          description={`Email ${item.email}`}
        />
      </List.Item>
    )}
  />
    <Select defaultValue={`${perPage}/Page`} onChange={(e)=>setPerPage(e)}>
            <option value="20">20/Page</option>
            <option value="40">40/Page</option>
            <option value="60">60/Page</option>
            </Select>
  </>:null}
  </Col>
  </Row>
  </Col>
  </Row>
    </Layout>
  );
};

/**
 * Maps state variables from redux store to props of currect component
 * @param state
 */
const mapStateToProps = (state: RootState) => ({
    customers:state.admin.customers,
    perPage:state.admin.perPage,
    filter:state.admin.filter,
    filterSearch:state.admin.filterSearch,
    page: state.admin.page,
    total:state.admin.totalPages,
    average:state.admin.average,
    type:state.admin.type,
    time:state.admin.time,
    isAuth:state.login.isLoggedIn
    
});

/**
 * Maps actions from slices to props
 */
const mapDispatchToProps = {
    getCustomers: adminActions.getCustomers,
    setPage: adminActions.setPage,
    setFilter: adminActions.setFilter,
    setFilterSearch:adminActions.setFilterSearch,
    setPerPage:adminActions.setPerPage,
    getAverage:adminActions.getAverage,
    setType:adminActions.setType,
    setTime:adminActions.setTime,
    logout:loginActions.logOut,
  push,
};

/**
 * Connects component to redux store
 */
const connector = connect(mapStateToProps, mapDispatchToProps);
const AdminComponentRedux = connector(AdminComponent);

export { AdminComponentRedux as AdminComponent };
