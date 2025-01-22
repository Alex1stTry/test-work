import SendGrid from '@sendgrid/mail'
import { EmailTypeEnum } from "../enums/email-type.enum";
import { emailConstants } from "../constants/email.constant";
import { configs } from "../config/config";

class SendMailService {
    constructor() {
        SendGrid.setApiKey(configs.SENDGRID_API_KEY)
    }

    public async sendByType(to: string, username: string, actionToken: string) {
        try {
            const templateId = emailConstants[EmailTypeEnum.RESET_PASSWORD].templateId

            await SendGrid.send({
                from: configs.SENDGRID_EMAIL,
                to,
                templateId,
                dynamicTemplateData: {
                    username,
                    activationLink: configs.ACTIVATION_LINK,
                    actionToken
                }
            })
        }
        catch (e) {
            console.error(e)
        }
    }


}
export const sendMailService = new SendMailService()