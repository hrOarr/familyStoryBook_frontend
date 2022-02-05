import { getAll } from "../../services/achievementService";

export async function getAllAchievements(dispatch, params){
    await getAll(params.mid, params.fid).then((res)=>{
        if(res.status==200){
            let data = {
                achievements: res.data
            };
            console.log("MAGLOG:: ", data)
            dispatch({type: 'SET_ACHIEVEMENTS', payload: data});
        }
        else {
            dispatch({ type: "SET_ERROR", error: "Something Went Wrong" });
            return;
        }
    })
    .catch((err)=>{
        console.log("Error in getAll actions-> achievementContext ", err);
        dispatch({ type: "SET_ERROR", error: "Something Went Wrong" });
    });
}