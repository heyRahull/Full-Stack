// import express from 'express';
// import cookieParser from 'cookie-parser';

// const app = express();

// // Middleware that reads cookies coming from the browser and populates req.cookies
// app.use(cookieParser());

// // 1. Route to set a cookie (Handing the user a coffee stamp card)
// app.get('/give-cookie', (req, res) => {
//     // res.cookie( 'NAME_OF_COOKIE', 'VALUE_OF_COOKIE', { OPTIONS } )
//     res.cookie('userPreferences', 'darkMode-enUS', {
//         maxAge: 1000 * 60 * 5, // Valid for 5 minutes
//         httpOnly: true         // Secure: Client JavaScript cannot read this
//     });

//     res.send(`
//         <h1>🍪 Step 1: Cookie Baked!</h1>
//         <p>The server just slid a cookie named <strong>userPreferences</strong> into your browser's pocket.</p>
//         <a href="/read-cookie">Click here to see if the server can read it</a>
//     `);
// });

// // 2. Route to read the cookie (User shows their card back to the server)
// app.get('/read-cookie', (req, res) => {
//     // Read cookies using req.cookies
//     const preferences = req.cookies.userPreferences;

//     if (preferences) {
//         res.send(`
//             <h1>🍪 Step 2: Server Read Your Cookie!</h1>
//             <p>Your browser automatically sent the cookie back. The value inside it is: <strong>${preferences}</strong></p>
//             <p>The server holds no memory of this in its RAM; it knows this purely because your browser showed the card!</p>
//             <a href="/delete-cookie">Clear Cookie</a>
//         `);
//     } else {
//         res.status(400).send(`
//             <h1>❌ No Cookies Found</h1>
//             <p>Your browser's pocket is empty. Go get a cookie first.</p>
//             <a href="/give-cookie">Get Cookie</a>
//         `);
//     }
// });

// // 3. Route to delete the cookie (Throwing the stamp card in the trash)
// app.get('/delete-cookie', (req, res) => {
//     res.clearCookie('userPreferences');
//     res.send(`
//         <h1>🍪 Step 3: Cookie Destroyed!</h1>
//         <p>The cookie has been deleted from your browser.</p>
//         <a href="/read-cookie">Try reading it now</a>
//     `);
// });

// app.listen(5000, () => console.log("🚀 Cookie server running on http://localhost:5000/read-cookie"));


// 1. Setting up cookie
// 2. reading cookie value 
// 3. Clearing cookie

// import express from 'express';
// import cookieParser from 'cookie-parser';

// const app = express();
// app.use(cookieParser());

// // 1. setting up cookie

// app.get('/set-cookie', (req, res)=>{
//     res.cookie('userPreference', 'Rahul', {
//         maxAge: 1000*60*10,
//         httpOnly: true
//     });

//     res.send(`
//         <h1>Cookie set successfully</h1>
//         <a href="/read-cookie">Read cookie value here</a>
//         `)
// })

// app.get('/read-cookie', (req, res)=>{
//     const value = req.cookies.userPreference;
//     if(value){
//         res.send(`
//         <h1>Cookie value is: ${value}</h1>
//         <a href="/delete-cookie">Delete Cookies from here</a>
//         `)
//     }else{
//         res.send(`
//             <h1>The cookie has been deleted from ur browser</h1>
//             <a href="/set-cookie">Set the cookie from here</a>
//             `)
//     }
    
// })

// app.get('/delete-cookie', (req, res)=>{
// res.clearCookie('userPreference');
// res.send(`
//     <h1>Cookie deleted successfully</h1>
//     <a href="/read-cookie">Now try reading cookies from here</a>
//     `)
// })

// app.listen(5000, ()=> console.log("Server running on port 5000"))

import express from 'express';
import session from 'express-session';

const app = express();

// 1. Configure the session middleware vault
app.use(session({
  secret: 'super-secret-key-that-no-one-should-know',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    maxAge: 1000 * 60 * 10, // The cookie keycard stays valid for 10 minutes
    httpOnly: true          // Security setting: JavaScript cannot read this cookie
  }
}));

// Mock login route (NO DATABASE NEEDED - JUST FOR TESTING)
app.get('/login', (req, res) => {
    // We mock a successful login by immediately saving data into the session vault
    req.session.username = "Rahul";
    req.session.role = "UI Developer";

    res.send(`
        <h1>Step 1: You are logged in!</h1>
        <p>The server just created a session vault for you and sent a keycard cookie to your browser.</p>
        <a href="/dashboard">Click here to go to the Dashboard</a>
    `);
});

// Protected dashboard route
app.get('/dashboard', (req, res) => {
    // If the browser sends a valid session cookie, req.session will have our data!
    if (req.session.username) {
        res.send(`
            <h1>Step 2: Welcome to the Dashboard, ${req.session.username}!</h1>
            <p>Your role from the session vault is: <strong>${req.session.role}</strong></p>
            <p>The server recognized your browser because of the cookie keycard it presented.</p>
            <a href="/logout">Log Out</a>
        `);
    } else {
        res.status(401).send(`
            <h1>❌ Access Denied</h1>
            <p>No valid session keycard cookie was found. You are completely anonymous to the server right now.</p>
            <a href="/login">Go Log In First</a>
        `);
    }
});

// Logout route
app.get('/logout', (req, res) => {
    // Destroy the session vault on the server
    req.session.destroy((err) => {
        if (err) return res.send("Error logging out");
        res.clearCookie('connect.sid'); // Tell the browser to throw away the cookie keycard
        res.send(`
            <h1>Step 3: Logged Out!</h1>
            <p>The session vault has been deleted and your cookie is gone.</p>
            <a href="/dashboard">Try going to Dashboard now</a>
        `);
    });
});

app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000/dashboard"));