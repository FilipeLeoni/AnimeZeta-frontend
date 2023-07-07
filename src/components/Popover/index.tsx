import { motion } from "framer-motion";
import React, { useState } from "react";

export default function Popover({ title, content }: any) {
  const [isOpen, setIsOpen] = useState(false);

  const handleTogglePopover = () => {
    setIsOpen(!isOpen);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="popover bg-white shadow-lg rounded-lg absolute top-8 left-0 mt-2 py-2 px-4 w-48"
    >
      <div className="popover-title font-semibold">{title}</div>
      <div className="popover-content text-gray-700">{content}</div>
    </motion.div>
  );
}
