import { Module } from '@nestjs/common';
import { DateScalar } from './date.scalar';

@Module({
    exports: [DateScalar], // ObjectidScalar
    providers: [DateScalar], // , ObjectidScalar
})
export class ScalarsModule {}
