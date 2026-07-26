const inventoryService =
    require("../services/inventory.service");


async function getInventory(req, res, next) {

    try {

        const inventory =
            await inventoryService.getInventory();


        res.status(200).json({

            success: true,

            count: inventory.length,

            data: inventory

        });


    } catch(error) {

        next(error);

    }

}


module.exports = {
    getInventory
};