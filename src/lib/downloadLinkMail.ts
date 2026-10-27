import nodemailer from 'nodemailer';
import { SITE } from '../config';

/**
 * Mail met de downloadlink (stap 2: "Stuur me de downloadlink").
 * Verstuurd via Zoho SMTP. Instellen in Vercel → Environment Variables:
 *   ZOHO_SMTP_USER  = het Zoho-mailadres waarmee je inlogt (bijv. rafi@rhymehelper.store)
 *   ZOHO_SMTP_PASS  = een app-wachtwoord uit Zoho (Mijn account → Beveiliging → App-wachtwoorden)
 *   MAIL_FROM       = optioneel, afzender, bijv. "Rhyme Helper <support@rhymehelper.store>" (moet een adres/alias van dat account zijn)
 */
export function mailConfigured() {
  return !!(process.env.ZOHO_SMTP_USER && process.env.ZOHO_SMTP_PASS);
}

type Lang = 'en' | 'nl';

const COPY = {
  en: {
    subject: 'Your Rhyme Helper download link',
    hi: 'Here is your download link for Rhyme Helper.',
    open: 'Open it on your Windows 10 or 11 PC:',
    button: 'Download Rhyme Helper for Windows',
    smartscreen: 'Windows may say "Windows protected your PC" the first time. Click "More info" and then "Run anyway". The installer comes straight from our GitHub release.',
    mac: 'You asked to hear about the Mac version. We will email you once, when it is ready.',
    why: 'You get this email because someone asked for this link on rhymehelper.store. Not you? Ignore it; we delete the request after 30 days.',
    bye: 'Happy writing,\nRafi from Rhyme Helper',
  },
  nl: {
    subject: 'Je downloadlink voor Rhyme Helper',
    hi: 'Hier is je downloadlink voor Rhyme Helper.',
    open: 'Open hem op je Windows 10- of 11-pc:',
    button: 'Rhyme Helper downloaden voor Windows',
    smartscreen: 'Windows zegt de eerste keer misschien "Windows heeft uw pc beschermd". Klik op "Meer informatie" en dan op "Toch uitvoeren". De installer komt rechtstreeks van onze GitHub-release.',
    mac: 'Je wilt horen wanneer de Mac-versie er is. We mailen je één keer, als hij klaar is.',
    why: 'Je krijgt deze mail omdat iemand deze link heeft aangevraagd op rhymehelper.store. Was jij dat niet? Negeer hem dan; we wissen de aanvraag na 30 dagen.',
    bye: 'Veel schrijfplezier,\nRafi van Rhyme Helper',
  },
} as const;

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export async function sendDownloadLinkMail(to: string, lang: Lang, wantsMac: boolean) {
  const c = COPY[lang];
  const link = `${SITE.url}/downloads/windows?ref=mail-link`;
  const text = [c.hi, '', c.open, link, '', c.smartscreen, ...(wantsMac ? ['', c.mac] : []), '', c.bye, '', '—', c.why].join('\n');
  const html = `<!doctype html><html lang="${lang}"><body style="margin:0;background:#0B0B0D;padding:32px 16px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#EDEDF0">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#151518;border-radius:12px;border:1px solid #2A2A31">
<tr><td style="padding:28px 28px 8px;font-size:15px;line-height:1.6">
<p style="margin:0 0 4px;font-weight:600;font-size:18px">Rhyme Helper</p>
<p style="margin:0 0 16px;color:#A1A1AA">${esc(c.hi)}</p>
<p style="margin:0 0 16px">${esc(c.open)}</p>
<p style="margin:0 0 20px"><a href="${link}" style="display:inline-block;background:#6B5AF5;color:#ffffff;text-decoration:none;font-weight:600;padding:12px 18px;border-radius:10px">${esc(c.button)}</a></p>
<p style="margin:0 0 16px;color:#A1A1AA;font-size:14px">${esc(c.smartscreen)}</p>
${wantsMac ? `<p style="margin:0 0 16px;color:#A1A1AA;font-size:14px">${esc(c.mac)}</p>` : ''}
<p style="margin:0 0 24px;white-space:pre-line">${esc(c.bye)}</p>
</td></tr>
<tr><td style="padding:0 28px 24px;font-size:12px;line-height:1.5;color:#6E6E78">${esc(c.why)}</td></tr>
</table></td></tr></table></body></html>`;

  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.eu',
    port: 465,
    secure: true,
    auth: { user: process.env.ZOHO_SMTP_USER, pass: process.env.ZOHO_SMTP_PASS },
  });
  await transporter.sendMail({
    from: process.env.MAIL_FROM || `Rhyme Helper <${process.env.ZOHO_SMTP_USER}>`,
    to,
    replyTo: SITE.contactEmail,
    subject: c.subject,
    text,
    html,
  });
}
