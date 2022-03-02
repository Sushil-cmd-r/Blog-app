# Blog-app
This is a simple blog website created using node and expressJs.
The websites allows user to read and create blogs. For creating blog user must be logged in.
For authentication JWT is used.
The logged in users and blogs are stored in MongoDB atlas database on cloud.

## Screen Shots
### Home page
![Screenshot (86)](https://user-images.githubusercontent.com/85934441/153588132-a9acd139-bb1c-4234-a6cb-95ce5e9c9386.png)

### Blog details page
![Screenshot (87)](https://user-images.githubusercontent.com/85934441/153588199-8c93c63e-784a-4ef7-87a7-aed7f677bcfa.png)

# To use
First clone this repository in a directory using
```bash
  $ git clone https://github.com/Sushil-cmd-r/Blog-app.git
```
After that in your project directory run ` npm intall ` in your terminal. This will install all necessary dependencies required for this project. \
Then you need to create a `.env` file.In this file you need to create following variables - 
 - PORT (optional, 5000 by default)
 - DB_URI ( your mongoDB URI )
 - JWT_SECRET ( your jwt secret )

After this you can run `npm start`.\
It runs the app in the development mode.\
Open [http://localhost:5000](http://localhost:3000) to view it in the browser
