//@ts-nocheck
import Link from "next/link";
import {Briefcase,MapPin,Layers,ExternalLink,Pencil,Trash2,} from "lucide-react";
import EditBtn from "./editBtn";
import ApplyToJob from "./applyButton";
import DeleteJobButton from "./DeleteOpenings";

export default function Card({ data, onDelete }) {
   console.log("Card Data:", data); 
  const href = `/job-details/${data?.id}`;

  return (
    <div className="p-6 border border-gray-200 rounded-2xl shadow-md bg-white max-w-xl w-full mx-auto my-6 transition-transform hover:scale-[1.01] hover:shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-teal-700">{data?.title}</h2>
        {data?.id && <ApplyToJob jobId={data.id} />}
      </div>

      <div className="text-gray-700 space-y-2 text-sm">
        <p className="flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-gray-500" />
          <span className="font-semibold text-gray-900">Company:</span>{" "}
          {data?.company?.name ?? data?.title}
        </p>

        <p className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-500" />
          <span className="font-semibold text-gray-900">Location:</span>{" "}
          {data?.location}
        </p>

        <p className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-gray-500" />
          <span className="font-semibold text-gray-900">Type:</span>{" "}
          {data?.category}
        </p>

        <p className="flex items-center gap-2">
          <ExternalLink className="w-4 h-4 text-gray-500" />
          <span className="font-semibold text-gray-900">
            Apply Through:
          </span>{" "}
          {data?.apply_through}
        </p>

        <p className="text-gray-600 line-clamp-2 mt-2">
          <span className="font-semibold text-gray-900">Description:</span>{" "}
          {data?.description}
        </p>
      </div>

      {/*Details*/}
      <div className="flex flex-wrap gap-3 items-center justify-between mt-6">
        <Link
          href={href}
          className="text-sm text-white bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-full transition duration-150"
        >
          View Details
        </Link>

        <div className="flex gap-2">
          <EditBtn item={data} />
          <DeleteJobButton id={data?.id} />
        </div>
      </div>
    </div>
  );
}
