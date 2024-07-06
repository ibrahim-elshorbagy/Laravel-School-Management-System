import { BsArrowRightShort } from "react-icons/bs";
import { SiArkecosystem } from "react-icons/si";
import { useState } from "react";
import SidebarLink from "@/Components/SidebarLink";
import SidebarIconLink from "@/Components/SidebarIconLink";
import { MdDashboard } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { CiMoneyCheck1 } from "react-icons/ci";
import { PiInvoiceFill } from "react-icons/pi";
import { GrTransaction } from "react-icons/gr";
import { FaFileInvoice } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";

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
                    <li className={` flex items-center gap-x-4  p-2 `}>
                        <SidebarIconLink
                            className={`block text-2xl`}
                            href={route("accountant.students")}
                            active={route().current("accountant.students")}
                        >
                            <FaUserAlt />
                        </SidebarIconLink>

                        <SidebarLink
                            className={` ${!open && "scale-0"}`}
                            href={route("accountant.students")}
                            active={route().current("accountant.students")}
                        >
                            Students
                        </SidebarLink>
                    </li>
                    {/* ---- */}

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
                            Excluding
                        </SidebarLink>
                    </li>
                    {/* ======== */}
                    <li className={` flex items-center gap-x-4  p-2 `}>
                        <SidebarIconLink
                            className={`block text-2xl`}
                            href={route("payment-methods")}
                            active={route().current("payment-methods")}
                        >
                            <IoMdSettings />
                        </SidebarIconLink>

                        <SidebarLink
                            className={` ${!open && "scale-0"}`}
                            href={route("payment-methods")}
                            active={route().current("payment-methods")}
                        >
                            Payments Settings
                        </SidebarLink>
                    </li>
                    {/* ======== */}
                </ul>
            </div>
        </>
    );
}

