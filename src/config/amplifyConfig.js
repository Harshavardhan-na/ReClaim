import { Amplify } from "aws-amplify";

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: "ap-southeast-2_MbncAKrao",
            userPoolClientId: "6bet58bsn32tjm2di9fqlq46do",
            loginWith: {
                email: true,
                oauth: {
                    domain: "ap-southeast-2mbncakrao.auth.ap-southeast-2.amazoncognito.com",
                    scopes: ["openid", "email"],
                    redirectSignIn: ["http://localhost:3000"],
                    redirectSignOut: ["http://localhost:3000"],
                    responseType: "code",
                },
            },
        },
    },
});

export default Amplify;