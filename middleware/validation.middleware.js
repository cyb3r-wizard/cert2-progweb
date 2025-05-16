import { handleErrorVal } from "#utils/validations.js";
import { ValiError } from "valibot";


export function validateParams(valParams){
    return validateCompRequest('params', valParams)
}


export function validateBody(valBody){
    return validateCompRequest('body', valBody)
}


function validateCompRequest(comp, valFunc, compNew ){

    return function(req,res,next){
        try{
            req[compNew?? comp] = valFunc(req[comp])
            next() 
        }catch(ex){
            if(ex instanceof ValiError){
                return handleErrorVal(res,ex)
            }
            throw ex
        }
    }
}