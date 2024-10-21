# Test Project for Firebase

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/en/) (version 14.x or higher)
- [npm](https://www.npmjs.com/get-npm)
- Firebase Admin SDK credentials (a `.json` file from the Firebase Console)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/test-project-for-firebase.git
    ```

2. Navigate to the project directory:

    ```bash
    cd test-project-for-firebase
    ```

3. Install the necessary dependencies:

    ```bash
    npm install
    ```

4. Set up your Firebase Admin credentials:

    - Place your Firebase Admin SDK `.json` file in the root of the project.
    - Add the path to the `.json` file in the `.env` file:

    ```bash
    FIREBASE_ADMIN_SDK_PATH=./firebase-adminsdk.json
    ```

## Running the Server

1. Start the server with the following command:

    ```bash
    npm start
    ```

2. The server will be running on `http://localhost:3000`.

