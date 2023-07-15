import { passwordStrength } from 'check-password-strength';

export const getPasswordStrength = (password: string): number => {
  const value = passwordStrength(password)?.value;
  switch (value) {
    case 'Too weak': {
      return 1;
    }
    case 'Weak': {
      return 2;
    }
    case 'Medium': {
      return 3;
    }
    case 'Strong': {
      return 4;
    }
    default: {
      return 1;
    }
  }
};
