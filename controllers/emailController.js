import transporter from "../config/mailer.js";

export const sendEmail = async (req, res) => {
  const { name, email, contactNumber, interestedCourse, currentEducation } = req.body;

  try {
    await transporter.sendMail({
      from: `"Website Inquiry" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: ` New Course Inquiry from ${name}`,

      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                    background: linear-gradient(135deg, #0f2027, #203a43, #2c5364); 
                    padding: 30px; color: #fff;">
          
          <div style="max-width:600px; margin:auto; background:#1c1c1c; 
                      border-radius:12px; padding:20px; 
                      box-shadow:0 4px 15px rgba(0,0,0,0.5);">
            
            <h2 style="color:#00e5ff; text-align:center; margin-bottom:20px;">
              📩 New Course Inquiry
            </h2>
            
            <div style="background:#2a2a2a; padding:15px; border-radius:8px; line-height:1.6;">
              <p><strong style="color:#00e5ff;">Name:</strong> ${name}</p>
              <p><strong style="color:#00e5ff;">Email:</strong> ${email}</p>
              <p><strong style="color:#00e5ff;">Contact Number:</strong> ${contactNumber}</p>
              <p><strong style="color:#00e5ff;">Interested Course:</strong> ${interestedCourse}</p>
              <p><strong style="color:#00e5ff;">Current Education:</strong> ${currentEducation}</p>
            </div>
            
            <div style="margin-top:25px; text-align:center;">
              <a href="mailto:${email}" 
                 style="background:#00e5ff; color:#000; padding:12px 20px; 
                        text-decoration:none; font-weight:bold; 
                        border-radius:6px; display:inline-block;">
                Reply to ${name}
              </a>
            </div>
            
            <p style="margin-top:20px; font-size:12px; color:#bbb; text-align:center;">
              🔒 This email was sent automatically from your website.
            </p>
          </div>
        </div>
      `,
    });

    res.status(200).json({ success: true, message: "✅ Dark theme inquiry email sent!" });
  } catch (error) {
    console.error("❌ Email error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};



// import resend from "../config/mailer.js";

// export const sendEmail = async (req, res) => {
//   const { name, email, contactNumber, interestedCourse, currentEducation } = req.body;

//   const html = `
//     <h2>📩 New Course Inquiry</h2>
//     <p><strong>Name:</strong> ${name}</p>
//     <p><strong>Email:</strong> ${email}</p>
//     <p><strong>Contact Number:</strong> ${contactNumber}</p>
//     <p><strong>Interested Course:</strong> ${interestedCourse}</p>
//     <p><strong>Current Education:</strong> ${currentEducation}</p>
//   `;

//   try {
//     await resend.emails.send({
//       from: "Coderwing Website <onboarding@resend.dev>",
//       to: process.env.EMAIL_TO, // 📬 jahan mail aayega
//       subject: `New Inquiry from ${name}`,
//       html,
//     });

//     res.status(200).json({ success: true, message: "✅ Inquiry email sent!" });
//   } catch (error) {
//     console.error("❌ Email error:", error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };
