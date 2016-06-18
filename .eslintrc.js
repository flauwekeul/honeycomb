module.exports = {
    "env": {
        "es6": true,
        "shared-node-browser": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "no-console": [
            "error",
            { "allow": [ "warn" ] }
        ]
    }
};
