 import { addMinutes,addHours ,format } from "date-fns";
 const InsertIntoDb = (payload:any) =>{
   
   
    const {startDate, endDate, startTime,endTime} = payload;

    const intervelTime = 30;

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
     }

    return payload

 }


 export const ScheduleService = {
    InsertIntoDb
 }