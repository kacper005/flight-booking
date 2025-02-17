import React from "react";

const Typography = ({
  as: Typography = "p",
  variant = "body",
  weight = "normal",
  color = "text-gray-900",
  children,
  className,
}) => {
  const variants = {
    h1: "text-4xl font-bold",
    h2: "text-3xl font-semibold",
    h3: "text-2xl font-medium",
    h4: "text-xl font-medium",
    body: "text-base",
    small: "text-sm",
    caption: "text-xs text-gray-600",
  };

  const weights = {
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  return (
    <Typography
      className={`${variants[variant]} ${weights[weight]} ${color} ${
        className || ""
      }`}
    >
      {children}
    </Typography>
  );
};

export default Typography;
