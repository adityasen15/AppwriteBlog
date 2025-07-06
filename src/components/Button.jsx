// import React from "react";


// export default function Button({
//     children,
//     type = "button",
//     bgColor = "bg-blue-600",
//     textColor = "text-white",
//     className = "",
//     ...props
// }) {
//     return (
//         <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
//             {children}
//         </button>
//     );
// }

// const Button = ({ children, className = "", ...props }) => {
//     return (
//         <button
//             {...props}
//             className={`bg-amber-300 px-4 py-2 font-semibold rounded-lg shadow-md transition duration-200 ${className}`}
//         >
//             {children}
//         </button>
//     )
// }

// export default Button
import React from "react";

export default function Button({
    type = "submit",
    children,
    className = "",
    variant = "bg-blue-600",
    text = "text-white",
    ...props
}) {
  return (
    <button
      type= {type}
      className={`px-4 py-2 rounded-lg ${variant} ${text} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
