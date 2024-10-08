


export const redirect = (status: string) => {
  switch (status) {
    case 'loginSuccess':
      window.location.href = '/admin/home';
      break;
    case 'loginFailed':
      window.location.href = '/admin/login';
      break;
    case 'loginUserSuccess':
      window.location.href = '/home';
      break;
    default:
      console.error('Unknown redirect status:', status);
  }
};
