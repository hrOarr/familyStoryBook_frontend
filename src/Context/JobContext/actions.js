import { getAll } from "../../services/jobService";

export async function getAllJobs(dispatch, params){
    await getAll(params.mid, params.fid).then((res)=>{
        if(res.status==200){
            let data = {
                jobs: res.data
            };
            console.log("MAGLOG:: ", data)
            dispatch({type: 'SET_JOBS', payload: data});
        }
        else {
            dispatch({ type: "SET_ERROR", error: "Something Went Wrong" });
            return;
        }
    })
    .catch((err)=>{
        console.log("Error in getAll actions-> jobContext ", err);
        dispatch({ type: "SET_ERROR", error: "Something Went Wrong" });
    });
}