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
 * Get common project directories with all subdirectories
 * Checks in user's project directory, not package directory
 * Returns both top-level and nested directories (e.g., src/components/ui)
 */
function getProjectDirectories() {
  // Get user's original directory from environment variable
  const basePath = process.env.PLOP_USER_CWD || process.cwd();
  
  const baseDirs = [
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

  const allDirs = [];

  /**
   * Recursively scan directory for subdirectories
   * @param {string} dir - Relative directory path from basePath
   */
  function scanDirectory(dir) {
    try {
      const fullPath = path.join(basePath, dir);
      
      // Check if directory exists
      if (!fs.existsSync(fullPath) || !fs.statSync(fullPath).isDirectory()) {
        return;
      }

      // Add this directory to the list
      allDirs.push(dir);

      // Read all entries in this directory
      const entries = fs.readdirSync(fullPath, { withFileTypes: true });
      
      // Process each subdirectory
      for (const entry of entries) {
        if (entry.isDirectory() && !entry.name.startsWith('.') && !entry.name.startsWith('_')) {
          // Recursively scan subdirectories
          scanDirectory(path.join(dir, entry.name));
        }
      }
    } catch (error) {
      // Skip on error (permission issues, etc.)
    }
  }

  // Scan each base directory recursively
  baseDirs.forEach(baseDir => scanDirectory(baseDir));

  // If no directories found, return default
  return allDirs.length > 0 ? allDirs : ["src/components"];
}

/**
 * Get contexts from index file
 */
function getContextsFromIndex(dir) {
  try {
    const basePath = process.env.PLOP_USER_CWD || process.cwd();
    const indexPath = path.join(basePath, dir, "index.ts");
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
