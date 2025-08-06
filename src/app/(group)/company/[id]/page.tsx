import Card from "@/components/card";
import DeleteCompany from "@/components/deletecompany";
import JoblistReviewslist from "@/components/jobreviews";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const id = params.id;
  let company = null;
  let owner = null;
  let reviews;

  try {
    const res = await fetch(`http://localhost:3000/api/company/${id}`);
    const data = await res.json();
    company = data.data?.company;
    owner = data.data?.company?.owner;

    const res2 = await fetch("http://localhost:3000/api/review/" + id);
    const data2 = await res2.json();
    reviews = data2.data;
  } catch (err: any) {
    console.error("Error fetching company:", err.message);
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-lg mb-10 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Company Details
          </h1>
          <h2 className="text-2xl font-semibold text-teal-700">
            {company?.name}
          </h2>
          <p className="text-gray-700 mt-2 text-base">
            {company?.description}
          </p>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-lg font-medium text-gray-800 mb-1">Owner Email</h3>
          <p className="text-gray-600">{owner?.email ?? "No owner email available"}</p>
        </div>

        <div className="pt-6">
          <DeleteCompany id={id} />
        </div>
      </div>

      <div className="w-full max-w-4xl">
        <JoblistReviewslist company={company} reviews={reviews} />
      </div>
    </div>
  );
}
