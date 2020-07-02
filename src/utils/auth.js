export const AUTH_TOKEN_KEY = 'REPAIR_DESK_TOKEN'

export const checkAuth = () => {
  return localStorage && localStorage.getItem(AUTH_TOKEN_KEY);
}

export const setAuth = (token) => {
  localStorage && localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export const logout = () => {
  localStorage && localStorage.removeItem(AUTH_TOKEN_KEY);
}

export const isModuleAccessible = (user, moduleName) => {
  if (user.isSuper || (user.role && user.role.permissions && user.role.permissions[moduleName] && user.role.permissions[moduleName].access === true)) {
    return true;
  } else {
    return false;
  }
}
