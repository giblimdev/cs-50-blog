//@/components/organization/create.tsx
"use client";

import React, { useState } from "react";
import { useProfessional } from "@/hooks/useProfessional";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { z } from "zod";

// Validation schema (corresponds to createOrganizationSchema from the API)
const formSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(50, "Slug is too long")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug must be lowercase, alphanumeric, or contain hyphens"
    ),
});

interface FormData {
  name: string;
  slug: string;
}

interface CreateOrganizationProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function OrgaCreate({
  onClose,
  onSuccess,
}: CreateOrganizationProps) {
  const { userId, profileProId } = useProfessional();
  const [formData, setFormData] = useState<FormData>({ name: "", slug: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );

  // Handles field changes with automatic slug formatting
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue =
      name === "slug" ? value.toLowerCase().replace(/\s+/g, "-") : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Client-side validation
    const result = formSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0],
        slug: fieldErrors.slug?.[0],
      });
      toast.error("Please correct the errors in the form.");
      return;
    }

    if (!profileProId) {
      toast.error("Professional profile required to create an organization.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/organizations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: formData.name,
          slug: formData.slug,
        }),
      });

      if (response.ok) {
        toast.success("Organization created successfully!");
        setFormData({ name: "", slug: "" }); // Reset the form
        onSuccess();
        onClose();
      } else {
        const errorData = await response.json();
        const errorMessage =
          errorData.message || "Error creating the organization.";
        if (errorData.errors) {
          // Handle Zod validation errors from the API
          const fieldErrors = errorData.errors.reduce(
            (
              acc: Record<string, string>,
              err: { path: string[]; message: string }
            ) => {
              if (err.path[0]) acc[err.path[0]] = err.message;
              return acc;
            },
            {}
          );
          setErrors(fieldErrors);
        } else if (response.status === 409) {
          setErrors({ slug: "This slug is already in use." });
        }
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Network or unexpected error:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle loading state if useProfessional is asynchronous
  if (!userId && !profileProId && !isSubmitting) {
    return <div className="text-center p-6">Loading profile...</div>;
  }

  return (
    <div className="max-w-md mx-auto p-6">
      {/* Display IDs only in development */}
      {process.env.NODE_ENV === "development" && (
        <p className="text-gray-700 mb-4">
          User: {userId || "N/A"} | Pro Profile: {profileProId || "N/A"}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Organization Name"
            required
            disabled={isSubmitting}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="text-red-500 text-sm mt-1">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="slug"
            className="block text-sm font-medium text-gray-700"
          >
            Slug
          </label>
          <Input
            id="slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="organization-name"
            required
            disabled={isSubmitting}
            aria-invalid={!!errors.slug}
            aria-describedby={errors.slug ? "slug-error" : undefined}
          />
          {errors.slug && (
            <p id="slug-error" className="text-red-500 text-sm mt-1">
              {errors.slug}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              "Create"
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
