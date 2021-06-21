/**
 * This interface is for the initial state of the feature slice
 */
export interface Register {
 
  /** Email Address */
  email: string | undefined;
  isRegis:Boolean
  email_verify_url:any;

 }

export interface SsoSignUpBody {
  /** User email address */
  email: string;

  /** sah256 hashed password */
  password: string;
  name:string;

  }




