import chalk from "chalk";

export default class Logger {
  static log(...args) {
    console.log(chalk.green(...args));
  }

  static error(...args) {
    console.log(chalk.red(...args));
  }

  static warn(...args) {
    console.log(chalk.yellow(...args));
  }

  static info(...args) {
    console.log(chalk.blue(...args));
  }

  static debug(...args) {
    console.log(chalk.gray(...args));
  }

  static trace(...args) {
    console.log(chalk.gray(...args));
  }
}
