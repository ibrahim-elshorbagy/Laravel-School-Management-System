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
import { CiMoneyCheck1 } from "react-icons/ci";
import { FaFileInvoice } from "react-icons/fa6";
import { PiInvoiceFill } from "react-icons/pi";
import { GrTransaction } from "react-icons/gr";
import { FaTableList } from "react-icons/fa6";

export default function Sidebar() {

    const [open, setOpen] = useState(true);

    return (
        <>
            {/*
            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">


                                <NavLink
                                    href={route("teacher.index")}
                                    active={route().current("teacher.index")}
                                >
                                    Teachers
                                </NavLink>
                                <NavLink
                                    href={route("student.index")}
                                    active={route().current("student.index")}
                                >
                                    Student
                                </NavLink>
                                <NavLink
                                    href={route("guardian.index")}
                                    active={route().current("guardian.index")}
                                >
                                    Guardian
                                </NavLink>
                                <NavLink
                                    href={route("promotion.index")}
                                    active={route().current("promotion.index")}
                                >
                                    Promotion
                                </NavLink>
                                <NavLink
                                    href={route("graduated.index")}
                                    active={route().current("graduated.index")}
                                >
                                    Graduated
                                </NavLink>
                                <NavLink
                                    href={route("fee.index")}
                                    active={route().current("fee.index")}
                                >
                                    Fee
                                </NavLink>
                                <NavLink
                                    href={route("fee-invoice.index")}
                                    active={route().current(
                                        "fee-invoice.index"
                                    )}
                                >
                                    Fee Invoice
                                </NavLink>
                                <NavLink
                                    href={route("receipt-student.index")}
                                    active={route().current(
                                        "receipt-student.index"
                                    )}
                                >
                                    Received
                                </NavLink>

                            </div> */}

            <div
                className={`dark:bg-gray-800 dark:border-gray-700 h-screen p-5 pt-8 ${
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
                            <FaUserTie />
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
                            Graduated
                        </SidebarLink>
                    </li>
                    {/* ======== */}

                    <li className={` flex items-center gap-x-4  p-2 `}>
                        <SidebarIconLink
                            className={`block text-2xl`}
                            href={route("fee.index")}
                            active={route().current("fee.index")}
                        >
                            <PiInvoiceFill />
                        </SidebarIconLink>

                        <SidebarLink
                            className={` ${!open && "scale-0"}`}
                            href={route("fee.index")}
                            active={route().current("fee.index")}
                        >
                            Fee
                        </SidebarLink>
                    </li>
                    {/* ======== */}

                    <li className={` flex items-center gap-x-4  p-2 `}>
                        <SidebarIconLink
                            className={`block text-2xl`}
                            href={route("fee-invoice.index")}
                            active={route().current("fee-invoice.index")}
                        >
                            <FaFileInvoice />
                        </SidebarIconLink>

                        <SidebarLink
                            className={` ${!open && "scale-0"}`}
                            href={route("fee-invoice.index")}
                            active={route().current("fee-invoice.index")}
                        >
                            Invoice
                        </SidebarLink>
                    </li>
                    {/* ======== */}

                    <li className={` flex items-center gap-x-4  p-2 `}>
                        <SidebarIconLink
                            className={`block text-2xl`}
                            href={route("receipt-student.index")}
                            active={route().current("receipt-student.index")}
                        >
                            <CiMoneyCheck1 />
                        </SidebarIconLink>

                        <SidebarLink
                            className={` ${!open && "scale-0"}`}
                            href={route("receipt-student.index")}
                            active={route().current("receipt-student.index")}
                        >
                            Received
                        </SidebarLink>
                    </li>
                    {/* ======== */}
                    <li className={` flex items-center gap-x-4  p-2 `}>
                        <SidebarIconLink
                            className={`block text-2xl`}
                            href={route("processing-fee.index")}
                            active={route().current("processing-fee.index")}
                        >
                            <GrTransaction />
                        </SidebarIconLink>

                        <SidebarLink
                            className={` ${!open && "scale-0"}`}
                            href={route("processing-fee.index")}
                            active={route().current("processing-fee.index")}
                        >
                            Processing
                        </SidebarLink>
                    </li>
                    {/* ======== */}
                    <li className={` flex items-center gap-x-4  p-2 `}>
                        <SidebarIconLink
                            className={`block text-2xl`}
                            href={route("student-attendances.index")}
                            active={route().current("student-attendances.index")}
                        >
                            <FaTableList />
                        </SidebarIconLink>

                        <SidebarLink
                            className={` ${!open && "scale-0"}`}
                            href={route("student-attendances.index")}
                            active={route().current("student-attendances.index")}
                        >
                            Attendance
                        </SidebarLink>
                    </li>
                    {/* ======== */}
                </ul>
            </div>
        </>
    );
}
