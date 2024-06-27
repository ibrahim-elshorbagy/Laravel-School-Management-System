import { BsArrowRightShort } from "react-icons/bs";
import { SiArkecosystem } from "react-icons/si";
import { useState } from "react";
import SidebarLink from "@/Components/SidebarLink";
import SidebarIconLink from "@/Components/SidebarIconLink";
import { MdDashboard } from "react-icons/md";

export default function Sidebar() {

    const [open, setOpen] = useState(true);

    return (
        <>
            <div
                className={`dark:bg-gray-800 dark:border-gray-700 min-h-screen p-5 pt-8 ${
                    open ? "w-72" : "w-20"
                } duration-300 relative`}
            >
                <BsArrowRightShort
                    className={`bg-white text-dark-purple text-3xl rounded-full absolute -right-3 top-9 border border-dark-purple  ${
                        open && "rotate-180"
                    }`}
                    onClick={() => setOpen(!open)}
                />

                <div className="inline-flex">
                    <SiArkecosystem
                        className={` text-4xl rounded  block  mr-2 ${
                            open && "rotate-[360]"
                        }`}
                    />
                    <h1
                        className={`text-white origin-left font-medium text-3xl duration-300 ${
                            !open && "scale-0"
                        }`}
                    >
                        Schoola
                    </h1>
                </div>

                <ul>
                    <li className={` flex items-center gap-x-4  p-2 `}>
                        <SidebarIconLink
                            className={`block text-2xl`}
                            href={route("teacher.dashboard")}
                            active={route().current("teacher.dashboard")}
                        >
                            <MdDashboard />
                        </SidebarIconLink>

                        <SidebarLink
                            className={` ${!open && "scale-0"}`}
                            href={route("teacher.dashboard")}
                            active={route().current("teacher.dashboard")}
                        >
                            Dashboard
                        </SidebarLink>
                    </li>
                </ul>
            </div>
        </>
    );
}

