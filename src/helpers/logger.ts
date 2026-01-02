import chalk from 'chalk';

const logLevels = ['debug', 'info', 'log', 'warn', 'error'] as const;
type LogLevel = typeof logLevels[number];

class LoggerClass {
    private logMessage(message: string, level: LogLevel): void {
        const timestamp = new Date().toISOString();
        console.log(this.colors[level](`[${timestamp}] ${message}`));
    }

    private colors: Record<LogLevel, (msg: string) => string> = {
        debug: chalk.gray,
        info: chalk.blue,
        log: chalk.white,
        warn: chalk.yellow,
        error: chalk.red,
    }

    debug(message: string): void {
        const formattedMessage = chalk.bold("[DEBUG]") + " " + message;
        this.logMessage(formattedMessage, 'debug');
    }
    info(message: string): void {
        const formattedMessage = chalk.bold("[INFO]") + " " + message;
        this.logMessage(formattedMessage, 'info');
    }
    log(message: string): void {
        const formattedMessage = chalk.bold("[LOG]") + " " + message;
        this.logMessage(formattedMessage, 'log');
    }
    warn(message: string): void {
        const formattedMessage = chalk.bold("[WARN]") + " " + message;
        this.logMessage(formattedMessage, 'warn');
    }
    error(message: string): void {
        const formattedMessage = chalk.bold("[ERROR]") + " " + message;
        this.logMessage(formattedMessage, 'error');
    }
}
const Logger = new LoggerClass();
export default Logger;