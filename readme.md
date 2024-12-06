# Strapi 5 and React 19 Integration Guide

## Introduction

This guide provides step-by-step instructions on how to set up and integrate Strapi 5 with React 19 for building a modern web application.

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- Basic knowledge of JavaScript and React

## Setting Up Strapi

1. **Install Strapi**

   ```bash
   npx create-strapi-app my-project --quickstart
   ```

2. **Navigate to the Strapi project directory**

   ```bash
   cd my-project
   ```

3. **Start the Strapi server**

   ```bash
   npm run develop
   ```

4. **Access the Strapi Admin Panel**
   Open your browser and go to `http://localhost:1337/admin` to set up your admin account.

## Creating Content Types

1. **Define your content types** in the Strapi admin panel.
2. **Add fields** to your content types as needed.

## Setting Up React

1. **Create a new React application**

   ```bash
   npx create-react-app my-react-app
   ```

2. **Navigate to the React project directory**

   ```bash
   cd my-react-app
   ```

3. **Install Axios for API calls**
   ```bash
   npm install axios
   ```

## Fetching Data from Strapi

1. **Create a service to fetch data**
   Create a new file `src/services/api.js`:

   ```javascript
   import axios from "axios";

   const API_URL = "http://localhost:1337";

   export const fetchData = async (endpoint) => {
     const response = await axios.get(`${API_URL}/${endpoint}`);
     return response.data;
   };
   ```

2. **Use the service in your components**
   Example in `src/App.js`:

   ```javascript
   import React, { useEffect, useState } from "react";
   import { fetchData } from "./services/api";

   const App = () => {
     const [data, setData] = useState([]);

     useEffect(() => {
       const getData = async () => {
         const result = await fetchData("your-endpoint");
         setData(result);
       };
       getData();
     }, []);

     return (
       <div>
         <h1>Data from Strapi</h1>
         <ul>
           {data.map((item) => (
             <li key={item.id}>{item.title}</li>
           ))}
         </ul>
       </div>
     );
   };

   export default App;
   ```

## Conclusion

You have successfully set up Strapi 5 and React 19. You can now build your application by creating more content types and fetching data as needed.

## Additional Resources

- [Strapi Documentation](https://strapi.io/documentation)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
