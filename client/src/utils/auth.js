import decode from 'jwt-decode';

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        sessionStorage.removeItem('id_token');
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    return sessionStorage.getItem('id_token');
  }

  login(idToken) {
    //TODO: find a way to avoid using window.location.reload
    sessionStorage.setItem('id_token', idToken);
    window.location.assign('/dashboard');
  }

  logout() {
    //TODO:session find a way to avoid using window.location.reload and to push the logout to the db
    sessionStorage.removeItem('id_token');
    window.location.assign('/dashboard');
  }
}

export default new AuthService();

// import decode from 'jwt-decode';

// class AuthService {
//   getProfile() {
//     return decode(this.getToken());
//   }

//   loggedIn() {
//     const token = this.getToken();
//     return !!token && !this.isTokenExpired(token);
//   }

//   isTokenExpired(token) {
//     try {
//       const decoded = decode(token);
//       if (decoded.exp < Date.now() / 1000) {
//         localStorage.removeItem('id_token');
//         return true;
//       } else return false;
//     } catch (err) {
//       return false;
//     }
//   }

//   getToken() {
//     return localStorage.getItem('id_token');
//   }

//   login(idToken) {
//     //TODO: find a way to avoid using window.location.reload
//     localStorage.setItem('id_token', idToken);
//     window.location.assign('/dashboard');
//   }

//   logout() {
//     //TODO: find a way to avoid using window.location.reload and to push the logout to the db
//     localStorage.removeItem('id_token');
//     window.location.assign('/dashboard');
//   }
// }

// export default new AuthService();