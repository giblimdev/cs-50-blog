// File: /app/api/organizations/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Validation schemas
const uuidSchema = z.string().uuid("Invalid UUID format");

const createOrganizationSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(50, "Slug is too long")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug must be lowercase, alphanumeric or hyphenated"
    ),
  ownerId: uuidSchema.optional(),
});

const updateOrganizationSchema = z.object({
  id: uuidSchema,
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name is too long")
    .optional(),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(50, "Slug is too long")
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase, alphanumeric or hyphenated")
    .optional(),
});

// GET: Retrieve all organizations (no pagination)
export async function GET() {
  try {
    const organizations = await prisma.organization.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        profilePros: { select: { id: true, profileId: true } },
        owner: { select: { id: true, profileId: true } },
      },
    });
    return NextResponse.json(organizations);
  } catch (error) {
    console.error("[GET organizations] Error:", error);
    return NextResponse.json(
      { message: "Error retrieving organizations" },
      { status: 500 }
    );
  }
}

// POST: Create a new organization
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = createOrganizationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid data", errors: parsed.error.errors },
        { status: 400 }
      );
    }

    const { name, slug, ownerId } = parsed.data;

    const existingOrganization = await prisma.organization.findUnique({
      where: { slug },
    });

    if (existingOrganization) {
      return NextResponse.json(
        { message: "Slug already exists" },
        { status: 409 }
      );
    }

    const fallbackOwnerId =
      ownerId ||
      (await prisma.profilePro.findFirst({ select: { id: true } }))?.id;

    if (!fallbackOwnerId) {
      return NextResponse.json(
        { message: "No valid owner found" },
        { status: 400 }
      );
    }

    const ownerExists = await prisma.profilePro.findUnique({
      where: { id: fallbackOwnerId },
    });

    if (!ownerExists) {
      return NextResponse.json(
        { message: "Invalid owner ID" },
        { status: 400 }
      );
    }

    const newOrganization = await prisma.organization.create({
      data: {
        name,
        slug,
        ownerId: fallbackOwnerId,
        profilePros: { connect: { id: fallbackOwnerId } },
      },
      include: {
        profilePros: { select: { id: true, profileId: true } },
        owner: { select: { id: true, profileId: true } },
      },
    });

    console.log("[POST organization] Created:", newOrganization.id);
    return NextResponse.json(newOrganization, { status: 201 });
  } catch (error) {
    console.error("[POST organization] Error:", error);
    return NextResponse.json(
      { message: "Error creating organization" },
      { status: 500 }
    );
  }
}

// PUT: Update an existing organization
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = updateOrganizationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid data", errors: parsed.error.errors },
        { status: 400 }
      );
    }

    const { id, name, slug } = parsed.data;

    const organization = await prisma.organization.findUnique({
      where: { id },
    });

    if (!organization) {
      return NextResponse.json(
        { message: "Organization not found" },
        { status: 404 }
      );
    }

    if (slug) {
      const existing = await prisma.organization.findUnique({
        where: { slug },
      });
      if (existing && existing.id !== id) {
        return NextResponse.json(
          { message: "Slug already exists" },
          { status: 409 }
        );
      }
    }

    const updatedOrganization = await prisma.organization.update({
      where: { id },
      data: {
        name: name || undefined,
        slug: slug || undefined,
      },
      include: {
        profilePros: { select: { id: true, profileId: true } },
        owner: { select: { id: true, profileId: true } },
      },
    });

    console.log("[PUT organization] Updated:", updatedOrganization.id);
    return NextResponse.json(updatedOrganization);
  } catch (error) {
    console.error("[PUT organization] Error:", error);
    return NextResponse.json(
      { message: "Error updating organization" },
      { status: 500 }
    );
  }
}

// DELETE: Delete an organization by ID
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Organization ID is required" },
        { status: 400 }
      );
    }

    const parsedId = uuidSchema.safeParse(id);
    if (!parsedId.success) {
      return NextResponse.json(
        { message: "Invalid organization ID" },
        { status: 400 }
      );
    }

    const existing = await prisma.organization.findUnique({
      where: { id: parsedId.data },
    });

    if (!existing) {
      return NextResponse.json(
        { message: "Organization not found" },
        { status: 404 }
      );
    }

    await prisma.project.deleteMany({
      where: { organizationId: parsedId.data },
    });

    await prisma.organization.delete({
      where: { id: parsedId.data },
    });

    console.log("[DELETE organization] Deleted:", parsedId.data);
    return NextResponse.json({ message: "Organization successfully deleted" });
  } catch (error) {
    console.error("[DELETE organization] Error:", error);
    return NextResponse.json(
      { message: "Error deleting organization" },
      { status: 500 }
    );
  }
}
