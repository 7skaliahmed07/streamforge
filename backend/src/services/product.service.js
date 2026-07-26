const db = require("../config/database");


async function getAllProducts() {

    const result = await db.query(
        `
        SELECT
            id,
            name,
            category,
            price,
            created_at
        FROM products
        ORDER BY id;
        `
    );


    return result.rows;

}


module.exports = {
    getAllProducts
};