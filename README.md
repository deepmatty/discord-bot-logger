# Discord-bot-logger
Discord bot named "logger" that logs late attendance of team members and the amount of work hours each member has done during a spesific week

# Purpose of App
This bot was made in preparation for a software development group project. The bot assists in keeping records of the attendance and work load of each group member. 
I also made this project to learn javascript and cloud computing as it was relevant for the group project and further personal development.

# User stories
Late attendance is marked with a 'cross'. For every 5 minute the member is late (without a proper excuse), they receive a cross. They can get a total of 3 crosses for each meeting. 

1. As a group member, I should be able to see how many crosses I have so that I can track my late attendance.
2. As a group member, I should be able to log myself or another teammate for late attendance so that we can ensure accuracy.
3. As a group member, I should be able to remove a specified amount of crosses in exchange for bringing snacks.
4. Every member should be able to see how many crosses every member has
5. A group member should be able to log the amount of work they have done a day. The total hours worked for a week is automatically calculated
6. A member should be able to retreive the work hours data 


# Functionality 
The bot was made work the group's work ethic in mind (check user stories)[#user-stories]. For each functionality, there is a number corresponding to the user story.

logger has the following commands:

**/cross** - the user can see how many crosses they have (1)

**/late [username] [amount of crosses]** - logs the specified user with a specified amount of crosses (2) (temporarily no upper limit)

**/snack [username] [amount of crosses]** - removes the specified amount of crosses from the specified user (3)

**/leaderboard** - overview of all members with crosses, sorted in descending order (4)


# Tools
The bot was developed with MongoDB as database platform and is hosted remotely on a Google e2-micro virtual machine


Sources:
https://github.com/nodesource/distributions/blob/master/README.md
https://www.youtube.com/watch?v=P4i_WPXXjoc&t=38s