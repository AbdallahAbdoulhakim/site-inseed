"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import TeamMember from "@/components/base/TeamMember";

interface TeamMember {
  [key: string]: any;
  documentId: string;
  createdAt: string;
  updatedAt: string;
}

type TeamContainerProps = {
  members: TeamMember[];
  title: string;
};

export default function TeamContainer({ members, title }: TeamContainerProps) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);
  return (
    <section id="team" className="px-15 pb-15 mt-10 overflow-hidden mb-15">
      <div className="container m-auto" data-aos="fade-up">
        <div className="text-center pb-15">
          <h2 className="text-4xl font-semibold mb-5 pb-5 relative font-montserrat after:content-[''] after:absolute after:block after:w-[50px] after:h-[3px] after:bg-primary after:left-0 after:right-0 after:bottom-0 after:m-auto">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-5 mt-5">
          {members.map((member, index) => (
            <TeamMember
              key={member.id}
              name={member.name}
              description={member.description}
              twitter={member.twitter}
              facebook={member.facebook}
              instagram={member.instagram}
              linkedin={member.linkedin}
              img={
                member.photo?.url
                  ? `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${member.photo.url}`
                  : "/default.jpg"
              }
              delay={200 * (index + 1)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
