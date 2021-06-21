import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { ConfigProvider, Spin } from "antd";
import { useTranslation } from "react-i18next";
import { usePromiseTracker } from "react-promise-tracker";

import { RootState } from "&store/store";
import "./App.css";
import "antd/dist/antd.css";
import { AppRouter } from "./App.router";

import "./interceptors";

type ReduxProps = ConnectedProps<typeof connector>;

const App = (props: ReduxProps) => {
  const { i18n } = useTranslation();
  const { promiseInProgress } = usePromiseTracker();

  /** This useEffect rerenders dir */
  useEffect(() => {}, [i18n.language]);

  return (
    /* This wrapper handles rtl and ltr directions for i18n */
    <ConfigProvider direction={i18n.dir()}>
      <AppRouter />
      <Spin spinning={promiseInProgress} />
    </ConfigProvider>
  );
};

/**
 * Maps state variables from redux store to props of currect component
 * @param state
 */
const mapStateToProps = (state: RootState) => ({});

/**
 * Maps actions from slices to props
 */
const mapDispatchToProps = {};

/**
 * Connects component to redux store
 */
const connector = connect(mapStateToProps, mapDispatchToProps);
const AppRedux = connector(App);

export { AppRedux as App };
