import { AuthGuard } from '@nestjs/passport';
import { UseGuards, Controller } from '@nestjs/common';
import { RolesGuard } from '../../../auth/roles.guard';

@Controller('fees')
@UseGuards(AuthGuard(), RolesGuard)
export class FeesController {}
