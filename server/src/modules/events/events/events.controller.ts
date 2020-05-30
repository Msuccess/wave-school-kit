import { UseGuards, Controller } from '@nestjs/common';
import { RolesGuard } from 'src/auth/roles.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('event')
@UseGuards(AuthGuard(), RolesGuard)
export class EventsController {}
