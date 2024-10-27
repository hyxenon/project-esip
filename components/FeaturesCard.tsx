import React from "react";
import {
  Search,
  MessageSquare,
  Lock,
  School,
  FileText,
  Edit3,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const FeatureCards = () => {
  const features = [
    {
      icon: <Search />,
      title: "Research Repository",
      description:
        "Search and discover academic work from various schools in our comprehensive database.",
    },
    {
      icon: <Lock />,
      title: "Privacy Controls",
      description:
        "Manage access to your research with flexible privacy settings and monetization options.",
    },
    {
      icon: <Edit3 />,
      title: "Real-time Collaboration",
      description:
        "Work together with up to 10 users simultaneously on research documents.",
    },
    {
      icon: <MessageSquare />,
      title: "Communication Hub",
      description:
        "Connect through individual and group chats. Share files and collaborate seamlessly.",
    },
    {
      icon: <School />,
      title: "School Management",
      description:
        "Control user access and manage your school's research network efficiently.",
    },
    {
      icon: <FileText />,
      title: "Document Control",
      description:
        "Organize research proposals and papers with customizable sharing preferences.",
    },
  ];

  return (
    <div className="w-full py-8 px-4 sm:px-6 lg:px-8 lg:mt-8 xl:-mt-0">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" style={{ color: "#283618" }}>
            Key Features
          </h2>
          <p className="text-lg" style={{ color: "#606C38" }}>
            Everything you need for academic research management
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group transition-all duration-300 border-0"
            >
              <CardContent className="p-6">
                <div className="flex flex-col space-y-4">
                  {/* Icon Container */}
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-300"
                    style={{ backgroundColor: "#606C38" }}
                  >
                    {React.cloneElement(feature.icon, {
                      className: "w-6 h-6 text-white",
                    })}
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3
                      className="text-xl font-semibold transition-colors duration-300 group-hover:text-bc6c25"
                      style={{ color: "#283618" }}
                    >
                      {feature.title}
                    </h3>

                    <p style={{ color: "#606C38" }} className="leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Subtle Divider */}
                  <div className="pt-4 mt-auto">
                    <button
                      className="text-sm font-medium flex items-center transition-colors duration-300 hover:opacity-80"
                      style={{ color: "#BC6C25" }}
                    >
                      Learn more
                      <svg
                        className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureCards;
