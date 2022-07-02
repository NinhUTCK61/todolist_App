import { getDocs, query, where, collection, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const getQueryData = async(clt, condition)=>{
    let q;
    if(condition.fielName === '' || condition.compareValue.length === 0)
    {
        return
    }else
    {
        q = query(collection(db, clt), where(condition.fielName, condition.operator, condition.compareValue), orderBy("priority"), orderBy("createdAt"));
    }
    let arrData = []
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    arrData.push({...doc.data(), id: doc.id})
    console.log(doc.id, " => ", doc.data());
    });
    return arrData
}