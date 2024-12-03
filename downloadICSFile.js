<div>
    <button id="download-ics" class="et_pb_button">Add to calendar</button>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const eventName = document.querySelector('.entry-title').textContent.trim();
        const eventUrl = window.location.href; // Get the current page URL

        // Function to format time (convert HH:MM to HHMM)
        function formatTimeToICS(timeStr) {
            const [hours, minutes] = timeStr.split(":").map(Number);
            return `${String(hours).padStart(2, '0')}${String(minutes).padStart(2, '0')}`;
        }

        // Function to format date (convert DD-MM-YYYY to YYYYMMDD)
        function formatDateToICS(dateStr) {
            const dateParts = dateStr.split("-");
            const day = dateParts[0].padStart(2, '0'); // Ensure day is two digits
            const month = dateParts[1].padStart(2, '0'); // Ensure month is two digits
            const year = dateParts[2]; // Year is already in the correct format
            return `${year}${month}${day}`;
        }

        // Function to generate the ICS content for multiple events
        function generateICSContent(eventDates) {
            let icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
            `.trim();

            // Loop through each event and generate a VEVENT for it
            eventDates.forEach(event => {
                const formattedDate = formatDateToICS(event.date);
                const startTimeFormatted = formatTimeToICS(event.startTime);
                const endTimeFormatted = formatTimeToICS(event.endTime);

                const icsEvent = `
BEGIN:VEVENT
SUMMARY:${eventName}
DTSTART:${formattedDate}T${startTimeFormatted}00
DTEND:${formattedDate}T${endTimeFormatted}00
DESCRIPTION:Details for this event (including a Zoom link if applicable) are on TeachWell Digital: ${eventUrl}
END:VEVENT
                `.trim();

                // Append each event to the overall ICS content
                icsContent += `\n${icsEvent}`;
            });

            // Close the calendar
            icsContent += "\nEND:VCALENDAR";

            return icsContent;
        }

        // Extract the <p> content inside #start-date and parse the date/time combinations
        const startDateElement = document.querySelector('#start-date p');
        const eventDates = [];

        if (startDateElement) {
            // Split the content by commas (you can change this delimiter if needed)
            const eventEntries = startDateElement.textContent.trim().split(","); // ["17-02-2025 11:00-12:00", "18-02-2025 09:00-10:00", "19-02-2025 14:00-15:00"]

            eventEntries.forEach(entry => {
                const [date, timeRange] = entry.trim().split(" "); // "17-02-2025" and "11:00-12:00"
                const [startTime, endTime] = timeRange.split("-"); // "11:00" and "12:00"

                // Push the event details to the eventDates array
                eventDates.push({
                    date: date,
                    startTime: startTime,
                    endTime: endTime
                });
            });
        }

        // Generate ICS content for the extracted dates
        const icsContent = generateICSContent(eventDates);

        console.log('ICS Content:', icsContent);

        // Function to create a downloadable link
        document.getElementById('download-ics').addEventListener('click', function() {
            console.log('Download button clicked');
            const blob = new Blob([icsContent], { type: 'text/calendar' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a'); // Create an anchor element
            a.href = url;
            a.download = 'event.ics'; // Set the file name
            document.body.appendChild(a); // Append it to the body
            a.click(); // Programmatically click it to trigger download
            document.body.removeChild(a); // Clean up by removing the element
        });
    });
</script>
