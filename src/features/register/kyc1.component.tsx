import React, { useRef,useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Form,  Row,Col } from "antd";
import { FormInstance } from "antd/lib/form";
import { useTranslation } from "react-i18next";
import { push } from "redux-first-history";

import { RootState } from "&store/store";
import styles from "./register.module.css";
import { registerActions } from "./register.slice";
import { H1 } from "&styled/typography/typography.component";
import { LinkButton, PrimaryButton } from "&styled/button/button.component";
import { InputPassword, InputText } from "&styled/input/input.component";
import { usePromiseTracker } from "react-promise-tracker";


type ReduxProps = ConnectedProps<typeof connector>;

const Kyc1Component = (props: ReduxProps) => {

  const { email,  register, isRegis,push } = props;
  const { t } = useTranslation(["register", "common"]);
  const formRef = useRef<FormInstance>(null);
  const { promiseInProgress } = usePromiseTracker();


  useEffect(() :any=>{
  
    if(isRegis){
      return push("/waiting");
      
    }
  }, [isRegis,push]);

  return (
    <Row className={styles.container} align="top">
    <Col className={styles.form} span={24}>
    <Form
      name="register"
      layout="vertical"
      ref={formRef}
      initialValues={{ email }}
      onFinish={register}
    >
      <H1>{t("common:REGISTER")}</H1>
      <Form.Item
        label={t("common:EMAIL_LABEL")}
        validateFirst
        name="email"
        rules={[{ required: true }, { type: "email" }]}
      >
        <InputText
          autoComplete="email"
          placeholder={t("common:EMAIL_PLACEHOLDER")}
        />
      </Form.Item>
      
      <Form.Item
        label={t("common:NAME_LABEL")}
        validateFirst
        name="name"
        rules={[{ required: true }]}
      >
        <InputText
          autoComplete="name"
          placeholder={t("common:NAME_PLACEHOLDER")}
        />
      </Form.Item>
      
      <Form.Item
        label={t("common:PASSWORD_LABEL")}
        name="password"
        rules={[
          { required: true },
          {
            pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&]).{8,}$/,
            message: t("common:PASSWORD_HINT"),
          },
        ]}
      >
        <InputPassword
          autoComplete="new-password"
          placeholder={t("common:PASSWORD_PLACEHOLDER")}
        />
      </Form.Item>
      
     
      <Form.Item>
        <PrimaryButton loading={promiseInProgress} htmlType="submit">{t("common:CREATE_ACCOUNT")}</PrimaryButton>
      </Form.Item>
      <Row align="middle">
        <div dangerouslySetInnerHTML={{ __html: t("common:ALREADY_MESSAGE") }} />
        <LinkButton onClick={() => push("/login")}>
          {t("common:LOG_IN").toUpperCase()}
        </LinkButton>
      </Row>
    </Form>
    </Col>
    </Row>
  );
};

/**
 * Maps state variables from redux store to props of currect component
 * @param state
 */
const mapStateToProps = (state: RootState) => ({
  email: state.register.email,
  isRegis: state.register.isRegis
});

/**
 * Maps actions from slices to props
 */
const mapDispatchToProps = {
  register: registerActions.register,
  push,
};

/**
 * Connects component to redux store
 */
const connector = connect(mapStateToProps, mapDispatchToProps);
const Kyc1ComponentRedux = connector(Kyc1Component);

export { Kyc1ComponentRedux as Kyc1Component };
