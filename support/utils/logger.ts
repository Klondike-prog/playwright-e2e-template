import fs from 'fs';
import path from 'path';

export default class Logger {
  private static passedPrefix = '✓  ';
  private static failedPrefix = '✘  ';
  private static warningPrefix = '⚠  ';
  private static timePrefix = '⧖  ';
  private static seenPages = new Set<string>();
  private static logFilePath: string;

  static initializeLogger(testName: string, workerId: number, specFile: string) {
    // Extract file name from full path
    const specFileName = path.basename(specFile).replace(/\.[jt]s$/, '');

    // Sanitize test name for file name
    const sanitizedTestName = testName.replace(/[^\w\d-_]/g, '_');

    // Create logs directory per spec
    const logDir = path.resolve(__dirname, `../logs/${specFileName}`);
    if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });

    this.logFilePath = path.join(logDir, `log-${workerId}-${sanitizedTestName}.txt`);
    fs.writeFileSync(this.logFilePath, `=== Test: ${testName} ===\n\n`);
  }

  private static log(message: string) {
    console.log(message);
    fs.appendFileSync(this.logFilePath, message + '\n');
  }

  static async newPage(name: string) {
    this.log(`―――――――――― ${name} ――――――――――\n`);
  }

  static testStart(name: string) {
    this.seenPages.clear();
    this.log('\n════════════════════════════════════════════════════════════');
    this.log(` ◈ Test: ${name}`);
    this.log('════════════════════════════════════════════════════════════\n');
  }

  static onPage(pageName: string) {
    if (this.seenPages.has(pageName)) return;
    this.seenPages.add(pageName);
    this.log(`\n◈ On: ${pageName}`);
  }
  static onForm(formName: string) {
    if (this.seenPages.has(formName)) return;
    this.seenPages.add(formName);
    this.log(`\n◈ On: ${formName}`);
  }

  static passed(message: string) {
    this.log(`${this.passedPrefix}${message}`);
  }

  static failed(message: string) {
    this.log(`${this.failedPrefix}${message}`);
  }

  static warning(message: string) {
    this.log(`${this.warningPrefix}${message}`);
  }

  static time(message: string) {
    this.log(`${this.timePrefix}${message}`);
  }
  static loaded(message: string) {
    this.passed(`Section ${message} - elements have been loaded.`)
  }
  static processLoaded(message: string) {
    this.passed(`Process ${message} has been loaded.`)
  }
  static valueChecked(message: string) {
    this.passed(`Value checked: ${message}`)
  }
  static expandSection(message: string) {
    this.time(`Find section ${message} and expand.`)
  }
  static waitFillForm(message: string) {
    this.time(`Fill form - ${message} section.`)
  }
  static formFilled(message: string) {
    this.passed(`${message} form filled successfully.`)
  }

}

