import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse incoming JSON bodies
  app.use(express.json());

  // API Route for sending email
  app.post("/api/send-email", async (req, res) => {
    try {
      const { name, email, phone, serviceInterest, comments } = req.body;

      if (!name || !email || !phone) {
        return res.status(400).json({ error: "Faltan campos obligatorios: name, email, phone." });
      }

      const host = process.env.SMTP_HOST || "smtp.hostinger.com";
      const port = parseInt(process.env.SMTP_PORT || "465", 10);
      const rawUser = process.env.SMTP_USER;
      const rawPass = process.env.SMTP_PASS;

      const user = (rawUser && rawUser !== "undefined" && rawUser !== "") ? rawUser : "contact@cspartners.com.co";
      const pass = (rawPass && rawPass !== "undefined" && rawPass !== "") ? rawPass : "CSPartners357*";

      console.log("SMTP Connection details:", {
        host,
        port,
        user,
        passLength: pass ? pass.length : 0,
        passStart: pass ? pass.substring(0, 3) + "..." : "none",
        isDefaultPass: pass === "CSPartners357*"
      });

      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465, // True for 465, false for other ports
        auth: {
          user,
          pass,
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      // HTML Email body with corporate styling match
      const htmlBody = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #fbfbf9;">
          <div style="background-color: #0b2240; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h2 style="color: #ffffff; margin: 0;">C&S Partners S.A.S.</h2>
            <p style="color: #4A9BFF; margin: 5px 0 0 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">Nuevo Requerimiento de Consultoría</p>
          </div>
          <div style="padding: 20px; color: #1e293b;">
            <p style="font-size: 15px; line-height: 1.5; margin-bottom: 20px;">Estimado equipo de <strong>C&S Partners</strong>,</p>
            <p style="font-size: 15px; line-height: 1.5;">Se ha recibido una nueva solicitud de consultoría/diagnóstico a través del landing page corporativo de la firma:</p>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 14px;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569; width: 35%;">Nombre Completo:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-weight: 500;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569;">Celular / WhatsApp:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">
                  <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" style="color: #15477A; text-decoration: underline; font-weight: bold;">${phone}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569;">Correo Electrónico:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">
                  <a href="mailto:${email}" style="color: #15477A; text-decoration: underline;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569;">Servicio de Interés:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #15477A; font-weight: bold;">${serviceInterest}</td>
              </tr>
            </table>

            <div style="margin-top: 25px;">
              <p style="font-weight: bold; color: #475569; margin-bottom: 8px; font-size: 14px;">Mensaje / Información del Perfil:</p>
              <div style="background-color: #f1f5f9; padding: 15px; border-radius: 6px; font-size: 13.5px; line-height: 1.6; white-space: pre-wrap; color: #334155; border-left: 4px solid #15477A; font-family: sans-serif;">
                ${comments || "Sin comentarios adicionales."}
              </div>
            </div>
          </div>
          <div style="background-color: #f1f5f9; padding: 12px; text-align: center; border-radius: 0 0 8px 8px; font-size: 11px; color: #64748b; border-t: 1px solid #e2e8f0;">
            Este es un correo seguro enviado automáticamente desde el servidor web de <strong>cspartners.com.co</strong>
          </div>
        </div>
      `;

      // Outgoing email configuration
      await transporter.sendMail({
        from: `"C&S Partners Web" <${user}>`,
        to: "contact@cspartners.com.co",  // recipient address
        replyTo: email,                   // allow reply direct to client
        subject: `📈 Nuevo Lead Landing: ${name} (${serviceInterest})`,
        html: htmlBody,
        text: `Nuevo lead registrado:\n\nNombre: ${name}\nCelular: ${phone}\nEmail: ${email}\nServicio: ${serviceInterest}\n\nDetalles:\n${comments}`
      });

      console.log(`Email sent successfully for lead: ${name}`);
      return res.status(200).json({ success: true, message: "Email sent successfully" });
    } catch (error: any) {
      console.error("Error sending email via Hostinger SMTP:", error);
      return res.status(500).json({ error: "Error interno al enviar el correo.", details: error.message });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
