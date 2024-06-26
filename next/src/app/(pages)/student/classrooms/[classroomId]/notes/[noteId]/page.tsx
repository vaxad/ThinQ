"use client"
import { useEffect, useState } from "react" 
import Link from "next/link"
import NotesComponent from "./NoteComponent"
import useAuthStore from "@/lib/zustand"
import { Notes } from "@prisma/client"
import { getLectures, getNotes } from "@/util/client/helpers"
import Loader from "@/components/Loader"

export default function Page({params: {classroomId, noteId}}: {params: {classroomId: string, noteId: string}}) {
	const {user} = useAuthStore()
	const [data, setData] = useState<Notes | "">("");

	useEffect(() => {
		const getData = async () => {
			if (!user) return;
			const lectures = await getNotes(user.userOrgId, classroomId, noteId)
			if (lectures) setData(lectures)
		}
		getData()
	}, [user])
  return (
	  <>
		  <div className="flex justify-between items-end border-b pb-2">
			  <nav className="font-medium p-2 flex gap-[1.875rem] max-sm:gap-3 max-sm:text-sm">
				  <Link href={`/teacher/classrooms/${classroomId}/lectures`}
					  className="">Lectures</Link>
				  <Link href={`/teacher/classrooms/${classroomId}/quiz`} className="">
					  Quizzes
				  </Link>
				  <Link href={`/teacher/classrooms/${classroomId}/notes`} className="relative text-black | after:content-[''] after:absolute after:-bottom-4 after:left-0 after:w-full after:h-1 after:rounded-full after:bg-[#0A349E]">Notes</Link>
			  </nav>
			  {/* <button
					className="hidden | md:block py-[0.625rem] px-5 rounded-full border border-[#CBCBCB]" onClick={()=>setCreate(true)}
				>
					+ Create
				</button> */}
		  </div>
		  <div>
			  <link
				  rel="stylesheet"
				  href="https://fonts.googleapis.com/css?family=Homemade+Apple|Roboto|Caveat|Liu+Jian+Mao+Cao&display=swap"
			  />
			  {data!==""?
			  <NotesComponent classroomId={classroomId} noteId={noteId} notes={data.notesContent} />
			:
			<div className=" w-full min-h-[60vh] flex justify-center items-center">
			<Loader/>
			</div>
			}
			  <script defer src="https://unpkg.com/jspdf@^1/dist/jspdf.min.js"></script>

		  </div>

	  </>
  )
}
