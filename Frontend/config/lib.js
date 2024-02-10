
const options = {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
};

export const date_format = (date)=>{
  if (!date) return ""
  return date.toLocaleDateString([], options)

}
export const time_format= (timestamp)=>{

    if (!timestamp) return ""
    // console.log(timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
    return timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }
