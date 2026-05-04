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