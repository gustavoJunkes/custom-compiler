# Como rodar 

- *npm install* para instalar as dependências
- *npm run build* para gerar um executável ou *npm run dev* para rodar lobal

# Custom compiler

This project consists of a **compiler** for a custom programming language, developed as part of a college project. It consists of both a **backend compiler** - with the compiler logic, and a **frontend text editor**, which allows users to write, compile and validate the code.

## Project Structure

- **`compiler_backend/`**: Contains the core Java code for the compiler.
- **`ide/`**: Contains the frontend, built using Next.js and Electron. This acts as the IDE where users can write code and interact with the compiler.

## Features

- Compile code using a custom programming language.
- Basic IDE functionality with the ability to compile and validate code.
- The backend is embedded in a `.jar` file, which the frontend calls for execution.

## Requirements

- **Java 8**: For the backend compiler.
- **Node.js**: Required for running the frontend in dev mode. 

## Running the Project

1. **Clone the repository**;
2. **Install dependencies**:
   - Navigate to the `ide` folder:
     ```bash
     cd ide
     ```
   - Install the required Node.js dependencies:
     ```bash
     npm install
     ```

3. **Run the frontend**:
   - Start the IDE by running:
     ```bash
     npm run dev
     ```

4. The frontend will now be running.

> Use ``` npm run build ``` to generate an executable.   
