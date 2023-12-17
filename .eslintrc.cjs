module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ["eslint:recommended", "plugin:react/recommended", "plugin:react-hooks/recommended"],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: "module",
    },
    plugins: ["react"],
    rules: {
        "react/prop-types": "off", // Disable prop-types check
        "react/react-in-jsx-scope": "off", // Disable React import check
        "no-dupe-keys": "off", // Allow duplicate keys
        "no-undef": ["error", { typeof: true, ignoreRestSiblings: true }],
    },
};
