"use client";

import Link from "next/link";
import React from "react";
import { ArrowRight } from "lucide-react";
import DysplayPath from "@/components/layout/DysplayPath";

const FeatureSection = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) => (
  <div className="feature-card bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-xl p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-indigo-200/50">
    <div className="flex items-center mb-6">
      <div className="bg-indigo-100 dark:bg-indigo-900/50 p-4 rounded-full mr-4">
        {icon}
      </div>
      <h3 className="text-2xl font-extrabold text-indigo-900 dark:text-indigo-100">
        {title}
      </h3>
    </div>
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
      {description}
    </p>
  </div>
);

export default function FeaturesPage() {
  return (
    <div className="container mx-auto px-4 py-16 bg-gradient-to-br from-indigo-50 via-teal-50 to-coral-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <DysplayPath />{" "}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-indigo-900 dark:text-indigo-100 tracking-tight mb-4 animate-in fade-in zoom-in-95">
          Star-One Features
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          A complete agile project management platform to optimize your workflow
          and improve your team&apos;s collaboration.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureSection
          title="Agile Project Management"
          description="Organize your work with a complete hierarchical structure: themes, epics, user stories, sprints, tasks, and subtasks. Track progress with different statuses (TODO, IN_PROGRESS, REVIEW, DONE, BLOCKED, CANCELLED)."
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-coral-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          }
        />

        <FeatureSection
          title="Member Management"
          description="Assign different roles to your team members (USER, READER, AUTHOR, DEV, ADMIN) with specific permissions. Track who does what and when with a complete traceability system."
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-teal-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          }
        />

        <FeatureSection
          title="Time Tracking"
          description="Record the time spent on each task with our integrated TimeLog system. Analyze productivity and improve your estimates for future projects."
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-indigo-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        />

        <FeatureSection
          title="Document Management"
          description="Organize your files in structured folders. Manage different document types (DOCUMENT, IMAGE, SPREADSHEET, PRESENTATION, ARCHIVE, CODE) with versioning and file relationships."
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-coral-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
              />
            </svg>
          }
        />

        <FeatureSection
          title="Real-time Collaboration"
          description="Comment on projects, themes, epics, user stories, and tasks. Track all activities with a detailed action log (CREATE, UPDATE, DELETE)."
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-teal-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          }
        />

        <FeatureSection
          title="Dependency Management"
          description="Define dependencies between tasks to visualize the critical path. Establish relationships between files (IMPORT, REFERENCE) to maintain consistency in your documentation."
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-indigo-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
              />
            </svg>
          }
        />

        <FeatureSection
          title="Secure Authentication"
          description="Robust authentication system with email verification, social network login, and session management. Data protection with different access levels."
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-coral-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          }
        />

        <FeatureSection
          title="Sprint Planning"
          description="Plan and manage your sprints with start and end dates. Associate user stories, tasks, and subtasks with each sprint for accurate progress tracking."
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-teal-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          }
        />

        <FeatureSection
          title="Activity Tracking"
          description="Keep track of all actions performed in the system with our detailed activity log. Identify who did what and when for complete transparency."
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-indigo-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
          }
        />
      </div>
      <div className="mt-16 text-center">
        <Link href="public/newProject">
          <button className="bg-gradient-to-r from-indigo-600 to-teal-600 text-white text-lg font-semibold py-3 px-8 rounded-lg hover:from-indigo-700 hover:to-teal-700 hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 mx-auto">
            <ArrowRight className="w-5 h-5" />
            Start a Project Now
          </button>
        </Link>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Discover how Star-One can transform the way you manage your projects.
        </p>
      </div>
    </div>
  );
}
