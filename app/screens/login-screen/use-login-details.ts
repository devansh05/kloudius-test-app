import { useState } from 'react';
import { useUserContext } from '../../context';
import type { AuthData, AuthMode, Controls } from './types';

export const useLoginDetails = () => {
  const { saveUserAuthDetails } = useUserContext();
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [controls, setControls] = useState<Controls>({
    email: {
      value: '',
      valid: false,
      validationRules: {
        isEmail: true,
      },
      touched: false,
    },
    password: {
      value: '',
      valid: false,
      validationRules: {
        minLength: 6,
      },
      touched: false,
    },
    confirmPassword: {
      value: '',
      valid: false,
      validationRules: {
        equalTo: 'password',
      },
      touched: false,
    },
  });

  const switchAuthModeHandler = () => {
    setAuthMode((prevState: AuthMode) => {
      const newMode = prevState === 'login' ? 'signup' : 'login';

      // Reset confirm password when switching to login mode
      if (newMode === 'login') {
        setControls(prevControls => ({
          ...prevControls,
          confirmPassword: {
            ...prevControls.confirmPassword,
            value: '',
            valid: false,
            touched: false,
          },
        }));
      }

      return newMode;
    });
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(prev => !prev);
  };

  const onSaveUserAuthDetails = async (
    authData: AuthData,
    authMode: AuthMode
  ) => {
    console.log('Auth attempt:', { authData, authMode });
    await saveUserAuthDetails(authData, authMode);
  };

  const updateInputState = (inputIdentifier: keyof Controls, value: string) => {
    setControls(prevState => ({
      ...prevState,
      [inputIdentifier]: {
        ...prevState[inputIdentifier],
        value: value,
        valid: validate(
          value,
          prevState[inputIdentifier].validationRules,
          prevState
        ),
        touched: true,
      },
    }));
  };

  const validate = (val: string, rules: any, connectedValue: Controls) => {
    let isValid = true;
    for (let rule in rules) {
      switch (rule) {
        case 'isEmail':
          isValid =
            isValid &&
            /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(com|net|org|info)/.test(
              val
            );
          break;
        case 'minLength':
          isValid = isValid && val.length >= rules[rule];
          break;
        case 'equalTo':
          isValid =
            isValid &&
            val === connectedValue[rules[rule] as keyof Controls].value;
          break;
        default:
          isValid = true;
      }
    }
    return isValid;
  };

  const authHandler = async () => {
    const authData = {
      email: controls.email.value,
      password: controls.password.value,
    };
    await onSaveUserAuthDetails(authData, authMode);
  };

  const isSubmitDisabled =
    (!controls.confirmPassword.valid && authMode === 'signup') ||
    !controls.email.valid ||
    !controls.password.valid;

  return {
    authMode,
    controls,
    setControls,
    switchAuthModeHandler,
    authHandler,
    isSubmitDisabled,
    updateInputState,
    isPasswordVisible,
    isConfirmPasswordVisible,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
  };
};
