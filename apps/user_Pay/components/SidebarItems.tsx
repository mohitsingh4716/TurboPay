"use client"
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const SidebarItem = ({ href, title, icon }: { href: string; title: string; icon: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname()
    const selected = pathname === href

    return <div className={`flex ${selected ? "text-[#485ff1]" : "text-slate-500"} cursor-pointer  p-4 pl-8`} onClick={() => {
        router.push(href);
    }}>
        <div className="pr-3">
            {icon}
        </div>
        <div className={`text-base font-bold ${selected ? "text-[#3248d9]" : "text-slate-500"}`}>
            {title}
        </div>
    </div>
}