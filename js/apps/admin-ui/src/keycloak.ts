import Keycloak from "keycloak-js";

import environment from "./environment";

export const keycloak = new Keycloak({
  url: environment.authServerUrl,
  realm: environment.loginRealm,
  clientId: environment.isRunningAsTheme
    ? "security-admin-console"
    : "security-admin-console-v2",
});

export async function initKeycloak() {
  const authenticated = await keycloak.init({
    onLoad: "check-sso",
    pkceMethod: "S256",
  });

  // Force the user to login if not authenticated.
  if (!authenticated) {
    await keycloak.login();
  }
}
