import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import sendEmail from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";
import crypto from 'crypto';


// register 
export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (role === "admin") {
            return res.status(403).json({
                message: "Direct registration as admin is not permitted",
                success: false
            });
        }
        const assignedRole = role === "seller" ? "seller" : "buyer";
        const normalizedEmail = email?.trim().toLowerCase();
        const userExists = await User.findOne({ email: normalizedEmail });
        if (userExists) {
            return res.status(400).json({
                message: "User already exists",
                success: false
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString(); // generating the email OTP

        const user = await User.create({
            name,
            email: normalizedEmail,
            password: hashedPassword,
            role: assignedRole,
            isApproved: assignedRole === 'seller' ? false : true,
            verificationToken
        })
        try {
            await sendEmail({
                email,
                subject: "Verify your Email - RealEstate Platform",
                message: `<p>Your Email verification code is <strong>${verificationToken}</strong></p><p>Please enter this code on the verification page to activate your account.</p>`
            })
        } catch (emailError) {
            console.error("Failed to send verification email:", emailError);
            // we will still create the user
        }
        return res.status(201).json({
            message: "User registered. Please check your email for the verification code.",
            user: {
                email: user.email,
                name: user.name,
                role: user.role,
            }
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

// login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required."
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password."
            })
        }
        if (!user.isVerified) {
            return res.status(403).json({
                message: "Please verify your email or contact support."
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password."
            })
        }
        if (user.isBlocked) {
            return res.status(403).json({
                message: "Your account has been blocked by admin. Please contact support."
            })
        }
        //token
        const token = jwt.sign({
            id: user._id, //JWT payload
            role: user.role,
        }, process.env.JWT_SECRET, { expiresIn: "7d" });

        const userResponse = user.toObject(); //user is probably a Mongoose document, toObject() converts it into a normal JavaScript object
        delete userResponse.password;

        res.json({
            message: "Login successfully.",
            token,
            user: userResponse,
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

// to get Profile
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password"); // req.user.id comes from middleware authentication
        if (!user) {
            return res.status(404).json({
                message: "User not found.",
                success: false
            })
        }

        res.json({
            success: true,
            user,
        })
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

// to verify the email
export const verifyEmail = async (req, res) => {
    try {
        const { email, code } = req.body;
        if (!email || !code) {
            return res.status(400).json({
                message: "Email and code are required."
            })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "User not found." })
        }
        if (user.isVerified) {
            return res.status(400).json({ message: "Email already verified." })
        }
        if (user.verificationToken !== code) {
            return res.status(400).json({ message: "Invalid verification code." })
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();
        res.status(200).json({
            message: "Email verifies successfully",
            success: true
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message,
            success: false
        })
    }
}

// Forgot Password
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "No user found with that email address" });
        }

        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 mins

        user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
        user.resetPasswordExpire = resetPasswordExpire;
        await user.save();

        const clientUrl = "http://localhost:5173";
        const resetUrl = `${clientUrl}/reset-password/${resetToken}`;
        const message = `
            <h2>Password Reset Request</h2>
            <p>You requested a password reset. Please click on the link below to reset your password:</p>
            <a href="${resetUrl}" clicktracking="off">${resetUrl}</a>
            <p>This link will expire in 15 minutes.</p>
        `;

        try {
            await sendEmail({
                email: user.email,
                subject: "Password Reset - Real Estate Platform",
                message,
            });
            res.status(200).json({ message: "Password reset email sent", success: true });
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();
            return res.status(500).json({ message: "Could not send email", success: false });
        }
    } catch (err) {
        res.status(500).json({ message: err.message, success: false });
    }
};

// now to reset password
export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired passsword reset token", success: false })
        }
        user.password = await bcrypt.hash(password, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        res.status(200).json({
            message: "Password updated successfully.",
            success: true
        });
    }
    catch (err) {
        res.status(500).json({ message: err.message, success: false });
    }
}