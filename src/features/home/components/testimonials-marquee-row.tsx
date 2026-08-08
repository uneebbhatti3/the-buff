import { Testimonial } from "../types/types";
import TestimonialCard from "./testimonial-card";

export default function TestimonialsMarqueeRow({
  testimonials,
  direction = "left",
}: {
  testimonials: Testimonial[];
  direction?: "left" | "right";
}) {
  const animationClass =
    direction === "left"
      ? "animate-[marquee-left_200s_linear_infinite]"
      : "animate-[marquee-right_200s_linear_infinite]";

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-24 bg-linear-to-r from-[#0B0B0B] to-transparent md:block" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-24 bg-linear-to-l from-[#0B0B0B] to-transparent md:block" />

      <div className={`flex w-max gap-5 ${animationClass} hover:paused`}>
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <TestimonialCard
            key={`${testimonial.name}-${index}`}
            testimonial={testimonial}
          />
        ))}
      </div>
    </div>
  );
}
