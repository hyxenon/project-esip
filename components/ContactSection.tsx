import React from "react";
import {
  Mail,
  Phone,
  Facebook,
  ExternalLink,
  MessageSquare,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ContactSection = () => {
  const contactInfo = [
    {
      icon: <Mail />,
      label: "Email",
      value: "project.esip@gmail.com",
      link: "mailto:project.esip@gmail.com",
      description: "Contact us for inquiries and support",
    },
    {
      icon: <Facebook />,
      label: "Facebook",
      value: "PROJECT E-SIP",
      link: "https://facebook.com/projectesip",
      description: "Follow us for updates and news",
    },
    {
      icon: <Phone />,
      label: "Phone",
      value: "+63 915 877 7384",
      link: "tel:+639123456789",
      description: "Available during business hours",
    },
  ];

  return (
    <div className="w-full py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4" style={{ color: "#283618" }}>
            Get in Touch
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#606C38" }}>
            Have questions about PROJECT E-SIP? We're here to help. Contact us
            through any of these channels.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactInfo.map((info, index) => (
            <Card
              key={index}
              className="group transition-all duration-300  border-0"
            >
              <CardContent className="p-6">
                <a
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center text-center space-y-4"
                >
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
                    style={{ backgroundColor: "#606C38" }}
                  >
                    {React.cloneElement(info.icon, {
                      className: "w-6 h-6 text-white",
                    })}
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3
                      className="text-xl font-semibold"
                      style={{ color: "#283618" }}
                    >
                      {info.label}
                    </h3>

                    <p
                      className="font-medium group-hover:underline"
                      style={{ color: "#BC6C25" }}
                    >
                      {info.value}
                    </p>

                    <p className="text-sm" style={{ color: "#606C38" }}>
                      {info.description}
                    </p>
                  </div>

                  {/* Hover Indicator */}
                  <div
                    className="flex items-center text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ color: "#BC6C25" }}
                  >
                    <span className="mr-1">Open</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Contact Message */}
        <div
          className="mt-12 text-center p-6 rounded-lg"
          style={{ backgroundColor: "#606C38" }}
        >
          <div className="flex items-center justify-center mb-3">
            <MessageSquare className="w-6 h-6 text-white mr-2" />
            <p className="text-white font-medium">Quick Response Guaranteed</p>
          </div>
          <p className="text-white/90 text-sm">
            We typically respond to all inquiries within 24 hours during
            business days.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
