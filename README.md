# Bookpedia-Task

## Overview

Bookpedia-Task is a full-stack web application designed for managing a list of books. Users can register, log in, and manage their book collection. The application is built using React with Vite on the front-end and Node.js with Express on the back-end.

## Features

### Front-end
- **React with Vite**: Fast development environment
- **Registration & Login**: User authentication with forms
- **Dashboard**: Displays user's favorite books
- **Book Management**: Add, edit, and delete books with dynamic updates

### Back-end
- **Node.js with Express**: Server framework
- **JWT Authentication**: Secure user sessions
- **CRUD Operations**: Create, Read, Update, and Delete books
- **PostgreSQL & Prisma**: Database management and ORM

## Setup

### Front-end

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/nishamvp/Bookpedia-Task.git
    ```
2. **Navigate to the Front-end Directory**:
    ```bash
    cd Bookpedia-Task/client
    ```
3. **Install Dependencies**:
    ```bash
    npm install
    ```
4. **Start the Development Server**:
    ```bash
    npm run dev
    ```

### Back-end

1. **Navigate to the Back-end Directory**:
    ```bash
    cd Bookpedia-Task/server
    ```
2. **Install Dependencies**:
    ```bash
    npm install
    ```
3. **Setup Environment Variables**: Create and configure the `.env` file
4. **Run Database Migrations**:
    ```bash
    npx prisma migrate dev
    ```
5. **Start the Server**:
    ```bash
    npm start
    ```

## Contributing

Feel free to open issues or submit pull requests. For significant changes, please discuss them first.

## License

This project is licensed under the MIT License.

## Contact

For any inquiries, please reach out to: [nishamvp30@gmail.com](mailto:nishamvp30@gmail.com)
