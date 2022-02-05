import { getAll } from "../../services/educationService";

export async function getAllEducations(dispatch, params){
    await getAll(params.mid, params.fid).then((res)=>{
        if(res.status==200){
            let data = {
                educations: res.data
            };
            console.log("MAGLOG:: ", data)
            dispatch({type: 'SET_EDUCATIONS', payload: data});
        }
        else {
            dispatch({ type: "SET_ERROR", error: "Something Went Wrong" });
            return;
        }
    })
    .catch((err)=>{
        console.log("Error in getAll actions-> educationContext ", err);
        dispatch({ type: "SET_ERROR", error: "Something Went Wrong" });
    });
}