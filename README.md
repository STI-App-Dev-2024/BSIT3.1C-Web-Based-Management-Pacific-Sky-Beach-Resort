# Pacific Sky Beach Resort

## Project Overview

Pacific Sky Beach Resort is an online management system for a beach resort. The project allows the management of resort bookings, customer information, services, and accommodations. It is designed to provide users with a smooth experience in booking and interacting with the resort's offerings.

## Developers

- **Bacay, Darryle Miles S. Bacay**
- **Giron, Shannon Paul**
- **Sasutona, Jhon Ace**
- **Hong, Mark Justin**

## Technologies Used

- **Frontend**: React JS
- **Backend**: Node JS
- **Database**: MySQL

## Features

- User authentication and authorization
- Resort booking management
- Customer and reservation management
- View available rooms and services
- Responsive design for easy access on mobile devices
- Admin panel for managing bookings and resort data

## Installation

To set up the project on your local machine, follow these steps:

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v14 or higher)
- **MySQL**
- **npm** (comes with Node.js)

### Clone the Repository

Start by cloning the repository to your local machine:

```bash
git clone https://github.com/STI-App-Dev-2024/BSIT3.1C-Web-Based-Management-Pacific-Sky-Beach-Resort.git
```

### Install Dependencies

Navigate into the root project folder and install the necessary dependencies:

```bash
cd BSIT3.1C-Web-Based-Management-Pacific-Sky-Beach-Resort
npm install
```

Navigate into the client project folder and install the necessary dependencies:

```bash
cd client
npm install
```

Navigate into the server project folder and install the necessary dependencies:

```bash
cd server
npm install
```

### Setup .env file in the server

**Environment settings**
NODE_ENV="development"
PORT=5000
JWT_SECRET="your_jwt_secret_here"
API_VERSION="v1"

**Cloudinary settings**
CLOUDINARY_CLOUD_NAME="your_cloud_name_here"
CLOUDINARY_API_KEY="your_api_key_here"
CLOUDINARY_API_SECRET="your_api_secret_here"

**MySQL Variables for Development**
MY_SQL_USERNAME="your_mysql_username_here"
MY_SQL_PASSWORD="your_mysql_password_here"
MY_SQL_DATABASE="your_mysql_database_name_here"
MY_SQL_HOST="localhost"

**MySQL Variables for Production**
MY_SQL_USERNAME_PROD="your_prod_mysql_username_here"
MY_SQL_PASSWORD_PROD="your_prod_mysql_password_here"
MY_SQL_DATABASE_PROD="your_prod_mysql_database_name_here"
MY_SQL_HOST_PROD="your_prod_mysql_host_here"

### Start the Development Server

After installing the dependencies, start the development server:

```bash
npm run dev
```

## Key Points

1. **`git clone`** - To clone the repository.
2. **`cd <project-folder>`** - To navigate into the project directory after cloning.
3. **`npm install`** - To install the necessary dependencies.
4. **`npm run dev`** - To start the local development server.
