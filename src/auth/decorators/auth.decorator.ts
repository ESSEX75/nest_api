import { UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from '../guards/authorization.guard';

export const Auth = () => UseGuards(AuthorizationGuard);
