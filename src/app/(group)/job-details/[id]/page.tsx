// app/job/[id]/page.tsx
import { notFound } from "next/navigation";

export type dynam = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: dynam) {
  const { id } = params;

  const res = await fetch(`http://localhost:3000/api/job/${id}`);

  if (!res.ok) return notFound();

  const data = await res.json();
  const job = data?.data;

  if (!job) return notFound();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-purple-50 py-12 px-4 flex justify-center items-start">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-2xl w-full border border-gray-200">
        <h1 className="text-2xl font-bold text-teal-700 mb-4">
          {job.title}
        </h1>

        <div className="space-y-3 text-gray-700 text-base">
          <p>
            <span className="font-semibold text-gray-900">Company:</span>
            {job.employer_type}
          </p>
          <p>
            <span className="font-semibold text-gray-900">Apply Through:</span>
            {job.apply_through}
          </p>
          <p>
            <span className="font-semibold text-gray-900">Category:</span>
            {job.category}
          </p>
          <p>
            <span className="font-semibold text-gray-900">Location:</span>
            {job.location}
          </p>
          <div>
            <p className="font-semibold text-gray-900 mb-1">Description:</p>
            <p className="text-teal-600 whitespace-pre-line ">
              {job.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
