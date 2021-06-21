/**
 * This interface is for the initial state of the feature slice
 */
export interface Login {
  email: string;
  password:string;
  isLoggedIn: boolean;
  token:any
}

export interface SsoSignInBody {
  email: string;
password: string;

}
