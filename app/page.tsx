import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Rocket, Shield, Layout } from "lucide-react";
import { Card } from "@/components/ui/card";
import DysplayPath from "@/components/layout/DisplayPath";

export default function Home() {
  const features = [
    {
      icon: <Rocket className="h-8 w-8 text-indigo-500" />,
      title: "Rapid Development",
      description: "Ready-to-use template with optimized architecture",
    },
    {
      icon: <Shield className="h-8 w-8 text-teal-500" />,
      title: "Integrated Security",
      description: "Complete authentication with roles and permissions",
    },
    {
      icon: <Layout className="h-8 w-8 text-coral-500" />,
      title: "Modern UI",
      description: "Customizable and accessible Shadcn/ui components",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1">
        <DysplayPath />
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-600 to-teal-500 text-white">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              Your Ultimate <span className="text-coral-400">Next.js</span>{" "}
              Template
            </h1>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto mb-10">
              A complete starter kit with authentication, dashboard, and
              integrated development tools.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-extrabold text-center mb-12 text-indigo-900">
              Key Features
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="p-6 bg-white border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 rounded-full bg-indigo-50 mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-indigo-50">
          <div className="container mx-auto text-center px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-indigo-900">
              Ready to get started?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              Clone this template and customize it for your project in minutes.
            </p>
            <Button
              asChild
              size="lg"
              className="mx-2 bg-teal-500 text-white hover:bg-teal-600 transition-colors duration-300"
            >
              <Link href="/auth/sign-up">Create an account</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="mx-2 border-indigo-500 text-indigo-600 hover:bg-indigo-500 hover:text-white transition-colors duration-300"
            >
              <Link href="/dev">Learn more</Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-indigo-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-indigo-200">
            © {new Date().getFullYear()} My Application. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
