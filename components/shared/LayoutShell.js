"use client";

import { usePathname } from "next/navigation";
import DuoNav from "./DuoNav";

export default function LayoutShell({ children }) {
    const pathname = usePathname();
    const isHome = pathname === "/";

    return (
        <>
            <DuoNav />
            {isHome ? children : <div className="page-shell">{children}</div>}
        </>
    );
}
