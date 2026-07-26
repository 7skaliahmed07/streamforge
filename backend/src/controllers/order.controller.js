const orderService =
    require("../services/order.service");


async function getOrders(req, res, next) {

    try {

        const orders =
            await orderService.getAllOrders();


        res.status(200).json({

            success: true,

            count: orders.length,

            data: orders

        });


    } catch(error) {

        next(error);

    }

}


module.exports = {
    getOrders
};