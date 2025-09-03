import transporter from "../config/mailer.js";

export const sendEmail = async (req, res) => {
  const { name, email, contactNumber, interestedCourse, currentEducation } = req.body;

  try {
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER, // jisme email receive karna hai
      subject: `New Course Inquiry from ${name}`,
      text: `
        📩 New Course Inquiry:

        Name: ${name}
        Email: ${email}
        Contact Number: ${contactNumber}
        Interested Course: ${interestedCourse}
        Current Education: ${currentEducation}
      `,
    });

    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
