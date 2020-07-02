export const objectifyPermissions = (rolePermissions) => {
  if (rolePermissions) {
    const permissions = {};
    rolePermissions.forEach((permission) => {
      permissions[permission.module] = permission;
    })
    rolePermissions = permissions;
    return rolePermissions;
  }
  return {};
}
