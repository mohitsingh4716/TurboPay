import { useRecoilValue, useSetRecoilState } from "recoil"
import { balanceAtom } from "../atoms/balance";

export const useBalance= ()=>{
    const value= useRecoilValue(balanceAtom);
    useSetRecoilState(balanceAtom);
    return value;
}