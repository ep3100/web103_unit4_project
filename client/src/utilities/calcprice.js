export const PRICES = {
    base: 20000,
    exterior: { red: 0, blue: 500, black: 700 },
    wheels: { standard: 0, sport: 1500 },
    interior: { fabric: 0, leather: 1000 }
}

export function calcPrice({ exterior='red', wheels='standard', interior='fabric' } = {}) {
    return (
        PRICES.base +
        (PRICES.exterior[exterior] ?? 0) +
        (PRICES.wheels[wheels] ?? 0) +
        (PRICES.interior[interior] ?? 0)
    )
}

export function validateCombo({ exterior, wheels }) {
    if (exterior === 'black' && wheels === 'sport') {
        return 'Sport wheels are not avaiable with black exterior.'
    }
    return null
}