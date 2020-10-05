import { env } from "./env"

export class MaskLog {

    /**
     * This method applies mask (*) on all patterns defined in env.ts.
     * Ex:
     *  pattern: /myField=(\d+)/,
     *  message: "Message with myField=1234",
     *  message after mask: "Message with myField=****"
     * @method maskLog
     * @param message: string - A message that will be masked
     * @returns message masked
     */
    public static maskLog(message: string): string {

        if (message) {

            this.maskLogPattern.forEach((maskPattern) => {

                if (new RegExp(maskPattern).test(message)) {

                    const match = message.match(maskPattern);
                    const digitGroupMatch = match[1];
                    if (match && match[1]) {
                        message = message.replace(digitGroupMatch, this.mask.repeat(digitGroupMatch.length));
                    }
                }
            });
        }

        return message;
    }

    private static mask: string = "*";
    private static maskLogPattern = env.maskLogPattern;

}
document.body.innerHTML += MaskLog.maskLog("teste mensagem log cpfCnpjCliente=1234")
document.body.innerHTML += MaskLog.maskLog("teste mensagem log rgCliente=1234")