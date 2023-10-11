import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/secrets';

declare module 'express' {
  interface Request {
    user?: any; // You can specify the type of the user object
  }
}


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Get the token from the request headers
  const authHeader = req.header('Authorization');

  // Check if the Authorization header exists
  if (!authHeader) {
    return res.status(401).json({ msg: 'Authorization denied. Please provide a token.' });
  }

  // Check if the Authorization header starts with "Bearer " to ensure Bearer token
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'Authorization denied. Invalid token format.' });
  }

  // Extract the token without the "Bearer " prefix
  const token = authHeader.slice(7);

  // Verify the token
  try {
    const decoded = jwt.verify(token, jwtSecret);

    // Attach the user information to the request for later use
    req.user = decoded;

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ msg: 'Token is not valid.' });
  }
};
