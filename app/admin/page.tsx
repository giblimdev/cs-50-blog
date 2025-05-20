import React from "react";
import { CheckCircle2 } from "lucide-react";
import DysplayPath from "@/components/layout/DysplayPath";

export default function AdminPage() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 via-teal-50 to-coral-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen">
      <DysplayPath />
      <div className="container mx-auto">
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-3xl shadow-2xl p-10 max-w-4xl mx-auto text-center transition-all duration-500 hover:shadow-3xl border border-indigo-200/50 animate-in fade-in zoom-in-95">
          <h1 className="text-5xl font-extrabold text-indigo-900 dark:text-indigo-100 tracking-tight mb-6">
            Admin Page
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            The admin page, also known as the dashboard or backend, is a private
            and secure section of a web application or website that is not
            directly accessible to end-users. Its primary role is to provide an
            interface for administrators and system managers to efficiently
            control, configure, and maintain the application or website.
          </p>
          <ul className="list-none mt-8 text-left space-y-6 max-w-3xl mx-auto">
            {[
              {
                title: "User Management",
                description:
                  "Creating, editing, deleting, and managing user accounts, as well as their roles and access permissions to different functionalities.",
              },
              {
                title: "Content Management",
                description:
                  "Creating, editing, publishing, and deleting textual content, images, videos, and other elements displayed on the public-facing part of the website or application.",
              },
              {
                title: "System Configuration",
                description:
                  "Modifying the general settings of the application or website, such as the default language, display options, database connections, and other technical parameters.",
              },
              {
                title: "Monitoring",
                description:
                  "Supervising the performance of the application or website, analyzing usage statistics, identifying potential errors or security issues, and performing preventative maintenance tasks.",
              },
              {
                title: "Customization",
                description:
                  "Adapting the appearance and behavior of the application or website to specific needs, through the management of themes, plugins, or other extensions.",
              },
              {
                title: "Order and Customer Management (for e-commerce)",
                description:
                  "Processing orders, managing customer information, updating the product catalog, and performing other tasks related to online sales.",
              },
              {
                title: "Permissions and Roles Management",
                description:
                  "Defining who has access to which functionalities within the admin page itself, thereby ensuring the security and integrity of the system.",
              },
            ].map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-4 animate-in fade-in slide-in-from-bottom-10"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CheckCircle2 className="h-6 w-6 text-coral-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="font-semibold text-indigo-900 dark:text-indigo-100 text-lg">
                    {item.title}:
                  </strong>{" "}
                  <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {item.description}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            In summary, the admin page is the backbone that enables the
            operation and management of a web application or website. Without
            it, it would be very difficult to keep content up-to-date, manage
            users, and ensure the stability and security of the system. It is a
            powerful tool that requires controlled access and responsible use to
            ensure the proper functioning of the platform.
          </p>
        </div>
      </div>
    </section>
  );
}
