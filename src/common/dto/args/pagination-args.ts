import { ArgsType, Field, Int } from "@nestjs/graphql";
import { IsInt, IsOptional, Min } from "class-validator";

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { nullable: true, defaultValue: 2})
  @IsOptional()
  @IsInt()
  limit?: number = 2;

  @Field(() => Int, { nullable: true})
  @IsOptional()
  @IsInt()
  @Min(0)
  offset?: number = 0;
}