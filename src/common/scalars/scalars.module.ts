import { Module } from '@nestjs/common';
import { DateScalar } from './date.scalar';
import { ObjectidScalar } from './objectid.scalar';

@Module({
    exports: [DateScalar], // ObjectidScalar
    providers: [DateScalar], // , ObjectidScalar
})
export class ScalarsModule {}
