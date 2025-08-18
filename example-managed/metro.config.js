// Metro configuration for monorepo/local package usage
// Make Metro follow symlinks and watch the workspace root so it can resolve `expo-roomplan` linked from `..`

const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "..");

const config = getDefaultConfig(projectRoot);

// 1. Watch the monorepo root (where the linked package lives)
config.watchFolders = [workspaceRoot];

// 2. Ensure Metro resolves dependencies only from this app's node_modules
config.resolver = config.resolver || {};
config.resolver.nodeModulesPaths = [path.resolve(projectRoot, "node_modules")];
// Prevent Metro from walking up and resolving duplicates from sibling folders
config.resolver.disableHierarchicalLookup = true;

// Force singletons for core deps to avoid invalid hook call (duplicate React)
config.resolver.extraNodeModules = {
  react: path.resolve(projectRoot, "node_modules/react"),
  "react-dom": path.resolve(projectRoot, "node_modules/react-dom"),
  "react-native": path.resolve(projectRoot, "node_modules/react-native"),
  "react-native-web": path.resolve(
    projectRoot,
    "node_modules/react-native-web"
  ),
  expo: path.resolve(projectRoot, "node_modules/expo"),
  "expo-modules-core": path.resolve(
    projectRoot,
    "node_modules/expo-modules-core"
  ),
};

// 3. Allow resolving packages through symlinks (required for `file:..` deps)
config.resolver.unstable_enableSymlinks = true;
config.resolver.unstable_enablePackageExports = true;

// Keep resolution simple; extraNodeModules already forces singletons

module.exports = config;
