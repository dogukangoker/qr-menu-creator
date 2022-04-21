import chalk from "chalk";

export default class Logger {
  static log(...args) {
    console.log(
      `(${
        new Date().toLocaleDateString() +
        " - " +
        new Date().toLocaleTimeString()
      }): ` + chalk.green(...args)
    );
  }

  static error(...args) {
    console.log(
      `(${
        new Date().toLocaleDateString() +
        " - " +
        new Date().toLocaleTimeString()
      }): ` + chalk.red(...args)
    );
  }

  static warn(...args) {
    console.log(
      `(${
        new Date().toLocaleDateString() +
        " - " +
        new Date().toLocaleTimeString()
      }): ` + chalk.yellow(...args)
    );
  }

  static info(...args) {
    console.log(
      `(${
        new Date().toLocaleDateString() +
        " - " +
        new Date().toLocaleTimeString()
      }): ` + chalk.blue(...args)
    );
  }

  static debug(...args) {
    console.log(
      `(${
        new Date().toLocaleDateString() +
        " - " +
        new Date().toLocaleTimeString()
      }): ` + chalk.gray(...args)
    );
  }

  static trace(...args) {
    console.log(
      `(${
        new Date().toLocaleDateString() +
        " - " +
        new Date().toLocaleTimeString()
      }): ` + chalk.gray(...args)
    );
  }
}
