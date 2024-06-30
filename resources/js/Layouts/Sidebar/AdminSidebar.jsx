import { BsArrowRightShort } from "react-icons/bs";
import { SiArkecosystem } from "react-icons/si";
import { useState } from "react";
import { Link } from "@inertiajs/react";
import SidebarLink from "@/Components/SidebarLink";
import SidebarIconLink from "@/Components/SidebarIconLink";
import { MdOutlineSchool } from "react-icons/md";
import { FaLevelUpAlt } from "react-icons/fa";
import { FaSchool } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { FaTableList } from "react-icons/fa6";
import { PiSubtitlesLight } from "react-icons/pi";
import { PiExamFill } from "react-icons/pi";
import { ImUserTie } from "react-icons/im";

import { MdManageAccounts } from "react-icons/md";

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
                </ul>
            </div>
        </>
    );
}

