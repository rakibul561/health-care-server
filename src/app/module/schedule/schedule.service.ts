import { addMinutes, addHours, format } from "date-fns";
import { prisma } from "../../shared/prisma";
import { Prisma } from "@prisma/client";
import { paginationHelper } from "../../helpers/PaginationHelper";

const insertIntoDB = async (payload: any) => {

    const { startTime, endTime, startDate, endDate } = payload;

    const intervalTime = 30;
    const schedules = [];

    const currentDate = new Date(startDate);
    const lastDate = new Date(endDate);

    while (currentDate <= lastDate) {
        const startDateTime = new Date(
            addMinutes(
                addHours(
                    `${format(currentDate, "yyyy-MM-dd")}`,
                    Number(startTime.split(":")[0]) // 11:00
                ),
                Number(startTime.split(":")[1])
            )
        )

        const endDateTime = new Date(
            addMinutes(
                addHours(
                    `${format(currentDate, "yyyy-MM-dd")}`,
                    Number(endTime.split(":")[0]) // 11:00
                ),
                Number(endTime.split(":")[1])
            )
        )

        while (startDateTime < endDateTime) {
            const slotStartDateTime = startDateTime; // 10:30
            const slotEndDateTime = addMinutes(startDateTime, intervalTime); // 11:00

            const scheduleData = {
                startDateTime: slotStartDateTime,
                endDateTime: slotEndDateTime
            }

            const existingSchedule = await prisma.schedule.findFirst({
                where: scheduleData
            })

            if (!existingSchedule) {
                const result = await prisma.schedule.create({
                    data: scheduleData
                });
                schedules.push(result)
            }

            slotStartDateTime.setMinutes(slotStartDateTime.getMinutes() + intervalTime);
        }

        currentDate.setDate(currentDate.getDate() + 1)
    }

    return schedules;
}


const scheduleForDoctor = async (
  filters:any,
  options:any
) =>{

   const {page, limit, skip, sortBy, sortOrder} = paginationHelper.calculatePagination(options );
   const {startDateTime:filterStartDateTime, endDateTime:filterEndDatetime} = filters;

   
    const andCondition:Prisma.ScheduleWhereInput[] = []

    if(filterStartDateTime && filterEndDatetime){
      andCondition.push({
        AND:[
          {
            startDateTime: {
              gte: filterStartDateTime
            }
          },
          {
            endDateTime: {
              lte:filterEndDatetime
            }
          }
        ]
      })
    }


        const whereConditions: Prisma.ScheduleWhereInput = andCondition.length > 0 ? {
        AND: andCondition
    } : {}
      

    const result = await prisma.schedule.findMany({
      where: whereConditions,
      skip,
      take:limit,
      orderBy: {
        [sortBy] : sortOrder
      }
    })

    const total = await prisma.schedule.count({
      where: whereConditions
    })

       return {
        meta : {
            page,
            limit,
            total
        }, 
        data : result
    };

}


const deleteSchedule = async (id:string) =>{
  return  await  prisma.schedule.delete({
    where: {
      id
    }
  })

}



export const ScheduleService = {
    insertIntoDB,
    scheduleForDoctor,
    deleteSchedule

}