import { MemberLevel } from '@app/database/entities/user.entity';
import { SetMetadata } from '@nestjs/common';

export const HasRoles = (...authLevels: MemberLevel[]) => SetMetadata('authLevels', authLevels);