const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

/**
 * Pick directory interactively with fzf
 */
function pickDirWithFzf(directories, options = {}) {
  try {
    // Try using fzf for interactive selection
    const dirs = directories.join("\n");
    const selected = execSync(`echo "${dirs}" | fzf --height 40% --reverse`, {
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "ignore"],
    }).trim();
    return selected;
  } catch (error) {
    // Fallback to first directory or default
    return options.default || directories[0] || "src/components";
  }
}

/**
 * Get common project directories
 */
function getProjectDirectories() {
  const commonDirs = [
    "src/components",
    "src/features",
    "src/pages",
    "src/hooks",
    "src/contexts",
    "src/services",
    "src/utils",
    "src/store",
    "src/lib",
  ];

  // Filter to only existing directories
  return commonDirs.filter((dir) => {
    try {
      return fs.existsSync(dir) && fs.statSync(dir).isDirectory();
    } catch {
      return false;
    }
  });
}

/**
 * Get contexts from index file
 */
function getContextsFromIndex(dir) {
  try {
    const indexPath = path.join(dir, "index.ts");
    if (!fs.existsSync(indexPath)) {
      return [];
    }
    
    const content = fs.readFileSync(indexPath, "utf-8");
    const contextMatches = content.matchAll(/export\s*\*\s*from\s*['"]\.\/(.+?)['"]/g);
    return Array.from(contextMatches).map(match => match[1]);
  } catch {
    return [];
  }
}

module.exports = {
  pickDirWithFzf,
  getProjectDirectories,
  getContextsFromIndex,
};
