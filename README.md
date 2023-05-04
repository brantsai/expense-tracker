Expense Tracker by Brandon Tsai

How to Run Program:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

Summary:

In this project, I created a single page Expense Tracker application which allows your to add, edit, and delete users as well as expenses. Each expense is tracked by category as well as by the user who made the expense, and keeps track of total company expenses even when there are changes made within the data. Any changes within one table persists between the two other tables, and all data is stored within the app in a data structure.

I chose to use React as my framework for this application as it is very efficient in rendering UI components, and would allow for a smooth user experience for anybody who uses the application. React also allows for the use of state management, which I felt would be very useful for a project like this, where I would have to constantly manage data and application state and pass them between components. React's component based architechture makes it easy to break down and organize the different parts of the single-paged application, allowing for better code readability, and the ability to reuse components (although I did not reuse any components in this project, in the future I would clean up the code to allow the modal component to be reusable for both the user and expense tables).

One of the biggest decisions I had to make during this project was deciding on the structure of the data model used for the application. I chose to use an object with 3 main nested objects: users, categories, and expenses. Each expense was stored within the expenses object, as well as being referenced within the users and categories by its expense ID. The users object was also organized by user ID as well. The main purpose of this is to take advantage of the O(1) lookup that objects have, which is extremely important when dealing with large data sets. Instead of iteratingg through the entire code base to find a specific user or expense, we can grab the data directly by referencing its corresponding ID in constant time. The tradeoff of using such a complex nested data structure is that performing functions on deeply nested items causes the code to be quite complicated and may impact the overall readability of the code itself. However, I believe the tradeoff is worth it because the difference between an O(1) and O(n) operation can be massive especially when dealing with large code bases with millions of data points.