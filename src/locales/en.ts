import { loginNameSpace } from "&features/login/login.i18n";


/**
 * English translation resources.
 * Each object correspond to a namespace related to a feature.
 */
let en = {

  login: loginNameSpace.en,

  common:{


    REGISTER: "Register",
    LOG_IN: "Log In",
    LOG_OUT: "Log Out",

    NEW: "New",
    CREATE: "Create",
    CANCEL: "Cancel",
    ALREADY_MESSAGE: "Already have an Account?",
    PASSWORD_HINT:
      "Should contain UPPER & lower case, numbers, one of @ $ ! % * # ? &",
    NAME_PLACEHOLDER:"john doe",
    NAME_LABEL:"Name",

    CREATE_ACCOUNT: "Create account",
    EMAIL_LABEL: "Email address",
    MOBILE_LABEL: "Mobile number",
    PASSWORD_LABEL: "Password",
    CONFIRM_PASSWORD_LABEL: "Confirm Password",
    ORGANIZATION_LABEL: "Organization",

    // Placeholders
    EMAIL_PLACEHOLDER: "someone@example.com",
    MOBILE_PLACEHOLDER: "03112233",
    PASSWORD_PLACEHOLDER: "********",
    SEARCH_PLACEHOLDER: "Search ...",
    ORGANIZATION_PLACEHOLDER: "e.g. areeba",

    // ERRORS
    REQUIRED_ERROR_MESSAGE: "Please provide {{fieldName}}!",
    INVALID_ERROR_MESSAGE: "Please make sure {{fieldName}} is valid!",
  }
};

export default en;
