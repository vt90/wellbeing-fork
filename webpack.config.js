/**
 * Created by vladtomsa on 21/03/2021
 */
const Dotenv = require("dotenv-webpack");

module.exports = {
    plugins: [
        new Dotenv({
            systemvars: true,
        }),
    ],
};
