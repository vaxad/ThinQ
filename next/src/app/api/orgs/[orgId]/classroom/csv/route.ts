import {withMiddlewares} from "@/util/middleware";
import {parse} from "csv-parse/sync";
import {CreateBulkUserBody, NoParams, OrgIdBaseParams} from "@/util/api/api_requests";
import {
	authParser,
	requireAuthenticatedUser,
	requireAuthorizedUser,
	requireBodyParams,
	requireURLParams,
	validateBodyParams,
	validateURLParams
} from "@/util/middleware/helpers";
import {UserType} from "@prisma/client";
import {
	BaseOrgIdParamServerValidator,
	CreateBulkClassroomsServerValidator,
	CreateBulkUsersServerValidator,
	matchUserOrgWithParamsOrg,
    userExists
} from "@/util/validators/server";
import db from "@/util/db";

type ParsedData = {
	classroomName: string,
	facultyUserName: string
}

export const POST = withMiddlewares<OrgIdBaseParams, CreateBulkUserBody, NoParams>(
	authParser(),
	requireAuthenticatedUser(),
	requireAuthorizedUser({
		matchUserTypes: [UserType.Administrator],
		matchUserOrganization: matchUserOrgWithParamsOrg
	}),
	requireURLParams(["orgId"]),
	validateURLParams(BaseOrgIdParamServerValidator),
	requireBodyParams(["csvData"]),
	validateBodyParams(CreateBulkClassroomsServerValidator),
	async (req, res) => {
		const {csvData} = req.body
		const {orgId} = req.params
		const parsedData = parse(csvData, {
			trim: true,
			columns: ["classroomName", "facultyUserName"]
		}) as ParsedData[]

		await Promise.all(
			parsedData.map(async (parsedObj) => {
				try {

                    const faculty = await db.user.findFirst({
						where: {
							userName: parsedObj.facultyUserName,
							userType: UserType.Teacher
						}
					})

					if(!faculty) return
					
					const mappedObj = {
						classroomName: parsedObj.classroomName,
						classroomOrgId: orgId,
						facultyUserId: faculty.userId
					}

                    console.log(mappedObj)

					const createdClass = await db.classroom.create({
						data: mappedObj
					})

					return
				} catch (e) {
					console.error(e)
					return
				}
			})
		)

		res.status(200).json({
			responseStatus: "SUCCESS"
		})
	}
)