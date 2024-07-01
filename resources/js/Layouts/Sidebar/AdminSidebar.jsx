import { BsArrowRightShort } from "react-icons/bs";
import { SiArkecosystem } from "react-icons/si";
import { useState } from "react";
import { Link } from "@inertiajs/react";
import SidebarLink from "@/Components/SidebarLink";
import SidebarIconLink from "@/Components/SidebarIconLink";
import { GrUserManager } from "react-icons/gr";

import { FaLevelUpAlt } from "react-icons/fa";
import { FaSchool } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { FaChalkboardTeacher } from "react-icons/fa";

import { FaUserTie } from "react-icons/fa";

import { PiExamFill } from "react-icons/pi";


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
                    {/* ======== */}

                    <li className={` flex items-center gap-x-4  p-2 `}>
                        <SidebarIconLink
                            className={`block text-2xl`}
                            href={route("level.index")}
                            active={route().current("level.index")}
                        >
                            <FaSchool />
                        </SidebarIconLink>

                        <SidebarLink
                            className={` ${!open && "scale-0"}`}
                            href={route("level.index")}
                            active={route().current("level.index")}
                        >
                            Levels
                        </SidebarLink>
                    </li>
                    {/* ======== */}
                    <li className={` flex items-center gap-x-4  p-2 `}>
                        <SidebarIconLink
                            className={`block text-2xl`}
                            href={route("grade.index")}
                            active={route().current("grade.index")}
                        >
                            <FaLevelUpAlt />
                        </SidebarIconLink>

                        <SidebarLink
                            className={` ${!open && "scale-0"}`}
                            href={route("grade.index")}
                            active={route().current("grade.index")}
                        >
                            Grades
                        </SidebarLink>
                    </li>

                    {/* ======== */}
                    <li className={` flex items-center gap-x-4  p-2 `}>
                        <SidebarIconLink
                            className={`block text-2xl`}
                            href={route("classroom.index")}
                            active={route().current("classroom.index")}
                        >
                            <SiGoogleclassroom />
                        </SidebarIconLink>

                        <SidebarLink
                            className={` ${!open && "scale-0"}`}
                            href={route("classroom.index")}
                            active={route().current("classroom.index")}
                        >
                            Classrooms
                        </SidebarLink>
                    </li>

                    <li className={` flex items-center gap-x-4  p-2 `}>
                        <SidebarIconLink
                            className={`block text-2xl`}
                            href={route("teacher.index")}
                            active={route().current("teacher.index")}
                        >
                            <FaChalkboardTeacher />
                        </SidebarIconLink>

                        <SidebarLink
                            className={` ${!open && "scale-0"}`}
                            href={route("teacher.index")}
                            active={route().current("teacher.index")}
                        >
                            Teacher
                        </SidebarLink>
                    </li>
                    <li className={` flex items-center gap-x-4  p-2 `}>
                        <SidebarIconLink
                            className={`block text-2xl`}
                            href={route("exam.index")}
                            active={route().current("exam.index")}
                        >
                            <PiExamFill />
                        </SidebarIconLink>

                        <SidebarLink
                            className={` ${!open && "scale-0"}`}
                            href={route("exam.index")}
                            active={route().current("exam.index")}
                        >
                            Exams
                        </SidebarLink>
                    </li>
                    {/* ======== */}

                    <li className={` flex items-center gap-x-4  p-2 `}>
                        <SidebarIconLink
                            className={`block text-2xl`}
                            href={route("accountant.index")}
                            active={route().current("accountant.index")}
                        >
                            <FaUserTie />
                        </SidebarIconLink>

                        <SidebarLink
                            className={` ${!open && "scale-0"}`}
                            href={route("accountant.index")}
                            active={route().current("accountant.index")}
                        >
                            Accountant
                        </SidebarLink>
                    </li>
                    {/* ======== */}

                    <li className={` flex items-center gap-x-4  p-2 `}>
                        <SidebarIconLink
                            className={`block text-2xl`}
                            href={route("student-services-managers.index")}
                            active={route().current(
                                "student-services-managers.index"
                            )}
                        >
                            <GrUserManager />
                        </SidebarIconLink>

                        <SidebarLink
                            className={` ${!open && "scale-0"}`}
                            href={route("student-services-managers.index")}
                            active={route().current(
                                "student-services-managers.index"
                            )}
                        >
                            Student Services Manager
                        </SidebarLink>
                    </li>
                    {/* ======== */}
                </ul>
            </div>
        </>
    );
}

