## Stage 1 - API design

## overview 
this a system amde for campus notifications which include placement updates ,events and results. it helps to manage , receive and read notifications .

## features
1. Create a notification
2. Retrieve notifications for a specific user
3. Mark notifications as read
4. Delete notifications
5. Filter notifications by type

## API Endpoints

### 1. Create Notification
POST /notifications

Request Body:
{
  "title": "Placement Drive",
  "type": "Placement",
  "userId": "101"
}

Response:
{
  "status": "Notification created successfully"
}


### 2. Get Notifications
GET /notifications?userId=101

Response:
[
  {
    "ID": "1",
    "Type": "Placement",
    "Message": "TCS drive tomorrow",
    "Timestamp": "2026-05-04T10:00:00Z"
  }
]


### 3. Mark Notification as Read
PUT /notifications/{id}/read

Response:
{
  "message": "Marked as read"
}


### 4. Delete Notification
DELETE /notifications/{id}

Response:
{
  "message": "Deleted notofication"
}


### 5. Filter Notifications
GET /notifications?type=Placement

## Headers
Content-Type: application/json


## Real-Time Notification Handling

For real- time notification handling web sockets are used.

Alternative methods:
- Server-Sent Events (SSE)
- Polling (less efficient)


## stage 2 - Database design
for storing notification , MongoDb database is used , as its is flexible and handles data efficiently.

## Schema Design

Each notification will be stored as:

{
  "_id": "notif_001",
  "userId": "101",
  "Type": "Placement",
  "Message": "TCS drive tomorrow",
  "isRead": false,
  "Timestamp": "2026-05-04T10:00:00Z"
}


## Challenges at Scale

- Huge number of notifications (millions)
- Slow query performance



## Solutions

1. Indexing:
   Create indexes on userId and Timestamp for faster queries.

2. Pagination:
   Fetch limited records (like 10–20 at a time) instead of all data.

3. Caching:
   Use Redis to store frequently accessed notifications.

4. Archiving:
   Move old notifications to separate storage.

## stage 3 - query optimization

## why this query is performing low?
1. full table scan is required.
2. no indexing is provided in tables
3. sorting operation is very costly

## we can create a composite index

CREATE INDEX index_student_readTime
ON notifications(studentID, isRead, createdAt);

before time complexity : 0(n)
after time complexity : 0(log n)

having index on evry column is not effective because :
1. slows write operations 
2. incrases storage usage

## query 

To find students who received placement notifications in the last 7 days:

SELECT DISTINCT studentID
FROM notifications
WHERE notificationType = 'Placement'
AND createdAt >= NOW() - INTERVAL 7 DAY;

# Stage 4: Improving System Performance Under Load

## Problem

As the platform scales, a large number of users may request notifications simultaneously. This can increase pressure on the database and lead to slower response times.

## Approach to Optimization

### 1. Controlled Data Fetching
Instead of returning the entire notification list, the system will return a limited number of records per request (for example, 10–15). This prevents unnecessary data transfer and improves response time.



### 2. In-Memory Storage 
Recently accessed notifications, especially unread ones, can be temporarily stored in a fast in-memory system like Redis. This avoids repeated database queries for the same data.


### 3. On-Demand Loading
Older notifications should not be loaded immediately. They can be fetched only when the user scrolls or explicitly requests more data. This keeps the initial load light.


### 4. Background Data Preparation
The system can prepare upcoming notificationse in advance (next page of data) while the user is interacting with the current view. This ensures smoother experience.


### 5. Event-Based Updates
Instead of clients repeatedly requesting updates, the server can push new notifications directly using connections such as WebSockets. This reduces redundant network calls.


## Trade-off

1.Cached data may not always reflect real-time updates.
2. Fetching data in smaller parts increases the number of requests.
3. Background loading can consume additional resources if not managed properly.

# Stage 5: Reliable Notification Processing

## Issues in Current Design

The system currently processes notifications one-by-one, which causes some problems:

1. No retry if email fails in between  
2. Slow performance for large number of users (like 50k)  
3. Email, DB save, and push notifcations are tightly connected  
4. One failure can affect the whole flow  


## If "send_email" Fails

1. Some users may not recieve the message  
2. No tracking of failed attempts  
3. No retry → leads to inconsistant data  


## DB Save vs Email Together?

They should not be linked tightly

1. DB should store data even if email fails  
2.  Keeping them together increases failure impact  
3.  Separation improves reliability  


## Improved Approach

Use async processing with a queue.

1. Add tasks to queue instead of direct processing  
2. Use workers to handle tasks in parallel  
3. Separate DB, email, and push logic  
4. Add retry system  
5. Maintain logs  


## Pseudocode
function processNotifications(student_ids, message):
for student_id in student_ids:
enqueue_task(student_id, message)

function worker():
while true:
task = get_next_task()

    try:
        save_to_db(task.student_id, task.message)
    except:
        Log("backend", "error", "db", "DB insert faild")
    
    try:
        send_email(task.student_id, task.message)
    except:
        retry_task(task, "email")
    
    try:
        push_to_app(task.student_id, task.message)
    except:
        Log("backend", "warn", "service", "Push notifcation failed")



## Benefits

1. Faster execution with parallel workers  
2. Failure in one step doesn’t stop others  
3. Retry improves reliability  
4. Logs help in debugging  

# Stage 6: Priority-Based Notification Processing

## Objective

The goal is to identify the most important notifications based on type and recency.


## Priority Rules

Notifications are prioritized as follows:

1.Placement → Highest priority
2.Result → Medium priority
3. Event → Lowest priority


## Approach

1. Each notification type is assigned a weight.
2. Notifications are sorted based on priority.
3. If two notifications have the same type, the most recent one is preferred.
4. The top N notifications are selected .


## Implementation Details

1.Data is fetched from the given API using authorization token.
2.Sorting is done using a custom comparator.
3.JavaScript array sorting is used for simplicity.


## Optimization for Large Data

If notifications are continuously arriving, sorting the entire dataset every time is inefficient.

To improve this:
1.A Min Heap (Priority Queue) can be used
2.Only top N elements are maintained
3.This reduces time complexity and improves performance

## Stage 7: Frontend Implementation

A React-based application is developed to display notifications.

### Features:
1.Displays paginated notifications
2.Fetches data using secured API
3.Shows top priority notifications based on type and recency



### Screenshots:

![Stage 7 Screenshot](./assets/stage_7_outputs/Screenshot 2026-05-04 123436.png)

