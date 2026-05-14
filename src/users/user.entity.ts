import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany
} from 'typeorm';
import { Role } from '../roles/role.entity';
import { Appoiment } from '../appoiments/appoiment.entity';

@Entity('users')
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({nullable: false, select: false})
  password: string;

  @Column()
  name: string;

  @Column({nullable: true})
  phone: string;

  @Column({default: true})
  is_active: boolean; 

  @CreateDateColumn()
  created_at: Date;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
  name: 'user_roles',
  joinColumn: { name: 'user_id', referencedColumnName: 'id' },
  inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Role[]

  @OneToMany(() => Appoiment, (appoiment) => appoiment.id_user)
  appoiments: Appoiment[];

}