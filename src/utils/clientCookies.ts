import JSCookie from 'js-cookie';

export const ACCESS_TOKEN = 'access_token';

class ClientCookie {
  saveToken({ token, remember }: { token: string; remember: boolean }) {
    if (remember) {
      JSCookie.set(ACCESS_TOKEN, token, { expires: 7 });
    } else {
      JSCookie.set(ACCESS_TOKEN, token);
    }
  }
  getToken() {
    return JSCookie.get(ACCESS_TOKEN);
  }
  deleteSession() {
    JSCookie.remove(ACCESS_TOKEN);
  }
}

export const clientCookie = new ClientCookie();
