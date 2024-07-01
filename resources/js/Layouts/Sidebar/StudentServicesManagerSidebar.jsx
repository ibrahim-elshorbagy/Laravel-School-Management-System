import { BsArrowRightShort } from "react-icons/bs";
import { SiArkecosystem } from "react-icons/si";
import { useState } from "react";
import SidebarLink from "@/Components/SidebarLink";
import SidebarIconLink from "@/Components/SidebarIconLink";
import { MdDashboard } from "react-icons/md";
import { ImUserTie } from "react-icons/im";
import { MdOutlineSchool } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { FaTableList } from "react-icons/fa6";
import { PiSubtitlesLight } from "react-icons/pi";

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
                            href={route("accountant.dashboard")}
                            active={route().current("accountant.dashboard")}
                        >
                            <MdDashboard />
                        </SidebarIconLink>

                        <SidebarLink
                            className={` ${!open && "scale-0"}`}
                            href={route("accountant.dashboard")}
                            active={route().current("accountant.dashboard")}
                        >
                            Dashboard
                        </SidebarLink>
                    </li>
                    {/* ---- */}
                    {/* ======== */}
                    <li className={` flex items-center gap-x-4  p-2 `}>
                        <SidebarIconLink
                            className={`block text-2xl`}
                            href={route("student.index")}
                            active={route().current("student.index")}
                        >
                            <FaUserAlt />
                        </SidebarIconLink>

                        <SidebarLink
                            className={` ${!open && "scale-0"}`}
                            href={route("student.index")}
                            active={route().current("student.index")}
                        >
                            Student
                        </SidebarLink>
                    </li>
                    {/* ======== */}
                    <li className={` flex items-center gap-x-4  p-2 `}>
                        <SidebarIconLink
                            className={`block text-2xl`}
                            href={route("guardian.index")}
                            active={route().current("guardian.index")}
                        >
                            <ImUserTie />
                        </SidebarIconLink>

                        <SidebarLink
                            className={` ${!open && "scale-0"}`}
                            href={route("guardian.index")}
                            active={route().current("guardian.index")}
                        >
                            Guardian
                        </SidebarLink>
                    </li>
                    {/* ======== */}
                    <li className={` flex items-center gap-x-4  p-2 `}>
                        <SidebarIconLink
                            className={`block text-2xl`}
                            href={route("promotion.index")}
                            active={route().current("promotion.index")}
                        >
                            <MdOutlineSchool />
                        </SidebarIconLink>

                        <SidebarLink
                            className={` ${!open && "scale-0"}`}
                            href={route("promotion.index")}
                            active={route().current("promotion.index")}
                        >
                            Promotions
                        </SidebarLink>
                    </li>
                    {/* ======== */}
                    <li className={` flex items-center gap-x-4  p-2 `}>
                        <SidebarIconLink
                            className={`block text-2xl`}
                            href={route("promotion.index")}
                            active={route().current("promotion.index")}
                        >
                            <MdOutlineSchool />
                        </SidebarIconLink>

                        <SidebarLink
                            className={` ${!open && "scale-0"}`}
                            href={route("graduated.index")}
                            active={route().current("graduated.index")}
                        >
                            Graduated
                        </SidebarLink>
                    </li>
                    {/* ======== */}
                    <li className={` flex items-center gap-x-4  p-2 `}>
                        <SidebarIconLink
                            className={`block text-2xl`}
                            href={route("student-attendances.index")}
                            active={route().current(
                                "student-attendances.index"
                            )}
                        >
                            <FaTableList />
                        </SidebarIconLink>

                        <SidebarLink
                            className={` ${!open && "scale-0"}`}
                            href={route("student-attendances.index")}
                            active={route().current(
                                "student-attendances.index"
                            )}
                        >
                            Attendance
                        </SidebarLink>
                    </li>

                    {/* ======== */}

                    <li className={` flex items-center gap-x-4  p-2 `}>
                        <SidebarIconLink
                            className={`block text-2xl`}
                            href={route("subject.index")}
                            active={route().current("subject.index")}
                        >
                            <PiSubtitlesLight />
                        </SidebarIconLink>

                        <SidebarLink
                            className={` ${!open && "scale-0"}`}
                            href={route("subject.index")}
                            active={route().current("subject.index")}
                        >
                            Subjects
                        </SidebarLink>
                    </li>
                    {/* ======== */}
                </ul>
            </div>
        </>
    );
}

