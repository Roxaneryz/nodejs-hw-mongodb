import { SORT_ORDER } from "../constants/index.js";


const parseSortBy = (maybeSortBy) => {
    if (typeof maybeSortBy !== "string") {
        return "_id";
    }

    const kyes = ["_id", "name", "phoneNumber", "email", "isFavourite", "contactType", "createAt"];
    if (kyes.includes(maybeSortBy)) {
        return maybeSortBy;
    }
    return "_id";
};

const parseSortOrder = (maybeSortBy) => {
    if (typeof maybeSortBy !== "string") {
        return SORT_ORDER.ASC;
    }

    if ([SORT_ORDER.ASC, SORT_ORDER.DESC].includes(maybeSortOrder)) {
        return maybeSortOrder;
    }
    return SORT_ORDER.ASC;
};

export const parseSortParams = (query) => {
    const { sortBy, sortOrder } = query;

    const parsedSortBy = parseSortBy(sortBy);
    const parsedSortOrder = parseSortOrder(sortOrder);
};