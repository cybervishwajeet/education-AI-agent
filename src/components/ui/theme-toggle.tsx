import { Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function ThemeToggle() {
  // No toggle functionality - only dark mode
  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
      <motion.div
        whileHover={{ rotate: 20 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="relative w-6 h-6 flex items-center justify-center"
      >
        <Moon className="h-5 w-5 text-blue-400" />
      </motion.div>

      {/* Decorative stars */}
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 0.5,
          }}
          className="absolute top-1 right-1 w-1 h-1 rounded-full bg-blue-300"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 0.2,
          }}
          className="absolute bottom-1 left-1.5 w-0.5 h-0.5 rounded-full bg-purple-300"
        />
      </>

      <span className="sr-only">Dark theme</span>
    </Button>
  );
}
