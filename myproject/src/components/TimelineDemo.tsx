import Image from "next/image";
import React from "react";
import { Timeline } from "../components/ui/timline";
export function TimelineDemo({ features = [] }: { features?: { Heading: string; subHeadings: string[] }[] }) {
    const data = features.map((feature) => ({
      title: feature.Heading, // Use "Heading" instead of "heading"
      content: (
        <div className="space-y-2 text-neutral-800 dark:text-neutral-200 text-sm">
          {feature.subHeadings.map((sub, i) => (
            <p key={i}>{sub}</p>
          ))}
        </div>
      ),
    }));
  
    return (
      <div className="w-full">
        <Timeline data={data} />
      </div>
    );
  }
  