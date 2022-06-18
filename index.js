// Your code here
function createEmployeeRecord(arr){
    let record;
    return record= {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        field: [],
        timeInEvents: [],
        timeOutEvents: []

    }
}


function createEmployeeRecords(arr){
    return arr.map(createEmployeeRecord)
}

function createDateStampObj(getType, dateStamp){
    return {type: getType, date: dateStamp.slice(0,10), hour: parseInt(dateStamp.slice(-4))}
}


function createTimeInEvent(obj, dateStamp){
    obj.timeInEvents.push(createDateStampObj("TimeIn", dateStamp))
    return obj;

}

function createTimeOutEvent(obj, dateStamp){
    obj.timeOutEvents.push(createDateStampObj("TimeOut", dateStamp))
    return obj

}

function hoursWorkedOnDate(obj, dateYMD){
    const timeIn = obj.timeInEvents.find((e)=> e.date === dateYMD).hour
    const timeOut = obj.timeOutEvents.find((e)=> e.date === dateYMD).hour
    return (timeOut - timeIn)/100;

}


function wagesEarnedOnDate(obj, dateYMD){
    const wage = obj.payPerHour;
    const hoursWorked = hoursWorkedOnDate(obj, dateYMD)
    return wage * hoursWorked;
}

function allWagesFor(obj){
    const allWages = obj.timeInEvents.map(function(day){return wagesEarnedOnDate(obj, day.date)})
    return allWages.reduce((acc, cv)=> acc + cv)
}

function calculatePayroll(records){
    const allPay = (records.map((employee)=> {return allWagesFor(employee)}))
    return allPay.reduce((acc, cv)=> acc + cv)
}

function findEmployeeByFirstName(srcArray, first_Name){
    return srcArray.find((records)=> records.firstName === first_Name)
}