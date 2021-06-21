import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";

import { history, RootState } from "&store/store";
import { ProtectedRoute } from "&route/protectedRoute";
// TODO remove demo routes
import { LoginComponent } from "&features/login/login.component";
import { RegisterComponent } from "&features/register/register.component";
import { WaitingComponent } from "&features/register/waiting.component";
import { ThanksComponent } from "&features/register/thankYou.component";
import { AdminComponent } from "&features/admin/admin.component";

type ReduxProps = ConnectedProps<typeof connector>;

const AppRouter = (props: ReduxProps) => {
  const { isAuthenticated } = props;

  return (
    <Router history={history}>
     
      <Switch>
       
        <Route exact path="/" component={RegisterComponent} />
        <Route exact path="/login" component={LoginComponent} />
        <Route exact path="/thank" component={ThanksComponent} />
        <Route exact path="/register" component={RegisterComponent} />
        <Route exact path="/wait" component={WaitingComponent} />
        <ProtectedRoute
          exact
          path="/home"
          component={AdminComponent}
          validator={isAuthenticated}
          fallBack="/login"
        />

        {/* TODO This block handles unmatched routes. Add your custom 404 component */}
        <Route path="/404" render={() => <div>page not found</div>} />
        <Redirect to="/404" />
      </Switch>
    </Router>
  );
};

/**
 * Maps state variables from redux store to props of currect component
 * @param state
 */
const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.login.isLoggedIn,
});

/**
 * Maps actions from slices to props
 */
const mapDispatchToProps = {};

/**
 * Connects component to redux store
 */
const connector = connect(mapStateToProps, mapDispatchToProps);
const AppRouteRedux = connector(AppRouter);

export { AppRouteRedux as AppRouter };
