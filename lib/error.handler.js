'use strict'

export function errorHandler(error) {
    console.error(error.stack);
    throw new Error("Fallo en la operación. Por favor, inténtalo de nuevo más tarde.");
}