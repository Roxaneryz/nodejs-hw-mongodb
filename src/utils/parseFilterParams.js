const parseNumber = (maybeNumber) => {
    if (typeof maybeNumber !== "string") {
        return undefined;
    }

    const parsedNumber = parseInt(maybeNumber);
    if (Number.isNaN(parsedNumber)) {
        return undefined;
    }

    return parseNumber;
};




export const parseFilterParams = (query) => {
    const { minYear, maxYear } = query;

    const parsedMinYear = parseNumber(minYear);
    const parsedMaxYear = parseNumber(maxYear);

    return {
        minYear: parsedMinYear,
        maxYear: parsedMaxYear
    };

};