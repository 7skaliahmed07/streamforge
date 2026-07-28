export function formatCurrency(value:number){

    return new Intl.NumberFormat(
        "en-IE",
        {
            style:"currency",
            currency:"EUR",
            maximumFractionDigits:2
        }
    ).format(value);

}