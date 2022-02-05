import { getById } from "../../services/memberService";

export async function getMemberById(dispatch, params){
    await getById(params.fid, params.mid).then((res)=>{
        if(res.status==200){
            let data = {
                member: res.data
            };
            console.log("MAGLOG:: ", data)
            dispatch({type: 'SET_MEMBER', payload: data});
        }
        else {
            dispatch({ type: "SET_ERROR", error: "Something Went Wrong" });
            return;
        }
    })
    .catch((err)=>{
        console.log("Error in getById actions-> memberContext ", err);
        dispatch({ type: "SET_ERROR", error: "Something Went Wrong" });
    });
}