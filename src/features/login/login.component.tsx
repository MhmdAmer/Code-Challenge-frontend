import React ,{useEffect}  from "react";
import { Col, Form, Row, Layout, Space } from "antd";
import { connect, ConnectedProps } from "react-redux";
import { useTranslation } from "react-i18next";
import { push } from "redux-first-history";
import { usePromiseTracker } from "react-promise-tracker";

import styles from "./login.module.css";
import { RootState } from "&store/store";
import { loginActions } from "./login.slice";
import { InputPassword, InputText } from "&styled/input/input.component";
import { H1 } from "&styled/typography/typography.component";
import { LinkButton, PrimaryButton } from "&styled/button/button.component";

type ReduxProps = ConnectedProps<typeof connector>;

const LoginComponent = (props: ReduxProps) => {
  const { logIn, push,isAuth } = props;
  const { t } = useTranslation(["login", "common"]);
  const { promiseInProgress } = usePromiseTracker();



  const initialValues = {
    email: undefined,
    password: undefined,
  };


  useEffect(() => {
   if(isAuth)
    push('/home')
  }, [isAuth,push])

  const onFinish = (values: any) => {

    logIn({
      email: values.email.trim(),
      password: values.password,
    });
  
  };

  return (
    <Layout className={styles.layout}>
      <Row justify="center">
        <Col xs={24} sm={22} md={20} lg={18} xl={16} xxl={14}>

        <Row className={styles.container} align="top">
    <Col className={styles.form} span={24}>
              <Form
                name="login"
                layout="vertical"
                requiredMark={"optional"}
                initialValues={initialValues}
                onFinish={onFinish}
              >
                <Form.Item>
                  <H1>{t("LOGIN_TITLE")}</H1>
                </Form.Item>
                <Form.Item
                  name="email"
                  label={t("common:EMAIL_LABEL")}
                  rules={[
                    {
                      required: true,
                      message: t("common:REQUIRED_ERROR_MESSAGE", {
                        fieldName: t("common:EMAIL_LABEL").toLowerCase(),
                      }),
                    },
                    {
                      type: "email",
                      message: t("common:INVALID_ERROR_MESSAGE", {
                        fieldName: t("common:EMAIL_LABEL").toLowerCase(),
                      }),
                    },
                  ]}
                >
                  <InputText
                    autoComplete="email"
                    placeholder={t("common:EMAIL_PLACEHOLDER")}
                  />
                </Form.Item>
                <Form.Item
                  label={t("common:PASSWORD_LABEL")}
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: t("common:REQUIRED_ERROR_MESSAGE", {
                        fieldName: t("common:PASSWORD_LABEL"),
                      }),
                    },
                  ]}
                >
                  <InputPassword
                    autoComplete="current-password"
                    placeholder={t("common:PASSWORD_PLACEHOLDER")}
                  />
                </Form.Item>
                <Form.Item />
                <Form.Item>
                  <PrimaryButton loading={promiseInProgress} htmlType="submit">
                    {t("common:LOG_IN")}
                  </PrimaryButton>
                </Form.Item>
                <Row align="middle">
                  <Space>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: t("DONT_HAVE_MESSAGE"),
                      }}
                    />
                    <LinkButton onClick={() => push("/register")}>
                      {t("common:REGISTER").toUpperCase()}
                    </LinkButton>
                  </Space>
                </Row>
              </Form>
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
  isAuth:state.login.isLoggedIn
});

/**
 * Maps actions from slices to props
 */
const mapDispatchToProps = {
  logIn: loginActions.logIn,
  push,
};

/**
 * Connects component to redux store
 */
const connector = connect(mapStateToProps, mapDispatchToProps);
const LoginComponentRedux = connector(LoginComponent);

export { LoginComponentRedux as LoginComponent };
