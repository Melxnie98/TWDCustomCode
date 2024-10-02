<div>
    
    <button id="download-ics" class="et_pb_button">Download calendar link</button>
</div>

<script>
    // Extract event details from the HTML
    const eventName = document.querySelector('.tribe-events-single-event-title').textContent.trim();
    const eventDateStart = "20241101T000000"; // To be generated from the date string below
    const eventDateEnd = "20241101T235900";   // To be generated from the time string below
    const eventUrl = window.location.href; // Get the current page URL

    // Getting the event start date from the HTML
    const startDateElement = document.querySelector('.tribe-event-date-start');
    const eventDate = startDateElement ? startDateElement.textContent.trim() : "";
    const eventDateParts = eventDate.split(" @ "); // Split date and time
    const eventDay = eventDateParts[0]; // "November 1"
    
    // Assuming the time part is always present
    const startTime = "00:00"; // Start time (12:00 am)
    const endTime = "23:59"; // End time (11:59 pm)

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
    const icsEventDateStart = `${formattedDate}T${startTime.replace(':', '')}00`;
    const icsEventDateEnd = `${formattedDate}T${endTime.replace(':', '')}00`;

    // ICS format string
    const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:${eventName}
DTSTART:${icsEventDateStart}
DTEND:${icsEventDateEnd}
URL:${eventUrl}
DESCRIPTION:Event details for ${eventName}
END:VEVENT
END:VCALENDAR
    `.trim();

    // Function to create a downloadable link
    document.getElementById('download-ics').addEventListener('click', function() {
        const blob = new Blob([icsContent], { type: 'text/calendar' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); // Create an anchor element
        a.href = url;
        a.download = 'event.ics'; // Set the file name
        document.body.appendChild(a); // Append it to the body
        a.click(); // Programmatically click it to trigger download
        document.body.removeChild(a); // Clean up by removing the element
    });
</script>
