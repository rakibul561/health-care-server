 import { addMinutes,addHours ,format } from "date-fns";
import { prisma } from "../../shared/prisma";
 const InsertIntoDb = async (payload:any) =>{
   
   
    const {startDate, endDate, startTime,endTime} = payload;

    const intervelTime = 30;
    const schedules = []

     const currentDate = new Date(startDate)
     const lastDate = new Date(endDate)

     while(currentDate <= lastDate){
        const startDateTime = new Date (
            addMinutes(
                addHours(
                    `${format(currentDate, "yyyy-mm-dd")}`,
                    Number(startTime.split(":")[0])
                ),
                  Number(startTime.split(":")[1])
            )

        )
        const endDateTime = new Date (
            addMinutes(
                addHours(
                    `${format(currentDate, "yyyy-mm-dd")}`,
                    Number(endTime.split(":")[0])
                ),
                  Number(endTime.split(":")[1])
            )
        )


        while (startDateTime <= endDateTime){
           const slotStartDateTime = startDateTime;
           const slotEndDateTime = addMinutes(startDateTime,intervelTime)

           const scheduleData = {
            startDateTime : slotStartDateTime,
            endDateTime: slotEndDateTime
           }

           const existingSchedule = await prisma.schedule.findFirst({
            where : scheduleData
           })

           if(!existingSchedule){
            const result = await prisma.schedule.create({
               data : scheduleData
            })
            schedules.push(result)
           }
           slotStartDateTime.setMinutes(slotStartDateTime.getMinutes() + intervelTime)



        }

        currentDate.setDate(currentDate.getDate() + 1 )


     }

    return schedules

 }


 export const ScheduleService = {
    InsertIntoDb
 }