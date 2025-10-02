export interface ValidationRules {
  isEmail?: boolean;
  minLength?: number;
  equalTo?: string;
}

export interface ControlState {
  value: string;
  valid: boolean;
  validationRules: ValidationRules;
  touched: boolean;
}

export interface Controls {
  email: ControlState;
  password: ControlState;
  confirmPassword: ControlState;
}

export type AuthMode = 'login' | 'signup';

export interface AuthData {
  email: string;
  password: string;
}
