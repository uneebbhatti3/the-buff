"use client";

import { motion, useReducedMotion } from "motion/react";

const ITEM =
  "PRECISION DETAILING\u00A0\u00A0·\u00A0\u00A0PAINT CORRECTION\u00A0\u00A0·\u00A0\u00A0CERAMIC COATING\u00A0\u00A0·\u00A0\u00A0THE BUFF LAHORE\u00A0\u00A0·\u00A0\u00A0";

export default function TextMarquee() {
  const reduceMotion = useReducedMotion();
  const content = ITEM.repeat(6);

  return (
    <div className="overflow-hidden bg-[#C1121F] py-4">
      <motion.div
        animate={reduceMotion ? {} : { x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap"
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-white/90">
          {content}
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-white/90">
          {content}
        </span>
      </motion.div>
    </div>
  );
}
