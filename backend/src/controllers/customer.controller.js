const customerService = require("../services/customer.service");


async function getCustomers(req, res, next) {

    try {

        const customers =
            await customerService.getAllCustomers();


        res.status(200).json({
            success: true,
            count: customers.length,
            data: customers
        });


    } catch(error) {

        next(error);

    }

}


module.exports = {
    getCustomers
};