import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

interface PageShellProps extends HTMLMotionProps<"main"> {
  children: ReactNode;
}

export function PageShell({ children, className = "", ...rest }: PageShellProps) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`pt-28 pb-12 ${className}`}
      {...rest}
    >
      {children}
    </motion.main>
  );
}
