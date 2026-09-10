/** Shop desk login. Better Auth still stores an email; the form maps this username to it. */
export const STAFF_ADMIN_ID = "staff-admin";
export const STAFF_ADMIN_USERNAME = "admin";
export const STAFF_ADMIN_NAME = "Admin";
export const STAFF_ADMIN_EMAIL = "admin@staff.southend.pizza";
export const STAFF_ADMIN_PASSWORD = "Admin2014";

export function isStaffAdminUsername(raw: string) {
  return raw.trim().toLowerCase() === STAFF_ADMIN_USERNAME;
}
