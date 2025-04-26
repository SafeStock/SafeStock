export function CalendarArea({display}) {
    return (
        <div className="h-[18vh] w-[15.5vw] justify-start items-center" style={{display: display}}>
            <img className="w-[3.7vw] h-[7.4vh]" src="/src/assets/User.svg"/>
            <img className="w-[2.5vw] h-[5vh] ml-[1vw]" src="/src/assets/Calendar.svg"/>  
        </div>
    )
}