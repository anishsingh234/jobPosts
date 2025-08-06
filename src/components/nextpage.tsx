import { useSearchParams } from "next/navigation";

export default function Nextpage()
{
    const searchParams=useSearchParams()
    const q = searchParams.get("q") || "";
    const jt = searchParams.get("jt") || "Full Time";
    const ap = searchParams.get("ap") || "LinkedIn";
    const page=searchParams.get('page')||1
    function handleNext()
    {
        
    }

}