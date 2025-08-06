// @ts-nocheck
"use client";
import React, { useState } from "react";
import {Badge,Box,Button, Card,Flex, Tabs, Text, TextArea,} from "@radix-ui/themes";

export default function JoblistReviewslist({ company, reviews }) {
  const [review, setReview] = useState("");

  async function handleCreateReview() {
    const reviewToSave = {
      content: review,
      company_id: company.id,
    };

    const res = await fetch("/api/review", {
      method: "POST",
      body: JSON.stringify(reviewToSave),
    });

    const data = await res.json();

    if (data.success) {
      alert("Review created");
      setReview("");
    }
  }

  return (
    <div className="w-full flex justify-center mt-10">
      <Tabs.Root defaultValue="listed-jobs" className="w-full max-w-3xl">
        <Tabs.List className="flex justify-center border-b pb-2 mb-4">
          <Tabs.Trigger value="listed-jobs" className="px-4 py-2 text-base">
            Listed Jobs
          </Tabs.Trigger>
          <Tabs.Trigger value="reviews" className="px-4 py-2 text-base">
            Reviews
          </Tabs.Trigger>
        </Tabs.List>

        <Box pt="3">
          {/* Listed Jobs Tab */}
          <Tabs.Content value="listed-jobs">
            <Text size="3" weight="bold" className="mb-3 block">
              Latest Listed Jobs
            </Text>
            {company?.jobs?.length > 0 ? (
              <div className="space-y-4">
                {company.jobs.map((job) => (
                  <Card key={job.id} className="shadow-md">
                    <Text size="4" weight="medium">
                      {job.title}
                    </Text>
                    <Text size="2" className="text-gray-600 mt-1 block">
                      {job.description}
                    </Text>
                  </Card>
                ))}
              </div>
            ) : (
              <Text>No jobs listed.</Text>
            )}
          </Tabs.Content>

          {/* Reviews Tab */}
          <Tabs.Content value="reviews">
            <div className="flex flex-col gap-6">
              {/* Review Input */}
              <Card className="p-4">
                <TextArea
                  size="3"
                  placeholder="Add a Review…"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="w-full"
                />
                <div className="mt-3">
                  <Button onClick={handleCreateReview} className="bg-blue-600">
                    Add a Review
                  </Button>
                </div>
              </Card>

              {/* Reviews List */}
              <Card className="p-4">
                <Text size="3" weight="bold" className="mb-4 block">
                  Top Reviews
                </Text>
                <div className="space-y-4">
                  {reviews?.length > 0 ? (
                    reviews.map((review) => (
                      <Card key={review.id} className="bg-gray-50 p-3">
                        <Badge color="blue" className="mb-1">
                          {review.user.email}
                        </Badge>
                        <Text size="2" className="block">
                          {review.content}
                        </Text>
                      </Card>
                    ))
                  ) : (
                    <Text size="2">No reviews yet.</Text>
                  )}
                </div>
              </Card>
            </div>
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </div>
  );
}
