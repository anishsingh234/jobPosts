
"use client";
import { useContext, useState } from "react";
import { UserContext } from "@/app/(group)/layout";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";

export default function AddJobPage() {
  const { user } = useContext(UserContext);
  const [Name, setName] = useState("");
  const [description, setdescription] = useState("");
  const [category, setcategory] = useState("");
  const [location, setlocation] = useState("");
  const [type, settype] = useState("");
  const [Apply, setApply] = useState("");
  const [salary, setsalary] = useState<Number>();
  const [loading, setloading] = useState(false);

  async function handleSubmit() {
    setloading(true);
    try {
      const data = {
        title: Name,
        description: description,
        location: location,
        salary: salary,
        apply_through: Apply,
        category: category,
        employment_type: type,
        company_id: user.company.id,
      };

      const res = await fetch("http://localhost:3000/api/job", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const resdata = await res.json();

      if (res.ok && resdata.success) {
        alert("Job added successfully");
        
        setName("");
        setdescription("");
        setcategory("");
        setlocation("");
        settype("");
        setApply("");
        setsalary(0);
      } else {
        alert("Failed to add job: " + (resdata.message || "Unknown error"));
      }
    } catch (error) {
      console.log("Error while submitting job:", error.message);
      alert("Something went wrong. Please try again later.");
    } finally {
      setloading(false);
    }
  }

  return (
    <main className="max-w-2xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Add New Job</h1>
      <Flex direction="column" gap="4">
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Name of Company
          </Text>
          <TextField.Root
            value={Name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Company Name"
          />
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Description
          </Text>
          <TextField.Root
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            placeholder="Description of Job"
          />
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Category of Job
          </Text>
          <TextField.Root
            value={category}
            onChange={(e) => setcategory(e.target.value)}
            placeholder="Category"
          />
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Location
          </Text>
          <TextField.Root
            value={location}
            onChange={(e) => setlocation(e.target.value)}
            placeholder="Location"
          />
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Type
          </Text>
          <TextField.Root
            value={type}
            onChange={(e) => settype(e.target.value)}
            placeholder="Full-time / Part-time"
          />
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Apply Through
          </Text>
          <TextField.Root
            value={Apply}
            onChange={(e) => setApply(e.target.value)}
            placeholder="Link or Email"
          />
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Salary
          </Text>
          <TextField.Root
            value={salary}
            onChange={(e) => setsalary(parseInt(e.target.value) || 0)}
            placeholder="Salary per month"
            type="number"
          />
        </label>
        <Flex justify="end">
          <Button onClick={handleSubmit} disabled={loading} color="teal">
            {loading ? "Saving..." : "Add Job"}
          </Button>
        </Flex>
      </Flex>
    </main>
  );
}
