import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

export async function sendResultsEmail({
  toEmail,
  archetype,
  resultHtml,
  answers,
}: {
  toEmail: string
  archetype: string
  resultHtml: string
  answers: Record<string, unknown>
}) {
  const userEmail = {
    from: `"The Good Girl Wound Map" <${process.env.GMAIL_USER}>`,
    to: toEmail,
    subject: `Your Wound Map is Ready — ${archetype}`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 700px; margin: 0 auto; color: #1a1a1a; background: #faf8f5; padding: 40px 30px;">
        <div style="text-align: center; margin-bottom: 40px;">
          <h1 style="font-family: Georgia, serif; color: #8B2635; font-size: 28px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px;">THE GOOD GIRL WOUND MAP</h1>
          <div style="width: 60px; height: 1px; background: #C9A84C; margin: 0 auto;"></div>
        </div>
        ${resultHtml}
        <div style="margin-top: 50px; padding-top: 30px; border-top: 1px solid #C9A84C; text-align: center; color: #8B2635; font-size: 13px; letter-spacing: 1px;">
          <p>You didn't come here by accident.</p>
          <p style="margin-top: 20px; font-size: 11px; color: #999;">© The Good Girl Wound Map — All rights reserved</p>
        </div>
      </div>
    `,
  }

  const answersFormatted = Object.entries(answers)
    .map(([key, val]) => `<strong>${key}:</strong> ${JSON.stringify(val)}`)
    .join('<br/><br/>')

  const arianaEmail = {
    from: `"Wound Map App" <${process.env.GMAIL_USER}>`,
    to: process.env.OWNER_EMAIL,
    subject: `New Wound Map Completed — ${toEmail} — ${archetype}`,
    html: `
      <div style="font-family: monospace; max-width: 700px; margin: 0 auto; padding: 20px; background: #fff;">
        <h2 style="color: #8B2635;">New Session Completed</h2>
        <p><strong>Customer Email:</strong> ${toEmail}</p>
        <p><strong>Archetype:</strong> ${archetype}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        <hr/>
        <h3>Their Answers:</h3>
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; font-size: 14px; line-height: 1.8;">
          ${answersFormatted}
        </div>
        <hr/>
        <h3>Generated Result:</h3>
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px;">
          ${resultHtml}
        </div>
      </div>
    `,
  }

  await Promise.all([
    transporter.sendMail(userEmail),
    transporter.sendMail(arianaEmail),
  ])
}
