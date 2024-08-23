const parseContactType = (contactType) => {
    if (typeof contactType !== "string") {
        return undefined;
    }
    const isType = ["work", "personal", "home"];
    return isType.includes(contactType) ? contactType : undefined;


    // if (isType(contactType)) {
    //     return contactType;
    // }

};

const parseBoolean = (value) => {
    if (typeof value === 'string') {
        if (value.toLocaleLowerCase() === "true") return true;
        if (value.toLocaleLowerCase() === "false") return false;
    }

    // const isBoolean = (boolean) => ["true", "false"].includes(boolean);
    // if (isBoolean(boolean)) return boolean;

};


export const parseFilterParams = (query) => {
    const { type, isFavourite } = query;

    const parsedType = parseContactType (type);
    const parsedIsFavourite = parseBoolean(isFavourite);

   return {
     type: parsedType,
     isFavourite: parsedIsFavourite,
   };

};