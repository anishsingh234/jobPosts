import Card from "@/components/card";
import DeleteCompany from "@/components/deletecompany";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const id = params.id;
  let company = null;
  let owner = null;

  try {
    const res = await fetch(`http://localhost:3000/api/company/${id}`);
    const data = await res.json();
    company = data.data?.company;
    owner = data.data?.company?.owner;
  } catch (err: any) {
    console.log("Error fetching company:", err.message);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="bg-white w-full max-w-2xl p-8 rounded-lg shadow-md space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Company Details</h1>
          <h2 className="text-xl font-semibold text-teal-700">{company?.name}</h2>
          <p className="text-gray-700 mt-1">{company?.description}</p>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-lg font-medium text-gray-800">Owner Email</h3>
          <p className="text-gray-600">{owner?.email ?? "No owner email available"}</p>
        </div>

        <div className="pt-4">
          <DeleteCompany id={id} />
        </div>
      </div>

      {company?.jobs?.length > 0 && (
        <div className="mt-8 w-full max-w-2xl space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Jobs at {company?.name}</h2>
          {company.jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md border border-gray-200 transition duration-150"
            >
              <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
              <p className="text-gray-700 mt-1">{job.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
