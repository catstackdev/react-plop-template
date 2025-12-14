#!/usr/bin/env node
const path = require("path");
const { Plop, run } = require("plop");

const args = process.argv.slice(2);

// Package directory (where plopfile and templates live)
const packageDir = path.join(__dirname, "..");
const plopfilePath = path.join(packageDir, "plopfile.cjs");

// User's current directory (where files should be generated)
const userCwd = process.cwd();

// Set environment variable so plop-util can access user's directory
process.env.PLOP_USER_CWD = userCwd;

// Change to package directory so templates are found
process.chdir(packageDir);

Plop.prepare(
  {
    cwd: userCwd, // User's React project (for file generation)
    configPath: plopfilePath, // Our plopfile location
    destBasePath: userCwd, // Generate files in user's directory
    preload: [],
    completion: undefined,
  },
  (env) => {
    // Override dest to ensure files go to user's directory
    env.dest = userCwd;
    return run(env, undefined, true);
  },
);
