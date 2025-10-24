import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import ApiError from "../utils/ApiError.js";
import { uploadFileOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
    const { email, password, name } = req.body;
    
    // Validation
    if ([email, password, name].some(field => !field || field.trim() === "")) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    // Email format validation
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email)) {
        throw new ApiError("Please enter a valid email address", 400);
    }

    // Password length validation
    if (password.length < 6) {
        throw new ApiError("Password must be at least 6 characters long", 400);
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
        throw new ApiError("User already exists with this email", 400);
    }

    // Handle avatar upload (optional)
    let avatarUrl = "";
    if (req.files?.avatar?.[0]?.path) {
        const avatarlocalPath = req.files.avatar[0].path;
        const cloudinaryResponse = await uploadFileOnCloudinary(avatarlocalPath);
        if (!cloudinaryResponse) {
            throw new ApiError("Failed to upload avatar", 500);
        }
        avatarUrl = cloudinaryResponse.secure_url;
    }
    // If no avatar provided, avatarUrl remains empty string (default from model)

    // Create user
    const user = await User.create({
        email: email.toLowerCase().trim(),
        password,
        name: name.trim(),
        avatar: avatarUrl
    });

    // Generate JWT tokens
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Remove password from response
    const userResponse = {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        preferences: user.preferences,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt
    };

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: userResponse,
        accessToken,
        refreshToken
    });
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        throw new ApiError("Email and password are required", 400);
    }

    // Check if user exists
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) {
        throw new ApiError("Invalid email or password", 401);
    }

    // Compare password with bcrypt
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
        throw new ApiError("Invalid email or password", 401);
    }

    // Update lastLogin timestamp
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT tokens
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Remove password from response
    const userResponse = {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        preferences: user.preferences,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt
    };

    res.status(200).json({
        success: true,
        message: "Login successful",
        user: userResponse,
        accessToken,
        refreshToken
    });
});

export { registerUser, loginUser };