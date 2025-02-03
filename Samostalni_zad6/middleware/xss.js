import { sanitizeBody } from "express-validator";

const xssProtection = [sanitizeBody("*").escape()];

export default xssProtection;
