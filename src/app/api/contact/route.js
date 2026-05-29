import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const requiredFields = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS"];
const maxRequestBytes = 10_000;
const maxNameLength = 80;
const maxEmailLength = 120;
const maxMessageLength = 2_000;
const rateLimitWindowMs = 60_000;
const maxRequestsPerWindow = 5;
const rateLimitStore = new Map();

function cleanText(value, maxLength) {
  return String(value || "")
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function cleanMessage(value) {
  return String(value || "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, " ")
    .trim()
    .slice(0, maxMessageLength);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getClientIp(request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(request) {
  const ip = getClientIp(request);
  const now = Date.now();
  const current = rateLimitStore.get(ip);

  if (!current || now - current.startedAt > rateLimitWindowMs) {
    rateLimitStore.set(ip, { count: 1, startedAt: now });
    return false;
  }

  current.count += 1;
  return current.count > maxRequestsPerWindow;
}

function isSameOrigin(request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");

  if (!origin || !host) return true;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json(
      { message: "Invalid request origin." },
      { status: 403 },
    );
  }

  if (isRateLimited(request)) {
    return NextResponse.json(
      { message: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > maxRequestBytes) {
    return NextResponse.json(
      { message: "Message is too large." },
      { status: 413 },
    );
  }

  const missingFields = requiredFields.filter((field) => !process.env[field]);

  if (missingFields.length > 0) {
    return NextResponse.json(
      {
        message: `Email server is not configured. Missing: ${missingFields.join(", ")}`,
      },
      { status: 500 },
    );
  }

  let payload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid request body." },
      { status: 400 },
    );
  }

  const trimmedName = cleanText(payload.name, maxNameLength);
  const trimmedEmail = cleanText(payload.email, maxEmailLength).toLowerCase();
  const trimmedInfo = cleanMessage(payload.info);

  if (!trimmedName || !trimmedEmail || !trimmedInfo) {
    return NextResponse.json(
      { message: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  if (!isValidEmail(trimmedEmail)) {
    return NextResponse.json(
      { message: "Please provide a valid email address." },
      { status: 400 },
    );
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER,
    to: process.env.CONTACT_TO_EMAIL || "rifani.co.id@gmail.com",
    replyTo: trimmedEmail,
    subject: `Portfolio inquiry from ${trimmedName}`,
    text: [
      `Name: ${trimmedName}`,
      `Email: ${trimmedEmail}`,
      "",
      "Message:",
      trimmedInfo,
    ].join("\n"),
  });

  return NextResponse.json({ message: "Message sent." });
}
