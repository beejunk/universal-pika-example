import { promises as fs } from "fs";
import path from "path";

/**
 * Recursively read the provided path and return a list of all files in the
 * directory tree.
 *
 * @param {string} dirPath
 * @returns {Promis<Array<string>>}
 */
export default async function recursiveReaddir(dirPath) {
  const dirents = await fs.readdir(dirPath, { withFileTypes: true });
  const fsPromises = [];
  const filePaths = [];

  dirents.forEach((dirent) => {
    if (dirent.isDirectory()) {
      fsPromises.push(recursiveReaddir(path.join(dirPath, dirent.name)));
    } else if (dirent.isFile()) {
      filePaths.push(path.join(dirPath, dirent.name));
    }
  });

  const nestedPaths = await Promise.all(fsPromises);

  return [...filePaths, ...nestedPaths.flat()];
}
