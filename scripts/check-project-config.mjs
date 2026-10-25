import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const app = JSON.parse(await readFile(new URL("../app.json", import.meta.url), "utf8")).expo;
const pkg = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));

assert.equal(app.slug, "launch-theme-test");
assert.equal(app.userInterfaceStyle, "automatic");
assert.equal(app.android.package, "com.strngelabs.launchthemetest");
assert.equal(pkg.name, "launch-theme-test");
assert.match(pkg.dependencies.expo, /^~58\\./);
assert.ok(pkg.dependencies["expo-splash-screen"]);
assert.ok(pkg.dependencies["react-native-mmkv"]);
assert.ok(pkg.dependencies["react-native-nitro-modules"]);

const splashPlugin = app.plugins.find((plugin) => Array.isArray(plugin) && plugin[0] === "expo-splash-screen");
assert.ok(splashPlugin, "Expo splash plugin should exist");
const options = splashPlugin[1];
assert.equal(options.backgroundColor, "#F6F8FC");
assert.equal(options.dark.backgroundColor, "#101827");
assert.equal(options.android.backgroundColor, "#F6F8FC");
assert.equal(options.android.dark.backgroundColor, "#101827");

console.log("Passed Expo app configuration checks.");
