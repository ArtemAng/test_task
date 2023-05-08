import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    name: 'email',
    type: 'text',
    unique: true,
    nullable: false
  })
  public email: string;

  @Column({
    name: 'first_name',
    type: 'text',
    unique: true,
    nullable: false
  })
  public firstName: string;

  @Column({
    name: 'last_name',
    type: 'text',
    unique: true,
    nullable: false
  })
  public lastName: string;

  @Column({
    name: 'image',
    type: 'text',
    unique: true,
    nullable: false
  })
  public image: string;

  @Column({
    name: 'pdf',
    type: 'bytea',
    unique: true,
    nullable: false
  })
  public pdf: string;
}
