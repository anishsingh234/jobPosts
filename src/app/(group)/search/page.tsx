
import Card from "@/components/card";
import prismaclient from "@/services/prisma";

export default async function Home({ searchParams }) {
  const q = searchParams?.q;
  const jt = searchParams?.jt || "Full Time";
  const ap = searchParams?.ap || "LinkedIn";
 // const page=searchParams.page||1

  const res=await fetch(`http://localhost:3000/api/search?q=${q}&jt=${jt}&ap=${ap}`)
  const data=await res.json()
  const jobs=data.data
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {jobs.length > 0 ? (
        jobs.map((data) => (
          <Card key={data.id} data={data} />
        ))
      ) : (
        <p className="text-gray-600 col-span-full">No jobs found.</p>
      )}
    </div>
  );
}
