# JS Backend Project Creator

This is a CLI tool to create a backend project structure with commonly used folders and files. It supports different frameworks like Express, Express with MongoDB, and Express with SQL.

## Usage

### Using `npx`

You can create a new project structure using `npx` without having to install the package globally:

```sh
npx js-backend-generator <project-name>
```

For example:

```sh
npx js-backend-generator MyApiProject
```

### Trying It Locally

1. **Clone the repository or download the script:**

    ```sh
    git clone <repository-url>
    cd js-backend
    ```

2. **Install the dependencies:**

    ```sh
    npm install
    ```

3. **Run the script locally:**

    ```sh
    node createProject.js <project-name>
    ```

    For example:

    ```sh
    node createProject.js MyApiProject
    ```

## Packages Used

* **ora**: For displaying a spinner and making the CLI user-friendly.
* **chalk**: For adding colors to the CLI output, making it more readable and engaging.
* **inquirer**: For prompting the user for input during the execution of the script.
* **fs**: Node.js file system module used for creating directories and files.
* **path**: Node.js path module used for handling and transforming file paths.

## Features

* **Interactive CLI**: Prompts the user for a project name and framework choice.
* **Multiple Framework Support**: Allows creating projects using different frameworks like Express, Express with MongoDB, and Express with SQL.
* **Automatic Directory and File Creation**: Sets up a predefined project structure with common folders and files.
* **Package.json Generation**: Generates a `package.json` file based on the selected framework and installs the necessary dependencies.

## Project Structure

The following directory structure is created:

```
<project-name>/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── middlewares/
│   ├── config/
│   ├── utils/
│   ├── index.js
├── tests/
├── .gitignore
├── README.md
├── package.json
```

## Example

Running the script with the project name `MyApiProject` and selecting `Express` as the framework:

```sh
npx js-backend-generator MyApiProject
```

This will create a project structure with the following commands to start:

```sh
cd MyApiProject
npm install
```

## Author

Ankur Soni

## License

This project is licensed under the MIT License.
