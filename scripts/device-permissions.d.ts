export const DEVICE_PERMISSIONS_POLICY: string;
export const DEVICE_FEATURE_POLICY: string;
export const DEVICE_HEADERS: {
  "Permissions-Policy": string;
  "Feature-Policy": string;
};
export function applyDevicePermissionHeaders(
  setHeader: (key: string, value: string) => void,
): void;
