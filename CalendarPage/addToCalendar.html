<div>
    <button id="download-ics" class="et_pb_button">Add to calendar</button>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        // Extract event details from the HTML
        const eventName = document.querySelector('.tribe-events-single-event-title').textContent.trim();
        const eventUrl = window.location.href; // Get the current page URL

        // Getting the event start date from the HTML
        const startDateElement = document.querySelector('.tribe-event-date-start');
        const eventDate = startDateElement ? startDateElement.textContent.trim() : "";
        const eventDateParts = eventDate.split(" @ "); // Split date and time
        const eventDay = eventDateParts[0]; // "October 16"

        // Getting the event time
        const startTimeElement = document.querySelector('.tribe-events-start-time');
        const timeText = startTimeElement ? startTimeElement.textContent.trim() : "";

        console.log('Event Name:', eventName);
        console.log('Event Date:', eventDate);
        console.log('Event Time:', timeText);

        // Extracting start and end time
        const [startTime, endTime] = timeText.split(" - ").map(time => time.trim());
        
        // Convert start and end time to the required format (HHMM)
        function formatTimeToICS(timeStr) {
            const [time, modifier] = timeStr.split(" ");
            let [hours, minutes] = time.split(":").map(Number);
            
            if (modifier.toLowerCase() === "pm" && hours < 12) {
                hours += 12; // Convert PM to 24-hour format
            }
            if (modifier.toLowerCase() === "am" && hours === 12) {
                hours = 0; // Midnight case
            }
            
            return `${String(hours).padStart(2, '0')}${String(minutes).padStart(2, '0')}`;
        }

        const startTimeFormatted = formatTimeToICS(startTime);
        const endTimeFormatted = formatTimeToICS(endTime);
        
        // Function to convert date to required format
        function formatDateToICS(dateStr) {
            const date = new Date(dateStr);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}${month}${day}`;
        }

        // Get full date in correct format for ICS
        const fullDate = `${eventDay} ${new Date().getFullYear()}`; // Assumes current year for simplicity
        const formattedDate = formatDateToICS(fullDate);
        
        // Setting formatted event date start and end
        const icsEventDateStart = `${formattedDate}T${startTimeFormatted}00`;
        const icsEventDateEnd = `${formattedDate}T${endTimeFormatted}00`;

        // ICS format string
        const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:${eventName}
DTSTART:${icsEventDateStart}
DTEND:${icsEventDateEnd}
DESCRIPTION:Details for this event (including a Zoom link if applicable) are on TeachWell Digital: ${eventUrl}
END:VEVENT
END:VCALENDAR
        `.trim();

        console.log('ICS Content:', icsContent);

        // Function to create a downloadable link
        document.getElementById('download-ics').addEventListener('click', function() {
            console.log('Download button clicked');
            const blob = new Blob([icsContent], { type: 'text/calendar' });
            console.log('Blob:', blob);
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
