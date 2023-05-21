import { Router } from 'express';
import { authGoogleSignIn } from '@/middlewares';

const authGoogle = Router();
authGoogle.post('/', authGoogleSignIn);

export { authGoogle };
