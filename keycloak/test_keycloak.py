from keycloak import KeycloakAdmin
from keycloak.exceptions import KeycloakGetError


if __name__ == "__main__":
    keycloak_admin = KeycloakAdmin(server_url="http://localhost:8080",
                                    username='admin',
                                    password='admin',
                                    realm_name="master",
                                    verify=True)
    keycloak_admin.create_realm({
            "realm": "budget_app",
            "enabled": True
        }, skip_exists=True)
    keycloak_admin.realm_name = "budget_app"

    keycloak_admin.create_client({
            "name": "budget_app",
            "clientId": "budget_app",
            "rootUrl": "http://localhost:3000",
            "redirectUris": ["http://localhost:3000/*"],
            "webOrigins": ["http://localhost:3000"],
            "adminUrl": "http://localhost:3000",
            "standardFlowEnabled": True,
            "enabled": True,
            "publicClient": True
        }, skip_exists=True)

    keycloak_admin.create_user({
        "username": "user",
        "enabled": True,
        "credentials": [{
            "temporary": False,
            "type": "Password",
            "value": "user"
        }]
    })
