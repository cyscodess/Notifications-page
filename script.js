import { notifications } from "./data.js";

const markAllBtn = document.getElementById('mark-all-btn')

// Grab the container where notifications will be feed 
let notificationFeed = document.getElementById("notif-feed")

// Render notifications in document
function renderNotifications() {
    let feedHtml = ""

    let readClass = ""
    let messageUndefinedClass = ""
    let imageUndefinedClass = ""

    notifications.forEach(function(alert) {

        // Define styling depending on read status
        if (alert.isRead) {
            readClass = ""
        } else {
            readClass = "unread"
        }

        // Remove blank message containers
        if (alert.message) {
            messageUndefinedClass = "unhide"
        } else {
            messageUndefinedClass = "hide"
        }

        // Remove blank images
        if (alert.image) {
            imageUndefinedClass = "unhide-img"
        } else {
            imageUndefinedClass = "hide"
        }

        feedHtml += `
            <div class="notif-post ${readClass}">
                <img src="${alert.avatar}" class="user-avatar">
                <div class="notif-info">
                    <p>
                        <a href="#" class="user-link">${alert.user}</a>
                        ${alert.activity}
                        <a href="#" class="page-link">${alert.page}</a>
                        <span class="${readClass}"></span>
                    </p>
                    <h4>${alert.time}</h4>
                    <p class="${messageUndefinedClass}">
                        ${alert.message}
                    </p>
                </div>
                <img class="${imageUndefinedClass}" src="${alert.image}">
            </div>
        `
        
    })

    notificationFeed.innerHTML = feedHtml

}

renderNotifications()

// Toggle read styling for 'mark all as read' button

markAllBtn.addEventListener('click', function() {
    
    notifications.forEach( function(alert) {
        if (!alert.isRead) {
            alert.isRead = true
        }
    })
    
    renderNotificationCount()
    renderNotifications()
    
    markAllBtn.textContent = "No unread notifications"
    markAllBtn.setAttribute("disabled", "")    
})

// Toggle read styling when a notification is clicked


// Make number of unread notifications reflect beside heading 

function renderNotificationCount() {
    let count = 0

    notifications.forEach( function(alert) {
        if(!alert.isRead) {
            count++
        }
    })
    
    document.getElementById("notif-count").innerText = count
}

renderNotificationCount()

