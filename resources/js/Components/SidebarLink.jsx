import { Link } from '@inertiajs/react';

export default function SidebarLink({ active = false, className = "", children, ...props }) {
    return (
        <Link
            {...props}
            className={
                "text-white origin-left font-medium text-xl duration-300 cursor-pointer" +
                (active
                    ? "border-indigo-400 dark:border-indigo-600 text-gray-900 dark:text-gray-100 focus:border-indigo-700 "
                    : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700 focus:text-gray-700 dark:focus:text-gray-300 focus:border-gray-300 dark:focus:border-gray-700 ") +
                className
            }
        >
            {children}
        </Link>
    );
}
