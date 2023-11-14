//Array of Dictionaries of Aid Stations
var aidStations = [
    {"name": "Start", "distance": 0},
    {"name": "Rt. 355 Out", "distance": 3.98},
    {"name": "Longdraught", "distance": 9.08},
    {"name": "Riffleford Out", "distance": 11.68},
    {"name": "Dufief", "distance": 14.88},
    {"name": "Quince Orchard", "distance": 17.38},
    {"name": "Pennyfield", "distance": 24.28},
    {"name": "Stone Mill", "distance": 27.78},
    {"name": "Rt. 28", "distance": 34.28},
    {"name": "Rt. 118", "distance": 37.28},
    {"name": "Riffleford In", "distance": 42.08},
    {"name": "Rt. 355 In", "distance": 46.48},
    {"name": "Finish", "distance": 50.46}
];

//adds time in minutes to aidStations dictionary based on pace in minutes per mile
function calculateTimes(pace)
{
    for (let i = 0; i < aidStations.length; i++)
    {
        aidStations[i]["time"] = durationToString(aidStations[i]["distance"] * pace);
    }
}

//converts pace string to minutes decimal
function paceToMinutes(paceString)
{
    const pace = paceString.split(":");
    let paceMins = parseFloat(pace[0]) + parseFloat(pace[1])/60.0;
    return paceMins;
}

//converts duration in minutes float to a string in hours:minutes:seconds
function durationToString(durationMinutes)
{
    let seconds = parseInt((60 * durationMinutes) % 60);
    let minutes = parseInt(durationMinutes % 60);
    let hours = parseInt(durationMinutes / 60);
    return hours + ":" + minutes + ":" + seconds;
}

// make a table based on the aid stations dictionary
function generateTableHTML()
{
    var aidStationTable = document.getElementById("aidStationTable");
    var tableHTML = "";

    //Generate Table Head
    tableHTML += "<thead><tr><th scope=\"col\"></th>";
    for(let key of Object.keys(aidStations[0]))
    {
        tableHTML += "<th scope=\"col\">" + key.toUpperCase() + "</th>";
    }
    tableHTML += "</tr></thead>"

    //Generate Table Body
    tableHTML += "<tbody>";
    for (let i = 0; i < aidStations.length; i++)
    {
        tableHTML += "<tr><th scope=\"row\">" + i + "</th>";
        for (key of Object.keys(aidStations[i]))
        {
            tableHTML += "<td>" + aidStations[i][key] + "</td>";
        }
        tableHTML += "</tr>";
    }

    //Close table
    tableHTML += "</tbody></table>";

    //Print Table to DOM
    aidStationTable.innerHTML = tableHTML;
}

addEventListener("DOMContentLoaded", (event) => {
    generateTableHTML();
    document.getElementById("paceSubmit").addEventListener("click", (event) => {
        let paceString = document.getElementById("paceInput").value;
        calculateTimes(paceToMinutes(paceString));
        generateTableHTML();
        document.getElementById("paceDisplay").innerHTML = "Projections for a " + paceString + " Mile Pace";
    })
})





