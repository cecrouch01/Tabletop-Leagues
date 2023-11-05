import decode from 'jwt-decode';

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token) {
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      sessionStorage.removeItem('id_token');
      return true;
    }
    return false;
  }

  getToken() {
    return sessionStorage.getItem('id_token');
  }

  login(idToken) {
    //TODO: find a way to avoid using window.location.reload
    sessionStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    //TODO: find a way to avoid using window.location.reload and to push the logout to the db
    sessionStorage.removeItem('id_token');
    window.location.reload();
  }
}

export default new AuthService();