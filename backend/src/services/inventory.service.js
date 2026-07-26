const db = require("../config/database");


async function getInventory() {

    const result = await db.query(
        `
        SELECT

            inventory.product_id,

            products.name AS product_name,

            products.category,

            inventory.quantity

        FROM inventory

        JOIN products

        ON inventory.product_id = products.id

        ORDER BY inventory.product_id;
        `
    );


    return result.rows;

}


module.exports = {
    getInventory
};