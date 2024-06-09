let minutes=632
if (minutes >= 0 && minutes <= 600) {
    console.log("Early morning")
} else if (minutes >= 601 && minutes <= 780) {
    console.log("Morning")
} else if (minutes >= 781 && minutes <= 960) {
    console.log("Noon")
} else if (minutes >= 961 && minutes <= 1140) {
    console.log("Afternoon")
} else if (minutes >= 1141 && minutes <= 1320) {
    console.log("Evening")
} else if (minutes >= 1321 && minutes <= 1439) {
    console.log("Night")
} else {console.log("Invalid")}


