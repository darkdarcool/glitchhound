import { write } from "./utils/writer.js";

export default class Logger {
  private outputFile: string;
  /**
   * @param fp The filepath to write to
   * @param data The data to write
   * @param overwrite Should delete the data already in the file
   * @returns {void}
   */
  private writer = write;
  private canWrite = false;
  private isClosed = false;
  constructor(outputFile: string, startNow: boolean = true) {
    this.outputFile = outputFile;
    if (startNow) {
      this.canWrite = true;
      this.writer(outputFile, `[${this.getTimestamp()}]: DEBUG START\n`, true);
    }
    process.on('exit', () => { this.end() });
  }

  private getTimestamp(): string {
    return new Date().toISOString();
  }
  /**
   * Adds a log to the debug log file
   * @param msg The message to actually log
   */
  public log(msg) {
    if (!this.canWrite || this.isClosed) return;
    this.writer(this.outputFile, `[${this.getTimestamp()}]: ${msg}\n`);
  }
  /**
   * Ends the debug process and finishes writing to the file;
   */
  private end() {
    if (!this.canWrite || this.isClosed) return; 
    this.writer(this.outputFile, `[${this.getTimestamp()}]: DEBUG STOP`)
    this.isClosed = true;
  }

  public enable() {
    this.canWrite = true;
  }

  public disable() {
    this.canWrite = false;
  } 
}

