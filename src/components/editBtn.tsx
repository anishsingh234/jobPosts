"use client";
import { Button, Dialog, Flex, Text, TextField } from '@radix-ui/themes';
import React, { useContext, useState } from 'react';
import { UserContext } from '@/app/(group)/layout';

export default function EditBtn({ item }) {
  const { user } = useContext(UserContext);

  const [Name, setName] = useState(item?.title || "");
  const [description, setdescription] = useState(item?.description || "");
  const [category, setcategory] = useState(item?.category || "");
  const [location, setlocation] = useState(item?.location || "");
  const [type, settype] = useState(item?.employment_type || "");
  const [Apply, setApply] = useState(item?.apply_through || "");
  const [salary, setsalary] = useState(item?.salary || 0);
  const [loading, setloading] = useState(false);

  async function handleSubmit() {
    setloading(true);
    try {
      const data = {
        title: Name,
        description,
        location,
        salary,
        apply_through: Apply,
        category,
        employment_type: type,
      };

      const res = await fetch(`http://localhost:3000/api/job/${item.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const resdata = await res.json();
      console.log(resdata);

      if (res.ok && resdata.success) {
        alert("Job updated successfully");
      } else {
        alert("Failed to update job: " + (resdata.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setloading(false);
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>Edit Job</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Edit Job</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Update the details of the job
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Job Title
            </Text>
            <TextField.Root
              value={Name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Job Title"
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
              Category
            </Text>
            <TextField.Root
              value={category}
              onChange={(e) => setcategory(e.target.value)}
              placeholder="Job Category"
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Location
            </Text>
            <TextField.Root
              value={location}
              onChange={(e) => setlocation(e.target.value)}
              placeholder="Job Location"
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Type
            </Text>
            <TextField.Root
              value={type}
              onChange={(e) => settype(e.target.value)}
              placeholder="Full-time / Part-time / Remote"
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Apply Through
            </Text>
            <TextField.Root
              value={Apply}
              onChange={(e) => setApply(e.target.value)}
              placeholder="Email or Link"
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Salary (per month)
            </Text>
            <TextField.Root
              type="number"
              value={salary}
              onChange={(e) => setsalary(parseInt(e.target.value) || 0)}
              placeholder="Enter salary"
            />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Button disabled={loading} onClick={handleSubmit} >
            Save
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
