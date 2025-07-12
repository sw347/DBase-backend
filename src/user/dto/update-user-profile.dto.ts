import { Expose } from 'class-transformer';

export class UpdateUserProfileDto {
  @Expose()
  id: number;

  @Expose()
  phone_number: string;

  @Expose()
  address: string;

  @Expose()
  category: string;

  @Expose()
  affiliation: string;

  @Expose()
  skills: string;
}
