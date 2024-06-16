#!/usr/bin/env node

// Importing required modules
import ora from 'ora';
import chalk from 'chalk';
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';

const directories = [
    'src',
    'src/controllers',
    'src/models',
    'src/routes',
    'src/services',
    'src/middlewares',
    'src/config',
    'src/utils',
    'tests',
];

// List of files to create
const files = [
    'src/index.js',
    'src/controllers/.gitkeep',
    'src/models/.gitkeep',
    'src/routes/.gitkeep',
    'src/services/.gitkeep',
    'src/middlewares/.gitkeep',
    'src/config/.gitkeep',
    'src/utils/.gitkeep',
    'tests/.gitkeep',
    '.gitignore',
    'README.md',
];


// Function to ask for project name if not provided
async function getProjectName() {
    if (process.argv.length < 3) {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'projectName',
                message: 'Please provide a project name:',
            },
        ]);
        return answers.projectName;
    }
    return process.argv[2];
};


// the MAIN function to create the project structure
async function createBackendStructure() {
    // Get project name
    const projectName = await getProjectName();
    // Create project directory
    const projectDir = path.join(process.cwd(), projectName);
    // Check if project already exists
    if (fs.existsSync(projectDir)) {
        console.log(`Project '${projectName}' already exists!`);
        process.exit(1);
    }
    // Select Framework
    const framework = await selectFramework();

    // Print project name
    console.log(`Creating project: ${chalk.hex('#FFD700')(projectName)}`); // Using gold color for project name

    const spinnerCreateDirectories = ora('Creating project directories').start();
    directories.forEach((dir) => {
        const dirPath = path.join(projectDir, dir);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    });
    spinnerCreateDirectories.succeed('Directories created.');

    // Create files
    const spinnerCreateFiles = ora('Creating project files').start();
    files.forEach((file) => {
        const filePath = path.join(projectDir, file);
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, ''); // Empty file for .gitkeep
        }
    });
    spinnerCreateFiles.succeed('Files created.');

    // Generate package.json file
    const spinnerGeneratePackageFile = ora('Generating package.json file').start();
    await generatingPackageFile(framework, projectDir, projectName);
    spinnerGeneratePackageFile.succeed('package.json file generated.');

    // Install packages
    console.log(`Project structure for '${projectName}' created successfully!`);
    console.log(`\nRun the following commands to start the project:`);
    console.log(`cd ${projectName}`);
    console.log(`npm install`);
}


const selectFramework = async () => {
    const { framework } = await inquirer.prompt([
        {
            type: 'list',
            name: 'framework',
            message: 'SELECT THE FRAMEWORK:',
            choices: [
                { name: 'Express', value: 'express' },
                { name: 'Express + Mongo', value: 'expressMongo' },
                { name: 'Express + SQL', value: 'expressSQL' },
                // { name: 'Custom', value: 'custom' },
            ],
            transformer: (color) => {
                return chalk.hex('#FFA07A')(color); // Using light salmon color for choices
            },
        },
    ]);

    return framework;
};


async function createPackageJson(projectName, projectDir, dependencies) {
    const data = {
        name: projectName,
        version: "1.0.0",
        description: `${projectName} project`,
        scripts: {
            test: "echo \"No tests implemented yet.\"",
            start: "node src/index.js",
        },
        dependencies: dependencies,
    };

    const filePath = projectDir + "/package.json";

    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        console.log(`package.json created for project '${projectName}'`);
    } catch (error) {
        console.error("Error creating package.json:", error);
    }
}


async function generatingPackageFile(framework, projectDir, projectName) {

    let dependencies = {};

    switch (framework) {
        case 'express':
            dependencies['express'] = 'latest';
            break;
        case 'expressMongo':
            dependencies['express'] = 'latest';
            dependencies['mongoose'] = 'latest';
            break;
        case 'expressSQL':
            dependencies['express'] = 'latest';
            dependencies['sequelize'] = 'latest';
            break;
    }

    createPackageJson(projectName, projectDir, dependencies);
};
console.clear();
createBackendStructure();