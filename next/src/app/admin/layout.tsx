import "../globals.css";
import type { Metadata } from "next";
import RoleChecker from "@/components/RoleChecker";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
    title: "ThinQ - Admin",
    description: "ThinQ is a revolutionary web platform for conducting online classes, complete with a vibrant set of features tailored to professionals in education",
};

export default function RootLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
        <div className='py-4 px-5 h-dvh'>
      <div className='gridWrapper | text-[#6C6C6C] grid grid-cols-[auto_1fr] gap-3 h-full | md:grid-cols-[248px_1fr]'>
        <Sidebar />

        <div className='rightWrapper | '>
          <header className='font-medium p-[1.125rem] max-sm:p-2 border border-[#8C8C8C] rounded-[0.5rem] flex items-center justify-between mb-4 sticky top-3 bg-white'>
            <h1 className='text-xl  max-sm:text-lg'>Hello 👋, Admin</h1>
            <div className='flex gap-6 items-center'>
              <button className='hidden | md:block py-[0.625rem] px-5 text-[#847700] bg-[hsl(68,100%,64%,32%)] border border-[#9D8E00] rounded-full'>Upgrade</button>
              <div className="ignoreThisDiv line | border"></div>
              <div className='grid place-items-center text-black bg-[#D9D9D9] w-[2.0625rem] h-[2.0625rem] aspect-square rounded-[50%]'>R</div>
            </div>
          </header>
            {children}
        </div>
      </div>
    </div>
    <RoleChecker role={"Administrator"} />
        </>
    );
}