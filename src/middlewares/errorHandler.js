import { isHttpError } from "http-errors";


export const errorHandler = async (error, req, res, next) => {
    if (isHttpError(error) === true) {
        return res.status(error.status).send({
            status: error.status,
            message: error.message,
        });
    }
    console.error(error);

    res.status(500).send({ status: 500, message: "Internal Server Error" });
};
