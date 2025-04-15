/* eslint-disable no-console */
/* eslint-disable space-before-blocks */
// Lưu ý Brevo là tên thương hiệu mới của sib - Sendinblue
// Vì thế trong phần hướng dẫn trên github có thể nó vẫn còn giữ tên biến SibApiV3Sdk
// https://github.com/getbrevo/brevo-node
const SibApiV3Sdk = require('@getbrevo/brevo')
import { env } from '~/config/environment'

/**
* Có thể xem thêm phần docs cấu hình theo từng ngôn ngữ khác nhau tùy dự án ở Brevo Dashboard > Account > SMTP & API > API Keys
* https://brevo.com
* Với Nodejs thì tốt nhất cứ lên github repo của bọn nó là nhanh nhất:
* https://github.com/getbrevo/brevo-node
*/
let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()
let apiKey = apiInstance.authentications['apiKey']
apiKey.apiKey = env.BREVO_API_KEY

const sendEmail = async (recipientEmail, customSubject, customHtmlContent) => {
  try {
    // Khởi tạo một cái email sentSmtpEmail với những thông tin cần thiết
    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail()

    // Tài khoản gửi email
    sendSmtpEmail.sender = { email: env.ADMIN_EMAIL_ADDRESS, name: env.ADMIN_EMAIL_NAME }

    // Tài khoản nhận email
    sendSmtpEmail.to = [{ email: recipientEmail }]

    // Tiêu đề email
    sendSmtpEmail.subject = customSubject

    // Nội dung email
    sendSmtpEmail.htmlContent = customHtmlContent

    // Gọi hành động gửi email
    return apiInstance.sendTransacEmail(sendSmtpEmail)
  }
  catch (error){
    console.log(error)
  }

}

export const BrevoProvider = {
  sendEmail
}