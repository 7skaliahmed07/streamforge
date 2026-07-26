const db = require("../config/database");


async function getAllCustomers() {

    const result = await db.query(
        `
        SELECT
            id,
            first_name,
            last_name,
            email,
            phone,
            created_at
        FROM customers
        ORDER BY id;
        `
    );


    return result.rows;

}


module.exports = {
    getAllCustomers
};