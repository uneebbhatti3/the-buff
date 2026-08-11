import { Star } from "lucide-react";
import { Testimonial } from "../types/types";

export default function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  return (
    <article className="w-[320px] shrink-0 rounded-[1.5rem] border border-white/10 bg-[#111111] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#D4A843]/30 hover:bg-[#151515] sm:w-95">
      <div className="mb-5 flex items-center gap-1">
        {Array.from({ length: testimonial.rating }).map((_, index) => (
          <Star key={index} className="h-4 w-4 fill-[#D4A843] text-[#D4A843]" />
        ))}
      </div>

      <p className="min-h-30 text-base leading-7 text-zinc-300">
        “{testimonial.review}”
      </p>

      <div className="mt-6 border-t border-white/10 pt-5">
        <p className="font-medium text-[#F5F2EC]">{testimonial.name}</p>
        <p className="mt-1 text-sm text-zinc-500">Google Review</p>
      </div>
    </article>
  );
}
