"use client"

/*
* Quiz Name
* No of Questions
* No of Responses
* Time Generated
* */

import NestedNav, {NavLink} from '@/components/NestedNav'
import useAuthStore from '@/lib/zustand'
import {getAllQuizzes} from '@/util/client/helpers'
import {Quiz} from '@prisma/client'
import Link from 'next/link'
import React, {useEffect, useState} from 'react'

const Page = ({params: {classroomId}}: {params: {classroomId: string}}) => {
	const {user} = useAuthStore()
	const [data, setData] = useState<Quiz[]>([]);

	useEffect(() => {
		const getData = async () => {
			if (!user) return;
			const quizzes = await getAllQuizzes(user.userOrgId, classroomId)
			if (quizzes) setData(quizzes)
		}
		getData()
	}, [user])

	const navlinks : NavLink[] = [
		{
			href: `/teacher/classrooms/${classroomId}/lectures`,
			title: "Lectures"
		},
		{
			href: `/teacher/classrooms/${classroomId}/quiz`,
			title: "Quizzes"
		},
		{
			href: `/teacher/classrooms/${classroomId}/notes`,
			title: "Notes"
		},
		{
			href: `/teacher/classrooms/${classroomId}/assessments`,
			title: "Assessments"
		},
		{
			href: `/teacher/classrooms/${classroomId}/resources`,
			title: "Resources"
		}
	]

	const QuizCard = ({item}: {item: Quiz}) => {
		return (
			<Link href={`/teacher/classrooms/${classroomId}/quiz/${item.quizId}`} className='quizCard | rounded-[0.625rem] border border-[#A0A0A0] text-center px-6 py-7'>
        <h1 className='text-xl text-black'>{item.quizName}</h1>
        <p className='mt-3'>Tap to reveal answers</p>
        <div className='mt-3 flex gap-3 flex-wrap justify-center'>
          <p className='text-sm text-[#0039C6] border border-[#5462DF] bg-[#CCE0FF] font-medium py-[0.375rem] px-3 rounded-full'>Questions: 12</p>
          <p className='text-sm text-[#00802B] border border-[#00B833] bg-[#CCFFE0] font-medium py-[0.375rem] px-3 rounded-full'>Responses: 12</p>
        </div>
      </Link>
		)
	}
  return (
    <div className=' flex flex-col gap-2'>
			<NestedNav items={navlinks} button={(<></>)}/>
	<div>
    <h1 className='text-4xl text-black font-medium'>Quizzes</h1>
    <p className='text-xl mt-4'>Questions generated by our model</p>
    <div className='quizCardWrapper | mt-3 grid gap-10 grid-cols-[repeat(auto-fill,minmax(350px,1fr))]'>
      {data.map((item) => (<QuizCard item={item} key={item.quizId}/>))}
    </div>
	</div>
    </div>
  )
}

export default Page
