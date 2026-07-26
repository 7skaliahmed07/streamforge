const swaggerJsdoc = require("swagger-jsdoc");


const options = {

    definition: {

        openapi: "3.0.0",

        info: {

            title: "StreamForge API",

            version: "1.0.0",

            description:
                "Real time retail data platform API"

        },

        servers: [

            {
                url: "http://localhost:5001"
            }

        ]

    },


    apis: [

        "./src/routes/*.js"

    ]

};


const swaggerSpec =
    swaggerJsdoc(options);


module.exports = swaggerSpec;