import Cookies from 'js-cookie';

export function getCookie(key: string) {
  return Cookies.get(key) ?? localStorage.getItem(`cookie-${key}`);
}

// 清除cookie
export function clearCookie(key: string) {
  Cookies.remove(key);
  localStorage.removeItem(`cookie-${key}`);
}