
export const Config = () => {
    let token = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).auth_token:'';

    const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            `Bearer ${token}`,
        },
      };
      return config;
}