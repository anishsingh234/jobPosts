
import Card from "@/components/card";
import Image from "next/image";

export default async function Home() {
   const res=await fetch("http://localhost:3000/api/jobs")
   console.log("response is",res)
   const data= await res.json()
   const jobs=data?.data
  
  return (
  <>
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
  {jobs?.map((data, id) => (
    <Card key={id} data={data} />
  ))}
</div>

  </>
  );
}
