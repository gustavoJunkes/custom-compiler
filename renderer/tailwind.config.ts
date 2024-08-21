import plugin from "tailwindcss/plugin";


/** @type {import("tailwindcss").Config} */
module.exports = {
    content: [
        "./renderer/pages/**/*.{js,ts,jsx,tsx}",
        "./renderer/components/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            fontFamily: {
                "roboto-mono": ["var(--font-roboto-mono)"]
            }
        }
    },
    plugins: [
        require("tailwindcss-animate"),
        // Adding child variants
        plugin(({ addVariant }) => {
            addVariant("child", "& > *");
            addVariant("child-hover", "& > *:hover");
            addVariant("child-focus", "& > *:focus");
            addVariant("child-active", "& > *:active");
        })
    ]
};