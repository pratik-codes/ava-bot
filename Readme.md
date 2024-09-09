# Ava AI Chatbot

## Overview

This repository contains a web application with a frontend built using Next.js and React, and a backend developed in Flask. The frontend and backend are organized in separate directories and can be run independently.

## Directory Structure
```
root/
│
├── ava-backend/          # Backend (Flask)
│   ├── __init__.py
│   ├── app.py
│   ├── constants.py
│   ├── handlers.py
│   ├── llm.py
│   ├── routes.py
│   ├── requirements.txt
│   ├── test/
│   │   ├── __init__.py
│   │   ├── test_app.py
│   │   ├── test_handlers.py
│   │   ├── test_llm.py
│   │   └── test_routes.py
│   └── venv/             # Virtual environment
│
└── ava-frontend/         # Frontend (Next.js + React)
    ├── README.md
    ├── components.json
    ├── next-env.d.ts
    ├── next.config.mjs
    ├── package-lock.json
    ├── package.json
    ├── pnpm-lock.yaml
    ├── postcss.config.mjs
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── lib/
    │   ├── pages/
    │   ├── styles/
    │   └── utils/
    └── tailwind.config.ts
    └── tsconfig.json
```


## Setup

### Frontend

1. Navigate to the `ava-frontend` directory:
    ```sh
    cd ava-frontend
    ```

2. Install dependencies:
    ```sh
    pnpm install
    ```

3. Start the development server:
    ```sh
    pnpm run dev
    ```

   The frontend will be available at `http://localhost:3000`.

<br />


### Backend

### Make sure to have `.env` file in you root directory with all the required enviorment variable listed in `.env.sample`

<br />

1. Navigate to the `ava-backend` directory:
    ```sh
    cd ava-backend
    ```

2. Create a virtual environment (if not already created):
    ```sh
    python -m venv venv
    ```

3. Activate the virtual environment:
    - On macOS/Linux:
        ```sh
        source venv/bin/activate
        ```
    - On Windows:
        ```sh
        venv\Scripts\activate
        ```

4. Install dependencies:
    ```sh
    pip install -r requirements.txt
    ```

5. Start the Flask application:
    ```sh
    python app.py
    ```

   The backend will be available at `http://localhost:5000`.

<br />

## Testing

### Backend

1. Ensure the virtual environment is activated.

2. Run the tests:
    ```sh
    pytest
    ```
