/**
 * Created by strukov on 20.12.16.
 */
export interface SubmitForm {
  email: string;
  password: string;
  formType: {
    type: string;
    registration: {
      fullname: string;
    },
    login: {
      isHuman: boolean;
    }
  }
}
